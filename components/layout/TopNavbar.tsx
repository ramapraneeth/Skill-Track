'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sparkles,
  Bell,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Compass,
  GraduationCap,
  Briefcase,
  Layers,
  Award,
  BookOpen,
  TrendingUp,
  FileText,
  BarChart3,
  Shield,
  Building2,
  Users,
} from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface TopNavbarProps {
  forcedRole?: 'learner' | 'trainer' | 'government';
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ forcedRole }) => {
  const pathname = usePathname() || '';
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<{
    id?: string;
    fullName: string;
    email: string;
    role: 'learner' | 'trainer' | 'government';
  } | null>(null);

  // Close menus when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
    setMoreDropdownOpen(false);
    setNotificationsOpen(false);
  }, [pathname]);

  // Click outside listener for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch session from localStorage or use forcedRole
  useEffect(() => {
    const raw = localStorage.getItem('skilltrack_user');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        let normalizedRole: 'learner' | 'trainer' | 'government' = 'learner';
        if (parsed.role === 'provider' || parsed.role === 'trainer') normalizedRole = 'trainer';
        else if (parsed.role === 'government' || parsed.role === 'admin') normalizedRole = 'government';
        else if (forcedRole) normalizedRole = forcedRole;

        setUser({
          id: parsed.id,
          fullName: parsed.fullName || parsed.full_name || parsed.name || 'Authorized User',
          email: parsed.email || '',
          role: normalizedRole,
        });
        return;
      } catch {}
    }

    if (forcedRole) {
      setUser({
        fullName: forcedRole === 'government' ? 'Administrator' : forcedRole === 'trainer' ? 'Training Center' : 'Learner Candidate',
        email: `${forcedRole}@skilltrack.gov.in`,
        role: forcedRole,
      });
    } else if (pathname.startsWith('/trainer')) {
      setUser({ fullName: 'Training Center', email: 'provider@skilltrack.org.in', role: 'trainer' });
    } else if (pathname.startsWith('/government')) {
      setUser({ fullName: 'Administrator', email: 'admin@skilltrack.gov.in', role: 'government' });
    } else if (pathname.startsWith('/learner')) {
      setUser({ fullName: 'Learner Candidate', email: 'candidate@skilltrack.in', role: 'learner' });
    }
  }, [pathname, forcedRole]);

  const activeRole: 'learner' | 'trainer' | 'government' =
    forcedRole ||
    user?.role ||
    (pathname.startsWith('/trainer') ? 'trainer' : pathname.startsWith('/government') ? 'government' : 'learner');

  const handleLogout = () => {
    localStorage.removeItem('skilltrack_token');
    localStorage.removeItem('skilltrack_user');
    localStorage.removeItem('skilltrack_role');
    router.push('/login');
    router.refresh();
  };

  // Nav item definitions strictly per requirements
  const learnerPrimaryNav: NavItem[] = [
    { label: 'Dashboard', href: '/learner/dashboard', icon: Layers },
    { label: 'My Profile', href: '/learner/profile', icon: User },
    { label: 'Skill Assessment', href: '/learner/assessments', icon: Award },
    { label: 'My Skills', href: '/learner/skills', icon: Sparkles },
    { label: 'Learning', href: '/learner/courses', icon: BookOpen },
    { label: 'Career Path', href: '/learner/careers', icon: Compass },
    { label: 'Opportunities', href: '/learner/opportunities', icon: Briefcase },
  ];

  const learnerMoreNav: NavItem[] = [
    { label: 'Progress', href: '/learner/progress', icon: TrendingUp },
    { label: 'AI Assistant', href: '/learner/career-assistant', icon: Sparkles },
  ];

  const trainerPrimaryNav: NavItem[] = [
    { label: 'Dashboard', href: '/trainer/dashboard', icon: Layers },
    { label: 'My Profile', href: '/trainer/profile', icon: User },
    { label: 'Learners', href: '/trainer/learners', icon: Users },
    { label: 'Assessments', href: '/trainer/assessments', icon: Award },
    { label: 'Courses', href: '/trainer/courses', icon: BookOpen },
    { label: 'Learning Content', href: '/trainer/materials', icon: FileText },
    { label: 'Skill Analytics', href: '/trainer/analytics', icon: BarChart3 },
  ];

  const trainerMoreNav: NavItem[] = [
    { label: 'Recommendations', href: '/trainer/progress', icon: Compass },
    { label: 'Reports', href: '/trainer/reports', icon: FileText },
  ];

  const governmentPrimaryNav: NavItem[] = [
    { label: 'Dashboard', href: '/government/dashboard', icon: Layers },
    { label: 'Learners', href: '/government/learners', icon: Users },
    { label: 'Trainers', href: '/government/trainers', icon: Building2 },
    { label: 'Skills', href: '/government/skills', icon: Sparkles },
    { label: 'Courses', href: '/government/course-intelligence', icon: BookOpen },
    { label: 'Assessments', href: '/government/certifications', icon: Award },
  ];

  const governmentMoreNav: NavItem[] = [
    { label: 'Opportunities', href: '/government/employment', icon: Briefcase },
    { label: 'Programs', href: '/government/programs', icon: Compass },
    { label: 'Analytics', href: '/government/geographic-analytics', icon: BarChart3 },
    { label: 'Reports', href: '/government/reports', icon: FileText },
  ];

  const primaryItems =
    activeRole === 'trainer'
      ? trainerPrimaryNav
      : activeRole === 'government'
      ? governmentPrimaryNav
      : learnerPrimaryNav;

  const moreItems =
    activeRole === 'trainer'
      ? trainerMoreNav
      : activeRole === 'government'
      ? governmentMoreNav
      : learnerMoreNav;

  const allItems = [...primaryItems, ...moreItems];

  const isLinkActive = (href: string) => {
    if (href === '/learner/dashboard' || href === '/trainer/dashboard' || href === '/government/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const isMoreActive = moreItems.some((item) => isLinkActive(item.href));

  // Portal badges
  const portalLabel =
    activeRole === 'trainer'
      ? 'Trainer Portal'
      : activeRole === 'government'
      ? 'Government Portal'
      : 'Learner Portal';

  const portalBadgeColor =
    activeRole === 'trainer'
      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
      : activeRole === 'government'
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
      : 'bg-blue-500/10 text-blue-400 border-blue-500/30';

  const notifCount = 3;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B1E36] border-b border-[#1E3A5F] text-white shadow-md">
      {/* Top Brand & Horizontal Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              href={activeRole === 'trainer' ? '/trainer/dashboard' : activeRole === 'government' ? '/government/dashboard' : '/learner/dashboard'}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1D4ED8] to-[#0B3B60] flex items-center justify-center text-white font-black text-sm shadow-sm border border-white/20 group-hover:scale-105 transition-transform">
                ST
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base tracking-tight leading-none group-hover:text-blue-300 transition-colors">
                  Skill Track
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                  {portalLabel}
                </span>
              </div>
            </Link>

            <span className={`hidden md:inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ml-1 ${portalBadgeColor}`}>
              {activeRole}
            </span>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {primaryItems.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    active
                      ? 'bg-[#1E3A5F] text-white shadow-xs font-bold border-b-2 border-[#FF9933]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#FF9933]' : 'text-slate-400'}`} />}
                  <span>{item.label}</span>
                </Link>
              );
            })}

            {/* More Dropdown for Desktop */}
            {moreItems.length > 0 && (
              <div className="relative" ref={moreRef}>
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-1 transition-all ${
                    isMoreActive
                      ? 'bg-[#1E3A5F] text-white font-bold border-b-2 border-[#FF9933]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180 text-[#FF9933]' : 'text-slate-400'}`} />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#0B1E36] border border-[#1E3A5F] rounded-lg shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    {moreItems.map((item) => {
                      const active = isLinkActive(item.href);
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreDropdownOpen(false)}
                          className={`px-3.5 py-2 text-xs font-medium flex items-center gap-2 transition-colors ${
                            active
                              ? 'bg-[#1E3A5F] text-white font-bold'
                              : 'text-slate-300 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {Icon && <Icon className="w-4 h-4 text-[#FF9933]" />}
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Right: Notifications, User Profile & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Notifications Popover */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#FF9933] ring-2 ring-[#0B1E36]" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl py-2 z-50 text-slate-800 dark:text-slate-200">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="font-bold text-xs">Recent Updates</span>
                    <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold cursor-pointer">
                      Mark all read
                    </span>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-60 overflow-y-auto text-xs">
                    <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <p className="font-medium text-[11px] text-slate-900 dark:text-slate-100">
                        Skill Benchmarking Synchronized
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Latest national taxonomy standards updated.
                      </p>
                    </div>
                    <div className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <p className="font-medium text-[11px] text-slate-900 dark:text-slate-100">
                        Quarterly Verification Active
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        Outcome auditing telemetry online.
                      </p>
                    </div>
                  </div>
                  <div className="px-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                    <Link
                      href={activeRole === 'trainer' ? '/trainer/notifications' : activeRole === 'government' ? '/government/notifications' : '/learner/notifications'}
                      className="text-[11px] text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      View all notifications →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-blue-700/60 border border-blue-400/40 flex items-center justify-center text-xs font-bold text-white uppercase">
                  {user?.fullName ? user.fullName[0] : 'U'}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-semibold text-white leading-tight max-w-[120px] truncate">
                    {user?.fullName || 'User'}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight uppercase font-medium">
                    {activeRole}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-2xl py-1.5 z-50 text-slate-800 dark:text-slate-200 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                    <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {user?.fullName || 'Authorized User'}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user?.email || `${activeRole}@skilltrack.gov.in`}
                    </p>
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded mt-1.5 border border-blue-200 dark:border-blue-800">
                      {activeRole} Portal
                    </span>
                  </div>

                  <Link
                    href={activeRole === 'trainer' ? '/trainer/profile' : activeRole === 'government' ? '/government/dashboard' : '/learner/profile'}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full px-4 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile</span>
                  </Link>

                  <div className="border-t border-slate-100 dark:border-slate-800 my-1" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-xs flex items-center gap-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 font-semibold transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF9933]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top-Down Dropdown Menu (Strictly top-down accordion; ZERO side drawers) */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0B1E36] border-t border-[#1E3A5F] px-4 pt-3 pb-6 space-y-1.5 shadow-2xl animate-in slide-in-from-top-4 duration-150">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1 border-b border-[#1E3A5F] mb-2 flex items-center justify-between">
            <span>Navigation Menu</span>
            <span className="text-[#FF9933]">{portalLabel}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {allItems.map((item) => {
              const active = isLinkActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors ${
                    active
                      ? 'bg-[#1E3A5F] text-white font-bold border-l-4 border-[#FF9933]'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${active ? 'text-[#FF9933]' : 'text-slate-400'}`} />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-[#1E3A5F] flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                {user?.fullName ? user.fullName[0] : 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">{user?.fullName || 'User'}</span>
                <span className="text-[10px] text-slate-400 uppercase">{activeRole}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-500/30"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
