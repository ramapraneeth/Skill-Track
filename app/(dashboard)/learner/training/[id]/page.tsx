'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  Building2,
  Calendar,
  Clock,
  User,
  MapPin,
  ClipboardCheck,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getBatches, getTrainingCenters } from '@/lib/sidh-store';

export default function TrainingBatchDetailsPage() {
  const params = useParams();
  const batchId = (params?.id as string) || 'btc-01';

  const batches = getBatches();
  const batch = batches.find((b) => b.id === batchId) || batches[0];
  const centers = getTrainingCenters();
  const center = centers[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader
        title={batch.courseTitle}
        subtitle={`Batch ID: ${batch.id} • Training Center: ${batch.trainingCenter}`}
        badge={batch.status}
        breadcrumbs={[
          { label: 'My Learning', href: '/learner/my-learning' },
          { label: 'Batch Telemetry' },
        ]}
      />

      <div className="bg-white border border-[#CBD5E1] rounded-lg p-6 shadow-xs space-y-6 text-xs">
        {/* Key Batch Data */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
          <div>
            <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Master Trainer</span>
            <strong className="text-sm text-[#0F172A]">{batch.trainerName}</strong>
            <p className="text-[11px] text-[#64748B] mt-0.5">Accredited Senior Instructor</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Class Timings & Days</span>
            <strong className="text-sm text-[#0F172A]">{batch.timings}</strong>
            <p className="text-[11px] text-[#64748B] mt-0.5">Duration: {batch.startDate} to {batch.endDate}</p>
          </div>
          <div>
            <span className="text-[10px] text-[#64748B] block uppercase font-semibold">Attendance Record</span>
            <strong className="text-sm text-emerald-700 font-bold">{batch.attendanceRate}% Logged</strong>
            <p className="text-[11px] text-emerald-800 mt-0.5">Complies with stipend requirement</p>
          </div>
        </div>

        {/* Center Information */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-sm text-[#0F172A] flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0B3B60]" />
            <span>Training Center Facility Details</span>
          </h3>

          <div className="p-4 border border-[#CBD5E1] rounded-lg bg-white space-y-2 text-[#475569]">
            <div className="font-bold text-sm text-[#0F172A]">{center.name}</div>
            <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
              <MapPin className="w-3.5 h-3.5 text-[#0B3B60]" />
              <span>{center.address}</span>
            </div>
            <div className="pt-2 border-t border-[#E2E8F0] flex flex-wrap gap-2">
              {center.facilities.map((fac) => (
                <span key={fac} className="px-2 py-0.5 rounded bg-[#F1F5F9] border border-[#CBD5E1] text-[10px] font-semibold text-[#0F172A]">
                  ✓ {fac}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="pt-4 border-t border-[#E2E8F0] flex justify-between items-center">
          <Link href="/learner/my-learning" className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A]">
            ← Return to My Learning
          </Link>
          <Link
            href="/learner/courses/crs-001"
            className="px-4 py-2 rounded bg-[#0B3B60] text-white font-bold text-xs hover:bg-[#002541]"
          >
            Open Syllabus Lessons
          </Link>
        </div>
      </div>
    </div>
  );
}
