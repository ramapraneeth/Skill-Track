'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  const centralProductLoop = [
    { step: '01', title: 'Student Profile', desc: 'Aadhaar / APAAR Verified' },
    { step: '02', title: 'Skill Analysis', desc: 'Diagnostic Benchmarking' },
    { step: '03', title: 'Skill Gap', desc: 'AI Matrix vs Market Norms' },
    { step: '04', title: 'Course Recs', desc: 'AI Outcome Ranked' },
    { step: '05', title: 'Training', desc: 'AEBAS Biometric Monitored' },
    { step: '06', title: 'Assessment', desc: 'Summative Practical Exam' },
    { step: '07', title: 'Certification', desc: 'DigiLocker Cryptographic' },
    { step: '08', title: 'Placement', desc: 'NAPS & Corporate Drives' },
    { step: '09', title: 'Employment', desc: 'EPFO UAN Verified Wage' },
    { step: '10', title: 'Industry Feedback', desc: 'Longitudinal Tracer Loop' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Tricolor National Identity Strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0B192C] to-[#1D4ED8] flex items-center justify-center text-white font-black text-sm shadow-md border border-white/20">
              SB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-[#0B192C] dark:text-white text-base tracking-tight">
                  SKILLBRIDGE AI
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                Connecting Skills, Education, Industry and Employment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="h-9 px-4 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-[#1D4ED8] text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="h-9 px-4 rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              Register Candidate
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - High-Fidelity White Institutional Platform */}
      <main className="flex-1">
        <section className="relative bg-white text-[#0B1B30] border-b border-[#E2E8F0] overflow-hidden min-h-[580px] lg:min-h-[630px] flex items-center justify-center px-6 sm:px-10 py-16 sm:py-20 lg:py-24">
          {/* Subtle Grid Texture */}
          <div
            className="absolute inset-0 pointer-events-none opacity-60"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(11, 27, 48, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(11, 27, 48, 0.03) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />

          {/* Left Abstract Digital Infrastructure Network Nodes */}
          <div className="absolute left-0 top-0 bottom-0 w-1/4 pointer-events-none hidden md:block overflow-hidden opacity-35">
            <svg className="w-full h-full" viewBox="0 0 300 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="30" y1="90" x2="110" y2="170" stroke="#2857D9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="110" y1="170" x2="60" y2="290" stroke="#2857D9" strokeWidth="1" />
              <line x1="60" y1="290" x2="150" y2="380" stroke="#2857D9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="150" y1="380" x2="40" y2="480" stroke="#2857D9" strokeWidth="1" />
              <line x1="110" y1="170" x2="220" y2="210" stroke="#2857D9" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="60" y1="290" x2="190" y2="300" stroke="#2857D9" strokeWidth="1" strokeOpacity="0.3" />
              
              <circle cx="30" cy="90" r="3.5" fill="#2857D9" />
              <circle cx="110" cy="170" r="4" fill="#0B1B30" />
              <circle cx="60" cy="290" r="3" fill="#2857D9" />
              <circle cx="150" cy="380" r="4.5" fill="#2857D9" />
              <circle cx="40" cy="480" r="3" fill="#0B1B30" />
              <circle cx="220" cy="210" r="2.5" fill="#2857D9" />
              <circle cx="190" cy="300" r="2.5" fill="#0B1B30" />
            </svg>
          </div>

          {/* Right Abstract Digital Infrastructure Network Nodes */}
          <div className="absolute right-0 top-0 bottom-0 w-1/4 pointer-events-none hidden md:block overflow-hidden opacity-35">
            <svg className="w-full h-full" viewBox="0 0 300 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="270" y1="110" x2="190" y2="190" stroke="#2857D9" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="190" y1="190" x2="240" y2="310" stroke="#2857D9" strokeWidth="1" />
              <line x1="240" y1="310" x2="150" y2="400" stroke="#2857D9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="150" y1="400" x2="260" y2="500" stroke="#2857D9" strokeWidth="1" />
              <line x1="190" y1="190" x2="80" y2="230" stroke="#2857D9" strokeWidth="1" strokeOpacity="0.4" />
              <line x1="240" y1="310" x2="110" y2="320" stroke="#2857D9" strokeWidth="1" strokeOpacity="0.3" />
              
              <circle cx="270" cy="110" r="3.5" fill="#2857D9" />
              <circle cx="190" cy="190" r="4" fill="#0B1B30" />
              <circle cx="240" cy="310" r="3" fill="#2857D9" />
              <circle cx="150" cy="400" r="4.5" fill="#2857D9" />
              <circle cx="260" cy="500" r="3" fill="#0B1B30" />
              <circle cx="80" cy="230" r="2.5" fill="#2857D9" />
              <circle cx="110" cy="320" r="2.5" fill="#0B1B30" />
            </svg>
          </div>

          <div className="max-w-[1100px] w-full mx-auto text-center relative z-10 flex flex-col items-center">
            {/* Headline */}
            <h1
              className="text-[#0B1B30] font-bold tracking-[-0.035em] text-center max-w-[1020px] mx-auto"
              style={{
                fontSize: 'clamp(38px, 4.8vw, 62px)',
                lineHeight: 1.08,
              }}
            >
              Connecting <span className="text-[#2857D9]">Skills</span>, Education, Industry and Employment
            </h1>

            {/* Supporting Text */}
            <p className="text-[16px] sm:text-[17px] leading-[1.65] text-[#486581] max-w-[700px] mx-auto mt-5 sm:mt-6 font-normal">
              A unified national-level skill intelligence platform connecting candidates, accredited trainers, qualification packs, and employers through audited employment outcome tracking.
            </p>

            {/* Three Horizontally Aligned Portal Actions */}
            <div className="mt-9 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-[780px]">
              {/* Student Portal (Primary) */}
              <Link
                href="/learner/dashboard"
                title="Access learning, skills and career progress"
                className="w-full sm:w-auto flex-1 h-[50px] sm:h-[52px] px-6 rounded-[8px] bg-[#2857D9] hover:bg-[#1E42B0] text-white text-[14px] font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 ease-out hover:-translate-y-[2px] shadow-xs"
              >
                <svg
                  className="w-[18px] h-[18px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                <span>Student Portal</span>
              </Link>

              {/* Trainer Portal (Secondary) */}
              <Link
                href="/trainer/dashboard"
                title="Manage training and candidate outcomes"
                className="w-full sm:w-auto flex-1 h-[50px] sm:h-[52px] px-6 rounded-[8px] bg-white hover:bg-slate-50 border border-[#CBD5E1] hover:border-[#2857D9] text-[#0B1B30] text-[14px] font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 ease-out hover:-translate-y-[2px] shadow-2xs"
              >
                <svg
                  className="w-[18px] h-[18px] shrink-0 text-[#486581]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span>Trainer Portal</span>
              </Link>

              {/* Government Admin (Secondary) */}
              <Link
                href="/government/dashboard"
                title="Monitor national skill intelligence"
                className="w-full sm:w-auto flex-1 h-[50px] sm:h-[52px] px-6 rounded-[8px] bg-white hover:bg-slate-50 border border-[#CBD5E1] hover:border-[#2857D9] text-[#0B1B30] text-[14px] font-semibold flex items-center justify-center gap-2.5 transition-all duration-200 ease-out hover:-translate-y-[2px] shadow-2xs"
              >
                <svg
                  className="w-[18px] h-[18px] shrink-0 text-[#486581]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 22V2a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v20" />
                  <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h2" />
                  <path d="M18 18h2a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2h-2" />
                  <path d="M10 6h4" />
                  <path d="M10 10h4" />
                  <path d="M10 14h4" />
                  <path d="M10 18h4" />
                </svg>
                <span>Government Admin</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Central Product Loop Section as requested in Section 29 */}
        <section className="py-12 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#1D4ED8] dark:text-blue-400">
                End-to-End Longitudinal Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100">
                The Central SkillBridge AI Product Loop
              </h2>
              <p className="text-xs text-slate-500 max-w-xl mx-auto">
                Continuous closed-loop feedback synchronizing youth capability development with real-time labor market absorption.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-center pt-2">
              {centralProductLoop.map((item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1 hover:border-[#1D4ED8] transition-colors"
                >
                  <span className="text-[10px] font-mono font-extrabold text-[#1D4ED8] dark:text-blue-400 block">
                    {item.step}
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 line-clamp-1">
                    {item.title}
                  </h4>
                  <p className="text-[9px] text-slate-500 dark:text-slate-400 line-clamp-2">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3 Dedicated Role Cards Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
              Three Specialized Digital Command Portals
            </h2>
            <p className="text-xs text-slate-500">
              Role-isolated permissions tailored for students, accredited instructors, and ministry authorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 flex items-center justify-center text-2xl font-bold">
                  🎓
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Student Portal</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Personalized skill readiness analytics, AI skill gap radar, recommended courses with Course Impact Scores, and verified placement tracking.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-1.5">✓ Longitudinal Employment Journey</li>
                  <li className="flex items-center gap-1.5">✓ 4-Category AI Skill Gap Diagnostics</li>
                  <li className="flex items-center gap-1.5">✓ DigiLocker Verified Credentials</li>
                </ul>
              </div>

              <Link
                href="/learner/dashboard"
                className="w-full py-2.5 rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-white font-bold text-xs text-center shadow-xs transition-colors"
              >
                Access Student Portal →
              </Link>
            </div>

            {/* Trainer Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-2xl font-bold">
                  👨‍🏫
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Trainer Portal</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Accredited instructor command console. Manage assigned batch rosters, record AEBAS daily attendance, conduct assessments, and prevent dropouts.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-1.5">✓ My Students Console & Skill Gaps</li>
                  <li className="flex items-center gap-1.5">✓ AEBAS Terminal Attendance Sync</li>
                  <li className="flex items-center gap-1.5">✓ SSC Certification Score Ledger</li>
                </ul>
              </div>

              <Link
                href="/trainer/dashboard"
                className="w-full py-2.5 rounded-lg bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs text-center shadow-xs transition-colors"
              >
                Access Trainer Portal →
              </Link>
            </div>

            {/* Government Admin Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#0B192C] dark:text-white flex items-center justify-center text-2xl font-bold">
                  🏛️
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Government Admin</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  National Skill Intelligence dashboard. Multi-dimensional Course Intelligence matrix, National Skill Gap Map, PFMS DBT tracking, and Early Warning radar.
                </p>
                <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <li className="flex items-center gap-1.5">✓ National Course Intelligence Matrix</li>
                  <li className="flex items-center gap-1.5">✓ Country to Institution Skill Gap Drilldown</li>
                  <li className="flex items-center gap-1.5">✓ EPFO Outcome Auditing & Early Warnings</li>
                </ul>
              </div>

              <Link
                href="/government/dashboard"
                className="w-full py-2.5 rounded-lg bg-[#0B192C] dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs text-center shadow-xs transition-colors"
              >
                Access Government Admin →
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-sm tracking-tight text-white">SKILLBRIDGE AI</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">National Digital Skill Infrastructure Platform</span>
          </div>
          <p className="text-slate-500 text-[11px]">
            Designed to NCVET, MSDE & Digital Public Infrastructure (DPI) Standards • 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
