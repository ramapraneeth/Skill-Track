'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Sparkles,
  Target,
  ShieldCheck,
} from 'lucide-react';
import { sidhStore } from '@/lib/sidh-store';

export default function LearnerDashboardPage() {
  const learner = sidhStore.getLearner();
  const courses = sidhStore.getCourses();
  const certs = sidhStore.getCertificates();

  const activeCourses = [
    {
      id: 'crs-001',
      title: 'Full Stack Web & Application Development',
      skill: 'React.js & Node.js',
      progress: 68,
      currentModule: 'Module 3: Enterprise REST APIs & Prisma ORM',
      totalHours: 200,
    },
    {
      id: 'crs-002',
      title: 'Cloud Infrastructure & DevOps Engineering',
      skill: 'Docker & Kubernetes',
      progress: 24,
      currentModule: 'Module 1: Containerization Fundamentals',
      totalHours: 240,
    },
  ];

  const currentSkills = [
    { name: 'JavaScript / TypeScript', level: 'Advanced', verified: true },
    { name: 'React.js & Modern UI', level: 'Advanced', verified: true },
    { name: 'Relational SQL', level: 'Intermediate', verified: true },
  ];

  const skillGaps = [
    { name: 'Cloud & Containerization', gap: 'High', target: 'Intermediate' },
    { name: 'Backend API Security', gap: 'Moderate', target: 'Advanced' },
    { name: 'System Design Patterns', gap: 'Moderate', target: 'Intermediate' },
  ];

  const recommendedSkills = [
    { name: 'Docker & Kubernetes', reason: 'Required for target Full Stack Developer role' },
    { name: 'Next.js App Router', reason: 'High employer hiring demand in your region' },
  ];

  const recommendedCourses = [
    {
      id: 'crs-003',
      title: 'Relational Database Architecture & SQL Analytics',
      level: 'NSQF Level 5',
      duration: '160 Hours',
      bridges: 'Bridges 25% gap in Database Optimization',
    },
    {
      id: 'crs-004',
      title: 'Modern TypeScript & Enterprise Frontend Design',
      level: 'NSQF Level 5',
      duration: '120 Hours',
      bridges: 'Bridges 20% gap in Type-Safe State Architecture',
    },
  ];

  return (
    <div className="space-y-8">
      {/* 1. WELCOME HEADER */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Welcome back, {learner?.name || 'Arjun Patel'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Continue building your skills and move closer to your career goal as a{' '}
            <strong className="text-slate-800 font-semibold">{learner?.targetRole || 'Full Stack Web Developer'}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/learner/skills"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors shadow-xs"
          >
            Review Skill Gaps
          </Link>
          <Link
            href="/learner/profile"
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors"
          >
            Skill Passport
          </Link>
        </div>
      </div>

      {/* 2. HIGH-VALUE SUMMARY METRIC CARDS (Small number, spacious) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Profile Completion
          </span>
          <div className="text-2xl font-bold text-slate-900">85%</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: '85%' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Skill Readiness
          </span>
          <div className="text-2xl font-bold text-blue-700">78%</div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '78%' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Enrolled Courses
          </span>
          <div className="text-2xl font-bold text-slate-900">4 Active</div>
          <p className="text-[11px] text-slate-500 mt-1">2 in active progress</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Certificates
          </span>
          <div className="text-2xl font-bold text-emerald-600">{certs.length || 3} Verified</div>
          <p className="text-[11px] text-slate-500 mt-1">NSQF accredited</p>
        </div>
      </div>

      {/* 3. YOUR LEARNING: Active In-Progress Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Your Learning</h2>
            <p className="text-xs text-slate-500">Pick up right where you left off</p>
          </div>
          <Link
            href="/learner/courses"
            className="text-xs font-semibold text-blue-700 hover:underline"
          >
            View All Courses →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {course.skill}
                  </span>
                  <span className="font-semibold text-slate-500 text-[11px]">
                    {course.totalHours} Hours
                  </span>
                </div>

                <h3 className="font-bold text-sm text-slate-900 leading-snug">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500">
                  Current: <strong className="text-slate-700 font-medium">{course.currentModule}</strong>
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-semibold">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-blue-700">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-700 h-1.5 rounded-full" style={{ width: `${course.progress}%` }} />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    href={`/learner/courses/${course.id}`}
                    className="px-4 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SKILL DEVELOPMENT: Clean 3-Column Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Skill Development</h2>
          <p className="text-xs text-slate-500">
            A clear overview of what you have mastered, what you are missing, and what to focus on next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Column 1: Current Skills */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Current Skills
            </span>
            <div className="space-y-2">
              {currentSkills.map((s, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800">{s.name}</span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {s.level}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Skill Gaps */}
          <div className="space-y-3 md:pl-6 pt-4 md:pt-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Identified Skill Gaps
            </span>
            <div className="space-y-2">
              {skillGaps.map((g, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800">{g.name}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    g.gap === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    {g.gap} Gap
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Recommended Next Skills */}
          <div className="space-y-3 md:pl-6 pt-4 md:pt-0">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Recommended Skills
            </span>
            <div className="space-y-2">
              {recommendedSkills.map((r, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5 text-xs"
                >
                  <span className="font-bold text-slate-800 block">{r.name}</span>
                  <p className="text-[11px] text-slate-500">{r.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. TWO-COLUMN: Recommended for You & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Recommended for You (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Recommended for You</h2>
            <Link href="/learner/courses" className="text-xs font-semibold text-blue-700 hover:underline">
              Catalogue →
            </Link>
          </div>

          <div className="space-y-3">
            {recommendedCourses.map((rc) => (
              <div
                key={rc.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/40 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {rc.level}
                    </span>
                    <span className="text-[11px] text-slate-400">{rc.duration}</span>
                  </div>
                  <h3 className="font-bold text-slate-900">{rc.title}</h3>
                  <p className="text-[11px] text-emerald-700 font-medium">{rc.bridges}</p>
                </div>

                <Link
                  href={`/learner/courses/${rc.id}`}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs shrink-0"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">Recent Activity</h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <p className="font-semibold text-slate-900">Cleared Algorithmic Benchmark</p>
                <p className="text-[11px] text-slate-500">Scored 88% on proctored diagnostic • 2 days ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ●
              </div>
              <div>
                <p className="font-semibold text-slate-900">Completed React Component State Lab</p>
                <p className="text-[11px] text-slate-500">Module 2 marked complete • 4 days ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ★
              </div>
              <div>
                <p className="font-semibold text-slate-900">Enrolled in Full Stack Pathway</p>
                <p className="text-[11px] text-slate-500">WD-NSQF-5 batch assigned • 1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
