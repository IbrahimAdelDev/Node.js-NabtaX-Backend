const fs = require('fs');
const net = require('net');
const https = require('https');
const ws = require('websocket-stream');
const aedes = require('aedes')();
const { Server } = require('socket.io');
const { logger } = require('../config/logger');
const { MQTT_BROKER, MQTT_PORT, MQTT_WS_PORT, TLS_KEY, TLS_CERT, MQTT_USERNAME, MQTT_PASSWORD, WEBSOCKET_PORT } = require('../config/env');
const Telemetry = require('../models/Telemetry');

let io;

// ✅ مصادقة العملاء
aedes.authenticate = (client, username, password, callback) => {
  const isValid = username === MQTT_USERNAME && password.toString() === MQTT_PASSWORD;
  if (isValid) {
    logger.info(`✅ MQTT Client authenticated: ${client.id}`);
    callback(null, true);
  } else {
    logger.warn(`❌ MQTT Client authentication failed: ${client.id}`);
    const error = new Error('Authentication Failed');
    error.returnCode = 4;
    callback(error, false);
  }
};


// ✅ استقبال الرسائل وحفظها في الداتابيز
aedes.on('publish', async (packet, client) => {
  if (!packet.topic || !packet.payload) return; // لو الرسالة فاضية

  logger.info(`📡 MQTT Message published on topic: ${packet.topic} by ${client?.id || 'unknown'}`);

  const topic = packet.topic;

  const telemetryPattern = /^devices\/([a-fA-F0-9]{24})\/readings$/;
  const actuatorPattern = /^devices\/([a-fA-F0-9]{24})\/actuators\/([a-fA-F0-9]{24})\/state$/;

  let match;
  let deviceId;
  let actuatorId;

  // ====== Telemetry ======
  if ((match = topic.match(telemetryPattern))) {
    deviceId = match[1];

    try {
      const payload = JSON.parse(packet.payload.toString());
      const readings = payload.readings;
      if (!Array.isArray(readings)) throw new Error('Invalid readings format');

      const telemetryData = [];

      readings.forEach(stage => {
        const stageId = stage.stageId;
        stage.values.forEach(sensorReading => {
          telemetryData.push({
            metadata: {
              deviceId: payload.metadata.deviceId,
              clientId: payload.metadata.clientId,
            },
            stageId,
            sensorId: sensorReading.sensorId,
            value: sensorReading.value,
            unit: sensorReading.unit,
            type: sensorReading.type,
            taken_at: payload.timestamp ? new Date(payload.timestamp) : Date.now(),
          });
        });
      });

      await Telemetry.insertMany(telemetryData);
      logger.info(`✅ Telemetry saved for device ${deviceId}`);

      if (io) {
        io.to(`device_${deviceId}`).emit('telemetry_update', { deviceId, readings: telemetryData });
        logger.info(`🌐 WebSocket telemetry_update emitted for device ${deviceId}`);
      }
    } catch (error) {
      logger.error('❌ Error saving telemetry data:', error);
    }

  // ====== Actuator state ======
  } else if ((match = topic.match(actuatorPattern))) {
    deviceId = match[1];
    actuatorId = match[2];

    try {
      const payload = JSON.parse(packet.payload.toString());
      const actuatorState = payload.state;

      logger.info(`📩 Actuator ${actuatorId} state received for device ${deviceId}: ${actuatorState}`);

      // لو عايز تبعت الرسالة للفرونت
      if (io) {
        io.to(`device_${deviceId}`).emit('actuator_update', {
          actuatorId,
          deviceId,
          state: actuatorState,
          timestamp: payload.timestamp || new Date()
        });
        logger.info(`🌐 WebSocket actuator_update emitted for actuator ${actuatorId}`);
      }
    } catch (error) {
      logger.error('❌ Error processing actuator state:', error);
    }

  } else {
    logger.warn(`❌ Unknown MQTT topic: ${topic}`);
  }
});


// ✅ تشغيل MQTT (TCP) وبعده (WSS)
function startMqttBroker() {
  const tcpServer = net.createServer(aedes.handle);

  tcpServer.listen(MQTT_PORT, MQTT_BROKER, () => {
    logger.info(`📡 MQTT Broker (TCP) running at mqtt://${MQTT_BROKER}:${MQTT_PORT}`);

    // بعد ما TCP يشتغل، شغل WSS
    const tlsOptions = {
      key: fs.readFileSync(TLS_KEY),
      cert: fs.readFileSync(TLS_CERT),
    };

    const httpsServer = https.createServer(tlsOptions);
    ws.createServer({ server: httpsServer }, aedes.handle);

    httpsServer.listen(MQTT_WS_PORT, MQTT_BROKER, () => {
      logger.info(`🔒 MQTT Broker (WSS) running at wss://${MQTT_BROKER}:${MQTT_WS_PORT}`);
    });

    io = new Server(WEBSOCKET_PORT, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
      logger.info(`🌐 WebSocket client connected: ${socket.id}`);

      socket.on('deviceCommand', (data) => {
        const { deviceId, actuatorId, state } = data;
        if (!deviceId || !actuatorId || !state ) {
          logger.warn('❌ Invalid deviceCommand data received via WebSocket');
          return;
        }
        const topic = `devices/${deviceId}/actuators/${actuatorId}/state`;
        const message = {
          state,
          timestamp: new Date(),
        };
        aedes.publish(topic, JSON.stringify(message));
        logger.info(`📤 Command sent to device ${deviceId} on topic ${topic}`);
      });

      socket.on('join_device_room', (room) => {
        socket.join(room);
        logger.info(`🌐 Socket ${socket.id} joined room ${room}`);
      });

      socket.on('leave_device_room', (room) => {
        socket.leave(room);
        logger.info(`🌐 Socket ${socket.id} left room ${room}`);
      });

    });
    logger.info(`🌐 WebSocket server running at ws://localhost:${WEBSOCKET_PORT}`);

  });
}

module.exports = { startMqttBroker, aedes };

