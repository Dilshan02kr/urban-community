import { HOW_IT_WORKS_IMAGE, STEPS } from '@/features/home/data/homeContent'

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
      aria-labelledby="how-heading"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
            How it works
          </span>
          <h2
            id="how-heading"
            className="mt-4 text-3xl font-bold text-white sm:text-4xl"
          >
            Simple steps, meaningful community impact
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-400">
            From reporting local issues to joining green programs, the platform
            helps citizens and organizations collaborate in a clear and effective
            way.
          </p>

          <ol className="mt-8 space-y-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-sm font-bold text-slate-950">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-2xl shadow-black/20">
          <img
            src={HOW_IT_WORKS_IMAGE}
            alt="People joining an environmental community event"
            className="h-[440px] w-full rounded-[1.5rem] object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
