'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* National Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-30 transition-colors">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              SI
            </div>
            <div>
              <span className="font-extrabold text-[#0B192C] dark:text-white text-sm tracking-tight block">
                Skill India Digital Hub
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block -mt-0.5">
                SKILL BRIDGE AI • National Skilling Portal
              </span>
            </div>
          </Link>
          <Link
            href="/login"
            className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline flex items-center gap-1"
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
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60 px-2.5 py-0.5 rounded-full">
            ACCOUNT CREATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
            Create Your Student Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Register as a student or job seeker to access skill development, career guidance, skill-gap analysis, courses, certifications and employment opportunities.
          </p>
        </div>

        {/* ONE Prominent Registration Panel */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs space-y-6 transition-colors">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 text-[#1D4ED8] dark:text-blue-400 flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B192C] dark:text-white">
                Student / Job Seeker
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                For students, job seekers and candidates looking to build skills, discover suitable careers and access employment opportunities.
              </p>
            </div>
          </div>

          {/* Value inclusions checklist */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
            <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>AI-driven skill-gap diagnostics and personalized career trajectory recommendations</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>NSQF Level-aligned courses with DigiLocker cryptographically verified credentials</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span>Direct profile visibility to verified national recruiters, NAPS apprenticeships, and placement drives</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <Link
              href="/register/learner"
              className="w-full py-3 px-6 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>Register as Student</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Authorized Access Informational Section */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 sm:p-6 space-y-4 transition-colors">
          <div className="border-b border-slate-200/60 dark:border-slate-800 pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Authorized Access
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Training Centers and Government Authorities already have authorized accounts.
            </p>
          </div>

          <div className="space-y-3">
            {/* Training Center Row */}
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B192C] dark:text-slate-100">
                    Training Center
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Already registered? Sign in using your authorized credentials.
                  </div>
                </div>
              </div>
              <Link
                href="/login?role=trainer"
                className="px-3.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors text-center shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Government Authority Row */}
            <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B192C] dark:text-slate-100">
                    Government Authority
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">
                    Already registered? Sign in using your authorized government credentials.
                  </div>
                </div>
              </div>
              <Link
                href="/login?role=government"
                className="px-3.5 py-1.5 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors text-center shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
