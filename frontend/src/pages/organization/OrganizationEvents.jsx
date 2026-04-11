import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSessionValue } from "@/utils/session";

export default function OrganizationEvents() {
  const [view, setView] = useState("overview");
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organization: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organization: "",
  });

  const getAuthToken = () => getSessionValue("accessToken");

  const fetchMyEvents = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get("http://localhost:3000/api/events/my-events", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents(response.data.data || []);
    } catch (err) {
      console.error("Error fetching your events", err);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      await axios.post("http://localhost:3000/api/events", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Event registered successfully!");
      setFormData({ title: "", description: "", date: "", location: "", organization: "" });
      setView("overview");
      fetchMyEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = getAuthToken();
      await axios.delete(`http://localhost:3000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMyEvents();
    } catch (err) {
      alert("Unauthorized: Only the creator can delete this event.");
    }
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setEditForm({
      title: event.title || "",
      description: event.description || "",
      date: event.date ? event.date.substring(0, 10) : "",
      location: event.location || "",
      organization: event.organization || "",
    });
  };

  const closeEditModal = () => setEditingEvent(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();
      await axios.put(`http://localhost:3000/api/events/${editingEvent._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      closeEditModal();
      fetchMyEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Update failed.");
    }
  };

  const TrashIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );

  const EditIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );

  const inputStyle = {
    background: "#0f1117",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "11px 14px",
    color: "#f1f5f9",
    borderRadius: "10px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    fontFamily: "inherit",
  };

  const focusInput = (e) => {
    e.target.style.borderColor = "rgba(16,185,129,0.5)";
    e.target.style.boxShadow = "0 0 0 3px rgba(16,185,129,0.08)";
  };

  const blurInput = (e) => {
    e.target.style.borderColor = "rgba(255,255,255,0.1)";
    e.target.style.boxShadow = "none";
  };

  return (
    <div className="p-6 lg:p-10 min-h-screen" style={{ background: "#0f1117", color: "#f1f5f9" }}>

      {/* ── Edit Modal ── */}
      {editingEvent && (
        <div
          onClick={closeEditModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(4px)",
            zIndex: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#1a1d27",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "2rem",
              width: "100%",
              maxWidth: "560px",
            }}
          >
            {/* Modal header */}
            <div
              className="flex justify-between items-start mb-6 pb-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div>
                <h2 style={{ fontSize: "18px", fontWeight: 600, color: "#f1f5f9" }}>
                  Edit Initiative
                </h2>
                <p style={{ fontSize: "13px", color: "#6b7280", marginTop: "3px" }}>
                  Update the details for this event.
                </p>
              </div>
              <button
                onClick={closeEditModal}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#9ca3af",
                  borderRadius: "8px",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  fontSize: "20px",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            {/* Modal form */}
            <form onSubmit={handleUpdate}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {[
                  { label: "Event Title", key: "title", type: "text", placeholder: "Eco-Drive 2026" },
                  { label: "Event Date", key: "date", type: "date", placeholder: "" },
                  { label: "Location", key: "location", type: "text", placeholder: "Kandy, Central Park" },
                  { label: "Organization", key: "organization", type: "text", placeholder: "Urban Care Team" },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "#6b7280" }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={editForm[key]}
                      onChange={(e) => setEditForm({ ...editForm, [key]: e.target.value })}
                      required
                      style={inputStyle}
                      onFocus={focusInput}
                      onBlur={blurInput}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px", color: "#6b7280" }}>
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Program details and objectives..."
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  required
                  style={{ ...inputStyle, resize: "none", lineHeight: "1.6" }}
                  onFocus={focusInput}
                  onBlur={blurInput}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: "#10b981",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "11px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => (e.target.style.background = "#059669")}
                  onMouseLeave={(e) => (e.target.style.background = "#10b981")}
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  style={{
                    padding: "11px 20px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#9ca3af",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                    e.currentTarget.style.color = "#f1f5f9";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    e.currentTarget.style.color = "#9ca3af";
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header
        className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pb-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#f1f5f9", letterSpacing: "-0.5px" }}>
            {view === "overview" ? "My Eco-Hub" : "Host a New Initiative"}
          </h1>
          <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
            {view === "overview"
              ? "Manage and track your organization's contributions."
              : "Fill in the details to launch your next program."}
          </p>
        </div>
        <button
          onClick={() => setView(view === "overview" ? "register" : "overview")}
          className="text-sm font-semibold px-5 py-2.5 rounded-xl"
          style={{ background: "#10b981", color: "#fff", border: "none", cursor: "pointer" }}
          onMouseEnter={(e) => (e.target.style.background = "#059669")}
          onMouseLeave={(e) => (e.target.style.background = "#10b981")}
        >
          {view === "overview" ? "+ Register Event" : "← Back to My Events"}
        </button>
      </header>

      {/* ── Overview ── */}
      {view === "overview" && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="relative rounded-2xl p-5 transition-all duration-200"
                style={{
                  background: "#1a1d27",
                  border: "1px solid rgba(255,255,255,0.09)",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(16,185,129,0.4)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
              >
                {/* Accent bar */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: "3px", background: "#10b981", borderRadius: "16px 16px 0 0" }}
                />

                {/* Card top row */}
                <div className="flex justify-between items-center mb-4 mt-1">
                  <span
                    className="text-xs font-bold uppercase px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(16,185,129,0.12)",
                      color: "#34d399",
                      border: "1px solid rgba(16,185,129,0.2)",
                      letterSpacing: "0.8px",
                    }}
                  >
                    Active
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Edit button */}
                    <button
                      onClick={() => openEditModal(event)}
                      title="Edit event"
                      className="flex items-center justify-center rounded-lg transition-all"
                      style={{
                        width: "30px",
                        height: "30px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#6b7280",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(99,102,241,0.1)";
                        e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)";
                        e.currentTarget.style.color = "#a5b4fc";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "#6b7280";
                      }}
                    >
                      <EditIcon />
                    </button>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(event._id)}
                      title="Delete event"
                      className="flex items-center justify-center rounded-lg transition-all"
                      style={{
                        width: "30px",
                        height: "30px",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: "#6b7280",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(239,68,68,0.1)";
                        e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
                        e.currentTarget.style.color = "#f87171";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                        e.currentTarget.style.color = "#6b7280";
                      }}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>

                {/* Title & description */}
                <h3 className="text-base font-semibold mb-2" style={{ color: "#f1f5f9", lineHeight: "1.4" }}>
                  {event.title}
                </h3>
                <p
                  className="text-sm mb-5"
                  style={{
                    color: "#64748b",
                    lineHeight: "1.65",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {event.description}
                </p>

                {/* Meta */}
                <div
                  className="pt-4 flex flex-col gap-2"
                  style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-2 text-xs" style={{ color: "#94a3b8" }}>
                    <span style={{ fontSize: "12px" }}>📍</span>
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs" style={{ color: "#94a3b8" }}>
                    <span style={{ fontSize: "12px" }}>📅</span>
                    {new Date(event.date).toLocaleDateString(undefined, { dateStyle: "long" })}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div
              className="col-span-full py-20 text-center rounded-2xl"
              style={{ border: "1.5px dashed rgba(255,255,255,0.07)" }}
            >
              <p className="text-base italic" style={{ color: "#4b5563" }}>
                You haven't registered any community events yet.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Register form ── */}
      {view === "register" && (
        <div
          className="max-w-2xl mx-auto rounded-2xl p-8"
          style={{ background: "#1a1d27", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Event Title", key: "title", type: "text", placeholder: "Eco-Drive 2026" },
                { label: "Event Date", key: "date", type: "date", placeholder: "" },
                { label: "Location", key: "location", type: "text", placeholder: "Kandy, Central Park" },
                { label: "Organization", key: "organization", type: "text", placeholder: "Urban Care Team" },
              ].map(({ label, key, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase" style={{ color: "#6b7280", letterSpacing: "0.8px" }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    placeholder={placeholder}
                    value={formData[key]}
                    onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                    required
                    className="rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={focusInput}
                    onBlur={blurInput}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase" style={{ color: "#6b7280", letterSpacing: "0.8px" }}>
                Description
              </label>
              <textarea
                rows={5}
                placeholder="Program details and objectives..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                className="rounded-xl text-sm outline-none transition-all resize-none"
                style={{ ...inputStyle, lineHeight: "1.6" }}
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl text-sm font-semibold"
                style={{ background: "#10b981", color: "#fff", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.background = "#059669")}
                onMouseLeave={(e) => (e.target.style.background = "#10b981")}
              >
                Publish Initiative
              </button>
              <button
                type="button"
                onClick={() => setView("overview")}
                className="px-6 py-3 rounded-xl text-sm font-semibold"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#9ca3af",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.color = "#f1f5f9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "#9ca3af";
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
