'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentTrainersPage() {
  const trainers = sidhStore.getTrainers();
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  const filtered = trainers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      t.phone.includes(search);
    const matchesSector = sectorFilter === 'All' || t.sector === sectorFilter;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Trainer & Master Assessor Registry"
        subtitle="Accredited instructors certified under the Training of Trainers (ToT) framework across Sector Skill Councils"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Trainer Registry' },
        ]}
        actions={
          <div className="flex gap-2">
            <Link
              href="/government/trainers/create"
              className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
            >
              <span>➕</span> Issue ToT Accreditation
            </Link>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Active ToT Certified</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">48,290</p>
          <span className="text-emerald-700 text-[11px] font-semibold">Across 37 Sector Councils</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Master Trainers (Lvl 6-7)</span>
          <p className="text-xl font-bold text-[#0B3B60] mt-0.5">12,410</p>
          <span className="text-slate-500 text-[11px]">Authorized Lead Instructors</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Average Quality Rating</span>
          <p className="text-xl font-bold text-slate-900 mt-0.5">4.68 / 5.0</p>
          <span className="text-emerald-700 text-[11px] font-semibold">NCVET Audit Compliant</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <span className="text-slate-500">Pending Re-accreditations</span>
          <p className="text-xl font-bold text-amber-700 mt-0.5">342</p>
          <span className="text-slate-500 text-[11px]">Annual ToT Renewal Due</span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search trainer name, email, or mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
          />
        </div>

        <select
          value={sectorFilter}
          onChange={(e) => setSectorFilter(e.target.value)}
          className="px-3 py-1.5 text-xs rounded border border-slate-300 font-medium text-slate-700"
        >
          <option value="All">All Sector Skill Councils</option>
          <option value="IT & ITES">IT & ITES (NASSCOM)</option>
          <option value="Electronics & Hardware">Electronics & Hardware</option>
          <option value="Automotive">Automotive Skill Development Council</option>
          <option value="Healthcare">Healthcare Sector Skill Council</option>
        </select>
      </div>

      {/* Trainers Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Instructor Profile</th>
              <th className="py-3 px-4">Sector Skill Council</th>
              <th className="py-3 px-4">ToT Accreditation</th>
              <th className="py-3 px-4">Assigned Center</th>
              <th className="py-3 px-4">Quality Score</th>
              <th className="py-3 px-4">Accreditation Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{t.name}</div>
                  <div className="text-slate-500 text-[11px]">{t.qualification}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-800">{t.sector}</td>
                <td className="py-3.5 px-4">
                  <div className="font-mono text-[11px] text-slate-700">TOT-SSC-2024-8842</div>
                  <div className="text-[10px] text-slate-500">NSQF Level 6-7</div>
                </td>
                <td className="py-3.5 px-4 text-slate-700">NSTI Hyderabad</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">4.8 / 5.0</td>
                <td className="py-3.5 px-4">
                  <StatusBadge status={t.status} />
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/government/trainers/${t.id}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
                  >
                    Audit Dossier
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
