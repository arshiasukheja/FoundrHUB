import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import ProtectedRoute from './components/Auth/ProtectedRoute'
import Toast from './components/Shared/Toast'

// Pages
import HomePage from './pages/Home/HomePage'
import ExplorePage from './pages/Discovery/ExplorePage'
import VerifyPage from './pages/Verification/VerifyPage'
import SignInPage from './pages/Auth/SignInPage'
import SignUpPage from './pages/Auth/SignUpPage'
import ProfilePage from './pages/Account/ProfilePage'
import SettingsPage from './pages/Account/SettingsPage'
import FounderDashboard from './pages/Dashboards/FounderDashboard'
import InvestorDashboard from './pages/Dashboards/InvestorDashboard'
import DailyInsightsDashboard from './pages/Dashboards/DailyInsightsDashboard'
import InvestorDecisionDashboardPage from './pages/Dashboards/investor/InvestorDecisionDashboardPage'
import InvestorDiscoveryPage from './pages/Dashboards/investor/InvestorDiscoveryPage'
import InvestorDealFlowPage from './pages/Dashboards/investor/InvestorDealFlowPage'
import InvestorWatchlistPage from './pages/Dashboards/investor/InvestorWatchlistPage'
import TractionDashboardPage from './pages/Dashboards/investor/TractionDashboardPage'
import FounderConsistencyPage from './pages/Dashboards/investor/FounderConsistencyPage'
import MemoGeneratorPage from './pages/Dashboards/investor/MemoGeneratorPage'
import DealInboxPage from './pages/Dashboards/investor/DealInboxPage'
import CityInsightsPage from './pages/Dashboards/investor/CityInsightsPage'
import AIAnalyticsPage from './pages/Tools/AIAnalyticsPage'
import RoadmapPage from './pages/Tools/RoadmapPage'
import PricingPage from './pages/Misc/PricingPage'
import AnalyserPage from './pages/Tools/AnalyserPage'
import StartupDiscoveryMapPage from './pages/Discovery/StartupDiscoveryMapPage'
import FounderIntelligencePage from './pages/Tools/FounderIntelligencePage'
import InvestorMVPDashboard from './pages/Dashboards/InvestorMVPDashboard'
import NicheValidationInsightsPage from './pages/Tools/NicheValidationInsightsPage'
import CommunicationPage from './pages/Tools/CommunicationPage'
import StudentFounderEarlyAccessPage from './pages/StudentFounders/StudentFounderEarlyAccessPage'
import EarlyAccessOpportunitiesPage from './pages/StudentFounders/EarlyAccessOpportunitiesPage'

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
        <Route path="/founder-intelligence" element={<PageTransition><FounderIntelligencePage /></PageTransition>} />
        <Route path="/niche-validation" element={<PageTransition><NicheValidationInsightsPage /></PageTransition>} />
        <Route path="/student-founders" element={<PageTransition><StudentFounderEarlyAccessPage /></PageTransition>} />
        <Route path="/early-access-opportunities" element={<PageTransition><EarlyAccessOpportunitiesPage /></PageTransition>} />
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
        <Route
          path="/dashboard"
          element={
            <Navigate
              to={isAuthenticated ? `${getDashboardPathForRole(user?.role)}${location.search || ''}` : '/signin'}
              replace
            />
          }
        />
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
          path="/dashboard/communication"
          element={
            <ProtectedRoute allowedRoles={['founder']}>
              <PageTransition><CommunicationPage /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/discovery"
          element={
            <ProtectedRoute allowedRoles={['founder']}>
              <PageTransition><ExplorePage embedded /></PageTransition>
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/explore"
          element={
            <Navigate to="/dashboard/discovery" replace />
          }
        />
        <Route path="/investor-mvp" element={<PageTransition><InvestorMVPDashboard /></PageTransition>} />
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
