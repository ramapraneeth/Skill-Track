import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, UserRole } from '../types'
import { api } from '../api/client'

interface AuthContextType {
  user: User | null
  role: UserRole | null
  token: string | null
  login: (identifier: string, passwordOrRole: string, selectedRole?: UserRole) => Promise<void>
  logout: () => void
  switchRole: (newRole: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | null>(() => {
    return (localStorage.getItem('skilltrack_role') as UserRole) || null
  })

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('skilltrack_user')
    if (savedUser) {
      try {
        return JSON.parse(savedUser)
      } catch {
        return null
      }
    }
    return null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('skilltrack_token') || null
  })

  useEffect(() => {
    if (!token) {
      setUser(null)
      setRole(null)
    }
  }, [token])

  const login = async (identifier: string, passwordOrRole: string, optionalRole?: UserRole) => {
    // If optionalRole is provided, passwordOrRole is the password
    const password = optionalRole ? passwordOrRole : 'demo1234'
    const requestedRole = optionalRole || (passwordOrRole as UserRole)

    // Authenticate with real FastAPI backend
    const authResult = await api.login({
      email: identifier,
      password: password,
      role: requestedRole,
    })

    const jwtToken = authResult.access_token
    const backendUser = authResult.user

    const mappedRole = (
      backendUser.role === 'provider' || backendUser.role === 'training_provider'
        ? 'provider'
        : backendUser.role === 'government' || backendUser.role === 'admin' || backendUser.role === 'administrator'
        ? 'government'
        : 'learner'
    ) as UserRole

    const authenticatedUser: User = {
      id: backendUser.id,
      email: backendUser.email,
      fullName: backendUser.fullName,
      role: mappedRole,
      avatarUrl:
        backendUser.avatarUrl ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    }

    setToken(jwtToken)
    setUser(authenticatedUser)
    setRole(mappedRole)

    localStorage.setItem('skilltrack_token', jwtToken)
    localStorage.setItem('skilltrack_role', mappedRole)
    localStorage.setItem('skilltrack_user', JSON.stringify(authenticatedUser))
  }

  const logout = () => {
    setRole(null)
    setUser(null)
    setToken(null)
    localStorage.removeItem('skilltrack_token')
    localStorage.removeItem('skilltrack_role')
    localStorage.removeItem('skilltrack_user')
  }

  const switchRole = (newRole: UserRole) => {
    setRole(newRole)
    if (user) {
      const updated = { ...user, role: newRole }
      setUser(updated)
      localStorage.setItem('skilltrack_user', JSON.stringify(updated))
      localStorage.setItem('skilltrack_role', newRole)
    }
  }

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
