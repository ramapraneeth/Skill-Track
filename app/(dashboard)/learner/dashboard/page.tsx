'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AINextBestAction } from '@/components/ui/AINextBestAction';
import { EmploymentJourneyTimeline } from '@/components/ui/EmploymentJourneyTimeline';
import { sidhStore } from '@/lib/sidh-store';

export default function StudentDashboardPage() {
  const learner = sidhStore.getLearner();
  const courses = sidhStore.getCourses();
  const activeCourse = (courses && courses.length > 0) ? courses[0] : { title: 'Advanced Machine Learning & Data Systems' };

  return (
    <div className="space-y-6">
      {/* Student Morning Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">👋</span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#0B192C] dark:text-white tracking-tight">
              Good morning, {learner.name}
            </h1>
          </div>
          <p className="text-xs text-[#486581] dark:text-slate-400 mt-1 font-normal">
            Enrolled in <strong className="text-slate-800 dark:text-slate-200">{activeCourse.title}</strong> • Target Career Role: <strong className="text-[#2857D9] dark:text-blue-400">{learner.targetRole}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/learner/skill-gap"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white shadow-xs flex items-center gap-2 transition-all duration-150 hover:-translate-y-0.5"
          >
            <span>⚡</span>
            <span>View AI Skill Gap</span>
          </Link>
          <Link
            href="/learner/opportunities"
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-[#CBD5E1] bg-white dark:bg-slate-800 text-[#0B192C] dark:text-slate-200 hover:border-[#2857D9] hover:bg-slate-50 shadow-2xs transition-all duration-150"
          >
            <span>💼</span>
            <span>View Jobs (45)</span>
          </Link>
        </div>
      </div>

      {/* Primary Readiness & Outcome KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <KPICard
          title="Overall Readiness"
          value="84%"
          subtitle="Competency composite"
          icon="🎯"
          trend={{ value: "+6% this month", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Skill Gap Score"
          value="16%"
          subtitle="3 Missing Skills"
          icon="⚡"
          trend={{ value: "-8% reduction", isPositive: true }}
          highlightColor="blue"
        />
        <KPICard
          title="Course Progress"
          value="71%"
          subtitle="142 / 200 Hours"
          icon="📚"
          trend={{ value: "On schedule", isPositive: true }}
          highlightColor="default"
        />
        <KPICard
          title="Certifications"
          value="2 / 3"
          subtitle="NSQF Level 5 & 6"
          icon="📜"
          trend={{ value: "DigiLocker Linked", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Placement Ready"
          value="Cleared"
          subtitle="Interview round ready"
          icon="💼"
          trend={{ value: "Stage 9 of 11", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Applications"
          value="1 Active"
          subtitle="TCS Associate Role"
          icon="📨"
          trend={{ value: "Interview Scheduled", isPositive: true }}
          highlightColor="amber"
        />
      </div>

      {/* AI Next Best Action Panel */}
      <AINextBestAction role="student" />

      {/* Individual Skill & Employment Journey Timeline */}
      <EmploymentJourneyTimeline />

      {/* Main Split: Current Course vs Skill Gap Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Enrolled Course Progress (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
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
            <ProgressBar value={71} max={100} color="#1D4ED8" />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 block">AEBAS Attendance</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mt-0.5 block">92.4%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 block">Mid-Term Score</span>
              <span className="font-bold text-[#1D4ED8] dark:text-blue-400 text-sm mt-0.5 block">84.0%</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              <span className="text-[11px] text-slate-500 block">Batch Strength</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-sm mt-0.5 block">28 Candidates</span>
            </div>
          </div>
        </div>

        {/* Right: Target Career Role Match (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Target Job Role Compatibility
            </h3>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
              82% Match
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Target Role:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">{learner.targetRole}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">National Openings:</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100">1,420 Jobs Available</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Est. Salary Benchmark:</span>
              <span className="font-semibold text-emerald-700 dark:text-emerald-400">₹4.5 - ₹9.0 LPA</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Remaining Skill Gaps to Bridge
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 text-[11px] font-medium border border-red-200 dark:border-red-900">
                ✕ SQL Normalization
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[11px] font-medium border border-amber-200 dark:border-amber-900">
                ⚡ Node.js Microservices
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-medium border border-emerald-200 dark:border-emerald-900">
                ✓ React.js & TypeScript
              </span>
            </div>
          </div>

          <Link
            href="/learner/skill-gap"
            className="block text-center py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors"
          >
            Launch Full Skill Gap Diagnostic →
          </Link>
        </div>
      </div>
    </div>
  );
}
