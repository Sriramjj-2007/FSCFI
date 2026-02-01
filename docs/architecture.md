# System Architecture — Autonomous Multi-Rover Farming System (Farm OS)

This document explains **how the entire system is wired together**, why each layer exists, and where intelligence lives. If this architecture fails, the farm fails — so this is intentionally conservative, modular, and scalable.

---

## 1. High-Level Architecture

```
┌───────────────────────────────┐
│        Farmer Interface       │
│  • Mobile App (Android/iOS)   │
│  • Web Dashboard              │
└───────────────┬───────────────┘
                │ HTTPS / WS
┌───────────────▼───────────────┐
│   Central Fleet Intelligence  │
│  • Mission Planner            │
│  • AI / Optimization Engine  │
│  • Fleet Monitor              │
│  • Data Store                 │
└───────────────┬───────────────┘
        RF / LoRa / LTE / Wi-Fi
┌───────────────┼───────────────┐
│               │               │
▼               ▼               ▼
Rover A        Rover B          Rover C
(Plough)      (Seeder)          (Harvester)
```

**Design principle:**
> One smart brain, many obedient hands.

---

## 2. Layered System View

```
┌──────────────────────────────────────┐
│ Application Layer                    │
│ • Farmer UI                          │
│ • Alerts & Reports                   │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│ Intelligence Layer                   │
│ • Task Scheduling                    │
│ • Path Planning                      │
│ • AI Models                          │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│ Coordination Layer                   │
│ • Fleet State Sync                   │
│ • Conflict Resolution                │
│ • Mission Distribution               │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│ Execution Layer (Rovers)             │
│ • Motion Control                     │
│ • Tool Actuation                     │
│ • Local Safety Logic                 │
└──────────────────────────────────────┘
┌──────────────────────────────────────┐
│ Hardware Layer                       │
│ • Motors, Sensors, Batteries         │
└──────────────────────────────────────┘
```

---

## 3. Central Fleet Intelligence (Server)

### Internal Architecture

```
┌─────────────────────────────────────┐
│ API Gateway (REST / WebSocket)      │
└───────────────┬─────────────────────┘
┌───────────────▼─────────────────────┐
│ Mission Planner                     │
│ • Field Decomposition               │
│ • Task Allocation                   │
└───────────────┬─────────────────────┘
┌───────────────▼─────────────────────┐
│ AI & Optimization Engine            │
│ • Path Planning                     │
│ • Load Balancing                    │
│ • Failure Prediction                │
└───────────────┬─────────────────────┘
┌───────────────▼─────────────────────┐
│ Fleet Monitor                       │
│ • Health Checks                     │
│ • Telemetry Analysis                │
└───────────────┬─────────────────────┘
┌───────────────▼─────────────────────┐
│ Data Layer                          │
│ • PostgreSQL                        │
│ • Time-Series DB                   │
└─────────────────────────────────────┘
```

**Blunt truth:**
If the server goes down, rovers must **fail safe**, not go rogue.

---

## 4. Rover Architecture

Each rover is **semi-autonomous** — capable of survival, not strategy.

```
┌──────────────────────────────┐
│ High-Level Control (Linux)   │
│ • ROS2 Nodes                 │
│ • Navigation Client          │
│ • Comms Client               │
└───────────────┬──────────────┘
┌───────────────▼──────────────┐
│ Safety & Logic Layer         │
│ • Obstacle Avoidance         │
│ • Geofence Enforcement       │
│ • Emergency Stop             │
└───────────────┬──────────────┘
┌───────────────▼──────────────┐
│ Real-Time Control (MCU)      │
│ • Motor Control              │
│ • Encoder Feedback           │
└───────────────┬──────────────┘
┌───────────────▼──────────────┐
│ Hardware                      │
│ • Motors, Sensors, Tools     │
└──────────────────────────────┘
```

---

## 5. Communication Architecture

```
 Rover ──Telemetry──► Server
 Rover ◄──Commands── Server
 Rover ──Health─────► Server

 Farmer App ◄──Live Data──► Server
```

### Communication Modes
| Mode | Use Case | Bandwidth |
|-----|---------|-----------|
| LoRa / RF | Commands, status | Very Low |
| LTE / Wi-Fi | Images, updates | High |

**Rule:**
> Commands must work on the worst network day.

---

## 6. Data Flow

```
Sensors → Edge Filter → Server → AI Model → Decision → Command → Rover
```

Latency-sensitive logic (obstacles, emergency stop) **never leaves the rover**.

---

## 7. Failure Handling

### Rover Failure
- Rover stops
- Reports last known state
- Task reassigned

### Communication Loss
- Rover enters safe mode
- Returns to base or halts

### Server Failure
- Rovers freeze or park
- Manual takeover enabled

No heroics. Predictable failure beats clever recovery.

---

## 8. Scalability Strategy

```
1 Rover   → Proof of concept
5 Rovers  → Small farm
20+ Rovers → Industrial scale
```

Scaling is achieved by:
- Stateless rover design
- Centralized optimization
- Asynchronous messaging

---

## 9. Security Architecture

- Encrypted comms
- Device authentication
- Command signing
- Role-based access (farmer / admin)

A hacked rover is a moving weapon. Treat it that way.

---

## 10. Architectural Non-Goals

Things this system intentionally does **not** do:
- Fully independent rover swarms
- On-rover heavy AI training
- Cloud-only dependency

Those sound cool. They fail in fields.

---

**If this architecture survives mud, heat, bad GPS, and flaky networks — then it’s real. Everything else is a demo.**

