import { Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { ROUTES } from '@/constants/routes'

export function AppHeader() {
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="app-header">
      <Link to={ROUTES.HOME} className="app-header__brand">
        Urban Community
      </Link>
      <nav className="app-header__nav" aria-label="Main">
        {isAuthenticated ? (
          <button type="button" className="app-header__link" onClick={logout}>
            Sign out
          </button>
        ) : (
          <span className="app-header__muted">Not signed in</span>
        )}
      </nav>
    </header>
  )
}
