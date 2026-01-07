import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import TopBar from "../../components/dashboard/TopBar";

const DashboardLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div style={styles.wrapper}>
      {/* Overlay (mobile only) */}
      {isMobile && sidebarOpen && (
        <div
          style={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          ...styles.sidebar,
          ...(isMobile
            ? styles.sidebarMobile(sidebarOpen)
            : {}),
        }}
      >
        <h2 style={styles.logo}>SureStep</h2>

        <nav style={styles.nav}>
          {navItem("Dashboard", "/dashboard")}
          {navItem("Leads", "/dashboard/leads")}
          {navItem("AI Readiness", "/dashboard/ai-readiness")}
          {navItem("Contact Messages", "/dashboard/contacts")}
        </nav>
      </aside>

      {/* Main */}
      <div style={styles.main}>
        <TopBar
          title="Dashboard"
          isMobile={isMobile}
          onMenuClick={() => setSidebarOpen(true)}
        />


        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const navItem = (label, to) => (
  <NavLink
    to={to}
    end={to === "/dashboard"}
    style={({ isActive }) =>
      isActive ? styles.activeLink : styles.link
    }
  >
    {label}
  </NavLink>
);

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    overflow: "hidden",
  },

  /* Sidebar */
  sidebar: {
    width: "220px",
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    zIndex: 20,
  },
  sidebarMobile: (open) => ({
    position: "fixed",
    left: open ? 0 : "-240px",
    top: 0,
    height: "100vh",
    transition: "left 0.3s ease",
  }),

  logo: {
    marginBottom: "30px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "14px",
    padding: "8px 10px",
    borderRadius: "6px",
  },

  activeLink: {
    backgroundColor: "#B10F3A",
    color: "#fff",
    fontWeight: "600",
    padding: "8px 10px",
    borderRadius: "6px",
    textDecoration: "none",
  },

  /* Main */
  main: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8fafc",
  },

  content: {
    flex: 1,
    padding: "24px",
    overflowY: "auto",
    backgroundColor: "#f1f5f9",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    zIndex: 10,
  },
};

export default DashboardLayout;
