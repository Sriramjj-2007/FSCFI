import {
  Thermometer,
  Droplet,
  Wind,
  Leaf,
} from "lucide-react";

import Header from "../components/Header";
import StatusBar from "../components/StatusBar";
import MetricCard from "../components/MetricCard";
import { WeatherCard } from "../components/WeatherCard";
import { RobotAdvisory } from "../components/RobotAdvisory";
import { useTelemetry } from "../hooks/useTelemetry";

export default function Dashboard() {
  const ip = 'wss://nemogroot-pi.tail0c0ba3.ts.net';
  const { data, connected } = useTelemetry(ip);

  return (
    <>
      <Header />

      <main style={{ padding: 24 }}>
        <h1>Dashboard</h1>
        <p className="muted">Real-time overview of your farm operations</p>

        <StatusBar />

        <div style={grid}>
          <MetricCard icon={<Thermometer />} title="Temperature" unit="°C" value={data?.temperature || "-"} connected={connected} />
          <MetricCard icon={<Droplet />} title="Soil Moisture" unit="%" value={data?.moisture || "-"} connected={connected} />
          <MetricCard icon={<Leaf />} title="Grass Growth" unit="%" value={data?.grassGrowth || "-"} connected={connected} />
          <MetricCard icon={<Wind />} title="Wind Speed" unit="km/h" value={data?.windSpeed || "-"} connected={connected} />
        </div>

        <div style={sideGrid}>
          <WeatherCard />
          <RobotAdvisory />
        </div>
      </main>
    </>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: 16,
  marginTop: 16,
};

const sideGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 16,
  maxWidth: 360,
  marginTop: 16,
};
