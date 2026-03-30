import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Toast from './Toast'
import { useState, useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
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
        <Navigate to="/" state={{ from: location }} replace />
      </>
    )
  }

  return children
}

export default ProtectedRoute
