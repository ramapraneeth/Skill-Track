import React, { useState } from 'react'
import { FileSpreadsheet, Download, FileText, CheckCircle2, ShieldCheck, Printer } from 'lucide-react'

export const GovernmentReports: React.FC = () => {
  const [downloaded, setDownloaded] = useState<string | null>(null)

  const handleDownload = (reportName: string) => {
    setDownloaded(reportName)
    setTimeout(() => setDownloaded(null), 3000)
  }

  const reports = [
    {
      id: 'rep-1',
      title: 'FY 2024-25 National Longitudinal Skilling Outcome Synthesis Report',
      type: 'Executive Brief (PDF)',
      date: 'Q2 Audit 2024',
      size: '2.4 MB',
      description: 'Comprehensive analysis of 1.28L learners across 4 flagship missions, detailing 90-day retention and wage progression.',
    },
    {
      id: 'rep-2',
      title: 'Provider Longitudinal Accreditation & Audit Data Export',
      type: 'Raw Dataset (CSV / Excel)',
      date: 'Monthly Snapshot',
      size: '18.2 MB',
      description: 'Granular provider-wise outcomes including completion rates, verified placements, and verified employer payslips.',
    },
    {
      id: 'rep-3',
      title: 'Before / After Intervention Impact Evaluation Report',
      type: 'Policy Document (PDF)',
      date: 'Bi-Annual Evaluation',
      size: '3.1 MB',
      description: 'Scientific documentation of +16.5% placement lift and retention sustainability gains resulting from targeted micro-credentials.',
    },
    {
      id: 'rep-4',
      title: 'District Skill Shortages & Corporate Hiring Demand Heatmap',
      type: 'Sector Diagnostic (PDF)',
      date: 'Current Month',
      size: '1.8 MB',
      description: 'Identification of 14 critical hiring deficit districts and recommendations for curriculum re-alignment with industry needs.',
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Official Outcome Reports & Policy Briefs</h1>
          <p className="text-xs text-slate-500">
            Exportable longitudinal audits formatted for Ministry, Parliament Committee, and Auditor review
          </p>
        </div>
      </div>

      {downloaded && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>Export generated successfully: <strong>{downloaded}</strong> (Sample download complete)</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {reports.map((rep) => (
          <div
            key={rep.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 uppercase">
                  {rep.type}
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">{rep.date}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{rep.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{rep.description}</p>
            </div>

            <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 text-[11px] font-mono">{rep.size}</span>
              <button
                onClick={() => handleDownload(rep.title)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-50 border border-indigo-200 px-3 py-1.5 font-bold text-indigo-700 hover:bg-indigo-100 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Report</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
