export function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-emerald-400/30 hover:bg-white/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/15 text-2xl transition group-hover:scale-110">
        {icon}
      </div>
      <h4 className="mt-5 text-xl font-bold text-white">{title}</h4>
      <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
    </div>
  )
}
