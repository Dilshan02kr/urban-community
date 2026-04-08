import { ROLE_CARDS } from '@/features/home/data/homeContent'
import { RoleCard } from './RoleCard'

export function RolesSection() {
  return (
    <section
      id="roles"
      className="mx-auto max-w-7xl px-6 py-10 lg:px-8"
      aria-labelledby="roles-heading"
    >
      <h2 id="roles-heading" className="sr-only">
        Join as a citizen or organization
      </h2>
      <div className="grid gap-8 lg:grid-cols-2">
        {ROLE_CARDS.map((role) => (
          <RoleCard key={role.id} {...role} />
        ))}
      </div>
    </section>
  )
}
