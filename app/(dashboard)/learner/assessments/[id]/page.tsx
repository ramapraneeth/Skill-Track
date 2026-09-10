'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  FileCheck2,
  Clock,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { INITIAL_ASSESSMENTS } from '@/lib/sidh-store';

export default function AssessmentInstructionsPage() {
  const router = useRouter();
  const params = useParams();
  const assessmentId = (params?.id as string) || 'asm-101';

  const assessment = INITIAL_ASSESSMENTS.find((a) => a.id === assessmentId) || INITIAL_ASSESSMENTS[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={assessment.title}
        subtitle={`Skill: ${assessment.skill} • Passing Threshold: ${assessment.passingScore}%`}
        badge="Standardized Proctoring"
        breadcrumbs={[
          { label: 'Assessments', href: '/learner/assessments' },
          { label: 'Instructions' },
        ]}
      />

      <div className="bg-white border border-[#CBD5E1] rounded-lg p-6 shadow-xs space-y-6">
        {/* Key Assessment Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs">
          <div>
            <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Total Duration</span>
            <strong className="text-[#0F172A] text-sm">{assessment.durationMinutes} Minutes</strong>
          </div>
          <div>
            <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Questions</span>
            <strong className="text-[#0F172A] text-sm">{assessment.questionCount} Multiple Choice</strong>
          </div>
          <div>
            <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Passing Score</span>
            <strong className="text-emerald-700 text-sm">{assessment.passingScore}% to Certify</strong>
          </div>
          <div>
            <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Difficulty</span>
            <strong className="text-[#0B3B60] text-sm">{assessment.difficulty}</strong>
          </div>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-[#0F172A]">Assessment Rules & Guidance</h3>
          <ul className="space-y-2 text-xs text-[#475569]">
            {assessment.instructions.map((inst, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{inst}</span>
              </li>
            ))}
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Questions can be marked for review and returned to before final submission.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Upon submission, your skill proficiency score will automatically update on your candidate profile.</span>
            </li>
          </ul>
        </div>

        {/* Warning Callout */}
        <div className="p-4 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Integrity Notice:</span>
            Switching browser tabs or closing the window while the assessment is running will result in automatic submission.
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
          <Link
            href="/learner/assessments"
            className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A] flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Return to List
          </Link>

          <Link
            href={`/learner/assessments/${assessment.id}/start`}
            className="px-6 py-2.5 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center gap-2 transition-all uppercase tracking-wider shadow-xs"
          >
            <span>Start Assessment Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
