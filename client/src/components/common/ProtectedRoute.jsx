import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children, role }) => {

  const { token, role: userRole } = useSelector((state) => state.auth || {})

  
  if (!token) {
    return <Navigate to="/login" replace />
  }

  
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />
  }

  
  return children
}

export default ProtectedRoute
