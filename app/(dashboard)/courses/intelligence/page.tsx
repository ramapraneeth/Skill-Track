'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Filter,
  Search,
  Star,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Scale,
} from 'lucide-react';
import { INITIAL_COURSES, CourseIntelligenceRecord } from '@/lib/store/skillbridge-store';

export default function CourseIntelligencePage() {
  const [courses, setCourses] = useState<CourseIntelligenceRecord[]>(INITIAL_COURSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [minPlacementRate, setMinPlacementRate] = useState<number>(0);

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = categoryFilter === 'ALL' || c.category === categoryFilter;
    const matchesRate = c.placementRatePct >= minPlacementRate;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillsCovered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesRate && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#0B3B60] uppercase tracking-wider bg-[#E0F2FE] px-2.5 py-0.5 rounded-full border border-[#BAE6FD]">
              Central Course Intelligence Registry
            </span>
            <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified Outcomes
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#102A43] tracking-tight mt-1">
            Course-to-Placement Intelligence Database
          </h1>
          <p className="text-xs text-[#627D98] mt-1 max-w-2xl leading-relaxed">
            Move beyond superficial popularity metrics. Transparently evaluate every accredited curriculum by its
            verifiable employment outcome, certification conversion, and real wage progression.
          </p>
        </div>

        <Link
          href="/courses/compare"
          className="h-10 px-5 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all shrink-0"
        >
          <Scale className="w-4 h-4 text-[#FF9933]" />
          <span>Compare 2 Courses Side-by-Side</span>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course, skill or provider..."
            className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white"
          >
            <option value="ALL">All Categories</option>
            <option value="Software Development">Software Development</option>
            <option value="Data Analytics">Data Analytics</option>
            <option value="Cloud & Infrastructure">Cloud & Infrastructure</option>
            <option value="Artificial Intelligence">Artificial Intelligence</option>
            <option value="Cybersecurity">Cybersecurity</option>
          </select>

          <select
            value={minPlacementRate}
            onChange={(e) => setMinPlacementRate(Number(e.target.value))}
            className="h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white"
          >
            <option value="0">All Placement Rates</option>
            <option value="60">&gt; 60% Placement Rate</option>
            <option value="65">&gt; 65% Placement Rate</option>
          </select>
        </div>
      </div>

      {/* Course Cards with Detailed Breakdown */}
      <div className="space-y-4">
        {filteredCourses.map((course) => {
          return (
            <div
              key={course.id}
              className="bg-white border border-[#CBD5E1] rounded-lg p-5 shadow-xs hover:border-[#0B3B60] transition-all space-y-4"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left: Title & Meta */}
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]">
                      {course.category}
                    </span>
                    <span className="text-xs font-mono text-[#64748B]">{course.courseCode}</span>
                    <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {course.studentRating}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#102A43]">
                    {course.title}
                  </h3>
                  <p className="text-xs text-[#627D98]">
                    Accredited Provider: <strong>{course.provider}</strong> • Master Trainer: <strong>{course.trainerName}</strong>
                  </p>
                </div>

                {/* Right: Course Impact Score */}
                <div className="flex items-center gap-4 bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg shrink-0">
                  <div className="text-right">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                      Course Impact Score
                    </div>
                    <div className="text-2xl font-black text-[#0B3B60]">
                      {course.courseImpactScore} <span className="text-xs font-semibold text-[#64748B]">/ 100</span>
                    </div>
                    <div className="text-[10px] text-emerald-700 font-bold">
                      ★★★★★ {course.courseImpactScore >= 90 ? 'Excellent Employment Impact' : 'High Impact'}
                    </div>
                  </div>
                </div>
              </div>

              {/* OUTCOME STATS GRID: "How many completed? How many placed?" */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-[#F0F9FF] border border-[#BAE6FD] p-3.5 rounded-lg text-xs">
                <div className="bg-white p-2.5 rounded border border-[#E0F2FE]">
                  <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Enrolled</span>
                  <strong className="text-[#102A43] text-sm">{course.enrolledCount}</strong>
                </div>
                <div className="bg-white p-2.5 rounded border border-[#E0F2FE]">
                  <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Completed</span>
                  <strong className="text-[#0B3B60] text-sm">{course.completedCount}</strong>
                </div>
                <div className="bg-white p-2.5 rounded border border-[#E0F2FE]">
                  <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Certified</span>
                  <strong className="text-[#0B3B60] text-sm">{course.certifiedCount}</strong>
                </div>
                <div className="bg-white p-2.5 rounded border border-[#E0F2FE]">
                  <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Placement Ready</span>
                  <strong className="text-[#0B3B60] text-sm">{course.placementReadyCount}</strong>
                </div>
                <div className="bg-white p-2.5 rounded border border-[#E0F2FE]">
                  <span className="text-[10px] text-emerald-700 block uppercase font-semibold">Placed</span>
                  <strong className="text-emerald-700 text-sm font-black">{course.placedCount}</strong>
                </div>
                <div className="bg-white p-2.5 rounded border border-[#E0F2FE]">
                  <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Placement Rate</span>
                  <strong className="text-[#0B3B60] text-sm font-black">{course.placementRatePct}%</strong>
                </div>
              </div>

              {/* 6 Measurable Impact Factors */}
              <div className="pt-2 border-t border-[#E2E8F0] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-[11px] text-[#475569]">
                <div>Skill Improvement: <strong className="text-[#102A43]">{course.impactBreakdown.skillImprovementPct}%</strong></div>
                <div>Completion: <strong className="text-[#102A43]">{course.impactBreakdown.completionRatePct}%</strong></div>
                <div>Assessment: <strong className="text-[#102A43]">{course.impactBreakdown.assessmentAvgPct}%</strong></div>
                <div>Certification: <strong className="text-[#102A43]">{course.impactBreakdown.certificationRatePct}%</strong></div>
                <div>Placement: <strong className="text-[#102A43]">{course.impactBreakdown.placementRatePct}%</strong></div>
                <div>Industry Relevance: <strong className="text-[#102A43]">{course.impactBreakdown.industryRelevancePct}%</strong></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
