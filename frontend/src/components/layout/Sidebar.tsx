import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  LayoutDashboard,
  User,
  Award,
  Briefcase,
  GitCommit,
  Sparkles,
  BrainCircuit,
  Users,
  GraduationCap,
  LineChart,
  BarChart3,
  Landmark,
  Compass,
  Zap,
  Layers,
  FileSpreadsheet,
  Building,
  CheckSquare,
  Search,
} from 'lucide-react'

interface NavItem {
  label: string
  path: string
  icon: any
  badge?: string
}

export const Sidebar: React.FC = () => {
  const { role } = useAuth()
  const currentRole = role || 'learner'

  const learnerNav: NavItem[] = [
    { label: 'Dashboard', path: '/learner/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/learner/profile', icon: User },
    { label: 'My Skills', path: '/learner/skills', icon: Award },
    { label: 'Training & Certifications', path: '/learner/recommendations', icon: GraduationCap },
    { label: 'Skill Gap Analysis', path: '/learner/skill-gap', icon: Compass, badge: 'Diagnostic' },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'My Outcomes', path: '/learner/outcomes', icon: LineChart },
    { label: 'Interventions', path: '/interventions', icon: Zap },
    { label: 'Follow-ups', path: '/learner/timeline', icon: GitCommit },
  ]

  const providerNav: NavItem[] = [
    { label: 'Dashboard', path: '/provider/dashboard', icon: LayoutDashboard },
    { label: 'Learners', path: '/provider/learners', icon: Users },
    { label: 'Training Programs', path: '/provider/programmes', icon: GraduationCap },
    { label: 'Certifications', path: '/provider/analytics', icon: Award },
    { label: 'Placement Outcomes', path: '/provider/outcomes', icon: Briefcase },
    { label: 'Skill Demand', path: '/job-demand', icon: LineChart },
    { label: 'Interventions', path: '/interventions', icon: Zap },
    { label: 'Reports', path: '/government/reports', icon: FileSpreadsheet },
  ]

  const governmentNav: NavItem[] = [
    { label: 'Dashboard', path: '/government/dashboard', icon: Landmark },
    { label: 'Learners Registry', path: '/provider/learners', icon: Users },
    { label: 'Training Providers', path: '/government/providers', icon: Building },
    { label: 'Skills & Demand', path: '/government/skills', icon: Award },
    { label: 'Outcome Analytics', path: '/provider/outcomes', icon: LineChart },
    { label: 'Retention & Risk', path: '/government/predictions', icon: BrainCircuit, badge: 'XAI' },
    { label: 'Interventions', path: '/government/interventions', icon: Zap },
    { label: 'Impact Measurement', path: '/government/impact', icon: BarChart3, badge: 'Empirical' },
    { label: 'Reports & Audits', path: '/government/reports', icon: FileSpreadsheet },
  ]

  const activeRoleNav =
    currentRole === 'learner'
      ? learnerNav
      : currentRole === 'provider'
      ? providerNav
      : governmentNav

  return (
    <aside className="w-64 shrink-0 border-r border-[#D1D9E2] bg-white min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between select-none">
      <div className="space-y-5">
        {/* Current Portal Identification Box */}
        <div className="rounded border border-[#D1D9E2] bg-[#F4F6F9] p-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#718096] block">
            Active Workspace
          </span>
          <p className="text-xs font-bold text-[#0B3B60] capitalize mt-0.5">
            {currentRole === 'learner'
              ? 'Learner Portal'
              : currentRole === 'provider'
              ? 'Training Provider Portal'
              : 'National Government Cockpit'}
          </p>
          <p className="text-[10px] text-[#4A5568] mt-0.5">
            {currentRole === 'learner'
              ? 'Longitudinal Outcome & Skill Journey'
              : currentRole === 'provider'
              ? 'Batch Placement & Retention Tracking'
              : 'Policy & Impact Evaluation System'}
          </p>
        </div>

        {/* Primary Role Navigation */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#718096]">
            {currentRole.toUpperCase()} NAVIGATION
          </p>
          <div className="space-y-0.5">
            {activeRoleNav.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded px-3 py-2 text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#E8F0F7] text-[#0B3B60] border-l-3 border-[#0B3B60]'
                        : 'text-[#4A5568] hover:bg-slate-50 hover:text-[#1C2733]'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="rounded bg-white px-1.5 py-0.5 text-[9px] font-bold text-[#0B3B60] border border-[#B4CFE5] uppercase">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              )
            })}
          </div>
        </div>

        {/* Cross-Cutting Utilities */}
        <div className="pt-3 border-t border-[#E2E8F0] space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-[#718096]">
            ECOSYSTEM UTILITIES
          </p>
          <NavLink
            to="/skill-gap"
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded px-3 py-2 text-xs font-medium transition ${
                isActive ? 'bg-[#E8F0F7] text-[#0B3B60] font-bold' : 'text-[#4A5568] hover:bg-slate-50'
              }`
            }
          >
            <Compass className="h-4 w-4" />
            <span>Skill Gap Diagnosis</span>
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded px-3 py-2 text-xs font-medium transition ${
                isActive ? 'bg-[#E8F0F7] text-[#0B3B60] font-bold' : 'text-[#4A5568] hover:bg-slate-50'
              }`
            }
          >
            <Briefcase className="h-4 w-4" />
            <span>Active Vacancies</span>
          </NavLink>
          <NavLink
            to="/impact"
            className={({ isActive }) =>
              `flex items-center gap-2.5 rounded px-3 py-2 text-xs font-medium transition ${
                isActive ? 'bg-[#E8F0F7] text-[#0B3B60] font-bold' : 'text-[#4A5568] hover:bg-slate-50'
              }`
            }
          >
            <BarChart3 className="h-4 w-4" />
            <span>Impact Hub</span>
          </NavLink>
        </div>
      </div>

      {/* Institutional Metadata */}
      <div className="pt-4 border-t border-[#E2E8F0] text-[10px] text-[#718096]">
        <p className="font-bold text-[#0B3B60]">SkillTrack Intelligence</p>
        <p>GovTech Layer (Post-SIDH)</p>
      </div>
    </aside>
  )
}
