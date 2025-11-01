import time
import json
import random
import paho.mqtt.client as mqtt

# ==========================
# إعدادات البروكر والجهاز
# ==========================
BROKER = "localhost"
PORT = 1883

DEVICE_ID = "6902ac1ec150c9799fca4d51"
CLIENT_ID = "esp_simulator_01"

USERNAME = "NabtaXDevice"
PASSWORD = "123456789"

# ==========================
# تعريف stages والأجهزة
# ==========================
STAGES = [
    {"stageId": "6902ac46c150c9799fca4d5d", "sensorId": "68f43735495aa71580f92e6a", "unit": "C"},
    {"stageId": "6902ac46c150c9799fca4d5d", "sensorId": "68f43735495aa71580f92e6b", "unit": "%"},
    {"stageId": "6902ac46c150c9799fca4d5d", "sensorId": "68f43735495aa71580f92e6c", "unit": "pH"}
]

UNIT_TYPE_MAP = {"C": "temp", "%": "humidity", "pH": "ph"}

# قائمة actuators (هتعدل حسب الـ IDs عندك)
ACTUATORS = ["6902bfc07255baea349a7cb3"]  # ضع هنا الـ actuator IDs الحقيقية

TOPIC_TELEMETRY = f"devices/{DEVICE_ID}/readings"

# ==========================
# تعريف client
# ==========================
client = mqtt.Client(client_id=CLIENT_ID)
client.username_pw_set(USERNAME, PASSWORD)

# ==========================
# Callbacks
# ==========================
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("✅ Connected to MQTT broker!")
        # subscribe لجميع actuators
        for actuator in ACTUATORS:
            topic = f"devices/{DEVICE_ID}/actuators/{actuator}/state"
            client.subscribe(topic)
            print(f"🔔 Subscribed to {topic}")
    else:
        print("❌ Failed to connect, return code:", rc)

def on_disconnect(client, userdata, rc):
    print("⚠️ Disconnected! Trying to reconnect...")
    while True:
        try:
            client.reconnect()
            print("🔁 Reconnected successfully.")
            break
        except:
            print("⏳ Still retrying in 5s...")
            time.sleep(5)

def on_message(client, userdata, msg):
    try:
        payload = json.loads(msg.payload.decode())
        actuator_state = payload.get("state")
        print(f"📩 Message received on {msg.topic}: Actuator state -> {actuator_state}")
    except Exception as e:
        print("❌ Error parsing actuator state:", e)

client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message

client.connect(BROKER, PORT, 60)
client.loop_start()

# ==========================
# نشر Telemetry
# ==========================
while True:
    stage_dict = {}

    # توليد القيم لكل sensor
    for s in STAGES:
        value = 0
        if s["unit"] == "C":
            value = round(random.uniform(20, 30), 2)
        elif s["unit"] == "%":
            value = round(random.uniform(40, 70), 2)
        else:
            value = round(random.uniform(6, 8), 2)

        if s["stageId"] not in stage_dict:
            stage_dict[s["stageId"]] = []

        stage_dict[s["stageId"]].append({
            "sensorId": s["sensorId"],
            "value": value,
            "unit": s["unit"],
            "type": UNIT_TYPE_MAP.get(s["unit"], "unknown")
        })

    readings_payload = [{"stageId": sid, "values": vals} for sid, vals in stage_dict.items()]

    payload = {
        "metadata": {
            "deviceId": DEVICE_ID,
            "clientId": CLIENT_ID
        },
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "readings": readings_payload
    }

    client.publish(TOPIC_TELEMETRY, json.dumps(payload))
    print(f"📡 Published to [{TOPIC_TELEMETRY}]:")
    print(json.dumps(payload, indent=2))

    time.sleep(60)  # كل 60 ثانية
