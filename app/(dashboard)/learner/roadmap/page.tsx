'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { sidhStore } from '@/lib/sidh-store';
import {
  resolveLearnerCareerContext,
  getAllCareers,
  getAllStreams,
  CareerProfileDef,
} from '@/lib/career-registry';
import {
  CheckCircle2,
  BookOpen,
  Clock,
  Layers,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Target,
  Filter,
} from 'lucide-react';

export default function StudentLearningRoadmapPage() {
  const [learner, setLearner] = useState(() => sidhStore.getLearner());
  const allCareers = getAllCareers();

  const [selectedCareerId, setSelectedCareerId] = useState<string>(() => {
    const profile = sidhStore.getLearner();
    const ctx = resolveLearnerCareerContext(profile);
    return ctx.career.id;
  });

  useEffect(() => {
    const profile = sidhStore.getLearner();
    setLearner(profile);
    const ctx = resolveLearnerCareerContext(profile);
    setSelectedCareerId(ctx.career.id);
  }, []);

  const activeCareer = allCareers.find((c) => c.id === selectedCareerId) || allCareers[0];
  const { stream: learnerStream } = resolveLearnerCareerContext(learner);

  // Phases with dynamic status
  const roadmapPhases = activeCareer.roadmap.map((phase, idx) => ({
    ...phase,
    status: idx === 0 ? ('Completed' as const) : idx === 1 ? ('In Progress' as const) : ('Upcoming' as const),
    progressPercentage: idx === 0 ? 100 : idx === 1 ? 65 : 0,
  }));

  const overallProgress = Math.round(
    roadmapPhases.reduce((acc, p) => acc + p.progressPercentage, 0) / roadmapPhases.length
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Personalized Learning & Competency Roadmap"
        subtitle={`Step-by-step NSQF curriculum milestones formulated to achieve full placement readiness for ${activeCareer.title}`}
        breadcrumbs={[
          { label: 'Student Portal', href: '/learner/dashboard' },
          { label: 'Learning Roadmap' },
        ]}
      />

      {/* Target Career Selector Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0B192C] dark:text-white">
                Roadmap Curriculum for: {activeCareer.title}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {activeCareer.streamCode}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Discipline: <strong className="text-slate-700 dark:text-slate-300">{activeCareer.sector}</strong> • {activeCareer.courses.length} courses • {activeCareer.certifications.length} certifications
            </p>
          </div>
        </div>

        {/* Quick Switch Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs text-slate-500 font-semibold whitespace-nowrap">Switch Track:</label>
          <select
            value={selectedCareerId}
            onChange={(e) => setSelectedCareerId(e.target.value)}
            className="text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
          >
            {allCareers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.streamCode}: {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-2xs space-y-2.5">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            Overall Roadmap Milestone Completion ({activeCareer.title})
          </span>
          <span className="font-extrabold text-[#1D4ED8] dark:text-blue-400 text-sm font-mono">
            {overallProgress}% Completed (Phase 2 of {roadmapPhases.length})
          </span>
        </div>
        <ProgressBar value={overallProgress} max={100} color="#1D4ED8" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-1">
          <span>Target Sector: <strong className="text-slate-700 dark:text-slate-300">{activeCareer.sector}</strong></span>
          <span>Estimated placement eligibility: <strong className="text-emerald-700 dark:text-emerald-400">Oct 2026</strong></span>
        </div>
      </div>

      {/* Roadmap Milestone Cards */}
      <div className="space-y-4">
        {roadmapPhases.map((p) => {
          const isCompleted = p.status === 'Completed';
          const isInProgress = p.status === 'In Progress';

          return (
            <div
              key={p.phaseNumber}
              className={`p-5 rounded-xl border transition-all ${
                isInProgress
                  ? 'bg-blue-50/20 dark:bg-slate-900 border-2 border-[#1D4ED8] dark:border-blue-500 shadow-xs ring-1 ring-blue-100 dark:ring-blue-950'
                  : isCompleted
                  ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-90'
                  : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-mono">
                    Phase 0{p.phaseNumber} • {p.duration}
                  </span>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mt-0.5 flex items-center gap-2">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : isInProgress ? (
                      <BookOpen className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400 shrink-0" />
                    ) : (
                      <Layers className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span>{p.phaseTitle}</span>
                  </h3>
                </div>

                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded ${
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : isInProgress
                      ? 'bg-blue-100 text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300'
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <div className="pt-3 space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block text-[11px] mb-1.5">
                    Competencies Formulated & Practiced:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {p.skills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
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
                  {isInProgress && (
                    <Link
                      href="/learner/courses"
                      className="px-3 py-1 font-semibold rounded-lg bg-[#1D4ED8] text-white hover:bg-[#1E40AF] text-xs shrink-0 text-center shadow-2xs"
                    >
                      Resume Phase Modules →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
