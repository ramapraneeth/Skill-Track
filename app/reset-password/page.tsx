'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setIsSuccess(true);
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
          <span className="text-xs text-[#64748B]">Set New Password</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-xl max-w-md w-full overflow-hidden">
          <div className="bg-[#0B3B60] text-white p-6 border-b border-white/10">
            <h2 className="text-lg font-black">Set New Secure Password</h2>
            <p className="text-xs text-[#CBD5E1] mt-0.5">
              Ensure minimum 8 characters with numbers and symbols
            </p>
          </div>

          {isSuccess ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#102A43]">Password Updated</h3>
              <p className="text-xs text-[#627D98] max-w-xs mx-auto">
                Your password has been successfully updated in the National Identity Directory.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#0B3B60] text-white text-xs font-bold hover:bg-[#002541] transition-colors"
                >
                  <span>Sign In with New Password</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReset} className="p-6 space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">New Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0B3B60]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Confirm New Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0B3B60]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-xs mt-2"
              >
                <span>Save New Password</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
