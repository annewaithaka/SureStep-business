// frontend/src/components/dashboard/TopBar.jsx
import React from "react";
import { removeToken } from "../../auth/auth";
import { useNavigate } from "react-router-dom";

const TopBar = ({ title = "Dashboard", onMenuClick }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate("/");
  };

  return (
    <header style={styles.topbar}>
      <div style={styles.left}>
        <button style={styles.menuButton} onClick={onMenuClick}>
          ☰
        </button>
        <h1 style={styles.title}>{title}</h1>
      </div>

      <button onClick={handleLogout} style={styles.logoutButton}>
        Logout
      </button>
    </header>
  );
};

const styles = {
  topbar: {
    height: "60px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  menuButton: {
    fontSize: "22px",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "none", // shown via media query logic below
  },
  title: {
    fontSize: "18px",
    fontWeight: "600",
    margin: 0,
  },
  logoutButton: {
    padding: "6px 12px",
    backgroundColor: "#B10F3A",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default TopBar;
