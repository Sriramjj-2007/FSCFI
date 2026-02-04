import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

console.log('Telemetry WS running on ws://0.0.0.0:8080');
const telemetryElements = ['speed', 'battery', 'temperature', 'moisture', 'grassGrowth', 'windSpeed'];

wss.on('connection', (ws) => {
  console.log('Client connected');

  // Send fake telemetry every 500ms for testing
  const interval = setInterval(() => {
    const telemetry = {
      speed: [(Math.random() * 10).toFixed(2), Date.now()],
      battery: [  (50 + Math.random() * 50).toFixed(1), Date.now()],
      temperature: [(30 + Math.random() * 10).toFixed(1), Date.now()],
      moisture: [(40 + Math.random() * 20).toFixed(1), Date.now()],
      grassGrowth: [(20 + Math.random() * 30).toFixed(1), Date.now()],
      windSpeed: [(5 + Math.random() * 15).toFixed(1), Date.now()],
    };
    
    ws.send(JSON.stringify(telemetry));
  }, 2000);

  ws.on('close', () => {
    clearInterval(interval);
    console.log('Client disconnected');
  });
});
