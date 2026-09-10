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
    <div className="min-h-screen flex flex-col bg-[#F5F9FD] text-[#0B2D4F]">
      {/* Subtle National Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#F59E0B]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#16A34A]" />
      </div>

      {/* Official Government Header */}
      <header className="bg-white border-b border-[#E5EDF5] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[76px] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col border-r border-[#CBDDF6] pr-4">
              <span className="text-[10px] font-bold tracking-widest text-[#0B2D4F] uppercase leading-tight">
                Government of India
              </span>
              <span className="text-[9px] text-[#4B6380] font-medium leading-tight">
                Ministry of Skill Development &amp; Entrepreneurship
              </span>
            </div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1769E0] text-white flex items-center justify-center font-black text-xs shadow-xs">
                ST
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-[#0B2D4F] text-sm tracking-tight leading-none">
                  Skill Track
                </span>
                <span className="text-[10px] text-[#4B6380] font-medium mt-0.5">
                  Unified Institutional Access
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-[#4B6380] hover:text-[#0B2D4F] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/register"
              className="text-xs font-bold px-3.5 py-1.5 rounded-lg bg-[#1769E0] hover:bg-[#1E6FF2] text-white transition-colors shadow-xs"
            >
              Register Candidate
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area with Split / Centered Layout */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="max-w-md w-full bg-white border border-[#E4EDF7] rounded-2xl gov-card-shadow overflow-hidden">
          {/* Top Card Header */}
          <div className="p-6 sm:p-8 pb-4 border-b border-[#F0F5FA] space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EAF4FF] border border-[#CBDDF6] text-[11px] font-bold text-[#1769E0]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>National Unified Authentication Gateway</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0B2D4F] tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-[#4B6380]">
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
              <label className="block text-xs font-bold text-[#0B2D4F] mb-1.5">
                Email or Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B6380]/60" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.gov.in or Mobile"
                  className="w-full h-11 pl-10 pr-3 text-xs sm:text-sm border border-[#CBDDF6] rounded-lg bg-white text-[#0B2D4F] placeholder-[#4B6380]/50 focus:outline-none focus:border-[#1769E0]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-[#0B2D4F]">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#1769E0] font-semibold hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#4B6380]/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 pl-10 pr-10 text-xs sm:text-sm border border-[#CBDDF6] rounded-lg bg-white text-[#0B2D4F] placeholder-[#4B6380]/50 focus:outline-none focus:border-[#1769E0]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4B6380]/60 hover:text-[#0B2D4F]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#4B6380]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#CBDDF6] text-[#1769E0] focus:ring-[#1769E0]"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-[#1769E0] hover:bg-[#1E6FF2] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50 mt-2"
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
                className="w-full h-11 rounded-lg bg-[#F7FAFE] hover:bg-[#EFF6FF] border border-[#CBDDF6] text-[#0B2D4F] font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-2xs"
              >
                <div className="w-5 h-5 rounded bg-[#1769E0] text-white flex items-center justify-center font-bold text-[10px]">
                  D
                </div>
                <span>Continue with DigiLocker</span>
                <span className="text-[10px] font-semibold text-[#16A34A] bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                  Gov Verified
                </span>
              </button>
            </div>

            <div className="pt-4 border-t border-[#E4EDF7] text-center text-xs text-[#4B6380]">
              New Candidate?{' '}
              <Link href="/register" className="text-[#1769E0] font-bold hover:underline">
                Register Candidate Account →
              </Link>
            </div>
          </form>
        </div>
      </main>

      {/* Official Mini Footer */}
      <footer className="bg-white border-t border-[#E5EDF5] py-4 text-center text-xs text-[#4B6380]">
        <span>Skill Track &bull; National Longitudinal Skilling &amp; Outcome Telemetry Platform</span>
      </footer>
    </div>
  );
}
