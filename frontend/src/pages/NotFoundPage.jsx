import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  return (
    <section className="page">
      <h1>Page not found</h1>
      <p>
        <Link to={ROUTES.HOME}>Back home</Link>
      </p>
    </section>
  )
}
