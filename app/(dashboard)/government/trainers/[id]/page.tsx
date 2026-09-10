'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentTrainerDetailPage() {
  const params = useParams();
  const trainerId = params?.id as string;
  const trainer = sidhStore.getTrainerById(trainerId) || sidhStore.getTrainers()[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Trainer Accreditation Audit: ${trainer.name}`}
        subtitle={`ToT License: TOT-SSC-2024-8842 • Sector: ${trainer.sector} • NSQF Level 6-7`}
        badge={trainer.status}
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Trainers', href: '/government/trainers' },
          { label: trainer.name },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => alert(`Accreditation for ${trainer.name} renewed for 2 years.`)}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-emerald-700 text-white hover:bg-emerald-800"
            >
              Extend ToT License
            </button>
            <button
              onClick={() => alert(`Suspension notice issued to trainer ${trainer.name} pending inquiry.`)}
              className="px-3.5 py-2 text-xs font-semibold rounded border border-red-300 bg-red-50 text-red-700 hover:bg-red-100"
            >
              Flag / Suspend License
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Official Registry Credentials */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
              NCVET Accreditation & Sector Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Instructor Name:</span>
                <span className="font-semibold text-slate-900">{trainer.name}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Official Email:</span>
                <span className="font-semibold text-slate-900">{trainer.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Contact Phone:</span>
                <span className="font-semibold text-slate-900">{trainer.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Academic Qualification:</span>
                <span className="font-semibold text-slate-900">{trainer.qualification}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assigned Training Center:</span>
                <span className="font-semibold text-slate-900">NSTI Hyderabad (Ramanthapur)</span>
              </div>
              <div>
                <span className="text-slate-500 block">License Expiry:</span>
                <span className="font-semibold text-slate-900">31 Dec 2026</span>
              </div>
            </div>
          </div>

          {/* Past Performance & Audit Metrics */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="font-semibold text-sm text-slate-900">Historical Batch Conduct & Exam Success</h3>
            <div className="grid grid-cols-3 gap-4 text-center text-xs">
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Total Batches Completed</span>
                <span className="text-xl font-bold text-slate-900 mt-1">28</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Total Candidates Certified</span>
                <span className="text-xl font-bold text-emerald-700 mt-1">640+</span>
              </div>
              <div className="p-3 rounded bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Pass Rate in External Exam</span>
                <span className="text-xl font-bold text-[#0B3B60] mt-1">94.8%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
            <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Quality Audit Evaluation
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Student Satisfaction:</span>
                <span className="font-bold text-slate-800">4.75 / 5.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">NCVET External Inspection:</span>
                <span className="font-bold text-emerald-700">Grade A (Exemplary)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AEBAS Session Punctuality:</span>
                <span className="font-bold text-slate-800">98.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
