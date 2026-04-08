import { AppProviders } from '@/providers/AppProviders'
import { AppRoutes } from '@/routes/AppRoutes'
import './App.css'

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}
