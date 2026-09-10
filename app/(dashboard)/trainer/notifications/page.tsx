'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

interface TrainerNotification {
  id: string;
  category: 'Accreditation' | 'Center' | 'Assessment' | 'Batch';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
}

const INITIAL_TRAINER_NOTICES: TrainerNotification[] = [
  { id: 'tn-1', category: 'Accreditation', title: 'ToT Refresher Workshop Circular', message: 'Annual Level 6 Trainer of Trainers refresher symposium opens registration on 15 Oct 2026. SSC IT-ITeS accreditation.', date: 'Today, 10:15 AM', isRead: false },
  { id: 'tn-2', category: 'Assessment', title: 'External Assessor Nominated for Practical Exam', message: 'NCVET appointed Shri V. Murthy as External Practical Assessor for Batch BATCH-2026-WD01 final exam on 25 Sep.', date: 'Yesterday', isRead: false },
  { id: 'tn-3', category: 'Center', title: 'Biometric Terminal Firmware Upgrade', message: 'AEBAS gate terminals will undergo scheduled sync maintenance tonight between 23:00 - 02:00.', date: '07 Sep 2026', isRead: true },
  { id: 'tn-4', category: 'Batch', title: 'Batch Strength Enrollment Target Achieved', message: 'Cohort BATCH-2026-WD01 has reached 28 candidates and marked officially in progress under PMKVY 4.0 guidelines.', date: '01 Sep 2026', isRead: true },
];

export default function TrainerNotificationsPage() {
  const [notices, setNotices] = useState<TrainerNotification[]>(INITIAL_TRAINER_NOTICES);

  const markAll = () => {
    setNotices(notices.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trainer Circulars & Notifications"
        subtitle="Sector Skill Council circulars, center administrative announcements, and assessor allocations"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Notifications' },
        ]}
        actions={
          <button
            onClick={markAll}
            className="px-3.5 py-1.5 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          >
            Mark all read
          </button>
        }
      />

      <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100 shadow-sm">
        {notices.map((n) => (
          <div
            key={n.id}
            className={`p-4 flex items-start gap-3.5 transition-colors ${
              !n.isRead ? 'bg-blue-50/20' : 'hover:bg-slate-50'
            }`}
          >
            <span className="text-xl shrink-0 mt-0.5">
              {n.category === 'Accreditation' && '📜'}
              {n.category === 'Assessment' && '📝'}
              {n.category === 'Center' && '🏛️'}
              {n.category === 'Batch' && '👥'}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {n.category}
                </span>
                <span className="text-[11px] text-slate-400">{n.date}</span>
              </div>
              <h4 className="font-semibold text-xs text-slate-900 mt-0.5">{n.title}</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
