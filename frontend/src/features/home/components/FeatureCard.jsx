export function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-[1.75rem] border border-glass/10 bg-glass/5 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:border-accent-hover/30 hover:bg-glass/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-2xl transition group-hover:scale-110">
        {icon}
      </div>
      <h4 className="mt-5 text-xl font-bold text-fg">{title}</h4>
      <p className="mt-3 text-sm leading-7 text-fg-subtle">{description}</p>
    </div>
  )
}
