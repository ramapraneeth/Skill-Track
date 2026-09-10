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

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navbar */}
      <header className="bg-[#0B1E36] border-b border-[#1E3A5F] text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1D4ED8] to-[#0B3B60] flex items-center justify-center text-white font-black text-sm shadow-sm border border-white/20">
              ST
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-base tracking-tight leading-none">
                Skill Track
              </span>
              <span className="text-[10px] text-slate-400 font-medium">
                Unified Institutional Access
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/register"
              className="text-xs font-bold px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
            >
              Register Candidate
            </Link>
          </div>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white border border-[#CBD5E1] rounded-xl shadow-xl max-w-md w-full overflow-hidden">
          <div className="bg-[#0B1E36] text-white p-6 border-b border-white/10">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#FF9933] uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              <span>Secure Authentication</span>
            </div>
            <h1 className="text-xl font-black mt-1">Sign In to Skill Track</h1>
            <p className="text-xs text-slate-300 mt-1">
              Enter your verified credentials to access your portal
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-lg flex items-start gap-2">
                <span className="font-bold">Error:</span>
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1.5">
                Email Address or Registered Identifier
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.gov.in"
                  className="w-full h-10 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded-lg bg-white text-[#0F172A] focus:outline-none focus:border-[#0B1E36] focus:ring-1 focus:ring-[#0B1E36] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-[#1E293B]">Password</label>
                <Link href="/forgot-password" className="text-[11px] text-blue-600 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 pl-9 pr-10 text-xs border border-[#CBD5E1] rounded-lg bg-white text-[#0F172A] focus:outline-none focus:border-[#0B1E36] focus:ring-1 focus:ring-[#0B1E36] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0F172A]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-[#475569]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#CBD5E1] text-[#0B1E36] focus:ring-[#0B1E36]"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-[#0B1E36] hover:bg-[#1E3A5F] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-sm disabled:opacity-50 mt-2"
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

            <div className="pt-4 border-t border-slate-100 text-center text-xs text-[#64748B]">
              New Candidate?{' '}
              <Link href="/register" className="text-blue-600 font-bold hover:underline">
                Create Candidate Account →
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
