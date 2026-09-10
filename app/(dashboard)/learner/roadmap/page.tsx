'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function StudentLearningRoadmapPage() {
  const phases = [
    {
      phase: 'Phase 1: Diagnostic & Core Web Engineering',
      duration: 'Weeks 1 - 4 (Completed)',
      status: 'Completed',
      progress: 100,
      skills: ['Modern HTML5/CSS3', 'JavaScript ES6+', 'DOM & Event Loops'],
      deliverable: 'Responsive Semantic Portfolio Web Application',
    },
    {
      phase: 'Phase 2: React.js Component Architecture & Next.js',
      duration: 'Weeks 5 - 10 (Current Phase)',
      status: 'In Progress',
      progress: 75,
      skills: ['React Hooks (useContext, useMemo)', 'Next.js App Routing', 'Client vs Server Components'],
      deliverable: 'Real-time Interactive Telemedicine Portal',
    },
    {
      phase: 'Phase 3: Backend REST APIs & Relational Database Normalization',
      duration: 'Weeks 11 - 15 (Upcoming)',
      status: 'Upcoming',
      progress: 0,
      skills: ['Node.js & Express Pipelines', 'SQL Schema Design (3NF)', 'Prisma ORM Database Access'],
      deliverable: 'Secure Authenticated REST Microservices & Database API',
    },
    {
      phase: 'Phase 4: Docker Containers, Cloud Deployment & Capstone Lab',
      duration: 'Weeks 16 - 20 (Final Phase)',
      status: 'Upcoming',
      progress: 0,
      skills: ['Docker Containerization', 'AWS / Sovereign Cloud Hosting', 'Cyber Safety & NCVET Summative Lab'],
      deliverable: 'Full Stack Production-Ready Capstone Project for Corporate Placement',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Personalized Learning & Competency Roadmap"
        subtitle="Step-by-step curriculum milestones formulated by AI to bridge your skill gaps for Full Stack Web Developer"
        breadcrumbs={[
          { label: 'Student Portal', href: '/learner/dashboard' },
          { label: 'Learning Roadmap' },
        ]}
      />

      {/* Progress Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">Overall Roadmap Milestone Completion</span>
          <span className="font-extrabold text-[#1D4ED8] dark:text-blue-400 text-sm">43.7% Completed (Phase 2 of 4)</span>
        </div>
        <ProgressBar value={44} max={100} color="#1D4ED8" />
        <p className="text-[11px] text-slate-500 dark:text-slate-400">
          Estimated graduation and placement eligibility date: <strong>20 Oct 2026</strong>
        </p>
      </div>

      {/* Roadmap Milestone Cards */}
      <div className="space-y-4">
        {phases.map((p, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl border transition-all ${
              p.status === 'In Progress'
                ? 'bg-blue-50/30 dark:bg-slate-900 border-[#1D4ED8] dark:border-blue-800 shadow-sm ring-1 ring-[#1D4ED8]'
                : p.status === 'Completed'
                ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-90'
                : 'bg-slate-50/50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 opacity-75'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  {p.duration}
                </span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5">{p.phase}</h3>
              </div>
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                  p.status === 'Completed'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : p.status === 'In Progress'
                    ? 'bg-blue-100 text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300'
                    : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {p.status}
              </span>
            </div>

            <div className="pt-3 space-y-3 text-xs">
              <div>
                <span className="text-slate-500 font-medium block text-[11px] mb-1">Competencies Acquired:</span>
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                <span className="text-slate-600 dark:text-slate-400">
                  Capstone Milestone Deliverable: <strong className="text-slate-800 dark:text-slate-200">{p.deliverable}</strong>
                </span>
                {p.status === 'In Progress' && (
                  <Link
                    href="/learner/my-learning"
                    className="px-3 py-1 font-semibold rounded bg-[#1D4ED8] text-white hover:bg-blue-800 text-xs shrink-0 text-center"
                  >
                    Resume Phase Modules →
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
