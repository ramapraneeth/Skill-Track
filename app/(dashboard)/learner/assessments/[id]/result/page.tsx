'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useParams } from 'next/navigation';
import {
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Target,
  FileText,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { INITIAL_ASSESSMENTS } from '@/lib/sidh-store';

function AssessmentResultContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const assessmentId = (params?.id as string) || 'asm-101';
  const score = Number(searchParams.get('score')) || 80;
  const correct = Number(searchParams.get('correct')) || 4;
  const total = Number(searchParams.get('total')) || 5;

  const assessment = INITIAL_ASSESSMENTS.find((a) => a.id === assessmentId) || INITIAL_ASSESSMENTS[0];
  const isPassed = score >= assessment.passingScore;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title="Assessment Result & Diagnostic Transcript"
        subtitle={`Evaluation report for: ${assessment.title}`}
        badge="Official Assessment Record"
        breadcrumbs={[
          { label: 'Assessments', href: '/learner/assessments' },
          { label: 'Scorecard' },
        ]}
      />

      {/* Main Result Card */}
      <div className="bg-white border border-[#CBD5E1] rounded-lg p-6 sm:p-8 shadow-xs space-y-6 text-center">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto ${
          isPassed ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
        }`}>
          {isPassed ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
        </div>

        <div>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isPassed ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
          }`}>
            {isPassed ? 'Passed Benchmark' : 'Needs Improvement'}
          </span>
          <h2 className="text-2xl font-black text-[#0F172A] mt-2">
            Overall Score: {score}%
          </h2>
          <p className="text-xs text-[#64748B] mt-1">
            You answered {correct} out of {total} questions correctly. Passing requirement: {assessment.passingScore}%.
          </p>
        </div>

        {/* Diagnostic Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2E8F0] text-left text-xs">
          <div className="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded">
            <span className="text-[10px] font-bold text-[#64748B] uppercase block">Skill Evaluated</span>
            <strong className="text-[#0F172A] text-sm">{assessment.skill}</strong>
            <p className="text-[11px] text-emerald-700 mt-0.5">Proficiency Verified</p>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded">
            <span className="text-[10px] font-bold text-emerald-800 uppercase block">Identified Strengths</span>
            <strong className="text-emerald-900 text-xs">OOP Design & Class Structures</strong>
            <p className="text-[11px] text-emerald-800 mt-0.5">High accuracy in memory & inheritance</p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded">
            <span className="text-[10px] font-bold text-amber-800 uppercase block">Target Remediation</span>
            <strong className="text-amber-900 text-xs">Graph & Tree Traversal</strong>
            <p className="text-[11px] text-amber-800 mt-0.5">Review BFS vs DFS queue mechanics</p>
          </div>
        </div>

        {/* Next Step Recommendations */}
        <div className="pt-4 border-t border-[#E2E8F0] text-left space-y-3">
          <h3 className="font-bold text-xs text-[#0F172A] uppercase tracking-wider">
            Recommended Actionable Next Steps:
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-[#F0F9FF] border border-[#BAE6FD] rounded gap-3">
            <div>
              <h4 className="font-bold text-xs text-[#0C4A6E]">
                Enterprise Java Programming & Data Structures Course
              </h4>
              <p className="text-[11px] text-[#0369A1] mt-0.5">
                Targeted modules to close remaining algorithmic complexity gaps.
              </p>
            </div>
            <Link
              href="/learner/courses/crs-002"
              className="h-8 px-4 rounded bg-[#0B3B60] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-[#002541]"
            >
              <span>View Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Action buttons */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
          <Link
            href="/learner/assessments"
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
          >
            ← Back to Assessments
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/learner/skill-gap"
              className="h-9 px-4 rounded border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#0F172A] font-bold text-xs flex items-center gap-1.5"
            >
              <Target className="w-3.5 h-3.5 text-[#0B3B60]" />
              <span>Inspect Skill Gap</span>
            </Link>
            <Link
              href="/learner/certificates"
              className="h-9 px-4 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>View Verified Certificates</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AssessmentResultPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading assessment results...</div>}>
      <AssessmentResultContent />
    </Suspense>
  );
}

