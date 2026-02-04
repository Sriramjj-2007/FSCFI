export default function MetricCard({ icon, title, unit, value , connected}) {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={iconBox}>{icon}</div>
        <div className="badge">
          <span className={connected ? "online-dot" : "offline-dot"} />
          {connected ? "Connected" : "Disconnected"}
        </div>
      </div>

      <h4>{title}</h4>
      <h2>{value[0]} {unit}</h2>
      <div className="muted">{value[1] ? new Date(value[1]).toLocaleTimeString() : ""}</div>
    </div>
  );
}

const iconBox = {
  width: 40,
  height: 40,
  borderRadius: 12,
  background: "#eaf4ee",
  display: "grid",
  placeItems: "center",
};
