'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';

export default function GovernmentSchemeCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    ministry: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
    targetBeneficiaries: '250000',
    budgetAllocated: '₹500 Cr',
    startDate: '2026-10-01',
    endDate: '2029-03-31',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`National Scheme "${formData.name}" officially notified and budget allocated under PFMS!`);
      router.push('/government/schemes');
    }, 1000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Notify New Skilling Scheme / Special Project"
        subtitle="Formulate central budget allocation, physical beneficiary targets, and PFMS guidelines"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Schemes', href: '/government/schemes' },
          { label: 'Notify Scheme' },
        ]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Scheme Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Green Hydrogen & Clean Energy Skilling Mission"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Scheme Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. GH-SKILL-2026"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Nodal Ministry / Department *</label>
              <input
                type="text"
                required
                value={formData.ministry}
                onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total Budget Outlay (INR) *</label>
              <input
                type="text"
                required
                placeholder="e.g. ₹500 Cr"
                value={formData.budgetAllocated}
                onChange={(e) => setFormData({ ...formData, budgetAllocated: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Beneficiaries *</label>
              <input
                type="number"
                required
                value={formData.targetBeneficiaries}
                onChange={(e) => setFormData({ ...formData, targetBeneficiaries: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Commencement Date *</label>
              <input
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Sunset Date *</label>
              <input
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Scheme Guidelines & DBT Subsidy Norms *</label>
            <textarea
              rows={4}
              required
              placeholder="Outline the operational guidelines, eligible candidate demographics, DBT disbursement rules, and placement milestones..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
            {isSubmitting ? 'Notifying...' : 'Gazette Scheme & Allocate Budget'}
          </button>
        </div>
      </form>
    </div>
  );
}
