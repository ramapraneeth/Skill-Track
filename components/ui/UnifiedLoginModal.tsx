'use client';

import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Lock, Mail, ShieldCheck, UserCheck, Building2, Landmark } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface UnifiedLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any, token: string) => void;
}

export const UnifiedLoginModal: React.FC<UnifiedLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    if (role === 'learner') {
      setEmail('rahul.sharma@skilltrack.in');
      setPassword('demo1234');
    } else if (role === 'provider') {
      setEmail('director@apexskills.org');
      setPassword('demo1234');
    } else if (role === 'government') {
      setEmail('mission.director@msde.gov.in');
      setPassword('demo1234');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          role: selectedRole,
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error?.message || 'Authentication failed. Please verify credentials.');
      }

      // Save token and session in localStorage for client components
      localStorage.setItem('skilltrack_token', json.data.token);
      localStorage.setItem('skilltrack_user', JSON.stringify(json.data.user));
      localStorage.setItem('skilltrack_role', json.data.user.role);

      onSuccess(json.data.user, json.data.token);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      role: 'learner' as UserRole,
      title: 'Learner / Candidate',
      desc: 'Access verified outcomes, job matches, and skill gap assessments',
      icon: UserCheck,
    },
    {
      role: 'provider' as UserRole,
      title: 'Training Provider',
      desc: 'Track batch placements, follow-up surveys, and accreditation stats',
      icon: Building2,
    },
    {
      role: 'government' as UserRole,
      title: 'Government / Administrator',
      desc: 'Monitor national funnels, scheme ROI, and cross-state analytics',
      icon: Landmark,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white border border-[#CBD5E1] rounded-md shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-[#0B3B60] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider">
              Single Sign-On Authentication
            </span>
            <h3 className="text-base font-bold">Login to SkillTrack</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-[#F0F4F8] px-6 py-2.5 border-b border-[#D1D9E2] flex items-center justify-between text-xs text-[#627D98]">
          <span className="font-semibold text-[#102A43]">
            {step === 1 ? 'Step 1: Select Institutional Persona' : 'Step 2: Enter Authorized Credentials'}
          </span>
          <span className="font-mono text-[11px]">Step {step} of 2</span>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs leading-relaxed">
              {errorMessage}
            </div>
          )}

          {step === 1 ? (
            <div className="space-y-4">
              <p className="text-xs text-[#486581] leading-relaxed">
                Choose your institutional role to continue. Access is restricted and role authorization is validated against the database.
              </p>

              <div className="space-y-2.5">
                {roleOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedRole === opt.role;
                  return (
                    <button
                      key={opt.role}
                      type="button"
                      onClick={() => handleRoleSelect(opt.role)}
                      className={`w-full text-left p-3.5 rounded-md border text-xs transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'border-[#0B3B60] bg-[#0B3B60]/5 ring-1 ring-[#0B3B60]'
                          : 'border-[#D1D9E2] hover:border-[#9FB3C8] bg-white'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected ? 'bg-[#0B3B60] text-white' : 'bg-[#F0F4F8] text-[#0B3B60]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[#102A43] text-sm">{opt.title}</div>
                        <div className="text-[#627D98] text-[11px] mt-0.5">{opt.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex justify-end">
                <button
                  type="button"
                  disabled={!selectedRole}
                  onClick={() => setStep(2)}
                  className="h-10 px-5 rounded bg-[#0B3B60] text-white font-semibold text-xs flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#002541] transition-colors shadow-sm"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center justify-between bg-[#F0F4F8] px-3 py-2 rounded border border-[#D1D9E2] text-xs">
                <span className="text-[#627D98]">Logging in as:</span>
                <span className="font-bold text-[#0B3B60] capitalize">{selectedRole}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#334E68] mb-1">
                  Email or Registered Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9FB3C8]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@domain.gov.in"
                    className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#102A43] focus:outline-none focus:border-[#0B3B60]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#334E68]">Password</label>
                  <a href="#" className="text-[11px] text-[#006876] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9FB3C8]" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#102A43] focus:outline-none focus:border-[#0B3B60]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="h-10 px-4 rounded border border-[#D1D9E2] text-[#334E68] font-semibold text-xs flex items-center gap-1.5 hover:bg-[#F0F4F8] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 px-6 rounded bg-[#0B3B60] text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-[#002541] disabled:opacity-50 transition-colors shadow-sm"
                >
                  {isLoading ? 'Verifying...' : 'Login Securely'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
