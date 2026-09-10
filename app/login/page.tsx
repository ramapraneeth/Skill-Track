'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Sparkles,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('rahul.sharma@skillbridge.gov.in');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState<'learner' | 'trainer' | 'government'>('learner');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roleParam = params.get('role');
      if (roleParam === 'trainer') {
        handleQuickFill('trainer');
      } else if (roleParam === 'government') {
        handleQuickFill('government');
      } else if (roleParam === 'learner') {
        handleQuickFill('learner');
      }
    }
  }, []);

  const handleQuickFill = (role: 'learner' | 'trainer' | 'government') => {
    setSelectedRole(role);
    setErrorMessage(null);
    if (role === 'learner') {
      setIdentifier('rahul.sharma@skillbridge.gov.in');
      setPassword('demo1234');
    } else if (role === 'trainer') {
      setIdentifier('rajesh.nair@skillbridge.gov.in');
      setPassword('demo1234');
    } else {
      setIdentifier('director.msde@skillbridge.gov.in');
      setPassword('demo1234');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      let userObj: any = null;
      let targetRoute = '/learner/dashboard';

      if (selectedRole === 'learner') {
        userObj = {
          id: 'lrn-101',
          fullName: 'Rahul Sharma',
          email: identifier,
          role: 'learner',
          organization: 'Andhra University',
        };
        targetRoute = '/learner/dashboard';
      } else if (selectedRole === 'trainer') {
        userObj = {
          id: 'trn-201',
          fullName: 'Prof. Rajesh Nair',
          email: identifier,
          role: 'trainer',
          organization: 'Apex National Skilling Centre',
        };
        targetRoute = '/trainer/dashboard';
      } else {
        userObj = {
          id: 'gov-001',
          fullName: 'Dr. Rajiv Kumar',
          email: identifier,
          role: 'government',
          organization: 'Ministry of Skill Development & Entrepreneurship',
        };
        targetRoute = '/government/dashboard';
      }

      localStorage.setItem('skilltrack_user', JSON.stringify(userObj));
      localStorage.setItem('skilltrack_role', selectedRole);
      localStorage.setItem('skilltrack_token', 'demo_jwt_token_' + Date.now());

      setIsLoading(false);
      router.push(targetRoute);
    }, 450);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Header */}
      <header className="bg-white border-b border-[#CBD5E1] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-[#0B3B60] text-white flex items-center justify-center font-bold text-xs">
              SIDH
            </div>
            <span className="font-extrabold text-[#0B3B60] text-sm tracking-tight">
              Skill India Digital Hub
            </span>
          </Link>

          <Link href="/register" className="text-xs font-bold text-[#0B3B60] hover:underline">
            Don't have an account? Register →
          </Link>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-xl max-w-md w-full overflow-hidden">
          <div className="bg-[#0B3B60] text-white p-6 border-b border-white/10">
            <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider block">
              Authorized Institutional Access
            </span>
            <h2 className="text-xl font-black mt-1">Sign In to SIDH Platform</h2>
            <p className="text-xs text-[#CBD5E1] mt-0.5">
              Select your portal persona to proceed
            </p>
          </div>

          {/* Persona selector tabs */}
          <div className="bg-[#F1F5F9] p-2 border-b border-[#CBD5E1] grid grid-cols-3 gap-1 text-xs">
            <button
              type="button"
              onClick={() => handleQuickFill('learner')}
              className={`py-2 rounded font-bold transition-all ${
                selectedRole === 'learner'
                  ? 'bg-[#0B3B60] text-white shadow-xs'
                  : 'bg-white text-[#334E68] border border-[#CBD5E1] hover:bg-[#E2E8F0]'
              }`}
            >
              Learner
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('trainer')}
              className={`py-2 rounded font-bold transition-all ${
                selectedRole === 'trainer'
                  ? 'bg-[#0B3B60] text-white shadow-xs'
                  : 'bg-white text-[#334E68] border border-[#CBD5E1] hover:bg-[#E2E8F0]'
              }`}
            >
              Trainer
            </button>
            <button
              type="button"
              onClick={() => handleQuickFill('government')}
              className={`py-2 rounded font-bold transition-all ${
                selectedRole === 'government'
                  ? 'bg-[#0B3B60] text-white shadow-xs'
                  : 'bg-white text-[#334E68] border border-[#CBD5E1] hover:bg-[#E2E8F0]'
              }`}
            >
              Gov Admin
            </button>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                Email Address or Registered Mobile Number
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="user@skillbridge.gov.in"
                  className="w-full h-10 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0B3B60]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#1E293B]">Password</label>
                <Link href="/forgot-password" className="text-[11px] text-[#0284C7] hover:underline">
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
                  className="w-full h-10 pl-9 pr-10 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A] focus:outline-none focus:border-[#0B3B60]"
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

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#475569]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[#CBD5E1] text-[#0B3B60]"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-xs"
            >
              {isLoading ? 'Verifying...' : `Login to ${selectedRole.toUpperCase()} Portal`}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 text-center text-xs text-[#64748B]">
              Need help? <Link href="/verify" className="text-[#0B3B60] font-semibold hover:underline">Verify Existing Credential</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
