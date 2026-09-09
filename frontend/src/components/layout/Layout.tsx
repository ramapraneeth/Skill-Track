import React from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { ChevronRight } from 'lucide-react'

export const Layout: React.FC = () => {
  const location = useLocation()
  const pathSegments = location.pathname.split('/').filter(Boolean)

  return (
    <div className="min-h-screen bg-[#F4F6F9] flex flex-col font-sans text-[#1C2733]">
      <Navbar />

      {/* GovTech Platform Banner: Outcome Intelligence Notification */}
      <div className="bg-[#002541] px-4 py-2 text-xs text-slate-200 border-b border-[#0B3B60]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#059669]" />
            <span className="font-bold text-white">Longitudinal Outcome Layer Active:</span>
            <span className="hidden sm:inline text-slate-300">
              Downstream intelligence measuring employment, wage progression, and 90-day retention post-certification.
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 font-semibold">Track → Diagnose → Predict → Intervene → Follow-up</span>
        </div>
      </div>

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar />

        <main className="flex-1 p-6 lg:p-8 min-w-0">
          {/* Breadcrumbs */}
          {pathSegments.length > 0 && (
            <nav className="mb-5 flex items-center gap-1.5 text-xs text-[#718096]">
              <Link to="/" className="hover:text-[#0B3B60] transition">
                Home
              </Link>
              {pathSegments.map((seg, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight className="h-3 w-3 text-[#D1D9E2]" />
                  <span className={idx === pathSegments.length - 1 ? 'font-bold text-[#0B3B60] capitalize' : 'capitalize'}>
                    {seg.replace('-', ' ')}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          )}

          <Outlet />
        </main>
      </div>
    </div>
  )
}
