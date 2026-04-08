import { FEATURES } from '@/features/home/data/homeContent'
import { FeatureCard } from './FeatureCard'

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-16 lg:px-8"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-soft">
          Core features
        </span>
        <h2
          id="features-heading"
          className="mt-4 text-3xl font-bold text-fg sm:text-4xl"
        >
          Everything your community needs in one platform
        </h2>
        <p className="mt-4 text-base leading-8 text-fg-subtle">
          Designed to connect citizens, organizations, and sustainability efforts
          through one modern digital experience.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {FEATURES.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  )
}
