'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Award,
  Search,
  BookOpen,
} from 'lucide-react';
import { sidhStore, StudentSkill } from '@/lib/sidh-store';

export default function LearnerSkillsPage() {
  const learner = sidhStore.getLearner();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const mySkills: (StudentSkill & { status: 'Assessed' | 'Needs Improvement' | 'Verified' })[] = [
    {
      name: 'JavaScript & Modern ES6+',
      category: 'Programming Languages',
      proficiencyLevel: 'Advanced',
      proficiency: 90,
      verified: true,
      status: 'Assessed',
    },
    {
      name: 'React.js & Component State',
      category: 'Technical Skills',
      proficiencyLevel: 'Advanced',
      proficiency: 85,
      verified: true,
      status: 'Assessed',
    },
    {
      name: 'Python Programming',
      category: 'Programming Languages',
      proficiencyLevel: 'Intermediate',
      proficiency: 70,
      verified: true,
      status: 'Assessed',
    },
    {
      name: 'Relational Databases & SQL',
      category: 'Tools and Technologies',
      proficiencyLevel: 'Intermediate',
      proficiency: 60,
      verified: true,
      status: 'Needs Improvement',
    },
    {
      name: 'Node.js & Express REST APIs',
      category: 'Technical Skills',
      proficiencyLevel: 'Intermediate',
      proficiency: 65,
      verified: true,
      status: 'Assessed',
    },
    {
      name: 'Cloud Architecture & AWS',
      category: 'Tools and Technologies',
      proficiencyLevel: 'Beginner',
      proficiency: 40,
      verified: false,
      status: 'Needs Improvement',
    },
  ];

  const skillGapMatrix = [
    {
      skill: 'Cloud Computing & AWS',
      current: 'Beginner',
      target: 'Intermediate',
      gap: 'High',
      gapColor: 'bg-rose-50 text-rose-700 border-rose-200',
      recommendedCourse: 'Cloud Infrastructure & DevOps Engineering',
      courseId: 'crs-002',
    },
    {
      skill: 'Python Backend Systems',
      current: 'Intermediate',
      target: 'Advanced',
      gap: 'Moderate',
      gapColor: 'bg-amber-50 text-amber-700 border-amber-200',
      recommendedCourse: 'Full Stack Web & Application Development',
      courseId: 'crs-001',
    },
    {
      skill: 'Relational Database SQL',
      current: 'Intermediate',
      target: 'Advanced',
      gap: 'Moderate',
      gapColor: 'bg-amber-50 text-amber-700 border-amber-200',
      recommendedCourse: 'Relational Database Architecture & SQL Analytics',
      courseId: 'crs-003',
    },
    {
      skill: 'Containerization with Docker',
      current: 'Beginner',
      target: 'Intermediate',
      gap: 'High',
      gapColor: 'bg-rose-50 text-rose-700 border-rose-200',
      recommendedCourse: 'Cloud Infrastructure & DevOps Engineering',
      courseId: 'crs-002',
    },
  ];

  const categories = ['All', 'Programming Languages', 'Technical Skills', 'Tools and Technologies'];

  const filteredSkills = mySkills.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* 1. PAGE HEADER */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Skills
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Track your current capabilities, verify competencies through assessments, and identify priority areas for improvement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/learner/assessments"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow-xs transition-colors"
          >
            Take Skill Assessment
          </Link>
        </div>
      </div>

      {/* 2. MY SKILLS INVENTORY */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Current Skills Inventory</h2>
            <p className="text-xs text-slate-500">Verified and logged capabilities associated with your candidate record</p>
          </div>

          {/* Search & Category filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search skills..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 w-40 sm:w-48"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Compact Horizontal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSkills.map((s, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{s.name}</span>
                    {s.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400">{s.category}</span>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded ${
                      s.status === 'Assessed'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {s.status}
                  </span>
                  <div className="font-mono text-xs font-bold text-slate-800 mt-1">
                    {s.proficiency}%
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-1.5 rounded-full ${
                    (s.proficiency || 70) >= 80
                      ? 'bg-emerald-600'
                      : (s.proficiency || 70) >= 60
                      ? 'bg-blue-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${s.proficiency || 70}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>Proficiency: <strong className="text-slate-700 font-medium">{s.proficiencyLevel}</strong></span>
                <Link
                  href="/learner/assessments"
                  className="text-blue-700 font-semibold hover:underline"
                >
                  Benchmark Test →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. SKILL GAP ANALYSIS: Core Skill Track Intelligence */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900">Skill Gap Analysis</h2>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
              Target Role: Full Stack Developer
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Diagnostic comparison between your verified competencies and required national industry benchmarks.
          </p>
        </div>

        {/* Clean, spacious matrix table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Skill</th>
                <th className="py-3 px-4">Current Level</th>
                <th className="py-3 px-4">Target Benchmark</th>
                <th className="py-3 px-4">Gap Severity</th>
                <th className="py-3 px-4 text-right">Actionable Pathway</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {skillGapMatrix.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {item.skill}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.current}
                  </td>
                  <td className="py-3.5 px-4 text-blue-700 font-bold">
                    {item.target}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-bold rounded border ${item.gapColor}`}>
                      {item.gap} Gap
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/learner/courses/${item.courseId}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-2xs"
                    >
                      <span>Learn Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
