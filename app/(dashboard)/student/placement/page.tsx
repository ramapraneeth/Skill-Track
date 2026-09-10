'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck,
  TrendingUp,
  MapPin,
  Calendar,
  Award,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import {
  StudentRecord,
  PlacementStage,
  INITIAL_COMPANIES,
  getStoredStudents,
  getStudentById,
} from '@/lib/store/skillbridge-store';

const STAGES: { stage: PlacementStage; label: string; desc: string }[] = [
  { stage: 'NOT READY', label: '1. Not Ready', desc: 'Baseline enrollment & diagnostic profiling' },
  { stage: 'TRAINING', label: '2. Training', desc: 'Core curriculum coursework in progress' },
  { stage: 'SKILL DEVELOPMENT', label: '3. Skill Dev', desc: 'Remediating targeted competencies' },
  { stage: 'ASSESSMENT', label: '4. Assessment', desc: 'Standardized vocational & coding proctoring' },
  { stage: 'PLACEMENT READY', label: '5. Placement Ready', desc: 'Benchmark cleared; portfolio certified' },
  { stage: 'INTERVIEWING', label: '6. Interviewing', desc: 'Engaging active corporate hiring drives' },
  { stage: 'PLACED', label: '7. Placed', desc: 'Formal employment offer letter issued' },
  { stage: 'EMPLOYED', label: '8. Employed', desc: 'Wage verification & longitudinal retention' },
];

export default function StudentPlacementPage() {
  const [student, setStudent] = useState<StudentRecord | null>(null);

  useEffect(() => {
    const rawUser = localStorage.getItem('skilltrack_user');
    let studentId = 'std-101';
    if (rawUser) {
      try {
        const u = JSON.parse(rawUser);
        if (u.studentId) studentId = u.studentId;
        else if (u.id) studentId = u.id;
      } catch {}
    }
    const s = getStudentById(studentId) || getStoredStudents()[0];
    setStudent(s);
  }, []);

  if (!student) return <div className="p-8 text-xs text-slate-500">Loading Placement Ledger...</div>;

  const currentStageIndex = STAGES.findIndex((s) => s.stage === student.placementStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Longitudinal Career Ledger
            </span>
            <span className="text-xs text-[#627D98]">Candidate ID: {student.id}</span>
          </div>
          <h1 className="text-2xl font-black text-[#102A43] tracking-tight mt-1">
            Individual Placement & Employment Outcome Tracking
          </h1>
          <p className="text-xs text-[#627D98] mt-1 max-w-2xl leading-relaxed">
            Verified longitudinal record connecting your coursework, skill assessments, certifications, and verified
            employment contracts.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-3.5 rounded-lg text-right shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Current Placement Stage
          </div>
          <div className="text-lg font-black text-[#0B3B60] uppercase">
            {student.placementStatus}
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold flex items-center justify-end gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> State Verified Record
          </div>
        </div>
      </div>

      {/* 8-Stage Detailed Stepper */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-xs space-y-4">
        <h3 className="text-xs font-bold text-[#102A43] uppercase tracking-wider">
          Longitudinal Career Readiness Lifecycle
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {STAGES.map((s, idx) => {
            const isPassed = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={s.stage}
                className={`p-3.5 rounded-lg border transition-all ${
                  isCurrent
                    ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-md ring-2 ring-[#0B3B60]/20'
                    : isPassed
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-[10px] font-bold uppercase ${isCurrent ? 'text-[#FF9933]' : ''}`}>
                    {s.label}
                  </span>
                  {isPassed && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse" />}
                </div>
                <p className={`text-[11px] leading-snug ${isCurrent ? 'text-[#D1D9E2]' : 'text-[#475569]'}`}>
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verified Placement Offer Details (if placed) or Readiness Snapshot */}
      {student.placementDetails ? (
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white rounded-lg p-6 shadow-md border border-emerald-700">
          <div className="flex items-center gap-2 text-[#FF9933] text-xs font-bold uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" /> Verified Employment Contract Recorded
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-2">
            <div>
              <span className="text-[10px] text-emerald-200 block uppercase">Hiring Enterprise</span>
              <strong className="text-base">{student.placementDetails.company}</strong>
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 block uppercase">Designation</span>
              <strong className="text-base">{student.placementDetails.role}</strong>
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 block uppercase">Annual Wage Compensation</span>
              <strong className="text-base text-[#FF9933]">₹{student.placementDetails.salaryLpa} LPA</strong>
            </div>
            <div>
              <span className="text-[10px] text-emerald-200 block uppercase">Placement Date</span>
              <strong className="text-base">{student.placementDetails.placementDate}</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#CBD5E1] rounded-lg p-5 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#006876]" /> Target Employability Threshold: 80%
            </div>
            <p className="text-xs text-[#627D98]">
              Your current Employability Index is <strong>{student.employabilityScore}%</strong>. Complete remaining
              interventions to trigger corporate campus interview scheduling.
            </p>
          </div>
          <Link
            href="/student/courses"
            className="px-4 py-2 rounded bg-[#0B3B60] text-white font-bold text-xs hover:bg-[#002541] transition-colors"
          >
            Upskill Now
          </Link>
        </div>
      )}

      {/* Corporate Requisitions & Hiring Match Feed */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-sm font-bold text-[#102A43]">
              Active Hiring Partners & Skill Match Feed
            </h3>
            <p className="text-xs text-[#627D98]">
              Direct industry requisitions matched against your current competency scores
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            {INITIAL_COMPANIES.length} Verified Employers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INITIAL_COMPANIES.map((cmp) => {
            return (
              <div
                key={cmp.id}
                className="p-4 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-[#102A43]">{cmp.name}</h4>
                      <span className="text-[11px] text-[#64748B] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" /> {cmp.location}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      {cmp.openRolesCount} Openings
                    </span>
                  </div>

                  <div className="mt-3 text-xs text-[#475569] space-y-1">
                    <div>
                      Avg Salary: <strong className="text-[#102A43]">₹{cmp.avgSalaryOfferedLpa} LPA</strong>
                    </div>
                    <div>
                      Alumni Placed: <strong className="text-emerald-700">{cmp.hiredStudentsCount}</strong>
                    </div>
                  </div>

                  <div className="mt-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                      Required Skills:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cmp.topSkillsRequired.map((sk) => (
                        <span
                          key={sk}
                          className="text-[9px] px-1.5 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#334155]"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                  <span className="text-[11px] text-[#64748B]">{cmp.industry}</span>
                  <button className="text-xs font-bold text-[#0B3B60] hover:underline flex items-center gap-0.5">
                    Apply Profile <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
