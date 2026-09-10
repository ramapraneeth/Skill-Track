'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { getLearner, saveLearner } from '@/lib/sidh-store';

export default function RegisterLearnerPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    dob: '',
    gender: 'Male' as const,
    state: 'Andhra Pradesh',
    district: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      const current = getLearner();
      const updated = {
        ...current,
        name: formData.fullName || current.name,
        email: formData.email || current.email,
        mobile: formData.mobile || current.mobile,
        dob: formData.dob || current.dob,
        gender: formData.gender,
        state: formData.state,
        district: formData.district || current.district,
      };
      saveLearner(updated);

      const sessionUser = {
        id: updated.id,
        fullName: updated.name,
        email: updated.email,
        role: 'learner',
        organization: updated.institution,
      };
      localStorage.setItem('skilltrack_user', JSON.stringify(sessionUser));
      localStorage.setItem('skilltrack_role', 'learner');
      localStorage.setItem('skilltrack_token', 'demo_jwt_' + Date.now());

      setIsLoading(false);
      router.push('/learner/dashboard');
    }, 450);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* National Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      {/* Top Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-30 transition-colors">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/register" className="text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Registration</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">Candidate Enrollment</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
              STUDENT ONLY
            </span>
          </div>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-xl shadow-xs max-w-xl w-full overflow-hidden transition-colors">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#1D4ED8] dark:text-blue-400 uppercase tracking-wider">
              <GraduationCap className="w-4 h-4" /> Student Profile Creation
            </div>
            <h1 className="text-xl font-extrabold text-[#0B192C] dark:text-white mt-1">
              Register as Student / Job Seeker
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Access AI skill gap intelligence, NSQF certified courses, and placement opportunities
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300 text-xs rounded-lg">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full h-9 pl-9 pr-3 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full h-9 pl-9 pr-3 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98480..."
                    className="w-full h-9 pl-9 pr-3 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-9 pl-9 pr-3 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Confirm Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full h-9 pl-9 pr-3 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#1D4ED8]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full h-9 px-3 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e: any) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full h-9 px-3 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#1D4ED8]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full h-9 px-3 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">District *</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="e.g. Visakhapatnam"
                  className="w-full h-9 px-3 text-xs border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-[#1D4ED8]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-xs mt-3"
            >
              {isLoading ? 'Creating Student Account...' : 'Complete Student Registration'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
