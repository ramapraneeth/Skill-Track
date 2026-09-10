'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function StudentCoursesPage() {
  const [activeTab, setActiveTab] = useState<'recommendations' | 'all'>('recommendations');
  const [search, setSearch] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');

  const courses = sidhStore.getCourses();

  const recommendedCourses = [
    {
      ...courses[0],
      impactScore: 89,
      placementRate: '76.5%',
      avgSalary: '₹5.8 LPA',
      placedCount: 620,
      whyRecommended: 'Recommended because it directly bridges 3 high-priority missing skills for your target role "Full Stack Web Developer".',
    },
    {
      ...courses[2] || courses[0],
      id: 'crs-004',
      title: 'DevOps Engineering, Docker Containers & Kubernetes',
      sector: 'IT-ITeS & Cloud',
      nsqfLevel: 7,
      totalHours: 320,
      impactScore: 92,
      placementRate: '74.2%',
      avgSalary: '₹7.8 LPA',
      placedCount: 240,
      whyRecommended: 'Recommended based on rapid national industry demand growth (+58%) and critical regional talent shortage.',
    },
    {
      ...courses[1] || courses[0],
      id: 'crs-003',
      title: 'Enterprise Business Intelligence & Power BI Data Modeling',
      sector: 'BFSI & IT',
      nsqfLevel: 5,
      totalHours: 160,
      impactScore: 87,
      placementRate: '66.7%',
      avgSalary: '₹5.4 LPA',
      placedCount: 510,
      whyRecommended: 'Recommended to expand secondary data analytics and reporting capabilities for business-facing engineering roles.',
    },
  ];

  const displayedCourses = activeTab === 'recommendations' ? recommendedCourses : courses.map(c => ({
    ...c,
    impactScore: 85,
    placementRate: '71.2%',
    avgSalary: '₹5.2 LPA',
    placedCount: 380,
    whyRecommended: 'Standard accredited NSQF curriculum aligned with National Occupational Standards.',
  }));

  const filtered = displayedCourses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.sector.toLowerCase().includes(search.toLowerCase());
    const matchesSector = selectedSector === 'All' || c.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Courses & Employment Outcome Intelligence"
        subtitle="AI recommended curricula evaluated by employment conversion rates, industry relevance, and verified placement outcomes"
        breadcrumbs={[
          { label: 'Student Portal', href: '/learner/dashboard' },
          { label: 'Courses' },
        ]}
      />

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6">
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeTab === 'recommendations'
              ? 'border-[#1D4ED8] text-[#1D4ED8] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span>⚡</span> AI Course Recommendations ({recommendedCourses.length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'all'
              ? 'border-[#1D4ED8] text-[#1D4ED8] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          National Course Catalog ({courses.length})
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search course title or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
          />
        </div>

        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
        >
          <option value="All">All Industry Sectors</option>
          <option value="IT-ITeS">IT-ITeS</option>
          <option value="BFSI & IT">BFSI & IT</option>
          <option value="Cybersecurity">Cybersecurity</option>
        </select>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Card Header with Impact Score */}
              <div className="p-4 bg-slate-50/80 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded">
                    {course.sector}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-[#1D4ED8] dark:text-blue-400">{course.impactScore}</span>
                    <span className="text-[10px] text-slate-400 font-bold">/100 Impact</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">NSQF Level {course.nsqfLevel} • {course.totalHours} Hours</p>
              </div>

              {/* Recommendation Reason Banner */}
              {course.whyRecommended && (
                <div className="p-3 bg-blue-50/50 dark:bg-blue-950/40 border-b border-blue-100 dark:border-blue-900/60 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-1.5">
                  <span className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 font-bold">💡</span>
                  <span>{course.whyRecommended}</span>
                </div>
              )}

              {/* Placement Outcomes Strip */}
              <div className="p-4 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Placement Rate</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{course.placementRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Avg Salary</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">{course.avgSalary}</span>
                  </div>
                </div>

                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Verified Placed:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{course.placedCount} Candidates</strong>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <Link
                href={`/learner/courses/${course.id}`}
                className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-[#1D4ED8]"
              >
                View Syllabus →
              </Link>
              <Link
                href={`/learner/courses/${course.id}`}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-white shadow-2xs"
              >
                Placement Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
