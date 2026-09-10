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
  ChevronDown,
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
  Layers,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

interface NavSection {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
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
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Deduce role strictly from current pathname prefix
  const pathRole = pathname?.startsWith('/trainer')
    ? 'trainer'
    : pathname?.startsWith('/government')
    ? 'government'
    : pathname?.startsWith('/learner')
    ? 'learner'
    : currentRole || role || 'learner';

  const normalizedRole = pathRole === 'student' ? 'learner' : pathRole;

  // Track expanded groups per section
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    overview: true,
    'learner-management': true,
    learning: true,
    assessment: true,
    schedule: true,
    'quality-analytics': true,
    communication: true,
    administration: true,
    career: true,
    applications: true,
    more: true,
    'programs-batches': true,
    learners: true,
    curriculum: true,
    'assessment-certification': true,
    'monitoring-reports': true,
  });

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // -------------------------------------------------------------
  // 1. TRAINER NAVIGATION GROUPS (Expanded & Organized Subdivisions)
  // -------------------------------------------------------------
  const trainerSections: NavSection[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      items: [
        { label: 'Dashboard', href: '/trainer/dashboard', icon: LayoutDashboard },
      ],
    },
    {
      id: 'learner-management',
      label: 'Learner Management',
      icon: Users,
      items: [
        { label: 'My Students', href: '/trainer/learners', icon: Users },
        { label: 'Training Batches', href: '/trainer/batches', icon: Building2 },
        { label: 'Daily Attendance', href: '/trainer/attendance', icon: ClipboardCheck },
      ],
    },
    {
      id: 'learning',
      label: 'Learning',
      icon: BookOpen,
      items: [
        { label: 'Courses & Syllabus', href: '/trainer/courses', icon: BookOpen },
        { label: 'Curriculum Progress', href: '/trainer/progress', icon: Clock },
        { label: 'Resource Library', href: '/trainer/materials', icon: Folder },
      ],
    },
    {
      id: 'assessment',
      label: 'Assessment',
      icon: FileText,
      items: [
        { label: 'Assessments', href: '/trainer/assessments', icon: FileText },
        { label: 'Assessment Scores', href: '/trainer/assessment-results', icon: Award },
      ],
    },
    {
      id: 'schedule',
      label: 'Schedule',
      icon: Calendar,
      items: [
        { label: 'Class Schedule', href: '/trainer/schedule', icon: Calendar },
      ],
    },
    {
      id: 'quality-analytics',
      label: 'Quality & Analytics',
      icon: BarChart3,
      items: [
        { label: 'Quality & Feedback', href: '/trainer/feedback', icon: MessageSquare },
        { label: 'Instruction Analytics', href: '/trainer/analytics', icon: BarChart3 },
      ],
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: Bell,
      items: [
        { label: 'Circulars & Alerts', href: '/trainer/notifications', icon: Bell },
      ],
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: Settings,
      items: [
        { label: 'My Profile & ToT', href: '/trainer/profile', icon: Award },
        { label: 'Settings', href: '/trainer/settings', icon: Settings },
      ],
    },
  ];

  // -------------------------------------------------------------
  // 2. GOVERNMENT TRAINING SECTION (Aligned Subdivisions)
  // -------------------------------------------------------------
  const governmentSections: NavSection[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Landmark,
      items: [
        { label: 'Government Training Dashboard', href: '/government/dashboard', icon: Landmark },
      ],
    },
    {
      id: 'programs-batches',
      label: 'Programs & Batches',
      icon: Building2,
      items: [
        { label: 'Training Programs', href: '/government/courses', icon: Award },
        { label: 'Government Batches', href: '/government/training-centers', icon: Building2 },
        { label: 'Cohorts', href: '/government/schemes', icon: Layers },
      ],
    },
    {
      id: 'learners',
      label: 'Learners',
      icon: Users,
      items: [
        { label: 'Government Learners', href: '/government/learners', icon: Users },
        { label: 'Attendance', href: '/government/training-centers', icon: ClipboardCheck },
        { label: 'Learner Progress', href: '/government/course-intelligence', icon: TrendingUp },
      ],
    },
    {
      id: 'curriculum',
      label: 'Curriculum',
      icon: BookOpen,
      items: [
        { label: 'Government Courses', href: '/government/course-intelligence', icon: BookOpen },
        { label: 'Syllabus', href: '/government/skills', icon: Target },
        { label: 'Learning Resources', href: '/government/schemes', icon: Folder },
      ],
    },
    {
      id: 'assessment-certification',
      label: 'Assessment & Certification',
      icon: ShieldCheck,
      items: [
        { label: 'Assessments', href: '/government/alerts', icon: FileText },
        { label: 'Assessment Results', href: '/government/reports', icon: Award },
        { label: 'Certifications', href: '/government/schemes', icon: ShieldCheck },
      ],
    },
    {
      id: 'monitoring-reports',
      label: 'Monitoring & Reports',
      icon: BarChart3,
      items: [
        { label: 'Training Performance', href: '/government/employment', icon: BarChart3 },
        { label: 'Outcome Tracking', href: '/government/geographic-analytics', icon: Route },
        { label: 'Government Reports', href: '/government/reports', icon: FileText },
      ],
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: Bell,
      items: [
        { label: 'Circulars', href: '/government/alerts', icon: Bell },
        { label: 'Announcements', href: '/government/notifications', icon: MessageSquare },
      ],
    },
    {
      id: 'administration',
      label: 'Administration',
      icon: Settings,
      items: [
        { label: 'Government Trainers', href: '/government/trainers', icon: GraduationCap },
        { label: 'Profile', href: '/government/settings', icon: User },
        { label: 'Settings', href: '/government/settings', icon: Settings },
      ],
    },
  ];

  // -------------------------------------------------------------
  // 3. LEARNER PORTAL NAVIGATION GROUPS
  // -------------------------------------------------------------
  const learnerSections: NavSection[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
      items: [
        { label: 'Dashboard', href: '/learner/dashboard', icon: LayoutDashboard },
        { label: 'My Profile', href: '/learner/profile', icon: User },
      ],
    },
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

  const activeSections =
    normalizedRole === 'trainer'
      ? trainerSections
      : normalizedRole === 'government'
      ? governmentSections
      : learnerSections;

  const roleTitle =
    normalizedRole === 'government'
      ? 'Government Authority'
      : normalizedRole === 'trainer'
      ? 'Accredited Trainer'
      : 'Learner';

  return (
    <aside
      className={`${
        isCollapsed ? 'w-16' : 'w-64'
      } bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col justify-between shrink-0 transition-all duration-200 h-[calc(100vh-57px)] sticky top-[57px] overflow-y-auto`}
    >
      <div className="p-3 space-y-3">
        {/* Active Portal Header & Collapse Toggle */}
        <div className="flex items-center justify-between gap-1.5 pb-2 border-b border-slate-100 dark:border-slate-800">
          {!isCollapsed && (
            <div className="px-1 min-w-0">
              <span className="text-[9px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider block leading-tight">
                Active Portal
              </span>
              <span className="text-xs font-bold text-[#0B192C] dark:text-slate-100 truncate block">
                {roleTitle}
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors mx-auto"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Grouped Subdivisions Navigation */}
        <nav className="space-y-4">
          {activeSections.map((section) => {
            const isSectionOpen = expandedSections[section.id] ?? true;

            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header (Hidden or compact in collapsed mode) */}
                {!isCollapsed ? (
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors group"
                  >
                    <span>{section.label}</span>
                    <span className="text-slate-400 group-hover:text-slate-600 transition-transform">
                      {isSectionOpen ? (
                        <ChevronDown className="w-3 h-3" />
                      ) : (
                        <ChevronRight className="w-3 h-3" />
                      )}
                    </span>
                  </button>
                ) : (
                  <div className="h-1 w-full border-t border-slate-100 dark:border-slate-800 my-1" />
                )}

                {/* Section Items */}
                {(isCollapsed || isSectionOpen) && (
                  <div className="space-y-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        pathname === item.href ||
                        (item.href !== '/trainer/dashboard' &&
                          item.href !== '/government/dashboard' &&
                          item.href !== '/learner/dashboard' &&
                          pathname.startsWith(item.href));

                      return (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          title={isCollapsed ? item.label : undefined}
                          className={`flex items-center ${
                            isCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
                          } rounded-lg text-xs font-medium transition-all ${
                            isActive
                              ? 'bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 font-semibold border-l-2 border-[#1D4ED8]'
                              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 ${
                                isActive
                                  ? 'text-[#1D4ED8] dark:text-blue-400'
                                  : 'text-slate-500 dark:text-slate-400'
                              }`}
                            />
                            {!isCollapsed && <span className="truncate">{item.label}</span>}
                          </div>

                          {!isCollapsed && item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 uppercase tracking-wider">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Compact Portal Role Switcher Dock at Bottom */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70">
        {!isCollapsed && (
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Switch Role
            </span>
            <span className="text-[9px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
              Verified
            </span>
          </div>
        )}

        <div className={`grid ${isCollapsed ? 'grid-cols-1 gap-1' : 'grid-cols-3 gap-1'} text-center`}>
          <Link
            href="/learner/dashboard"
            onClick={() => onSwitchRole?.('learner')}
            title="Student Portal"
            className={`py-1.5 px-1 rounded text-[11px] font-semibold transition-all ${
              normalizedRole === 'learner'
                ? 'bg-white dark:bg-slate-800 text-[#1D4ED8] dark:text-blue-400 shadow-2xs font-bold border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {isCollapsed ? 'Std' : 'Student'}
          </Link>
          <Link
            href="/trainer/dashboard"
            onClick={() => onSwitchRole?.('trainer')}
            title="Trainer Portal"
            className={`py-1.5 px-1 rounded text-[11px] font-semibold transition-all ${
              normalizedRole === 'trainer'
                ? 'bg-white dark:bg-slate-800 text-[#1D4ED8] dark:text-blue-400 shadow-2xs font-bold border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {isCollapsed ? 'Trn' : 'Trainer'}
          </Link>
          <Link
            href="/government/dashboard"
            onClick={() => onSwitchRole?.('government')}
            title="Government Portal"
            className={`py-1.5 px-1 rounded text-[11px] font-semibold transition-all ${
              normalizedRole === 'government'
                ? 'bg-white dark:bg-slate-800 text-[#1D4ED8] dark:text-blue-400 shadow-2xs font-bold border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {isCollapsed ? 'Gov' : 'Govt'}
          </Link>
        </div>
      </div>
    </aside>
  );
};
