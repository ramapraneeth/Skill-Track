'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';
import clsx from 'clsx';
import { UserRole } from '@/types/auth';

interface SidebarProps {
  role?: UserRole;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role = 'government', onLogout }) => {
  const pathname = usePathname();

  const navItems = [
    // Outcome Intelligence Hub Section
    {
      group: 'Outcome Intelligence Hub',
      items: [
        { label: 'Executive Overview', href: '/outcome-intelligence', icon: Activity },
        { label: 'Longitudinal Outcomes', href: '/outcome-intelligence/outcomes', icon: Award },
        { label: 'Milestone Evidence', href: '/outcome-intelligence/evidence', icon: FileCheck },
        { label: 'National Analytics', href: '/outcome-intelligence/analytics', icon: TrendingUp },
        { label: 'Explainable Insights', href: '/outcome-intelligence/insights', icon: Compass },
      ],
    },
    // Institutional Cockpit Section
    {
      group: 'Institutional Cockpits',
      items: [
        { label: 'Government Dashboard', href: '/government/dashboard', icon: LayoutDashboard },
        { label: 'Learner Cockpit', href: '/learner/dashboard', icon: Users },
        { label: 'Provider Portal', href: '/provider/dashboard', icon: Building2 },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-[#D1D9E2] flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-6">
        {navItems.map((group, idx) => (
          <div key={idx}>
            <div className="text-[10px] font-bold text-[#627D98] uppercase tracking-wider px-3 mb-2">
              {group.group}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-2.5 px-3 py-2 rounded text-xs font-semibold transition-colors',
                      isActive
                        ? 'bg-[#0B3B60] text-white shadow-xs'
                        : 'text-[#334E68] hover:bg-[#F0F4F8] hover:text-[#0B3B60]'
                    )}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-[#E2E8F0]">
        <div className="bg-[#F8FAFC] border border-[#D1D9E2] rounded p-3 text-xs mb-3">
          <div className="text-[11px] font-semibold text-[#627D98]">Platform Status</div>
          <div className="flex items-center gap-1.5 mt-1 text-emerald-700 font-bold text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Neon PostgreSQL Live</span>
          </div>
        </div>

        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full h-9 rounded text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        )}
      </div>
    </aside>
  );
};
