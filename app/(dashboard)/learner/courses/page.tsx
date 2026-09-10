'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Search,
  CheckCircle2,
  Clock,
  Award,
} from 'lucide-react';
import { sidhStore } from '@/lib/sidh-store';

interface CourseCardData {
  id: string;
  title: string;
  skill: string;
  shortDescription: string;
  nsqfLevel: number;
  totalHours: number;
  progress?: number;
  status: 'In Progress' | 'Completed' | 'Available';
  bridgesGap?: string;
}

export default function LearnerCoursesPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [search, setSearch] = useState('');

  const courses: CourseCardData[] = [
    {
      id: 'crs-001',
      title: 'Full Stack Web & Application Development',
      skill: 'React.js & Node.js',
      shortDescription: 'Modern responsive frontend architecture, enterprise REST API handlers, and PostgreSQL schema design.',
      nsqfLevel: 5,
      totalHours: 200,
      progress: 68,
      status: 'In Progress',
      bridgesGap: 'Bridges Backend Architecture Gap',
    },
    {
      id: 'crs-002',
      title: 'Cloud Infrastructure & DevOps Engineering',
      skill: 'Docker & Kubernetes',
      shortDescription: 'Containerization protocols, CI/CD pipeline automation, and production cloud orchestration.',
      nsqfLevel: 6,
      totalHours: 240,
      progress: 24,
      status: 'In Progress',
      bridgesGap: 'Bridges Containerization Gap',
    },
    {
      id: 'crs-003',
      title: 'Relational Database Architecture & SQL Analytics',
      skill: 'PostgreSQL & SQL',
      shortDescription: 'Data normalization, ACID transactions, index optimization, and advanced SQL query performance.',
      nsqfLevel: 5,
      totalHours: 160,
      progress: 100,
      status: 'Completed',
      bridgesGap: 'Bridges Database Optimization Gap',
    },
    {
      id: 'crs-004',
      title: 'Modern TypeScript & Enterprise Frontend Design',
      skill: 'TypeScript & Next.js',
      shortDescription: 'Advanced static typing, generic state machines, server components, and production performance tuning.',
      nsqfLevel: 5,
      totalHours: 120,
      status: 'Available',
      bridgesGap: 'Bridges Frontend Type-Safety Gap',
    },
    {
      id: 'crs-005',
      title: 'Distributed Systems & Microservices Architecture',
      skill: 'System Design & APIs',
      shortDescription: 'Asynchronous event streaming, caching topologies, API gateway patterns, and fault tolerance.',
      nsqfLevel: 7,
      totalHours: 180,
      status: 'Available',
      bridgesGap: 'Bridges System Architecture Gap',
    },
  ];

  const activeHeroCourse = courses.find((c) => c.status === 'In Progress') || courses[0];

  const filteredCourses = courses.filter((c) => {
    if (activeTab === 'in-progress' && c.status !== 'In Progress') return false;
    if (activeTab === 'completed' && c.status !== 'Completed') return false;

    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skill.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  const recommendedCourses = courses.filter((c) => c.status === 'Available');

  return (
    <div className="space-y-8">
      {/* 1. PAGE HEADER */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Learning Catalogue
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Accredited curricula aligned with National Skills Qualification Framework (NSQF) standards.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/learner/certificates"
            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-slate-500" />
            <span>Earned Credentials</span>
          </Link>
        </div>
      </div>

      {/* 2. CONTINUE LEARNING: Active Course Hero */}
      {activeHeroCourse && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Continue Learning
            </span>
            <span className="text-xs text-slate-500 font-medium">
              NSQF Level {activeHeroCourse.nsqfLevel} • {activeHeroCourse.totalHours} Hours
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <h2 className="text-lg font-bold text-slate-900">
                {activeHeroCourse.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeHeroCourse.shortDescription}
              </p>
              <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-1">
                <span>Skill Target: <strong className="text-slate-800">{activeHeroCourse.skill}</strong></span>
                <span>•</span>
                <span className="text-emerald-700 font-medium">{activeHeroCourse.bridgesGap}</span>
              </div>
            </div>

            <div className="w-full md:w-64 space-y-2.5 shrink-0">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Course Progress</span>
                <span className="text-blue-700">{activeHeroCourse.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-700 h-2 rounded-full"
                  style={{ width: `${activeHeroCourse.progress}%` }}
                />
              </div>
              <Link
                href={`/learner/courses/${activeHeroCourse.id}`}
                className="w-full block text-center py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-xs"
              >
                Resume Course
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 3. MY LEARNING: Filterable Catalogue */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">My Learning</h2>
            <p className="text-xs text-slate-500">Your enrolled courses and ongoing pathways</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-600 w-full sm:w-56"
              />
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({courses.length})
              </button>
              <button
                onClick={() => setActiveTab('in-progress')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'in-progress'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                In Progress ({courses.filter((c) => c.status === 'In Progress').length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'completed'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Completed ({courses.filter((c) => c.status === 'Completed').length})
              </button>
            </div>
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    NSQF Level {c.nsqfLevel}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      c.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : c.status === 'In Progress'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                  {c.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {c.shortDescription}
                </p>

                <div className="text-[11px] text-slate-500 pt-1">
                  <span>Skill: <strong className="text-slate-700 font-medium">{c.skill}</strong></span>
                  <span className="block text-slate-400 mt-0.5">{c.totalHours} Notional Hours</span>
                </div>
              </div>

              {/* Progress & Actions */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                {c.status !== 'Available' && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-semibold">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-slate-800">{c.progress || 0}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          c.status === 'Completed' ? 'bg-emerald-600' : 'bg-blue-700'
                        }`}
                        style={{ width: `${c.progress || 0}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-emerald-700 font-semibold line-clamp-1">
                    {c.bridgesGap}
                  </span>

                  <Link
                    href={`/learner/courses/${c.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shrink-0"
                  >
                    {c.status === 'In Progress' ? 'Continue' : c.status === 'Completed' ? 'Review' : 'View Course'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. RECOMMENDED LEARNING: Directly Mapped to Skill Gaps */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Recommended for Your Skill Gaps</h2>
          <p className="text-xs text-slate-500">
            Targeted curricula recommended based on your verified assessment diagnostics and career target.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendedCourses.map((rc) => (
            <div
              key={rc.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 flex items-start justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    NSQF Level {rc.nsqfLevel}
                  </span>
                  <span className="text-[11px] text-slate-500">{rc.totalHours} Hours</span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{rc.title}</h3>
                <p className="text-[11px] text-emerald-700 font-medium">{rc.bridgesGap}</p>
              </div>

              <Link
                href={`/learner/courses/${rc.id}`}
                className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shrink-0"
              >
                Enroll Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
