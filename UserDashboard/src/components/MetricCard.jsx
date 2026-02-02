export default function MetricCard({ icon, title, unit }) {
  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={iconBox}>{icon}</div>
        <div className="badge">
          <span className="offline-dot" />
          Offline
        </div>
      </div>

      <h4>{title}</h4>
      <h2>— {unit}</h2>
      <div className="muted">No data</div>
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
