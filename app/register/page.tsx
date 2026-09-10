'use client';

import React from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Building2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FD] text-[#0B2D4F]">
      {/* National Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#F59E0B]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#16A34A]" />
      </div>

      {/* Top Header */}
      <header className="bg-white border-b border-[#E5EDF5] sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col border-r border-[#CBDDF6] pr-4">
              <span className="text-[10px] font-bold tracking-widest text-[#0B2D4F] uppercase leading-tight">
                Government of India
              </span>
              <span className="text-[9px] text-[#4B6380] font-medium leading-tight">
                Ministry of Skill Development &amp; Entrepreneurship
              </span>
            </div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-black text-xs shadow-xs">
                ST
              </div>
              <div>
                <span className="font-extrabold text-[#0B2D4F] text-sm tracking-tight block">
                  Skill Track
                </span>
                <span className="text-[10px] text-[#4B6380] block -mt-0.5">
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
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF4FF] border border-[#CBDDF6] px-3 py-1 rounded-full">
            Candidate Onboarding
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D4F] tracking-tight">
            Create Your Student Account
          </h1>
          <p className="text-xs sm:text-sm text-[#4B6380] leading-relaxed">
            Register as a student or job seeker to access skill development, career guidance, skill-gap analysis, courses, certifications and employment opportunities.
          </p>
        </div>

        {/* ONE Prominent Registration Panel */}
        <div className="bg-white border border-[#E4EDF7] rounded-2xl p-6 sm:p-8 gov-card-shadow space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-[#EAF4FF] border border-[#CBDDF6] text-[#1769E0] flex items-center justify-center shrink-0">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg sm:text-xl font-bold text-[#0B2D4F]">
                Student / Job Seeker
              </h2>
              <p className="text-xs text-[#4B6380] leading-relaxed">
                For students, job seekers and candidates looking to build skills, discover suitable careers and access employment opportunities.
              </p>
            </div>
          </div>

          {/* Value inclusions checklist */}
          <div className="pt-2 border-t border-[#E4EDF7] space-y-2.5">
            <div className="flex items-start gap-2 text-xs text-[#0B2D4F]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>AI-driven skill-gap diagnostics and personalized career trajectory recommendations</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-[#0B2D4F]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>NSQF Level-aligned courses with DigiLocker cryptographically verified credentials</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-[#0B2D4F]">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
              <span>Direct profile visibility to verified national recruiters, NAPS apprenticeships, and placement drives</span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <Link
              href="/register/learner"
              className="w-full py-3 px-6 rounded-lg bg-[#1769E0] hover:bg-[#1E6FF2] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all"
            >
              <span>Register as Student</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Authorized Access Informational Section */}
        <div className="bg-white border border-[#E4EDF7] rounded-xl p-5 sm:p-6 space-y-4 gov-card-shadow">
          <div className="border-b border-[#E4EDF7] pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2D4F]">
              Authorized Access
            </h3>
            <p className="text-xs text-[#4B6380] mt-0.5">
              Training Centers and Government Authorities already have authorized accounts.
            </p>
          </div>

          <div className="space-y-3">
            {/* Training Center Row */}
            <div className="p-3.5 rounded-lg bg-[#F7FAFE] border border-[#CBDDF6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EAF4FF] text-[#1769E0] flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2D4F]">
                    Training Center / Institution
                  </div>
                  <div className="text-[11px] text-[#4B6380]">
                    Already registered? Sign in using your authorized credentials.
                  </div>
                </div>
              </div>
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-md bg-white border border-[#CBDDF6] hover:bg-[#EAF4FF] text-[#0B2D4F] font-semibold text-xs transition-colors text-center shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Government Authority Row */}
            <div className="p-3.5 rounded-lg bg-[#F7FAFE] border border-[#CBDDF6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#EAF4FF] text-[#1769E0] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#0B2D4F]">
                    Government Authority / Mission Director
                  </div>
                  <div className="text-[11px] text-[#4B6380]">
                    Already registered? Sign in using your authorized government credentials.
                  </div>
                </div>
              </div>
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-md bg-white border border-[#CBDDF6] hover:bg-[#EAF4FF] text-[#0B2D4F] font-semibold text-xs transition-colors text-center shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Official Mini Footer */}
      <footer className="bg-white border-t border-[#E5EDF5] py-4 text-center text-xs text-[#4B6380]">
        <span>Skill Track &bull; National Longitudinal Skilling &amp; Outcome Telemetry Platform</span>
      </footer>
    </div>
  );
}
