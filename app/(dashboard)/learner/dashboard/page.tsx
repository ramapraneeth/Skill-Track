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
} from 'lucide-react';
import { sidhStore } from '@/lib/sidh-store';

export default function LearnerDashboardPage() {
  const [learner, setLearner] = useState(() => sidhStore.getLearner());
  const courses = sidhStore.getCourses();
  const activeCourse = courses[0] || {
    id: 'crs-001',
    title: 'Full Stack Web Development & React Architecture',
    hours: 200,
  };

  useEffect(() => {
    // Check if user session has custom name or details in localStorage
    try {
      const rawUser = localStorage.getItem('skilltrack_user');
      if (rawUser) {
        const parsed = JSON.parse(rawUser);
        if (parsed.fullName || parsed.name) {
          setLearner((prev) => ({
            ...prev,
            name: parsed.fullName || parsed.name || prev.name,
            targetRole: parsed.targetRole || prev.targetRole,
          }));
        }
      }
    } catch {}
  }, []);

  // Circular Gauge Calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius; // ~301.6
  const readinessPercent = 84;
  const strokeDashoffset = circumference - (readinessPercent / 100) * circumference;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* -------------------------------------------------------------
          1. DASHBOARD HERO / WELCOME SECTION
          ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-5 transition-colors">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1D4ED8] dark:bg-blue-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              National Skill Qualification Framework • Level 5
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
            Good morning, {learner.name}
          </h1>

          <p className="text-xs text-slate-600 dark:text-slate-400">
            <span className="font-medium text-slate-800 dark:text-slate-200">{activeCourse.title}</span>
            <span className="mx-2 text-slate-300 dark:text-slate-700">•</span>
            Target role: <strong className="text-[#1D4ED8] dark:text-blue-400 font-semibold">{learner.targetRole || 'Junior Python Developer'}</strong>
          </p>

          <p className="text-xs text-slate-500 dark:text-slate-400 pt-0.5">
            Your career profile is <span className="font-semibold text-emerald-700 dark:text-emerald-400">84% ready</span> for your target role.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
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
            <span>View Jobs (45)</span>
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. CAREER READINESS OVERVIEW (Replaces 6 equal cards)
          ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
              Career Readiness Overview
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Multi-dimensional competency assessment benchmarked against national industry requirements
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/60">
            <ShieldCheck className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
            NCVET Validated
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-1">
          {/* Left: Prominent Career Readiness Score (5 cols) */}
          <div className="lg:col-span-5 flex items-center gap-6 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
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
                <span className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight">
                  84%
                </span>
                <span className="text-[9px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  Ready
                </span>
              </div>
            </div>

            {/* Score Meta */}
            <div className="space-y-1.5">
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Career Readiness
              </div>
              <div className="text-xl font-extrabold text-[#0B192C] dark:text-white tracking-tight">
                84%
              </div>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-900/60 px-2 py-0.5 rounded">
                <TrendingUp className="w-3 h-3" />
                <span>+6% this month</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                Competency composite • 18 verified skills
              </p>
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
                <div className="text-lg font-extrabold text-[#0B192C] dark:text-white">
                  16%
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">3 skills missing</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">-8% reduction</span>
                </div>
              </div>

              {/* Metric 2: Course Progress */}
              <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Course Progress
                  </span>
                  <GraduationCap className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
                </div>
                <div className="text-lg font-extrabold text-[#0B192C] dark:text-white">
                  71%
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">142 / 200 hours</span>
                  <span className="text-blue-700 dark:text-blue-400 font-medium">On schedule</span>
                </div>
              </div>

              {/* Metric 3: Placement Status */}
              <div className="p-3.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Placement Status
                  </span>
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400">
                  Ready
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400">Stage 9 of 11</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-medium">Interview ready</span>
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
                      2 / 3 NSQF Level 5 & 6
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-900/60 px-2 py-0.5 rounded">
                  DigiLocker Linked
                </span>
              </div>

              <div className="px-3.5 py-2.5 rounded-lg bg-slate-50/70 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block leading-tight">
                      Applications
                    </span>
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      1 Active • TCS Associate
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/60 dark:border-amber-900/60 px-2 py-0.5 rounded">
                  Interview Scheduled
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          3. YOUR CAREER PATH (Replaces huge dark AI progression engine)
          ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
              Your Career Path
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Recommended actions based on your skills, learning progress and target role
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
          {/* Step 01: Complete SQL Assessment (Completed) */}
          <div className="p-4 rounded-lg border border-emerald-200/80 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10 flex flex-col justify-between space-y-3 relative group transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                  01
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900">
                  <CheckCircle2 className="w-3 h-3" />
                  Completed
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-snug">
                  Complete SQL Assessment
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Verify relational query competency to unlock Level 6 placement pool.
              </p>
            </div>
            <Link
              href="/learner/skill-gap"
              className="w-full text-center py-1.5 px-3 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-emerald-500 hover:text-emerald-700 transition-colors"
            >
              View Result
            </Link>
          </div>

          {/* Step 02: Learn Advanced Next.js & REST APIs (In Progress) */}
          <div className="p-4 rounded-lg border-2 border-[#1D4ED8] dark:border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 flex flex-col justify-between space-y-3 relative group transition-all shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#1D4ED8] dark:text-blue-400">
                  02
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#1D4ED8] dark:text-blue-300 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse" />
                  In Progress
                </span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400 shrink-0" />
                <h3 className="text-xs font-bold text-[#0B192C] dark:text-white leading-snug">
                  Learn Advanced Next.js & REST APIs
                </h3>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Bridge remaining high-priority API design, microservices, and routing gap.
              </p>
            </div>
            <Link
              href="/learner/courses"
              className="w-full text-center py-1.5 px-3 rounded-md bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors shadow-2xs"
            >
              Continue Learning
            </Link>
          </div>

          {/* Step 03: Build Telemedicine Capstone Project (Upcoming) */}
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col justify-between space-y-3 relative group transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                  03
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  Next Up
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  Build Telemedicine Capstone Project
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Demonstrate full-stack database schema implementation for verified portfolio.
              </p>
            </div>
            <Link
              href="/learner/profile"
              className="w-full text-center py-1.5 px-3 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-slate-400 transition-colors"
            >
              View Details
            </Link>
          </div>

          {/* Step 04: Apply for Junior Developer Roles (Upcoming) */}
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col justify-between space-y-3 relative group transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                  04
                </span>
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  Ready to Apply
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                  Apply for Junior Developer Roles
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Your profile matches 94% of criteria across 45 verified openings.
              </p>
            </div>
            <Link
              href="/learner/opportunities"
              className="w-full text-center py-1.5 px-3 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:border-slate-400 transition-colors"
            >
              Explore Jobs
            </Link>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          4. SKILL GAP ANALYSIS & PLACEMENT READINESS (2-Column Grid)
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
                Target role: <strong className="text-slate-800 dark:text-slate-200">Junior Python Developer</strong>
              </p>
            </div>
            <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 px-2.5 py-1 rounded-md">
              3 skills need improvement
            </span>
          </div>

          {/* Required Skills Progress Bars */}
          <div className="space-y-3.5 pt-1">
            {/* Skill 1: Python */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Python</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                    Strong
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">92%</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: '92%' }} />
              </div>
            </div>

            {/* Skill 2: Git & Version Control */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">Git</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded">
                    Strong
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">82%</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full transition-all duration-500" style={{ width: '82%' }} />
              </div>
            </div>

            {/* Skill 3: SQL */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">SQL</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#1D4ED8] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.2 rounded">
                    Developing
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">74%</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#1D4ED8] h-full rounded-full transition-all duration-500" style={{ width: '74%' }} />
              </div>
            </div>

            {/* Skill 4: React */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">React</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-[#1D4ED8] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.2 rounded">
                    Developing
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">68%</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-[#1D4ED8] h-full rounded-full transition-all duration-500" style={{ width: '68%' }} />
              </div>
            </div>

            {/* Skill 5: REST APIs */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-800 dark:text-slate-200">REST APIs</span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.2 rounded">
                    Developing
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">61%</span>
                </div>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: '61%' }} />
              </div>
            </div>
          </div>

          {/* Classification Legend & Action */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600" /> Strong (&ge;80%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8]" /> Developing (60-79%)
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Missing (&lt;60%)
              </span>
            </div>

            <Link
              href="/learner/skill-gap"
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
            >
              <span>View Skill Gap</span>
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
                Evaluation against national industry standards
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 px-2.5 py-1 rounded-md">
              READY FOR APPLICATIONS
            </span>
          </div>

          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Profile completeness</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">92%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Required skills</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">84%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Certifications</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">67%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#1D4ED8] h-full rounded-full" style={{ width: '67%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Projects</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">80%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">Interview readiness</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">76%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#1D4ED8] h-full rounded-full" style={{ width: '76%' }} />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/learner/progress"
              className="w-full py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>View Placement Insights</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          5. RECOMMENDED FOR YOU SECTION (3 Compact Actionable Cards)
          ------------------------------------------------------------- */}
      <div className="space-y-3">
        <div>
          <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
            Recommended For You
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Curated learning, project, and career opportunities tailored to your skill progression
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Recommended Course */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] dark:text-blue-400 block">
                Recommended Course
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                Advanced REST API Development
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                NSQF Level 6 • 40 Hours • NSTI Certified
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                <TrendingUp className="w-3 h-3" />
                <span>+18% role readiness</span>
              </div>
            </div>
            <Link
              href="/learner/courses"
              className="w-full text-center py-2 px-3 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors shadow-2xs"
            >
              View Course
            </Link>
          </div>

          {/* Card 2: Recommended Project */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] dark:text-blue-400 block">
                Recommended Project
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                Telemedicine Platform
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Full-Stack Architecture • Postgres & Node.js
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                <Layers className="w-3 h-3" />
                <span>Build portfolio evidence</span>
              </div>
            </div>
            <Link
              href="/learner/profile"
              className="w-full text-center py-2 px-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Add Project
            </Link>
          </div>

          {/* Card 3: Recommended Job */}
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] dark:text-blue-400 block">
                Recommended Job
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                Junior Python Developer
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Tata Consultancy Services • Hyderabad / Hybrid
              </p>
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                <BadgeCheck className="w-3 h-3" />
                <span>94% profile match</span>
              </div>
            </div>
            <Link
              href="/learner/opportunities"
              className="w-full text-center py-2 px-3 rounded-lg bg-[#1D4ED8] text-white text-xs font-semibold hover:bg-[#1E40AF] transition-colors shadow-2xs"
            >
              View Job
            </Link>
          </div>
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
                Active Enrolled Course
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
              <span>Classroom & Lab Progression</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">71% (142 of 200 Hrs)</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-[#1D4ED8] h-full rounded-full transition-all duration-500" style={{ width: '71%' }} />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1 text-center text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">AEBAS Attendance</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mt-0.5 block">92.4%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Mid-Term Score</span>
              <span className="font-bold text-[#1D4ED8] dark:text-blue-400 text-sm mt-0.5 block">84.0%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Batch Strength</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">28 Candidates</span>
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
            {/* Activity 1 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  Completed Python Assessment
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  2 hours ago
                </span>
              </div>
            </div>

            {/* Activity 2 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-[#1D4ED8] dark:text-blue-400 flex items-center justify-center shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  Completed React Module 4
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  Yesterday
                </span>
              </div>
            </div>

            {/* Activity 3 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  Certificate added (NSQF Level 5)
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  2 days ago
                </span>
              </div>
            </div>

            {/* Activity 4 */}
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-md bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-tight">
                  Applied for TCS Associate Role
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
    </div>
  );
}
