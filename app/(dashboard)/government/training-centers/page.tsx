'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentTrainingCentersPage() {
  const centers = sidhStore.getCenters();
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('All');

  const filtered = centers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase());
    const matchesState = stateFilter === 'All' || c.state === stateFilter;
    return matchesSearch && matchesState;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Training Center (TC) Infrastructure Registry"
        subtitle="Accredited government and private centers operating under SMART accreditation norms"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Training Centers' },
        ]}
        actions={
          <button
            onClick={() => alert('Center infrastructure compliance report generated.')}
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>📥</span> Download Center Directory
          </button>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Total Accredited TCs</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">14,820</p>
          <span className="text-emerald-700 text-[11px] font-semibold">Pan-India Network</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">SMART Verified Centers</span>
          <p className="text-xl font-bold text-[#0B3B60] mt-0.5">13,940</p>
          <span className="text-slate-500 text-[11px]">94% Infrastructure Grade</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Biometric Terminal Online</span>
          <p className="text-xl font-bold text-emerald-700 mt-0.5">98.4%</p>
          <span className="text-emerald-700 text-[11px] font-semibold">Live AEBAS Feeds</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Under Infrastructure Audit</span>
          <p className="text-xl font-bold text-amber-700 mt-0.5">188</p>
          <span className="text-slate-500 text-[11px]">Notice for Compliance</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search center name, city, or TC code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
          />
        </div>

        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="px-3 py-1.5 text-xs rounded border border-slate-300 font-medium text-slate-700"
        >
          <option value="All">All States / UTs</option>
          <option value="Telangana">Telangana</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
        </select>
      </div>

      {/* Centers Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Center Name & Code</th>
              <th className="py-3 px-4">Location</th>
              <th className="py-3 px-4">Sanctioned Capacity</th>
              <th className="py-3 px-4">Active Batches</th>
              <th className="py-3 px-4">AEBAS Device Status</th>
              <th className="py-3 px-4">SMART Accreditation</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{c.name}</div>
                  <div className="text-slate-500 font-mono text-[11px]">{c.code}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-700">
                  <div>{c.city}, {c.state}</div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">{c.capacity} Candidates</td>
                <td className="py-3.5 px-4 font-medium text-slate-700">{c.activeBatches} Batches Active</td>
                <td className="py-3.5 px-4">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    Online (Terminal #1, #2)
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <StatusBadge status="Accredited" />
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/government/training-centers/${c.id}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
                  >
                    Inspect Center
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
