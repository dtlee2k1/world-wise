import { useLayoutEffect } from 'react'
import { useAuth } from '../../utils/customHooks'
import { useNavigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: JSX.Element
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  useLayoutEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return isAuthenticated ? children : null
}
