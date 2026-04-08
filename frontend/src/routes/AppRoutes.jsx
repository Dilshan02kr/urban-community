import { Routes, Route } from 'react-router-dom'
import { MarketingLayout } from '@/layouts/MarketingLayout'
import { MainLayout } from '@/layouts/MainLayout'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { RegisterEntryPage } from '@/pages/RegisterEntryPage'
import { ROUTES } from '@/constants/routes'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route path="register/:role" element={<RegisterEntryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
