import { useTelemetry } from '../hooks/useTelemetry';

export default function TelemetryPanel() {
  const { data, connected } = useTelemetry();

  if (!connected) return <p>🟡 Connecting…</p>;
  if (!data) return <p>No data yet</p>;

  return (
    <div style={{ padding: 16, border: '1px solid #444' }}>
      <h3>Live Telemetry</h3>
      <p>Speed: {data.speed} m/s</p>
      <p>Battery: {data.battery}%</p>
      <p>Temperature: {data.temperature}°C</p>
      <p>Time: {new Date(data.timestamp).toLocaleTimeString()}</p>
    </div>
  );
}
