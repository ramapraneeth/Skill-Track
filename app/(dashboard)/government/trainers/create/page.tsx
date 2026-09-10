'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';

export default function GovernmentTrainerCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    aadhaar: '',
    sector: 'IT & ITES',
    qualification: 'M.Tech / MCA / B.Tech',
    totNsqfLevel: '6',
    assignedCenter: 'NSTI Hyderabad',
    licenseExpiry: '2028-12-31',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert(`ToT Accreditation License issued for ${formData.name} under Sector Skill Council ${formData.sector}!`);
      router.push('/government/trainers');
    }, 1000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <PageHeader
        title="Issue Training of Trainers (ToT) Accreditation"
        subtitle="Authorize instructor certification under National Council for Vocational Education and Training (NCVET)"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Trainer Registry', href: '/government/trainers' },
          { label: 'Issue Accreditation' },
        ]}
      />

      <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-5">
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Trainer Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Rajesh Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Aadhaar (UIDAI Seeded) *</label>
              <input
                type="text"
                required
                placeholder="12 Digit Aadhaar Number"
                value={formData.aadhaar}
                onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Official Email Address *</label>
              <input
                type="email"
                required
                placeholder="trainer@domain.gov.in"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Contact *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
              <label className="block font-semibold text-slate-700 mb-1">ToT NSQF Level *</label>
              <select
                value={formData.totNsqfLevel}
                onChange={(e) => setFormData({ ...formData, totNsqfLevel: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                <option value="5">Level 5 (Vocational Trainer)</option>
                <option value="6">Level 6 (Senior Trainer / Specialist)</option>
                <option value="7">Level 7 (Master Trainer)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Accreditation Expiry *</label>
              <input
                type="date"
                required
                value={formData.licenseExpiry}
                onChange={(e) => setFormData({ ...formData, licenseExpiry: e.target.value })}
                className="w-full px-3 py-2 border rounded border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assigned Training Center (SMART Verified) *</label>
            <input
              type="text"
              required
              value={formData.assignedCenter}
              onChange={(e) => setFormData({ ...formData, assignedCenter: e.target.value })}
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
            {isSubmitting ? 'Issuing...' : 'Issue ToT Certificate & License'}
          </button>
        </div>
      </form>
    </div>
  );
}
