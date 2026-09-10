'use client';

import React, { useState } from 'react';
import { X, ArrowRight, Lock, Mail, Shield } from 'lucide-react';

interface UnifiedLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any, token: string) => void;
}

export const UnifiedLoginModal: React.FC<UnifiedLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <div className="bg-white border border-[#CBD5E1] rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-[#0B1E36] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#FF9933]" />
            <span className="text-sm font-bold">Sign In to Skill Track</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs leading-relaxed">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                Registered Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#829AB1]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.gov.in"
                  className="w-full h-10 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded-lg bg-white text-[#102A43] focus:outline-none focus:border-[#0B1E36] focus:ring-1 focus:ring-[#0B1E36]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#102A43] mb-1.5">
                Account Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#829AB1]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-10 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded-lg bg-white text-[#102A43] focus:outline-none focus:border-[#0B1E36] focus:ring-1 focus:ring-[#0B1E36]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 rounded-lg bg-[#0B1E36] hover:bg-[#1E3A5F] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm uppercase tracking-wider disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
