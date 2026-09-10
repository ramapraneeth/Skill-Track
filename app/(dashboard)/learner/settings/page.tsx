'use client';

import React, { useState } from 'react';
import {
  Globe,
  Shield,
  Bell,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function LearnerSettingsPage() {
  const [activeSection, setActiveSection] = useState<'preferences' | 'identity' | 'notifications'>('preferences');
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
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* 1. PAGE HEADER */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Account Settings & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your verified government identifiers, regional language defaults, and communication dispatch channels.
          </p>
        </div>
      </div>

      {savedMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Your preferences have been saved successfully!</span>
        </div>
      )}

      {/* 2. SECTION TABS */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveSection('preferences')}
          className={`pb-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeSection === 'preferences'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>Language & Accessibility</span>
        </button>

        <button
          onClick={() => setActiveSection('identity')}
          className={`pb-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeSection === 'identity'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Identity Registries</span>
        </button>

        <button
          onClick={() => setActiveSection('notifications')}
          className={`pb-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
            activeSection === 'notifications'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Communication Channels</span>
        </button>
      </div>

      {/* 3. SETTINGS CONTENT */}
      <div className="space-y-6">
        {/* Language & Accessibility */}
        {activeSection === 'preferences' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Language & Regional Display
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Set question paper and curriculum translation defaults.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Preferred Portal Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600 font-medium"
                >
                  <option value="English">English</option>
                  <option value="Hindi">हिंदी (Hindi)</option>
                  <option value="Telugu">తెలుగు (Telugu)</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Marathi">मराठी (Marathi)</option>
                  <option value="Bengali">বাংলা (Bengali)</option>
                </select>
                <p className="text-[11px] text-slate-500">
                  Assessments will default to this language where available.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  High Contrast Accessibility
                </label>
                <button
                  type="button"
                  onClick={() => alert('High contrast mode toggled.')}
                  className="px-3.5 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100 w-full text-left font-medium"
                >
                  Toggle High Contrast (WCAG 2.1 AA)
                </button>
                <p className="text-[11px] text-slate-500">
                  Increases contrast for low-vision candidates.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Identity & Government Registries */}
        {activeSection === 'identity' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Verified Identity Registries
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Authentications required for official proctored certifications and stipend disbursements.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">Aadhaar Linked Status</p>
                  <p className="text-[11px] text-slate-500">UIDAI Verified • Masked ID: XXXXXXXX4821</p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Active
                </span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">APAAR / EduLocker ID</p>
                  <p className="text-[11px] text-slate-500">Automated Permanent Academic Account Registry • 2024-AP-8841</p>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Linked
                </span>
              </div>

              <div className="flex items-start justify-between p-4 rounded-xl border border-slate-200 gap-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">
                    Require Aadhaar OTP for Proctored Assessments
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Guards against proxy test attempts and confirms authenticated candidate attendance for all high-stakes evaluations.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={aadhaar2FA}
                  onChange={(e) => setAadhaar2FA(e.target.checked)}
                  className="w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-600 mt-1 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* Communication & Alert Channels */}
        {activeSection === 'notifications' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Channel Preferences
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure where you receive critical stipend, assessment, and opportunity updates.
              </p>
            </div>

            <div className="space-y-3">
              <label className="flex items-start justify-between p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">
                    Direct Benefit Transfer (DBT) Stipend Alerts
                  </p>
                  <p className="text-[11px] text-slate-500">
                    SMS notifications when PFMS disburses training stipends to your Aadhaar-linked bank account.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-600 mt-1"
                />
              </label>

              <label className="flex items-start justify-between p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">
                    Examination & Hall Ticket Notifications
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Email notifications with exam time slots, instructions, and venue credentials.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-600 mt-1"
                />
              </label>

              <label className="flex items-start justify-between p-4 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-slate-900">
                    WhatsApp Updates (Skill India Verified Channel)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Receive verified messages for employer interview requests and NAPS apprenticeship openings.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappAlerts}
                  onChange={(e) => setWhatsappAlerts(e.target.checked)}
                  className="w-4 h-4 text-blue-700 rounded border-slate-300 focus:ring-blue-600 mt-1"
                />
              </label>
            </div>
          </div>
        )}

        {/* Save CTA */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow-xs transition-colors"
          >
            Save Account Settings
          </button>
        </div>
      </div>
    </div>
  );
}
