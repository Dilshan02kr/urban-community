import { HERO_IMAGE, STATS } from '@/features/home/data/homeContent'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.14),transparent_28%)]" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300">
            Smarter urban engagement
          </span>
          <h1
            id="hero-heading"
            className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Build a cleaner, safer, and more connected city together.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            Urban Community is a civic platform where citizens can report public
            issues, share complaints, explore eco events, and support sustainable
            waste management. Organizations can host programs that inspire real
            community impact.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-2xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-emerald-500/30 transition hover:scale-[1.02] hover:bg-emerald-400"
            >
              Get Started
            </button>
            <button
              type="button"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:border-emerald-400/40 hover:bg-white/10"
            >
              Explore Programs
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg shadow-black/20"
              >
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-emerald-900/20 backdrop-blur-sm">
            <img
              src={HERO_IMAGE}
              alt="Urban community volunteers and city sustainability"
              className="h-[520px] w-full rounded-[1.5rem] object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/10 bg-slate-950/65 p-5 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl">
                  ♻️
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Stronger communities start with action
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Encourage residents to report issues faster, join
                    environmental events, and support cleaner neighborhoods
                    through collaborative action.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
