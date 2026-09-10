'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Download,
  Copy,
  Check,
  X,
  Calendar,
} from 'lucide-react';
import { sidhStore } from '@/lib/sidh-store';

export default function LearnerCertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const certs = sidhStore.getCertificates();
  const learner = sidhStore.getLearner();

  const handleCopy = (id: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(id);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* 1. PAGE HEADER */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            My Certificates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Officially accredited NSQF qualifications, verified digital credentials, and DigiLocker badges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('DigiLocker synchronization confirmed. 2 credentials authenticated.')}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Sync DigiLocker</span>
          </button>
        </div>
      </div>

      {/* 2. SUMMARY STRIP */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Certificates Earned
          </span>
          <div className="text-2xl font-bold text-slate-900">{certs.length}</div>
          <p className="text-[11px] text-slate-500">Officially verified</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Verified Skills Credited
          </span>
          <div className="text-2xl font-bold text-blue-700">14 Skills</div>
          <p className="text-[11px] text-slate-500">Linked to candidate passport</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Highest Qualification
          </span>
          <div className="text-2xl font-bold text-emerald-600">NSQF Level 6</div>
          <p className="text-[11px] text-slate-500">National Occupational Standards</p>
        </div>
      </div>

      {/* 3. CERTIFICATE CARDS GRID (Compact & Professional) */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">Earned Credentials</h2>
          <p className="text-xs text-slate-500">Cryptographically verifiable digital certificates</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    NSQF Level {c.nsqfLevel || 5}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Verified
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-snug line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {c.issuingAuthority}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400 text-[11px]">Issued Date:</span>
                    <strong className="text-slate-700 text-[11px]">
                      {new Date(c.issueDate || Date.now()).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </strong>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-[11px]">Credential ID:</span>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">
                        {c.credentialId}
                      </span>
                      <button
                        onClick={() => handleCopy(c.credentialId || '')}
                        title="Copy ID"
                        className="p-1 text-slate-400 hover:text-slate-700"
                      >
                        {copiedId === c.credentialId ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setSelectedCert(c)}
                  className="flex-1 py-1.5 px-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs transition-colors shadow-2xs text-center"
                >
                  View Certificate
                </button>
                <button
                  onClick={() => alert('Certificate PDF downloaded successfully.')}
                  className="p-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-600"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CERTIFICATE PREVIEW MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
                <span className="font-bold text-sm text-slate-900">
                  Verified Certificate of Competency
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Surface */}
            <div className="p-8 m-6 rounded-xl border border-slate-300 bg-slate-50/60 text-center space-y-4">
              <div className="text-[10px] uppercase tracking-widest font-bold text-slate-500">
                Government of India • Ministry of Skill Development & Entrepreneurship
              </div>
              <h2 className="text-lg font-serif font-black text-slate-900 tracking-wide">
                CERTIFICATE OF SKILL COMPLETION
              </h2>
              <p className="text-xs text-slate-500">This is proudly presented to</p>

              <div className="text-lg font-bold text-blue-900 border-b border-slate-300 pb-1 max-w-xs mx-auto">
                {learner?.name || 'Arjun Patel'}
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                has successfully demonstrated proficiency in the curriculum for{' '}
                <strong className="text-slate-900">{selectedCert.title}</strong> at{' '}
                <strong className="text-blue-700">NSQF Level {selectedCert.nsqfLevel || 5}</strong>.
              </p>

              <div className="pt-6 flex justify-between items-end border-t border-slate-200 text-left text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Issuing Authority</p>
                  <p className="font-bold text-slate-800">{selectedCert.issuingAuthority}</p>
                  <p className="text-[11px] text-slate-400">Date: {selectedCert.issueDate}</p>
                </div>

                <div className="text-right">
                  <div className="font-mono text-[10px] bg-white border border-slate-200 p-2 rounded inline-block text-slate-700">
                    <span className="text-emerald-600 font-bold block">[VERIFIED CREDENTIAL]</span>
                    <span>ID: {selectedCert.credentialId}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                onClick={() => alert('Certificate downloaded as official PDF.')}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-blue-700 hover:bg-blue-800 text-white shadow-xs"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
