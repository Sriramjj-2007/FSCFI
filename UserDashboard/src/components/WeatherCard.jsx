import { Cloud } from "lucide-react";

export function WeatherCard() {
  return (
    <div className="card">
      <div style={{ display: "flex", gap: 10 }}>
        <Cloud />
        <strong>Weather Prediction</strong>
      </div>
      <ul className="muted">
        <li>High heat expected today</li>
        <li>Possible rain in the evening</li>
      </ul>
    </div>
  );
}
