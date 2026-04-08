import { Link, Navigate, useParams } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

const COPY = {
  civilian: {
    title: 'Register as a civilian',
    description:
      'Complete your profile to report issues, join eco events, and stay informed about your neighborhood.',
  },
  organization: {
    title: 'Register as an organization',
    description:
      'Set up your organization profile to publish events, programs, and connect with engaged citizens.',
  },
}

const VALID_ROLES = new Set(['civilian', 'organization'])

export function RegisterEntryPage() {
  const { role } = useParams()
  if (!role || !VALID_ROLES.has(role)) {
    return <Navigate to={ROUTES.HOME} replace />
  }
  const content = COPY[role]

  return (
    <section className="page max-w-xl">
      <h1 className="text-2xl font-semibold text-fg-alt">{content.title}</h1>
      <p className="mt-3 leading-relaxed text-fg-subtle">{content.description}</p>
      <p className="mt-6 text-sm text-fg-faint">
        Registration form will be available here in a future update.
      </p>
      <p className="mt-6">
        <Link to={ROUTES.HOME} className="text-accent-hover hover:text-accent-soft">
          ← Back home
        </Link>
      </p>
    </section>
  )
}
