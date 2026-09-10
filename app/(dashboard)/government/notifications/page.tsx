'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

interface GovtNotice {
  id: string;
  source: 'Cabinet Secretariat' | 'NITI Aayog' | 'PFMS' | 'NCVET' | 'State Directorate';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

const INITIAL_GOVT_NOTICES: GovtNotice[] = [
  { id: 'gn-1', source: 'Cabinet Secretariat', title: 'Empowered Committee Review of Skill Development Missions', message: 'Annual inter-ministerial review scheduled for 22 Sep 2026 under the chairmanship of Cabinet Secretary.', timestamp: 'Today, 08:30 AM', isRead: false },
  { id: 'gn-2', source: 'PFMS', title: 'Q2 DBT Beneficiary Subsidy Clearance Completed', message: 'Public Financial Management System cleared tranche 1 disbursement of ₹142 Cr across 89,000 Aadhaar accounts.', timestamp: 'Yesterday', isRead: false },
  { id: 'gn-3', source: 'NITI Aayog', title: 'Aspirational Districts Skilling Quarterly Index Published', message: 'Evaluation scorecard for 112 Aspirational Districts ready for MSDE policy alignment and additional funding outlays.', timestamp: '08 Sep 2026', isRead: true },
  { id: 'gn-4', source: 'NCVET', title: 'NSQF Version 3.0 Curriculum Guidelines Gazetted', message: 'New national guidelines for integration of micro-credentials and AI modular competencies published in Gazette of India.', timestamp: '05 Sep 2026', isRead: true },
];

export default function GovernmentNotificationsPage() {
  const [notices, setNotices] = useState<GovtNotice[]>(INITIAL_GOVT_NOTICES);

  const markAll = () => {
    setNotices(notices.map((n) => ({ ...n, isRead: true })));
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inter-Ministerial Circulars & Government Notifications"
        subtitle="Official communications from Cabinet Secretariat, NITI Aayog, Ministry of Finance, and State Directorates"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
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
              {n.source === 'Cabinet Secretariat' && '🏛️'}
              {n.source === 'PFMS' && '💳'}
              {n.source === 'NITI Aayog' && '📊'}
              {n.source === 'NCVET' && '📜'}
              {n.source === 'State Directorate' && '🏢'}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  {n.source}
                </span>
                <span className="text-[11px] text-slate-400">{n.timestamp}</span>
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
