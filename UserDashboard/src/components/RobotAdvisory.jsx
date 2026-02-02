import { Bot } from "lucide-react";

export function RobotAdvisory() {
  return (
    <div className="card">
      <div style={{ display: "flex", gap: 10 }}>
        <Bot />
        <strong>Robot Advisory</strong>
      </div>
      <p className="muted">
        “Avoid irrigation during afternoon hours.”
      </p>
      <p className="muted">
        “Field conditions are stable for operations.”
      </p>
    </div>
  );
}
