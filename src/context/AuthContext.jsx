import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
})

export const useAuth = () => useContext(AuthContext)

const AUTH_KEY = 'foundrhub_auth'
const USER_KEY = 'foundrhub_user'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Restore session on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem(AUTH_KEY)
      const savedUser = localStorage.getItem(USER_KEY)
      if (token && savedUser) {
        setUser(JSON.parse(savedUser))
      }
    } catch {
      localStorage.removeItem(AUTH_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }, [])

  const login = useCallback((userData) => {
    const token = 'fh_' + Date.now() + '_' + Math.random().toString(36).slice(2)
    const fullUser = {
      name: userData.name || 'Founder',
      email: userData.email || 'hello@foundrhub.in',
      role: userData.role || 'founder',
      avatar: userData.avatar || null,
      ...userData,
    }
    localStorage.setItem(AUTH_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(fullUser))
    setUser(fullUser)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
