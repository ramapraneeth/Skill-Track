'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerCoursesPage() {
  const courses = sidhStore.getCourses();
  const [search, setSearch] = useState('');

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.sector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Assigned Courses & Curriculum Modules"
        subtitle="National Occupational Standards (NOS) course packages and lesson plans assigned to you"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Assigned Courses' },
        ]}
        actions={
          <Link
            href="/trainer/courses/create"
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>➕</span> Propose New Course / Module
          </Link>
        }
      />

      <div className="bg-white p-3.5 rounded-lg border border-slate-200 flex items-center justify-between shadow-sm">
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            placeholder="Search courses or sector..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
          />
        </div>
        <span className="text-xs text-slate-500 font-medium">{filtered.length} Courses Found</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded">
                    {course.sector}
                  </span>
                  <span className="text-xs font-medium text-slate-600">NSQF Lvl {course.nsqfLevel}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mt-1 line-clamp-2">{course.title}</h3>
                <p className="text-xs text-slate-500 mt-1">Code: {course.code}</p>
              </div>

              <div className="p-4 space-y-3 text-xs text-slate-600">
                <p className="line-clamp-2 text-slate-600">{course.description}</p>
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Total Hours:</span>
                    <span className="font-semibold text-slate-800">{course.totalHours} hrs</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Enrolled Batches:</span>
                    <span className="font-semibold text-slate-800">2 Active Batches</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/trainer/materials?courseId=${course.id}`}
                className="text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                📁 Materials
              </Link>
              <Link
                href={`/trainer/courses/${course.id}`}
                className="px-3 py-1.5 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
              >
                Syllabus & Units →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
