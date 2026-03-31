import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Toast from './Toast'
import { useState, useEffect } from 'react'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, getDashboardPathForRole } = useAuth()
  const location = useLocation()
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      setShowToast(true)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <>
        {showToast && (
          <Toast
            message="Please log in to continue"
            onClose={() => setShowToast(false)}
          />
        )}
        <Navigate to="/signin" state={{ from: location }} replace />
      </>
    )
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to={getDashboardPathForRole(user?.role)} replace />
  }

  return children
}

export default ProtectedRoute
