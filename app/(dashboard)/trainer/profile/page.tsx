'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerProfilePage() {
  const trainers = sidhStore.getTrainers();
  const currentTrainer = trainers[0]; // Dr. Rajesh Sharma

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentTrainer?.name || 'Dr. Rajesh Sharma',
    email: currentTrainer?.email || 'rajesh.sharma@nsti.gov.in',
    phone: currentTrainer?.phone || '+91 98765 43210',
    qualification: currentTrainer?.qualification || 'M.Tech Computer Science, Ph.D. in AI Systems',
    experience: currentTrainer?.experience || '12+ Years Industry & ToT Instruction',
    bio: 'Accredited Master Trainer under Sector Skill Council (SSC NASSCOM) with specialized expertise in Web Application Architecture, Full Stack Systems, and National Occupational Standards (NOS) curriculum formulation.',
    totCertNumber: 'TOT-SSC-2024-8842',
    validUntil: '31 Dec 2026',
    assignedCenter: 'National Skill Training Institute (NSTI), Ramanthapur, Hyderabad',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Trainer Accreditation & Profile Dossier"
        subtitle="National Trainer Registry • SSC Certified Master Instructor Credentials"
        badge="Accredited (Active)"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Profile Dossier' },
        ]}
        actions={
          !isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-3.5 py-1.5 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3.5 py-1.5 text-xs font-semibold rounded bg-emerald-700 text-white hover:bg-emerald-800"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-1.5 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          )
        }
      />

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs font-semibold">
          ✓ Trainer profile record successfully updated in the National Trainer Registry!
        </div>
      )}

      {/* Official Accreditation Card */}
      <div className="bg-gradient-to-r from-[#0B3B60] to-[#155A8A] rounded-xl p-6 text-white shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wide">
                NSQF LEVEL 6 TO 7 TRAINER
              </span>
              <span className="bg-emerald-500/30 text-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                TOT VERIFIED
              </span>
            </div>
            <h2 className="text-xl font-bold">{formData.name}</h2>
            <p className="text-xs text-white/80 mt-1">{formData.assignedCenter}</p>
          </div>
          <div className="bg-white/10 p-3 rounded-lg border border-white/20 text-right shrink-0">
            <p className="text-[10px] uppercase text-white/70 tracking-wider">ToT Certificate No.</p>
            <p className="font-mono text-xs font-bold mt-0.5">{formData.totCertNumber}</p>
            <p className="text-[10px] text-white/70 mt-1">Valid Till: {formData.validUntil}</p>
          </div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-5">
        <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-2">
          Professional Information & Sector Affiliation
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-500 font-medium mb-1">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-1.5 border rounded border-slate-300"
              />
            ) : (
              <p className="font-semibold text-slate-900">{formData.name}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Official Email</label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-1.5 border rounded border-slate-300"
              />
            ) : (
              <p className="font-semibold text-slate-900">{formData.email}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Mobile Contact</label>
            {isEditing ? (
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-1.5 border rounded border-slate-300"
              />
            ) : (
              <p className="font-semibold text-slate-900">{formData.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Academic Qualifications</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className="w-full px-3 py-1.5 border rounded border-slate-300"
              />
            ) : (
              <p className="font-semibold text-slate-900">{formData.qualification}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-500 font-medium mb-1">Assigned Training Center</label>
            {isEditing ? (
              <input
                type="text"
                value={formData.assignedCenter}
                onChange={(e) => setFormData({ ...formData, assignedCenter: e.target.value })}
                className="w-full px-3 py-1.5 border rounded border-slate-300"
              />
            ) : (
              <p className="font-semibold text-slate-900">{formData.assignedCenter}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-500 font-medium mb-1">Instructor Biography & Sector Focus</label>
            {isEditing ? (
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-1.5 border rounded border-slate-300"
              />
            ) : (
              <p className="text-slate-700 leading-relaxed">{formData.bio}</p>
            )}
          </div>
        </div>

        {/* Competencies & Sector Skill Councils */}
        <div className="pt-4 border-t border-slate-100">
          <h4 className="font-semibold text-xs text-slate-800 uppercase tracking-wider mb-3">
            Accredited Sectors & Competencies
          </h4>
          <div className="flex flex-wrap gap-2">
            {[
              'IT-ITeS Sector Skill Council',
              'Web Application Development (NOS-SSC/Q0501)',
              'Full Stack Engineering',
              'Database Management & SQL',
              'Applied AI Integration',
              'Biometric AEBAS Batch Administration',
            ].map((comp, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
              >
                {comp}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Historical Track Record */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
          <p className="text-2xl font-bold text-[#0B3B60]">28</p>
          <p className="text-xs text-slate-500 mt-1">Batches Successfully Graduated</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
          <p className="text-2xl font-bold text-emerald-700">640+</p>
          <p className="text-xs text-slate-500 mt-1">Candidates Certified Under NSQF</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 text-center">
          <p className="text-2xl font-bold text-blue-700">94.8%</p>
          <p className="text-xs text-slate-500 mt-1">Candidate Pass Rate in External Assessments</p>
        </div>
      </div>
    </div>
  );
}
