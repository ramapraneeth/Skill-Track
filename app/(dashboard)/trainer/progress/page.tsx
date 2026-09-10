'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function TrainerProgressPage() {
  const curriculumUnits = [
    { code: 'NOS-SSC/Q0501-U01', title: 'Web Development Core Fundamentals & DOM', hoursDone: 30, totalHours: 30, progress: 100, status: 'Completed' },
    { code: 'NOS-SSC/Q0501-U02', title: 'Modern JavaScript & TypeScript Architecture', hoursDone: 35, totalHours: 35, progress: 100, status: 'Completed' },
    { code: 'NOS-SSC/Q0501-U03', title: 'React Component Hierarchy & Next.js Routing', hoursDone: 32, totalHours: 45, progress: 71, status: 'Ongoing' },
    { code: 'NOS-SSC/Q0501-U04', title: 'Relational Database Modeling & Prisma ORM', hoursDone: 10, totalHours: 40, progress: 25, status: 'Ongoing' },
    { code: 'NOS-SSC/Q0501-U05', title: 'Cloud Deployment, Security & Capstone Lab', hoursDone: 0, totalHours: 50, progress: 0, status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Curriculum Delivery & Progress Tracker"
        subtitle="National Occupational Standards (NOS) unit completion telemetry for active cohorts"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Curriculum Progress' },
        ]}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Hours Delivered"
          value="107 / 200"
          subtitle="53.5% of total course"
          icon="⏱️"
          trend={{ value: "On track with lesson plan", isPositive: true }}
          highlightColor="#0B3B60"
        />
        <KPICard
          title="Practical Lab Ratio"
          value="68%"
          subtitle="Hands-on laboratory hours"
          icon="💻"
          trend={{ value: "Target: 60%+", isPositive: true }}
          highlightColor="#10b981"
        />
        <KPICard
          title="NOS Units Cleared"
          value="2 of 5"
          subtitle="Formatively assessed"
          icon="🎯"
          trend={{ value: "Unit 3 ending next week", isPositive: true }}
          highlightColor="#6366f1"
        />
        <KPICard
          title="Cohort Pace Index"
          value="1.04"
          subtitle="4% ahead of syllabus timeline"
          icon="⚡"
          trend={{ value: "Ahead of schedule", isPositive: true }}
          highlightColor="#f59e0b"
        />
      </div>

      {/* NOS Units Progress Table */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm text-slate-800">Batch: BATCH-2026-WD01 Curriculum Coverage</h3>
          <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded">
            Overall Syllabus: 53.5%
          </span>
        </div>

        <div className="space-y-4 pt-2">
          {curriculumUnits.map((u, idx) => (
            <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50/40 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div>
                  <span className="font-mono text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">
                    {u.code}
                  </span>
                  <h4 className="font-semibold text-xs text-slate-900 mt-0.5">{u.title}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600">
                    {u.hoursDone} / {u.totalHours} Hours
                  </span>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      u.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : u.status === 'Ongoing'
                        ? 'bg-blue-100 text-[#0B3B60]'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {u.status}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <ProgressBar value={u.progress} max={100} color={u.progress === 100 ? '#10b981' : '#0B3B60'} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
