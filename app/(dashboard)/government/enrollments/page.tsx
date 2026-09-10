'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentEnrollmentsPage() {
  const batches = sidhStore.getBatches();
  const [selectedScheme, setSelectedScheme] = useState('All');

  return (
    <div className="space-y-6">
      <PageHeader
        title="Central Enrollment & Cohort Monitoring"
        subtitle="Real-time candidate onboarding, batch activations, and capacity utilization across India"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Enrollment Monitoring' },
        ]}
        actions={
          <button
            onClick={() => alert('Pan-India enrollment census exported.')}
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>📥</span> Export Enrollment Census
          </button>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Pan-India Active Enrollments"
          value="412,940"
          subtitle="Across 28 States & 8 UTs"
          icon="👥"
          trend={{ value: "+22K this month", isPositive: true }}
          highlightColor="#0B3B60"
        />
        <KPICard
          title="Active Running Batches"
          value="15,480"
          subtitle="Classroom & Hybrid"
          icon="🏫"
          trend={{ value: "98.2% on schedule", isPositive: true }}
          highlightColor="#10b981"
        />
        <KPICard
          title="TC Capacity Utilization"
          value="91.4%"
          subtitle="Average seat occupancy"
          icon="📊"
          trend={{ value: "+4.1% vs target", isPositive: true }}
          highlightColor="#6366f1"
        />
        <KPICard
          title="Aadhaar De-duplication"
          value="100%"
          subtitle="Zero duplicate enrollments"
          icon="🛡️"
          trend={{ value: "CIDR verified", isPositive: true }}
          highlightColor="#f59e0b"
        />
      </div>

      {/* Batches Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-semibold text-sm text-slate-900">National Cohort Activation Ledger</h3>
          <span className="text-xs text-slate-500 font-medium">Auto-refreshed every 15 minutes</span>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Cohort / Batch Code</th>
              <th className="py-3 px-4">Assigned Training Center</th>
              <th className="py-3 px-4">Scheme Affiliation</th>
              <th className="py-3 px-4">Enrolled / Sanctioned</th>
              <th className="py-3 px-4">AEBAS Compliance</th>
              <th className="py-3 px-4">Cohort Lifecycle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {batches.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{b.name}</div>
                  <div className="font-mono text-[11px] text-slate-500">{b.code}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-700">NSTI Hyderabad (Ramanthapur)</td>
                <td className="py-3.5 px-4 font-medium text-blue-900">PMKVY 4.0 Special Projects</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900">
                  {b.enrolledLearners} / {b.maxCapacity} ({Math.round((b.enrolledLearners / b.maxCapacity) * 100)}%)
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-emerald-700">92.4% Punch Compliance</span>
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={b.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
