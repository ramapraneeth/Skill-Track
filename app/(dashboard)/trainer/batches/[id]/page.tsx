'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerBatchDetailPage() {
  const params = useParams();
  const batchId = params?.id as string;
  const batch = sidhStore.getBatchById(batchId) || sidhStore.getBatches()[0];
  const learners = sidhStore.getLearners();

  const [search, setSearch] = useState('');

  const filteredLearners = learners.filter((l) =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title={batch.name}
        subtitle={`Batch Code: ${batch.code} • NSTI Ramanthapur • Timing: ${batch.timing}`}
        badge={batch.status}
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Batches', href: '/trainer/batches' },
          { label: batch.code },
        ]}
        actions={
          <div className="flex gap-2">
            <Link
              href={`/trainer/attendance?batchId=${batch.id}`}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
            >
              Mark Batch Attendance
            </Link>
            <button
              onClick={() => alert('Official Candidate Roster exported as signed PDF.')}
              className="px-3.5 py-2 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            >
              Export Roster
            </button>
          </div>
        }
      />

      {/* Batch Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Enrolled Strength</span>
          <p className="text-lg font-bold text-slate-900 mt-0.5">
            {batch.enrolledLearners} / {batch.maxCapacity} Candidates
          </p>
          <span className="text-emerald-700 text-[11px] font-semibold">Capacity at 93%</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Batch Duration</span>
          <p className="text-xs font-bold text-slate-900 mt-1">
            {batch.startDate} – {batch.endDate}
          </p>
          <span className="text-slate-500 text-[11px]">3.5 Months Remaining</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Average Attendance</span>
          <p className="text-lg font-bold text-emerald-700 mt-0.5">91.4%</p>
          <span className="text-slate-500 text-[11px]">AEBAS Punch Compliant</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Scheme Affiliation</span>
          <p className="text-xs font-bold text-[#0B3B60] mt-1">PMKVY 4.0 Special Projects</p>
          <span className="text-slate-500 text-[11px]">NSQF Level 5 Alignment</span>
        </div>
      </div>

      {/* Enrolled Learner Roster */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-semibold text-sm text-slate-800">Enrolled Candidate Roster</h3>
            <p className="text-[11px] text-slate-500">Aadhaar-verified candidates registered under this cohort</p>
          </div>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search candidate name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-4">Roll No.</th>
                <th className="py-2.5 px-4">Candidate Name</th>
                <th className="py-2.5 px-4">Contact Info</th>
                <th className="py-2.5 px-4">AEBAS Attendance</th>
                <th className="py-2.5 px-4">Aadhaar Status</th>
                <th className="py-2.5 px-4">Mid-Term Score</th>
                <th className="py-2.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLearners.map((learner, idx) => (
                <tr key={learner.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                    HYD-26-{String(idx + 101).padStart(3, '0')}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{learner.name}</div>
                    <div className="text-[11px] text-slate-500">{learner.gender}, Age 22</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-800">{learner.email}</div>
                    <div className="text-[11px] text-slate-500">{learner.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-emerald-700">92% (Regular)</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                      UIDAI Verified
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-800">84%</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link
                      href={`/trainer/learners/${learner.id}`}
                      className="px-2.5 py-1 text-xs font-semibold text-[#0B3B60] hover:underline"
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
    </div>
  );
}
