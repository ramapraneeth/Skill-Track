'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AINextBestAction } from '@/components/ui/AINextBestAction';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerDashboardPage() {
  const batches = sidhStore.getBatches();
  const learners = sidhStore.getLearners();
  const myBatches = batches.filter((b) => b.trainerId === 'trainer-1');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Instructor & Training Delivery Console"
        subtitle="National Trainer Registry • Cohort Progression, Assessment Telemetry & Student Outcome Tracking"
        badge="Accredited Master Trainer"
        breadcrumbs={[{ label: 'Trainer Portal' }, { label: 'Dashboard' }]}
        actions={
          <div className="flex gap-2">
            <Link
              href="/trainer/attendance"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#1D4ED8] text-white hover:bg-blue-800 shadow-xs flex items-center gap-1.5"
            >
              <span>📋</span> Mark Daily Attendance
            </Link>
            <Link
              href="/trainer/assessments/create"
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-xs flex items-center gap-1.5"
            >
              <span>➕</span> New Assessment
            </Link>
          </div>
        }
      />

      {/* Trainer Outcome & Delivery Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <KPICard
          title="Total Students"
          value="28"
          subtitle="Enrolled cohort"
          icon="👥"
          trend={{ value: "100% capacity", isPositive: true }}
          highlightColor="default"
        />
        <KPICard
          title="Active Learners"
          value="28"
          subtitle="AEBAS verified"
          icon="⏱️"
          trend={{ value: "92.4% punch rate", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Course Progress"
          value="53.5%"
          subtitle="107 / 200 Hrs"
          icon="📚"
          trend={{ value: "Week 12 of 20", isPositive: true }}
          highlightColor="blue"
        />
        <KPICard
          title="Avg Assessment"
          value="84.0%"
          subtitle="Mid-term score"
          icon="⭐"
          trend={{ value: "+6% delta", isPositive: true }}
          highlightColor="default"
        />
        <KPICard
          title="Skill Delta"
          value="+31%"
          subtitle="Competency gain"
          icon="📈"
          trend={{ value: "Exceeds norm", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Certification"
          value="89.2%"
          subtitle="Projected clearance"
          icon="📜"
          trend={{ value: "NSQF Level 5", isPositive: true }}
          highlightColor="blue"
        />
        <KPICard
          title="Job Ready"
          value="18"
          subtitle="Interview cleared"
          icon="🎯"
          trend={{ value: "64.2% cohort", isPositive: true }}
          highlightColor="emerald"
        />
        <KPICard
          title="Placed"
          value="12"
          subtitle="EPFO active"
          icon="💼"
          trend={{ value: "42.8% placed", isPositive: true }}
          highlightColor="emerald"
        />
      </div>

      {/* AI Next Best Action Panel for Trainer */}
      <AINextBestAction role="trainer" />

      {/* Active Batches & Classroom Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Active Batches (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Assigned Training Batches</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Curriculum progression and live candidate attendance</p>
            </div>
            <Link href="/trainer/batches" className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline">
              View All Batches →
            </Link>
          </div>

          <div className="space-y-3">
            {myBatches.map((batch) => (
              <div
                key={batch.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100">{batch.name}</h4>
                      <StatusBadge status={batch.status} />
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Code: {batch.code} • NSTI Hyderabad (Lab 3)</p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {batch.enrolledLearners} / {batch.maxCapacity} Enrolled
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  <span>Timing: {batch.timing}</span>
                  <div className="flex gap-2">
                    <Link
                      href={`/trainer/attendance?batchId=${batch.id}`}
                      className="font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline"
                    >
                      Attendance
                    </Link>
                    <span className="text-slate-300">•</span>
                    <Link
                      href={`/trainer/batches/${batch.id}`}
                      className="font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline"
                    >
                      Batch Roster
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Today's Classroom Schedule (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">Today's Class Schedule</h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg border-l-4 border-[#1D4ED8] bg-blue-50/40 dark:bg-blue-950/40 space-y-1">
              <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>Web App Development (PMKVY)</span>
                <span className="text-[#1D4ED8] dark:text-blue-400">09:00 - 13:00</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">Lab 3 • Practical Lab: API Routing & State Store Hooks</p>
              <span className="inline-block text-[10px] bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-blue-200 dark:border-slate-700 font-semibold text-blue-800 dark:text-blue-300">
                Batch: BATCH-2026-WD01
              </span>
            </div>

            <div className="p-3 rounded-lg border-l-4 border-slate-400 bg-slate-50 dark:bg-slate-950 space-y-1 opacity-80">
              <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                <span>Remedial Doubt Clearing Session</span>
                <span className="text-slate-600 dark:text-slate-400">14:00 - 15:30</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">Seminar Hall B • 6 Candidates Flagged for Low SQL Scores</p>
            </div>
          </div>
        </div>
      </div>

      {/* "My Students" Console Snapshot */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              My Students Performance & Placement Readiness
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Individual candidate dossiers, skill gap flags, and certification status</p>
          </div>
          <Link href="/trainer/learners" className="text-xs font-semibold text-[#1D4ED8] dark:text-blue-400 hover:underline">
            View All Students (28) →
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
              {learners.map((l, idx) => (
                <tr key={l.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{l.name}</div>
                    <div className="text-slate-500 text-[11px]">{l.email}</div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-emerald-700 dark:text-emerald-400">92.4%</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-medium text-[11px] border border-amber-200 dark:border-amber-900">
                      {idx === 0 ? 'SQL Schema Normalization' : idx === 1 ? 'Data Modeling' : 'C++ Hardware Logic'}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200">71%</td>
                  <td className="py-3 px-3 font-bold text-[#1D4ED8] dark:text-blue-400">84%</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold text-[11px]">
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
