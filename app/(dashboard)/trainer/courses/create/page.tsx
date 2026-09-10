'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';

export default function TrainerCourseCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    sector: 'IT & ITES',
    nsqfLevel: '5',
    totalHours: '120',
    mode: 'Hybrid',
    targetAudience: 'Graduates / Diploma Holders',
    description: '',
    learningOutcomes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Course module proposal submitted for Sector Skill Council accreditation review!');
      router.push('/trainer/courses');
    }, 1000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Propose New Curriculum Module"
        subtitle="Formulate syllabus aligned with National Occupational Standards (NOS) for approval"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Courses', href: '/trainer/courses' },
          { label: 'Propose Module' },
        ]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Course / Module Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. Cloud Infrastructure Architecture & DevOps"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                <option value="Renewable Energy">Renewable Energy</option>
                <option value="Healthcare">Healthcare</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target NSQF Level *</label>
              <select
                value={formData.nsqfLevel}
                onChange={(e) => setFormData({ ...formData, nsqfLevel: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                <option value="4">Level 4 (Vocational / High School)</option>
                <option value="5">Level 5 (Diploma / Advanced)</option>
                <option value="6">Level 6 (Degree / Specialist)</option>
                <option value="7">Level 7 (Post-Grad / Expert)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Total Hours *</label>
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
            <label className="block font-semibold text-slate-700 mb-1">Course Description & Overview *</label>
            <textarea
              rows={3}
              required
              placeholder="Outline the core objective, industry relevance, and job roles targeted..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Key National Occupational Standards (NOS) & Learning Outcomes *</label>
            <textarea
              rows={4}
              required
              placeholder="List specific NOS codes, practical lab competencies, and expected candidate outcomes..."
              value={formData.learningOutcomes}
              onChange={(e) => setFormData({ ...formData, learningOutcomes: e.target.value })}
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
            {isSubmitting ? 'Submitting...' : 'Submit for SSC Accreditation'}
          </button>
        </div>
      </form>
    </div>
  );
}
