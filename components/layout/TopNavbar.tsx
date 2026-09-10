'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Bell,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Settings,
  Layers,
  Award,
  Sparkles,
  BookOpen,
  Users,
  Building2,
  FileText,
  BarChart3,
  Compass,
} from 'lucide-react';
import { sidhStore } from '@/lib/sidh-store';

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
  const profileRef = useRef<HTMLDivElement>(null);

  const [user, setUser] = useState<{
    id?: string;
    fullName: string;
    email: string;
    role: 'learner' | 'trainer' | 'government';
  } | null>(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  }, [pathname]);

  // Handle click outside dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch session & learner details
  useEffect(() => {
    const raw = localStorage.getItem('skilltrack_user');
    let learnerName = 'Arjun Patel';
    const learner = sidhStore.getLearner();
    if (learner && learner.name) {
      learnerName = learner.name;
    }

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        let normalizedRole: 'learner' | 'trainer' | 'government' = 'learner';
        if (parsed.role === 'provider' || parsed.role === 'trainer') normalizedRole = 'trainer';
        else if (parsed.role === 'government' || parsed.role === 'admin') normalizedRole = 'government';
        else if (forcedRole) normalizedRole = forcedRole;

        setUser({
          id: parsed.id,
          fullName: parsed.name || parsed.fullName || learnerName,
          email: parsed.email || 'learner@skilltrack.gov.in',
          role: normalizedRole,
        });
      } catch (e) {
        setUser({
          fullName: learnerName,
          email: 'learner@skilltrack.gov.in',
          role: forcedRole || 'learner',
        });
      }
    } else {
      setUser({
        fullName: learnerName,
        email: 'learner@skilltrack.gov.in',
        role: forcedRole || 'learner',
      });
    }
  }, [forcedRole]);

  const activeRole = forcedRole || user?.role || 'learner';

  const handleSignOut = () => {
    localStorage.removeItem('skilltrack_token');
    localStorage.removeItem('skilltrack_user');
    localStorage.removeItem('skilltrack_role');
    router.push('/login');
    router.refresh();
  };

  // Learner Navigation: EXACTLY 6 core links
  const learnerNav: NavItem[] = [
    { label: 'Dashboard', href: '/learner/dashboard' },
    { label: 'Skills', href: '/learner/skills' },
    { label: 'Learning', href: '/learner/courses' },
    { label: 'Assessments', href: '/learner/assessments' },
    { label: 'Certificates', href: '/learner/certificates' },
    { label: 'Profile', href: '/learner/profile' },
  ];

  // Fallback navs for Trainer and Government portals to keep system consistent
  const trainerNav: NavItem[] = [
    { label: 'Dashboard', href: '/trainer/dashboard' },
    { label: 'Learners', href: '/trainer/learners' },
    { label: 'Assessments', href: '/trainer/assessments' },
    { label: 'Courses', href: '/trainer/courses' },
    { label: 'Materials', href: '/trainer/materials' },
    { label: 'Analytics', href: '/trainer/analytics' },
  ];

  const governmentNav: NavItem[] = [
    { label: 'Dashboard', href: '/government/dashboard' },
    { label: 'Learners', href: '/government/learners' },
    { label: 'Trainers', href: '/government/trainers' },
    { label: 'Skills', href: '/government/skills' },
    { label: 'Course Intel', href: '/government/course-intelligence' },
    { label: 'Certifications', href: '/government/certifications' },
  ];

  const navItems =
    activeRole === 'trainer'
      ? trainerNav
      : activeRole === 'government'
      ? governmentNav
      : learnerNav;

  const isLinkActive = (href: string) => {
    if (href === '/learner/dashboard' || href === '/trainer/dashboard' || href === '/government/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand Identity */}
          <div className="flex items-center gap-8">
            <Link
              href={
                activeRole === 'trainer'
                  ? '/trainer/dashboard'
                  : activeRole === 'government'
                  ? '/government/dashboard'
                  : '/learner/dashboard'
              }
              className="flex items-center gap-2.5 shrink-0 group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:bg-blue-800 transition-colors">
                ST
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                  Skill Track
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500">
                  {activeRole === 'learner' ? 'Learner Portal' : activeRole === 'trainer' ? 'Trainer Portal' : 'Government Portal'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3.5 py-2 rounded-md text-xs font-semibold transition-all ${
                      active
                        ? 'text-blue-700 font-bold bg-blue-50/70'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-700 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Actions & User Dropdown */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <Link
              href="/learner/notifications"
              className={`p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors relative ${
                pathname === '/learner/notifications' ? 'bg-slate-100 text-slate-900' : ''
              }`}
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
            </Link>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            {/* Account Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1.5 rounded-lg hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                  {getInitials(user?.fullName || 'Arjun Patel')}
                </div>
                <div className="hidden sm:block text-xs leading-tight">
                  <div className="font-semibold text-slate-900 line-clamp-1 max-w-[120px]">
                    {user?.fullName || 'Arjun Patel'}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize">
                    {activeRole}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white border border-slate-200 shadow-lg py-1.5 z-50 text-xs animate-in fade-in">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="font-bold text-slate-900 truncate">{user?.fullName || 'Arjun Patel'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email || 'learner@skilltrack.gov.in'}</p>
                  </div>

                  <Link
                    href="/learner/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/learner/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Account Settings</span>
                  </Link>

                  <div className="border-t border-slate-100 my-1" />

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 hover:bg-rose-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-md">
          {navItems.map((item) => {
            const active = isLinkActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-xs font-semibold ${
                  active
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <div className="border-t border-slate-100 pt-2 mt-2 space-y-1">
            <Link
              href="/learner/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-50"
            >
              My Profile
            </Link>
            <Link
              href="/learner/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs text-slate-700 hover:bg-slate-50"
            >
              Account Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
