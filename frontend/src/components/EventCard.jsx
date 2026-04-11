import React from "react";

const formatDate = (dateValue) => {
  if (!dateValue) return "Date not available";

  const parsed = new Date(dateValue);
  if (Number.isNaN(parsed.getTime())) return "Date not available";

  return parsed.toLocaleDateString("en-LK", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

export default function EventCard({
  event,
  membershipStatus,
  isRequesting,
  onSendRequest,
}) {
  const isPending = membershipStatus === "Pending";
  const isAccepted = membershipStatus === "Accepted";

  const buttonLabel = isPending
    ? "Request Pending"
    : isAccepted
      ? "Accepted"
      : isRequesting
        ? "Sending..."
        : "Send Request";

  const buttonClass = isAccepted
    ? "mt-5 inline-flex items-center justify-center rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-semibold text-white"
    : isPending
      ? "mt-5 inline-flex items-center justify-center rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white"
      : "mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-emerald-300";

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{event.title}</h2>
      <p className="mt-2 line-clamp-3 text-sm text-slate-600">{event.description}</p>

      <dl className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-500">Date</dt>
          <dd className="font-medium text-slate-800">{formatDate(event.date)}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-500">Location</dt>
          <dd className="font-medium text-slate-800">{event.location}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-slate-500">Organizer</dt>
          <dd className="text-right font-medium text-slate-800">{event.organization}</dd>
        </div>
      </dl>

      <button
        type="button"
        onClick={() => onSendRequest(event._id)}
        disabled={isPending || isAccepted || isRequesting}
        className={buttonClass}
      >
        {buttonLabel}
      </button>
    </article>
  );
}
