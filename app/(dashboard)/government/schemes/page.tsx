'use client';

import React from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentSchemesPage() {
  const schemes = sidhStore.getSchemes();

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Skilling Schemes & Financial Outlays"
        subtitle="Central sector and centrally sponsored schemes under the Ministry of Skill Development & Entrepreneurship"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'National Schemes' },
        ]}
        actions={
          <Link
            href="/government/schemes/create"
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>➕</span> Announce New Scheme / Special Project
          </Link>
        }
      />

      <div className="space-y-4">
        {schemes.map((s) => {
          const enrollProgress = Math.round((s.enrolledCount / (s.targetBeneficiaries || 1)) * 100);
          const placementRate = Math.round((s.placedCount / (s.enrolledCount || 1)) * 100);
          return (
            <div
              key={s.id}
              className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-slate-900">{s.name}</h3>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Scheme Code: <span className="font-mono font-semibold text-slate-700">{s.code}</span> • {s.ministry}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 block">Total Budget Allocation</span>
                  <span className="text-base font-bold text-[#0B3B60]">{s.budgetAllocated}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {/* Physical Target */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Physical Beneficiary Target:</span>
                    <span className="font-bold text-slate-900">
                      {s.enrolledCount.toLocaleString()} / {s.targetBeneficiaries.toLocaleString()}
                    </span>
                  </div>
                  <ProgressBar value={enrollProgress} max={100} color="#0B3B60" />
                  <span className="text-[11px] text-slate-500">{enrollProgress}% Target Realized</span>
                </div>

                {/* Financial Utilization */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>PFMS Disbursed Funds:</span>
                    <span className="font-bold text-slate-900">{s.budgetSpent}</span>
                  </div>
                  <ProgressBar value={82} max={100} color="#10b981" />
                  <span className="text-[11px] text-emerald-700 font-semibold">82% Budget Utilized</span>
                </div>

                {/* Placements */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded border border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Verified Placements:</span>
                    <span className="font-bold text-emerald-700">{s.placedCount.toLocaleString()}</span>
                  </div>
                  <ProgressBar value={placementRate} max={100} color="#6366f1" />
                  <span className="text-[11px] text-slate-500">{placementRate}% of Certified Cohort</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-1 text-xs">
                <button
                  onClick={() => alert(`Detailed PFMS DBT audit trial downloaded for ${s.name}.`)}
                  className="px-3 py-1.5 font-medium border border-slate-300 rounded text-slate-700 hover:bg-slate-50"
                >
                  Download PFMS Audit Report
                </button>
                <button
                  onClick={() => alert(`State-wise quota distribution opened for ${s.name}.`)}
                  className="px-3.5 py-1.5 font-semibold bg-[#0B3B60] text-white rounded hover:bg-[#082a47]"
                >
                  Manage State Quotas
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
