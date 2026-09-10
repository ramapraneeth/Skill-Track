'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';

export default function GovernmentProgramCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    sector: 'IT & ITES',
    nsqfLevel: '5',
    totalHours: '120',
    mode: 'Hybrid (Classroom + Virtual Lab)',
    eligibility: '12th Pass or ITI or 2nd Year Diploma',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Qualification Pack "${formData.title}" formulated and gazetted under NSQF!`);
      router.push('/government/programs');
    }, 1000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Formulate National Qualification Pack (QP)"
        subtitle="Gazette a new National Occupational Standards (NOS) curriculum into the NSQF framework"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Programs & QPs', href: '/government/programs' },
          { label: 'Formulate QP' },
        ]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Qualification Pack (QP) Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Associate Web Application Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">National QP Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. QP-SSC-IT-Q0501"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Sector Skill Council *</label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                <option value="IT & ITES">IT & ITES (NASSCOM)</option>
                <option value="Electronics & Hardware">Electronics & Hardware</option>
                <option value="Automotive">Automotive</option>
                <option value="Renewable Energy">Renewable Energy</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target NSQF Level *</label>
              <select
                value={formData.nsqfLevel}
                onChange={(e) => setFormData({ ...formData, nsqfLevel: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                <option value="4">NSQF Level 4</option>
                <option value="5">NSQF Level 5</option>
                <option value="6">NSQF Level 6</option>
                <option value="7">NSQF Level 7</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total Notional Hours *</label>
              <input
                type="number"
                required
                value={formData.totalHours}
                onChange={(e) => setFormData({ ...formData, totalHours: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Minimum Candidate Entry Eligibility *</label>
            <input
              type="text"
              required
              value={formData.eligibility}
              onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
              className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Overview & Industry Job Role Description *</label>
            <textarea
              rows={4}
              required
              placeholder="Describe the occupational standards, practical competencies, and industry employability scope..."
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
            {isSubmitting ? 'Gazetting...' : 'Gazette Qualification Pack'}
          </button>
        </div>
      </form>
    </div>
  );
}
