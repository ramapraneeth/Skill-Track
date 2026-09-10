'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useParams } from 'next/navigation';
import {
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Target,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { INITIAL_ASSESSMENTS } from '@/lib/sidh-store';

function AssessmentResultContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const assessmentId = (params?.id as string) || 'asm-101';
  const score = Number(searchParams.get('score')) || 88;
  const correct = Number(searchParams.get('correct')) || 18;
  const total = Number(searchParams.get('total')) || 20;

  const assessment = INITIAL_ASSESSMENTS.find((a) => a.id === assessmentId) || {
    id: 'asm-101',
    title: 'Data Structures & Algorithmic Problem Solving',
    skill: 'Algorithms & Problem Solving',
    passingScore: 75,
  };

  const isPassed = score >= assessment.passingScore;

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Back Navigation */}
      <div>
        <Link
          href="/learner/assessments"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessments</span>
        </Link>
      </div>

      {/* 1. TOP RESULT CARD */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 ${
                isPassed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {score}%
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isPassed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {isPassed ? 'Status: Passed' : 'Status: Needs Improvement'}
                </span>
                <span className="text-xs text-slate-500">
                  Passing Benchmark: ≥ {assessment.passingScore}%
                </span>
              </div>

              <h1 className="text-lg sm:text-xl font-bold text-slate-900">
                {assessment.title}
              </h1>

              <p className="text-xs text-slate-500">
                You answered <strong className="text-slate-800">{correct}</strong> out of <strong className="text-slate-800">{total}</strong> questions correctly.
              </p>
            </div>
          </div>

          <div className="text-right sm:border-l sm:border-slate-100 sm:pl-6 space-y-0.5 shrink-0 w-full sm:w-auto">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Skill Level Verified
            </span>
            <span className="text-base font-bold text-blue-700 block">
              Advanced Level
            </span>
            <span className="text-xs text-slate-500">Credited to Skill Passport</span>
          </div>
        </div>

        {/* 2. STRENGTHS & AREAS TO IMPROVE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/30 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Strengths Demonstrated
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Object-Oriented patterns, inheritance, and encapsulation.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                <span>Asynchronous task execution and event handling logic.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/30 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Areas to Improve
            </span>
            <ul className="space-y-1.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-[10px] mt-0.5 shrink-0">!</span>
                <span>Relational transaction isolation levels and indexing structures.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold text-[10px] mt-0.5 shrink-0">!</span>
                <span>Graph traversal optimization (BFS vs. DFS memory complexity).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. RECOMMENDED NEXT STEP: Connects assessment → skill gap → learning */}
        <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
            Recommended Next Step on Your Learning Pathway:
          </span>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                Relational Database Architecture & SQL Analytics
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Targeted modules specifically designed to close your identified database normalization and indexing gaps.
              </p>
            </div>

            <Link
              href="/learner/courses/crs-003"
              className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shrink-0 shadow-xs"
            >
              <span>View Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <Link
            href="/learner/skills"
            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <Target className="w-3.5 h-3.5 text-slate-500" />
            <span>Inspect Skill Gap</span>
          </Link>

          <Link
            href="/learner/certificates"
            className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Award className="w-3.5 h-3.5" />
            <span>View Verified Certificates</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentResultPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-500">Loading scorecard...</div>}>
      <AssessmentResultContent />
    </Suspense>
  );
}
