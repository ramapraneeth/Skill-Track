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
          <span className="text-xs text-[#64748B]">Step 2 of 2: Candidate Enrollment</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-xl max-w-xl w-full overflow-hidden">
          <div className="bg-[#0B3B60] text-white p-6 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF9933] uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" /> Learner Profile Creation
              </div>
              <h2 className="text-lg font-black mt-1">Register as a Learner</h2>
              <p className="text-xs text-[#CBD5E1] mt-0.5">
                Join the National Skill Outcome Registry
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded">
                {errorMessage}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#1E293B] mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Mobile Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98480..."
                    className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Confirm Password *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e: any) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">District *</label>
                <input
                  type="text"
                  required
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder="e.g. Visakhapatnam"
                  className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-xs mt-2"
            >
              {isLoading ? 'Creating Account...' : 'Complete Learner Registration'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
