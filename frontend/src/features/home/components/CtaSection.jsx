export function CtaSection({ onRegisterClick }) {
  return (
    <section
      id="cta"
      className="mx-auto max-w-7xl px-6 pb-20 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="rounded-[2rem] border border-accent-hover/20 bg-gradient-to-r from-accent/15 via-surface to-sky-muted/10 p-8 text-center shadow-2xl shadow-accent-shadow/10 sm:p-12">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-soft">
          Join the movement
        </span>
        <h2
          id="cta-heading"
          className="mt-4 text-3xl font-bold text-fg sm:text-4xl"
        >
          Together, we can create cleaner and more responsive urban spaces.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-fg-muted">
          Whether you are a citizen raising your voice or an organization leading
          change, Urban Community gives you the tools to make a lasting impact.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            className="rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-on-accent transition hover:scale-[1.02] hover:bg-accent-hover"
            onClick={onRegisterClick}
          >
            Create an Account
          </button>
          <button
            type="button"
            className="rounded-2xl border border-glass/10 bg-glass/5 px-6 py-3 text-sm font-semibold text-fg transition hover:border-accent-hover/40 hover:bg-glass/10"
          >
            Organization Portal
          </button>
        </div>
      </div>
    </section>
  )
}
