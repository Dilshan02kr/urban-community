export function CtaSection({ onRegisterClick }) {
  return (
    <section
      id="cta"
      className="mx-auto max-w-7xl px-6 pb-20 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="rounded-[2rem] border border-emerald-400/20 bg-gradient-to-r from-emerald-500/15 via-slate-900 to-sky-500/10 p-8 text-center shadow-2xl shadow-emerald-950/10 sm:p-12">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
          Join the movement
        </span>
        <h2
          id="cta-heading"
          className="mt-4 text-3xl font-bold text-white sm:text-4xl"
        >
          Together, we can create cleaner and more responsive urban spaces.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-300">
          Whether you are a citizen raising your voice or an organization leading
          change, Urban Community gives you the tools to make a lasting impact.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-emerald-400"
            onClick={onRegisterClick}
          >
            Create an Account
          </button>
          <button
            type="button"
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/40 hover:bg-white/10"
          >
            Organization Portal
          </button>
        </div>
      </div>
    </section>
  )
}
