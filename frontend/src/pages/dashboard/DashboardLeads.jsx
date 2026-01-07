import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const DashboardLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.get("/leads");
        setLeads(res.data);
      } catch (err) {
        console.error("Failed to fetch leads:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  return (
    <div>
      <h2 style={styles.pageTitle}>Leads</h2>

      <div style={styles.card}>
        {isMobile ? (
          <div style={styles.mobileList}>
            {loading ? (
              <p style={styles.center}>Loading…</p>
            ) : leads.length === 0 ? (
              <p style={styles.center}>No leads yet.</p>
            ) : (
              leads.map((lead) => (
                <div key={lead.id} style={styles.mobileItem}>
                  <Row
                    label="Created"
                    value={new Date(lead.created_at).toLocaleString()}
                  />
                  <Row label="Source" value={lead.source} />
                  <Row label="Name" value={lead.name} />
                  <Row label="Email" value={lead.email} />
                </div>
              ))
            )}
          </div>
        ) : (
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Created</th>
                  <th style={styles.th}>Source</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" style={styles.center}>
                      Loading…
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={styles.center}>
                      No leads yet.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id}>
                      <td style={styles.td}>
                        {new Date(lead.created_at).toLocaleString()}
                      </td>
                      <td style={styles.td}>{lead.source}</td>
                      <td style={styles.td}>{lead.name}</td>
                      <td style={styles.td}>{lead.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
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

  /* Card wrapper */
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

  /* Mobile list */
  mobileList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  mobileItem: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "12px",
    backgroundColor: "#fff",
  },

  mobileRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "8px",
    fontSize: "14px",
    wordBreak: "break-word",
  },

  mobileLabel: {
    color: "#6b7280",
    fontWeight: "500",
    minWidth: "90px",
  },

  mobileValue: {
    textAlign: "right",
    maxWidth: "65%",
  },

  center: {
    textAlign: "center",
    padding: "24px",
    color: "#6b7280",
  },
};

export default DashboardLeads;
