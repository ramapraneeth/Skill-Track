'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

export default function LearnerSettingsPage() {
  const [language, setLanguage] = useState('English');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [aadhaar2FA, setAadhaar2FA] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-4xl">
      <PageHeader
        title="Settings & Privacy"
        subtitle="Manage your authentication credentials, notification channels, and Aadhaar/DigiLocker linkages"
        breadcrumbs={[
          { label: 'Portal', href: '/learner/dashboard' },
          { label: 'Settings' },
        ]}
      />

      {savedMessage && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs font-semibold flex items-center gap-2">
          <span>✓</span> Preferences updated successfully!
        </div>
      )}

      <div className="space-y-6">
        {/* Language & Regional Settings */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Language & Accessibility
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">Preferred Portal Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#0B3B60]"
              >
                <option value="English">English</option>
                <option value="Hindi">हिंदी (Hindi)</option>
                <option value="Telugu">తెలుగు (Telugu)</option>
                <option value="Tamil">தமிழ் (Tamil)</option>
                <option value="Marathi">मराठी (Marathi)</option>
                <option value="Bengali">বাংলা (Bengali)</option>
              </select>
              <p className="text-[11px] text-slate-500 mt-1">
                Assessment question papers and portal navigation will default to this language where available.
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1">High Contrast Accessibility</label>
              <button
                type="button"
                onClick={() => alert('High contrast mode toggled.')}
                className="px-3.5 py-2 text-xs rounded border border-slate-300 text-slate-700 hover:bg-slate-50 w-full text-left"
              >
                Toggle High Contrast (WCAG 2.1 AA)
              </button>
            </div>
          </div>
        </div>

        {/* Security & Government Identifiers */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Identity & Authentication
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-md bg-slate-50 border border-slate-200">
              <div>
                <p className="text-xs font-semibold text-slate-800">Aadhaar Linked Status</p>
                <p className="text-[11px] text-slate-500">UIDAI Verified • XXXXXXXX4821</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                Verified Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-md bg-slate-50 border border-slate-200">
              <div>
                <p className="text-xs font-semibold text-slate-800">APAAR / EduLocker ID</p>
                <p className="text-[11px] text-slate-500">Automated Permanent Academic Account Registry</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded">
                Linked (2024-AP-8841)
              </span>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <p className="text-xs font-semibold text-slate-800">Require Aadhaar OTP for Examination Start</p>
                <p className="text-[11px] text-slate-500">Prevents proxy test attempts and confirms candidate presence</p>
              </div>
              <input
                type="checkbox"
                checked={aadhaar2FA}
                onChange={(e) => setAadhaar2FA(e.target.checked)}
                className="w-4 h-4 text-[#0B3B60] rounded border-slate-300"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Dispatch Channels */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
            Communication & Alert Preferences
          </h3>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-slate-800">Direct Benefit Transfer (DBT) Stipend Alerts</p>
                <p className="text-[11px] text-slate-500">Instant SMS notifications when PFMS disburses training stipends</p>
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
                <p className="text-xs font-semibold text-slate-800">Examination & Hall Ticket Notifications</p>
                <p className="text-[11px] text-slate-500">Email reminders with admit cards and venue details</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0B3B60] rounded border-slate-300"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer border-t border-slate-100 pt-3">
              <div>
                <p className="text-xs font-semibold text-slate-800">WhatsApp Updates (Skill India Official)</p>
                <p className="text-[11px] text-slate-500">Receive verified alerts for interview calls and NAPS apprenticeships</p>
              </div>
              <input
                type="checkbox"
                checked={whatsappAlerts}
                onChange={(e) => setWhatsappAlerts(e.target.checked)}
                className="w-4 h-4 text-[#0B3B60] rounded border-slate-300"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
