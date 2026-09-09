import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { User, Database, CheckCircle2 } from 'lucide-react'

export const SettingsPage: React.FC = () => {
  const { user, role } = useAuth()
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#002541]">Platform Settings & Audit Preferences</h1>
          <p className="text-xs text-[#52606D] mt-0.5">Manage portal preferences, privacy options, and database connections</p>
        </div>
      </div>

      {saved && (
        <div className="rounded-md border border-[#C8E6C9] bg-[#E8F5E9] p-4 text-xs text-[#059669] flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-[#059669]" />
          <span>Preferences updated successfully.</span>
        </div>
      )}

      {/* User Information */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider flex items-center gap-2">
          <User className="h-4 w-4 text-[#0B3B60]" />
          <span>User Profile Information</span>
        </h2>
        <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 text-xs sm:grid-cols-2">
          <div>
            <label className="font-semibold text-[#1F2937] block mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={user?.fullName}
              className="h-10 w-full rounded-md border border-[#D1D9E2] bg-white px-3 text-xs text-[#1F2937] outline-none focus:border-[#0B3B60]"
            />
          </div>
          <div>
            <label className="font-semibold text-[#1F2937] block mb-1">Registered Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              disabled
              className="h-10 w-full rounded-md border border-[#D1D9E2] bg-[#F4F6F9] px-3 text-xs text-[#52606D] outline-none font-mono"
            />
          </div>
          <div>
            <label className="font-semibold text-[#1F2937] block mb-1">Role Assigned</label>
            <input
              type="text"
              value={(role || 'unassigned').toUpperCase()}
              disabled
              className="h-10 w-full rounded-md border border-[#D1D9E2] bg-[#F4F6F9] px-3 text-xs text-[#0B3B60] outline-none font-bold"
            />
          </div>
          <div>
            <label className="font-semibold text-[#1F2937] block mb-1">Contact Phone</label>
            <input
              type="text"
              defaultValue={user?.phone}
              className="h-10 w-full rounded-md border border-[#D1D9E2] bg-white px-3 text-xs text-[#1F2937] outline-none focus:border-[#0B3B60]"
            />
          </div>

          <div className="sm:col-span-2 pt-2">
            <button
              type="submit"
              className="h-10 rounded-md bg-[#0B3B60] px-4 font-semibold text-xs text-white hover:bg-[#082944] transition"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Database & Integration Config */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs space-y-3 text-xs">
        <h2 className="text-sm font-bold text-[#002541] uppercase tracking-wider flex items-center gap-2">
          <Database className="h-4 w-4 text-[#0B3B60]" />
          <span>Database & Environment Configuration</span>
        </h2>
        <div className="rounded-md bg-[#F8FAFC] border border-[#D1D9E2] p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#1F2937]">Target Database:</span>
            <span className="font-mono font-semibold text-[#0B3B60]">Neon PostgreSQL</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#1F2937]">Connection Mode:</span>
            <span className="font-mono text-[#059669] font-semibold">SSL Mode Required (Encrypted)</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-semibold text-[#1F2937]">Deployment Architecture:</span>
            <span className="text-[#52606D]">Native Node.js & Python Engine (No Docker)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

