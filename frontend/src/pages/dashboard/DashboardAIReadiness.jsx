import React, { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

const DashboardAIReadiness = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ averageScore: 0, totalCompanies: 0 });

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await api.get("/ai-readiness");
        setSubmissions(res.data);

        if (res.data.length) {
          const total = res.data.reduce((s, i) => s + i.score, 0);
          setSummary({
            averageScore: (total / res.data.length).toFixed(2),
            totalCompanies: res.data.length,
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return (
    <div>
      <h2 style={styles.pageTitle}>AI Readiness</h2>

      <div style={styles.cards}>
        <SummaryCard title="Average Score" value={summary.averageScore} />
        <SummaryCard title="Companies Assessed" value={summary.totalCompanies} />
      </div>

      <div style={styles.card}>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Company</th>
                <th style={styles.th}>Score</th>
                <th style={styles.th}>Size</th>
                <th style={styles.th}>Summary</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="4" style={styles.center}>Loading…</td></tr>
              ) : submissions.length === 0 ? (
                <tr><td colSpan="4" style={styles.center}>No submissions yet.</td></tr>
              ) : (
                submissions.map((s) => (
                  <tr key={s.id}>
                    <td style={styles.td}>{s.company_name}</td>
                    <td style={{ ...styles.td, fontWeight: "600", color: "#B10F3A" }}>
                      {s.score}
                    </td>
                    <td style={styles.td}>{s.company_size}</td>
                    <td style={styles.td}>{s.answers_summary}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, value }) => (
  <div style={styles.summaryCard}>
    <div style={styles.accent} />
    <div>
      <p style={styles.summaryTitle}>{title}</p>
      <p style={styles.summaryValue}>{value}</p>
    </div>
  </div>
);

const styles = {
  pageTitle: { fontSize: "24px", fontWeight: "700", marginBottom: "24px" },

  cards: { display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "24px" },

  summaryCard: {
    flex: "1 1 220px",
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
    display: "flex",
    gap: "12px",
  },

  accent: { width: "6px", backgroundColor: "#B10F3A", borderRadius: "6px" },

  summaryTitle: { fontSize: "14px", color: "#555" },
  summaryValue: { fontSize: "22px", fontWeight: "700", color: "#B10F3A" },

  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "16px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.06)",
  },

  tableWrapper: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "700px" },
  th: { padding: "12px", textAlign: "left", background: "#f8fafc", fontSize: "13px" },
  td: { padding: "12px", borderTop: "1px solid #e5e7eb", fontSize: "14px" },
  center: { textAlign: "center", padding: "24px", color: "#6b7280" },
};

export default DashboardAIReadiness;
