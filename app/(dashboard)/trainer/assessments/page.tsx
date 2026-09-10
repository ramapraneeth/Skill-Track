'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerAssessmentsPage() {
  const assessments = sidhStore.getAssessments();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Formative & Summative Assessments"
        subtitle="Manage competency examinations, practical skill rubrics, and candidate evaluations"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Assessments' },
        ]}
        actions={
          <div className="flex gap-2">
            <Link
              href="/trainer/assessment-results"
              className="px-3.5 py-2 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            >
              Batch Score Sheets
            </Link>
            <Link
              href="/trainer/assessments/create"
              className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
            >
              <span>➕</span> Create New Assessment
            </Link>
          </div>
        }
      />

      {assessments.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500 text-xs shadow-xs">
          No scheduled assessments found. Click &quot;Create New Assessment&quot; to configure a formative or summative evaluation rubric.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {assessments.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
            <div className="p-5">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                  NSQF Level {a.nsqfLevel}
                </span>
                <span className="text-xs font-medium text-slate-500">{a.durationMinutes} Mins</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-sm leading-snug">{a.title}</h3>
              <p className="text-xs text-slate-500 mt-1">Sector: {a.sector}</p>

              <div className="mt-4 space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-500">Question Pool:</span>
                  <span className="font-semibold text-slate-800">{a.totalQuestions} Questions</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Passing Cutoff:</span>
                  <span className="font-semibold text-slate-800">{a.passingScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Evaluated Candidates:</span>
                  <span className="font-semibold text-emerald-700">28 Candidates</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href="/trainer/assessment-results"
                className="font-semibold text-[#0B3B60] hover:underline"
              >
                View Scores & Roster →
              </Link>
              <button
                onClick={() => alert(`Assessment "${a.title}" question rubric opened for editing.`)}
                className="px-2.5 py-1 font-medium border border-slate-200 rounded text-slate-600 hover:bg-white"
              >
                Edit Rubric
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
    </div>
  );
}
