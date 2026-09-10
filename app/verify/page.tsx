'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, KeyRound } from 'lucide-react';

export default function VerifyAccountPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const updated = [...otp];
    updated[index] = val;
    setOtp(updated);

    // Auto-focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerified(true);
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
          <Link href="/login" className="text-xs font-bold text-[#0B3B60] hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </Link>
          <span className="text-xs text-[#64748B]">State Cryptographic Verification</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-xl max-w-md w-full overflow-hidden">
          <div className="bg-[#0B3B60] text-white p-6 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF9933] uppercase tracking-wider">
              <KeyRound className="w-4 h-4" /> Two-Factor Credential Verification
            </div>
            <h2 className="text-lg font-black mt-1">Verify Account Credentials</h2>
            <p className="text-xs text-[#CBD5E1] mt-0.5">
              Enter the 6-digit OTP dispatched to your registered address
            </p>
          </div>

          {isVerified ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#102A43]">Verification Successful</h3>
              <p className="text-xs text-[#627D98] max-w-xs mx-auto">
                Your account credentials and cryptographic token have been successfully validated.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#0B3B60] text-white text-xs font-bold hover:bg-[#002541] transition-colors"
                >
                  <span>Proceed to Portal Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="p-6 space-y-5">
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
                    className="w-11 h-12 text-center text-lg font-mono font-bold border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0B3B60]"
                  />
                ))}
              </div>

              <div className="text-center text-xs text-[#64748B]">
                Didn't receive code?{' '}
                <button type="button" className="text-[#0B3B60] font-bold hover:underline">
                  Resend OTP (30s)
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-xs"
              >
                <span>Verify & Activate Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
