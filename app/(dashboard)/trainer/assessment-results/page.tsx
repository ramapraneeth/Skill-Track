'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerAssessmentResultsPage() {
  const assessments = sidhStore.getAssessments();
  const learners = sidhStore.getLearners();

  const fallbackAssessment = {
    id: 'ass-1',
    title: 'Web Application Development Summative Practical Exam',
    sector: 'IT & ITES',
    passingScore: 60,
    totalQuestions: 5,
    nsqfLevel: 5,
  };

  const allAssessments = assessments.length > 0 ? assessments : [fallbackAssessment];
  const [selectedAssessment, setSelectedAssessment] = useState(allAssessments[0].id);
  const activeAss = allAssessments.find((a) => a.id === selectedAssessment) || allAssessments[0];

  // Scores roster
  const scoresRoster = learners.map((l, i) => {
    const score = 70 + ((i * 7) % 28);
    const passed = score >= (activeAss?.passingScore || 60);
    return {
      candidate: l,
      rollNo: `HYD-26-${String(i + 101).padStart(3, '0')}`,
      score,
      status: passed ? 'Passed' : 'Needs Remedial',
      eligibleForCert: passed,
    };
  });

  const passedCount = scoresRoster.filter((r) => r.status === 'Passed').length;
  const avgScore = Math.round(scoresRoster.reduce((a, b) => a + b.score, 0) / (scoresRoster.length || 1));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assessment Results & Score Ledger"
        subtitle="Batch-wise examination outcome reports, NOS competency rubrics, and certificate clearance"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Assessments', href: '/trainer/assessments' },
          { label: 'Score Ledger' },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => alert('Batch evaluation results submitted to Sector Skill Council for NSQF certification approval.')}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
            >
              <span>🏛️</span> Forward to SSC for Certification
            </button>
            <button
              onClick={() => alert('Score ledger exported as signed PDF report.')}
              className="px-3.5 py-2 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            >
              Export PDF
            </button>
          </div>
        }
      />

      {/* Selector & KPI Strip */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center gap-3">
          <label className="text-xs font-medium text-slate-600 shrink-0">Select Assessment:</label>
          <select
            value={selectedAssessment}
            onChange={(e) => setSelectedAssessment(e.target.value)}
            className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 font-semibold text-slate-800"
          >
            {allAssessments.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title} ({a.sector})
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-6 bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-around text-center text-xs">
          <div>
            <span className="text-slate-500 text-[11px] block">Candidates Evaluated</span>
            <span className="text-base font-bold text-slate-900">{scoresRoster.length}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-slate-500 text-[11px] block">Pass Rate</span>
            <span className="text-base font-bold text-emerald-700">
              {Math.round((passedCount / (scoresRoster.length || 1)) * 100)}%
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-slate-500 text-[11px] block">Average Score</span>
            <span className="text-base font-bold text-[#0B3B60]">{avgScore}%</span>
          </div>
        </div>
      </div>

      {/* Roster Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Roll No.</th>
              <th className="py-3 px-4">Candidate Name</th>
              <th className="py-3 px-4">Percentage Score</th>
              <th className="py-3 px-4">Cutoff (Min {activeAss.passingScore}%)</th>
              <th className="py-3 px-4">Assessment Status</th>
              <th className="py-3 px-4">NSQF Certificate Clearance</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {scoresRoster.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="py-3 px-4 font-mono text-[11px] text-slate-600">{item.rollNo}</td>
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-900">{item.candidate.name}</div>
                  <div className="text-[11px] text-slate-500">{item.candidate.email}</div>
                </td>
                <td className="py-3 px-4 font-bold text-slate-900">{item.score}%</td>
                <td className="py-3 px-4 text-slate-600">{item.score >= activeAss.passingScore ? 'Cleared' : 'Below Cutoff'}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      item.status === 'Passed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  {item.eligibleForCert ? (
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <span>✓</span> Cleared for Issuance
                    </span>
                  ) : (
                    <span className="text-amber-700 font-medium text-[11px]">Remedial Exam Required</span>
                  )}
                </td>
                <td className="py-3 px-4 text-right">
                  <Link
                    href={`/trainer/learners/${item.candidate.id}`}
                    className="text-xs font-semibold text-[#0B3B60] hover:underline"
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
  );
}
