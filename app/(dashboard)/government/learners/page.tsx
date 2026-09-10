'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentLearnersPage() {
  const learners = sidhStore.getLearners();
  const [search, setSearch] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('All');
  const [selectedState, setSelectedState] = useState('All');

  const filtered = learners.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      (('phone' in l ? l.phone : '') || ('mobile' in l ? l.mobile : '') || '').includes(search);
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Learner & Candidate Master Registry"
        subtitle="Comprehensive database of Aadhaar-verified skill development beneficiaries across schemes and states"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Learner Registry' },
        ]}
        actions={
          <button
            onClick={() => alert('Beneficiary roster data requested for secure audit export (PFMS/DBT compliance).')}
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>📥</span> Export Beneficiary Ledger
          </button>
        }
      />

      {/* Demographic Breakdown Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Female Candidate Participation</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">46.8%</p>
          <span className="text-emerald-700 text-[11px] font-semibold">Exceeds 40% Target</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">SC / ST / OBC Enrolled</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">58.2%</p>
          <span className="text-slate-500 text-[11px]">Social Inclusion Mandate</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Rural & Aspirational Dist.</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">52.4%</p>
          <span className="text-slate-500 text-[11px]">Tier-2 & Tier-3 Focus</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Aadhaar / APAAR Verified</span>
          <p className="text-xl font-bold text-emerald-700 mt-0.5">99.1%</p>
          <span className="text-emerald-700 text-[11px] font-semibold">De-duplication Active</span>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search candidate name, email, or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <select
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="px-3 py-1.5 text-xs rounded border border-slate-300 font-medium text-slate-700"
          >
            <option value="All">All National Schemes</option>
            <option value="PMKVY">PMKVY 4.0</option>
            <option value="NAPS">NAPS Apprenticeship</option>
            <option value="DDUGKY">DDU-GKY</option>
            <option value="PMV">PM-Vishwakarma</option>
          </select>

          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-3 py-1.5 text-xs rounded border border-slate-300 font-medium text-slate-700"
          >
            <option value="All">All States / UTs</option>
            <option value="Telangana">Telangana</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>
      </div>

      {/* Candidate Ledger Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Beneficiary Dossier</th>
              <th className="py-3 px-4">Mapped Scheme</th>
              <th className="py-3 px-4">Training Center / State</th>
              <th className="py-3 px-4">Aadhaar Status</th>
              <th className="py-3 px-4">AEBAS Attendance</th>
              <th className="py-3 px-4">DBT Stipend Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((l) => (
              <tr key={l.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{l.name}</div>
                  <div className="text-slate-500 text-[11px]">{l.email} • {l.gender}</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-semibold text-blue-900 bg-blue-50 px-2 py-0.5 rounded text-[11px]">
                    PMKVY 4.0
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-700">
                  <div className="font-medium text-slate-800">NSTI Hyderabad</div>
                  <div className="text-slate-500 text-[11px]">Telangana (Urban)</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                    ✓ UIDAI Verified
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-bold text-emerald-700">92.4% (Active)</span>
                </td>
                <td className="py-3.5 px-4">
                  <span className="font-mono text-[11px] text-slate-800">₹1,500 Disbursed</span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/government/learners/${l.id}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
                  >
                    National Dossier
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
