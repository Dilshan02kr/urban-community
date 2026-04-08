import { HERO_IMAGE, STATS } from '@/features/home/data/homeContent'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="hero-backdrop absolute inset-0" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="relative z-10">
          <span className="inline-flex rounded-full border border-accent-hover/30 bg-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-accent-soft">
            Smarter urban engagement
          </span>
          <h1
            id="hero-heading"
            className="mt-6 max-w-2xl text-4xl font-black leading-tight tracking-tight text-fg sm:text-5xl lg:text-6xl"
          >
            Build a cleaner, safer, and more connected city together.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-fg-muted sm:text-lg">
            Urban Community is a civic platform where citizens can report public
            issues, share complaints, explore eco events, and support sustainable
            waste management. Organizations can host programs that inspire real
            community impact.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-2xl bg-accent px-6 py-3 text-sm font-semibold text-on-accent shadow-xl shadow-accent/30 transition hover:scale-[1.02] hover:bg-accent-hover"
            >
              Get Started
            </button>
            <button
              type="button"
              className="rounded-2xl border border-glass/10 bg-glass/5 px-6 py-3 text-sm font-semibold text-fg transition hover:border-accent-hover/40 hover:bg-glass/10"
            >
              Explore Programs
            </button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-glass/10 bg-glass/5 p-4 shadow-lg shadow-black/20"
              >
                <p className="text-2xl font-bold text-fg">{stat.value}</p>
                <p className="mt-1 text-sm text-fg-subtle">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="relative overflow-hidden rounded-[2rem] border border-glass/10 bg-glass/5 p-3 shadow-2xl shadow-accent-deep/20 backdrop-blur-sm">
            <img
              src={HERO_IMAGE}
              alt="Urban community volunteers and city sustainability"
              className="h-[520px] w-full rounded-[1.5rem] object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-glass/10 bg-page/65 p-5 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent/20 text-2xl">
                  ♻️
                </div>
                <div>
                  <h2 className="text-lg font-bold text-fg">
                    Stronger communities start with action
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-fg-muted">
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
