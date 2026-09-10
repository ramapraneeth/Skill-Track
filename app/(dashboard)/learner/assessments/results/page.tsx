'use client';

import React from 'react';
import Link from 'next/link';
import { Award, CheckCircle2, ArrowLeft, ExternalLink } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function AssessmentResultsHistoryPage() {
  const history = [
    {
      id: 'h1',
      assessmentTitle: 'Core Java & Data Structures Benchmark Test',
      skill: 'Core Java & OOP',
      score: 80,
      status: 'Passed',
      attempts: 1,
      date: '2025-02-28',
      certificateEligible: true,
      verifyCode: 'SIDH-ASM-9921',
    },
    {
      id: 'h2',
      assessmentTitle: 'Python for Enterprise Application Development',
      skill: 'Python Programming',
      score: 85,
      status: 'Passed',
      attempts: 1,
      date: '2025-01-15',
      certificateEligible: true,
      verifyCode: 'SIDH-ASM-4412',
    },
    {
      id: 'h3',
      assessmentTitle: 'Frontend React Architecture Diagnostic',
      skill: 'JavaScript ES6',
      score: 72,
      status: 'Passed',
      attempts: 2,
      date: '2024-11-20',
      certificateEligible: true,
      verifyCode: 'SIDH-ASM-2091',
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assessment History & Examination Ledger"
        subtitle="Audited record of all proctored technical evaluations and benchmark scores"
        badge="Accredited Results"
        breadcrumbs={[
          { label: 'Assessments', href: '/learner/assessments' },
          { label: 'History' },
        ]}
      />

      <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569] uppercase font-bold text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Assessment Title</th>
                <th className="py-3.5 px-4">Skill Evaluated</th>
                <th className="py-3.5 px-4">Score</th>
                <th className="py-3.5 px-4">Result</th>
                <th className="py-3.5 px-4">Attempts</th>
                <th className="py-3.5 px-4">Examination Date</th>
                <th className="py-3.5 px-4">Certificate Eligibility</th>
                <th className="py-3.5 px-4 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {history.map((row) => (
                <tr key={row.id} className="hover:bg-[#F8FAFC]">
                  <td className="py-3 px-4 font-bold text-[#0F172A]">{row.assessmentTitle}</td>
                  <td className="py-3 px-4 text-[#475569]">{row.skill}</td>
                  <td className="py-3 px-4 font-mono font-bold text-[#0B3B60]">{row.score}%</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={row.status} />
                  </td>
                  <td className="py-3 px-4 text-[#64748B]">{row.attempts}</td>
                  <td className="py-3 px-4 text-[#64748B]">{row.date}</td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Eligible
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href="/learner/certificates"
                      className="text-xs font-bold text-[#0B3B60] hover:underline inline-flex items-center gap-1"
                    >
                      View Certificate <ExternalLink className="w-3 h-3" />
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
