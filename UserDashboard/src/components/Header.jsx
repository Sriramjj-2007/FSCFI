import { Menu, Sprout } from "lucide-react";

export default function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.left}>
        <div style={styles.logo}>
          <Sprout size={18} />
        </div>
        <strong>Farm OS</strong>
      </div>
      <Menu />
    </header>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    background: "#ffffff",
    boxShadow: "0 1px 0 #e6efe9",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "#eaf4ee",
    display: "grid",
    placeItems: "center",
  },
};
