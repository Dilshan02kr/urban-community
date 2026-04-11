import { useState, useEffect } from "react";
import { adminService } from "@/services/admin.service";
import { Building2, Truck, Clock, CheckCircle2, XCircle, Package } from "lucide-react";

export default function AdminDashboardHomePage() {
  const [stats, setStats] = useState({
    totalCenters: 0,
    totalPickups: 0,
    pending: 0,
    accepted: 0,
    collected: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [centersRes, pickupsRes] = await Promise.all([
          adminService.getAllCenters(),
          adminService.getAllPickupRequests(),
        ]);
        const centers = centersRes.data || [];
        const pickups = pickupsRes.data || [];

        setStats({
          totalCenters: centers.length,
          totalPickups: pickups.length,
          pending: pickups.filter((p) => p.status === "Pending").length,
          accepted: pickups.filter((p) => p.status === "Accepted").length,
          collected: pickups.filter((p) => p.status === "Collected").length,
          rejected: pickups.filter((p) => p.status === "Rejected").length,
        });
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    {
      label: "Recycling Centers",
      value: stats.totalCenters,
      icon: Building2,
      color: "#8b5cf6",
      bg: "rgba(139,92,246,0.1)",
      border: "rgba(139,92,246,0.2)",
    },
    {
      label: "Total Pickups",
      value: stats.totalPickups,
      icon: Truck,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
      border: "rgba(59,130,246,0.2)",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: Clock,
      color: "#f59e0b",
      bg: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.2)",
    },
    {
      label: "Accepted",
      value: stats.accepted,
      icon: CheckCircle2,
      color: "#3b82f6",
      bg: "rgba(59,130,246,0.1)",
      border: "rgba(59,130,246,0.2)",
    },
    {
      label: "Collected",
      value: stats.collected,
      icon: Package,
      color: "#10b981",
      bg: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.2)",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      color: "#ef4444",
      bg: "rgba(239,68,68,0.1)",
      border: "rgba(239,68,68,0.2)",
    },
  ];

  return (
    <div>
      <header style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#f1f5f9",
            fontFamily: "'Lora', Georgia, serif",
            margin: 0,
          }}
        >
          Admin Dashboard
        </h1>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4, fontWeight: 500 }}>
          Overview of recycling operations
        </p>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              style={{
                borderRadius: 16,
                border: `1px solid ${card.border}`,
                background: card.bg,
                backdropFilter: "blur(12px)",
                padding: "24px 20px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 8px 24px ${card.border}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <Icon size={20} color={card.color} />
              </div>
              <p
                style={{
                  fontSize: loading ? 20 : 32,
                  fontWeight: 800,
                  color: card.color,
                  margin: 0,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {loading ? "—" : card.value}
              </p>
              <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 4, fontWeight: 600 }}>
                {card.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
