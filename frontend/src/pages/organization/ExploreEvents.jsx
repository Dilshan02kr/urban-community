import React, { useState, useEffect } from "react";
import { useCivilian } from "@/contexts/CivilianProvider";

export default function ExploreEvents() {
  const { events, getEvents } = useCivilian();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        await getEvents();
      } catch (error) {
        console.error("Error fetching events:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div
      className="p-6 lg:p-10 min-h-screen"
      style={{ background: "#ffffff", color: "#0f172a" }}
    >
      {/* Header */}
      <header
        className="mb-8 pb-6"
        style={{ borderBottom: "1px solid #e2e8f0" }}
      >
        <h1
          className="text-3xl font-bold tracking-tight"
          style={{ color: "#0f172a", letterSpacing: "-0.5px" }}
        >
          Explore Events
        </h1>
        <p className="mt-1 text-sm" style={{ color: "#475569" }}>
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
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                overflow: "hidden",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(16,185,129,0.45)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#e2e8f0")
              }
            >
              {/* Top accent bar */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  height: "3px",
                  background: "#10b981",
                  borderRadius: "16px 16px 0 0",
                }}
              />

              {/* Organization badge */}
              <div className="mt-1 mb-4">
                <span
                  className="text-xs font-bold uppercase px-3 py-1 rounded-full"
                  style={{
                    background: "rgba(16,185,129,0.12)",
                    color: "#34d399",
                    border: "1px solid rgba(16,185,129,0.2)",
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
                style={{ color: "#0f172a", lineHeight: "1.4" }}
              >
                {event.title}
              </h3>

              {/* Description */}
              <p
                className="text-sm mb-5"
                style={{
                  color: "#475569",
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
                style={{ borderTop: "1px solid #e2e8f0" }}
              >
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "#64748b" }}
                >
                  <span style={{ fontSize: "12px" }}>📍</span>
                  {event.location}
                </div>
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "#64748b" }}
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
            style={{ border: "1.5px dashed #cbd5e1", background: "#f8fafc" }}
          >
            <p className="text-base italic" style={{ color: "#64748b" }}>
              No community events listed yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}