'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  LogIn,
  UserCircle,
  LogOut,
  Bell,
  Search,
  Sparkles,
  ChevronDown,
  BookOpen,
} from 'lucide-react';

interface GovTechHeaderProps {
  user?: { fullName: string; role: string } | null;
  onOpenLogin?: () => void;
  onLogout?: () => void;
}

export const GovTechHeader: React.FC<GovTechHeaderProps> = ({ user, onOpenLogin, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  // Role-specific notifications
  const getNotifications = () => {
    if (!user) {
      return [
        { id: 1, title: 'National Skilling Advisory', time: '10m ago', text: 'Cloud & DevOps capacity expanded across 12 universities.' },
      ];
    }
    if (user.role === 'student' || user.role === 'learner') {
      return [
        { id: 1, title: 'Skill Gap Updated', time: '5m ago', text: 'Your skill gap diagnostic has been updated with latest market benchmarks.' },
        { id: 2, title: 'New Course Recommended', time: '1h ago', text: 'Enterprise Java & DSA is recommended for your Software Engineer career goal.' },
        { id: 3, title: 'Campus Placement Alert', time: '2h ago', text: 'TCS and Microsoft IDC published new graduate technical requisitions.' },
      ];
    }
    if (user.role === 'trainer' || user.role === 'provider') {
      return [
        { id: 1, title: 'Diagnostic Alert', time: '15m ago', text: '18 students in your assigned cohort require additional DSA recursion practice.' },
        { id: 2, title: 'Course Completion Benchmark', time: '3h ago', text: 'Batch 2025-A surpassed 84% completion milestone.' },
      ];
    }
    // Government
    return [
      { id: 1, title: 'Regional Capacity Alert', time: '12m ago', text: 'Cloud computing skill gap increased by 18% in Andhra Pradesh.' },
      { id: 2, title: 'Course Placement Success', time: '1h ago', text: 'Applied AI & PyTorch achieved a 67.3% verified employment placement rate.' },
      { id: 3, title: 'Audit Verification Due', time: '4h ago', text: '320 90-day retention wage proofs pending state auditor signature.' },
    ];
  };

  const notifications = getNotifications();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#D1D9E2]">
      {/* Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Platform Identity */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-gradient-to-tr from-[#0B3B60] to-[#0A4B78] flex items-center justify-center text-white font-black text-base shadow-sm border border-white/20">
              SB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#0B3B60] text-base tracking-tight">
                  SKILLBRIDGE <span className="text-[#0284C7]">AI</span>
                </span>
                <span className="bg-[#0B3B60] text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  National Ecosystem
                </span>
              </div>
              <p className="text-[11px] text-[#627D98] hidden sm:block font-medium">
                Connecting Skills, Education, Industry and Employment.
              </p>
            </div>
          </Link>

          {/* Navigation & Actions */}
          <nav className="flex items-center gap-2.5">
            <Link
              href="/courses/intelligence"
              className="text-xs font-semibold text-[#0B3B60] hover:text-[#002541] px-3 py-1.5 rounded hover:bg-[#F0F4F8] transition-colors hidden md:flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Course Intelligence</span>
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#E65100] ring-2 ring-white" />
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#CBD5E1] rounded-lg shadow-xl p-3 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] text-xs font-bold text-[#102A43]">
                    <span>Notifications & Telemetry</span>
                    <span className="text-[10px] text-[#0284C7] uppercase">{user?.role || 'Guest'}</span>
                  </div>
                  <div className="divide-y divide-[#F1F5F9] max-h-60 overflow-y-auto mt-1">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2 text-xs">
                        <div className="flex items-center justify-between text-[10px] text-[#64748B]">
                          <span className="font-bold text-[#102A43]">{n.title}</span>
                          <span>{n.time}</span>
                        </div>
                        <p className="text-[#475569] text-[11px] mt-0.5 leading-snug">{n.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-[#0B3B60]" />
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-[#102A43] leading-none">{user.fullName}</div>
                    <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                      {user.role}
                    </span>
                  </div>
                </div>
                {onLogout && (
                  <button
                    onClick={onLogout}
                    className="h-8 px-2.5 rounded text-xs font-semibold text-[#627D98] hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors flex items-center gap-1"
                    title="Sign Out"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                )}
              </div>
            ) : (
              onOpenLogin && (
                <button
                  onClick={onOpenLogin}
                  className="h-9 px-4 rounded bg-[#0B3B60] hover:bg-[#002541] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors uppercase tracking-wider"
                >
                  <LogIn className="w-3.5 h-3.5 text-[#FF9933]" />
                  <span>Welcome to SkillBridge AI</span>
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
