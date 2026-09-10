'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isDispatched, setIsDispatched] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatched(true);
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
          <span className="text-xs text-[#64748B]">Account Recovery</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-xl max-w-md w-full overflow-hidden">
          <div className="bg-[#0B3B60] text-white p-6 border-b border-white/10">
            <h2 className="text-lg font-black">Reset Your Password</h2>
            <p className="text-xs text-[#CBD5E1] mt-0.5">
              Enter your registered email address or mobile number
            </p>
          </div>

          {isDispatched ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#102A43]">Recovery Link Dispatched</h3>
              <p className="text-xs text-[#627D98] max-w-xs mx-auto">
                A password reset token has been dispatched to <strong>{email}</strong>. Follow the link in the message to
                create a new secure password.
              </p>
              <div className="pt-2">
                <Link
                  href="/reset-password"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[#0B3B60] text-white text-xs font-bold hover:bg-[#002541] transition-colors"
                >
                  <span>Proceed to Set New Password</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <p className="text-xs text-[#475569] leading-relaxed">
                Provide your registered email address. We will verify your identity against the National Skilling Registry and issue a temporary verification token.
              </p>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@skillbridge.gov.in"
                    className="w-full h-10 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0B3B60]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-xs mt-2"
              >
                <span>Send Recovery Instructions</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
