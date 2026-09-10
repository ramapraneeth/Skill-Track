'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

interface ReportTemplate {
  id: string;
  title: string;
  category: 'Financial / PFMS' | 'Parliamentary' | 'Quality Audit' | 'Scheme Review';
  frequency: 'Quarterly' | 'Annual' | 'Monthly';
  lastGenerated: string;
  fileSize: string;
}

const TEMPLATES: ReportTemplate[] = [
  { id: 'rep-1', title: 'MSDE Quarterly Performance & Outcomes Bulletin (Q1 FY 26-27)', category: 'Parliamentary', frequency: 'Quarterly', lastGenerated: '01 Sep 2026', fileSize: '18.4 MB' },
  { id: 'rep-2', title: 'PFMS Direct Benefit Transfer (DBT) Reconciliation Statement', category: 'Financial / PFMS', frequency: 'Monthly', lastGenerated: '05 Sep 2026', fileSize: '8.2 MB' },
  { id: 'rep-3', title: 'National Council for Vocational Education (NCVET) Accreditation Audit', category: 'Quality Audit', frequency: 'Annual', lastGenerated: '15 Aug 2026', fileSize: '24.1 MB' },
  { id: 'rep-4', title: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0) State Expenditure Ledger', category: 'Scheme Review', frequency: 'Quarterly', lastGenerated: '28 Aug 2026', fileSize: '12.6 MB' },
  { id: 'rep-5', title: 'National Apprenticeship Promotion Scheme (NAPS) Employer Stipend Claims', category: 'Financial / PFMS', frequency: 'Monthly', lastGenerated: '02 Sep 2026', fileSize: '6.9 MB' },
];

export default function GovernmentReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [generating, setGenerating] = useState(false);

  const handleGenerateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert('Custom statutory report generated and cryptographically signed with MSDE digital token!');
    }, 1500);
  };

  const filtered = selectedCategory === 'All'
    ? TEMPLATES
    : TEMPLATES.filter((t) => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statutory Reports & Parliamentary Bulletins"
        subtitle="Audited official data extracts formatted for Cabinet Secretariat, NITI Aayog, and CAG compliance"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Reports' },
        ]}
      />

      {/* Custom Report Builder Card */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
          Generate Custom Analytical or Compliance Extract
        </h3>
        <form onSubmit={handleGenerateCustom} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-medium text-slate-600 mb-1">Target Scheme</label>
            <select className="w-full px-3 py-1.5 border rounded border-slate-300">
              <option>All National Schemes Combined</option>
              <option>PMKVY 4.0</option>
              <option>NAPS Apprenticeship</option>
              <option>DDU-GKY</option>
              <option>PM-Vishwakarma</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-600 mb-1">Fiscal Period</label>
            <select className="w-full px-3 py-1.5 border rounded border-slate-300">
              <option>FY 2026-27 (Year to Date)</option>
              <option>Q1 (Apr - Jun 2026)</option>
              <option>Q2 (Jul - Sep 2026)</option>
              <option>FY 2025-26 (Audited Annual)</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-slate-600 mb-1">Export Format</label>
            <select className="w-full px-3 py-1.5 border rounded border-slate-300">
              <option>Signed Official PDF (Cabinet Format)</option>
              <option>Audit Spreadsheet (XLSX)</option>
              <option>Open Government Data (CSV / JSON)</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={generating}
              className="w-full py-1.5 font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] disabled:opacity-50"
            >
              {generating ? 'Compiling Report...' : 'Compile & Export'}
            </button>
          </div>
        </form>
      </div>

      {/* Standard Reports Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="font-semibold text-sm text-slate-900">Pre-Compiled Official Reports & Dossiers</h3>
          <div className="flex gap-1.5">
            {['All', 'Parliamentary', 'Financial / PFMS', 'Quality Audit', 'Scheme Review'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0B3B60] text-white font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Report Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Frequency</th>
              <th className="py-3 px-4">Last Generated</th>
              <th className="py-3 px-4">File Size</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.map((rep) => (
              <tr key={rep.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4 font-semibold text-slate-900">{rep.title}</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                    {rep.category}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-700">{rep.frequency}</td>
                <td className="py-3.5 px-4 text-slate-600">{rep.lastGenerated}</td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{rep.fileSize}</td>
                <td className="py-3.5 px-4 text-right">
                  <button
                    onClick={() => alert(`Downloading signed statutory report "${rep.title}"...`)}
                    className="px-3 py-1.5 text-xs font-semibold rounded bg-blue-50 text-[#0B3B60] hover:bg-blue-100"
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
