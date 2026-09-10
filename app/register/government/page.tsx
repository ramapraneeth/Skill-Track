'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Mail,
  Building,
  FileText,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function RegisterGovernmentPage() {
  const [formData, setFormData] = useState({
    officerName: '',
    department: 'Ministry of Skill Development & Entrepreneurship',
    designation: 'Joint Director (Outcome Intelligence)',
    officialGovEmail: '',
    phone: '',
    state: 'National / Central Ministry',
    employeeCode: '',
    purposeOfAccess: 'State Skilling Telemetry & Outcome Monitoring',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const sessionUser = {
      id: 'gov-001',
      fullName: formData.officerName || 'Dr. Rajiv Kumar',
      email: formData.officialGovEmail || 'director.msde@skillbridge.gov.in',
      role: 'government',
      organization: formData.department,
    };
    localStorage.setItem('skilltrack_user', JSON.stringify(sessionUser));
    localStorage.setItem('skilltrack_role', 'government');
    localStorage.setItem('skilltrack_token', 'demo_jwt_' + Date.now());
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <header className="bg-white border-b border-[#CBD5E1] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/register" className="text-xs font-bold text-[#0B3B60] hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Role Selection
          </Link>
          <span className="text-xs text-[#64748B]">Restricted Government Protocol</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-xl max-w-xl w-full overflow-hidden">
          <div className="bg-[#0B3B60] text-white p-6 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF9933] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Official Authorization Protocol
            </div>
            <h2 className="text-lg font-black mt-1">Government Administrator Clearance</h2>
            <p className="text-xs text-[#CBD5E1] mt-0.5">
              Restricted to authorized central & state mission officers
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase tracking-wider">
                Clearance Granted (Demo Mode)
              </div>
              <h3 className="text-base font-bold text-[#102A43]">
                Government Authority Access Provisioned
              </h3>
              <p className="text-xs text-[#627D98] max-w-md mx-auto leading-relaxed">
                Your credentials have been validated against the National Governance Registry. You have been provisioned
                supervisory permissions for regional telemetry and program administration.
              </p>
              <div className="pt-4 flex items-center justify-center">
                <Link
                  href="/government/dashboard"
                  className="px-6 py-2.5 rounded bg-[#0B3B60] text-white font-bold text-xs hover:bg-[#002541] transition-all flex items-center gap-2"
                >
                  <span>Enter Government Command Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="p-3 bg-[#F0F9FF] border border-[#BAE6FD] text-[#0369A1] rounded text-xs leading-relaxed flex items-center gap-2">
                <Lock className="w-4 h-4 shrink-0 text-[#0284C7]" />
                <span>
                  Public registration for Government role is restricted. Only verified officers with official government domain credentials (e.g. <code>.gov.in</code> or <code>.nic.in</code>) can request access.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Designated Officer Name *</label>
                <input
                  type="text"
                  required
                  value={formData.officerName}
                  onChange={(e) => setFormData({ ...formData, officerName: e.target.value })}
                  placeholder="e.g. Dr. Rajiv Kumar"
                  className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Department / Ministry *</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Official Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Official Government Email (.gov.in / .nic.in) *</label>
                  <input
                    type="email"
                    required
                    value={formData.officialGovEmail}
                    onChange={(e) => setFormData({ ...formData, officialGovEmail: e.target.value })}
                    placeholder="officer@msde.gov.in"
                    className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Government ID / Employee Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.employeeCode}
                    onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
                    placeholder="e.g. GOV-IND-4091"
                    className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Operational Scope & Purpose *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.purposeOfAccess}
                  onChange={(e) => setFormData({ ...formData, purposeOfAccess: e.target.value })}
                  className="w-full p-2.5 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-xs mt-2"
              >
                <span>Request Clearance & Enter Command</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
