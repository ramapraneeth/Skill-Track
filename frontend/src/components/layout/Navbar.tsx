import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { UserRole } from '../../types'
import {
  UserCheck,
  Building2,
  Landmark,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react'

export const Navbar: React.FC = () => {
  const { user, role, switchRole, logout } = useAuth()
  const navigate = useNavigate()

  const handleRoleChange = (newRole: UserRole) => {
    switchRole(newRole)
    if (newRole === 'learner') navigate('/learner/dashboard')
    else if (newRole === 'provider') navigate('/provider/dashboard')
    else if (newRole === 'government') navigate('/government/dashboard')
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[#D1D9E2] bg-white">
      {/* National Tricolor Micro Strip */}
      <div className="h-0.5 bg-gradient-to-r from-[#E65100] via-white to-[#059669]"></div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Positioning */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded bg-[#0B3B60] text-white font-black text-sm tracking-tight">
              ST
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-[#0B3B60] tracking-tight">
                  SkillTrack
                </span>
                <span className="hidden rounded bg-[#E8F0F7] px-2 py-0.5 text-[9px] font-bold text-[#0B3B60] uppercase tracking-wider sm:inline-block border border-[#B4CFE5]">
                  GovTech Layer
                </span>
              </div>
              <p className="hidden text-[10px] font-medium text-[#718096] sm:block">
                Longitudinal Skilling Outcome Intelligence
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Live Role Switcher */}
        <div className="flex items-center gap-1 rounded bg-[#F4F6F9] p-1 border border-[#D1D9E2] text-xs">
          <span className="hidden px-2 text-[10px] font-bold text-[#718096] uppercase tracking-wider md:inline-block">
            View As:
          </span>
          <button
            onClick={() => handleRoleChange('learner')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 font-semibold transition text-xs cursor-pointer ${
              role === 'learner'
                ? 'bg-[#0B3B60] text-white shadow-2xs'
                : 'text-[#4A5568] hover:text-[#1C2733] hover:bg-slate-200/60'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span>Learner</span>
          </button>
          <button
            onClick={() => handleRoleChange('provider')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 font-semibold transition text-xs cursor-pointer ${
              role === 'provider'
                ? 'bg-[#0B3B60] text-white shadow-2xs'
                : 'text-[#4A5568] hover:text-[#1C2733] hover:bg-slate-200/60'
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Training Provider</span>
          </button>
          <button
            onClick={() => handleRoleChange('government')}
            className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 font-semibold transition text-xs cursor-pointer ${
              role === 'government'
                ? 'bg-[#0B3B60] text-white shadow-2xs'
                : 'text-[#4A5568] hover:text-[#1C2733] hover:bg-slate-200/60'
            }`}
          >
            <Landmark className="h-3.5 w-3.5" />
            <span>Government</span>
          </button>
        </div>

        {/* Right Section: Home Link, User Info & Logout */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="hidden text-xs font-semibold text-[#4A5568] hover:text-[#0B3B60] lg:flex items-center gap-1"
          >
            <span>Public Home</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          <div className="h-4 w-px bg-[#D1D9E2] hidden lg:block" />

          {/* User Profile Pill */}
          <div className="flex items-center gap-2 pl-1">
            <div className="w-8 h-8 rounded bg-[#E8F0F7] border border-[#B4CFE5] flex items-center justify-center font-bold text-xs text-[#0B3B60]">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="hidden text-left xl:block">
              <p className="text-xs font-bold text-[#1C2733] leading-tight">{user?.fullName || 'Authenticated User'}</p>
              <p className="text-[10px] font-medium text-[#718096] capitalize">{role || 'User'}</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="Logout and return to Home"
            className="flex items-center gap-1 text-xs text-[#718096] hover:text-[#C5221F] p-1.5 rounded hover:bg-slate-100 transition border border-transparent hover:border-[#F5A9A4] cursor-pointer ml-1"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}
