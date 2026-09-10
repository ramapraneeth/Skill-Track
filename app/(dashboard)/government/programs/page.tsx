'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentProgramsPage() {
  const courses = sidhStore.getCourses();
  const [search, setSearch] = useState('');

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.sector.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Qualification Packs (QPs) & Skilling Programs"
        subtitle="Approved curricula aligned with the National Skills Qualifications Framework (NSQF)"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Programs & QPs' },
        ]}
        actions={
          <Link
            href="/government/programs/create"
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>➕</span> Formulate Qualification Pack (QP)
          </Link>
        }
      />

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search QP title, sector, or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">{filtered.length} Active Qualification Packs</span>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Qualification Pack (QP) Title</th>
              <th className="py-3 px-4">Sector Skill Council</th>
              <th className="py-3 px-4">NSQF Level</th>
              <th className="py-3 px-4">Notional Hours</th>
              <th className="py-3 px-4">Delivery Mode</th>
              <th className="py-3 px-4">NCVET Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{c.title}</div>
                  <div className="font-mono text-[11px] text-slate-500">{c.code}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-800">{c.sector}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900">Level {c.nsqfLevel}</td>
                <td className="py-3.5 px-4 text-slate-700">{c.totalHours} Hours</td>
                <td className="py-3.5 px-4 text-slate-600">{c.mode}</td>
                <td className="py-3.5 px-4">
                  <StatusBadge status="Approved" />
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/government/programs/${c.id}`}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
                  >
                    View QP Details
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
