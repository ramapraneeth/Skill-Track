'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  ShieldCheck,
  GraduationCap,
  Building2,
  Landmark,
  Briefcase,
  Sparkles,
  BarChart3,
  CheckCircle2,
  TrendingUp,
  Award,
  Layers,
  Search,
  Users,
  Cpu,
  FileCheck,
  ExternalLink,
  ChevronRight,
  Lock,
  Menu,
  X,
  Database,
  Home,
  Info,
} from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dashBarOpen, setDashBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('ST-2026-IND-8849');
  const [verifiedResult, setVerifiedResult] = useState<any>({
    credentialId: 'ST-2026-IND-8849',
    candidateName: 'Rahul Sharma',
    skill: 'Embedded Systems & IoT Engineering',
    nsqfLevel: 'NSQF Level 6',
    institution: 'National Skill Training Institute (NSTI), Bengaluru',
    issueDate: '14 August 2025',
    status: 'Verified Authenticated',
    hash: 'sha256:8f4c2e71...9a3b210d',
    retentionWage: '₹42,000 / month',
  });

  const handleVerifySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setVerifiedResult({
      credentialId: searchQuery.trim().toUpperCase(),
      candidateName: 'Rahul Sharma',
      skill: 'Embedded Systems & IoT Engineering',
      nsqfLevel: 'NSQF Level 6',
      institution: 'National Skill Training Institute (NSTI), Bengaluru',
      issueDate: '14 August 2025',
      status: 'Verified Authenticated',
      hash: 'sha256:' + Math.random().toString(36).substring(2, 12) + '...7f89',
      retentionWage: '₹42,000 / month',
    });
  };

  const portalCards = [
    {
      title: 'Candidate Portal',
      role: 'Student / Job Seeker',
      icon: GraduationCap,
      description:
        'Access personalized AI skill-gap diagnostics, verified learning paths, employment opportunities, and cryptographic certifications.',
      features: [
        'Real-time Skill Gap Diagnostics',
        'NSQF-Aligned Course Recommendations',
        'Longitudinal Wage & Placement Tracking',
        'AI Career Assistant & Roadmap',
      ],
      href: '/login',
      cta: 'Access Candidate Portal',
    },
    {
      title: 'Institution Portal',
      role: 'Training Partner / Institute',
      icon: Building2,
      description:
        'Manage training cohorts, monitor curriculum milestones, evaluate assessments, and inspect learner outcome conversions.',
      features: [
        'Batch Attendance & Progression Radar',
        'Cohort Diagnostic Benchmarking',
        'Course Syllabus & Materials Hub',
        'Employment Retention Monitoring',
      ],
      href: '/login',
      cta: 'Access Institution Portal',
    },
    {
      title: 'Employer Portal',
      role: 'Industry & Hiring Partner',
      icon: Briefcase,
      description:
        'Access pre-verified candidates benchmarked with standardized competency rubrics, hire apprentice cohorts, and evaluate workforce readiness.',
      features: [
        'Pre-Screened Skill Radar Profiles',
        'Direct NAPS Apprenticeship Hiring',
        'Cryptographic Credential Verification',
        'Industry Demand Alignment Pipeline',
      ],
      href: '/login',
      cta: 'Access Employer Portal',
    },
    {
      title: 'Government Portal',
      role: 'Mission Director / State PMU',
      icon: Landmark,
      description:
        'Comprehensive state-level and national skilling intelligence, scheme ROI auditing, regional capacity heatmaps, and policy analytics.',
      features: [
        'National Skilling Telemetry & KPI Funnel',
        'Statutory Outcome Audit Verifications',
        'Emerging Skill Demand & Deficit Mapping',
        'Scheme-wise Fund & Placement Audits',
      ],
      href: '/login',
      cta: 'Access Government Portal',
    },
  ];

  const featureCards = [
    {
      title: 'End-to-End Tracking',
      desc: 'Track learners seamlessly from initial enrolment to classroom training, certification, employer placement, and multi-year retention.',
      icon: TrendingUp,
    },
    {
      title: 'AI-Powered Insights',
      desc: 'Predict employment outcomes, identify regional skill gaps, and suggest precision interventions before training completion.',
      icon: Sparkles,
    },
    {
      title: 'Wage & Retention Analytics',
      desc: 'Monitor verified post-placement earnings, formal EPF/ESI transitions, and 30-to-360-day continuous career progression.',
      icon: BarChart3,
    },
    {
      title: 'Verified Accreditation',
      desc: 'Issue tamper-proof, cryptographically signed credentials linked with DigiLocker and National Career Service standards.',
      icon: Award,
    },
    {
      title: 'Industry Collaboration',
      desc: 'Connect training centers directly with verified national employers, apprentice frameworks, and live workforce vacancies.',
      icon: Building2,
    },
    {
      title: 'Data for Better Policy',
      desc: 'Provide evidence-based analytics and expenditure audits to government ministries, state PMUs, and public funding agencies.',
      icon: Landmark,
    },
  ];

  const platformPillars = [
    {
      title: 'Diagnostic Truth-in-Data',
      desc: 'Competency vector assessments mathematically benchmarked against live industry labor demand and NSQF frameworks.',
      icon: Layers,
    },
    {
      title: 'Explainable Intelligence',
      desc: 'Clear, transparent causal rationales behind every skill-gap score and automated career trajectory recommendation.',
      icon: Sparkles,
    },
    {
      title: 'Longitudinal Tracer Loops',
      desc: 'Tracking 30, 90, 180, and 360-day employment retention with verified wage milestones and industry stability.',
      icon: TrendingUp,
    },
    {
      title: 'Single Sign-On Security',
      desc: 'Enterprise RBAC security ensuring strict portal separation based on authenticated database roles and statutory controls.',
      icon: Shield,
    },
  ];

  const nationalMetrics = [
    { label: 'Learners Tracked', value: '1,480,240+', sub: 'Across 36 States & UTs' },
    { label: 'Placement Conversion', value: '84.6%', sub: 'Verified Formal Roles' },
    { label: '180-Day Retention Rate', value: '91.2%', sub: 'Monitored Post-Hire' },
    { label: 'Average Wage Growth', value: '+38.4%', sub: 'Post-Skilling Baseline' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFE] text-[#0B2F55] overflow-x-hidden relative">
      {/* ========================================================
          VERTICAL FORMAT DASH BAR (DRAWER) - LIKE IN GOVERNMENT WEBSITES
          Opens on the left; background website shifts right and blurs (no dark backdrop curtain)
          ======================================================== */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 sm:w-80 bg-white border-r border-[#CFE3FA] shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          dashBarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navigation Dash Bar"
      >
        {/* Drawer Top Header with Official Identity & Close Button */}
        <div className="p-5 border-b border-[#E5EDF6] flex items-center justify-between bg-[#F7FAFE]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-extrabold text-xs shadow-2xs">
              ST
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-[#0B2F55] text-sm tracking-tight leading-none">
                Skill Track
              </span>
              <span className="text-[10px] text-[#45627F] font-medium mt-0.5">
                Government Digital Portal
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={() => setDashBarOpen(false)}
            className="p-1.5 rounded-lg text-[#45627F] hover:text-[#0B2F55] hover:bg-white border border-transparent hover:border-[#CFE3FA] transition-colors cursor-pointer"
            aria-label="Close Dash Bar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* State Emblem Strip in Drawer */}
        <div className="px-5 py-3.5 bg-white border-b border-[#E5EDF6] flex items-center gap-3">
          <div className="w-6 h-8 text-[#0B2F55] flex-shrink-0">
            <svg viewBox="0 0 100 125" className="w-6 h-8 fill-current" aria-label="State Emblem of India">
              <path d="M50 8 C46 8 43 11 43 15 C43 17 44 19 46 20 C42 22 39 26 39 31 C39 36 43 40 47 41 C46 43 45 45 45 48 C42 48 39 50 38 53 C37 57 39 61 43 62 L43 72 L37 72 C35 72 33 74 33 76 L33 80 L67 80 L67 76 C67 74 65 72 63 72 L57 72 L57 62 C61 61 63 57 62 53 C61 50 58 48 55 48 C55 45 54 43 53 41 C57 40 61 36 61 31 C61 26 58 22 54 20 C56 19 57 17 57 15 C57 11 54 8 50 8 Z" />
              <rect x="22" y="82" width="56" height="11" rx="2" fill="currentColor" />
              <path d="M26 95 C30 102 40 106 50 106 C60 106 70 102 74 95 L26 95 Z" opacity="0.85" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#0B2F55] uppercase tracking-wider leading-tight">
              Government of India
            </span>
            <span className="text-[9px] text-[#45627F] leading-tight">
              Ministry of Skill Development &amp; Entrepreneurship
            </span>
          </div>
        </div>

        {/* Vertical Format Navigation List (Requested Items in Vertical Format) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#45627F] px-3 mb-2.5 block">
              Portal Navigation
            </span>
            <nav className="space-y-1.5">
              {/* 1. Home */}
              <Link
                href="/"
                onClick={() => setDashBarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-bold text-[#1769E0] bg-[#EAF4FF] border border-[#CFE3FA] transition-all"
              >
                <Home className="w-4 h-4 text-[#1769E0]" />
                <span className="flex-1">Home</span>
                <span className="w-2 h-2 rounded-full bg-[#1769E0]" />
              </Link>

              {/* 2. About */}
              <a
                href="#about"
                onClick={() => setDashBarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-semibold text-[#45627F] hover:text-[#0B2F55] hover:bg-[#F2F8FF] transition-all"
              >
                <Info className="w-4 h-4 text-[#45627F]" />
                <span>About</span>
              </a>

              {/* 3. Institutions */}
              <a
                href="#portals"
                onClick={() => setDashBarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-semibold text-[#45627F] hover:text-[#0B2F55] hover:bg-[#F2F8FF] transition-all"
              >
                <Building2 className="w-4 h-4 text-[#45627F]" />
                <span>Institutions</span>
              </a>

              {/* 4. Features */}
              <a
                href="#features"
                onClick={() => setDashBarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-semibold text-[#45627F] hover:text-[#0B2F55] hover:bg-[#F2F8FF] transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#45627F]" />
                <span>Features</span>
              </a>

              {/* 5. Verify Credentials */}
              <a
                href="#verify"
                onClick={() => setDashBarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-3 rounded-lg text-xs font-semibold text-[#45627F] hover:text-[#0B2F55] hover:bg-[#F2F8FF] transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#16A36A]" />
                <span className="flex-1">Verify Credentials</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#16A36A] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Gov
                </span>
              </a>
            </nav>
          </div>

          {/* Operational Portals Sub-Section */}
          <div className="pt-2 border-t border-[#E5EDF6]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#45627F] px-3 mb-2 block">
              Operational Portals
            </span>
            <div className="space-y-1">
              <Link
                href="/login"
                onClick={() => setDashBarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-[#0B2F55] hover:bg-[#F2F8FF] transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-[#1769E0]" />
                <span>Candidate Portal</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setDashBarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-[#0B2F55] hover:bg-[#F2F8FF] transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#B45309]" />
                <span>Institution Portal</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setDashBarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-[#0B2F55] hover:bg-[#F2F8FF] transition-colors"
              >
                <Briefcase className="w-4 h-4 text-[#1769E0]" />
                <span>Employer Portal</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setDashBarOpen(false)}
                className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-[#0B2F55] hover:bg-[#F2F8FF] transition-colors"
              >
                <Landmark className="w-4 h-4 text-[#16A36A]" />
                <span>Government Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Dash Bar Bottom Actions */}
        <div className="p-4 border-t border-[#E5EDF6] bg-[#F7FAFE] space-y-2">
          <Link
            href="/login"
            onClick={() => setDashBarOpen(false)}
            className="w-full h-10 rounded-lg bg-white border border-[#1769E0] text-[#1769E0] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#F2F8FF] transition-colors shadow-2xs"
          >
            <span>Sign In</span>
          </Link>
          <Link
            href="/register"
            onClick={() => setDashBarOpen(false)}
            className="w-full h-10 rounded-lg bg-[#1769E0] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
          >
            <span>Register Candidate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Website Page Content Container - Moves aside to the right and gets blurred when dash bar is open */}
      <div
        className={`min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          dashBarOpen
            ? 'translate-x-72 sm:translate-x-80 blur-[2px] opacity-85 cursor-pointer'
            : 'translate-x-0 blur-none opacity-100'
        }`}
        onClick={() => {
          if (dashBarOpen) setDashBarOpen(false);
        }}
      >
        {/* Subtle National Tricolor Micro-strip */}
        <div className="h-1 w-full flex">
          <div className="flex-1 bg-[#F59E0B]" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#16A36A]" />
        </div>

        {/* Official Government Header (Emblem & Govt of India block removed from header per instruction) */}
        <header className="sticky top-0 z-40 w-full bg-[#FFFFFF] border-b border-[#E5EDF6] shadow-2xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between">
            {/* Left: The Three Lines Option + Skill Track Brand Identity */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* The Three Lines Option on the left side at the top corner */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setDashBarOpen(!dashBarOpen);
                }}
                className="p-2 sm:px-3 sm:py-2 rounded-lg text-[#0B2F55] hover:text-[#1769E0] hover:bg-[#F2F8FF] border border-[#CFE3FA] flex items-center gap-2 transition-all shadow-2xs group cursor-pointer"
                aria-label="Toggle Navigation Dash Bar"
                title="Toggle Navigation Menu"
              >
                <Menu className="w-5 h-5 text-[#0B2F55] group-hover:text-[#1769E0]" />
                <span className="hidden md:inline-block text-xs font-bold text-[#0B2F55] group-hover:text-[#1769E0]">
                  Menu
                </span>
              </button>

              {/* Platform Brand */}
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-extrabold text-xs sm:text-sm shadow-2xs border border-blue-600">
                  ST
                </div>
                <div className="hidden sm:flex flex-col">
                  <span className="font-extrabold text-[#0B2F55] text-base tracking-tight leading-none">
                    Skill Track
                  </span>
                  <span className="text-[10px] text-[#45627F] font-medium mt-0.5">
                    Longitudinal Skilling &amp; Impact System
                  </span>
                </div>
              </Link>
            </div>

            {/* Header Action CTAs */}
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="h-10 px-4 sm:px-5 rounded-lg bg-[#FFFFFF] border border-[#1769E0] hover:bg-[#F2F8FF] text-[#1769E0] font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                className="h-10 px-4 sm:px-5 rounded-lg bg-[#1769E0] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <span>Register Candidate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </header>


      {/* Main Content Area */}
      <main className="flex-1">
        {/* ========================================================
            HERO SECTION (TWO-COLUMN, LIGHT, ORIGINAL ABSTRACT GOVERNMENT
            DIGITAL INFRASTRUCTURE VISUAL COMPOSITION — ZERO HUMAN IMAGERY)
            ======================================================== */}
        <section className="relative bg-gradient-to-b from-[#FFFFFF] via-[#F7FAFE] to-[#EAF4FF]/50 pt-12 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#CFE3FA]">
          {/* Subtle Ambient Upper-Right Light Blue Atmosphere */}
          <div className="absolute top-0 right-0 w-[55%] h-full bg-gradient-to-bl from-[#E1F0FF]/60 via-[#F2F8FF]/40 to-transparent pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
              {/* ----------------------------------------------------
                  LEFT COLUMN: 56% WIDTH (CLEAN, CONFIDENT TYPOGRAPHY)
                  ---------------------------------------------------- */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left pr-0 lg:pr-4">
                {/* Official Platform Identifier Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#CFE3FA] text-[#1769E0] text-xs font-semibold shadow-2xs">
                  <Shield className="w-3.5 h-3.5 text-[#1769E0]" />
                  <span>National Longitudinal Skilling &amp; Outcome Telemetry Platform</span>
                </div>

                {/* Main Two-Level Headline strictly adhering to font & exact text */}
                <h1 className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold tracking-tight leading-[1.04]">
                  <span className="text-[#0B2F55] block">
                    Measuring Real Skilling Outcomes,
                  </span>
                  <span className="text-[#1769E0] block mt-1">
                    Not Just Enrolments
                  </span>
                </h1>

                {/* Hero Description */}
                <p className="text-base sm:text-[18px] text-[#45627F] max-w-[620px] leading-[1.62] font-normal">
                  Skill Track bridges education, industry vacancies, and career progression with explainable AI diagnostics, wage-retention tracking, and verifiable accreditation audits.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/login"
                    className="h-[52px] px-7 rounded-lg bg-[#1769E0] hover:bg-[#2563EB] text-white font-bold text-sm inline-flex items-center gap-2 shadow-xs transition-all"
                  >
                    <span>Access Authorized Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/register"
                    className="h-[52px] px-7 rounded-lg bg-white hover:bg-[#F2F8FF] text-[#0B2F55] border border-[#CFE3FA] font-bold text-sm inline-flex items-center gap-2 transition-all shadow-2xs"
                  >
                    <span>Candidate Registration</span>
                  </Link>
                </div>

                {/* Understated Trust Indicators with Thin Vertical Separators */}
                <div className="pt-6 border-t border-[#E5EDF6] flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#45627F] font-semibold">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#1769E0]" />
                    <span>Transparent</span>
                  </div>
                  <span className="hidden sm:inline-block w-px h-4 bg-[#CFE3FA]" />
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#1769E0]" />
                    <span>Data Driven</span>
                  </div>
                  <span className="hidden sm:inline-block w-px h-4 bg-[#CFE3FA]" />
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#1769E0]" />
                    <span>Inclusive</span>
                  </div>
                  <span className="hidden sm:inline-block w-px h-4 bg-[#CFE3FA]" />
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#1769E0]" />
                    <span>Future Ready</span>
                  </div>
                </div>
              </div>

              {/* ----------------------------------------------------
                  RIGHT COLUMN: 44% WIDTH (SOPHISTICATED ABSTRACT
                  GOVERNMENT + TECHNOLOGY + DIGITAL INFRASTRUCTURE VISUAL)
                  STRICTLY ZERO HUMAN IMAGERY!
                  ---------------------------------------------------- */}
              <div className="lg:col-span-5 relative w-full h-[460px] sm:h-[500px] lg:h-[520px] flex items-center justify-center select-none">
                {/* SVG Canvas for Ashoka Chakra, Skyline, Progression Vectors, and Telemetry Grid */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 540 520"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Soft gradients for architecture and waves */}
                    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#E1F0FF" stopOpacity="0.4" />
                    </linearGradient>

                    <linearGradient id="archGradBack" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#CFE3FA" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#E1F0FF" stopOpacity="0.15" />
                    </linearGradient>

                    <linearGradient id="archGradFront" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#1769E0" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.1" />
                    </linearGradient>

                    <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#1769E0" stopOpacity="0.4" />
                    </linearGradient>

                    <linearGradient id="wave1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EAF4FF" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#CFE3FA" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#E1F0FF" stopOpacity="0.9" />
                    </linearGradient>

                    <linearGradient id="wave2" x1="100%" y1="0%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#1769E0" stopOpacity="0.15" />
                      <stop offset="60%" stopColor="#60A5FA" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* 1. Large Circular Ashoka Chakra Watermark (Upper-Right, partially cropped) */}
                  <g transform="translate(390, 150)" opacity="0.18">
                    {/* Outer beaded rim */}
                    <circle cx="0" cy="0" r="170" stroke="#1769E0" strokeWidth="2.5" />
                    <circle cx="0" cy="0" r="158" stroke="#1769E0" strokeWidth="1" strokeDasharray="3 4" />
                    <circle cx="0" cy="0" r="148" stroke="#1769E0" strokeWidth="1.5" />
                    
                    {/* Center Hub */}
                    <circle cx="0" cy="0" r="32" stroke="#1769E0" strokeWidth="2" fill="#F7FAFE" />
                    <circle cx="0" cy="0" r="12" fill="#1769E0" opacity="0.6" />

                    {/* 24 Distinct Radiating Spokes */}
                    {Array.from({ length: 24 }).map((_, i) => {
                      const angle = i * 15;
                      const rad = (angle * Math.PI) / 180;
                      const x1 = Math.cos(rad) * 32;
                      const y1 = Math.sin(rad) * 32;
                      const x2 = Math.cos(rad) * 148;
                      const y2 = Math.sin(rad) * 148;
                      return (
                        <g key={i}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="#1769E0"
                            strokeWidth="1.8"
                          />
                          {/* Triangular spoke wedge accent */}
                          <circle
                            cx={Math.cos(rad) * 138}
                            cy={Math.sin(rad) * 138}
                            r="2"
                            fill="#1769E0"
                          />
                        </g>
                      );
                    })}
                  </g>

                  {/* 2. Career Progression Vectors (Upward Arrow Paths into Future) */}
                  <g opacity="0.45">
                    {/* Large primary upward vector arrow */}
                    <path
                      d="M 280 340 L 460 140 L 480 140 L 480 160 L 460 140"
                      stroke="url(#arrowGrad)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <polygon
                      points="470,125 495,135 480,160 468,144"
                      fill="#1769E0"
                      opacity="0.3"
                    />

                    {/* Secondary parallel trajectory arrow */}
                    <path
                      d="M 330 380 L 510 180"
                      stroke="#93C5FD"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <polygon
                      points="505,170 525,180 515,198 505,185"
                      fill="#93C5FD"
                      opacity="0.4"
                    />
                  </g>

                  {/* 3. Subtle Digital Telemetry Grid & Connected Nodes in Upper Area */}
                  <g opacity="0.35">
                    <circle cx="210" cy="180" r="3" fill="#1769E0" />
                    <circle cx="270" cy="120" r="2.5" fill="#1769E0" />
                    <circle cx="340" cy="90" r="3" fill="#1769E0" />
                    <line x1="210" y1="180" x2="270" y2="120" stroke="#CFE3FA" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="270" y1="120" x2="340" y2="90" stroke="#CFE3FA" strokeWidth="1" strokeDasharray="3 3" />

                    {/* Subtle birds in flight above civic skyline */}
                    <path d="M 170 190 Q 175 185 180 190 Q 185 185 190 190" stroke="#1769E0" strokeWidth="1.2" fill="none" opacity="0.4" />
                    <path d="M 195 175 Q 200 170 205 175 Q 210 170 215 175" stroke="#1769E0" strokeWidth="1" fill="none" opacity="0.35" />
                    <path d="M 230 195 Q 234 191 238 195 Q 242 191 246 195" stroke="#1769E0" strokeWidth="1" fill="none" opacity="0.3" />
                  </g>

                  {/* 4. Background Institutional Architecture Layer (Domes & Civic Skyline) */}
                  <g fill="url(#archGradBack)">
                    {/* Distant Rashtrapati Bhavan / Parliament Style Grand Civic Dome */}
                    <path d="M 320 400 L 320 280 L 328 280 L 328 260 L 340 240 L 350 240 L 350 220 L 355 205 L 360 220 L 360 240 L 370 240 L 382 260 L 382 280 L 390 280 L 390 400 Z" />
                    <path d="M 335 280 L 335 340 L 343 340 L 343 280 Z" fill="#FFFFFF" opacity="0.6" />
                    <path d="M 367 280 L 367 340 L 375 340 L 375 280 Z" fill="#FFFFFF" opacity="0.6" />

                    {/* Flanking institutional colonnades and educational wings */}
                    <rect x="280" y="320" width="38" height="80" />
                    <rect x="392" y="320" width="40" height="80" />

                    {/* Modern Technology Infrastructure Towers */}
                    <rect x="440" y="240" width="22" height="160" />
                    <rect x="466" y="210" width="26" height="190" />
                    <line x1="479" y1="210" x2="479" y2="180" stroke="#1769E0" strokeWidth="1.5" opacity="0.5" />
                    <rect x="496" y="260" width="20" height="140" />
                    <rect x="520" y="280" width="18" height="120" />
                  </g>

                  {/* 5. Midground Architecture: The India Gate-Inspired Monumental Civic Arch */}
                  <g fill="url(#archGradFront)">
                    {/* India Gate Silhouette */}
                    {/* Base and lower pillars */}
                    <path d="M 160 400 L 160 300 L 175 300 L 175 270 L 180 270 L 180 250 L 250 250 L 250 270 L 255 270 L 255 300 L 270 300 L 270 400 L 244 400 L 244 325 C 244 300, 186 300, 186 325 L 186 400 Z" />
                    {/* India Gate Attic / Top cornice */}
                    <rect x="176" y="238" width="78" height="12" rx="1" />
                    <rect x="184" y="228" width="62" height="10" rx="1" />
                    <rect x="194" y="220" width="42" height="8" rx="0.5" />
                    {/* Center Arch cutout light beam */}
                    <path d="M 188 400 L 188 328 C 188 306, 242 306, 242 328 L 242 400 Z" fill="#FFFFFF" opacity="0.75" />
                  </g>

                  {/* 6. Foreground Modern Skyline & Civic Columns */}
                  <g fill="#1769E0" opacity="0.12">
                    {/* High-rise stepped tech hub */}
                    <polygon points="120,400 120,330 134,330 134,310 148,310 148,400" />
                    <polygon points="90,400 90,350 110,350 110,400" />
                    {/* Classical colonnade portico */}
                    <rect x="272" y="340" width="6" height="60" />
                    <rect x="282" y="340" width="6" height="60" />
                    <rect x="292" y="340" width="6" height="60" />
                    <rect x="302" y="340" width="6" height="60" />
                    <rect x="270" y="334" width="40" height="6" />
                  </g>

                  {/* 7. Bottom Smooth Flowing Waves (Across hero lower boundary) */}
                  <path
                    d="M -20 450 Q 140 400 280 430 T 560 400 L 560 520 L -20 520 Z"
                    fill="url(#wave1)"
                  />
                  <path
                    d="M -20 470 Q 180 430 360 460 T 560 430 L 560 520 L -20 520 Z"
                    fill="url(#wave2)"
                  />
                  <path
                    d="M 40 485 Q 240 445 420 470 T 560 450 L 560 520 L 40 520 Z"
                    fill="#F7FAFE"
                    opacity="0.8"
                  />
                </svg>

              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            NATIONAL TELEMETRY STRIP (EVIDENCE IN NUMBERS)
            ======================================================== */}
        <section className="py-8 bg-white border-b border-[#E5EDF6]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E5EDF6]">
              {nationalMetrics.map((item, idx) => (
                <div key={idx} className={`pt-4 md:pt-0 ${idx > 0 ? 'md:pl-6' : ''}`}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#0B2F55] tracking-tight tabular-nums">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1769E0] mt-0.5">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-[#45627F] mt-0.5">
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            FEATURES SECTION: "A Smarter Way to Track Skills, Careers and Impact"
            ======================================================== */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF4FF] px-3.5 py-1 rounded-full border border-[#CFE3FA]">
              Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2F55] tracking-tight">
              A Smarter Way to Track Skills, Careers and Impact
            </h2>
            <p className="text-sm sm:text-base text-[#45627F] leading-relaxed">
              Our platform brings together technology, data, and governance to ensure that every skilling effort creates measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featureCards.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-[#E3EDF7] rounded-xl p-6 sm:p-7 shadow-[0_4px_20px_rgba(15,60,100,0.05)] hover:shadow-[0_8px_28px_rgba(15,60,100,0.08)] hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="w-11 h-11 rounded-lg bg-[#EAF4FF] text-[#1769E0] flex items-center justify-center border border-[#CFE3FA]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B2F55]">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#45627F] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-5 mt-4 border-t border-[#F2F8FF] flex items-center text-xs font-semibold text-[#1769E0]">
                    <span>Standard specifications</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================
            ROLE-BASED OPERATIONAL INTERFACES (4 Segregated Portals)
            ======================================================== */}
        <section id="portals" className="py-20 bg-gradient-to-b from-[#F7FAFE] to-white border-y border-[#CFE3FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF4FF] px-3.5 py-1 rounded-full border border-[#CFE3FA]">
                Operational Interfaces
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2F55] tracking-tight">
                Three Specialized Operational Interfaces
              </h2>
              <p className="text-sm sm:text-base text-[#45627F]">
                Choose your role to continue — each portal provides strict data isolation, tailored telemetry, and statutory workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portalCards.map((portal) => {
                const Icon = portal.icon;
                return (
                  <div
                    key={portal.title}
                    className="bg-white border border-[#E3EDF7] rounded-xl p-6 shadow-[0_4px_20px_rgba(15,60,100,0.05)] hover:shadow-[0_8px_28px_rgba(15,60,100,0.08)] hover:-translate-y-0.5 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-lg bg-[#EAF4FF] text-[#1769E0] border border-[#CFE3FA] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2F8FF] text-[#0B2F55] border border-[#CFE3FA]">
                          {portal.role.split('/')[0]}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[#0B2F55]">{portal.title}</h3>
                        <p className="text-xs text-[#45627F] mt-1.5 leading-relaxed">
                          {portal.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-[#E5EDF6]">
                        {portal.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#0B2F55]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A36A] shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-4">
                      <Link
                        href={portal.href}
                        className="w-full h-10 rounded-lg bg-[#1769E0] hover:bg-[#2563EB] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <span>{portal.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================
            VERIFY CREDENTIALS INTERACTIVE GATEWAY
            ======================================================== */}
        <section id="verify" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-white border border-[#CFE3FA] rounded-2xl p-6 sm:p-10 shadow-[0_4px_20px_rgba(15,60,100,0.05)]">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#16A36A] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Statutory Verification
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2F55]">
                Verify Skills. Trust Credentials.
              </h2>
              <p className="text-xs sm:text-sm text-[#45627F]">
                Enter any candidate credential ID or scan cryptographic hashes to verify authentic certification and NSQF-level authenticity.
              </p>

              {/* Verification Search Bar */}
              <form onSubmit={handleVerifySearch} className="flex flex-col sm:flex-row gap-3 pt-3 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#45627F] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Credential ID (e.g. ST-2026-IND-8849)"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#CFE3FA] text-xs sm:text-sm text-[#0B2F55] placeholder-[#45627F]/60 focus:outline-none focus:border-[#1769E0]"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 px-6 rounded-lg bg-[#1769E0] hover:bg-[#2563EB] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-2xs transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential</span>
                </button>
              </form>
            </div>

            {/* Live Verification Result Surface */}
            {verifiedResult && (
              <div className="max-w-2xl mx-auto bg-[#F7FAFE] border border-[#CFE3FA] rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5EDF6] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#16A36A] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0B2F55]">
                        {verifiedResult.status}
                      </span>
                      <span className="text-[11px] text-[#45627F] block font-mono">
                        ID: {verifiedResult.credentialId}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#16A36A] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Tamper-Proof Proof
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#45627F] block text-[11px]">Candidate Name</span>
                    <span className="font-bold text-[#0B2F55] text-sm">{verifiedResult.candidateName}</span>
                  </div>
                  <div>
                    <span className="text-[#45627F] block text-[11px]">Skill &amp; Standard</span>
                    <span className="font-bold text-[#0B2F55]">{verifiedResult.skill} ({verifiedResult.nsqfLevel})</span>
                  </div>
                  <div>
                    <span className="text-[#45627F] block text-[11px]">Accredited Institution</span>
                    <span className="font-semibold text-[#0B2F55]">{verifiedResult.institution}</span>
                  </div>
                  <div>
                    <span className="text-[#45627F] block text-[11px]">Issue Date</span>
                    <span className="font-semibold text-[#0B2F55]">{verifiedResult.issueDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5EDF6] flex items-center justify-between text-[11px] text-[#45627F]">
                  <span className="font-mono truncate max-w-[280px]">Hash: {verifiedResult.hash}</span>
                  <Link href="/verify" className="text-[#1769E0] font-bold hover:underline">
                    Detailed Proof View →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================
            SYSTEM PILLARS & ARCHITECTURE
            ======================================================== */}
        <section id="pillars" className="py-20 bg-white border-t border-[#CFE3FA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF4FF] px-3.5 py-1 rounded-full border border-[#CFE3FA]">
                System Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2F55] tracking-tight">
                Designed for Reliability &amp; Scalability
              </h2>
              <p className="text-sm sm:text-base text-[#45627F]">
                Built on open-standard digital public infrastructure specifications for state and national deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-[#E3EDF7] bg-[#F7FAFE] space-y-3 shadow-[0_4px_20px_rgba(15,60,100,0.05)] hover:shadow-[0_8px_28px_rgba(15,60,100,0.08)] hover:-translate-y-0.5 transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#EAF4FF] text-[#1769E0] border border-[#CFE3FA] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-[#0B2F55]">{p.title}</h3>
                    <p className="text-xs text-[#45627F] leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          OFFICIAL GOVERNMENT FOOTER (DARK NAVY #0B2F55)
          ======================================================== */}
      <footer className="bg-[#0B2F55] text-slate-300 text-xs pt-14 pb-8 border-t border-[#153F6B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Identity Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-extrabold text-sm">
                  ST
                </div>
                <div>
                  <span className="font-bold text-white text-base block leading-none">
                    Skill Track
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Longitudinal Skilling &amp; Impact System
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                An official digital public infrastructure platform for tracking skilling outcomes, employment retention, wage growth milestones, and tamper-proof credential verifications across India.
              </p>
              <div className="text-[11px] text-slate-400">
                <span>Under the aegis of the </span>
                <span className="text-slate-200 font-semibold">Government of India</span>
              </div>
            </div>

            {/* Quick Links Column */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
                Platform Modules
              </h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Candidate Cockpit
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Institutional Console
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Employer Talent Radar
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Government PMU Analytics
                  </Link>
                </li>
                <li>
                  <a href="#verify" className="hover:text-white transition-colors">
                    Verify Credential ID
                  </a>
                </li>
              </ul>
            </div>

            {/* Governance & Compliance */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
                Governance &amp; Trust
              </h4>
              <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>National Data Governance Framework</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Compliant with Digital Personal Data Protection (DPDP) Act standards, encrypted RBAC controls, and automated audit logging.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-4">
              <span>&copy; {new Date().getFullYear()} Skill Track. All Rights Reserved.</span>
              <span className="hidden sm:inline-block text-slate-600">|</span>
              <span className="text-slate-400">Government Digital Public Infrastructure</span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact &amp; Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
