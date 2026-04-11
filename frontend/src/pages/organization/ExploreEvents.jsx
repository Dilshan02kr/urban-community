import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExploreEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/events");
        setEvents(res.data.data || []);
      } catch (err) {
        console.error("Error fetching community events", err);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="p-6 lg:p-10 min-h-screen" style={{ background: "#0f1117", color: "#f1f5f9" }}>

      {/* Header */}
      <header
        className="mb-8 pb-6"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "#f1f5f9", letterSpacing: "-0.5px" }}
        >
          Explore Initiatives
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#6b7280" }}>
          See what other organizations are doing in the community.
        </p>
      </header>

      {/* Grid */}
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")
              }
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: "3px",
                  background: "#6366f1",
                  borderRadius: "16px 16px 0 0",
                }}
              />

              {/* Organization badge */}
              <div className="mt-1 mb-4">
                <span
                  className="text-xs font-bold uppercase px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(99,102,241,0.12)",
                    color: "#a5b4fc",
                    border: "1px solid rgba(99,102,241,0.2)",
                    letterSpacing: "0.8px",
                    display: "inline-block",
                    maxWidth: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {event.organization}
                </span>
              </div>

              {/* Title */}
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "#f1f5f9", lineHeight: "1.4" }}
              >
                {event.title}
              </h3>

              {/* Description */}
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
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "#94a3b8" }}
                >
                  <span style={{ fontSize: "12px" }}>📍</span>
                  {event.location}
                </div>
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "#94a3b8" }}
                >
                  <span style={{ fontSize: "12px" }}>📅</span>
                  {new Date(event.date).toLocaleDateString(undefined, {
                    dateStyle: "long",
                  })}
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
              No community events listed yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}