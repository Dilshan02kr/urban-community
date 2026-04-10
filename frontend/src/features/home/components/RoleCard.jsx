const ACCENT = {
  sky: {
    button:
      'bg-sky-accent text-on-accent hover:scale-[1.02] hover:bg-sky-accent-hover',
    icon: 'bg-sky-muted/20',
    wrapper:
      'bg-gradient-to-br from-sky-muted/15 to-surface shadow-sky-shadow/20',
  },
  emerald: {
    button: 'bg-fg text-on-accent hover:scale-[1.02]',
    icon: 'bg-accent/20',
    wrapper:
      'bg-gradient-to-br from-accent/15 to-surface shadow-accent-shadow/20',
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
      className={`overflow-hidden rounded-[2rem] border border-glass/10 p-8 shadow-xl ${styles.wrapper}`}
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${styles.icon}`}
      >
        {icon}
      </div>
      <h3 className="mt-6 text-2xl font-bold text-fg">{title}</h3>
      <p className="mt-4 max-w-xl text-sm leading-7 text-fg-muted">
        {description}
      </p>
      <ul className="mt-6 space-y-3 text-sm text-fg-muted">
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
