'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, ArrowRight, ArrowLeft, Building2 } from 'lucide-react';

export default function RegisterTrainerPage() {
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
            href="/register"
            className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Registration</span>
          </Link>
        </div>
      </header>

      {/* Restricted Access Body */}
      <main className="flex-1 max-w-lg mx-auto w-full p-4 sm:p-8 flex flex-col justify-center my-auto">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl p-6 sm:p-8 shadow-xs text-center space-y-5 transition-colors">
          <div className="w-14 h-14 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
              Access Restricted
            </span>
            <h1 className="text-xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
              Registration is restricted for this account type.
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
              Training Centers, Instructors, and Master Trainers are provisioned directly by the authorized national administration. Public self-registration is not available.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            Please use your authorized login credentials.
          </div>

          <div className="space-y-2 pt-2">
            <Link
              href="/login?role=trainer"
              className="w-full py-2.5 px-4 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>Go to Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/register"
              className="w-full py-2.5 px-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs flex items-center justify-center transition-colors"
            >
              Back to Student Registration
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
