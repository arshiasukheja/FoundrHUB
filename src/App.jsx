import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Toast from './components/Toast'

// Pages
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import VerifyPage from './pages/VerifyPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import FounderDashboard from './pages/FounderDashboard'

/* Page transition wrapper */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.div>
)

const AppRoutes = () => {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/explore" element={<PageTransition><ExplorePage /></PageTransition>} />
        <Route path="/verify" element={<PageTransition><VerifyPage /></PageTransition>} />
        <Route path="/signin" element={<PageTransition><SignInPage /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PageTransition><ProfilePage /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <PageTransition><SettingsPage /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/founder/dashboard"
          element={
            <ProtectedRoute allowedRoles={['founder']}>
              <PageTransition><FounderDashboard /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/founder"
          element={
            <ProtectedRoute allowedRoles={['founder']}>
              <PageTransition><FounderDashboard /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/explore"
          element={
            <ProtectedRoute allowedRoles={['discoverer']}>
              <PageTransition><ExplorePage /></PageTransition>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

const App = () => (
  <AuthProvider>
    <AppRoutes />
  </AuthProvider>
)

export default App
