'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerLearnerDossierPage() {
  const params = useParams();
  const learnerId = params?.id as string;
  const learner = sidhStore.getLearnerById(learnerId) || sidhStore.getLearners()[0];

  const [remarks, setRemarks] = useState([
    { date: '04 Sep 2026', author: 'Dr. Rajesh Sharma', text: 'Demonstrated strong aptitude in React State hooks. Recommended for advanced capstone project.' },
    { date: '18 Aug 2026', author: 'Dr. Rajesh Sharma', text: 'Cleared Mid-term assessment with 84%. Advised to practice database schema normalization.' },
  ]);

  const [newRemark, setNewRemark] = useState('');

  const handleAddRemark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRemark.trim()) return;
    setRemarks([
      { date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }), author: 'Dr. Rajesh Sharma', text: newRemark.trim() },
      ...remarks,
    ]);
    setNewRemark('');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Candidate Dossier: ${learner.name}`}
        subtitle={`Candidate ID: ${learner.id} • Batch: BATCH-2026-WD01 • NSQF Level 5`}
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Learners', href: '/trainer/learners' },
          { label: learner.name },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => alert(`Flagged candidate ${learner.name} for extra mentoring attention.`)}
              className="px-3.5 py-2 text-xs font-semibold rounded border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100"
            >
              Flag for Mentoring
            </button>
            <button
              onClick={() => alert('Dossier exported as signed candidate report.')}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
            >
              Export Dossier PDF
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Profile & Attendance & Competencies */}
        <div className="lg:col-span-8 space-y-6">
          {/* Identity & Basic Info Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-2">
              Candidate Information
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Email Address:</span>
                <span className="font-semibold text-slate-800">{learner.email}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Mobile Phone:</span>
                <span className="font-semibold text-slate-800">{learner.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">UIDAI Verification:</span>
                <span className="text-emerald-700 font-semibold">Verified Active</span>
              </div>
              <div>
                <span className="text-slate-500 block">Education Qualification:</span>
                <span className="font-semibold text-slate-800">{learner.education || 'B.Tech / BCA'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Target Job Role:</span>
                <span className="font-semibold text-slate-800">{learner.targetRole || 'Full Stack Developer'}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Center Allocation:</span>
                <span className="font-semibold text-slate-800">NSTI Hyderabad</span>
              </div>
            </div>
          </div>

          {/* Biometric AEBAS Attendance & Metrics */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-slate-800">Biometric Attendance Compliance</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                92.4% (Regular)
              </span>
            </div>
            <ProgressBar value={92} max={100} color="#10b981" />
            <p className="text-[11px] text-slate-500">
              Candidate has completed 48 of 52 mandatory lab sessions. Minimum 80% cutoff cleared for exam eligibility.
            </p>
          </div>

          {/* Demonstrated Competencies */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="font-semibold text-sm text-slate-800">National Occupational Standards (NOS) Demonstrated</h3>
            <div className="space-y-2">
              {learner.skills.map((s, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <span className="font-medium text-slate-800">{s.skillName}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-600">Level: {s.level}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Instructor Evaluation Remarks */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-2">
              Trainer Assessment Remarks
            </h3>

            {/* Form */}
            <form onSubmit={handleAddRemark} className="space-y-2">
              <textarea
                rows={3}
                required
                placeholder="Add observational note, lab performance, or remedial instruction..."
                value={newRemark}
                onChange={(e) => setNewRemark(e.target.value)}
                className="w-full p-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              />
              <button
                type="submit"
                className="w-full py-1.5 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
              >
                Post Trainer Note
              </button>
            </form>

            {/* List */}
            <div className="space-y-3 pt-2">
              {remarks.map((r, i) => (
                <div key={i} className="p-3 rounded bg-slate-50 border border-slate-100 text-xs space-y-1">
                  <div className="flex justify-between items-center text-[10px] text-slate-500">
                    <span className="font-bold text-slate-700">{r.author}</span>
                    <span>{r.date}</span>
                  </div>
                  <p className="text-slate-700 text-[11px] leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
