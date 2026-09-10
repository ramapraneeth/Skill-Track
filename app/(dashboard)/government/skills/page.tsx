'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentSkillsPage() {
  const skills = sidhStore.getSkills();
  const [search, setSearch] = useState('');

  const filtered = skills.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.sector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Skill Taxonomy & Demand-Supply Radar"
        subtitle="Catalog of verified industry competencies mapped to NSQF levels, demand indices, and employment absorption"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Skill Taxonomy' },
        ]}
        actions={
          <Link
            href="/government/skills/create"
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>➕</span> Add Skill to Taxonomy
          </Link>
        }
      />

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search skill name or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">{filtered.length} Skills Cataloged</span>
      </div>

      {/* Skills Taxonomy Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Skill Competency Name</th>
              <th className="py-3 px-4">Sector Affiliation</th>
              <th className="py-3 px-4">National Demand Index</th>
              <th className="py-3 px-4">Supply Pipeline (Trained)</th>
              <th className="py-3 px-4">Target NSQF Levels</th>
              <th className="py-3 px-4">Market Outlook</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((sk) => (
              <tr key={sk.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{sk.name}</div>
                  <div className="text-slate-500 text-[11px] line-clamp-1">{sk.description}</div>
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-800">{sk.sector}</td>
                <td className="py-3.5 px-4">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      sk.demandLevel === 'High'
                        ? 'bg-red-100 text-red-800'
                        : sk.demandLevel === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {sk.demandLevel} Demand
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-900">
                  {sk.relatedJobRoles.length * 1200} Candidates Active
                </td>
                <td className="py-3.5 px-4 text-slate-700">Level 4 to 6</td>
                <td className="py-3.5 px-4">
                  <span className="text-emerald-700 font-semibold text-[11px]">High Growth (+24% YoY)</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
