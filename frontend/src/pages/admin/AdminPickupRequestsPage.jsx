import { useState, useEffect } from "react";
import { adminService } from "@/services/admin.service";
import { message } from "antd";
import {
  Truck,
  Loader2,
  MapPin,
  Clock,
  CheckCircle2,
  Package,
  XCircle,
  User,
  ChevronDown,
} from "lucide-react";

const WASTE_TYPES = {
  plastic: { label: "Plastic", icon: "♻️", color: "#3b82f6" },
  glass: { label: "Glass", icon: "🪟", color: "#8b5cf6" },
  paper: { label: "Paper", icon: "📄", color: "#f59e0b" },
  metal: { label: "Metal", icon: "🔩", color: "#6b7280" },
  ewaste: { label: "E-Waste", icon: "💻", color: "#ef4444" },
  organic: { label: "Organic", icon: "🌿", color: "#10b981" },
};

const STATUS_OPTIONS = ["Pending", "Accepted", "Collected", "Rejected"];

const STATUS_CONFIG = {
  Pending: {
    icon: Clock,
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
  },
  Accepted: {
    icon: CheckCircle2,
    color: "#3b82f6",
    bg: "rgba(59,130,246,0.1)",
    border: "rgba(59,130,246,0.25)",
  },
  Collected: {
    icon: Package,
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    border: "rgba(16,185,129,0.25)",
  },
  Rejected: {
    icon: XCircle,
    color: "#ef4444",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.25)",
  },
};

export default function AdminPickupRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllPickupRequests();
      setRequests(res.data || []);
    } catch (err) {
      console.error("Failed to fetch pickup requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await adminService.updatePickupStatus(id, newStatus);
      message.success(`Status updated to ${newStatus}`);
      setRequests((prev) =>
        prev.map((r) => (r._id === id ? { ...r, status: newStatus } : r)),
      );
    } catch (err) {
      message.error(
        err.response?.data?.message || "Failed to update status",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = statusFilter
    ? requests.filter((r) => r.status === statusFilter)
    : requests;

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 28,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#f1f5f9",
              fontFamily: "'Lora', Georgia, serif",
              margin: 0,
            }}
          >
            Pickup Requests
          </h1>
          <p
            style={{
              fontSize: 14,
              color: "#64748b",
              marginTop: 4,
              fontWeight: 500,
            }}
          >
            Manage citizen garbage collection requests
          </p>
        </div>

        {/* Status filter */}
        <div style={{ position: "relative" }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "9px 36px 9px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
              color: "#94a3b8",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              appearance: "none",
              outline: "none",
            }}
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            color="#64748b"
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>

      {/* Results count */}
      {!loading && (
        <p
          style={{
            fontSize: 13,
            color: "#475569",
            fontWeight: 500,
            marginBottom: 14,
          }}
        >
          {filtered.length} request{filtered.length !== 1 ? "s" : ""}
          {statusFilter && ` (${statusFilter})`}
        </p>
      )}

      {/* Content */}
      {loading ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Loader2
            size={32}
            color="#6366f1"
            style={{ animation: "spin 1s linear infinite" }}
          />
          <p style={{ marginTop: 12, color: "#64748b", fontSize: 14 }}>
            Loading pickup requests...
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Truck size={40} color="#475569" />
          <p
            style={{
              marginTop: 12,
              color: "#64748b",
              fontSize: 15,
              fontWeight: 600,
            }}
          >
            No pickup requests found
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((req) => {
            const wasteInfo = WASTE_TYPES[req.wasteType] || {};
            const statusInfo = STATUS_CONFIG[req.status] || STATUS_CONFIG.Pending;
            const StatusIcon = statusInfo.icon;
            const isUpdating = updatingId === req._id;

            return (
              <div
                key={req._id}
                style={{
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                  padding: "20px 24px",
                }}
              >
                {/* Top row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span style={{ fontSize: 20 }}>
                        {wasteInfo.icon || "🗑️"}
                      </span>
                      <h3
                        style={{
                          fontSize: 15,
                          fontWeight: 700,
                          color: "#e2e8f0",
                          margin: 0,
                        }}
                      >
                        {wasteInfo.label || req.wasteType} — {req.quantityKg} kg
                      </h3>
                    </div>

                    {/* User info */}
                    {req.userId && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          marginTop: 6,
                          color: "#64748b",
                          fontSize: 12,
                        }}
                      >
                        <User size={12} />
                        <span>
                          {req.userId.name || "Unknown"} ({req.userId.email || "—"})
                        </span>
                      </div>
                    )}

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 14,
                        marginTop: 8,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "#64748b",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <MapPin size={12} />
                        {req.address}, {req.city}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "#64748b",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Clock size={12} />
                        {new Date(req.pickupDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {req.notes && (
                      <p
                        style={{
                          fontSize: 12,
                          color: "#475569",
                          marginTop: 8,
                          fontStyle: "italic",
                        }}
                      >
                        Note: {req.notes}
                      </p>
                    )}
                  </div>

                  {/* Status + Update */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 8,
                      flexShrink: 0,
                    }}
                  >
                    {/* Current status badge */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        padding: "5px 12px",
                        borderRadius: 20,
                        background: statusInfo.bg,
                        border: `1px solid ${statusInfo.border}`,
                      }}
                    >
                      <StatusIcon size={12} color={statusInfo.color} />
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: statusInfo.color,
                        }}
                      >
                        {req.status}
                      </span>
                    </div>

                    {/* Status change dropdown */}
                    <div style={{ position: "relative" }}>
                      <select
                        value={req.status}
                        disabled={isUpdating}
                        onChange={(e) =>
                          handleStatusChange(req._id, e.target.value)
                        }
                        style={{
                          padding: "6px 30px 6px 10px",
                          borderRadius: 8,
                          border: "1px solid rgba(255,255,255,0.1)",
                          background: "rgba(255,255,255,0.05)",
                          color: "#94a3b8",
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: isUpdating
                            ? "not-allowed"
                            : "pointer",
                          appearance: "none",
                          outline: "none",
                          opacity: isUpdating ? 0.5 : 1,
                        }}
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={12}
                        color="#64748b"
                        style={{
                          position: "absolute",
                          right: 8,
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
