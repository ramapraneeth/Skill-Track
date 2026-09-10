'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerCourseDetailPage() {
  const params = useParams();
  const courseId = params?.id as string;
  const course = sidhStore.getCourseById(courseId) || sidhStore.getCourses()[0];

  const modules = [
    { title: 'Module 1: Web Architecture, HTML5 & Modern Semantic Styling', hours: 25, status: 'Completed', coverage: 100 },
    { title: 'Module 2: JavaScript ES6+ & Reactive Asynchronous State', hours: 35, status: 'Completed', coverage: 100 },
    { title: 'Module 3: React.js Component Lifecycle & Next.js App Router', hours: 40, status: 'In Progress', coverage: 65 },
    { title: 'Module 4: RESTful API Integration & Prisma ORM Connectivity', hours: 30, status: 'Upcoming', coverage: 0 },
    { title: 'Module 5: Security, Biometric Data Standards & Capstone Project', hours: 30, status: 'Upcoming', coverage: 0 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={course.title}
        subtitle={`Course Code: ${course.code} • Sector: ${course.sector} • NSQF Level ${course.nsqfLevel}`}
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Courses', href: '/trainer/courses' },
          { label: course.code },
        ]}
        actions={
          <div className="flex gap-2">
            <Link
              href={`/trainer/materials?courseId=${course.id}`}
              className="px-3.5 py-2 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
            >
              Course Materials
            </Link>
            <Link
              href="/trainer/assessments/create"
              className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
            >
              Schedule Assessment
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Modules & Delivery Status */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-slate-800">Syllabus Breakdown & Delivery Coverage</h3>
            <span className="text-xs text-slate-500 font-medium">5 Modules • {course.totalHours} Total Hours</span>
          </div>

          <div className="space-y-3 pt-2">
            {modules.map((m, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-slate-200 bg-slate-50/40 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-xs text-slate-900">{m.title}</h4>
                    <span className="text-[11px] text-slate-500">{m.hours} Hours • Theory + Practical</span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                      m.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : m.status === 'In Progress'
                        ? 'bg-blue-100 text-[#0B3B60]'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Curriculum Covered</span>
                    <span className="font-medium text-slate-700">{m.coverage}%</span>
                  </div>
                  <ProgressBar value={m.coverage} max={100} color="#0B3B60" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Course Specifications */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
            <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-2">
              Course Details
            </h3>
            <div className="space-y-2 text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-500">Sector:</span>
                <span className="font-semibold text-slate-800">{course.sector}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">NSQF Level:</span>
                <span className="font-semibold text-slate-800">Level {course.nsqfLevel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Hours:</span>
                <span className="font-semibold text-slate-800">{course.totalHours} hrs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Mode:</span>
                <span className="font-semibold text-slate-800">{course.mode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Min Attendance:</span>
                <span className="font-semibold text-slate-800">80% AEBAS Required</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50/50 rounded-lg border border-blue-200 p-4 text-xs space-y-2">
            <h4 className="font-bold text-[#0B3B60]">Associated Batches</h4>
            <p className="text-slate-600 text-[11px]">
              Currently assigned to 2 active cohorts at NSTI Ramanthapur.
            </p>
            <Link
              href="/trainer/batches"
              className="text-xs font-semibold text-[#0B3B60] hover:underline block"
            >
              Manage Assigned Batches →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
