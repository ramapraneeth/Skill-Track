'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  CheckCircle2,
  Clock,
  Award,
  Zap,
  Briefcase,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  Plus,
  ClipboardCheck,
  Calendar,
  Building2,
  TrendingUp,
  MapPin,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerDashboardPage() {
  const batches = sidhStore.getBatches();
  const learners = sidhStore.getLearners();
  const [selectedCohort, setSelectedCohort] = useState('ALL');

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* -------------------------------------------------------------
          1. HEADER & TOP ACTIONS
          ------------------------------------------------------------- */}
      <PageHeader
        title="Instructor & Training Delivery Console"
        subtitle="National Trainer Registry • Cohort Progression, Assessment Telemetry & Student Outcome Tracking"
        badge="Accredited Master Trainer"
        breadcrumbs={[{ label: 'Trainer Portal' }, { label: 'Dashboard' }]}
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/trainer/attendance"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#1D4ED8] text-white hover:bg-[#1E40AF] shadow-xs flex items-center gap-1.5 transition-all"
            >
              <ClipboardCheck className="w-3.5 h-3.5" />
              <span>Mark Daily Attendance</span>
            </Link>
            <Link
              href="/trainer/assessments"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-2xs flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Assessment</span>
            </Link>
            <Link
              href="/trainer/schedule"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 shadow-2xs flex items-center gap-1.5 transition-all"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              <span>Class Schedule</span>
            </Link>
          </div>
        }
      />

      {/* -------------------------------------------------------------
          2. KPI SECTION (6 Balanced, High-Contrast Metric Cards)
          ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1: Total Students */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Students</span>
            <Users className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight">
              142
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+12 this month</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            5 assigned cohorts
          </p>
        </div>

        {/* Card 2: Active Learners */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Active Learners</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight">
              128
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>90.1% punch rate</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            AEBAS biometric verified
          </p>
        </div>

        {/* Card 3: Course Progress */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Course Progress</span>
            <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight">
              74.5%
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div className="bg-[#1D4ED8] h-full rounded-full" style={{ width: '74.5%' }} />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            149 / 200 avg hours
          </p>
        </div>

        {/* Card 4: Assessment Score */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Assessment Score</span>
            <Award className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight">
              81.2%
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+4.2% average</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            Unit 4 formative benchmark
          </p>
        </div>

        {/* Card 5: Skill Improvement */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Skill Improvement</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#0B192C] dark:text-white tracking-tight">
              +31%
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>Exceeds norm</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            18 verified competencies
          </p>
        </div>

        {/* Card 6: Job Ready / Placement */}
        <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-[10px] font-bold uppercase tracking-wider">Job Ready / Placement</span>
            <Briefcase className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight">
              68%
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
              <CheckCircle2 className="w-3 h-3" />
              <span>96 candidates ready</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
            Stage 9 of 11 cleared
          </p>
        </div>
      </div>

      {/* -------------------------------------------------------------
          3. MODERN AI INSIGHTS / COHORT ADVISORY SECTION
          ------------------------------------------------------------- */}
      <div className="rounded-xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-teal-50/40 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-blue-200/50 dark:border-blue-900/50 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 border border-blue-200/60 dark:border-blue-900">
              <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8] dark:text-blue-400" />
              AI Cohort Advisory
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 dark:text-amber-400 bg-amber-100/70 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900">
              <AlertTriangle className="w-3 h-3" />
              Medium Priority Alert • High Remediation Impact
            </span>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400">
            Affected cohort: <strong className="text-slate-900 dark:text-slate-200">12 of 28 Candidates Flagged</strong> (BATCH-2026-WD01)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h3 className="text-sm sm:text-base font-bold text-[#0B192C] dark:text-white">
              Relational SQL Normalization & Multi-Table Query Optimization Deficit
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Formative evaluation telemetry in Unit 4 demonstrates a 54% average accuracy across multi-table JOIN operations and foreign key constraints. Early practical intervention before the upcoming summative examination will boost projected exam clearance from 78% to 92%.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-800 dark:text-slate-200 font-semibold">Recommended Action:</strong>
              <span>Conduct a 90-minute live interactive debugging workshop and dispatch targeted practice schema exercises to affected learners.</span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2 shrink-0">
            <Link
              href="/trainer/schedule"
              className="w-full py-2 px-3.5 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-all text-center"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Remediation Lab</span>
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/trainer/assessments"
                className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-semibold text-center transition-all"
              >
                Review Rubric
              </Link>
              <Link
                href="/trainer/materials"
                className="py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-semibold text-center transition-all"
              >
                Dispatch Sheet
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          4. ASSIGNED TRAINING BATCHES & TODAY'S SCHEDULE (12-Col Grid)
          ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Assigned Training Batches (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
                Assigned Training Batches
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Curriculum progression and live candidate attendance telemetry
              </p>
            </div>
            <Link
              href="/trainer/batches"
              className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All Batches</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5 pt-1">
            {/* Batch 1 */}
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-[#0B192C] dark:text-white font-mono">
                      BATCH-2026-WD01
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900">
                      Active • Unit 4
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    Full Stack Web Development & React Architecture
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>NSTI Hyderabad (Lab 3) • 09:00 - 13:00 (Mon - Fri)</span>
                  </div>
                </div>

                <div className="text-right sm:shrink-0">
                  <div className="text-xs font-extrabold text-[#0B192C] dark:text-white">
                    28 / 30 Enrolled
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    92.4% AEBAS Attendance
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span>Classroom & Lab Progression</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">71% (142 / 200 Hrs)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#1D4ED8] h-full rounded-full" style={{ width: '71%' }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Lead Trainer: Prof. Rajesh Nair</span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/trainer/attendance?batchId=b-001"
                    className="font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline text-xs"
                  >
                    Attendance
                  </Link>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <Link
                    href="/trainer/batches"
                    className="font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs"
                  >
                    Batch Roster
                  </Link>
                </div>
              </div>
            </div>

            {/* Batch 2 */}
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-[#0B192C] dark:text-white font-mono">
                      BATCH-2026-PY02
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 border border-blue-200/60 dark:border-blue-900">
                      In Progress • Unit 2
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    Python for Enterprise Systems & Data APIs
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>Visakhapatnam IT Hub • 14:00 - 18:00 (Mon - Fri)</span>
                  </div>
                </div>

                <div className="text-right sm:shrink-0">
                  <div className="text-xs font-extrabold text-[#0B192C] dark:text-white">
                    32 / 35 Enrolled
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    88.6% AEBAS Attendance
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span>Classroom & Lab Progression</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">48% (96 / 200 Hrs)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#1D4ED8] h-full rounded-full" style={{ width: '48%' }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Next Summative: 24 Sep</span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/trainer/attendance?batchId=b-002"
                    className="font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline text-xs"
                  >
                    Attendance
                  </Link>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <Link
                    href="/trainer/batches"
                    className="font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs"
                  >
                    Batch Roster
                  </Link>
                </div>
              </div>
            </div>

            {/* Batch 3 */}
            <div className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-3 hover:border-slate-300 dark:hover:border-slate-700 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-[#0B192C] dark:text-white font-mono">
                      BATCH-2026-AI03
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-900">
                      Final Assessment • Unit 5
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                    Applied AI Engineering & Cloud Microservices
                  </h3>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    <span>CoE Bangalore • 10:00 - 14:00 (Weekend Intensive)</span>
                  </div>
                </div>

                <div className="text-right sm:shrink-0">
                  <div className="text-xs font-extrabold text-[#0B192C] dark:text-white">
                    26 / 30 Enrolled
                  </div>
                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                    95.2% AEBAS Attendance
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span>Classroom & Lab Progression</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">86% (172 / 200 Hrs)</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '86%' }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Placement Stage 9 Enabled</span>
                <div className="flex items-center gap-2">
                  <Link
                    href="/trainer/attendance?batchId=b-003"
                    className="font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline text-xs"
                  >
                    Attendance
                  </Link>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <Link
                    href="/trainer/batches"
                    className="font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs"
                  >
                    Batch Roster
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Today's Class Schedule (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
                Today's Class Schedule
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Synchronized classroom and live lab roster
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-400 border border-blue-200 dark:border-blue-900">
              3 Sessions
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {/* Session 1: Live Now */}
            <div className="p-3.5 rounded-lg border-l-4 border-[#1D4ED8] bg-blue-50/40 dark:bg-blue-950/30 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Live / In Progress
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#1D4ED8] dark:text-blue-400">
                  09:00 - 11:30 AM
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#0B192C] dark:text-white">
                  Advanced SQL JOINs & Normalization Architecture
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Full Stack Web Development • BATCH-2026-WD01
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-blue-200/50 dark:border-slate-800 text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  NSTI Hyderabad • Lab 3
                </span>
                <button
                  type="button"
                  className="py-1 px-3 rounded-md bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold shadow-2xs transition-colors"
                >
                  Join Live Lab
                </button>
              </div>
            </div>

            {/* Session 2: Remedial Session */}
            <div className="p-3.5 rounded-lg border-l-4 border-amber-500 bg-amber-50/30 dark:bg-amber-950/20 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    Upcoming Today
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  02:00 - 03:30 PM
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-[#0B192C] dark:text-white">
                  Remedial Doubt Clearing: Database Schema
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                  Targeted Cohort Remediation • BATCH-2026-WD01 (12 Candidates)
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-amber-200/50 dark:border-slate-800 text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Seminar Hall B • On-Premise
                </span>
                <button
                  type="button"
                  className="py-1 px-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                >
                  Start Session
                </button>
              </div>
            </div>

            {/* Session 3: Evening Microservices */}
            <div className="p-3.5 rounded-lg border-l-4 border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Scheduled
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  04:00 - 05:30 PM
                </span>
              </div>

              <div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  API Routing & Microservices Security Architecture
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Python Enterprise Systems • BATCH-2026-PY02
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Virtual Lab 2 (Online)
                </span>
                <button
                  type="button"
                  className="py-1 px-3 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          5. "MY STUDENTS" PERFORMANCE & OUTCOMES CONSOLE TABLE
          ------------------------------------------------------------- */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 sm:p-6 shadow-2xs space-y-4 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider">
              My Students Performance & Placement Readiness
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Individual candidate dossiers, skill gap flags, and certified competency benchmarks
            </p>
          </div>
          <Link
            href="/trainer/learners"
            className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <span>View All Students (142)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Candidate Name</th>
                <th className="py-2.5 px-3">AEBAS Attendance</th>
                <th className="py-2.5 px-3">Identified Skill Gap</th>
                <th className="py-2.5 px-3">Curriculum Progress</th>
                <th className="py-2.5 px-3">Assessment Score</th>
                <th className="py-2.5 px-3">Placement Readiness</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {learners.slice(0, 5).map((l, idx) => (
                <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{l.name}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-[11px]">{l.email}</div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400">
                    92.4%
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-medium text-[11px] border border-amber-200 dark:border-amber-900">
                      {idx === 0
                        ? 'SQL Schema Normalization'
                        : idx === 1
                        ? 'Data Modeling'
                        : 'C++ Hardware Logic'}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">
                    71%
                  </td>
                  <td className="py-3 px-3 font-bold text-[#1D4ED8] dark:text-blue-400">
                    84.0%
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold text-[11px] border border-emerald-200 dark:border-emerald-900">
                      Placement Ready
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <Link
                      href={`/trainer/learners/${l.id}`}
                      className="px-2.5 py-1 text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline"
                    >
                      Dossier →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
