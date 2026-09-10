'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentProgramDetailPage() {
  const params = useParams();
  const programId = params?.id as string;
  const course = sidhStore.getCourseById(programId) || sidhStore.getCourses()[0];

  const nosUnits = [
    { code: 'NOS-SSC/Q0501-U01', title: 'Web Architecture Fundamentals & Semantic UI Standards', hours: 30 },
    { code: 'NOS-SSC/Q0501-U02', title: 'Asynchronous JavaScript & TypeScript Logic', hours: 35 },
    { code: 'NOS-SSC/Q0501-U03', title: 'Reactive Component Lifecycle & Next.js Architecture', hours: 45 },
    { code: 'NOS-SSC/Q0501-U04', title: 'Database Schema Modeling, SQL Queries & Prisma ORM', hours: 40 },
    { code: 'NOS-SSC/Q0501-U05', title: 'Cloud CI/CD, Cyber Safety & Capstone Lab Execution', hours: 50 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={course.title}
        subtitle={`QP Code: ${course.code} • NSQF Level ${course.nsqfLevel} • Sector: ${course.sector}`}
        badge="NCVET Approved"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Programs & QPs', href: '/government/programs' },
          { label: course.code },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => alert('Official National Qualification File (NQF) gazette document downloaded.')}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
            >
              Download NCVET Gazette PDF
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Overview */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
              National Qualification Pack Specifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Sector Skill Council:</span>
                <span className="font-semibold text-slate-900">{course.sector}</span>
              </div>
              <div>
                <span className="text-slate-500 block">NSQF Level:</span>
                <span className="font-semibold text-slate-900">Level {course.nsqfLevel}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Notional Hours:</span>
                <span className="font-semibold text-slate-900">{course.totalHours} Hours</span>
              </div>
              <div>
                <span className="text-slate-500 block">Delivery Mode:</span>
                <span className="font-semibold text-slate-900">{course.mode}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Eligibility Criteria:</span>
                <span className="font-semibold text-slate-900">{course.eligibility}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Gazette Date:</span>
                <span className="font-semibold text-slate-900">01 Jan 2025</span>
              </div>
            </div>
            <div className="pt-2 text-xs text-slate-600 border-t border-slate-100 leading-relaxed">
              {course.description}
            </div>
          </div>

          {/* National Occupational Standards (NOS) Units */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="font-semibold text-sm text-slate-900">National Occupational Standards (NOS) Units</h3>
            <div className="space-y-2">
              {nosUnits.map((u, i) => (
                <div key={i} className="p-3 rounded bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono text-[10px] text-slate-500 block font-semibold">{u.code}</span>
                    <span className="font-semibold text-slate-900 mt-0.5 block">{u.title}</span>
                  </div>
                  <span className="text-slate-600 font-medium shrink-0">{u.hours} Notional Hours</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
            <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
              National Delivery Footprint
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Active Batches Pan-India:</span>
                <span className="font-bold text-slate-900">1,240 Batches</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Enrolled Candidates:</span>
                <span className="font-bold text-slate-900">34,800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Average Placement Rate:</span>
                <span className="font-bold text-emerald-700">76.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
