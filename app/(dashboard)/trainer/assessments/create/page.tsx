'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerAssessmentCreatePage() {
  const router = useRouter();
  const batches = sidhStore.getBatches();

  const [formData, setFormData] = useState({
    title: '',
    batchId: batches[0]?.id || 'batch-1',
    sector: 'IT & ITES',
    nsqfLevel: '5',
    durationMinutes: '60',
    passingScore: '70',
    type: 'Summative Module Assessment',
    instructions: '1. No electronic aids permitted. 2. Candidates must achieve min 70% in theory and practical components.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Assessment "${formData.title}" created successfully and mapped to batch candidates!`);
      router.push('/trainer/assessments');
    }, 1000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Formulate New Skill Assessment"
        subtitle="Schedule a theory or practical competency evaluation aligned with NSQF standards"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Assessments', href: '/trainer/assessments' },
          { label: 'Create Assessment' },
        ]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assessment Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Module 3 Evaluation: REST APIs and Database Architecture"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Training Batch *</label>
              <select
                value={formData.batchId}
                onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Sector *</label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                <option value="IT & ITES">IT & ITES</option>
                <option value="Electronics & Hardware">Electronics & Hardware</option>
                <option value="Automotive">Automotive</option>
                <option value="Renewable Energy">Renewable Energy</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">NSQF Level *</label>
              <select
                value={formData.nsqfLevel}
                onChange={(e) => setFormData({ ...formData, nsqfLevel: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                <option value="4">NSQF Level 4</option>
                <option value="5">NSQF Level 5</option>
                <option value="6">NSQF Level 6</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Duration (Minutes) *</label>
              <input
                type="number"
                required
                value={formData.durationMinutes}
                onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Passing Cutoff (%) *</label>
              <input
                type="number"
                required
                value={formData.passingScore}
                onChange={(e) => setFormData({ ...formData, passingScore: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Examination Instructions & Candidate Guidelines *</label>
            <textarea
              rows={3}
              required
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex justify-end gap-3 text-xs">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border rounded border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2 rounded bg-[#0B3B60] text-white hover:bg-[#082a47] font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Creating Assessment...' : 'Publish Assessment'}
          </button>
        </div>
      </form>
    </div>
  );
}
