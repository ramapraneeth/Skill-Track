'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

interface ComplianceAlert {
  id: string;
  type: 'Biometric Discrepancy' | 'Attendance Shortfall' | 'Fund Misuse' | 'Accreditation';
  title: string;
  entity: string;
  location: string;
  severity: 'Critical' | 'Major' | 'Moderate';
  detectedAt: string;
  status: 'Under Investigation' | 'Show-Cause Issued' | 'Pending Review';
}

const INITIAL_ALERTS: ComplianceAlert[] = [
  {
    id: 'alt-1',
    type: 'Biometric Discrepancy',
    title: 'Simultaneous AEBAS Fingerprint Punch Detected Across 2 Centers',
    entity: 'Candidate UIDAI: XXXXXXXX9912 (Enrolled in 2 TCs)',
    location: 'Patna & Muzaffarpur, Bihar',
    severity: 'Critical',
    detectedAt: 'Today, 09:42 AM',
    status: 'Under Investigation',
  },
  {
    id: 'alt-2',
    type: 'Attendance Shortfall',
    title: 'Batch Attendance Sub-60% for 5 Consecutive Sessions',
    entity: 'Skill Pro Center (TC-BR-1049) • Batch: ELEC-2026-04',
    location: 'Gaya, Bihar',
    severity: 'Major',
    detectedAt: '09 Sep 2026',
    status: 'Show-Cause Issued',
  },
  {
    id: 'alt-3',
    type: 'Fund Misuse',
    title: 'Mismatch in Training Partner Invoiced Hours vs Biometric Logs',
    entity: 'Apex Vocational Institute (TP-UP-4881)',
    location: 'Lucknow, Uttar Pradesh',
    severity: 'Critical',
    detectedAt: '08 Sep 2026',
    status: 'Under Investigation',
  },
  {
    id: 'alt-4',
    type: 'Accreditation',
    title: 'SMART Fire Safety Clearance Certificate Expired',
    entity: 'National Skill Hub (TC-TS-8841)',
    location: 'Warangal, Telangana',
    severity: 'Moderate',
    detectedAt: '06 Sep 2026',
    status: 'Pending Review',
  },
];

export default function GovernmentAlertsPage() {
  const [alerts, setAlerts] = useState<ComplianceAlert[]>(INITIAL_ALERTS);

  const handleAction = (id: string, action: string) => {
    alert(`Action "${action}" executed for Alert ${id}. Formal notice transmitted to State Directorate.`);
    setAlerts(
      alerts.map((a) => (a.id === id ? { ...a, status: 'Show-Cause Issued' } : a))
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Compliance Anomalies & Fraud Prevention Radar"
        subtitle="Automated AI telemetry detecting biometric irregularities, ghost beneficiaries, and audit non-compliance"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Compliance Alerts' },
        ]}
      />

      <div className="space-y-4">
        {alerts.map((al) => (
          <div
            key={al.id}
            className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3 hover:border-slate-300 transition-all"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    al.severity === 'Critical'
                      ? 'bg-red-100 text-red-800'
                      : al.severity === 'Major'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {al.severity} Severity
                </span>
                <span className="text-xs font-semibold text-slate-500">{al.type}</span>
              </div>
              <span className="text-xs text-slate-400">Detected: {al.detectedAt}</span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-slate-900">{al.title}</h3>
              <p className="text-xs font-medium text-slate-700 mt-0.5">{al.entity}</p>
              <p className="text-xs text-slate-500 mt-0.5">Location: {al.location}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Current Status:</span>
                <span className="font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">
                  {al.status}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(al.id, 'Issue Show-Cause Notice')}
                  className="px-3 py-1.5 font-semibold rounded bg-amber-600 text-white hover:bg-amber-700"
                >
                  Issue Show-Cause Notice
                </button>
                <button
                  onClick={() => handleAction(al.id, 'Order Forensic Physical Audit')}
                  className="px-3 py-1.5 font-semibold rounded bg-red-700 text-white hover:bg-red-800"
                >
                  Order Forensic Audit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
