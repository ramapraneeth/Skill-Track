'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerBatchesPage() {
  const batches = sidhStore.getBatches();
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = filterStatus === 'All'
    ? batches
    : batches.filter((b) => b.status.toLowerCase() === filterStatus.toLowerCase());

  return (
    <div className="space-y-6">
      <PageHeader
        title="Training Batches & Cohort Registry"
        subtitle="Manage classroom schedules, candidate rosters, biometric attendance, and assessments"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Batches' },
        ]}
        actions={
          <Link
            href="/trainer/attendance"
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>📋</span> Daily Attendance Register
          </Link>
        }
      />

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['All', 'Ongoing', 'Upcoming', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              filterStatus === status
                ? 'bg-[#0B3B60] text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((batch) => (
          <div
            key={batch.id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[11px] font-semibold text-slate-500">{batch.code}</span>
                <StatusBadge status={batch.status} />
              </div>
              <h3 className="font-semibold text-slate-900 text-sm">{batch.name}</h3>
              <p className="text-xs text-slate-500 mt-1">Center: NSTI Hyderabad (Ramanthapur)</p>
            </div>

            <div className="p-4 space-y-3 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-500">Timing:</span>
                <span className="font-medium text-slate-800">{batch.timing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Duration:</span>
                <span className="font-medium text-slate-800">
                  {batch.startDate} to {batch.endDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Enrollment:</span>
                <span className="font-semibold text-emerald-700">
                  {batch.enrolledLearners} / {batch.maxCapacity} Candidates
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
              <Link
                href={`/trainer/attendance?batchId=${batch.id}`}
                className="font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
              >
                <span>📋</span> Attendance
              </Link>
              <Link
                href={`/trainer/batches/${batch.id}`}
                className="px-3 py-1.5 font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
              >
                View Roster & Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
