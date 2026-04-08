import { useCallback, useMemo, useState } from 'react'
import { AuthContext } from '@/contexts/authContext'
import { authStorage } from '@/utils/storage'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => authStorage.getToken())

  const login = useCallback((newToken, profile) => {
    if (newToken !== undefined) {
      if (newToken) authStorage.setToken(newToken)
      else authStorage.removeToken()
      setToken(newToken ?? null)
    }
    if (profile !== undefined) {
      setUser(profile)
    }
  }, [])

  const logout = useCallback(() => {
    authStorage.removeToken()
    setToken(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      logout,
      setUser,
    }),
    [user, token, login, logout],
  )

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  )
}
