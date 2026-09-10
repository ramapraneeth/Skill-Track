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
      ? 'bg-amber-50 text-[#B45309] border-amber-200'
      : activeRole === 'government'
      ? 'bg-emerald-50 text-[#16A34A] border-emerald-200'
      : 'bg-[#EAF4FF] text-[#1769E0] border-[#CBDDF6]';

  const notifCount = 3;

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5EDF5] text-[#0B2D4F] shadow-xs">
      {/* Top Brand & Horizontal Navigation Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-3">
            <Link
              href={activeRole === 'trainer' ? '/trainer/dashboard' : activeRole === 'government' ? '/government/dashboard' : '/learner/dashboard'}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-black text-xs shadow-xs">
                ST
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[#0B2D4F] text-base tracking-tight leading-none">
                  Skill Track
                </span>
                <span className="text-[10px] text-[#4B6380] font-medium tracking-wide">
                  {portalLabel}
                </span>
              </div>
            </Link>

            <span className={`hidden md:inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ml-1 ${portalBadgeColor}`}>
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
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    active
                      ? 'bg-[#EAF4FF] text-[#1769E0] font-bold border border-[#CBDDF6]'
                      : 'text-[#4B6380] hover:text-[#0B2D4F] hover:bg-[#F5F9FD]'
                  }`}
                >
                  {Icon && <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#1769E0]' : 'text-[#4B6380]'}`} />}
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
                  className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                    isMoreActive
                      ? 'bg-[#EAF4FF] text-[#1769E0] font-bold border border-[#CBDDF6]'
                      : 'text-[#4B6380] hover:text-[#0B2D4F] hover:bg-[#F5F9FD]'
                  }`}
                >
                  <span>More</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreDropdownOpen ? 'rotate-180 text-[#1769E0]' : 'text-[#4B6380]'}`} />
                </button>

                {moreDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E4EDF7] rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
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
                              ? 'bg-[#EAF4FF] text-[#1769E0] font-bold'
                              : 'text-[#4B6380] hover:bg-[#F5F9FD] hover:text-[#0B2D4F]'
                          }`}
                        >
                          {Icon && <Icon className="w-4 h-4 text-[#1769E0]" />}
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
                className="relative p-2 text-[#4B6380] hover:text-[#0B2D4F] rounded-lg hover:bg-[#F5F9FD] border border-transparent hover:border-[#E4EDF7] transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1769E0] ring-2 ring-white" />
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-[#E4EDF7] rounded-xl shadow-xl py-2 z-50 text-[#0B2D4F]">
                  <div className="px-4 py-2 border-b border-[#E4EDF7] flex items-center justify-between">
                    <span className="font-bold text-xs">Recent Updates</span>
                    <span className="text-[10px] text-[#1769E0] font-semibold cursor-pointer hover:underline">
                      Mark all read
                    </span>
                  </div>
                  <div className="divide-y divide-[#F0F5FA] max-h-60 overflow-y-auto text-xs">
                    <div className="p-3 hover:bg-[#F5F9FD] transition-colors">
                      <p className="font-semibold text-[11px] text-[#0B2D4F]">
                        Skill Benchmarking Synchronized
                      </p>
                      <p className="text-[10px] text-[#4B6380] mt-0.5">
                        Latest national NSQF taxonomy standards updated.
                      </p>
                    </div>
                    <div className="p-3 hover:bg-[#F5F9FD] transition-colors">
                      <p className="font-semibold text-[11px] text-[#0B2D4F]">
                        Quarterly Outcome Verification Active
                      </p>
                      <p className="text-[10px] text-[#4B6380] mt-0.5">
                        Longitudinal audit telemetry online.
                      </p>
                    </div>
                  </div>
                  <div className="px-3 pt-2 border-t border-[#E4EDF7] text-center">
                    <Link
                      href={activeRole === 'trainer' ? '/trainer/notifications' : activeRole === 'government' ? '/government/notifications' : '/learner/notifications'}
                      className="text-[11px] text-[#1769E0] font-bold hover:underline"
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
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F5F9FD] border border-transparent hover:border-[#E4EDF7] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#EAF4FF] text-[#1769E0] border border-[#CBDDF6] flex items-center justify-center text-xs font-bold uppercase">
                  {user?.fullName ? user.fullName[0] : 'U'}
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <span className="text-xs font-bold text-[#0B2D4F] leading-tight max-w-[120px] truncate">
                    {user?.fullName || 'User'}
                  </span>
                  <span className="text-[10px] text-[#4B6380] leading-tight uppercase font-medium">
                    {activeRole}
                  </span>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-[#4B6380] transition-transform ${profileDropdownOpen ? 'rotate-180 text-[#1769E0]' : ''}`} />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E4EDF7] rounded-xl shadow-xl py-1.5 z-50 text-[#0B2D4F] animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-4 py-2.5 border-b border-[#E4EDF7]">
                    <p className="text-xs font-bold text-[#0B2D4F] truncate">
                      {user?.fullName || 'Authorized User'}
                    </p>
                    <p className="text-[11px] text-[#4B6380] truncate">
                      {user?.email || `${activeRole}@skilltrack.gov.in`}
                    </p>
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF4FF] border border-[#CBDDF6] px-2 py-0.5 rounded mt-1.5">
                      {activeRole} Portal
                    </span>
                  </div>

                  <Link
                    href={activeRole === 'trainer' ? '/trainer/profile' : activeRole === 'government' ? '/government/dashboard' : '/learner/profile'}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="w-full px-4 py-2 text-xs flex items-center gap-2 hover:bg-[#F5F9FD] text-[#0B2D4F] font-medium transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-[#1769E0]" />
                    <span>My Profile</span>
                  </Link>

                  <div className="border-t border-[#E4EDF7] my-1" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-xs flex items-center gap-2 text-rose-600 hover:bg-rose-50 font-semibold transition-colors"
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
              className="xl:hidden p-2 text-[#0B2D4F] hover:bg-[#F5F9FD] rounded-lg border border-[#E4EDF7] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#1769E0]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Top-Down Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#E5EDF5] px-4 pt-3 pb-6 space-y-1.5 shadow-xl animate-in slide-in-from-top-4 duration-150">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#4B6380] px-3 pb-1 border-b border-[#E4EDF7] mb-2 flex items-center justify-between">
            <span>Navigation Menu</span>
            <span className="text-[#1769E0] font-bold">{portalLabel}</span>
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
                      ? 'bg-[#EAF4FF] text-[#1769E0] font-bold border-l-4 border-[#1769E0]'
                      : 'text-[#4B6380] hover:bg-[#F5F9FD] hover:text-[#0B2D4F]'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${active ? 'text-[#1769E0]' : 'text-[#4B6380]'}`} />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 mt-2 border-t border-[#E4EDF7] flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1769E0] text-white flex items-center justify-center text-xs font-bold">
                {user?.fullName ? user.fullName[0] : 'U'}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0B2D4F]">{user?.fullName || 'User'}</span>
                <span className="text-[10px] text-[#4B6380] uppercase">{activeRole}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1.5 transition-colors border border-rose-200"
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
