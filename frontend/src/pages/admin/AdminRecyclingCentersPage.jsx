import { useState, useEffect } from "react";
import { adminService } from "@/services/admin.service";
import { message } from "antd";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  MapPin,
  Phone,
  Clock,
  Save,
} from "lucide-react";

const WASTE_TYPES = [
  { value: "plastic", label: "Plastic", icon: "♻️" },
  { value: "glass", label: "Glass", icon: "🪟" },
  { value: "paper", label: "Paper", icon: "📄" },
  { value: "metal", label: "Metal", icon: "🔩" },
  { value: "ewaste", label: "E-Waste", icon: "💻" },
  { value: "organic", label: "Organic", icon: "🌿" },
];

const emptyForm = {
  name: "",
  address: "",
  city: "",
  wasteTypes: [],
  latitude: "",
  longitude: "",
  contactNumber: "",
  openHours: "",
};

export default function AdminRecyclingCentersPage() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    setLoading(true);
    try {
      const res = await adminService.getAllCenters();
      setCenters(res.data || []);
    } catch (err) {
      console.error("Failed to fetch centers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleWasteType = (wt) => {
    setForm((prev) => ({
      ...prev,
      wasteTypes: prev.wasteTypes.includes(wt)
        ? prev.wasteTypes.filter((w) => w !== wt)
        : [...prev.wasteTypes, wt],
    }));
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (center) => {
    setForm({
      name: center.name || "",
      address: center.address || "",
      city: center.city || "",
      wasteTypes: center.wasteTypes || [],
      latitude: center.latitude?.toString() || "",
      longitude: center.longitude?.toString() || "",
      contactNumber: center.contactNumber || "",
      openHours: center.openHours || "",
    });
    setEditingId(center._id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return message.warning("Name is required");
    if (!form.address.trim()) return message.warning("Address is required");
    if (!form.city.trim()) return message.warning("City is required");
    if (form.wasteTypes.length === 0)
      return message.warning("Select at least one waste type");
    if (!form.latitude || !form.longitude)
      return message.warning("Latitude and longitude are required");

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      };

      if (editingId) {
        await adminService.updateCenter(editingId, payload);
        message.success("Center updated successfully");
      } else {
        await adminService.createCenter(payload);
        message.success("Center created successfully");
      }
      closeForm();
      fetchCenters();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to save center");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this center?")) return;
    setDeletingId(id);
    try {
      await adminService.deleteCenter(id);
      message.success("Center deleted");
      fetchCenters();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete center");
    } finally {
      setDeletingId(null);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    border: "1.5px solid rgba(255,255,255,0.1)",
    fontSize: 14,
    color: "#e2e8f0",
    background: "rgba(255,255,255,0.05)",
    outline: "none",
    transition: "border 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: 12,
    fontWeight: 600,
    color: "#94a3b8",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  };

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
            Recycling Centers
          </h1>
          <p
            style={{ fontSize: 14, color: "#64748b", marginTop: 4, fontWeight: 500 }}
          >
            Create, edit, and remove recycling drop-off locations
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 12,
            border: "none",
            fontSize: 14,
            fontWeight: 700,
            color: "#fff",
            background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(99,102,241,0.3)",
            transition: "transform 0.15s",
          }}
          onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
          onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <Plus size={16} />
          Add Center
        </button>
      </div>

      {/* Create / Edit Form Modal */}
      {showForm && (
        <div
          style={{
            borderRadius: 20,
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(30,41,59,0.95)",
            backdropFilter: "blur(16px)",
            padding: 28,
            marginBottom: 24,
            boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#e2e8f0",
                margin: 0,
              }}
            >
              {editingId ? "Edit Center" : "New Recycling Center"}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: 4,
              }}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Center Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Green Recycle Hub"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(99,102,241,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Address</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(99,102,241,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>City</label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="Colombo"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(99,102,241,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Contact Number</label>
                <input
                  name="contactNumber"
                  value={form.contactNumber}
                  onChange={handleChange}
                  placeholder="+94 112 345 678"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(99,102,241,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Latitude</label>
                <input
                  name="latitude"
                  type="number"
                  step="any"
                  value={form.latitude}
                  onChange={handleChange}
                  placeholder="6.9271"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(99,102,241,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              <div>
                <label style={labelStyle}>Longitude</label>
                <input
                  name="longitude"
                  type="number"
                  step="any"
                  value={form.longitude}
                  onChange={handleChange}
                  placeholder="79.8612"
                  required
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(99,102,241,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Open Hours</label>
                <input
                  name="openHours"
                  value={form.openHours}
                  onChange={handleChange}
                  placeholder="Mon-Fri 8AM-5PM"
                  style={inputStyle}
                  onFocus={(e) =>
                    (e.target.style.borderColor = "rgba(99,102,241,0.5)")
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = "rgba(255,255,255,0.1)")
                  }
                />
              </div>

              {/* Waste Types */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Accepted Waste Types</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {WASTE_TYPES.map((wt) => {
                    const selected = form.wasteTypes.includes(wt.value);
                    return (
                      <button
                        key={wt.value}
                        type="button"
                        onClick={() => toggleWasteType(wt.value)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "8px 14px",
                          borderRadius: 10,
                          border: `1.5px solid ${selected ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.1)"}`,
                          background: selected
                            ? "rgba(99,102,241,0.15)"
                            : "rgba(255,255,255,0.03)",
                          color: selected ? "#a5b4fc" : "#94a3b8",
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        <span>{wt.icon}</span>
                        {wt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
              <button
                type="submit"
                disabled={submitting}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 24px",
                  borderRadius: 12,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  background: submitting
                    ? "#475569"
                    : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  cursor: submitting ? "not-allowed" : "pointer",
                  boxShadow: submitting
                    ? "none"
                    : "0 4px 16px rgba(99,102,241,0.3)",
                }}
              >
                {submitting ? (
                  <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
                ) : (
                  <Save size={16} />
                )}
                {editingId ? "Update Center" : "Create Center"}
              </button>
              <button
                type="button"
                onClick={closeForm}
                style={{
                  padding: "12px 20px",
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "#94a3b8",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Centers List */}
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
            Loading centers...
          </p>
        </div>
      ) : centers.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            borderRadius: 20,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <Building2 size={40} color="#475569" />
          <p style={{ marginTop: 12, color: "#64748b", fontSize: 15, fontWeight: 600 }}>
            No recycling centers yet
          </p>
          <p style={{ marginTop: 4, color: "#475569", fontSize: 13 }}>
            Click "Add Center" to create the first one
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {centers.map((center) => (
            <div
              key={center._id}
              style={{
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(12px)",
                padding: "20px 24px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(99,102,241,0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")
              }
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#e2e8f0",
                      margin: 0,
                    }}
                  >
                    {center.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      marginTop: 4,
                      color: "#64748b",
                      fontSize: 13,
                    }}
                  >
                    <MapPin size={12} />
                    {center.address}, {center.city}
                  </div>

                  {/* Waste chips */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 5,
                      marginTop: 10,
                    }}
                  >
                    {center.wasteTypes?.map((wt) => {
                      const info = WASTE_TYPES.find((w) => w.value === wt);
                      return (
                        <span
                          key={wt}
                          style={{
                            padding: "3px 8px",
                            borderRadius: 6,
                            fontSize: 11,
                            fontWeight: 600,
                            background: "rgba(99,102,241,0.1)",
                            color: "#a5b4fc",
                            border: "1px solid rgba(99,102,241,0.15)",
                          }}
                        >
                          {info?.icon} {info?.label || wt}
                        </span>
                      );
                    })}
                  </div>

                  {/* Meta */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 14,
                      marginTop: 10,
                    }}
                  >
                    {center.contactNumber && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#64748b",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Phone size={11} /> {center.contactNumber}
                      </span>
                    )}
                    {center.openHours && (
                      <span
                        style={{
                          fontSize: 12,
                          color: "#64748b",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <Clock size={11} /> {center.openHours}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => openEdit(center)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "7px 12px",
                      borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#94a3b8",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                      e.currentTarget.style.color = "#a5b4fc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.color = "#94a3b8";
                    }}
                  >
                    <Pencil size={12} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(center._id)}
                    disabled={deletingId === center._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "7px 12px",
                      borderRadius: 8,
                      border: "1px solid rgba(239,68,68,0.2)",
                      background: "rgba(239,68,68,0.05)",
                      color: "#f87171",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor:
                        deletingId === center._id ? "not-allowed" : "pointer",
                      opacity: deletingId === center._id ? 0.5 : 1,
                    }}
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
