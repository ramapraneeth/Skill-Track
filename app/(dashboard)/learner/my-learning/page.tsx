'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  FileCheck2,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { getLearner, getCourses } from '@/lib/sidh-store';

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState<'in_progress' | 'completed' | 'saved'>('in_progress');
  const learner = getLearner();
  const courses = getCourses();

  const enrolled = courses.filter((c) => learner.enrolledCourseIds.includes(c.id));
  const completed = courses.filter((c) => learner.completedCourseIds.includes(c.id));

  const displayed = activeTab === 'completed' ? completed : enrolled;

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Learning & Course Progression"
        subtitle="Manage enrolled training programs, lecture modules, assessment milestones, and verified credentials"
        badge="Active Enrolment"
      />

      {/* Tabs */}
      <div className="bg-white border border-[#CBD5E1] rounded-lg p-2 flex items-center gap-1 shadow-xs text-xs">
        <button
          onClick={() => setActiveTab('in_progress')}
          className={`px-4 py-2 rounded font-bold transition-all ${
            activeTab === 'in_progress' ? 'bg-[#0B3B60] text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
          }`}
        >
          In Progress ({enrolled.length})
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded font-bold transition-all ${
            activeTab === 'completed' ? 'bg-[#0B3B60] text-white' : 'text-[#475569] hover:bg-[#F1F5F9]'
          }`}
        >
          Completed ({completed.length})
        </button>
      </div>

      {/* Course Cards */}
      <div className="space-y-4">
        {displayed.map((c) => {
          const isDone = learner.completedCourseIds.includes(c.id);
          const progressVal = isDone ? 100 : 65;

          return (
            <div
              key={c.id}
              className="bg-white border border-[#CBD5E1] rounded-lg p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#0B3B60] transition-all"
            >
              <div className="space-y-2.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569]">
                    {c.sector}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">{c.code}</span>
                  <StatusBadge status={isDone ? 'Completed' : 'In Progress'} />
                </div>

                <h3 className="text-base font-bold text-[#0F172A]">{c.title}</h3>
                <p className="text-xs text-[#64748B]">
                  Instructor: <strong>{c.trainerName}</strong> • Provider: {c.provider}
                </p>

                <div className="pt-2 w-full sm:w-80">
                  <ProgressBar value={progressVal} label="Curriculum Progress" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 shrink-0">
                <Link
                  href={`/learner/training/btc-01`}
                  className="px-4 py-2 rounded border border-[#CBD5E1] hover:bg-[#F1F5F9] text-[#0F172A] font-bold text-xs flex items-center gap-1.5 transition-colors w-full sm:w-auto justify-center"
                >
                  <span>Training Batch Details</span>
                </Link>

                <Link
                  href={`/learner/courses/${c.id}`}
                  className="px-4 py-2 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs w-full sm:w-auto justify-center"
                >
                  <span>Continue Curriculum</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
