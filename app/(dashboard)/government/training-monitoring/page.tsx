'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';

export default function GovernmentTrainingMonitoringPage() {
  const terminalAlerts = [
    { center: 'Pradhan Mantri Kaushal Kendra, Patna', issue: 'Biometric Terminal Offline (> 3 hrs)', severity: 'High', status: 'Technician Dispatched' },
    { center: 'Rural Skill Hub, Varanasi', issue: 'Sudden attendance drop below 60% on 09 Sep', severity: 'Medium', status: 'Audit Notice Issued' },
    { center: 'Industrial Training Center, Nashik', issue: 'CCTV video streaming packet loss detected', severity: 'Low', status: 'Auto-reconnected' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Central Surveillance & Live AEBAS Monitoring"
        subtitle="Aadhaar-Enabled Biometric Attendance System (AEBAS) terminal telemetry and center CCTV audits"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Training Surveillance' },
        ]}
        actions={
          <button
            onClick={() => alert('Biometric ping sweep initiated across all 24,800 terminals.')}
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>🔄</span> Run Nationwide Terminal Ping Sweep
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Online AEBAS Terminals"
          value="24,410 / 24,800"
          subtitle="98.4% Live Availability"
          icon="📡"
          trend={{ value: "Operational across India", isPositive: true }}
          highlightColor="#10b981"
        />
        <KPICard
          title="Today's Biometric Punches"
          value="412,890"
          subtitle="Processed at NIC Cloud"
          icon="👆"
          trend={{ value: "+8% vs yesterday", isPositive: true }}
          highlightColor="#0B3B60"
        />
        <KPICard
          title="CCTV Encrypted Feeds"
          value="18,920"
          subtitle="Classrooms with active streaming"
          icon="📹"
          trend={{ value: "97.8% Compliance", isPositive: true }}
          highlightColor="#6366f1"
        />
        <KPICard
          title="Active Monitoring Alerts"
          value="3"
          subtitle="Critical anomalies flagged"
          icon="🚨"
          trend={{ value: "Under investigation", isPositive: false }}
          highlightColor="#ef4444"
        />
      </div>

      {/* Critical Anomaly Alerts */}
      <div className="bg-white rounded-lg border border-red-200 shadow-sm p-5 space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 flex items-center gap-2">
          <span>🚨</span> Live Infrastructure & Biometric Irregularities
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Training Center Name</th>
                <th className="py-2.5 px-3">Detected Anomaly</th>
                <th className="py-2.5 px-3">Severity Level</th>
                <th className="py-2.5 px-3">Intervention Status</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {terminalAlerts.map((a, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-semibold text-slate-900">{a.center}</td>
                  <td className="py-3 px-3 text-slate-700">{a.issue}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        a.severity === 'High'
                          ? 'bg-red-100 text-red-800'
                          : a.severity === 'Medium'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {a.severity}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-slate-700">{a.status}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => alert(`Inspection escalation triggered for ${a.center}`)}
                      className="px-2.5 py-1 text-xs border border-slate-300 rounded font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
