import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext({
  user: null,
  signup: async () => ({ ok: false }),
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  getDashboardPathForRole: () => '/signin',
  isAuthenticated: false,
})

export const useAuth = () => useContext(AuthContext)

const AUTH_KEY = 'foundrhub_auth'
const USER_KEY = 'foundrhub_user'
const USERS_KEY = 'foundrhub_users'

const normalizeEmail = (email = '') => email.trim().toLowerCase()

const getDashboardPathForRole = (role) => {
  if (role === 'founder') return '/dashboard/founder'
  return '/dashboard/explore'
}

const readUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const writeUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

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

  const setSession = useCallback((userData) => {
    const token = 'fh_' + Date.now() + '_' + Math.random().toString(36).slice(2)
    localStorage.setItem(AUTH_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(userData))
    setUser(userData)
  }, [])

  const signup = useCallback(async ({ name, email, password, role }) => {
    const cleanEmail = normalizeEmail(email)
    const cleanName = (name || '').trim()

    if (!cleanName || !cleanEmail || !password) {
      return { ok: false, error: 'Please fill in all required fields.' }
    }

    const selectedRole = role === 'founder' ? 'founder' : 'discoverer'
    const users = readUsers()
    const exists = users.some(u => normalizeEmail(u.email) === cleanEmail)

    if (exists) {
      return { ok: false, error: 'An account with this email already exists.' }
    }

    const newUser = {
      id: 'u_' + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password,
      role: selectedRole,
      avatar: null,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    writeUsers(users)

    const sessionUser = { ...newUser }
    delete sessionUser.password
    setSession(sessionUser)

    return { ok: true, user: sessionUser }
  }, [setSession])

  const login = useCallback(async ({ email, password }) => {
    const cleanEmail = normalizeEmail(email)
    const users = readUsers()
    const index = users.findIndex(u => normalizeEmail(u.email) === cleanEmail)

    if (index === -1) {
      return { ok: false, error: 'No account found for this email.' }
    }

    const account = users[index]
    const hasPassword = typeof account.password === 'string' && account.password.length > 0

    if (hasPassword && account.password !== password) {
      return { ok: false, error: 'Incorrect password.' }
    }

    if (!hasPassword) {
      users[index] = { ...account, password }
      writeUsers(users)
    }

    const sessionUser = { ...users[index] }
    delete sessionUser.password
    setSession(sessionUser)

    return { ok: true, user: sessionUser }
  }, [setSession])

  const updateUser = useCallback((uData) => {
    if (!user) return
    const updatedUser = { ...user, ...uData }
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
    setUser(updatedUser)

    // Also update in the global users list
    const users = readUsers()
    const index = users.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users[index] = { ...users[index], ...uData }
      writeUsers(users)
    }
  }, [user])

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
        getDashboardPathForRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
