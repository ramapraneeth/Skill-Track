'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';

export default function GovernmentSkillCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    sector: 'IT & ITES',
    category: 'Technical',
    demandLevel: 'High',
    description: '',
    relatedRoles: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`Skill "${formData.name}" added to the National Skill Taxonomy!`);
      router.push('/government/skills');
    }, 1000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Add Skill to National Taxonomy"
        subtitle="Gazette a new occupational skill competency into the national qualification framework"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Skill Taxonomy', href: '/government/skills' },
          { label: 'Add Skill' },
        ]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Skill Competency Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Edge Computing & IoT Telemetry Architecture"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <option value="Healthcare">Healthcare</option>
                <option value="Renewable Energy">Renewable Energy</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Skill Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                <option value="Technical">Technical Competency</option>
                <option value="Foundational">Foundational / Core</option>
                <option value="Soft Skills">Employability / Soft Skills</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Demand Projection *</label>
              <select
                value={formData.demandLevel}
                onChange={(e) => setFormData({ ...formData, demandLevel: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                <option value="High">High Growth Demand</option>
                <option value="Medium">Moderate Demand</option>
                <option value="Low">Low / Specialized</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Skill Definition & NOS Mapping *</label>
            <textarea
              rows={3}
              required
              placeholder="Detail the technical capability, practical performance criteria, and required equipment..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Related Job Roles (Comma Separated) *</label>
            <input
              type="text"
              required
              placeholder="e.g. IoT Engineer, Embedded Systems Developer, Automation Specialist"
              value={formData.relatedRoles}
              onChange={(e) => setFormData({ ...formData, relatedRoles: e.target.value })}
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
            {isSubmitting ? 'Adding...' : 'Add Skill to National Taxonomy'}
          </button>
        </div>
      </form>
    </div>
  );
}
