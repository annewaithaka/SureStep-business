// frontend/src/pages/dashboard/DashboardMessages.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const DashboardMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/api/dashboard/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div>
      <h2 style={styles.pageTitle}>Contact Messages</h2>

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Message</th>
            <th style={styles.th}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" style={{ ...styles.td, textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : messages.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ ...styles.td, ...styles.noData }}>
                No messages yet.
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg.id}>
                <td style={styles.td}>{msg.name}</td>
                <td style={styles.td}>{msg.email}</td>
                <td style={styles.td}>{msg.message}</td>
                <td style={styles.td}>{new Date(msg.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  pageTitle: { fontSize: "22px", fontWeight: "600", marginBottom: "24px" },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
  },
  noData: { textAlign: "center", padding: "20px", fontStyle: "italic", color: "#6b7280" },
  th: { textAlign: "left", padding: "12px", backgroundColor: "#f8fafc", fontWeight: "600", fontSize: "14px" },
  td: { padding: "12px", borderTop: "1px solid #e5e7eb", fontSize: "14px" },
};

export default DashboardMessages;
