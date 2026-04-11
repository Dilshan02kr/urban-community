export default function EventCard({ event }) {
  return (
    <div className="relative rounded-2xl p-5 border border-slate-200 bg-white transition-all hover:border-emerald-500/40 overflow-hidden">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-emerald-500 rounded-t-2xl" />

      <div className="mt-1 mb-4">
        <span className="text-xs font-bold uppercase px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 inline-block max-w-full truncate">
          {event.organization}
        </span>
      </div>

      <h3 className="text-base font-semibold mb-2 text-slate-900 leading-snug">
        {event.title}
      </h3>

      <p className="text-sm mb-5 text-slate-600 line-clamp-3 leading-relaxed">
        {event.description}
      </p>

      <div className="pt-4 flex flex-col gap-2 border-t border-slate-100 text-slate-500 text-xs">
        <div className="flex items-center gap-2">
          <span>📍</span> {event.location}
        </div>
        <div className="flex items-center gap-2">
          <span>📅</span> {new Date(event.date).toLocaleDateString(undefined, { dateStyle: "long" })}
        </div>
      </div>
    </div>
  );
}