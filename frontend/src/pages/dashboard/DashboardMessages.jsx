// frontend/src/pages/dashboard/DashboardMessages.jsx
import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const DashboardMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await api.get("/dashboard/messages");
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const truncate = (text, length = 80) => {
    if (!text) return "";
    return text.length > length ? text.slice(0, length) + "…" : text;
  };

  return (
    <div>
      <h2 style={styles.pageTitle}>Contact Messages</h2>

      <div style={styles.card}>
        {isMobile ? (
          <div style={styles.mobileList}>
            {loading ? (
              <p style={styles.center}>Loading…</p>
            ) : messages.length === 0 ? (
              <p style={styles.center}>No messages yet.</p>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} style={styles.mobileItem}>
                  <Row label="Name" value={msg.name} />
                  <Row label="Email" value={msg.email} />
                  <Row
                    label="Message"
                    value={
                      <span
                        style={styles.messageLink}
                        onClick={() => setSelectedMessage(msg)}
                      >
                        {truncate(msg.message, 60)}
                      </span>
                    }
                  />
                  <Row
                    label="Time"
                    value={new Date(msg.created_at).toLocaleString()}
                  />
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={styles.tableWrapper}>
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
                    <td colSpan="4" style={styles.center}>
                      Loading…
                    </td>
                  </tr>
                ) : messages.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={styles.center}>
                      No messages yet.
                    </td>
                  </tr>
                ) : (
                  messages.map((msg) => (
                    <tr key={msg.id}>
                      <td style={styles.td}>{msg.name}</td>
                      <td style={styles.td}>{msg.email}</td>
                      <td
                        style={{ ...styles.td, ...styles.messagePreview }}
                        onClick={() => setSelectedMessage(msg)}
                      >
                        {truncate(msg.message)}
                      </td>
                      <td style={styles.td}>
                        {new Date(msg.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div
          style={styles.modalOverlay}
          onClick={() => setSelectedMessage(null)}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 style={styles.modalTitle}>
              Message from {selectedMessage.name}
            </h3>

            <p style={styles.modalMeta}>
              <strong>Email:</strong> {selectedMessage.email}
            </p>

            <p style={styles.modalMessage}>
              {selectedMessage.message}
            </p>

            <button
              style={styles.closeButton}
              onClick={() => setSelectedMessage(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Row = ({ label, value }) => (
  <div style={styles.mobileRow}>
    <span style={styles.mobileLabel}>{label}</span>
    <span style={styles.mobileValue}>{value}</span>
  </div>
);

const styles = {
  pageTitle: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "24px",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
  },

  /* Desktop table */
  tableWrapper: { overflowX: "auto" },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "700px",
  },

  th: {
    textAlign: "left",
    padding: "12px",
    backgroundColor: "#f8fafc",
    fontWeight: "600",
    fontSize: "14px",
  },

  td: {
    padding: "12px",
    borderTop: "1px solid #e5e7eb",
    fontSize: "14px",
  },

  messagePreview: {
    cursor: "pointer",
    color: "#2563eb",
    maxWidth: "400px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  /* Mobile */
  mobileList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  mobileItem: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "12px",
  },

  mobileRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "8px",
    fontSize: "14px",
  },

  mobileLabel: {
    color: "#6b7280",
    fontWeight: "500",
    minWidth: "80px",
  },

  mobileValue: {
    textAlign: "right",
    maxWidth: "65%",
    wordBreak: "break-word",
  },

  messageLink: {
    color: "#2563eb",
    cursor: "pointer",
    textDecoration: "underline",
  },

  center: {
    textAlign: "center",
    padding: "24px",
    color: "#6b7280",
  },

  /* Modal */
  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },

  modal: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  },

  modalTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
  },

  modalMeta: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "16px",
  },

  modalMessage: {
    fontSize: "15px",
    lineHeight: "1.6",
    whiteSpace: "pre-wrap",
    marginBottom: "20px",
  },

  closeButton: {
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#B10F3A",
    color: "#ffffff",
    cursor: "pointer",
  },
};

export default DashboardMessages;
