import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { get, ref } from 'firebase/database'
import { auth, db } from '../lib/firebase'
import { ensureUserData, updateUserProfile } from '../lib/firebaseData'

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

const getDashboardPathForRole = (role) => {
  if (role === 'founder') return '/dashboard/founder'
  if (role === 'investor') return '/dashboard/investor'
  return '/signin'
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (authUser) => {
      if (!authUser) {
        setUser(null)
        setIsReady(true)
        return
      }

      const profileSnap = await get(ref(db, `users/${authUser.uid}/profile`))
      const profile = profileSnap.exists() ? profileSnap.val() : {}
      const normalizedUser = {
        uid: authUser.uid,
        email: authUser.email || profile.email || '',
        name: authUser.displayName || profile.name || 'Founder',
        role: profile.role || 'founder'
      }

      setUser(normalizedUser)
      setIsReady(true)
    })

    return () => unsub()
  }, [])

  const signup = useCallback(async ({ name, email, password, role }) => {
    const cleanName = (name || '').trim() || (email || '').split('@')[0]
    if (!cleanName || !email || !password) {
      return { ok: false, error: 'Please fill in all required fields.' }
    }

    const selectedRole = role === 'investor' ? 'investor' : role === 'mentor' ? 'mentor' : 'founder'

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(credential.user, { displayName: cleanName })

      const profile = {
        name: cleanName,
        email: credential.user.email || email,
        role: selectedRole
      }

      await ensureUserData(credential.user.uid, profile)
      const sessionUser = { uid: credential.user.uid, ...profile }
      setUser(sessionUser)

      return { ok: true, user: sessionUser }
    } catch (error) {
      return { ok: false, error: error?.message || 'Unable to create your account.' }
    }
  }, [])

  const login = useCallback(async ({ email, password }) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      const profileSnap = await get(ref(db, `users/${credential.user.uid}/profile`))
      const profile = profileSnap.exists() ? profileSnap.val() : { role: 'founder', name: credential.user.displayName || 'Founder', email }

      await ensureUserData(credential.user.uid, profile)
      const sessionUser = {
        uid: credential.user.uid,
        name: profile.name || credential.user.displayName || 'Founder',
        email: credential.user.email || email,
        role: profile.role || 'founder'
      }
      setUser(sessionUser)
      return { ok: true, user: sessionUser }
    } catch (error) {
      return { ok: false, error: error?.message || 'Unable to sign in.' }
    }
  }, [])

  const updateUser = useCallback(async (uData) => {
    if (!user?.uid) return
    const updatedUser = { ...user, ...uData }
    setUser(updatedUser)
    await updateUserProfile(user.uid, uData)
  }, [user])

  const logout = useCallback(async () => {
    await signOut(auth)
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
        isReady,
        isAuthenticated: !!user,
        getDashboardPathForRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
