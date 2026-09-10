'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Award,
  FileCheck,
  TrendingUp,
  Target,
  Layers,
  Building2,
  Users,
  Compass,
  FileText,
  Activity,
  LogOut,
  GraduationCap,
  BookOpen,
  Briefcase,
  Scale,
  Sparkles,
  Shield,
  Zap,
  Loader2,
} from 'lucide-react';
import clsx from 'clsx';
import { UserRole } from '@/types/auth';

interface SidebarProps {
  role?: UserRole;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role = 'student', onLogout }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [pendingHref, setPendingHref] = React.useState<string | null>(null);

  React.useEffect(() => {
    setPendingHref(null);
  }, [pathname]);

  const handleRoleQuickSwitch = (targetRole: UserRole) => {
    let targetPath = '/';
    if (targetRole === 'student' || targetRole === 'learner') {
      targetPath = '/student/dashboard';
    } else if (targetRole === 'trainer' || targetRole === 'provider') {
      targetPath = '/trainer/dashboard';
    } else {
      targetPath = '/government/dashboard';
    }

    const saved = localStorage.getItem('skilltrack_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        parsed.role = targetRole;
        localStorage.setItem('skilltrack_user', JSON.stringify(parsed));
        localStorage.setItem('skilltrack_role', targetRole);
        router.push(targetPath);
        router.refresh();
        return;
      } catch {}
    }

    router.push(`/login?role=${targetRole}`);
  };

  // Build role-tailored navigation groups
  const getNavGroups = () => {
    const isStudent = role === 'student' || role === 'learner';
    const isTrainer = role === 'trainer' || role === 'provider';

    if (isStudent) {
      return [
        {
          group: 'Student Career GPS',
          items: [
            { label: 'My Cockpit', href: '/student/dashboard', icon: LayoutDashboard },
            { label: 'My Skill Gap (4-Tier)', href: '/student/skill-gap', icon: Target },
            { label: 'Recommended Courses', href: '/student/courses', icon: BookOpen },
            { label: 'Placement Journey', href: '/student/placement', icon: Compass },
          ],
        },
        {
          group: 'National Course Registry',
          items: [
            { label: 'Course Intelligence', href: '/courses/intelligence', icon: Award },
            { label: 'Outcome Intelligence Hub', href: '/outcome-intelligence', icon: Activity },
          ],
        },
      ];
    }

    if (isTrainer) {
      return [
        {
          group: 'Trainer Cohort Oversight',
          items: [
            { label: 'Trainer Dashboard', href: '/trainer/dashboard', icon: LayoutDashboard },
            { label: 'Course Intelligence', href: '/courses/intelligence', icon: BookOpen },
            { label: 'Curriculum Compare', href: '/courses/compare', icon: Scale },
          ],
        },
        {
          group: 'National Skilling Hub',
          items: [
            { label: 'Outcome Intelligence', href: '/outcome-intelligence', icon: Activity },
            { label: 'Milestone Evidence', href: '/outcome-intelligence/evidence', icon: FileCheck },
          ],
        },
      ];
    }

    // Default: Government & Administrator
    return [
      {
        group: 'National Intelligence Telemetry',
        items: [
          { label: 'Government Cockpit', href: '/government/dashboard', icon: Shield },
          { label: 'Course Intelligence Database', href: '/courses/intelligence', icon: BookOpen },
          { label: 'Course Comparison Matrix', href: '/courses/compare', icon: Scale },
          { label: 'National Analytics', href: '/outcome-intelligence/analytics', icon: TrendingUp },
          { label: 'Longitudinal Outcome Ledger', href: '/outcome-intelligence/outcomes', icon: Award },
          { label: 'Milestone Evidence Audits', href: '/outcome-intelligence/evidence', icon: FileCheck },
          { label: 'Explainable AI Insights', href: '/outcome-intelligence/insights', icon: Compass },
        ],
      },
      {
        group: 'Persona Previews',
        items: [
          { label: 'Candidate Experience View', href: '/student/dashboard', icon: GraduationCap },
          { label: 'Trainer Cohort View', href: '/trainer/dashboard', icon: Briefcase },
        ],
      },
    ];
  };

  const navGroups = getNavGroups();

  return (
    <aside className="w-64 bg-white border-r border-[#D1D9E2] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            <div className="text-[10px] font-bold text-[#627D98] uppercase tracking-wider px-3 mb-2">
              {group.group}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                const isPending = pendingHref === item.href && !isActive;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={true}
                    onClick={() => {
                      if (!isActive) setPendingHref(item.href);
                    }}
                    className={clsx(
                      'flex items-center justify-between px-3 py-2 rounded text-xs font-semibold transition-colors',
                      isActive
                        ? 'bg-[#0B3B60] text-white shadow-xs'
                        : isPending
                        ? 'bg-[#E2E8F0] text-[#0B3B60]'
                        : 'text-[#334E68] hover:bg-[#F0F4F8] hover:text-[#0B3B60]'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin text-[#006876] shrink-0" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Role Quick Switcher in Sidebar Footer */}
      <div className="p-4 border-t border-[#E2E8F0] space-y-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-1.5 flex items-center justify-between">
            <span>Switch Role Persona</span>
            <span className="text-emerald-700 text-[9px] font-bold">1-Click</span>
          </div>
          <div className="grid grid-cols-3 gap-1 text-[10px]">
            <button
              onClick={() => handleRoleQuickSwitch('student')}
              className={`py-1 px-1.5 rounded border text-center font-bold transition-all ${
                role === 'student' || role === 'learner'
                  ? 'bg-[#0B3B60] text-white border-[#0B3B60]'
                  : 'bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#334E68] border-[#CBD5E1]'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => handleRoleQuickSwitch('trainer')}
              className={`py-1 px-1.5 rounded border text-center font-bold transition-all ${
                role === 'trainer' || role === 'provider'
                  ? 'bg-[#0B3B60] text-white border-[#0B3B60]'
                  : 'bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#334E68] border-[#CBD5E1]'
              }`}
            >
              Trainer
            </button>
            <button
              onClick={() => handleRoleQuickSwitch('government')}
              className={`py-1 px-1.5 rounded border text-center font-bold transition-all ${
                role === 'government' || role === 'admin'
                  ? 'bg-[#0B3B60] text-white border-[#0B3B60]'
                  : 'bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#334E68] border-[#CBD5E1]'
              }`}
            >
              Gov Admin
            </button>
          </div>
        </div>

        <div className="bg-[#F8FAFC] border border-[#D1D9E2] rounded p-2.5 text-xs">
          <div className="text-[10px] font-semibold text-[#627D98]">Platform Status</div>
          <div className="flex items-center gap-1.5 mt-0.5 text-emerald-700 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Telemetry Engine Live</span>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full h-8 rounded text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        )}
      </div>
    </aside>
  );
};
