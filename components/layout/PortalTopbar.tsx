'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { GlobalSearchModal } from '@/components/ui/GlobalSearchModal';

interface PortalTopbarProps {
  user?: { fullName: string; role: string } | null;
  onLogout?: () => void;
}

export const PortalTopbar: React.FC<PortalTopbarProps> = ({ user, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial dark mode from localStorage or class
    const isDark = document.documentElement.classList.contains('dark') || localStorage.getItem('skillbridge_theme') === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    }
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

  return (
    <>
      <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
        {/* Tricolor National Identity Strip */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-[#FF9933]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#138808]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand & Platform Identity */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0B192C] to-[#1D4ED8] flex items-center justify-center text-white font-extrabold text-sm shadow-md border border-white/20">
                SB
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-[#0B192C] dark:text-white text-base tracking-tight group-hover:text-[#1D4ED8] transition-colors">
                    SKILLBRIDGE AI
                  </span>
                  <span className="bg-[#1D4ED8] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                    SIH 2026
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                  Connecting Skills, Education, Industry and Employment
                </p>
              </div>
            </Link>

            {/* Global Search Bar (Trigger) */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-400 hover:border-slate-300 dark:hover:border-slate-600 transition-all shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <span>🔍</span>
                  <span className="text-slate-500 dark:text-slate-400">Search students, skills, courses, jobs, schemes...</span>
                </div>
                <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-300 rounded">
                  Ctrl+K
                </kbd>
              </button>
            </div>

            {/* Right Action Tools */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                title="Search"
              >
                🔍
              </button>

              {/* Theme Switcher */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>

              {/* Notifications Tray */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                  title="Notifications"
                >
                  🔔
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white dark:ring-slate-900" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden animate-in fade-in z-50">
                    <div className="p-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-900 dark:text-slate-100">National Notifications</span>
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
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 flex items-center justify-center text-xs font-bold text-[#0B192C] dark:text-slate-200">
                  {user?.fullName ? user.fullName[0] : 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-none">
                    {user?.fullName || 'Dr. Alok Verma, IAS'}
                  </p>
                  <span className="text-[10px] uppercase font-semibold text-[#1D4ED8] dark:text-blue-400 tracking-wider">
                    {user?.role || 'Government Admin'}
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
