import React from 'react'
import { Navigate } from 'react-router-dom'

/**
 * Login Route Deprecation:
 * In accordance with the project specification, separate login pages/routes are deprecated.
 * Authentication is handled exclusively through the UnifiedLoginModal triggered from the home page ('/').
 */
export const Login: React.FC = () => {
  return <Navigate to="/" replace />
}

export default Login
