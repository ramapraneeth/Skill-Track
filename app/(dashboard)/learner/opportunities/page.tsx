'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { sidhStore } from '@/lib/sidh-store';

export default function LearnerOpportunitiesPage() {
  const [activeTab, setActiveTab] = useState<'listings' | 'applications'>('listings');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedIds, setAppliedIds] = useState<string[]>(['opp-2']); // opp-2 already applied

  const opportunities = sidhStore.getOpportunities();

  const handleApply = (id: string, title: string) => {
    if (!appliedIds.includes(id)) {
      setAppliedIds([...appliedIds, id]);
      alert(`Application submitted successfully for "${title}"! Check the "My Applications" tab to track status.`);
    }
  };

  const filteredOpportunities = opportunities.filter((opp) => {
    const matchesType = selectedType === 'All' || opp.type.toLowerCase() === selectedType.toLowerCase();
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const myApplications = opportunities.filter((opp) => appliedIds.includes(opp.id));

  return (
    <div>
      <PageHeader
        title="Jobs & Apprenticeship Opportunities"
        subtitle="National Apprenticeship Promotion Scheme (NAPS) & verified industry partner openings"
        breadcrumbs={[
          { label: 'Portal', href: '/learner/dashboard' },
          { label: 'Opportunities' },
        ]}
      />

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-6 gap-6">
        <button
          onClick={() => setActiveTab('listings')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'listings'
              ? 'border-[#0B3B60] text-[#0B3B60]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          All Opportunities ({opportunities.length})
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'applications'
              ? 'border-[#0B3B60] text-[#0B3B60]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My Applications ({myApplications.length})
        </button>
      </div>

      {activeTab === 'listings' && (
        <div className="space-y-4">
          {/* Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
            <div className="relative w-full sm:w-80">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
              <input
                type="text"
                placeholder="Search job title, company, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              {['All', 'Job', 'Apprenticeship', 'Internship'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                    selectedType === type
                      ? 'bg-[#0B3B60] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOpportunities.map((opp) => {
              const isApplied = appliedIds.includes(opp.id);
              return (
                <div
                  key={opp.id}
                  className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                          {opp.type}
                        </span>
                        <h3 className="font-semibold text-slate-900 text-base mt-2">{opp.title}</h3>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">{opp.company}</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded">
                        {opp.stipend || opp.salary}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                      <span className="flex items-center gap-1">📍 {opp.location}</span>
                      <span className="text-slate-300">•</span>
                      <span>Sector: {opp.sector}</span>
                      <span className="text-slate-300">•</span>
                      <span>Min NSQF Lvl {opp.minNsqfLevel}</span>
                    </div>

                    <div className="mt-3">
                      <p className="text-[11px] text-slate-500 mb-1.5 font-medium">Key Skills:</p>
                      <div className="flex flex-wrap gap-1.5">
                        {opp.skillsRequired.map((s, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-700 text-[11px] px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      Closes: {new Date(opp.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                    {isApplied ? (
                      <span className="px-3.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-xs font-semibold">
                        ✓ Applied
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApply(opp.id, opp.title)}
                        className="px-4 py-1.5 bg-[#0B3B60] text-white hover:bg-[#082a47] rounded text-xs font-semibold shadow-sm transition-colors"
                      >
                        Apply with SIDH Profile
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'applications' && (
        <div>
          {myApplications.length === 0 ? (
            <EmptyState
              icon="💼"
              title="No Applications Submitted"
              description="Browse and apply to apprenticeships and verified employment opportunities."
              action={{ label: 'Explore Opportunities', href: '#' }}
            />
          ) : (
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Role & Company</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Compensation</th>
                    <th className="py-3 px-4">Application Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{app.title}</div>
                        <div className="text-slate-500 text-[11px]">{app.company}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">{app.type}</td>
                      <td className="py-3.5 px-4 text-slate-600">{app.location}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-800">{app.stipend || app.salary}</td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status="Under Review" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => alert(`Application Details for ${app.title}:\nSIDH Verification: Cleared\nResume Sent: Yes\nNext Steps: Virtual Interview Round 1`)}
                          className="px-2.5 py-1 rounded border border-slate-300 font-medium text-slate-700 hover:bg-slate-100"
                        >
                          View Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
