'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

export default function TrainerSettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Trainer Account & System Settings"
        subtitle="Configure biometric AEBAS punch credentials, notification dispatches, and security"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Settings' },
        ]}
      />

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs font-semibold">
          ✓ Trainer configuration settings saved successfully!
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Biometric AEBAS Credentials */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
            AEBAS Biometric Identification
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-600 font-medium mb-1">Trainer Biometric Punch ID</label>
              <input
                type="text"
                disabled
                value="NSTI-TR-88219"
                className="w-full px-3 py-1.5 border rounded bg-slate-100 border-slate-300 font-mono text-slate-700"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Issued by National Skill Training Institute</span>
            </div>
            <div>
              <label className="block text-slate-600 font-medium mb-1">Mapped Sector Skill Council</label>
              <input
                type="text"
                disabled
                value="SSC NASSCOM (IT-ITeS)"
                className="w-full px-3 py-1.5 border rounded bg-slate-100 border-slate-300 font-medium text-slate-700"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Accredited ToT Level 6</span>
            </div>
          </div>
        </div>

        {/* Communication Preferences */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Notification Dispatches
          </h3>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="font-semibold text-slate-800">Daily Attendance Shortfall Alerts</p>
                <p className="text-[11px] text-slate-500">Receive an SMS alert if candidate attendance dips below 80%</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0B3B60] rounded border-slate-300"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 pt-3">
              <div>
                <p className="font-semibold text-slate-800">Assessment Submissions & Result Dispatches</p>
                <p className="text-[11px] text-slate-500">Email copies of external assessor score rubrics and certification notices</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0B3B60] rounded border-slate-300"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm transition-colors"
          >
            Save Trainer Preferences
          </button>
        </div>
      </form>
    </div>
  );
}
