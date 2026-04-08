import { Outlet } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'

export function MainLayout() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
