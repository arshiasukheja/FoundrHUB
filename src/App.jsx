import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
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
import InvestorDashboard from './pages/InvestorDashboard'
import DailyInsightsDashboard from './pages/DailyInsightsDashboard'
import InvestorDecisionDashboardPage from './pages/investor/InvestorDecisionDashboardPage'
import InvestorDiscoveryPage from './pages/investor/InvestorDiscoveryPage'
import InvestorDealFlowPage from './pages/investor/InvestorDealFlowPage'
import InvestorWatchlistPage from './pages/investor/InvestorWatchlistPage'
import TractionDashboardPage from './pages/investor/TractionDashboardPage'
import FounderConsistencyPage from './pages/investor/FounderConsistencyPage'
import MemoGeneratorPage from './pages/investor/MemoGeneratorPage'
import DealInboxPage from './pages/investor/DealInboxPage'
import CityInsightsPage from './pages/investor/CityInsightsPage'
import AIAnalyticsPage from './pages/AIAnalyticsPage'
import RoadmapPage from './pages/RoadmapPage'
import PricingPage from './pages/PricingPage'
import AnalyserPage from './pages/AnalyserPage'
import StartupDiscoveryMapPage from './pages/StartupDiscoveryMapPage'
import NicheValidationInsightsPage from './pages/NicheValidationInsightsPage'

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
  const { user, isAuthenticated, getDashboardPathForRole } = useAuth()
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
        <Route path="/roadmap" element={<PageTransition><RoadmapPage /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
        <Route path="/analyser" element={<PageTransition><AnalyserPage /></PageTransition>} />
        <Route path="/startup-map" element={<PageTransition><StartupDiscoveryMapPage /></PageTransition>} />
        <Route path="/niche-validation" element={<PageTransition><NicheValidationInsightsPage /></PageTransition>} />
        <Route 
          path="/verify" 
          element={
            <ProtectedRoute>
              <PageTransition><VerifyPage /></PageTransition>
            </ProtectedRoute>
          } 
        />
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
          path="/dashboard/insights"
          element={
            <ProtectedRoute allowedRoles={['founder', 'investor']}>
              <PageTransition><DailyInsightsDashboard /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route path="/dashboard" element={<Navigate to={isAuthenticated ? getDashboardPathForRole(user?.role) : '/signin'} replace />} />
        <Route
          path="/dashboard/investor"
          element={
            <ProtectedRoute allowedRoles={['investor']}>
              <PageTransition><InvestorDashboard /></PageTransition>
            </ProtectedRoute>
          }
        >
          <Route index element={<PageTransition><InvestorDecisionDashboardPage /></PageTransition>} />
          <Route path="discovery" element={<PageTransition><InvestorDiscoveryPage /></PageTransition>} />
          <Route path="deal-flow" element={<PageTransition><InvestorDealFlowPage /></PageTransition>} />
          <Route path="watchlist" element={<PageTransition><InvestorWatchlistPage /></PageTransition>} />
          <Route path="traction" element={<PageTransition><TractionDashboardPage /></PageTransition>} />
          <Route path="consistency" element={<PageTransition><FounderConsistencyPage /></PageTransition>} />
          <Route path="memo" element={<PageTransition><MemoGeneratorPage /></PageTransition>} />
          <Route path="inbox" element={<PageTransition><DealInboxPage /></PageTransition>} />
          <Route path="city" element={<PageTransition><CityInsightsPage /></PageTransition>} />
        </Route>
        <Route path="/investor/dashboard" element={<Navigate to="/dashboard/insights" replace />} />
        <Route
          path="/dashboard/ai-analytics"
          element={
            <ProtectedRoute allowedRoles={['founder']}>
              <PageTransition><AIAnalyticsPage /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/explore"
          element={
            <Navigate to="/dashboard/insights" replace />
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
