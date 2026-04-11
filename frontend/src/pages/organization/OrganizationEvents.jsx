import React, { useState, useEffect } from "react";
import axios from "axios";
import { getSessionValue } from "@/utils/session";

export default function OrganizationEvents() {
  const [view, setView] = useState("overview");
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    organization: "",
  });

  /**
   * FIXED TOKEN RESOLVER
   * Uses the same getSessionValue utility as AuthProvider,
   * ensuring the token is unwrapped correctly regardless of how setSession stores it.
   */
  const getAuthToken = () => getSessionValue("accessToken");

  // 1. Fetch Events (Read)
  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/events");
      setEvents(response.data.data);
    } catch (err) {
      console.error("Error fetching events", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 2. Handle Form Submission (Create)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = getAuthToken();

      if (!token) {
        alert(
          "Authentication Required: We couldn't find your login session. Please log in again.",
        );
        return;
      }

      await axios.post("http://localhost:3000/api/events", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("🎉 Event registered successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        organization: "",
      });
      fetchEvents();
      setView("overview");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Registration failed. Check your connection.";
      alert(errorMsg);
    }
  };

  // 3. Handle Deletion (Delete)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      const token = getAuthToken();

      await axios.delete(`http://localhost:3000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchEvents();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Unauthorized: You do not have permission to delete this event.");
    }
  };
  return (
    <div>
      <header className="mb-10 flex justify-between items-end border-b border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">
            {view === "overview" ? "Eco-Event Hub" : "Host a New Initiative"}
          </h1>
          <p className="text-slate-400 mt-2 font-medium">
            Manage your community sustainability programs.
          </p>
        </div>
        {view === "overview" && (
          <div className="bg-slate-900 border border-white/10 px-6 py-3 rounded-2xl text-sm font-semibold shadow-xl">
            Active Programs:{" "}
            <span className="text-emerald-400 ml-2">{events.length}</span>
          </div>
        )}
      </header>

      {view === "overview" ? (
        /* LIST VIEW */
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-slate-900/80 border border-white/10 p-6 rounded-3xl hover:border-emerald-500/50 transition-all duration-300 group shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-500/20">
                    Live
                  </span>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="text-slate-500 hover:text-red-400 transition-colors p-1"
                    title="Remove Event"
                  >
                    🗑️
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                  {event.title}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-3 mb-6 leading-relaxed">
                  {event.description}
                </p>
                <div className="text-[11px] text-slate-500 space-y-3 pt-5 border-t border-white/5 font-medium">
                  <p className="flex items-center gap-2">
                    <span className="opacity-50 text-base">📍</span>{" "}
                    {event.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="opacity-50 text-base">📅</span>{" "}
                    {new Date(event.date).toLocaleDateString(undefined, {
                      dateStyle: "long",
                    })}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
              <p className="text-slate-500 italic text-lg">
                No community events listed yet.
              </p>
              <button
                onClick={() => setView("register")}
                className="mt-4 text-emerald-400 hover:underline"
              >
                Click here to add the first one
              </button>
            </div>
          )}
        </div>
      ) : (
        /* FORM VIEW */
        <div className="max-w-3xl mx-auto bg-slate-900 border border-white/10 rounded-[2rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-6xl font-black">
            FORM
          </div>
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Event Title
                </label>
                <input
                  className="bg-slate-950 p-4 rounded-2xl border border-white/10 outline-none focus:border-emerald-500 transition-all text-white placeholder:text-slate-700"
                  placeholder="Eco-Drive 2026"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Event Date
                </label>
                <input
                  type="date"
                  className="bg-slate-950 p-4 rounded-2xl border border-white/10 outline-none focus:border-emerald-500 transition-all text-white appearance-none"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Location
                </label>
                <input
                  className="bg-slate-950 p-4 rounded-2xl border border-white/10 outline-none focus:border-emerald-500 transition-all text-white placeholder:text-slate-700"
                  placeholder="Colombo City Center"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                  Host Organization
                </label>
                <input
                  className="bg-slate-950 p-4 rounded-2xl border border-white/10 outline-none focus:border-emerald-500 transition-all text-white placeholder:text-slate-700"
                  placeholder="Urban Care Team"
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({ ...formData, organization: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                Program Details
              </label>
              <textarea
                rows="5"
                className="bg-slate-950 p-4 rounded-2xl border border-white/10 outline-none focus:border-emerald-500 transition-all text-white placeholder:text-slate-700 resize-none"
                placeholder="Outline the goals, registration process, and volunteer roles..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                className="flex-1 bg-emerald-500 text-slate-950 font-black px-8 py-4 rounded-2xl hover:bg-emerald-400 hover:-translate-y-0.5 transition-all shadow-lg shadow-emerald-500/20 active:translate-y-0"
              >
                Publish Initiative
              </button>
              <button
                type="button"
                onClick={() => setView("overview")}
                className="px-8 py-4 rounded-2xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
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
