'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  BookOpen,
  Briefcase,
  FileCheck,
  MoreHorizontal,
  ChevronRight,
  Target,
  Zap,
  Route,
  GraduationCap,
  Award,
  Search,
  BadgeCheck,
  TrendingUp,
  Sparkles,
  Bell,
  Settings,
  HelpCircle,
  BarChart3,
  Calendar,
  ClipboardCheck,
  FileText,
  Clock,
  Folder,
  MessageSquare,
  Landmark,
  ShieldCheck,
  Building2,
  AlertTriangle,
  Users,
  Layers
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
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
    return null;
  });

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
      icon: BookOpen,
      items: [
        { label: 'Skills & Proficiency', href: '/learner/skills', icon: Target },
        { label: 'AI Skill Gap', href: '/learner/skill-gap', icon: Zap, badge: 'AI' },
        { label: 'Learning Roadmap', href: '/learner/roadmap', icon: Route },
        { label: 'Courses & Outcomes', href: '/learner/courses', icon: GraduationCap },
        { label: 'Certificates (NSQF)', href: '/learner/certificates', icon: Award },
      ],
    },
    {
      id: 'career',
      label: 'Career',
      icon: Briefcase,
      items: [
        { label: 'Jobs & Openings', href: '/learner/opportunities', icon: Search },
        { label: 'Placement Tracking', href: '/learner/opportunities?tab=applications', icon: BadgeCheck },
        { label: 'Employment Outcomes', href: '/learner/progress', icon: TrendingUp },
        { label: 'AI Career Assistant', href: '/learner/career-assistant', icon: Sparkles, badge: 'AI' },
      ],
    },
    {
      id: 'applications',
      label: 'Applications',
      icon: FileCheck,
      items: [
        { label: 'NAPS Internships', href: '/learner/opportunities?type=internship', icon: Briefcase },
        { label: 'Active Applications', href: '/learner/opportunities?tab=applications', icon: FileCheck },
        { label: 'Application Status', href: '/learner/opportunities?tab=status', icon: Clock },
      ],
    },
    {
      id: 'more',
      label: 'More',
      icon: MoreHorizontal,
      items: [
        { label: 'Notifications', href: '/learner/notifications', icon: Bell },
        { label: 'Settings', href: '/learner/settings', icon: Settings },
        { label: 'Help & Support', href: '/learner/settings?tab=help', icon: HelpCircle },
      ],
    },
  ];

  // Flat Nav for Trainer (Vector icons)
  const trainerNavItems: NavItem[] = [
    { label: 'Dashboard', href: '/trainer/dashboard', icon: LayoutDashboard },
    { label: 'My Profile & ToT', href: '/trainer/profile', icon: Award },
    { label: 'Courses & Syllabus', href: '/trainer/courses', icon: BookOpen },
    { label: 'Training Batches', href: '/trainer/batches', icon: Building2 },
    { label: 'My Students', href: '/trainer/learners', icon: Users },
    { label: 'Class Schedule', href: '/trainer/schedule', icon: Calendar },
    { label: 'Daily Attendance', href: '/trainer/attendance', icon: ClipboardCheck },
    { label: 'Assessments', href: '/trainer/assessments', icon: FileText },
    { label: 'Assessment Scores', href: '/trainer/assessment-results', icon: Award },
    { label: 'Curriculum Progress', href: '/trainer/progress', icon: Clock },
    { label: 'Resource Library', href: '/trainer/materials', icon: Folder },
    { label: 'Quality & Feedback', href: '/trainer/feedback', icon: MessageSquare },
    { label: 'Instruction Analytics', href: '/trainer/analytics', icon: BarChart3 },
    { label: 'Circulars & Alerts', href: '/trainer/notifications', icon: Bell },
    { label: 'Settings', href: '/trainer/settings', icon: Settings },
  ];

  // Flat Nav for Government (Vector icons)
  const governmentNavItems: NavItem[] = [
    { label: 'National Intelligence', href: '/government/dashboard', icon: Landmark },
    { label: 'Skill Gap Heatmap', href: '/government/skill-gap', icon: Route, badge: 'AI' },
    { label: 'Course Intelligence', href: '/government/course-intelligence', icon: BarChart3, badge: 'Key' },
    { label: 'Training Capacity', href: '/government/training-centers', icon: Building2 },
    { label: 'Placement Analytics', href: '/government/employment', icon: Briefcase },
    { label: 'Employment Outcomes', href: '/government/employment', icon: TrendingUp },
    { label: 'Industry Skill Demand', href: '/government/skills', icon: Target },
    { label: 'Regional Analytics', href: '/government/geographic-analytics', icon: Route },
    { label: 'Government Schemes', href: '/government/schemes', icon: Award },
    { label: 'Candidate Registry', href: '/government/learners', icon: Users },
    { label: 'ToT Trainer Registry', href: '/government/trainers', icon: GraduationCap },
    { label: 'Early Warning Radar', href: '/government/early-warning', icon: AlertTriangle, badge: 'Alert' },
    { label: 'Statutory Reports', href: '/government/reports', icon: FileText },
    { label: 'Audit & Compliance', href: '/government/alerts', icon: ShieldCheck },
    { label: 'System DPI Gateways', href: '/government/settings', icon: Settings },
  ];

  const roleTitle =
    normalizedRole === 'government'
      ? 'Government Authority'
      : normalizedRole === 'trainer'
      ? 'Accredited Trainer'
      : 'Learner';

  return (
    <aside className="w-60 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between shrink-0 transition-colors h-[calc(100vh-57px)] sticky top-[57px] overflow-y-auto">
      <div className="p-3 space-y-2">
        {/* Compact Active Portal Status Card */}
        <div className="px-3 py-2 rounded-md bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block leading-tight">
              Portal
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
          <nav className="space-y-0.5">
            {/* 1. Dashboard (Direct) */}
            <Link
              href="/learner/dashboard"
              className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                pathname === '/learner/dashboard'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 font-semibold border-l-2 border-[#1D4ED8]'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 shrink-0" />
                <span>Dashboard</span>
              </div>
            </Link>

            {/* 2. My Profile (Direct) */}
            <Link
              href="/learner/profile"
              className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all ${
                pathname === '/learner/profile'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 font-semibold border-l-2 border-[#1D4ED8]'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4 shrink-0" />
                <span>My Profile</span>
              </div>
            </Link>

            {/* 3. Collapsible Groups: Learning, Career, Applications, More */}
            {learnerGroups.map((group) => {
              const isOpen = expandedGroup === group.id;
              const hasActiveChild = group.items.some(
                (item) => pathname === item.href || (item.href.includes('?') && pathname === item.href.split('?')[0])
              );
              const GroupIcon = group.icon;

              return (
                <div key={group.id} className="pt-0.5">
                  {/* Group Header Trigger */}
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.id)}
                    className={`flex items-center justify-between w-full px-3 py-2 rounded-md text-xs font-medium transition-all ${
                      hasActiveChild
                        ? 'text-[#1D4ED8] dark:text-blue-400 font-semibold bg-slate-50 dark:bg-slate-800/40'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <GroupIcon className="w-4 h-4 shrink-0 text-slate-500 dark:text-slate-400" />
                      <span>{group.label}</span>
                    </div>
                    <ChevronRight
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-90 text-[#1D4ED8]' : ''
                      }`}
                    />
                  </button>

                  {/* Collapsible Sub-Items Container */}
                  <div
                    className={`transition-all duration-200 ease-in-out overflow-hidden ${
                      isOpen ? 'max-h-80 opacity-100 mt-0.5' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="ml-3 pl-2.5 border-l border-slate-200 dark:border-slate-800 space-y-0.5 py-0.5">
                      {group.items.map((subItem) => {
                        const isSubActive =
                          pathname === subItem.href ||
                          (subItem.href.includes('?') && pathname === subItem.href.split('?')[0]);
                        const SubIcon = subItem.icon;

                        return (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                              isSubActive
                                ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <SubIcon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                              <span className="truncate">{subItem.label}</span>
                            </div>
                            {subItem.badge && (
                              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 uppercase">
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
          /* Trainer & Government Navigation */
          <nav className="space-y-0.5">
            {(normalizedRole === 'government' ? governmentNavItems : trainerNavItems).map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== '/trainer/dashboard' &&
                  item.href !== '/government/dashboard' &&
                  pathname.startsWith(item.href));
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 font-semibold border-l-2 border-[#1D4ED8]'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ItemIcon className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase ${
                        item.badge === 'AI'
                          ? 'bg-blue-100 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300'
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

      {/* Role Switcher Dock */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70">
        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1.5">
          Portal Switcher
        </span>
        <div className="grid grid-cols-3 gap-1 text-[11px] font-medium">
          <Link
            href="/learner/dashboard"
            onClick={() => onSwitchRole?.('learner')}
            className={`py-1 text-center rounded border transition-colors ${
              normalizedRole === 'learner'
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] font-semibold'
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
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] font-semibold'
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
                ? 'bg-[#1D4ED8] text-white border-[#1D4ED8] font-semibold'
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

