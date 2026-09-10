'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function GovernmentCertificationsPage() {
  const [searchId, setSearchId] = useState('');
  const [verificationResult, setVerificationResult] = useState<any | null>(null);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setVerificationResult({
      candidate: 'Arjun Patel',
      course: 'Full Stack Web Development (PMKVY 4.0)',
      nsqfLevel: 5,
      issueDate: '2026-08-15',
      authority: 'Sector Skill Council NASSCOM & NCVET',
      credentialId: searchId.trim(),
      status: 'Authentic & Active',
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Certification Ledger & DigiLocker Telemetry"
        subtitle="Verifiable cryptographic certificates of competency issued under NCVET & Sector Skill Councils"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Certifications' },
        ]}
        actions={
          <button
            onClick={() => alert('DigiLocker synchronization ledger exported.')}
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>🔗</span> Sync DigiLocker Registry
          </button>
        }
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Certificates Issued"
          value="1,180,450"
          subtitle="FY 2026-27 YTD"
          icon="📜"
          trend={{ value: "+9.2% YoY", isPositive: true }}
          highlightColor="#0B3B60"
        />
        <KPICard
          title="DigiLocker Pushed"
          value="100%"
          subtitle="Direct to Candidate Locker"
          icon="🔒"
          trend={{ value: "Zero physical paperwork", isPositive: true }}
          highlightColor="#10b981"
        />
        <KPICard
          title="National Pass Rate"
          value="83.1%"
          subtitle="Summative examination average"
          icon="📊"
          trend={{ value: "+2.4% vs benchmark", isPositive: true }}
          highlightColor="#6366f1"
        />
        <KPICard
          title="QR Verifications Conducted"
          value="240,890"
          subtitle="By employers & recruiters"
          icon="📱"
          trend={{ value: "Tamper-proof credentials", isPositive: true }}
          highlightColor="#f59e0b"
        />
      </div>

      {/* Credential Verification Search Form */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-slate-900">National Credential Verification Lookup</h3>
        <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            placeholder="Enter Credential ID (e.g. SIDH-2026-WD-88421)..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
          />
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
          >
            Verify Credential Authenticity
          </button>
        </form>

        {verificationResult && (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-xs space-y-2 mt-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 text-sm">✓ Credential Verified Authentic</span>
              <span className="font-mono text-emerald-800 text-[11px] bg-emerald-100 px-2 py-0.5 rounded">
                ID: {verificationResult.credentialId}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-slate-700">
              <div>
                <span className="text-slate-500 block text-[11px]">Candidate:</span>
                <span className="font-semibold text-slate-900">{verificationResult.candidate}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Course Qualification:</span>
                <span className="font-semibold text-slate-900">{verificationResult.course}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">NSQF Level:</span>
                <span className="font-semibold text-slate-900">Level {verificationResult.nsqfLevel}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[11px]">Issuing Body:</span>
                <span className="font-semibold text-slate-900">{verificationResult.authority}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sector Skill Council Pass Rate Distribution */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-slate-900">Sector Skill Council Certification Metrics</h3>
        <div className="space-y-3 text-xs">
          {[
            { sector: 'IT-ITeS Sector Skill Council (NASSCOM)', candidates: '342,000', passRate: 88 },
            { sector: 'Electronics & Hardware Sector Skill Council', candidates: '184,000', passRate: 81 },
            { sector: 'Automotive Skill Development Council', candidates: '210,000', passRate: 84 },
            { sector: 'Healthcare Sector Skill Council', candidates: '154,000', passRate: 86 },
            { sector: 'Renewable Energy Skill Council', candidates: '92,000', passRate: 79 },
          ].map((sc, i) => (
            <div key={i} className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-800">{sc.sector}</span>
                <span className="text-slate-600">
                  {sc.candidates} Certified • <strong className="text-[#0B3B60]">{sc.passRate}% Pass Rate</strong>
                </span>
              </div>
              <ProgressBar value={sc.passRate} max={100} color="#0B3B60" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
