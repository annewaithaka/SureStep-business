import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

// Map activity type → icon + color + URL
const urlMap = {
  lead: "/dashboard/leads",
  ai_readiness: "/dashboard/ai-readiness",
  message: "/dashboard/contacts", // maps backend 'message' type
};

const activityConfig = {
  lead: { icon: "🧑", color: "#2563eb" }, // blue
  ai_readiness: { icon: "🤖", color: "#B10F3A" }, // burgundy
  contact_message: { icon: "✉️", color: "#16a34a" }, // green
};

// Normalize type from backend
const normalizeType = (type) => {
  if (type === "message" || type === "contact") return "contact_message";
  return type;
};

const DashboardHome = () => {
  const [counts, setCounts] = useState({
    leads: 0,
    messages: 0,
    aiReadiness: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loadingCounts, setLoadingCounts] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch counts
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
        setLoadingCounts(false);
      }
    };
    fetchCounts();

    // Fetch recent activities
    const fetchActivities = async () => {
      try {
        const res = await api.get("/dashboard/recent-activity");
        setActivities(res.data.slice(0, 5)); // most recent 5
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      } finally {
        setLoadingActivities(false);
      }
    };
    fetchActivities();
  }, []);

  const handleActivityClick = (activity) => {
    const type = normalizeType(activity.type);
    const url =
      type === "contact_message" ? urlMap["message"] : urlMap[type];
    if (url) {
      navigate(url);
    }
  };

  return (
    <div>
      <h2 style={styles.pageTitle}>Dashboard Home</h2>

      {/* Stats Cards */}
      <div style={styles.cardsContainer}>
        <StatCard title="Total Leads" count={counts.leads} loading={loadingCounts} />
        <StatCard title="Contact Messages" count={counts.messages} loading={loadingCounts} />
        <StatCard title="AI Readiness" count={counts.aiReadiness} loading={loadingCounts} />
      </div>

      {/* Recent Activity */}
      <div style={styles.recentActivity}>
        <h3 style={styles.recentTitle}>Recent Activity</h3>

        {loadingActivities ? (
          <div style={styles.skeletonWrapper}>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} style={styles.activitySkeleton}></div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <p style={styles.noActivity}>No activity yet.</p>
        ) : (
          activities.map((item, idx) => {
            const type = normalizeType(item.type);
            const config = activityConfig[type];

            return (
              <div
                key={idx}
                style={styles.activityItem}
                onClick={() => handleActivityClick(item)}
              >
                <div
                  style={{
                    ...styles.activityIcon,
                    backgroundColor: config.color,
                  }}
                >
                  {config.icon}
                </div>
                <div style={styles.activityContent}>
                  <p style={styles.activityTitle}>{item.title}</p>
                  <p style={styles.activityDesc}>{item.description}</p>
                  <p style={styles.activityTime}>
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
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
  cardsContainer: { display: "flex", gap: "20px", marginBottom: "30px", flexWrap: "wrap" },
  card: {
    position: "relative",
    flex: "1 1 200px",
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
  cardAccent: { width: "6px", height: "100%", backgroundColor: "#B10F3A", borderRadius: "6px", marginRight: "12px" },
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

  activityItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #f0f0f0",
    cursor: "pointer",
    transition: "background 0.15s",
  },
  activityIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#fff",
    flexShrink: 0,
  },
  activityContent: { flex: 1 },
  activityTitle: { fontSize: "14px", fontWeight: "600", marginBottom: "2px", color: "#111" },
  activityDesc: { fontSize: "13px", color: "#555", marginBottom: "2px" },
  activityTime: { fontSize: "11px", color: "#999" },

  skeletonWrapper: { display: "flex", flexDirection: "column", gap: "10px" },
  activitySkeleton: {
    height: "50px",
    backgroundColor: "#e5e7eb",
    borderRadius: "8px",
    animation: "pulse 1.2s infinite",
  },

  "@keyframes pulse": {
    "0%": { opacity: 1 },
    "50%": { opacity: 0.4 },
    "100%": { opacity: 1 },
  },
};

export default DashboardHome;
