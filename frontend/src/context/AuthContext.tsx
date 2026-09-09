import React, { createContext, useContext, useState, useEffect } from 'react'
import { User, UserRole } from '../types'
import { mockUsers } from '../data/mockData'

interface AuthContextType {
  user: User | null
  role: UserRole | null
  token: string | null
  login: (email: string, passwordOrRole: string, selectedRole?: UserRole) => Promise<void> | void
  logout: () => void
  switchRole: (newRole: UserRole) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole | null>(() => {
    return (localStorage.getItem('skilltrack_role') as UserRole) || null
  })

  const [user, setUser] = useState<User | null>(() => {
    const savedRole = localStorage.getItem('skilltrack_role') as UserRole
    return savedRole ? mockUsers[savedRole] : null
  })

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('skilltrack_role') ? 'mock-jwt-token-active' : null
  })

  useEffect(() => {
    if (role) {
      localStorage.setItem('skilltrack_role', role)
      setUser(mockUsers[role] || null)
      setToken('mock-jwt-token-active')
    } else {
      localStorage.removeItem('skilltrack_role')
      setUser(null)
      setToken(null)
    }
  }, [role])

  const login = (email: string, passwordOrRole: string, optionalRole?: UserRole) => {
    let resolvedRole: UserRole = 'learner'
    if (optionalRole) {
      resolvedRole = optionalRole
    } else if (passwordOrRole === 'learner' || passwordOrRole === 'provider' || passwordOrRole === 'government') {
      resolvedRole = passwordOrRole as UserRole
    }
    setRole(resolvedRole)
    const matchedUser = mockUsers[resolvedRole]
    setUser(matchedUser ? { ...matchedUser, email } : null)
    setToken('mock-jwt-token-active')
    localStorage.setItem('skilltrack_role', resolvedRole)
  }

  const logout = () => {
    setRole(null)
    setUser(null)
    setToken(null)
    localStorage.removeItem('skilltrack_role')
  }

  const switchRole = (newRole: UserRole) => {
    setRole(newRole)
    setUser(mockUsers[newRole] || null)
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
