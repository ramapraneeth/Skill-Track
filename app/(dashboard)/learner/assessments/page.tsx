'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  Clock,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Award,
  Search,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { INITIAL_ASSESSMENTS, AssessmentRecord } from '@/lib/sidh-store';

export default function LearnerAssessmentsPage() {
  const [activeTab, setActiveTab] = useState<'available' | 'completed' | 'upcoming'>('available');
  const [search, setSearch] = useState('');

  const assessments = INITIAL_ASSESSMENTS;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Skill Assessments & Proctoring"
        subtitle="Standardized diagnostic tests to measure and verify competence against national vocational standards"
        badge="Competency Benchmark"
        actions={
          <Link
            href="/learner/assessments/results"
            className="h-9 px-4 rounded border border-[#CBD5E1] bg-white hover:bg-[#F1F5F9] text-[#0F172A] font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-[#0B3B60]" />
            <span>View Historical Results</span>
          </Link>
        }
      />

      {/* Tabs */}
      <div className="bg-white border border-[#CBD5E1] rounded-lg p-2 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'available' ? 'bg-[#0B3B60] text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
          >
            Available Tests ({assessments.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'completed' ? 'bg-[#0B3B60] text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
          >
            Completed (1)
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`px-4 py-2 rounded text-xs font-bold transition-all ${
              activeTab === 'upcoming' ? 'bg-[#0B3B60] text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
            }`}
          >
            Upcoming (2)
          </button>
        </div>

        <div className="relative w-64 hidden sm:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search assessments..."
            className="w-full h-8 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
          />
        </div>
      </div>

      {/* List of Assessments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {assessments.map((asm) => (
          <div
            key={asm.id}
            className="bg-white border border-[#CBD5E1] rounded-lg p-5 shadow-xs hover:border-[#0B3B60] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#0B3B60] border border-[#CBD5E1]">
                  Skill: {asm.skill}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Passing: {asm.passingScore}%
                </span>
              </div>

              <h3 className="text-base font-bold text-[#0F172A] leading-snug">{asm.title}</h3>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                Evaluates algorithmic problem solving, object oriented patterns, and performance optimization.
              </p>

              <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-[#E2E8F0] text-xs text-[#475569]">
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">Duration:</span>
                  <strong>{asm.durationMinutes} Minutes</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">Questions:</span>
                  <strong>{asm.questionCount} MCQs</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">Level:</span>
                  <strong>{asm.difficulty}</strong>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-[11px] text-[#64748B]">Proctored Benchmark</span>
              <Link
                href={`/learner/assessments/${asm.id}`}
                className="px-4 py-2 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>View Instructions</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
