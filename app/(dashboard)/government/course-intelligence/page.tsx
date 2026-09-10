'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface CourseIntelligenceItem {
  id: string;
  course: string;
  provider: string;
  institution: string;
  state: string;
  district: string;
  industry: string;
  enrollment: number;
  completion: number;
  certification: number;
  placement: number;
  placementRate: number; // in %
  impactScore: number; // 0 to 100
  avgSalary: string;
}

const COURSES_DATA: CourseIntelligenceItem[] = [
  {
    id: 'c-1',
    course: 'Full Stack Web Development & React Architecture',
    provider: 'National Skill Development Corporation (NSDC)',
    institution: 'National Skill Training Institute, Hyderabad',
    state: 'Telangana',
    district: 'Hyderabad',
    industry: 'IT-ITeS',
    enrollment: 1250,
    completion: 1080,
    certification: 940,
    placement: 620,
    placementRate: 76.5,
    impactScore: 89,
    avgSalary: '₹5.8 LPA',
  },
  {
    id: 'c-2',
    course: 'Enterprise Business Intelligence & Power BI Data Modeling',
    provider: 'Gujarat Skill Development Mission',
    institution: 'Gujarat State Vocational Institute, Ahmedabad',
    state: 'Gujarat',
    district: 'Ahmedabad',
    industry: 'BFSI & IT',
    enrollment: 980,
    completion: 860,
    certification: 810,
    placement: 540,
    placementRate: 66.7,
    impactScore: 87,
    avgSalary: '₹5.4 LPA',
  },
  {
    id: 'c-3',
    course: 'DevOps Engineering, Docker Containers & Kubernetes',
    provider: 'Ministry of Skill Development & Entrepreneurship',
    institution: 'Regional Advanced Technology Hub, Lucknow',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    industry: 'IT-ITeS',
    enrollment: 650,
    completion: 580,
    certification: 530,
    placement: 410,
    placementRate: 77.3,
    impactScore: 92,
    avgSalary: '₹7.8 LPA',
  },
  {
    id: 'c-4',
    course: 'Cyber Defense, SOC Operations & Threat Hunting',
    provider: 'National Critical Info Protection Centre',
    institution: 'National Cyber Range Facility, Chennai',
    state: 'Tamil Nadu',
    district: 'Chennai',
    industry: 'Cybersecurity',
    enrollment: 480,
    completion: 420,
    certification: 390,
    placement: 280,
    placementRate: 71.8,
    impactScore: 90,
    avgSalary: '₹6.8 LPA',
  },
  {
    id: 'c-5',
    course: 'Electric Vehicle Powertrain & Battery Diagnostics',
    provider: 'Automotive Skill Development Council',
    institution: 'Automotive Training Center, Pune',
    state: 'Maharashtra',
    district: 'Pune',
    industry: 'Automotive',
    enrollment: 840,
    completion: 720,
    certification: 680,
    placement: 520,
    placementRate: 76.4,
    impactScore: 91,
    avgSalary: '₹4.8 LPA',
  },
  {
    id: 'c-6',
    course: 'Solar PV Plant Grid Synchronization & Inspection',
    provider: 'Renewable Energy Skill Council',
    institution: 'Solar Energy Corporation Training Institute, Jaipur',
    state: 'Rajasthan',
    district: 'Jaipur',
    industry: 'Renewable Energy',
    enrollment: 720,
    completion: 640,
    certification: 590,
    placement: 410,
    placementRate: 69.5,
    impactScore: 84,
    avgSalary: '₹4.2 LPA',
  },
];

export default function GovernmentCourseIntelligencePage() {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [minPlacementRate, setMinPlacementRate] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'impact' | 'placement' | 'enrollment'>('impact');

  const states = ['All', 'Telangana', 'Gujarat', 'Uttar Pradesh', 'Tamil Nadu', 'Maharashtra', 'Rajasthan'];
  const industries = ['All', 'IT-ITeS', 'BFSI & IT', 'Cybersecurity', 'Automotive', 'Renewable Energy'];

  const filtered = COURSES_DATA.filter((item) => {
    const matchesSearch =
      item.course.toLowerCase().includes(search.toLowerCase()) ||
      item.provider.toLowerCase().includes(search.toLowerCase()) ||
      item.institution.toLowerCase().includes(search.toLowerCase());
    const matchesState = selectedState === 'All' || item.state === selectedState;
    const matchesIndustry = selectedIndustry === 'All' || item.industry === selectedIndustry;
    const matchesRate = item.placementRate >= minPlacementRate;
    return matchesSearch && matchesState && matchesIndustry && matchesRate;
  }).sort((a, b) => {
    if (sortBy === 'impact') return b.impactScore - a.impactScore;
    if (sortBy === 'placement') return b.placementRate - a.placementRate;
    return b.enrollment - a.enrollment;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Course Intelligence & Outcome Matrix"
        subtitle="Evaluate all accredited curricula by enrollment numbers, completion rates, certified graduates, and verified placement conversion"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Course Intelligence' },
        ]}
        actions={
          <button
            onClick={() => alert('Course outcome audit ledger exported as signed government spreadsheet.')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#1D4ED8] text-white hover:bg-blue-800 shadow-xs flex items-center gap-1.5"
          >
            <span>📥</span> Export Course Outcome Ledger
          </button>
        }
      />

      {/* Multi-Filter Bar as requested in Section 13 */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
          <span className="font-bold text-xs text-slate-800 dark:text-slate-200 uppercase tracking-wider">
            Multi-Dimensional Course Filters & Sort Matrix
          </span>
          <span className="text-xs text-slate-500">{filtered.length} Courses Analyzed</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
          <div>
            <label className="block text-slate-500 font-medium mb-1">Search Keywords</label>
            <input
              type="text"
              placeholder="Course, Provider, or Institution..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">State / UT</label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Industry Sector</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-1.5 border rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Min. Placement Rate</label>
            <select
              value={minPlacementRate}
              onChange={(e) => setMinPlacementRate(Number(e.target.value))}
              className="w-full px-3 py-1.5 border rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            >
              <option value={0}>All Placement Rates</option>
              <option value={60}>60% + Placement</option>
              <option value={70}>70% + Placement</option>
              <option value={75}>75% + High Placement</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Sort Matrix By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-1.5 border rounded-lg border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold text-[#1D4ED8] dark:text-blue-400"
            >
              <option value="impact">AI Course Impact Score</option>
              <option value="placement">Placement Conversion Rate</option>
              <option value="enrollment">Total Student Enrollment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Intelligence Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Course & Training Institution</th>
              <th className="py-3 px-4">Provider / State</th>
              <th className="py-3 px-4">Enrollment</th>
              <th className="py-3 px-4">Completion</th>
              <th className="py-3 px-4">Certification</th>
              <th className="py-3 px-4">Placed</th>
              <th className="py-3 px-4">Placement Rate</th>
              <th className="py-3 px-4">Impact Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900 dark:text-slate-100">{item.course}</div>
                  <div className="text-slate-500 text-[11px]">{item.institution}</div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="text-slate-800 dark:text-slate-200 font-medium">{item.provider}</div>
                  <div className="text-slate-500 text-[11px]">{item.district}, {item.state}</div>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                  {item.enrollment.toLocaleString()}
                </td>
                <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                  {item.completion.toLocaleString()}
                  <span className="text-[10px] text-slate-400 block">({Math.round((item.completion / item.enrollment) * 100)}%)</span>
                </td>
                <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">
                  {item.certification.toLocaleString()}
                  <span className="text-[10px] text-slate-400 block">({Math.round((item.certification / item.completion) * 100)}%)</span>
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-700 dark:text-emerald-400">
                  {item.placement.toLocaleString()}
                </td>
                <td className="py-3.5 px-4">
                  <div className="w-24 space-y-1">
                    <ProgressBar value={item.placementRate} max={100} color="#10b981" />
                    <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-xs">
                      {item.placementRate}%
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-extrabold text-[#1D4ED8] dark:text-blue-400">
                      {item.impactScore}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">/100</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
