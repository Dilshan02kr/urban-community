const ACCENT = {
  sky: {
    button:
      'bg-sky-400 text-slate-950 hover:scale-[1.02] hover:bg-sky-300',
    icon: 'bg-sky-500/20',
    wrapper:
      'bg-gradient-to-br from-sky-500/15 to-slate-900 shadow-sky-950/20',
  },
  emerald: {
    button: 'bg-white text-slate-950 hover:scale-[1.02]',
    icon: 'bg-emerald-500/20',
    wrapper:
      'bg-gradient-to-br from-emerald-500/15 to-slate-900 shadow-emerald-950/20',
  },
}

export function RoleCard({
  icon,
  title,
  description,
  points,
  buttonText,
  accent = 'emerald',
}) {
  const styles = ACCENT[accent] ?? ACCENT.emerald

  return (
    <div
      className={`overflow-hidden rounded-[2rem] border border-white/10 p-8 shadow-xl ${styles.wrapper}`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${styles.icon}`}
      >
        {icon}
      </div>
      <h3 className="mt-6 text-2xl font-bold">{title}</h3>
      <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
        {description}
      </p>
      <ul className="mt-6 space-y-3 text-sm text-slate-300">
        {points.map((point) => (
          <li key={point}>• {point}</li>
        ))}
      </ul>
      <button
        type="button"
        className={`mt-8 rounded-2xl px-6 py-3 text-sm font-semibold transition ${styles.button}`}
      >
        {buttonText}
      </button>
    </div>
  )
}
