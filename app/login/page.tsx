'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  ShieldCheck,
  CheckCircle2,
  FileKey,
  ArrowLeft,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Authentication failed. Please verify your credentials.');
      }

      const user = json.data.user;
      localStorage.setItem('skilltrack_user', JSON.stringify(user));
      localStorage.setItem('skilltrack_role', user.role);
      localStorage.setItem('skilltrack_token', json.data.token);

      // Route automatically based strictly on authenticated user's role from database
      if (user.role === 'learner') {
        router.push('/learner/dashboard');
      } else if (user.role === 'provider' || user.role === 'trainer') {
        router.push('/trainer/dashboard');
      } else if (user.role === 'government' || user.role === 'admin') {
        router.push('/government/dashboard');
      } else {
        router.push('/learner/dashboard');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDigiLockerLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Fallback demo candidate sign in via DigiLocker
      const demoUser = {
        id: 'usr_candidate_digilocker',
        fullName: 'Rahul Sharma',
        email: 'rahul.sharma@gov.in',
        role: 'learner',
        organization: 'National Skill Training Institute (NSTI)',
      };
      localStorage.setItem('skilltrack_user', JSON.stringify(demoUser));
      localStorage.setItem('skilltrack_role', 'learner');
      localStorage.setItem('skilltrack_token', 'demo_jwt_digilocker_' + Date.now());
      router.push('/learner/dashboard');
    }, 800);
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
                Ministry of Skill Development &amp; Entrepreneurship
              </span>
            </div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-extrabold text-xs shadow-2xs">
                ST
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[#0B2F55] text-sm tracking-tight leading-none">
                  Skill Track
                </span>
                <span className="text-[10px] text-[#45627F] font-medium mt-0.5">
                  Unified Institutional Access
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
              href="/register"
              className="text-xs font-bold px-4 py-2 rounded-lg bg-[#1769E0] hover:bg-[#2563EB] text-white transition-colors shadow-2xs"
            >
              Register Candidate
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-md w-full bg-white border border-[#CFE3FA] rounded-2xl shadow-[0_8px_30px_rgba(20,70,120,0.06)] overflow-hidden">
          {/* Top Card Header */}
          <div className="p-6 sm:p-8 pb-4 border-b border-[#F2F8FF] space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF4FF] border border-[#CFE3FA] text-[11px] font-bold text-[#1769E0]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>National Unified Authentication Gateway</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0B2F55] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-[#45627F]">
              Sign in to continue your journey.
            </p>
          </div>

          {/* Form Area */}
          <form onSubmit={handleLogin} className="p-6 sm:p-8 pt-6 space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-start gap-2">
                <span className="font-bold">Error:</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0B2F55] mb-1.5">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#45627F]/60" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.gov.in or Mobile"
                  className="w-full h-11 pl-10 pr-3 text-xs sm:text-sm border border-[#CFE3FA] rounded-lg bg-white text-[#0B2F55] placeholder-[#45627F]/50 focus:outline-none focus:border-[#1769E0]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0B2F55]">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#1769E0] font-semibold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#45627F]/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 text-xs sm:text-sm border border-[#CFE3FA] rounded-lg bg-white text-[#0B2F55] placeholder-[#45627F]/50 focus:outline-none focus:border-[#1769E0]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#45627F]/60 hover:text-[#0B2F55]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#45627F]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#CFE3FA] text-[#1769E0] focus:ring-[#1769E0]"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-[#1769E0] hover:bg-[#2563EB] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-2xs disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Trusted DigiLocker Government Integration Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDigiLockerLogin}
                className="w-full h-11 rounded-lg bg-[#F7FAFE] hover:bg-[#EAF4FF] border border-[#CFE3FA] text-[#0B2F55] font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-2xs"
              >
                <div className="w-5 h-5 rounded bg-[#1769E0] text-white flex items-center justify-center font-bold text-[10px]">
                  D
                </div>
                <span>Continue with DigiLocker</span>
                <span className="text-[10px] font-semibold text-[#16A36A] bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                  Gov Verified
                </span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#CFE3FA] text-center text-xs text-[#45627F]">
              New Candidate?{' '}
              <Link href="/register" className="text-[#1769E0] font-bold hover:underline">
                Register Candidate Account →
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Official Mini Footer */}
      <footer className="bg-white border-t border-[#E5EDF6] py-4 text-center text-xs text-[#45627F]">
        <span>Skill Track &bull; National Longitudinal Skilling &amp; Outcome Telemetry Platform</span>
      </footer>
    </div>
  );
}
