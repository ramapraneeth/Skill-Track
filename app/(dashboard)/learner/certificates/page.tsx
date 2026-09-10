'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { sidhStore } from '@/lib/sidh-store';

export default function LearnerCertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const certs = sidhStore.getCertificates();

  const handleCopy = (id: string) => {
    navigator.clipboard?.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Certifications & Credentials"
        subtitle="NSQF-aligned accredited credentials, verified certificates and DigiLocker badges"
        breadcrumbs={[
          { label: 'Portal', href: '/learner/dashboard' },
          { label: 'Certificates' },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={() => alert('Syncing with DigiLocker API... 2 credentials verified.')}
              className="px-3.5 py-2 text-xs font-semibold rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
            >
              <span>🔗</span> Link DigiLocker
            </button>
          </div>
        }
      />

      {certs.length === 0 ? (
        <EmptyState
          icon="🎓"
          title="No Certificates Issued Yet"
          description="Complete your enrolled courses and clear the final NSQF assessment to earn verified credentials."
          action={{ label: 'Explore Courses', href: '/learner/courses' }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="bg-gradient-to-r from-[#0B3B60] to-[#155A8A] p-4 text-white">
                <div className="flex items-center justify-between text-xs font-medium opacity-90 mb-1">
                  <span>NSQF Level {c.nsqfLevel}</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[11px]">Verified</span>
                </div>
                <h3 className="font-semibold text-base leading-snug line-clamp-2">{c.title}</h3>
                <p className="text-xs text-white/80 mt-1">{c.issuingAuthority}</p>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Issued On:</span>
                    <span className="font-medium text-slate-800">{new Date(c.issueDate || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Credential ID:</span>
                    <span className="font-mono text-[11px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">
                      {c.credentialId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">QR Authenticity:</span>
                    <span className="text-emerald-700 font-medium">Valid & Active</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2">
                  <button
                    onClick={() => setSelectedCert(c)}
                    className="flex-1 px-3 py-1.5 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] transition-colors"
                  >
                    View Certificate
                  </button>
                  <button
                    onClick={() => handleCopy(c.credentialId || '')}
                    title="Copy Credential ID"
                    className="px-2.5 py-1.5 text-xs font-medium rounded border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    {copiedId === c.credentialId ? '✓' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full border border-slate-300 shadow-2xl overflow-hidden animate-in fade-in">
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🏛️</span>
                <span className="font-semibold text-sm text-slate-800">Verified Certificate of Competency</span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="text-slate-400 hover:text-slate-600 text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {/* Certificate Preview Surface */}
            <div className="p-8 bg-amber-50/20 border-8 border-double border-amber-900/20 m-4 rounded text-center space-y-4">
              <div className="text-xs uppercase tracking-widest font-semibold text-amber-800">
                Ministry of Skill Development & Entrepreneurship • Skill India
              </div>
              <h2 className="text-xl font-serif font-bold text-slate-900 mt-2">CERTIFICATE OF SKILL COMPLETION</h2>
              <p className="text-xs text-slate-600">This is to certify that</p>
              <div className="text-lg font-bold text-[#0B3B60] border-b border-slate-300 pb-1 max-w-xs mx-auto">
                Arjun Patel
              </div>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                has successfully demonstrated proficiency in the prescribed curriculum for{' '}
                <span className="font-semibold text-slate-800">{selectedCert.title}</span> at NSQF Level{' '}
                {selectedCert.nsqfLevel}.
              </p>

              <div className="pt-6 flex justify-between items-end border-t border-slate-200 text-left text-xs">
                <div>
                  <p className="text-slate-500">Issuing Body:</p>
                  <p className="font-semibold text-slate-800">{selectedCert.issuingAuthority}</p>
                  <p className="text-[11px] text-slate-500">Date: {selectedCert.issueDate}</p>
                </div>
                <div className="text-right">
                  <div className="font-mono text-[10px] bg-white border border-slate-200 p-2 rounded inline-block text-slate-600">
                    [QR-CODE VERIFIED]
                    <br />
                    ID: {selectedCert.credentialId}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end gap-2 text-xs">
              <button
                onClick={() => alert('Certificate downloaded as secure PDF.')}
                className="px-4 py-2 font-semibold bg-[#0B3B60] text-white rounded hover:bg-[#082a47]"
              >
                📥 Download PDF
              </button>
              <button
                onClick={() => alert('Credential share link copied to clipboard.')}
                className="px-4 py-2 font-medium border border-slate-300 bg-white text-slate-700 rounded hover:bg-slate-50"
              >
                🔗 Share Credential
              </button>
              <button
                onClick={() => setSelectedCert(null)}
                className="px-4 py-2 font-medium text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
