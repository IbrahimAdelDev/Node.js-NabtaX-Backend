const mongoose = require('mongoose');

const ensureTelemetryTimeSeriesCollection = async () => {
  const conn = mongoose.connection;
  const collections = await conn.db.listCollections({ name: 'telemetries' }).toArray();

  if (!collections.length) {
    await conn.db.createCollection('telemetries', {
      timeseries: {
        timeField: 'timestamp',
        metaField: 'metadata',
        granularity: 'seconds'
      },
      expireAfterSeconds: 60 * 60 * 24 * 365
    });

    // Create indexes
    await mongoose.connection.db.collection('telemetries').createIndex({ 'metadata.deviceId': 1 });
    // await mongoose.connection.db.collection('telemetries').createIndex({ 'metadata.stageId': 1 });
    // await mongoose.connection.db.collection('telemetries').createIndex({ 'metadata.sensorId': 1 });
    await mongoose.connection.db.collection('telemetries').createIndex({ timestamp: 1 });

    console.log('✅ Time-series collection "telemetries" created');
  } else {
    console.log('ℹ️ Time-series collection "telemetries" already exists');
  }
};

module.exports = ensureTelemetryTimeSeriesCollection;