'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Briefcase,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
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

      <header className="bg-white border-b border-[#CBD5E1] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#0B3B60] text-white flex items-center justify-center font-bold text-xs">
              SIDH
            </div>
            <span className="font-extrabold text-[#0B3B60] text-sm tracking-tight">
              Skill India Digital Hub
            </span>
          </Link>
          <Link href="/login" className="text-xs font-bold text-[#0B3B60] hover:underline">
            Already registered? Sign In →
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8 flex flex-col justify-center">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-bold text-[#006876] uppercase tracking-wider">
            Account Creation
          </span>
          <h1 className="text-2xl font-black text-[#102A43] tracking-tight mt-1">
            Choose Your Registration Role
          </h1>
          <p className="text-xs text-[#627D98] mt-1">
            Select the appropriate profile to set up your credentials and access permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEARNER */}
          <Link
            href="/register/learner"
            className="p-6 rounded-lg border border-[#CBD5E1] bg-white hover:border-[#0B3B60] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-[#102A43]">Learner / Candidate</h2>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                For students, jobseekers, and apprentices seeking certified training, assessments, and placement assistance.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#0B3B60]">
              <span>Register as Learner</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* TRAINER */}
          <Link
            href="/register/trainer"
            className="p-6 rounded-lg border border-[#CBD5E1] bg-white hover:border-[#0B3B60] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-[#102A43]">Trainer / Instructor</h2>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                For vocational educators, master trainers, and industry practitioners managing accredited cohorts.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#0B3B60]">
              <span>Register as Trainer</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          {/* GOVERNMENT */}
          <Link
            href="/register/government"
            className="p-6 rounded-lg border border-[#CBD5E1] bg-white hover:border-[#0B3B60] hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div>
              <div className="w-12 h-12 rounded-lg bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-[#102A43]">Government Authority</h2>
              <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                Official access workflow for Ministry of Skill Development, state skill missions, and district program officers.
              </p>
            </div>
            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold text-[#0B3B60]">
              <span>Request Gov Access</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
