'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';
import { INITIAL_ASSESSMENTS } from '@/lib/sidh-store';

interface AssessmentCardItem {
  id: string;
  name: string;
  skill: string;
  durationMinutes: number;
  questionCount: number;
  passingScore: number;
  difficulty: 'Intermediate' | 'Advanced';
  status: 'Available' | 'In Progress' | 'Completed';
  score?: number;
  completedDate?: string;
}

export default function LearnerAssessmentsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'available' | 'in-progress' | 'completed'>('all');
  const [search, setSearch] = useState('');

  const assessments: AssessmentCardItem[] = [
    {
      id: 'asm-101',
      name: 'Data Structures & Algorithmic Problem Solving',
      skill: 'Algorithms & Problem Solving',
      durationMinutes: 45,
      questionCount: 20,
      passingScore: 75,
      difficulty: 'Intermediate',
      status: 'Completed',
      score: 88,
      completedDate: 'March 8, 2026',
    },
    {
      id: 'asm-102',
      name: 'Web Development & Reactive Frontend Architecture',
      skill: 'React.js & Frontend',
      durationMinutes: 45,
      questionCount: 20,
      passingScore: 75,
      difficulty: 'Intermediate',
      status: 'Available',
    },
    {
      id: 'asm-103',
      name: 'Cloud Infrastructure & Container Deployment Benchmark',
      skill: 'Docker & Cloud DevOps',
      durationMinutes: 60,
      questionCount: 25,
      passingScore: 80,
      difficulty: 'Advanced',
      status: 'Available',
    },
    {
      id: 'asm-104',
      name: 'PostgreSQL Relational Schema & Indexing Benchmark',
      skill: 'PostgreSQL & SQL',
      durationMinutes: 30,
      questionCount: 20,
      passingScore: 75,
      difficulty: 'Intermediate',
      status: 'Available',
    },
  ];

  const filteredAssessments = assessments.filter((asm) => {
    if (activeTab === 'available' && asm.status !== 'Available') return false;
    if (activeTab === 'in-progress' && asm.status !== 'In Progress') return false;
    if (activeTab === 'completed' && asm.status !== 'Completed') return false;

    const matchesSearch =
      asm.name.toLowerCase().includes(search.toLowerCase()) ||
      asm.skill.toLowerCase().includes(search.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* 1. PAGE HEADER */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Skill Assessments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Standardized diagnostic tests to measure and verify competence against national qualification benchmarks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/learner/certificates"
            className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-slate-500" />
            <span>Verified Credentials</span>
          </Link>
        </div>
      </div>

      {/* 2. SUMMARY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Available Assessments
          </span>
          <div className="text-2xl font-bold text-slate-900">
            {assessments.filter((a) => a.status === 'Available').length}
          </div>
          <p className="text-[11px] text-slate-500">Ready for evaluation</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Completed Assessments
          </span>
          <div className="text-2xl font-bold text-emerald-600">
            {assessments.filter((a) => a.status === 'Completed').length}
          </div>
          <p className="text-[11px] text-slate-500">Verified scorecards</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Average Score
          </span>
          <div className="text-2xl font-bold text-blue-700">88%</div>
          <p className="text-[11px] text-slate-500">Passing requirement: ≥ 75%</p>
        </div>
      </div>

      {/* 3. ASSESSMENT LIST WITH TABS */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Assessment Dashboard</h2>
            <p className="text-xs text-slate-500">Proctored benchmark evaluations</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search assessments..."
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
                All ({assessments.length})
              </button>
              <button
                onClick={() => setActiveTab('available')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'available'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Available ({assessments.filter((a) => a.status === 'Available').length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'completed'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Completed ({assessments.filter((a) => a.status === 'Completed').length})
              </button>
            </div>
          </div>
        </div>

        {/* Assessment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssessments.map((asm) => (
            <div
              key={asm.id}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    Skill: {asm.skill}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      asm.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {asm.status === 'Completed' ? `Score: ${asm.score}%` : `Passing: ≥ ${asm.passingScore}%`}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {asm.name}
                </h3>

                <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>Duration: <strong className="text-slate-700 font-medium">{asm.durationMinutes} Mins</strong></span>
                  <span>•</span>
                  <span>Questions: <strong className="text-slate-700 font-medium">{asm.questionCount} Items</strong></span>
                  <span>•</span>
                  <span>Level: <strong className="text-slate-700 font-medium">{asm.difficulty}</strong></span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {asm.status === 'Completed' ? `Cleared on ${asm.completedDate}` : 'Proctored Diagnostic'}
                </span>

                {asm.status === 'Completed' ? (
                  <Link
                    href={`/learner/assessments/${asm.id}/result?score=${asm.score}&correct=18&total=20`}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    View Scorecard
                  </Link>
                ) : (
                  <Link
                    href={`/learner/assessments/${asm.id}`}
                    className="px-4 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    Start Assessment
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
