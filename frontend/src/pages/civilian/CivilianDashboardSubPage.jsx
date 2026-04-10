export default function CivilianDashboardSubPage({ title, description }) {
  return (
    <div className="mx-auto max-w-3xl">
      <header className="mb-8 text-center sm:text-left">
        <h1
          className="text-3xl font-bold tracking-tight text-slate-900"
          style={{ fontFamily: "'Lora', Georgia, serif" }}
        >
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-sm font-medium text-slate-600">{description}</p>
        ) : null}
      </header>

      <div className="rounded-3xl border border-slate-200/90 bg-white/90 px-8 py-12 shadow-lg shadow-slate-200/40 backdrop-blur-md">
        <p className="text-center text-slate-600 sm:text-left">
          This section is ready for your team to plug in real content and flows.
        </p>
      </div>
    </div>
  )
}
