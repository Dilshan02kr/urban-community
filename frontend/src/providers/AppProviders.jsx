import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthProvider'

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  )
}
