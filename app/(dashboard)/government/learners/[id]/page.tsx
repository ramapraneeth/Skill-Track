'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { sidhStore } from '@/lib/sidh-store';

export default function GovernmentLearnerDetailPage() {
  const params = useParams();
  const learnerId = params?.id as string;
  const learner = sidhStore.getLearnerById(learnerId) || sidhStore.getLearners()[0];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Beneficiary Dossier: ${learner.name}`}
        subtitle={`UIDAI Seeded Beneficiary ID: ${learner.id} • Scheme: PMKVY 4.0 Special Projects`}
        badge="Verified Beneficiary"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Learners', href: '/government/learners' },
          { label: learner.name },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => alert('DigiLocker credential audit verification re-run: Hash matched on blockchain ledger.')}
              className="px-3.5 py-2 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
            >
              <span>🔗</span> Audit DigiLocker Hash
            </button>
            <button
              onClick={() => alert('National Candidate Dossier exported as signed PDF.')}
              className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47]"
            >
              Export Audit Dossier
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Demographics & Training Lifecycle (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Identity & De-duplication Registry */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
              National De-duplication & Demographic Identity
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Aadhaar (UIDAI):</span>
                <span className="font-mono font-semibold text-emerald-700">XXXXXXXX4821 (Verified)</span>
              </div>
              <div>
                <span className="text-slate-500 block">APAAR / EduLocker ID:</span>
                <span className="font-mono font-semibold text-slate-800">2024-AP-8841</span>
              </div>
              <div>
                <span className="text-slate-500 block">Gender & Social Category:</span>
                <span className="font-semibold text-slate-800">{learner.gender}, OBC Non-Creamy</span>
              </div>
              <div>
                <span className="text-slate-500 block">Domicile & Region:</span>
                <span className="font-semibold text-slate-800">Telangana (Semi-Urban)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Contact Phone:</span>
                <span className="font-semibold text-slate-800">{learner.phone}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Official Email:</span>
                <span className="font-semibold text-slate-800">{learner.email}</span>
              </div>
            </div>
          </div>

          {/* Biometric AEBAS Verification & Classroom Audit */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-sm text-slate-900">Central AEBAS Biometric Audit</h3>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Attendance Compliance: 92.4%
              </span>
            </div>
            <ProgressBar value={92} max={100} color="#10b981" />
            <p className="text-[11px] text-slate-500">
              Biometric fingerprints matched against UIDAI Central Identity Data Repository (CIDR). Zero proxy attendance detected across 48 classroom sessions.
            </p>
          </div>

          {/* Scheme Direct Benefit Transfer (DBT) Audit Trail */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="font-semibold text-sm text-slate-900">PFMS / DBT Stipend Subsidy Ledger</h3>
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[10px]">
                <tr>
                  <th className="py-2 px-3">Tranche</th>
                  <th className="py-2 px-3">Purpose</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Bank UTR / PFMS Ref</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">Tranche 1</td>
                  <td className="py-2.5 px-3 text-slate-600">Training Support & Uniform Allowance</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">₹1,500</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">PFMS2026884102</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      Disbursed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">Tranche 2</td>
                  <td className="py-2.5 px-3 text-slate-600">Assessment Fee Subsidy (Direct to SSC)</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">₹1,000</td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-600">PFMS2026884199</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px]">
                      Settled
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Placement & Employment Verification (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Employment Placement Verification
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block">Placement Status:</span>
                <span className="text-emerald-700 font-bold text-sm">Verified Placed (EPFO Active)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Hiring Organization:</span>
                <span className="font-semibold text-slate-900">Tata Consultancy Services (TCS)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Job Role:</span>
                <span className="font-semibold text-slate-800">Associate Web Application Developer</span>
              </div>
              <div>
                <span className="text-slate-500 block">Monthly Compensation:</span>
                <span className="font-semibold text-slate-900">₹24,500 / Month</span>
              </div>
              <div>
                <span className="text-slate-500 block">EPFO Universal Account (UAN):</span>
                <span className="font-mono text-slate-800 bg-slate-100 p-1 rounded inline-block text-[11px]">
                  101499281726
                </span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-lg border border-emerald-200 p-4 text-xs space-y-2">
            <h4 className="font-bold text-emerald-900 flex items-center gap-1.5">
              <span>🏛️</span> NCVET / NSQF Credential
            </h4>
            <p className="text-emerald-800 text-[11px] leading-relaxed">
              Certificate verified in DigiLocker National Academic Depository (NAD). Valid across Union and State Government employment recruitments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
