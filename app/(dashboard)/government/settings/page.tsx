'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

export default function GovernmentSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Ministry Platform Configuration & Gateway Settings"
        subtitle="Manage national API gateway keys (DigiLocker, PFMS, AEBAS), audit logging, and nodal officer credentials"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Settings' },
        ]}
      />

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs font-semibold">
          ✓ Government portal settings and security policies updated successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Nodal Officer Credentials */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Nodal Authority Identification
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Nodal Officer Name</label>
              <input
                type="text"
                disabled
                value="Shri Alok Verma, IAS"
                className="w-full px-3 py-1.5 border rounded bg-slate-100 border-slate-300 font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Designation & Ministry</label>
              <input
                type="text"
                disabled
                value="Joint Secretary (Policy & IT), MSDE"
                className="w-full px-3 py-1.5 border rounded bg-slate-100 border-slate-300 font-semibold text-slate-800"
              />
            </div>
          </div>
        </div>

        {/* Central National Gateway Integrations */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
            National Digital Public Infrastructure (DPI) Gateways
          </h3>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-200">
              <div>
                <p className="font-bold text-slate-900">UIDAI Central Identity Data Repository (CIDR)</p>
                <p className="text-[11px] text-slate-500">Biometric fingerprint authentication & de-duplication gateway</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-xs">
                Active & Live
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-200">
              <div>
                <p className="font-bold text-slate-900">Public Financial Management System (PFMS / DBT)</p>
                <p className="text-[11px] text-slate-500">Aadhaar payment bridge for student stipends and partner subsidies</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-xs">
                Connected (256-bit SSL)
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-200">
              <div>
                <p className="font-bold text-slate-900">DigiLocker National Academic Depository (NAD)</p>
                <p className="text-[11px] text-slate-500">Automated issuing of NSQF digital verified certificates</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-xs">
                Synchronized
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-slate-50 border border-slate-200">
              <div>
                <p className="font-bold text-slate-900">NIC Central Biometric Attendance System (AEBAS)</p>
                <p className="text-[11px] text-slate-500">Real-time sync of attendance punches from 24,800 terminals</p>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 font-semibold text-xs">
                Online (98.4% Uptime)
              </span>
            </div>
          </div>
        </div>

        {/* Security & Audit Policies */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Security & Cryptographic Audit Standards
          </h3>
          <div className="space-y-2 text-xs text-slate-600">
            <div className="flex items-center justify-between">
              <span>National Cyber Security Directive Compliance:</span>
              <span className="font-bold text-emerald-700">CERT-In Audited</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Audit Log Retention Policy:</span>
              <span className="font-bold text-slate-800">7 Years (Immutable WORM Storage)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Data Localization:</span>
              <span className="font-bold text-slate-800">MeitY Empaneled Sovereign Cloud (NIC)</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm transition-colors"
          >
            Save Gateway Settings
          </button>
        </div>
      </form>
    </div>
  );
}
