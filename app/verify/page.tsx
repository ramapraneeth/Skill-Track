'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Search,
  Award,
  Calendar,
  Building,
  User,
  KeyRound,
  FileCheck,
  Lock,
} from 'lucide-react';

export default function VerifyCredentialsPage() {
  const [activeTab, setActiveTab] = useState<'credential' | '2fa'>('credential');
  const [credentialId, setCredentialId] = useState('ST-2026-IND-8849');
  const [hasSearched, setHasSearched] = useState(true);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  const credentialRecord = {
    credentialId: credentialId.toUpperCase() || 'ST-2026-IND-8849',
    candidateName: 'Rahul Sharma',
    skill: 'Embedded Systems & IoT Engineering',
    nsqfLevel: 'NSQF Level 6',
    institution: 'National Skill Training Institute (NSTI), Bengaluru',
    issueDate: '14 August 2025',
    status: 'Verified Authenticated',
    hash: 'sha256:8f4c2e71d3a01b5e...9a3b210d',
    retentionWage: '₹42,000 / month (Monitored)',
    authority: 'Directorate General of Training (DGT) / NCVET',
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentialId.trim()) return;
    setHasSearched(true);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOtpVerified(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAFE] text-[#0B2F55]">
      {/* Subtle National Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#F59E0B]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#16A36A]" />
      </div>

      {/* Official Government Header */}
      <header className="bg-white border-b border-[#E5EDF6] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* State Emblem representation */}
            <div className="w-8 h-10 flex-shrink-0 flex items-center justify-center text-[#0B2F55]">
              <svg viewBox="0 0 100 125" className="w-7 h-9 fill-current" aria-label="State Emblem of India">
                <path d="M50 8 C46 8 43 11 43 15 C43 17 44 19 46 20 C42 22 39 26 39 31 C39 36 43 40 47 41 C46 43 45 45 45 48 C42 48 39 50 38 53 C37 57 39 61 43 62 L43 72 L37 72 C35 72 33 74 33 76 L33 80 L67 80 L67 76 C67 74 65 72 63 72 L57 72 L57 62 C61 61 63 57 62 53 C61 50 58 48 55 48 C55 45 54 43 53 41 C57 40 61 36 61 31 C61 26 58 22 54 20 C56 19 57 17 57 15 C57 11 54 8 50 8 Z" />
                <path d="M36 24 C33 22 28 24 26 27 C24 30 24 35 26 38 C28 41 32 42 35 41 C36 39 37 36 38 33 C37 30 36 27 36 24 Z" opacity="0.9" />
                <path d="M64 24 C67 22 72 24 74 27 C76 30 76 35 74 38 C72 41 68 42 65 41 C64 39 63 36 62 33 C63 30 64 27 64 24 Z" opacity="0.9" />
                <rect x="22" y="82" width="56" height="11" rx="2" fill="currentColor" />
                <circle cx="50" cy="87.5" r="4.5" fill="#FFFFFF" />
                <circle cx="50" cy="87.5" r="1.5" fill="currentColor" />
                <path d="M26 95 C30 102 40 106 50 106 C60 106 70 102 74 95 L26 95 Z" opacity="0.85" />
                <rect x="20" y="108" width="60" height="4" rx="1.5" />
              </svg>
            </div>
            <div className="flex flex-col border-r border-[#CFE3FA] pr-4">
              <span className="text-[10px] font-bold tracking-widest text-[#0B2F55] uppercase leading-tight">
                Government of India
              </span>
              <span className="text-[9px] text-[#45627F] font-medium leading-tight">
                National Credential Trust Network
              </span>
            </div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-extrabold text-xs shadow-2xs">
                ST
              </div>
              <div>
                <span className="font-extrabold text-[#0B2F55] text-sm tracking-tight block">
                  Skill Track
                </span>
                <span className="text-[10px] text-[#45627F] block -mt-0.5">
                  Statutory Accreditation Registry
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-[#45627F] hover:text-[#0B2F55] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-xs font-bold px-4 py-2 rounded-lg bg-[#1769E0] hover:bg-[#2563EB] text-white transition-colors shadow-2xs"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 sm:py-16 space-y-8">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#16A34A] bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Credential Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2D4F] tracking-tight">
            Verify Skills. Trust Credentials.
          </h1>
          <p className="text-xs sm:text-sm text-[#4B6380] leading-relaxed">
            Verify candidate credentials, cryptographically signed NSQF records, and accredited training certifications issued under national skilling frameworks.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-[#EAF4FF] rounded-lg border border-[#CBDDF6]">
            <button
              onClick={() => setActiveTab('credential')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                activeTab === 'credential'
                  ? 'bg-white text-[#1769E0] shadow-xs'
                  : 'text-[#4B6380] hover:text-[#0B2D4F]'
              }`}
            >
              Credential Verification
            </button>
            <button
              onClick={() => setActiveTab('2fa')}
              className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                activeTab === '2fa'
                  ? 'bg-white text-[#1769E0] shadow-xs'
                  : 'text-[#4B6380] hover:text-[#0B2D4F]'
              }`}
            >
              Two-Factor Account Auth
            </button>
          </div>
        </div>

        {activeTab === 'credential' ? (
          <div className="space-y-6">
            {/* Search Input Box */}
            <div className="bg-white border border-[#E4EDF7] rounded-2xl p-6 sm:p-8 gov-card-shadow">
              <form onSubmit={handleVerifySubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#4B6380] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={credentialId}
                    onChange={(e) => setCredentialId(e.target.value)}
                    placeholder="Enter Credential ID (e.g. ST-2026-IND-8849)"
                    className="w-full h-11 pl-10 pr-4 rounded-lg border border-[#CBDDF6] text-xs sm:text-sm text-[#0B2D4F] placeholder-[#4B6380]/60 focus:outline-none focus:border-[#1769E0]"
                  />
                </div>
                <button
                  type="submit"
                  className="h-11 px-6 rounded-lg bg-[#1769E0] hover:bg-[#1E6FF2] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential</span>
                </button>
              </form>
            </div>

            {/* Verification Result Card */}
            {hasSearched && (
              <div className="bg-white border border-[#CBDDF6] rounded-2xl p-6 sm:p-8 gov-card-shadow space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4EDF7] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-[#16A34A] flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-extrabold text-[#0B2D4F]">
                          Verified Credential
                        </span>
                        <span className="text-[10px] font-bold text-[#16A34A] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Authentic &amp; Tamper-Proof
                        </span>
                      </div>
                      <span className="text-xs text-[#4B6380] font-mono block">
                        Identifier: {credentialRecord.credentialId}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] text-[#4B6380] block">Issuing Authority</span>
                    <span className="text-xs font-bold text-[#0B2D4F]">{credentialRecord.authority}</span>
                  </div>
                </div>

                {/* Credential Data Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                  <div className="p-4 rounded-xl bg-[#F7FAFE] border border-[#E4EDF7] space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#4B6380]">
                      <User className="w-3.5 h-3.5 text-[#1769E0]" />
                      <span>Candidate Name</span>
                    </div>
                    <span className="font-extrabold text-[#0B2D4F] text-sm block">
                      {credentialRecord.candidateName}
                    </span>
                    <span className="text-[10px] text-[#16A34A] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Identity Verified via Aadhaar / SIDH
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7FAFE] border border-[#E4EDF7] space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#4B6380]">
                      <Award className="w-3.5 h-3.5 text-[#1769E0]" />
                      <span>Skill &amp; Framework Level</span>
                    </div>
                    <span className="font-extrabold text-[#0B2D4F] text-sm block">
                      {credentialRecord.skill}
                    </span>
                    <span className="text-[11px] font-bold text-[#1769E0]">
                      {credentialRecord.nsqfLevel}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7FAFE] border border-[#E4EDF7] space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#4B6380]">
                      <Building className="w-3.5 h-3.5 text-[#1769E0]" />
                      <span>Accredited Institution</span>
                    </div>
                    <span className="font-bold text-[#0B2D4F] block">
                      {credentialRecord.institution}
                    </span>
                    <span className="text-[10px] text-[#4B6380]">Affiliated Centre ID: TC-KA-0941</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7FAFE] border border-[#E4EDF7] space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] text-[#4B6380]">
                      <Calendar className="w-3.5 h-3.5 text-[#1769E0]" />
                      <span>Issue Date &amp; Status</span>
                    </div>
                    <span className="font-bold text-[#0B2D4F] block">
                      {credentialRecord.issueDate}
                    </span>
                    <span className="text-[11px] font-bold text-[#16A34A] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Status: {credentialRecord.status}
                    </span>
                  </div>
                </div>

                {/* Cryptographic Proof Strip */}
                <div className="pt-3 border-t border-[#E4EDF7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#4B6380]">
                  <div className="font-mono bg-[#F0F5FA] px-3 py-1.5 rounded-lg border border-[#E4EDF7] truncate max-w-md">
                    Proof Hash: {credentialRecord.hash}
                  </div>
                  <Link
                    href="/login"
                    className="text-[#1769E0] font-bold hover:underline inline-flex items-center gap-1"
                  >
                    <span>View Candidate Longitudinal Dossier</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Two-Factor Account Verification Tab */
          <div className="bg-white border border-[#E4EDF7] rounded-2xl p-6 sm:p-8 gov-card-shadow max-w-md mx-auto space-y-5">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-[#EAF4FF] text-[#1769E0] flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-[#0B2D4F]">Verify Account Credentials</h2>
              <p className="text-xs text-[#4B6380]">
                Enter the 6-digit OTP dispatched to your registered mobile/email
              </p>
            </div>

            {isOtpVerified ? (
              <div className="p-6 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#16A34A] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-[#0B2D4F]">Account Validated</h3>
                <p className="text-xs text-[#4B6380]">
                  Your account credentials have been successfully authenticated.
                </p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1769E0] text-white text-xs font-bold"
                >
                  <span>Proceed to Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleOtpVerify} className="space-y-4">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-input-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      placeholder="•"
                      className="w-11 h-12 text-center text-lg font-mono font-bold border border-[#CBDDF6] rounded-lg bg-white text-[#0B2D4F] focus:outline-none focus:border-[#1769E0]"
                    />
                  ))}
                </div>

                <div className="text-center text-xs text-[#4B6380]">
                  Didn't receive code?{' '}
                  <button type="button" className="text-[#1769E0] font-bold hover:underline">
                    Resend OTP (30s)
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-lg bg-[#1769E0] hover:bg-[#1E6FF2] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  <span>Verify &amp; Activate Account</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        )}
      </main>

      {/* Official Mini Footer */}
      <footer className="bg-white border-t border-[#E5EDF5] py-4 text-center text-xs text-[#4B6380] mt-auto">
        <span>Skill Track &bull; National Longitudinal Skilling &amp; Outcome Telemetry Platform</span>
      </footer>
    </div>
  );
}
