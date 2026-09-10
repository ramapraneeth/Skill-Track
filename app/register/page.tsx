'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  ArrowRight,
  Building2,
  ShieldCheck,
} from 'lucide-react';

export default function RegisterRoleSelectionPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Top Header */}
      <header className="bg-[#0B1E36] border-b border-[#1E3A5F] text-white p-4 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-md bg-[#1D4ED8] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              ST
            </div>
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight block">
                Skill Track
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">
                Unified Candidate Registration
              </span>
            </div>
          </Link>
          <Link
            href="/login"
            className="text-xs font-semibold text-blue-300 hover:text-white flex items-center gap-1 transition-colors"
          >
            <span>Already registered? Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8 flex flex-col justify-center">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider">
            Account Creation
          </span>
          <h1 className="text-2xl font-black text-[#102A43] tracking-tight mt-1">
            Candidate Registration
          </h1>
          <p className="text-xs text-[#627D98] mt-1">
            Self-registration is available for learners and jobseekers. Training centers and government authorities receive institutional provisioning.
          </p>
        </div>

        <div className="max-w-md mx-auto w-full space-y-6">
          {/* LEARNER REGISTRATION CARD */}
          <Link
            href="/register/learner"
            className="p-6 rounded-xl border border-[#CBD5E1] bg-white hover:border-[#1D4ED8] hover:shadow-lg transition-all flex flex-col justify-between space-y-4 group block"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-[#102A43]">Learner / Candidate Registration</h2>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                For students, jobseekers, and apprentices seeking certified training, assessments, and placement assistance.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#1D4ED8]">
              <span>Proceed to Candidate Registration</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* Authorized Access Informational Section for Trainer & Gov */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4 shadow-sm">
            <div className="border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Institutional Access
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Training centers and government personnel access their portals with pre-provisioned credentials.
              </p>
            </div>

            <div className="space-y-3">
              {/* Training Center Row */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Training Center
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Accredited training partners
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
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
