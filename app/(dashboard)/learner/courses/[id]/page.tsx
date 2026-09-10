'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { CourseImpactScoreCard } from '@/components/ui/CourseImpactScoreCard';
import { PlacementFunnelChart } from '@/components/ui/PlacementFunnelChart';
import { sidhStore } from '@/lib/sidh-store';

export default function StudentCourseDetailPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const course = sidhStore.getCourseById(courseId) || sidhStore.getCourses()[0];

  const syllabusModules = [
    { title: 'Module 1: Web Architecture, Modern JavaScript ES6+ & DOM', hours: '40 Hours', status: 'Core Foundations' },
    { title: 'Module 2: React Component Hierarchy, Hooks & State Systems', hours: '60 Hours', status: 'Frontend Architecture' },
    { title: 'Module 3: Enterprise REST APIs, Node.js & Prisma ORM', hours: '60 Hours', status: 'Backend & Data' },
    { title: 'Module 4: Database Modeling, Normalization & SQL Queries', hours: '40 Hours', status: 'Database Systems' },
    { title: 'Module 5: Security Protocols, Docker Containers & Capstone Lab', hours: '40 Hours', status: 'Production Delivery' },
  ];

  const topJobRoles = [
    { role: 'Full Stack Web Developer', avgWage: '₹5.8 LPA', hires: 310 },
    { role: 'Frontend React Engineer', avgWage: '₹5.2 LPA', hires: 180 },
    { role: 'Backend API Developer', avgWage: '₹5.5 LPA', hires: 85 },
    { role: 'Junior DevOps Associate', avgWage: '₹6.2 LPA', hires: 45 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={course.title}
        subtitle={`NSQF Level ${course.nsqfLevel} • Sector: ${course.sector} • ${course.totalHours} Notional Hours`}
        badge="Accredited Curriculum"
        breadcrumbs={[
          { label: 'Student Portal', href: '/learner/dashboard' },
          { label: 'Courses', href: '/learner/courses' },
          { label: course.title },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => alert(`Enrolled successfully in ${course.title}! Batch assignment confirmed.`)}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-[#1D4ED8] hover:bg-blue-800 text-white shadow-xs"
            >
              Enroll with SIDH Identity
            </button>
            <button
              onClick={() => alert('Course syllabus and placement audit dossier downloaded as PDF.')}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50"
            >
              Download Factsheet PDF
            </button>
          </div>
        }
      />

      {/* Course-to-Placement Intelligence Funnel */}
      <PlacementFunnelChart
        courseTitle={course.title}
        enrolled={1250}
        completed={1080}
        certified={940}
        placementReady={810}
        placed={620}
        placementRate="76.5%"
        avgSalary="₹5.8 LPA"
      />

      {/* AI Course Impact Score Breakdown (6 Dimensions) */}
      <CourseImpactScoreCard score={89} />

      {/* Top Roles Achieved & Placed Beneficiaries Count */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: People Placed & Roles (6 cols) */}
        <div className="md:col-span-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Top Job Roles Achieved After this Course
            </h3>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
              620 Candidates Placed
            </span>
          </div>

          <div className="space-y-2.5">
            {topJobRoles.map((jr, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">{jr.role}</h4>
                  <span className="text-[11px] text-slate-500">{jr.hires} Candidates Verified Hired</span>
                </div>
                <span className="font-bold text-[#1D4ED8] dark:text-blue-400 text-sm">{jr.avgWage}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Skills Covered & Skill Gaps Addressed (6 cols) */}
        <div className="md:col-span-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-2">
            High-Priority Skill Gaps Addressed
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 space-y-1">
              <div className="flex justify-between font-bold text-emerald-900 dark:text-emerald-200">
                <span>Relational Database Normalization & SQL</span>
                <span>Bridges 23% Gap</span>
              </div>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                Module 4 specifically covers schema design, ACID transactions, and complex SQL JOIN syntax.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-blue-50/50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-1">
              <div className="flex justify-between font-bold text-blue-900 dark:text-blue-200">
                <span>Enterprise REST API Engineering</span>
                <span>Bridges 35% Gap</span>
              </div>
              <p className="text-[11px] text-blue-800 dark:text-blue-300">
                Module 3 delivers 60 hours of hands-on Node.js and Express asynchronous handler pipelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Syllabus Modules */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
          Curriculum Structure & Notional Hours
        </h3>

        <div className="space-y-2.5">
          {syllabusModules.map((mod, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block">
                  {mod.status}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">{mod.title}</h4>
              </div>
              <span className="font-mono text-slate-600 dark:text-slate-400 shrink-0 font-medium">
                {mod.hours}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
