'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function TrainerAnalyticsPage() {
  const atRiskCandidates = [
    { name: 'Kavita Das', roll: 'HYD-26-108', attendance: '68%', score: '54%', risk: 'High Risk (Low Attendance & Score)' },
    { name: 'Manish Kumar', roll: 'HYD-26-112', attendance: '72%', score: '62%', risk: 'Moderate Risk (Missed 3 Labs)' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Instructional Analytics & Dropout Prevention"
        subtitle="Predictive insights, attendance variance, and early intervention telemetry"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Analytics' },
        ]}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Retention Rate"
          value="96.2%"
          subtitle="28 of 29 candidates active"
          icon="🛡️"
          trend={{ value: "+3.1% vs national avg", isPositive: true }}
          highlightColor="#10b981"
        />
        <KPICard
          title="Candidates at Risk"
          value="2"
          subtitle="Attendance under 75% cutoff"
          icon="⚠️"
          trend={{ value: "Intervention required", isPositive: false }}
          highlightColor="#ef4444"
        />
        <KPICard
          title="Avg Competency Mastery"
          value="82.4%"
          subtitle="Formative assessment composite"
          icon="📊"
          trend={{ value: "+4% vs target", isPositive: true }}
          highlightColor="#0B3B60"
        />
        <KPICard
          title="Placement Readiness"
          value="78%"
          subtitle="NAPS interview eligible"
          icon="💼"
          trend={{ value: "18 candidates cleared", isPositive: true }}
          highlightColor="#6366f1"
        />
      </div>

      {/* Early Intervention Table */}
      <div className="bg-white rounded-lg border border-red-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🚨</span>
            <div>
              <h3 className="font-semibold text-sm text-slate-800">Early Intervention Flagged Candidates</h3>
              <p className="text-[11px] text-slate-500">Candidates at risk of failing 80% AEBAS attendance or assessment passing cutoff</p>
            </div>
          </div>
          <button
            onClick={() => alert('Batch counselor notified. Remedial mentoring session scheduled.')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded bg-red-700 text-white hover:bg-red-800"
          >
            Trigger Remedial Mentoring
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Roll No.</th>
                <th className="py-2.5 px-3">Candidate</th>
                <th className="py-2.5 px-3">AEBAS Attendance</th>
                <th className="py-2.5 px-3">Formative Score</th>
                <th className="py-2.5 px-3">Risk Assessment</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {atRiskCandidates.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono text-slate-600">{c.roll}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900">{c.name}</td>
                  <td className="py-3 px-3 text-red-700 font-bold">{c.attendance}</td>
                  <td className="py-3 px-3 font-medium text-slate-700">{c.score}</td>
                  <td className="py-3 px-3 text-red-700 font-medium">{c.risk}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => alert(`Direct SMS & WhatsApp alert sent to ${c.name} regarding attendance shortfall.`)}
                      className="px-2.5 py-1 text-xs border border-slate-300 rounded font-medium text-slate-700 hover:bg-slate-100"
                    >
                      Send Notice
                    </button>
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
