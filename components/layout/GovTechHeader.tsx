'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, LogIn, UserCircle, LogOut } from 'lucide-react';

interface GovTechHeaderProps {
  user?: { fullName: string; role: string } | null;
  onOpenLogin?: () => void;
  onLogout?: () => void;
}

export const GovTechHeader: React.FC<GovTechHeaderProps> = ({ user, onOpenLogin, onLogout }) => {
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
            <div className="w-9 h-9 rounded bg-[#0B3B60] flex items-center justify-center text-white font-black text-base shadow-sm">
              ST
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[#0B3B60] text-base tracking-tight">SkillTrack</span>
                <span className="bg-[#E65100] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                  SIH Outcome Intelligence
                </span>
              </div>
              <p className="text-[11px] text-[#627D98] hidden sm:block font-medium">
                Longitudinal Skilling Outcome Intelligence & Impact Measurement Platform
              </p>
            </div>
          </Link>

          {/* Navigation & Actions */}
          <nav className="flex items-center gap-3">
            <Link
              href="/outcome-intelligence"
              className="text-xs font-semibold text-[#0B3B60] hover:text-[#002541] px-3 py-1.5 rounded hover:bg-[#F0F4F8] transition-colors"
            >
              Outcome Intelligence Hub
            </Link>

            {user ? (
              <div className="flex items-center gap-3 pl-3 border-l border-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <UserCircle className="w-5 h-5 text-[#0B3B60]" />
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-[#102A43] leading-none">{user.fullName}</div>
                    <span className="text-[10px] font-semibold text-[#006876] uppercase tracking-wider">
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
                  className="h-9 px-4 rounded bg-[#0B3B60] hover:bg-[#002541] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login to SkillTrack</span>
                </button>
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
