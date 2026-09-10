'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

interface WarningItem {
  id: string;
  type: 'Dropout Risk' | 'Capacity Shortfall' | 'Trainer Shortage' | 'Fund Disbursement' | 'Terminal Offline';
  title: string;
  entity: string;
  state: string;
  severity: 'Critical' | 'Major' | 'Moderate';
  impact: string;
  recommendedAction: string;
  status: 'Unresolved' | 'Notice Dispatched' | 'Remediated';
}

const WARNINGS: WarningItem[] = [
  {
    id: 'ew-1',
    type: 'Dropout Risk',
    title: 'High Dropout Warning: Foundation Electronics Batch attendance fell to 58%',
    entity: 'Rural Skill Hub (TC-BR-1049) • Batch: ELEC-2026-04',
    state: 'Bihar (Gaya)',
    severity: 'Critical',
    impact: '24 Beneficiaries at risk of scheme disqualification',
    recommendedAction: 'Dispatch state counseling team and verify PFMS DBT stipend payment to candidates.',
    status: 'Notice Dispatched',
  },
  {
    id: 'ew-2',
    type: 'Capacity Shortfall',
    title: 'Severe Regional Seat Shortage in Cloud Computing & DevOps',
    entity: 'Industrial Cluster Visakhapatnam & Vijayawada',
    state: 'Andhra Pradesh',
    severity: 'Critical',
    impact: '14,420 Seat Deficit vs 2026 hiring demands',
    recommendedAction: 'Authorize 250% training capacity expansion in regional polytechnics.',
    status: 'Unresolved',
  },
  {
    id: 'ew-3',
    type: 'Trainer Shortage',
    title: 'Upcoming Expiry of 18 Master Trainer ToT Accreditations in Automotive Sector',
    entity: 'Automotive Skill Development Council (ASDC)',
    state: 'Maharashtra & Gujarat',
    severity: 'Major',
    impact: 'Could delay 32 upcoming cohorts in EV technology',
    recommendedAction: 'Schedule priority Level 6 ToT refresher symposium in Pune CoE.',
    status: 'Unresolved',
  },
  {
    id: 'ew-4',
    type: 'Fund Disbursement',
    title: 'PFMS Milestone Tranche 2 Disbursement Delay (> 21 Days)',
    entity: 'PMKVY Special Projects Division',
    state: 'Uttar Pradesh (14 Centers)',
    severity: 'Major',
    impact: '₹4.8 Cr Training Partner reimbursement backlog',
    recommendedAction: 'Expedite PFMS audit clearance for attendance-verified training partners.',
    status: 'Notice Dispatched',
  },
  {
    id: 'ew-5',
    type: 'Terminal Offline',
    title: 'Continuous Biometric AEBAS Disconnect (> 6 Consecutive Hours)',
    entity: 'Pradhan Mantri Kaushal Kendra (TC-JH-0841)',
    state: 'Jharkhand (Ranchi)',
    severity: 'Moderate',
    impact: 'Daily candidate attendance punch data queued offline',
    recommendedAction: 'NIC field support technician ticket dispatched.',
    status: 'Remediated',
  },
];

export default function GovernmentEarlyWarningPage() {
  const [warnings, setWarnings] = useState<WarningItem[]>(WARNINGS);
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  const handleIntervene = (id: string, action: string) => {
    alert(`Intervention "${action}" initiated for Warning ${id}. Formal instruction sent to State Mission Director.`);
    setWarnings(
      warnings.map((w) => (w.id === id ? { ...w, status: 'Notice Dispatched' } : w))
    );
  };

  const filtered = selectedSeverity === 'All'
    ? warnings
    : warnings.filter((w) => w.severity === selectedSeverity);

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Early Warning & Intervention Radar"
        subtitle="Predictive AI surveillance flagging dropout risks, trainer shortages, regional seat capacity deficits, and audit non-compliance"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Early Warning' },
        ]}
      />

      {/* Severity Filter Strip */}
      <div className="flex gap-2">
        {['All', 'Critical', 'Major', 'Moderate'].map((sev) => (
          <button
            key={sev}
            onClick={() => setSelectedSeverity(sev)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedSeverity === sev
                ? 'bg-[#1D4ED8] text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
            }`}
          >
            {sev === 'All' ? 'All Warnings (5)' : `${sev} Severity`}
          </button>
        ))}
      </div>

      {/* Warnings List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-xl border shadow-xs bg-white dark:bg-slate-900 transition-all ${
              item.severity === 'Critical'
                ? 'border-l-4 border-l-red-500 border-slate-200 dark:border-slate-800'
                : item.severity === 'Major'
                ? 'border-l-4 border-l-amber-500 border-slate-200 dark:border-slate-800'
                : 'border-l-4 border-l-blue-500 border-slate-200 dark:border-slate-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    item.severity === 'Critical'
                      ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                      : item.severity === 'Major'
                      ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                      : 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                  }`}
                >
                  {item.severity} Severity
                </span>
                <span className="text-xs font-semibold text-slate-500">{item.type}</span>
                <span className="text-xs text-slate-400">• {item.state}</span>
              </div>

              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded ${
                  item.status === 'Remediated'
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                    : item.status === 'Notice Dispatched'
                    ? 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300'
                    : 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="pt-3 space-y-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">{item.title}</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{item.entity}</p>
              <div className="text-xs font-semibold text-red-700 dark:text-red-400">
                Impact Assessment: {item.impact}
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                <span className="font-bold text-[#1D4ED8] dark:text-blue-400 shrink-0">AI Action Directive:</span>
                <span>{item.recommendedAction}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <button
                onClick={() => handleIntervene(item.id, 'Trigger Immediate State Inspection')}
                className="px-3 py-1.5 font-semibold rounded-lg bg-[#1D4ED8] text-white hover:bg-blue-800 shadow-2xs"
              >
                Authorize Immediate Intervention
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
