'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Header */}
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
                Longitudinal Skilling & Impact System
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main 404 container */}
      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-xl p-8 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Page Not Found</h1>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
              The requested institutional resource could not be located. Please check the URL or return to your authorized portal.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0B1E36] hover:bg-[#1E3A5F] text-white font-bold text-xs shadow-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
