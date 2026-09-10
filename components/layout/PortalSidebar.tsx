'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: string;
  items: NavItem[];
}

interface PortalSidebarProps {
  currentRole?: 'learner' | 'trainer' | 'government' | 'student';
  role?: 'learner' | 'trainer' | 'government' | 'student';
  onSwitchRole?: (role: 'learner' | 'trainer' | 'government') => void;
  onLogout?: () => void;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({ currentRole, role, onSwitchRole }) => {
  const pathname = usePathname() || '';

  // Deduce role strictly from current pathname prefix
  const pathRole = pathname?.startsWith('/trainer')
    ? 'trainer'
    : pathname?.startsWith('/government')
    ? 'government'
    : pathname?.startsWith('/learner')
    ? 'learner'
    : currentRole || role || 'learner';

  const normalizedRole = pathRole === 'student' ? 'learner' : pathRole;

  // Collapsible accordion group state for Learner Portal
  const [expandedGroup, setExpandedGroup] = useState<string | null>(() => {
    if (pathname.startsWith('/learner/skills') || pathname.startsWith('/learner/skill-gap') || pathname.startsWith('/learner/roadmap') || pathname.startsWith('/learner/courses') || pathname.startsWith('/learner/certificates') || pathname.startsWith('/learner/my-learning')) {
      return 'learning';
    }
    if (pathname.startsWith('/learner/progress') || pathname.startsWith('/learner/career-assistant') || (pathname.startsWith('/learner/opportunities') && !pathname.includes('type=internship'))) {
      return 'career';
    }
    if (pathname.startsWith('/learner/opportunities') && pathname.includes('type=internship')) {
      return 'applications';
    }
    if (pathname.startsWith('/learner/notifications') || pathname.startsWith('/learner/settings')) {
      return 'more';
    }
    return null; // Default: Dashboard & My Profile active, groups collapsed
  });

  // Automatically keep the active route's group open when navigating
  useEffect(() => {
    if (pathname.startsWith('/learner/skills') || pathname.startsWith('/learner/skill-gap') || pathname.startsWith('/learner/roadmap') || pathname.startsWith('/learner/courses') || pathname.startsWith('/learner/certificates') || pathname.startsWith('/learner/my-learning')) {
      setExpandedGroup('learning');
    } else if (pathname.startsWith('/learner/progress') || pathname.startsWith('/learner/career-assistant') || (pathname.startsWith('/learner/opportunities') && !pathname.includes('type=internship'))) {
      setExpandedGroup('career');
    } else if (pathname.startsWith('/learner/opportunities') && pathname.includes('type=internship')) {
      setExpandedGroup('applications');
    } else if (pathname.startsWith('/learner/notifications') || pathname.startsWith('/learner/settings')) {
      setExpandedGroup('more');
    }
  }, [pathname]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroup((prev) => (prev === groupId ? null : groupId));
  };

  // Grouped Navigation for Student / Learner Portal
  const learnerGroups: NavGroup[] = [
    {
      id: 'learning',
      label: 'Learning',
      icon: '📚',
      items: [
        { label: 'Skills & Taxonomy', href: '/learner/skills', icon: '🎯' },
        { label: 'AI Skill Gap', href: '/learner/skill-gap', icon: '⚡', badge: 'AI' },
        { label: 'Learning Roadmap', href: '/learner/roadmap', icon: '🗺️' },
        { label: 'Courses & Outcomes', href: '/learner/courses', icon: '📖' },
        { label: 'Certificates (NSQF)', href: '/learner/certificates', icon: '📜' },
      ],
    },
    {
      id: 'career',
      label: 'Career',
      icon: '💼',
      items: [
        { label: 'Jobs & Openings', href: '/learner/opportunities', icon: '💼' },
        { label: 'Placement Tracking', href: '/learner/opportunities?tab=applications', icon: '🎯' },
        { label: 'Employment Outcomes', href: '/learner/progress', icon: '📈' },
        { label: 'AI Career Assistant', href: '/learner/career-assistant', icon: '🤖', badge: 'AI' },
      ],
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: '📋',
      items: [
        { label: 'NAPS Internships', href: '/learner/opportunities?type=internship', icon: '🎓' },
        { label: 'Active Applications', href: '/learner/opportunities?tab=applications', icon: '📨' },
        { label: 'Application Status', href: '/learner/opportunities?tab=status', icon: '⏱️' },
      ],
    },
    {
      id: 'more',
      label: 'More',
      icon: '⚙️',
      items: [
        { label: 'Notifications', href: '/learner/notifications', icon: '🔔' },
        { label: 'Settings', href: '/learner/settings', icon: '⚙️' },
        { label: 'Help & Support', href: '/learner/settings?tab=help', icon: '❓' },
      ],
    },
  ];

  // Flat Nav for Trainer
  const trainerNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/trainer/dashboard', icon: '📊' },
    { label: 'My Profile & ToT', href: '/trainer/profile', icon: '📜' },
    { label: 'Courses & Syllabus', href: '/trainer/courses', icon: '📚' },
    { label: 'Training Batches', href: '/trainer/batches', icon: '🏫' },
    { label: 'My Students', href: '/trainer/learners', icon: '👥' },
    { label: 'Class Schedule', href: '/trainer/schedule', icon: '📅' },
    { label: 'Daily Attendance', href: '/trainer/attendance', icon: '📋' },
    { label: 'Assessments', href: '/trainer/assessments', icon: '📝' },
    { label: 'Assessment Scores', href: '/trainer/assessment-results', icon: '⭐' },
    { label: 'Curriculum Progress', href: '/trainer/progress', icon: '⏱️' },
    { label: 'Resource Library', href: '/trainer/materials', icon: '📁' },
    { label: 'Quality & Feedback', href: '/trainer/feedback', icon: '💬' },
    { label: 'Instruction Analytics', href: '/trainer/analytics', icon: '📈' },
    { label: 'Circulars & Alerts', href: '/trainer/notifications', icon: '🔔' },
    { label: 'Settings', href: '/trainer/settings', icon: '⚙️' },
  ];

  // Flat Nav for Government
  const governmentNavItems: NavItem[] = [
    { label: 'National Intelligence', href: '/government/dashboard', icon: '🏛️' },
    { label: 'Skill Gap Heatmap', href: '/government/skill-gap', icon: '🗺️', badge: 'AI' },
    { label: 'Course Intelligence', href: '/government/course-intelligence', icon: '📊', badge: 'Key' },
    { label: 'Training Capacity', href: '/government/training-centers', icon: '🏫' },
    { label: 'Placement Analytics', href: '/government/employment', icon: '💼' },
    { label: 'Employment Outcomes', href: '/government/employment', icon: '📈' },
    { label: 'Industry Skill Demand', href: '/government/skills', icon: '🎯' },
    { label: 'Regional Analytics', href: '/government/geographic-analytics', icon: '📍' },
    { label: 'Government Schemes', href: '/government/schemes', icon: '💰' },
    { label: 'Candidate Registry', href: '/government/learners', icon: '👥' },
    { label: 'ToT Trainer Registry', href: '/government/trainers', icon: '🎓' },
    { label: 'Early Warning Radar', href: '/government/early-warning', icon: '🚨', badge: 'Alert' },
    { label: 'Statutory Reports', href: '/government/reports', icon: '📑' },
    { label: 'Audit & Compliance', href: '/government/alerts', icon: '🛡️' },
    { label: 'System DPI Gateways', href: '/government/settings', icon: '⚙️' },
  ];

  const roleTitle =
    normalizedRole === 'government'
      ? 'Government Authority'
      : normalizedRole === 'trainer'
      ? 'Accredited Trainer'
      : 'Student / Candidate';

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 transition-colors h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto">
      <div className="p-3 space-y-2.5">
        {/* Compact Active Portal Status Card */}
        <div className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block leading-tight">
              Active Portal
            </span>
            <span className="text-xs font-bold text-[#0B192C] dark:text-slate-100 leading-tight">
              {roleTitle}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/60 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">Online</span>
          </div>
        </div>

        {/* Student / Learner Portal: Hierarchical Navigation */}
        {normalizedRole === 'learner' ? (
          <nav className="space-y-1">
            {/* 1. Dashboard (Direct) */}
            <Link
              href="/learner/dashboard"
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                pathname === '/learner/dashboard'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 font-bold border-l-3 border-[#1D4ED8]'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm leading-none shrink-0">📊</span>
                <span>Dashboard</span>
              </div>
            </Link>

            {/* 2. My Profile (Direct) */}
            <Link
              href="/learner/profile"
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                pathname === '/learner/profile'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 font-bold border-l-3 border-[#1D4ED8]'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-sm leading-none shrink-0">👤</span>
                <span>My Profile</span>
              </div>
            </Link>

            {/* 3. Collapsible Groups: Learning, Career, Applications, More */}
            {learnerGroups.map((group) => {
              const isOpen = expandedGroup === group.id;
              const hasActiveChild = group.items.some(
                (item) => pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0])
              );

              return (
                <div key={group.id} className="pt-0.5">
                  {/* Group Header Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      hasActiveChild
                        ? 'text-[#1D4ED8] dark:text-blue-400 font-bold bg-slate-50/70 dark:bg-slate-800/40'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm leading-none shrink-0">{group.icon}</span>
                      <span>{group.label}</span>
                    </div>
                    <svg
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-90 text-[#1D4ED8]' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Collapsible Sub-Items Container */}
                  <div
                    className={`transition-all duration-200 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-80 opacity-100 mt-0.5' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="ml-4 pl-2.5 border-l border-slate-200 dark:border-slate-800 space-y-0.5 py-0.5">
                      {group.items.map((subItem) => {
                        const isSubActive =
                          pathname === subItem.href ||
                          (subItem.href.includes('?') && pathname === subItem.href.split('?')[0]);

                        return (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
                              isSubActive
                                ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 font-bold'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:text-slate-300'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-xs leading-none shrink-0">{subItem.icon}</span>
                              <span className="truncate">{subItem.label}</span>
                            </div>
                            {subItem.badge && (
                              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 uppercase">
                                {subItem.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        ) : (
          /* Trainer & Government Navigation (Preserved) */
          <nav className="space-y-0.5">
            {(normalizedRole === 'government' ? governmentNavItems : trainerNavItems).map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/trainer/dashboard' &&
                  item.href !== '/government/dashboard' &&
                  pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 font-bold shadow-2xs border-l-3 border-[#1D4ED8]'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm leading-none shrink-0">{item.icon}</span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        item.badge === 'AI'
                          ? 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                          : item.badge === 'Alert'
                          ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        )}
      </div>

      {/* Clean SIH Role Switcher Dock */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
          SIH Role Switcher
        </span>
        <div className="grid grid-cols-3 gap-1 text-[11px] font-semibold">
          <Link
            href="/learner/dashboard"
            onClick={() => onSwitchRole?.('learner')}
            className={`py-1 text-center rounded border transition-colors ${
              normalizedRole === 'learner'
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            Student
          </Link>
          <Link
            href="/trainer/dashboard"
            onClick={() => onSwitchRole?.('trainer')}
            className={`py-1 text-center rounded border transition-colors ${
              normalizedRole === 'trainer'
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            Trainer
          </Link>
          <Link
            href="/government/dashboard"
            onClick={() => onSwitchRole?.('government')}
            className={`py-1 text-center rounded border transition-colors ${
              normalizedRole === 'government'
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8]'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            Govt
          </Link>
        </div>
      </div>
    </aside>
  );
};
