# Autonomous Multi-Rover Farming System (FarmOS)

A scalable, AI-driven farming platform using multiple autonomous rovers (tractor-like vehicles) coordinated by a centralized fleet intelligence server. The system automates ploughing, sowing, irrigation support, crop monitoring, and harvesting with real-time telemetry and farmer-facing control apps.

---

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](system-architecture)
- [Rovers](#rovers)
- [Central Fleet Intelligence](#central-fleet-intelligence)
- [Communication](#communication)
- [Energy Systems](#energy-systems)
- [Software Stack](#software-stack)
- [Data & AI](#data--ai)
- [Farmer App](#farmer-app)
- [Deployment](#deployment)
- [Safety & Reliability](#safety--reliability)
- [Roadmap](#roadmap)
<!-- - [Contributors](#contributors)
- [License](#license) -->

---

## Overview
Traditional farming suffers from labor shortages, inefficiency, and delayed decision-making. This project replaces manual workflows with a coordinated fleet of autonomous rovers managed by a centralized server that plans tasks, monitors execution, and adapts to real-time field conditions.

The goal is **full-field autonomy with human-in-the-loop supervision**, not blind automation.

---

## Key Features
- <!--🚜--> Multi-rover coordination for parallel field operations
- <!--🧠--> Centralized AI-based task planning and optimization
- <!--📡--> Long-range radio communication (LoRa / RF / LTE optional)
- <!--⚡--> Electric Rover
- <!--🔋--> Pluggable battery tech (Li-ion / Sodium-ion)
- <!--🌱--> Precision farming with sensor-driven decisions
- <!--📱--> Mobile & web app for farmers
- <!--📊--> Live telemetry, alerts, and mission replay

---

## System Architecture

```
               +----------------------+
               |   Farmer App (UI)    |
               |  Web / Mobile        |
               +----------+-----------+
                          |
                          v
               +----------------------+
               | Central Fleet Server |
               |  - Mission Planner   |
               |  - AI Models         |
               |  - Data Store        |
               |  - Fleet Monitor     |
               +----------+-----------+
                          |
                  Radio / LTE / RF
                         / \
                        /   \
                       /     \
+----------+-----------+    +----------+----------+
|   Rover A (Plough)   |    |  Rover B (Sow)      |
|  - Sensors           |    | - Sensors           |
|  - Actuators         |    | - Actuators         |
+----------+-----------+    +----------+----------+
```

---

## Rovers
Each rover is a semi-independent robotic unit capable of executing assigned tasks.

### Hardware
- Chassis: Tractor-like
- Motors: BLDC
- Compute: Raspberry Pi / Jetson
- Sensors:
  - GPS (RTK preferred)
  - IMU
  - Soil moisture, Humidity & Temperature
  - Cameras (RGB / Multispectral)
  - LiDAR / Ultrasonic (obstacle detection)

### Capabilities
- Autonomous navigation
- Tool attachment control (plough, seeder, harvester)
- Local fail-safe logic
- Edge inference (basic vision & obstacle avoidance)

---

## Central Fleet Intelligence
The brain of the system.

### Responsibilities
- Field mapping & geofencing
- Task decomposition (who does what, when)
- Path planning & collision avoidance
- Traffic Maintenance
- Load balancing across rovers
- Health monitoring & predictive maintenance

### Design Choice (Blunt Truth)
Centralized intelligence keeps rovers **cheap and dumb**. This is intentional. Smart rovers are expensive and hard to maintain.

---

## Communication
- Primary: LoRa / Sub-GHz RF for commands & telemetry
- Secondary: LTE / Wi-Fi (when available)
- Protocols:
  - MQTT (fleet messaging)
  - Custom binary packets (low bandwidth modes)

### Data Types
- Rover state (position, speed, battery)
- Sensor streams (compressed)
- Command acknowledgements

---

## Energy Systems

### Electric Rovers
**Pros:**
- Low operating cost
- Quiet, zero emissions
- Easy control & automation

<!-- **Cons:**
- Charging downtime
- Battery degradation

### Non-Electric (Diesel / Hybrid)
**Pros:**
- Long operation time
- Suitable for heavy-duty tasks

**Cons:**
- Maintenance heavy
- Higher emissions -->

### Battery Comparison
| Battery Type |              Pros             |          Cons        |
|--------------|-------------------------------|----------------------|
| Lithium-ion  | High energy density, mature   | Cost, thermal risk   |
| Sodium-ion   | Cheaper, safer, cold tolerant | Lower energy density |

---

## Software Stack

### Rover Side
- OS: Linux
- Control: ROS2
- Language: C++ / Python
- Real-time: Microcontroller for motor control

### Server Side
- Backend: Python (FastAPI) / Node.js
- AI: PyTorch / TensorFlow
- Database: PostgreSQL + Time-series DB
- Maps: GeoJSON

### App
- Frontend: React <!--/ Flutter-->
- Realtime: WebSockets

---

## Data & AI

### AI Models
- Path planning <!--(A*, RRT*)-->
- Task scheduling (optimization algorithms)
- Crop health analysis (vision)
- Anomaly detection (equipment failure)

### Data Pipeline
- Edge filtering → Server aggregation → Model inference → Command dispatch

---

## Farmer App

### Features
- Live rover tracking
- Start / pause / abort missions
- Battery
- Field health dashboard
- Alerts (stuck rover, low battery, sensor fault)

UX priority: **Simple, readable, no tech jargon.**

---

## Deployment

### Requirements
- Base station (server + radio gateway)
- Rovers configured with unique IDs
- Field map uploaded

### Steps
1. Calibrate sensors
2. Map field boundaries
3. Assign tasks
4. Monitor execution

---

## Safety & Reliability
- Emergency stop (hardware + software)
- Geofence enforcement
- Watchdog timers
- Redundant comms


---

## Roadmap

- Swarm-level optimization
- Autonomous charging stations
- Weather-adaptive planning
- Fully offline mode
- Open hardware rover design
---

<!-- ## Contributors
Contributions are welcome.

- [Nithin](docs/nithin.md)
- [Murali](docs/murali.md)

---

## License
MIT License

---

**This project is built to scale from small farms to industrial agriculture. If it can’t survive dust, heat, and bad network — it’s not done yet.** -->
