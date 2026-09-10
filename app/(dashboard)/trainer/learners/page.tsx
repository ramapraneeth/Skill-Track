'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerMyStudentsPage() {
  const learners = sidhStore.getLearners();
  const [search, setSearch] = useState('');
  const [filterReadiness, setFilterReadiness] = useState('All');

  const studentsList = [
    {
      id: 'learner-1',
      name: 'Arjun Patel',
      email: 'arjun.patel@skillindia.gov.in',
      course: 'Full Stack Web Development (PMKVY 4.0)',
      skillGap: 'SQL Schema Normalization (23% Gap)',
      progress: 71,
      assessmentScore: '84%',
      certification: 'NSQF Level 5 Verified',
      placementReadiness: 'Placement Ready (84%)',
      employmentStatus: 'Interview Scheduled (TCS)',
    },
    {
      id: 'learner-2',
      name: 'Priya Sharma',
      email: 'priya.sharma@skillindia.gov.in',
      course: 'Full Stack Web Development (PMKVY 4.0)',
      skillGap: 'REST API Authentication (35% Gap)',
      progress: 68,
      assessmentScore: '82%',
      certification: 'NSQF Level 5 Verified',
      placementReadiness: 'Placement Ready (80%)',
      employmentStatus: 'Applying (AWS & Infosys)',
    },
    {
      id: 'learner-3',
      name: 'Rahul Verma',
      email: 'rahul.verma@skillindia.gov.in',
      course: 'Full Stack Web Development (PMKVY 4.0)',
      skillGap: 'Docker Containerization (60% Gap)',
      progress: 54,
      assessmentScore: '74%',
      certification: 'Assessment Scheduled',
      placementReadiness: 'In Training (65%)',
      employmentStatus: 'NAPS Apprenticeship Queued',
    },
  ];

  const filtered = studentsList.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchesReadiness = filterReadiness === 'All' || s.placementReadiness.includes(filterReadiness);
    return matchesSearch && matchesReadiness;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Students & Learning Outcome Dossiers"
        subtitle="Track individual candidate competencies, attendance logs, assessment scores, and placement milestones"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'My Students' },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => alert('Cohort skill gap remediation worksheet generated for 3 at-risk candidates.')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#1D4ED8] text-white hover:bg-blue-800 shadow-xs flex items-center gap-1.5"
            >
              <span>⚡</span> Generate Remediation Plan
            </button>
            <button
              onClick={() => alert('Signed batch grade roster exported.')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 shadow-xs"
            >
              Export Batch Roster
            </button>
          </div>
        }
      />

      {/* Filter Toolbar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search candidate name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
          />
        </div>

        <div className="flex gap-2">
          {['All', 'Placement Ready', 'In Training'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterReadiness(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                filterReadiness === f
                  ? 'bg-[#1D4ED8] text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Candidate Profile</th>
              <th className="py-3 px-4">Enrolled Course</th>
              <th className="py-3 px-4">Identified Skill Gap</th>
              <th className="py-3 px-4">Progress %</th>
              <th className="py-3 px-4">Assessment</th>
              <th className="py-3 px-4">Certification</th>
              <th className="py-3 px-4">Placement Readiness</th>
              <th className="py-3 px-4">Employment Status</th>
              <th className="py-3 px-4 text-right">Dossier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((st) => (
              <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900 dark:text-slate-100">{st.name}</div>
                  <div className="text-slate-500 text-[11px]">{st.email}</div>
                </td>
                <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                  {st.course}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-medium text-[11px] border border-amber-200 dark:border-amber-900">
                    {st.skillGap}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                  {st.progress}%
                </td>
                <td className="py-3.5 px-4 font-bold text-[#1D4ED8] dark:text-blue-400">
                  {st.assessmentScore}
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-semibold text-[11px]">
                    {st.certification}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-emerald-700 dark:text-emerald-400">
                  {st.placementReadiness}
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-900 dark:text-slate-100">
                  {st.employmentStatus}
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/trainer/learners/${st.id}`}
                    className="px-2.5 py-1 text-xs font-semibold rounded bg-[#1D4ED8] text-white hover:bg-blue-800 shadow-2xs"
                  >
                    View
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
