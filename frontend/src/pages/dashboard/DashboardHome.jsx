import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const DashboardHome = () => {
  const [counts, setCounts] = useState({
    leads: 0,
    messages: 0,
    aiReadiness: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [leadsRes, messagesRes, aiRes] = await Promise.all([
          api.get("/leads/count"),
          api.get("/contact/count"),
          api.get("/ai-readiness/count"),
        ]);
        setCounts({
          leads: leadsRes.data.count,
          messages: messagesRes.data.count,
          aiReadiness: aiRes.data.count,
        });
      } catch (err) {
        console.error("Failed to fetch counts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div>
      <h2 style={styles.pageTitle}>Dashboard Home</h2>

      {/* Stats Cards */}
      <div style={styles.cardsContainer}>
        <StatCard
          title="Total Leads"
          count={counts.leads}
          loading={loading}
        />
        <StatCard
          title="Contact Messages"
          count={counts.messages}
          loading={loading}
        />
        <StatCard
          title="AI Readiness"
          count={counts.aiReadiness}
          loading={loading}
        />
      </div>

      {/* Recent Activity */}
      <div style={styles.recentActivity}>
        <h3 style={styles.recentTitle}>Recent Activity</h3>
        <p style={styles.noActivity}>No activity yet.</p>
      </div>
    </div>
  );
};

// Reusable StatCard component
const StatCard = ({ title, count, loading }) => (
  <div style={styles.card}>
    <div style={styles.cardAccent}></div>
    <div>
      <p style={styles.cardTitle}>{title}</p>
      <p style={styles.cardCount}>{loading ? "Loading..." : count}</p>
    </div>
  </div>
);

const styles = {
  pageTitle: { fontSize: "24px", fontWeight: "700", marginBottom: "24px", color: "#111" },
  cardsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    flexWrap: "wrap", // ready for mobile
  },
  card: {
    position: "relative",
    flex: "1 1 200px", // responsive width
    backgroundColor: "#fff",
    padding: "20px 20px 20px 12px",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.08)",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
    minWidth: "200px",
  },
  cardAccent: {
    width: "6px",
    height: "100%",
    backgroundColor: "#B10F3A",
    borderRadius: "6px",
    marginRight: "12px",
  },
  cardTitle: { fontSize: "14px", fontWeight: "500", color: "#333", marginBottom: "6px" },
  cardCount: { fontSize: "20px", fontWeight: "700", color: "#B10F3A" },
  recentActivity: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  },
  recentTitle: { fontSize: "18px", fontWeight: "600", marginBottom: "12px", color: "#111" },
  noActivity: { color: "#555", fontStyle: "italic" },
};

export default DashboardHome;
