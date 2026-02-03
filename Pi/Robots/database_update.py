import websocket, json, time, random

ws = websocket.WebSocket()
while True:
    try:
        ws.connect("ws://192.168.120.26:8080")
    except Exception as e:
        print("Connection error:", e)
        time.sleep(2)
    else:
        break

while True:
    ws.send(json.dumps({
        "speed": random.random()*5,
        "battery": 95,
        "temperature": 36,
        "timestamp": int(time.time()*1000)
    }))
    time.sleep(0.5)
