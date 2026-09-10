'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import {
  FileText,
  Download,
  Filter,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  BookOpen,
  Award,
  Users,
} from 'lucide-react';

export default function TrainerReportsPage() {
  const [reportType, setReportType] = useState<'all' | 'learner' | 'course' | 'assessment' | 'skill-gap'>('all');

  const reports = [
    {
      id: 'rep-01',
      title: 'Batch Performance & Attendance Ledger',
      type: 'learner',
      description: 'Longitudinal AEBAS biometric attendance and classroom hour compliance across enrolled candidates.',
      generatedAt: '10 Sep 2026',
      format: 'PDF / CSV',
      status: 'Verified',
      records: 28,
    },
    {
      id: 'rep-02',
      title: 'Course Module Completion & Syllabus Velocity',
      type: 'course',
      description: 'Detailed analysis of module-wise completion, practical lab milestones, and instructor hours.',
      generatedAt: '08 Sep 2026',
      format: 'PDF',
      status: 'Audited',
      records: 4,
    },
    {
      id: 'rep-03',
      title: 'Summative Practical Assessment Evaluation Roster',
      type: 'assessment',
      description: 'NSQF Level 5 practical assessment score ledger, NOS pass percentages, and certification recommendations.',
      generatedAt: '05 Sep 2026',
      format: 'PDF / XLSX',
      status: 'Verified',
      records: 28,
    },
    {
      id: 'rep-04',
      title: 'Cohort Skill-Gap Remediation Audit',
      type: 'skill-gap',
      description: 'Competency vector deficit remediation telemetry and targeted intervention effectiveness.',
      generatedAt: '01 Sep 2026',
      format: 'PDF',
      status: 'Pending Review',
      records: 18,
    },
  ];

  const filteredReports = reportType === 'all' ? reports : reports.filter((r) => r.type === reportType);

  const handleDownload = (title: string) => {
    alert(`Downloading statutory audit report: "${title}"`);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Institutional Reports & Audit Ledgers"
        subtitle="Download compliance records, cohort assessment ledgers, syllabus milestones, and skill-gap audits"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Reports' },
        ]}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Generated Reports"
          value={String(reports.length)}
          subtitle="Statutory dossiers on file"
          icon={<FileText className="w-5 h-5 text-blue-600" />}
          highlightColor="#0B1E36"
        />
        <KPICard
          title="Audit Pass Rate"
          value="98.2%"
          subtitle="SSC & NCVET compliant"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          trend={{ value: "+2.1% this quarter", isPositive: true }}
          highlightColor="#10B981"
        />
        <KPICard
          title="Active Cohorts Tracked"
          value="1 Batch"
          subtitle="28 enrolled learners"
          icon={<Users className="w-5 h-5 text-amber-600" />}
          highlightColor="#F59E0B"
        />
        <KPICard
          title="Avg Assessment Score"
          value="84.6%"
          subtitle="NSQF practical benchmark"
          icon={<Award className="w-5 h-5 text-indigo-600" />}
          highlightColor="#6366F1"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          {(
            [
              { key: 'all', label: 'All Reports' },
              { key: 'learner', label: 'Learner Reports' },
              { key: 'course', label: 'Course Reports' },
              { key: 'assessment', label: 'Assessment Reports' },
              { key: 'skill-gap', label: 'Skill-Gap Reports' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setReportType(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                reportType === tab.key
                  ? 'bg-[#0B1E36] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing {filteredReports.length} reports
        </span>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:shadow-sm transition-shadow flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {report.type} report
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {report.generatedAt}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900">{report.title}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {report.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <span>Format: <strong className="text-slate-900">{report.format}</strong></span>
                <span>Records: <strong className="text-slate-900">{report.records}</strong></span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {report.status}
                </span>
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                type="button"
                onClick={() => handleDownload(report.title)}
                className="w-full h-9 rounded-lg bg-slate-50 hover:bg-slate-100 text-[#0B1E36] border border-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report Dossier</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
