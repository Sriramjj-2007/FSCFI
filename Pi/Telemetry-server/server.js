import { WebSocketServer } from 'ws';
import http from 'http';

const server = http.createServer();
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 8080;

// Store connected clients
const clients = new Set();

// Simulated sensor data (replace with real sensor integration)
let sensorData = {
  speed: 0,
  battery: 85,
  temperature: 25,
  moisture: 65,
  growth: 42,
  wind: 12,
  timestamp: Date.now(),
};

// Function to generate or get sensor data
function getSensorData() {
  // Update with new values (replace with real sensor readings from your Pi)
  return {
    speed: (Math.random() * 10).toFixed(2),
    battery: Math.max(20, (sensorData.battery + (Math.random() - 0.5) * 2)).toFixed(1),
    temperature: (25 + (Math.random() - 0.5) * 10).toFixed(1),
    moisture: (65 + (Math.random() - 0.5) * 15).toFixed(1),
    growth: (42 + (Math.random() - 0.5) * 20).toFixed(1),
    wind: (12 + (Math.random() - 0.5) * 8).toFixed(1),
    timestamp: Date.now(),
  };
}

// Broadcast data to all connected clients
function broadcast(data) {
  const message = JSON.stringify(data);
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

// WebSocket connection handler
wss.on('connection', (ws) => {
  console.log(`[${new Date().toLocaleTimeString()}] Client connected. Total: ${clients.size + 1}`);
  clients.add(ws);

  // Send initial data immediately
  ws.send(JSON.stringify({ ...getSensorData(), type: 'initial' }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('Received from client:', data);

      // Handle different message types
      if (data.type === 'get-status') {
        ws.send(JSON.stringify({ type: 'status', clients: clients.size, timestamp: Date.now() }));
      } else if (data.type === 'update-sensor') {
        // Allow clients to send sensor data updates
        sensorData = { ...sensorData, ...data.payload };
        broadcast(sensorData);
      }
    } catch (e) {
      console.error('Failed to parse message:', e);
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`[${new Date().toLocaleTimeString()}] Client disconnected. Total: ${clients.size}`);
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

// Broadcast sensor data every 500ms
const interval = setInterval(() => {
  if (clients.size > 0) {
    const data = getSensorData();
    broadcast(data);
  }
}, 500);

// HTTP endpoint to check server status
server.on('request', (req, res) => {
  if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'running', 
      clients: clients.size,
      port: PORT,
      timestamp: new Date().toISOString()
    }));
  } else if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Telemetry WebSocket server running on ws://0.0.0.0:${PORT}`);
  console.log(`📊 HTTP status available at http://localhost:${PORT}/status`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️  Shutting down server...');
  clearInterval(interval);
  clients.forEach((client) => client.close());
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
