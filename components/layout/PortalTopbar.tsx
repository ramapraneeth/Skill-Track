'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Sun, Moon, Bell, ChevronRight } from 'lucide-react';
import { GlobalSearchModal } from '@/components/ui/GlobalSearchModal';

interface PortalTopbarProps {
  user?: { fullName: string; role: string } | null;
  onLogout?: () => void;
}

export const PortalTopbar: React.FC<PortalTopbarProps> = ({ user, onLogout }) => {
  const pathname = usePathname() || '';
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [localUser, setLocalUser] = useState<{ name: string; role: string }>({
    name: 'Rahul Sharma',
    role: 'LEARNER',
  });

  const getBreadcrumbs = () => {
    if (pathname.startsWith('/trainer/dashboard')) return { portal: 'Trainer Portal', page: 'Dashboard' };
    if (pathname.startsWith('/trainer/batches')) return { portal: 'Trainer Portal', page: 'Training Batches' };
    if (pathname.startsWith('/trainer/learners')) return { portal: 'Trainer Portal', page: 'My Students' };
    if (pathname.startsWith('/trainer/attendance')) return { portal: 'Trainer Portal', page: 'Daily Attendance' };
    if (pathname.startsWith('/trainer/courses')) return { portal: 'Trainer Portal', page: 'Courses & Syllabus' };
    if (pathname.startsWith('/trainer/progress')) return { portal: 'Trainer Portal', page: 'Curriculum Progress' };
    if (pathname.startsWith('/trainer/schedule')) return { portal: 'Trainer Portal', page: 'Class Schedule' };
    if (pathname.startsWith('/trainer/assessments')) return { portal: 'Trainer Portal', page: 'Assessments' };
    if (pathname.startsWith('/trainer/analytics')) return { portal: 'Trainer Portal', page: 'Instruction Analytics' };
    if (pathname.startsWith('/trainer/profile')) return { portal: 'Trainer Portal', page: 'My Profile & ToT' };
    if (pathname.startsWith('/trainer')) return { portal: 'Trainer Portal', page: 'Console' };

    if (pathname.startsWith('/government/dashboard')) return { portal: 'Government Portal', page: 'National Intelligence' };
    if (pathname.startsWith('/government/training-centers')) return { portal: 'Government Portal', page: 'Training Capacity' };
    if (pathname.startsWith('/government/learners')) return { portal: 'Government Portal', page: 'Candidate Registry' };
    if (pathname.startsWith('/government/trainers')) return { portal: 'Government Portal', page: 'Trainer Registry' };
    if (pathname.startsWith('/government/reports')) return { portal: 'Government Portal', page: 'Statutory Reports' };
    if (pathname.startsWith('/government')) return { portal: 'Government Portal', page: 'Executive Radar' };

    if (pathname.startsWith('/learner/dashboard')) return { portal: 'Learner Portal', page: 'Dashboard' };
    if (pathname.startsWith('/learner/skills')) return { portal: 'Learner Portal', page: 'Skills & Proficiency' };
    if (pathname.startsWith('/learner/profile')) return { portal: 'Learner Portal', page: 'My Profile' };
    if (pathname.startsWith('/learner/courses')) return { portal: 'Learner Portal', page: 'Courses & Outcomes' };
    if (pathname.startsWith('/learner/opportunities')) return { portal: 'Learner Portal', page: 'Jobs & Openings' };
    if (pathname.startsWith('/learner')) return { portal: 'Learner Portal', page: 'Career Cockpit' };

    return null;
  };

  const breadcrumb = getBreadcrumbs();

  useEffect(() => {
    // Check initial dark mode from localStorage or class
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('skillbridge_theme') === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }

    try {
      const rawUser = localStorage.getItem('skilltrack_user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        setLocalUser({
          name: parsed.fullName || parsed.name || 'Rahul Sharma',
          role: (parsed.role || 'LEARNER').toUpperCase(),
        });
      }
    } catch {}
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('skillbridge_theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('skillbridge_theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const notifications = [
    { id: 1, title: 'AI Recommendation Ready', text: '3 high-match NAPS apprenticeships available for Full Stack profile.', time: '10m ago' },
    { id: 2, title: 'Assessment Notification', text: 'Summative Level 5 practical assessment scheduled on 18 Sep.', time: '2h ago' },
    { id: 3, title: 'National Placement Report', text: 'Q1 National Outcome Bulletin published by MSDE Secretariat.', time: '5h ago' },
  ];

  const displayName = user?.fullName || localUser.name;
  const displayRole = (user?.role ? user.role.toUpperCase() : localUser.role);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        {/* Tricolor National Identity Strip */}
        <div className="h-0.5 w-full flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Brand & Platform Identity */}
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-8 h-8 rounded-md bg-[#1D4ED8] flex items-center justify-center text-white font-black text-xs shadow-xs">
                  SB
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-[#0B192C] dark:text-white text-sm tracking-tight group-hover:text-[#1D4ED8] transition-colors">
                      SKILL BRIDGE AI
                    </span>
                    <span className="bg-blue-100 text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300 text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider">
                      SIH 2026
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden lg:block font-normal leading-none mt-0.5">
                    Connecting Skills, Education, Industry and Employment
                  </p>
                </div>
              </Link>

              {breadcrumb && (
                <div className="hidden xl:flex items-center gap-1.5 pl-3 border-l border-slate-200 dark:border-slate-800 text-xs">
                  <span className="text-slate-400 dark:text-slate-500 font-medium">{breadcrumb.portal}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                  <span className="font-bold text-slate-800 dark:text-slate-200">{breadcrumb.page}</span>
                </div>
              )}
            </div>

            {/* Global Search Bar (Trigger) */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-500 dark:text-slate-400 text-xs">Search skills, courses, jobs...</span>
                </div>
                <kbd className="px-1.5 py-0.5 text-[9px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-400 rounded">
                  Ctrl+K
                </kbd>
              </button>
            </div>

            {/* Right Action Tools */}
            <div className="flex items-center gap-1.5">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
              </button>

              {/* Notifications Tray */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-1.5 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden animate-in fade-in z-50">
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900 dark:text-slate-100">Notifications</span>
                      <span className="text-[10px] text-[#1D4ED8] font-semibold cursor-pointer">Mark all read</span>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-72 overflow-y-auto">
                      {notifications.map((n) => (
                        <div key={n.id} className="p-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-xs space-y-0.5">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold text-slate-900 dark:text-slate-100">{n.title}</h4>
                            <span className="text-[10px] text-slate-400">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">{n.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile / Portal Indicator */}
              <div className="flex items-center gap-2 pl-2 ml-1 border-l border-slate-200 dark:border-slate-800">
                <div className="w-7 h-7 rounded-full bg-blue-50 dark:bg-slate-800 border border-blue-200 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-[#1D4ED8] dark:text-blue-400">
                  {displayName ? displayName[0] : 'R'}
                </div>
                <div className="hidden sm:block text-left leading-none">
                  <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">
                    {displayName}
                  </p>
                  <span className="text-[9px] uppercase font-bold text-[#1D4ED8] dark:text-blue-400 tracking-wider">
                    {displayRole}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
