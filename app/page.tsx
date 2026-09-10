'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  GraduationCap,
  Building2,
  Landmark,
  Sparkles,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Search,
} from 'lucide-react';

export default function HomePage() {
  const portalCards = [
    {
      title: 'Learner Portal',
      role: 'Candidate / Student',
      icon: GraduationCap,
      accent: 'border-blue-500/30 text-blue-600 bg-blue-50',
      description:
        'Access personalized AI skill-gap diagnostics, verified learning paths, employment opportunities, and cryptographic certifications.',
      features: [
        'Real-time Skill Gap Diagnostics',
        'NSQF-Aligned Course Recommendations',
        'Longitudinal Wage & Placement Tracking',
        'AI Career Assistant & Roadmap',
      ],
      href: '/login',
      cta: 'Access Learner Cockpit',
    },
    {
      title: 'Trainer Portal',
      role: 'Training Partner / Institute',
      icon: Building2,
      accent: 'border-amber-500/30 text-amber-600 bg-amber-50',
      description:
        'Manage training cohorts, monitor curriculum milestones, evaluate assessments, and inspect learner outcome conversions.',
      features: [
        'Batch Attendance & Progression Radar',
        'Cohort Diagnostic Benchmarking',
        'Course Syllabus & Materials Hub',
        'Employment Retention Monitoring',
      ],
      href: '/login',
      cta: 'Access Trainer Console',
    },
    {
      title: 'Government Portal',
      role: 'Mission Director / State PMU',
      icon: Landmark,
      accent: 'border-emerald-500/30 text-emerald-600 bg-emerald-50',
      description:
        'Comprehensive state-level and national skilling intelligence, scheme ROI auditing, regional capacity heatmaps, and policy analytics.',
      features: [
        'National Skilling Telemetry & KPI Funnel',
        'Statutory Outcome Audit Verifications',
        'Emerging Skill Demand & Deficit Mapping',
        'Scheme-wise Fund & Placement Audits',
      ],
      href: '/login',
      cta: 'Access Executive Dashboard',
    },
  ];

  const platformPillars = [
    {
      title: 'Diagnostic Truth-in-Data',
      desc: 'Competency vector assessments mathematically benchmarked against live industry labor demand.',
      icon: Layers,
    },
    {
      title: 'Explainable Intelligence',
      desc: 'Clear, transparent causal rationales behind every skill-gap score and career trajectory recommendation.',
      icon: Sparkles,
    },
    {
      title: 'Longitudinal Tracer Loops',
      desc: 'Tracking 30, 90, 180, and 360-day employment retention with verified wage milestones.',
      icon: TrendingUp,
    },
    {
      title: 'Single Sign-On Security',
      desc: 'Enterprise RBAC security ensuring strict portal separation based on authenticated database roles.',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#0B1E36] border-b border-[#1E3A5F] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1D4ED8] to-[#0B3B60] flex items-center justify-center text-white font-black text-sm shadow-sm border border-white/20">
              ST
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-base tracking-tight leading-none">
                Skill Track
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Longitudinal Skilling & Impact System
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#portals" className="hover:text-white transition-colors">
              Institutional Portals
            </a>
            <a href="#pillars" className="hover:text-white transition-colors">
              Architecture & Features
            </a>
            <Link href="/login" className="hover:text-white transition-colors">
              Verify Credentials
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="h-9 px-4 rounded-lg border border-slate-600 hover:border-slate-400 text-slate-200 font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="h-9 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <span>Register Candidate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative bg-[#0B1E36] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#1E3A5F]">
          <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#FF9933]" />
              <span>National Longitudinal Skilling & Outcome Telemetry Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Measuring Real Skilling Outcomes,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#FF9933]">
                Not Just Enrolments
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Skill Track bridges education, industry vacancies, and career progression with explainable AI diagnostics, wage-retention tracking, and verifiable accreditation audits.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
              <Link
                href="/login"
                className="h-11 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <span>Access Authorized Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register"
                className="h-11 px-6 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/20 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all"
              >
                <span>Candidate Registration</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Portals Section */}
        <section id="portals" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Role-Based Portals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Three Specialized Operational Interfaces
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Each portal is completely segregated with dedicated navigation, tailored analytics, and role-governed workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {portalCards.map((portal) => {
              const Icon = portal.icon;
              return (
                <div
                  key={portal.title}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${portal.accent}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {portal.role.split('/')[0]}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-900">{portal.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {portal.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      {portal.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6">
                    <Link
                      href={portal.href}
                      className="w-full h-10 rounded-lg bg-[#0B1E36] hover:bg-[#1E3A5F] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <span>{portal.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pillars Section */}
        <section id="pillars" className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                System Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Designed for Reliability & Scalability
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div key={idx} className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 space-y-2.5">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{p.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1E36] text-slate-400 text-xs py-8 border-t border-[#1E3A5F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              ST
            </div>
            <span className="font-bold text-white">Skill Track</span>
            <span>— Longitudinal Skilling & Impact System</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link href="/login" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/register" className="hover:text-white transition-colors">
              Candidate Register
            </Link>
            <span>Production v2.5</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
