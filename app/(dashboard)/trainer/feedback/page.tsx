'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function TrainerFeedbackPage() {
  const ratings = [
    { metric: 'Subject Knowledge & Technical Clarity', score: 4.8, max: 5.0, percent: 96 },
    { metric: 'Hands-on Practical Lab Assistance', score: 4.7, max: 5.0, percent: 94 },
    { metric: 'Doubt Resolution & Candidate Mentorship', score: 4.6, max: 5.0, percent: 92 },
    { metric: 'Punctuality & AEBAS Session Compliance', score: 4.9, max: 5.0, percent: 98 },
  ];

  const candidateReviews: { candidate: string; comment: string; rating: number; date: string }[] = [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Candidate Feedback & Quality Audits"
        subtitle="Learner satisfaction telemetry and NCVET / SSC instructor audit evaluations"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Quality & Feedback' },
        ]}
      />

      {/* Top Ratings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Overall Rating Card */}
        <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-extrabold text-[#0B3B60]">4.75</span>
          <div className="flex gap-1 text-amber-500 text-base mt-2">
            {'★'.repeat(5)}
          </div>
          <p className="font-semibold text-xs text-slate-800 mt-2">Overall Instructor Rating</p>
          <p className="text-[11px] text-slate-500">Based on 58 verified candidate evaluations</p>

          <div className="mt-4 pt-4 border-t border-slate-100 w-full text-xs text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span>NCVET Benchmark:</span>
              <span className="font-semibold text-emerald-700">Top 5% in Sector</span>
            </div>
            <div className="flex justify-between">
              <span>ToT Level:</span>
              <span className="font-semibold text-slate-800">Accredited Master Trainer</span>
            </div>
          </div>
        </div>

        {/* Right: Metric Breakdown */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-800">Dimension-wise Evaluation</h3>
          <div className="space-y-3.5">
            {ratings.map((r, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700">{r.metric}</span>
                  <span className="font-bold text-[#0B3B60]">{r.score} / {r.max}</span>
                </div>
                <ProgressBar value={r.percent} max={100} color="#0B3B60" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Reviews */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-slate-800">Recent Candidate Feedback Submissions</h3>
        <div className="space-y-3">
          {candidateReviews.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No candidate feedback submissions recorded yet.
            </div>
          ) : (
            candidateReviews.map((rev, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{rev.candidate}</span>
                    <span className="text-amber-500 font-bold">{'★'.repeat(rev.rating)}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>
                <p className="text-slate-600 leading-relaxed italic">"{rev.comment}"</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
