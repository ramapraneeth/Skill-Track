'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Target,
} from 'lucide-react';
import { sidhStore } from '@/lib/sidh-store';

export default function LearnerCourseDetailPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const [isEnrolled, setIsEnrolled] = useState(true);

  const course = sidhStore.getCourseById(courseId) || {
    id: courseId || 'crs-001',
    title: 'Full Stack Web & Application Development',
    code: 'WD-NSQF-5',
    sector: 'IT & ITES',
    nsqfLevel: 5,
    totalHours: 200,
  };

  const modules = [
    {
      number: 'Module 1',
      title: 'Web Architecture, Modern JavaScript ES6+ & DOM Operations',
      duration: '40 Hours',
      status: 'Completed',
    },
    {
      number: 'Module 2',
      title: 'React Component Hierarchy, Hooks & State Management',
      duration: '60 Hours',
      status: 'Completed',
    },
    {
      number: 'Module 3',
      title: 'Enterprise REST APIs, Node.js Handlers & Prisma ORM',
      duration: '60 Hours',
      status: 'In Progress',
    },
    {
      number: 'Module 4',
      title: 'Relational Database Schema Normalization & SQL Queries',
      duration: '40 Hours',
      status: 'Not Started',
    },
    {
      number: 'Module 5',
      title: 'Containerization, Automated Testing & Capstone Evaluation',
      duration: '40 Hours',
      status: 'Not Started',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Back Navigation */}
      <div>
        <Link
          href="/learner/courses"
          className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Learning Catalogue</span>
        </Link>
      </div>

      {/* 1. TOP HEADER SECTION */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                NSQF Level {course.nsqfLevel || 5}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                Sector: {course.sector || 'IT & ITES'} • {course.totalHours || 200} Notional Hours
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Comprehensive industry-aligned engineering pathway covering responsive client interfaces,
              high-performance asynchronous backend services, relational persistence, and deployment containers.
            </p>

            <div className="text-xs text-slate-500 pt-1">
              Skill Focus: <strong className="text-slate-800">React.js, Node.js & Database Architecture</strong>
            </div>
          </div>

          <div className="w-full md:w-64 space-y-3 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Course Progress</span>
                <span className="text-blue-700">68%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-700 h-2 rounded-full" style={{ width: '68%' }} />
              </div>
              <span className="text-[11px] text-slate-500 block">Module 3 active (3 of 5)</span>
            </div>

            <button
              onClick={() => alert('Resuming lesson 3.3 in your virtual lab environment...')}
              className="w-full py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-xs"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>

      {/* 2. COURSE OVERVIEW: Learning Objectives & Skills Covered */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">Course Overview</h2>
          <p className="text-xs text-slate-500">Essential competencies and technical requirements for completion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Learning Objectives
            </h3>
            <ul className="space-y-2 text-xs text-slate-700 list-disc pl-4 leading-relaxed">
              <li>Design robust responsive frontend applications with React and TypeScript.</li>
              <li>Develop enterprise REST APIs using Node.js, Express handlers, and JWT security.</li>
              <li>Structure relational schemas with PostgreSQL and implement ACID transactions.</li>
              <li>Package containerized applications using Docker for cloud orchestration.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Skills Covered
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {['React.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'REST APIs', 'JWT Auth'].map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-800"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-700 block">Certification Benchmark:</span>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Requires clearing the final proctored assessment with a score ≥ 75% to earn the NSQF Level 5 certificate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MODULES: Clean Vertical Structure */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">Curriculum Modules</h2>
          <p className="text-xs text-slate-500">Progress through sequential learning units</p>
        </div>

        <div className="space-y-2.5 pt-2">
          {modules.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex items-center justify-between gap-4 text-xs transition-colors ${
                m.status === 'In Progress'
                  ? 'border-blue-300 bg-blue-50/30'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                    m.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : m.status === 'In Progress'
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {m.status === 'Completed' ? '✓' : m.status === 'In Progress' ? '●' : '○'}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-500 text-[10px] uppercase">
                      {m.number}
                    </span>
                    <span className="text-slate-400 text-[10px]">•</span>
                    <span className="text-slate-400 text-[10px]">{m.duration}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">
                    {m.title}
                  </h3>
                </div>
              </div>

              <div className="shrink-0">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    m.status === 'Completed'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : m.status === 'In Progress'
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
