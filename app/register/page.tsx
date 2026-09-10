'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  ArrowRight,
  Building2,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function RegisterRoleSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFE] text-[#0B2F55]">
      {/* National Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#F59E0B]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#16A36A]" />
      </div>

      {/* Top Header */}
      <header className="bg-white border-b border-[#E5EDF6] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* State Emblem representation */}
            <div className="w-8 h-10 flex-shrink-0 flex items-center justify-center text-[#0B2F55]">
              <svg viewBox="0 0 100 125" className="w-7 h-9 fill-current" aria-label="State Emblem of India">
                <path d="M50 8 C46 8 43 11 43 15 C43 17 44 19 46 20 C42 22 39 26 39 31 C39 36 43 40 47 41 C46 43 45 45 45 48 C42 48 39 50 38 53 C37 57 39 61 43 62 L43 72 L37 72 C35 72 33 74 33 76 L33 80 L67 80 L67 76 C67 74 65 72 63 72 L57 72 L57 62 C61 61 63 57 62 53 C61 50 58 48 55 48 C55 45 54 43 53 41 C57 40 61 36 61 31 C61 26 58 22 54 20 C56 19 57 17 57 15 C57 11 54 8 50 8 Z" />
                <path d="M36 24 C33 22 28 24 26 27 C24 30 24 35 26 38 C28 41 32 42 35 41 C36 39 37 36 38 33 C37 30 36 27 36 24 Z" opacity="0.9" />
                <path d="M64 24 C67 22 72 24 74 27 C76 30 76 35 74 38 C72 41 68 42 65 41 C64 39 63 36 62 33 C63 30 64 27 64 24 Z" opacity="0.9" />
                <rect x="22" y="82" width="56" height="11" rx="2" fill="currentColor" />
                <circle cx="50" cy="87.5" r="4.5" fill="#FFFFFF" />
                <circle cx="50" cy="87.5" r="1.5" fill="currentColor" />
                <path d="M26 95 C30 102 40 106 50 106 C60 106 70 102 74 95 L26 95 Z" opacity="0.85" />
                <rect x="20" y="108" width="60" height="4" rx="1.5" />
              </svg>
            </div>
            <div className="flex flex-col border-r border-[#CFE3FA] pr-4">
              <span className="text-[10px] font-bold tracking-widest text-[#0B2F55] uppercase leading-tight">
                Government of India
              </span>
              <span className="text-[9px] text-[#45627F] font-medium leading-tight">
                Ministry of Skill Development &amp; Entrepreneurship
              </span>
            </div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-extrabold text-xs shadow-2xs">
                ST
              </div>
              <div>
                <span className="font-extrabold text-[#0B2F55] text-sm tracking-tight block">
                  Skill Track
                </span>
                <span className="text-[10px] text-[#45627F] block -mt-0.5">
                  Unified Candidate Registration
                </span>
              </div>
            </Link>
          </div>
          <Link
            href="/login"
            className="text-xs font-semibold text-[#1769E0] hover:underline flex items-center gap-1 transition-colors"
          >
            <span>Already registered? Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-3xl mx-auto w-full p-4 sm:p-8 flex flex-col justify-center my-auto space-y-6">
        {/* Header Title Section */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF4FF] border border-[#CFE3FA] px-3 py-1 rounded-full">
            Candidate Onboarding
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F55] tracking-tight">
            Create Your Student Account
          </h1>
          <p className="text-xs sm:text-sm text-[#45627F] leading-relaxed">
            Register as a student or job seeker to access skill development, career guidance, skill-gap analysis, courses, certifications and employment opportunities.
          </p>
        </div>

        {/* ONE Prominent Registration Panel */}
        <div className="bg-white border border-[#CFE3FA] rounded-2xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(20,70,120,0.06)] space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#EAF4FF] border border-[#CFE3FA] text-[#1769E0] flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2F55]">
                Student / Job Seeker
              </h2>
              <p className="text-xs text-[#45627F] leading-relaxed">
                For students, job seekers and candidates looking to build skills, discover suitable careers and access employment opportunities.
              </p>
            </div>
          </div>

          {/* Value inclusions checklist */}
          <div className="pt-2 border-t border-[#E5EDF6] space-y-2.5">
            <div className="flex items-start gap-2 text-xs text-[#0B2F55]">
              <CheckCircle2 className="w-4 h-4 text-[#16A36A] shrink-0 mt-0.5" />
              <span>AI-driven skill-gap diagnostics and personalized career trajectory recommendations</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-[#0B2F55]">
              <CheckCircle2 className="w-4 h-4 text-[#16A36A] shrink-0 mt-0.5" />
              <span>NSQF Level-aligned courses with DigiLocker cryptographically verified credentials</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-[#0B2F55]">
              <CheckCircle2 className="w-4 h-4 text-[#16A36A] shrink-0 mt-0.5" />
              <span>Direct profile visibility to verified national recruiters, NAPS apprenticeships, and placement drives</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <Link
              href="/register/learner"
              className="w-full py-3 px-6 rounded-lg bg-[#1769E0] hover:bg-[#2563EB] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-2xs transition-all"
            >
              <span>Register as Student</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Authorized Access Informational Section */}
        <div className="bg-white border border-[#CFE3FA] rounded-xl p-5 sm:p-6 space-y-4 shadow-[0_4px_20px_rgba(20,70,120,0.04)]">
          <div className="border-b border-[#E5EDF6] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2F55]">
              Authorized Access
            </h3>
            <p className="text-xs text-[#45627F] mt-0.5">
              Training Centers and Government Authorities already have authorized accounts.
            </p>
          </div>

          <div className="space-y-3">
            {/* Training Center Row */}
            <div className="p-3.5 rounded-lg bg-[#F7FAFE] border border-[#CFE3FA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EAF4FF] text-[#1769E0] flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2F55]">
                    Training Center / Institution
                  </div>
                  <div className="text-[11px] text-[#45627F]">
                    Already registered? Sign in using your authorized credentials.
                  </div>
                </div>
              </div>
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-md bg-white border border-[#CFE3FA] hover:bg-[#EAF4FF] text-[#0B2F55] font-semibold text-xs transition-colors text-center shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Government Authority Row */}
            <div className="p-3.5 rounded-lg bg-[#F7FAFE] border border-[#CFE3FA] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EAF4FF] text-[#1769E0] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#16A36A]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2F55]">
                    Government Authority / Mission Director
                  </div>
                  <div className="text-[11px] text-[#45627F]">
                    Already registered? Sign in using your authorized government credentials.
                  </div>
                </div>
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-md bg-[#0B1E36] hover:bg-[#1E3A5F] text-white font-semibold text-[11px] transition-colors flex items-center gap-1"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Government Row */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Government Authority
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Ministry & State Skill Missions
                    </div>
                  </div>
                </div>
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-md bg-[#0B1E36] hover:bg-[#1E3A5F] text-white font-semibold text-[11px] transition-colors flex items-center gap-1"
                >
                  <span>Sign In</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-md bg-white border border-[#CFE3FA] hover:bg-[#EAF4FF] text-[#0B2F55] font-semibold text-xs transition-colors text-center shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Official Mini Footer */}
      <footer className="bg-white border-t border-[#E5EDF6] py-4 text-center text-xs text-[#45627F]">
        <span>Skill Track &bull; National Longitudinal Skilling &amp; Outcome Telemetry Platform</span>
      </footer>
    </div>
  );
}
