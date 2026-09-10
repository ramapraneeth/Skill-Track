'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Compass,
} from 'lucide-react';

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <div className="min-h-screen flex flex-col bg-[#F5F9FD] text-[#0B2D4F]">
      {/* Subtle National Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#F59E0B]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#16A34A]" />
      </div>

      {/* Official Government Header */}
      <header className="sticky top-0 z-50 w-full bg-white border-b border-[#E5EDF5] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
          {/* Left: Government of India & Skill Track Brand Identity */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Official Government Mark */}
            <div className="flex items-center gap-3">
              <div className="flex flex-col border-r border-[#CBDDF6] pr-4 sm:pr-6">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-[#0B2D4F] uppercase leading-tight">
                  Government of India
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#4B6380] font-medium leading-tight">
                  Ministry of Skill Development &amp; Entrepreneurship
                </span>
              </div>
            </div>

            {/* Platform Brand */}
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-black text-sm shadow-xs border border-blue-600">
                ST
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[#0B2D4F] text-base tracking-tight leading-none">
                  Skill Track
                </span>
                <span className="text-[10px] text-[#4B6380] font-medium mt-0.5">
                  Longitudinal Skilling &amp; Impact System
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-[#4B6380]">
            <Link href="/" className="text-[#1769E0] font-bold transition-colors">
              Home
            </Link>
            <a href="#about" className="hover:text-[#0B2D4F] transition-colors">
              About
            </a>
            <a href="#portals" className="hover:text-[#0B2D4F] transition-colors">
              Institutions
            </a>
            <a href="#features" className="hover:text-[#0B2D4F] transition-colors">
              Features
            </a>
            <a href="#verify" className="hover:text-[#0B2D4F] transition-colors">
              Verify Credentials
            </a>
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/login"
              className="h-10 px-4 rounded-lg bg-white border border-[#CBDDF6] hover:bg-[#F5F9FD] text-[#0B2D4F] font-semibold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-[#1769E0]" />
              <span>Sign In</span>
            </Link>
            <Link
              href="/register"
              className="h-10 px-4.5 rounded-lg bg-[#1769E0] hover:bg-[#1E6FF2] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Register Candidate</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0B2D4F] hover:bg-[#F0F5FA] border border-[#E5EDF5]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#E5EDF5] px-4 pt-3 pb-5 space-y-3">
            <div className="flex flex-col space-y-2 text-sm font-semibold text-[#0B2D4F]">
              <Link href="/" className="py-2 text-[#1769E0]" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <a href="#about" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                About
              </a>
              <a href="#portals" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                Institutions
              </a>
              <a href="#features" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#verify" className="py-2" onClick={() => setMobileMenuOpen(false)}>
                Verify Credentials
              </a>
            </div>
            <div className="pt-3 border-t border-[#E5EDF5] flex flex-col gap-2">
              <Link
                href="/login"
                className="w-full h-10 rounded-lg border border-[#CBDDF6] text-[#0B2D4F] font-semibold text-xs flex items-center justify-center gap-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Lock className="w-3.5 h-3.5 text-[#1769E0]" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/register"
                className="w-full h-10 rounded-lg bg-[#1769E0] text-white font-bold text-xs flex items-center justify-center gap-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Register Candidate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ========================================================
            HERO SECTION (TWO-COLUMN, LIGHT, REFINED GOVERNMENT DPI)
            ======================================================== */}
        <section className="relative bg-gradient-to-b from-white via-[#F5F9FD] to-[#EAF4FF]/40 pt-12 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-[#E4EDF7]">
          {/* Subtle Layered Watermark Background Elements (5-12% opacity) */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
            {/* Ashoka Chakra Motif Watermark */}
            <svg
              className="absolute -top-12 -right-12 w-96 h-96 sm:w-[540px] sm:h-[540px] text-[#1769E0]/[0.05]"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.75"
            >
              <circle cx="50" cy="50" r="46" strokeWidth="1" />
              <circle cx="50" cy="50" r="41" strokeDasharray="1 1.5" />
              <circle cx="50" cy="50" r="10" strokeWidth="1.2" />
              <circle cx="50" cy="50" r="3" fill="currentColor" />
              {Array.from({ length: 24 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="9"
                  transform={`rotate(${i * 15} 50 50)`}
                  strokeWidth="0.8"
                />
              ))}
            </svg>

            {/* Subtle Indian Civic Architectural Skyline Silhouettes at bottom */}
            <svg
              className="absolute bottom-0 left-0 right-0 w-full h-24 sm:h-32 text-[#12345B]/[0.035]"
              preserveAspectRatio="none"
              viewBox="0 0 1200 120"
              fill="currentColor"
            >
              {/* Civic Domes, Pillars, India Gate style arch outline */}
              <path d="M0,120 L0,90 L60,90 L60,70 L80,70 L90,50 L100,50 L110,70 L130,70 L130,90 L220,90 L220,60 L240,40 L260,40 L280,60 L280,90 L380,90 L380,30 L400,30 L410,15 L430,15 L440,30 L460,30 L460,90 L560,90 L570,75 L600,75 L610,90 L700,90 L700,45 L730,45 L740,20 L760,20 L770,45 L800,45 L800,90 L900,90 L920,65 L940,65 L960,90 L1040,90 L1040,55 L1060,35 L1080,35 L1100,55 L1100,90 L1200,90 L1200,120 Z" />
            </svg>

            {/* Faint Soft Geometric Grid & Telemetry Lines */}
            <div className="absolute inset-0 bg-[radial-gradient(#1769E0_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.03]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* LEFT COLUMN: Confident Official Typography & Controls */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
                {/* Official Platform Identifier Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#CBDDF6] text-[#1769E0] text-xs font-semibold shadow-xs">
                  <Shield className="w-3.5 h-3.5 text-[#1769E0]" />
                  <span>National Longitudinal Skilling &amp; Outcome Telemetry Platform</span>
                </div>

                {/* Main Two-Level Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold tracking-tight text-[#0B2D4F] leading-[1.08]">
                  Measuring Real Skilling Outcomes,{' '}
                  <span className="block text-[#1769E0]">
                    Not Just Enrolments
                  </span>
                </h1>

                {/* Hero Description */}
                <p className="text-base sm:text-lg text-[#4B6380] max-w-[600px] leading-relaxed font-normal">
                  Skill Track bridges education, industry vacancies, and career progression with explainable AI diagnostics, wage-retention tracking, and verifiable accreditation audits.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <Link
                    href="/login"
                    className="h-12 px-6 rounded-lg bg-[#1769E0] hover:bg-[#1E6FF2] text-white font-bold text-sm inline-flex items-center gap-2 shadow-sm transition-all"
                  >
                    <span>Access Authorized Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/register"
                    className="h-12 px-6 rounded-lg bg-white hover:bg-[#F5F9FD] text-[#0B2D4F] border border-[#CBDDF6] font-bold text-sm inline-flex items-center gap-2 transition-all shadow-2xs"
                  >
                    <span>Candidate Registration</span>
                  </Link>
                </div>

                {/* Understated Trust Indicators with Thin Vertical Separators */}
                <div className="pt-5 border-t border-[#E4EDF7] flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#4B6380] font-semibold">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1769E0]" />
                    <span>Transparent</span>
                  </div>
                  <span className="hidden sm:inline-block w-px h-4 bg-[#CBDDF6]" />
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#1769E0]" />
                    <span>Data Driven</span>
                  </div>
                  <span className="hidden sm:inline-block w-px h-4 bg-[#CBDDF6]" />
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#1769E0]" />
                    <span>Inclusive</span>
                  </div>
                  <span className="hidden sm:inline-block w-px h-4 bg-[#CBDDF6]" />
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#1769E0]" />
                    <span>Future Ready</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Confident Human Visual + Sector Telemetry Cards */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                {/* Soft glowing ambient circular background */}
                <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#EAF4FF] blur-2xl -z-10" />

                <div className="relative w-full max-w-[430px]">
                  {/* Primary Human-Centered Photography Card */}
                  <div className="relative rounded-2xl overflow-hidden bg-white border border-[#E4EDF7] shadow-lg p-2">
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100">
                      <Image
                        src="/hero-professional.jpg"
                        alt="Indian working professional holding tablet in a modern digital center"
                        width={600}
                        height={600}
                        priority
                        className="w-full h-full object-cover object-center"
                      />
                      {/* Subtle gradient vignette at base */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B2D4F]/30 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-xs rounded-lg p-2.5 border border-[#E4EDF7] shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                          <span className="text-xs font-bold text-[#0B2D4F]">Live National Telemetry</span>
                        </div>
                        <span className="text-[10px] font-semibold text-[#1769E0] bg-[#EAF4FF] px-2 py-0.5 rounded">
                          Active Monitoring
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Micro-Card 1: NSQF Credential Milestone Proof (Top-Left / Top-Right) */}
                  <div className="absolute -top-4 -left-4 sm:-left-6 bg-white border border-[#E4EDF7] rounded-xl p-3 shadow-md hidden sm:flex items-center gap-3 animate-fade-in">
                    <div className="w-9 h-9 rounded-lg bg-[#EAF4FF] text-[#1769E0] flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-[#0B2D4F]">NSQF Level 6</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      </div>
                      <p className="text-[10px] text-[#4B6380]">Cryptographically Verified</p>
                    </div>
                  </div>

                  {/* Floating Micro-Card 2: Longitudinal Wage & Retention (Bottom-Right) */}
                  <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-white border border-[#E4EDF7] rounded-xl p-3 shadow-md hidden sm:flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E8F2FF] text-[#1769E0] flex items-center justify-center shrink-0">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0B2D4F]">180-Day Retention: 91.2%</span>
                      <p className="text-[10px] text-[#4B6380]">Monitored Formal Wage Progression</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================
            NATIONAL TELEMETRY STRIP (EVIDENCE IN NUMBERS)
            ======================================================== */}
        <section className="py-8 bg-white border-b border-[#E4EDF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#E4EDF7]">
              {nationalMetrics.map((item, idx) => (
                <div key={idx} className={`pt-4 md:pt-0 ${idx > 0 ? 'md:pl-6' : ''}`}>
                  <div className="text-2xl sm:text-3xl font-black text-[#0B2D4F] tracking-tight tabular-nums">
                    {item.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#1769E0] mt-0.5">
                    {item.label}
                  </div>
                  <div className="text-[11px] text-[#4B6380] mt-0.5">
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
            <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF4FF] px-3 py-1 rounded-full border border-[#CBDDF6]">
              Platform Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2D4F] tracking-tight">
              A Smarter Way to Track Skills, Careers and Impact
            </h2>
            <p className="text-sm sm:text-base text-[#4B6380] leading-relaxed">
              Our platform brings together technology, data, and governance to ensure that every skilling effort creates measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featureCards.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <div
                  key={index}
                  className="bg-white border border-[#E4EDF7] rounded-xl p-6 sm:p-7 gov-card-shadow gov-elevate flex flex-col justify-between"
                >
                  <div className="space-y-3.5">
                    <div className="w-11 h-11 rounded-lg bg-[#EAF4FF] text-[#1769E0] flex items-center justify-center border border-[#D0E2FF]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0B2D4F]">
                      {index + 1}. {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4B6380] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                  <div className="pt-5 mt-4 border-t border-[#F0F5FA] flex items-center text-xs font-semibold text-[#1769E0]">
                    <span>Learn standard specifications</span>
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
        <section id="portals" className="py-20 bg-gradient-to-b from-[#F5F9FD] to-white border-y border-[#E4EDF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF4FF] px-3 py-1 rounded-full border border-[#CBDDF6]">
                Role-Based Operational Interfaces
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2D4F] tracking-tight">
                Three Specialized Operational Interfaces
              </h2>
              <p className="text-sm sm:text-base text-[#4B6380]">
                Choose your role to continue — each portal provides strict data isolation, tailored telemetry, and statutory workflows.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {portalCards.map((portal) => {
                const Icon = portal.icon;
                return (
                  <div
                    key={portal.title}
                    className="bg-white border border-[#E4EDF7] rounded-xl p-6 gov-card-shadow gov-elevate flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-lg bg-[#EAF4FF] text-[#1769E0] border border-[#D0E2FF] flex items-center justify-center">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F0F5FA] text-[#0B2D4F] border border-[#E4EDF7]">
                          {portal.role.split('/')[0]}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-[#0B2D4F]">{portal.title}</h3>
                        <p className="text-xs text-[#4B6380] mt-1.5 leading-relaxed">
                          {portal.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-3 border-t border-[#E4EDF7]">
                        {portal.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#0B2D4F]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 mt-4">
                      <Link
                        href={portal.href}
                        className="w-full h-10 rounded-lg bg-[#1769E0] hover:bg-[#1E6FF2] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
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
          <div className="bg-white border border-[#E4EDF7] rounded-2xl p-6 sm:p-10 gov-card-shadow">
            <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Statutory Verification
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D4F]">
                Verify Skills. Trust Credentials.
              </h2>
              <p className="text-xs sm:text-sm text-[#4B6380]">
                Enter any candidate credential ID or scan cryptographic hashes to verify authentic certification and NSQF-level authenticity.
              </p>

              {/* Verification Search Bar */}
              <form onSubmit={handleVerifySearch} className="flex flex-col sm:flex-row gap-3 pt-3 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#4B6380] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter Credential ID (e.g. ST-2026-IND-8849)"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#CBDDF6] text-xs sm:text-sm text-[#0B2D4F] placeholder-[#4B6380]/60 focus:outline-none focus:border-[#1769E0]"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 px-6 rounded-lg bg-[#1769E0] hover:bg-[#1E6FF2] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential</span>
                </button>
              </form>
            </div>

            {/* Live Verification Result Surface */}
            {verifiedResult && (
              <div className="max-w-2xl mx-auto bg-[#F7FAFE] border border-[#CBDDF6] rounded-xl p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4EDF7] pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#0B2D4F]">
                        {verifiedResult.status}
                      </span>
                      <span className="text-[11px] text-[#4B6380] block font-mono">
                        ID: {verifiedResult.credentialId}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#16A34A] bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    Tamper-Proof Proof
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-[#4B6380] block text-[11px]">Candidate Name</span>
                    <span className="font-bold text-[#0B2D4F] text-sm">{verifiedResult.candidateName}</span>
                  </div>
                  <div>
                    <span className="text-[#4B6380] block text-[11px]">Skill &amp; Standard</span>
                    <span className="font-bold text-[#0B2D4F]">{verifiedResult.skill} ({verifiedResult.nsqfLevel})</span>
                  </div>
                  <div>
                    <span className="text-[#4B6380] block text-[11px]">Accredited Institution</span>
                    <span className="font-semibold text-[#0B2D4F]">{verifiedResult.institution}</span>
                  </div>
                  <div>
                    <span className="text-[#4B6380] block text-[11px]">Issue Date</span>
                    <span className="font-semibold text-[#0B2D4F]">{verifiedResult.issueDate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E4EDF7] flex items-center justify-between text-[11px] text-[#4B6380]">
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
        <section id="pillars" className="py-20 bg-white border-t border-[#E4EDF7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1769E0] bg-[#EAF4FF] px-3 py-1 rounded-full border border-[#CBDDF6]">
                System Pillars
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2D4F] tracking-tight">
                Designed for Reliability &amp; Scalability
              </h2>
              <p className="text-sm sm:text-base text-[#4B6380]">
                Built on open-standard digital public infrastructure specifications for state and national deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformPillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-[#E4EDF7] bg-[#F7FAFE] space-y-3 gov-card-shadow gov-elevate"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#EAF4FF] text-[#1769E0] border border-[#CBDDF6] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-[#0B2D4F]">{p.title}</h3>
                    <p className="text-xs text-[#4B6380] leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================
          OFFICIAL GOVERNMENT FOOTER (DARK NAVY #0B2D4F)
          ======================================================== */}
      <footer className="bg-[#0B2D4F] text-slate-300 text-xs pt-14 pb-8 border-t border-[#12345B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Identity Column */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-black text-sm">
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
  );
}
