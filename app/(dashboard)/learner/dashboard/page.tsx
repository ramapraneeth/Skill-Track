'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Target,
  GraduationCap,
  Award,
  BadgeCheck,
  Briefcase,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Layers,
  FileCheck,
  ChevronRight,
  Search,
  Zap,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  Sparkles,
  Compass,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { sidhStore, calculateProfileCompletion } from '@/lib/sidh-store';
import {
  resolveLearnerCareerContext,
  calculateMultiFactorMatch,
  categorizeJobsForLearner,
  getAllStreams,
  CareerProfileDef,
  StreamDef,
} from '@/lib/career-registry';
import AICareerDiscoveryModal from '@/components/AICareerDiscoveryModal';

export default function LearnerDashboardPage() {
  const [learner, setLearner] = useState(() => sidhStore.getLearner());
  const [isDiscoveryOpen, setIsDiscoveryOpen] = useState(false);

  useEffect(() => {
    // Sync with localStorage user if present
    try {
      const rawUser = localStorage.getItem('skilltrack_user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed.fullName || parsed.name || parsed.targetRole) {
          setLearner((prev) => ({
            ...prev,
            name: parsed.fullName || parsed.name || prev.name,
            targetRole: parsed.targetRole || prev.targetRole,
            branch: parsed.branch || prev.branch,
          }));
        }
      }
    } catch {}
  }, []);

  // Central Dynamic Career Resolution
  const { stream, career, isCustomStream } = resolveLearnerCareerContext(learner);
  const matchResult = calculateMultiFactorMatch(learner, career);
  const profileCompletion = calculateProfileCompletion(learner);
  const categorizedJobs = categorizeJobsForLearner(learner, career.jobRoles);

  // Dynamic Course and Progression
  const activeCourse = career.courses[0] || {
    id: 'crs-default',
    title: `${stream.name} Advanced Professional Specialization`,
    duration: '180 Hours',
    level: 'Advanced',
  };

  // Circular Gauge Calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius; // ~301.6
  const readinessPercent = matchResult.totalScore;
  const strokeDashoffset = circumference - (readinessPercent / 100) * circumference;

  const isProfileIncomplete = profileCompletion.total < 70 || !learner.targetRole;

  const missingSections: string[] = [];
  if (profileCompletion.basic < 80) missingSections.push('Basic Details');
  if (profileCompletion.academics < 80) missingSections.push('Academics');
  if (profileCompletion.skills < 80) missingSections.push('Skills');
  if (profileCompletion.certs < 50) missingSections.push('Certifications');
  if (profileCompletion.projects < 50) missingSections.push('Projects');

  const handleCareerAdopted = (newCareer: CareerProfileDef, newStream: StreamDef) => {
    setLearner(sidhStore.getLearner());
  };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* -------------------------------------------------------------
          0. EMPTY / NEW USER STATE & PROFILE COMPLETION BANNER
          ------------------------------------------------------------- */}
      {isProfileIncomplete && (
        <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/80 rounded-xl p-4 sm:p-5 shadow-2xs space-y-3 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                  Complete your profile to unlock personalized career recommendations
                </h3>
                <p className="text-xs text-amber-800/90 dark:text-amber-300/80 mt-0.5">
                  Your profile is currently <strong className="font-bold">{profileCompletion.total}% complete</strong>. Adding your academic stream, verified skills, and projects gives you accurate placement match scores.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/learner/profile"
                className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Complete Profile
              </Link>
            </div>
          </div>

          <div className="w-full bg-amber-200/60 dark:bg-amber-900/60 h-2 rounded-full overflow-hidden">
            <div
              className="bg-amber-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${profileCompletion.total}%` }}
            />
          </div>

          {missingSections.length > 0 && (
            <div className="text-[11px] text-amber-800 dark:text-amber-300/90 flex items-center gap-2 flex-wrap">
              <span className="font-semibold">Suggested additions:</span>
              {missingSections.map((sec) => (
                <span
                  key={sec}
                  className="px-2 py-0.5 rounded bg-white/80 dark:bg-slate-900/80 border border-amber-300 dark:border-amber-800 font-medium"
                >
                  + Add {sec}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------
          0.1 AI CAREER DISCOVERY CALLOUT (For undecided students)
          ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-xl p-4 sm:p-5 text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase tracking-wider">
                Multi-Stream Guidance
              </span>
              <span className="text-xs text-blue-200/80">
                Covers ECE, Civil, Commerce, Mechanical, Pharma, Agri, Hospitality & IT
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-1">
              Not sure what career path fits your degree?
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Answer 5 quick questions about your education, interests, and preferred work environment to find your top 3 matching career tracks.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsDiscoveryOpen(true)}
          className="px-4 py-2.5 rounded-lg bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold shrink-0 flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Launch AI Career Discovery</span>
        </button>
      </div>

      {/* -------------------------------------------------------------
          1. DASHBOARD HERO / WELCOME SECTION (Dynamic Stream Aligned)
          ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1D4ED8] dark:bg-blue-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              National Skill Qualification Framework • {career.nsqfLevel || 'Level 6'} • {stream.code}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
            Good morning, {learner.name}
          </h1>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium text-slate-800 dark:text-slate-200">{stream.name}</span>
            <span className="mx-2 text-slate-300 dark:text-slate-700">•</span>
            Target career: <strong className="text-[#1D4ED8] dark:text-blue-400 font-semibold">{career.title}</strong>
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
            Your career profile is <span className="font-semibold text-emerald-700 dark:text-emerald-400">{matchResult.totalScore}% ready</span> for industry placement ({matchResult.status}).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Link
            href="/learner/skill-gap"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white shadow-xs flex items-center gap-2 transition-all"
          >
            <Target className="w-3.5 h-3.5" />
            <span>View Skill Gap</span>
          </Link>
          <Link
            href="/learner/opportunities"
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-[#1D4ED8] hover:bg-slate-50 dark:hover:bg-slate-750 shadow-2xs flex items-center gap-2 transition-all"
          >
            <Search className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>View Jobs ({career.jobRoles.length})</span>
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. CAREER READINESS OVERVIEW (Transparent 7-Factor Model)
          ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span>Career Readiness Overview</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold">
                7-Factor Match Engine
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Multi-dimensional competency assessment benchmarked against national industry requirements for {career.title}
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
            NCVET / NSDC Validated
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-1">
          {/* Left: Prominent Career Readiness Score (5 cols) */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            {/* SVG Circular Progress */}
            <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-200 dark:text-slate-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  stroke="#1D4ED8"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight font-mono">
                  {matchResult.totalScore}%
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  {matchResult.status}
                </span>
              </div>
            </div>

            {/* Score Meta & Explanations */}
            <div className="space-y-1.5 w-full">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {career.streamCode} Stream Alignment
              </div>
              <div className="text-base font-extrabold text-[#0B192C] dark:text-white tracking-tight">
                {career.title}
              </div>

              {/* Transparent Explanations */}
              <div className="space-y-1 pt-1">
                {matchResult.explanations.positive.slice(0, 2).map((exp, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{exp}</span>
                  </div>
                ))}
                {matchResult.explanations.advisory.slice(0, 1).map((adv, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{adv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Metrics Hierarchy (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {/* Primary 3 Metric Blocks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Metric 1: Skill Gap */}
              <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Skill Gap
                  </span>
                  <Target className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
                </div>
                <div className="text-lg font-extrabold text-[#0B192C] dark:text-white font-mono">
                  {Math.max(0, 100 - matchResult.totalScore)}%
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">
                    {matchResult.factors.skillMatch.totalCount - matchResult.factors.skillMatch.matchedCount} skills to bridge
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">Active Roadmap</span>
                </div>
              </div>

              {/* Metric 2: Course Progress */}
              <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Enrolled Track
                  </span>
                  <GraduationCap className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
                </div>
                <div className="text-lg font-extrabold text-[#0B192C] dark:text-white">
                  {career.streamCode}
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">{career.courses.length} courses</span>
                  <span className="text-blue-700 dark:text-blue-400 font-medium">In Progress</span>
                </div>
              </div>

              {/* Metric 3: Placement Status */}
              <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Matching Jobs
                  </span>
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">
                  {categorizedJobs.recommendedNow.length}
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Recommended Now</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">Eligible</span>
                </div>
              </div>
            </div>

            {/* Secondary Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="px-3.5 py-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block leading-tight">
                      Certifications
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {learner.certifications.length} of {career.certifications.length} verified
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-900/60 px-2 py-0.5 rounded">
                  DigiLocker Linked
                </span>
              </div>

              <div className="px-3.5 py-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block leading-tight">
                      Career Sector
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px] block">
                      {career.sector}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-[#1D4ED8] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/60 dark:border-blue-900/60 px-2 py-0.5 rounded">
                  Demand: {career.marketDemand}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          3. YOUR CAREER PATH (Dynamic 4-Phase Progression Flow from Registry)
          ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
              {career.title} • Progression Roadmap
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Structured national skill qualification path aligned with {stream.name}
            </p>
          </div>
          <Link
            href="/learner/roadmap"
            className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View Full Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Step Progression Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {career.roadmap.slice(0, 4).map((phase, idx) => {
            const isCompleted = idx === 0;
            const isInProgress = idx === 1;

            return (
              <div
                key={phase.phaseNumber}
                className={`p-4 rounded-lg border flex flex-col justify-between space-y-3 relative group transition-all ${
                  isCompleted
                    ? 'border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
                    : isInProgress
                    ? 'border-2 border-[#1D4ED8] dark:border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isCompleted
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : isInProgress
                          ? 'text-[#1D4ED8] dark:text-blue-400'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      0{phase.phaseNumber}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    )}
                    {isInProgress && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1D4ED8] dark:text-blue-300 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse" />
                        In Progress
                      </span>
                    )}
                    {!isCompleted && !isInProgress && (
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                        {idx === 2 ? 'Next Up' : 'Upcoming'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : isInProgress ? (
                      <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400 shrink-0" />
                    ) : (
                      <Layers className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                    )}
                    <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {phase.phaseTitle}
                    </h3>
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {phase.deliverable}
                  </p>

                  <div className="text-[10px] text-slate-400 font-mono">
                    Duration: {phase.duration}
                  </div>
                </div>

                <Link
                  href={isInProgress ? '/learner/courses' : '/learner/roadmap'}
                  className={`w-full text-center py-1.5 px-3 rounded-md text-xs font-semibold transition-colors ${
                    isInProgress
                      ? 'bg-[#1D4ED8] text-white hover:bg-[#1E40AF] shadow-2xs'
                      : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                  }`}
                >
                  {isCompleted ? 'Review' : isInProgress ? 'Continue Learning' : 'View Module'}
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------------------
          4. SKILL GAP ANALYSIS & PLACEMENT READINESS (Dynamic 2-Column Grid)
          ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Skill Gap Analysis (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
                Skill Gap Analysis
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Target role: <strong className="text-slate-800 dark:text-slate-200">{career.title}</strong>
              </p>
            </div>
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 px-2.5 py-1 rounded-md">
              {matchResult.factors.skillMatch.totalCount - matchResult.factors.skillMatch.matchedCount} skills need attention
            </span>
          </div>

          {/* Required Skills Progress Bars */}
          <div className="space-y-3.5 pt-1">
            {matchResult.skillBreakdown.slice(0, 5).map((item) => (
              <div key={item.skill} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {item.skill}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                        item.status === 'Mastered'
                          ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60'
                          : item.status === 'Medium Gap'
                          ? 'text-[#1D4ED8] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60'
                          : 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60'
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                      {item.currentPercentage}%
                    </span>
                    <span className="text-[10px] text-slate-400">/ Req: {item.requiredPercentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.status === 'Mastered'
                        ? 'bg-emerald-600'
                        : item.status === 'Medium Gap'
                        ? 'bg-[#1D4ED8]'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${item.currentPercentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Classification Legend & Action */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" /> Mastered (&ge;80%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" /> In Progress (60-79%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Critical Gap (&lt;60%)
              </span>
            </div>

            <Link
              href="/learner/skill-gap"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>View Full Skill Gap Matrix</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Right: Placement Readiness (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
                Placement Readiness
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Multi-Factor Evaluation for {stream.code}
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 px-2.5 py-1 rounded-md">
              {matchResult.status.toUpperCase()}
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Profile completeness</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{profileCompletion.total}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${profileCompletion.total}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Required domain skills</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {Math.round((matchResult.factors.skillMatch.score / matchResult.factors.skillMatch.max) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${(matchResult.factors.skillMatch.score / matchResult.factors.skillMatch.max) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Certifications alignment</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {Math.round((matchResult.factors.certificationMatch.score / matchResult.factors.certificationMatch.max) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1D4ED8] h-full rounded-full"
                  style={{ width: `${(matchResult.factors.certificationMatch.score / matchResult.factors.certificationMatch.max) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Industry project portfolio</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {learner.projects.length > 0 ? '80%' : '30%'}
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: learner.projects.length > 0 ? '80%' : '30%' }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Job market demand</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {Math.round((matchResult.factors.jobMarketMatch.score / matchResult.factors.jobMarketMatch.max) * 100)}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1D4ED8] h-full rounded-full"
                  style={{ width: `${(matchResult.factors.jobMarketMatch.score / matchResult.factors.jobMarketMatch.max) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/learner/progress"
              className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Detailed Placement Analytics</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          5. RECOMMENDED FOR YOU SECTION (Stream-Accurate Cards)
          ------------------------------------------------------------- */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
              Recommended For You ({stream.code})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Curated course, project, and placement opportunities matching {career.title}
            </p>
          </div>
          <span className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400">
            {stream.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Recommended Course */}
          {career.courses[0] && (
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] dark:text-blue-400 block">
                  Recommended Course
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                  {career.courses[0].title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  NSQF Level {career.courses[0].nsqfLevel} • {career.courses[0].duration} • {career.courses[0].provider}
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  <TrendingUp className="w-3 h-3" />
                  <span>Bridges {career.courses[0].skills.slice(0, 2).join(', ')}</span>
                </div>
              </div>
              <Link
                href="/learner/courses"
                className="w-full text-center py-2 px-3 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors shadow-2xs"
              >
                View Course
              </Link>
            </div>
          )}

          {/* Card 2: Recommended Project */}
          {career.projects[0] && (
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] dark:text-blue-400 block">
                  Recommended Project
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                  {career.projects[0].title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {career.projects[0].technologiesUsed.slice(0, 3).join(' • ')}
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                  <Layers className="w-3 h-3" />
                  <span>Build portfolio evidence</span>
                </div>
              </div>
              <Link
                href="/learner/profile?tab=projects"
                className="w-full text-center py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                Add Project Evidence
              </Link>
            </div>
          )}

          {/* Card 3: Recommended Job */}
          {career.jobRoles[0] && (
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] dark:text-blue-400 block">
                  Recommended Opportunity
                </span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug line-clamp-2">
                  {career.jobRoles[0].title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {career.jobRoles[0].company} • {career.jobRoles[0].location}
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                  <BadgeCheck className="w-3 h-3" />
                  <span>Package: {career.jobRoles[0].salaryRange}</span>
                </div>
              </div>
              <Link
                href="/learner/opportunities"
                className="w-full text-center py-2 px-3 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors shadow-2xs"
              >
                View Job Details
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------
          6. ENROLLED COURSE SNAPSHOT & RECENT ACTIVITY (2-Column Grid)
          ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Enrolled Course (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                Active Enrolled Track
              </span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-1">
                {activeCourse.title}
              </h3>
            </div>
            <Link
              href="/learner/my-learning"
              className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline"
            >
              Resume Learning →
            </Link>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Curriculum & Practical Progression</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">74% (138 of 180 Hrs)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-[#1D4ED8] h-full rounded-full transition-all duration-500" style={{ width: '74%' }} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1 text-center text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">AEBAS Attendance</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mt-0.5 block">94.2%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Domain Score</span>
              <span className="font-bold text-[#1D4ED8] dark:text-blue-400 text-sm mt-0.5 block">86.5%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Stream</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">{stream.code}</span>
            </div>
          </div>
        </div>

        {/* Right: Recent Activity (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
              Recent Activity
            </h2>
            <Link
              href="/learner/progress"
              className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-3 pt-1">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  Verified Skill: {career.requiredSkills[0]?.skill || 'Core Domain'}
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  Today
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#1D4ED8] dark:text-blue-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  Advanced {career.courses[0]?.title ? career.courses[0].title.slice(0, 24) + '...' : 'Specialization'}
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  Yesterday
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  Certification verified: {career.certifications[0]?.title ? career.certifications[0].title.slice(0, 26) + '...' : 'NSQF Level'}
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  3 days ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Discovery Modal */}
      <AICareerDiscoveryModal
        isOpen={isDiscoveryOpen}
        onClose={() => setIsDiscoveryOpen(false)}
        onCareerAdopted={handleCareerAdopted}
      />
    </div>
  );
}
