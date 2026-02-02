import { Wifi, Database, Clock } from "lucide-react";

export default function StatusBar() {
  return (
    <div className="card" style={{ display: "flex", gap: 32 }}>
      <div>
        <div className="badge">
          <span className="offline-dot" style={{ background: "green" }} />
          System
        </div>
        <div className="muted">Online</div>
      </div>

      <div>
        <div className="badge">
          <Wifi size={14} />
          Robot
        </div>
        <div className="muted">Connected</div>
      </div>

      <div>
        <div className="badge">
          <Database size={14} />
          0 data points
        </div>
        <div className="muted">
          <Clock size={12} /> Last sync: No data
        </div>
      </div>
    </div>
  );
}
