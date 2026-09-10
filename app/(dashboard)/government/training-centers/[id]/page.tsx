'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentTrainingCenterDetailPage() {
  const params = useParams();
  const centerId = params?.id as string;
  const center = sidhStore.getCenterById(centerId) || sidhStore.getCenters()[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title={center.name}
        subtitle={`TC Code: ${center.code} • ${center.city}, ${center.state} • SMART Grade A+`}
        badge={center.status}
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Training Centers', href: '/government/training-centers' },
          { label: center.code },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => alert(`Surprise physical inspection dispatched to ${center.name} via State Directorate.`)}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-amber-600 text-white hover:bg-amber-700 shadow-sm"
            >
              Order Surprise Inspection
            </button>
            <button
              onClick={() => alert('SMART accreditation audit certificate exported as signed PDF.')}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
            >
              Export Center Dossier
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Infrastructure Specifications */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Center Infrastructure & Facility Audit
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Sanctioned Capacity:</span>
                <span className="font-semibold text-slate-900">{center.capacity} Candidates</span>
              </div>
              <div>
                <span className="text-slate-500 block">Classrooms & IT Labs:</span>
                <span className="font-semibold text-slate-900">8 Labs, 4 Theory Rooms</span>
              </div>
              <div>
                <span className="text-slate-500 block">AEBAS Terminals:</span>
                <span className="text-emerald-700 font-semibold">4 Terminals (All Online)</span>
              </div>
              <div>
                <span className="text-slate-500 block">High-Speed Internet:</span>
                <span className="font-semibold text-slate-900">1 Gbps Optical Fiber</span>
              </div>
              <div>
                <span className="text-slate-500 block">Power Backup:</span>
                <span className="font-semibold text-slate-900">100% DG Set + Solar UPS</span>
              </div>
              <div>
                <span className="text-slate-500 block">Fire Safety & Norms:</span>
                <span className="text-emerald-700 font-semibold">NOC Valid Till 2027</span>
              </div>
            </div>
          </div>

          {/* Active Batches at this Center */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="font-semibold text-sm text-slate-900">Currently Running Batches</h3>
            <div className="p-3 rounded border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-slate-900">BATCH-2026-WD01 (Web App Development)</span>
                <p className="text-[11px] text-slate-500 mt-0.5">Trainer: Dr. Rajesh Sharma • Strength: 28 Candidates</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-[11px]">
                Ongoing (Week 12 of 20)
              </span>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3 text-xs">
            <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Surveillance & Live Telemetry
            </h3>
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Live CCTV Stream:</span>
                <span className="text-emerald-700 font-bold">Encrypted & Transmitting</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Today's Total Punches:</span>
                <span className="font-bold text-slate-900">142 Punches</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Last Inspection Date:</span>
                <span className="font-medium text-slate-800">12 Jul 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
