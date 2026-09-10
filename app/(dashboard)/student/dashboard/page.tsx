'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  Award,
  TrendingUp,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  Briefcase,
  Layers,
  ChevronRight,
  Compass,
  FileCheck,
  Zap,
} from 'lucide-react';
import {
  StudentRecord,
  PlacementStage,
  getStoredStudents,
  getStudentById,
  INITIAL_COURSES,
  simulateCourseCompletion,
} from '@/lib/store/skillbridge-store';

const PLACEMENT_STAGES: PlacementStage[] = [
  'NOT READY',
  'TRAINING',
  'SKILL DEVELOPMENT',
  'ASSESSMENT',
  'PLACEMENT READY',
  'INTERVIEWING',
  'PLACED',
  'EMPLOYED',
];

export default function StudentDashboardPage() {
  const [student, setStudent] = useState<StudentRecord | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [notificationBanner, setNotificationBanner] = useState<string | null>(null);

  useEffect(() => {
    // Load student from localStorage session or fallback to Rahul Sharma
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

  if (!student) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-600 text-sm">
        Loading Student Outcome Cockpit...
      </div>
    );
  }

  const currentStageIndex = PLACEMENT_STAGES.indexOf(student.placementStatus);

  const handleSimulateUpskill = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Simulate completing Java & DSA Course (crs-002)
      const updated = simulateCourseCompletion(student.id, 'crs-002');
      if (updated) {
        setStudent(updated);
        setNotificationBanner(
          'Course Completed! Java skill increased from 58% to 80%. Employability Score boosted to ' +
            updated.employabilityScore +
            '%. Placement Status upgraded to: ' +
            updated.placementStatus +
            '!'
        );
      }
      setIsSimulating(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
      {notificationBanner && (
        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 rounded-r-md text-xs shadow-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{notificationBanner}</span>
          </div>
          <button
            onClick={() => setNotificationBanner(null)}
            className="text-emerald-700 hover:text-emerald-900 text-xs font-bold px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Header Profile Summary */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0B3B60] to-[#006876] text-white flex items-center justify-center text-xl font-black shrink-0 shadow-sm border-2 border-white">
            {student.fullName.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-black text-[#102A43] tracking-tight">
                Welcome, {student.fullName}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E0F2FE] text-[#0369A1] border border-[#BAE6FD]">
                ID: {student.id}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified Candidate Profile
              </span>
            </div>
            <p className="text-xs text-[#627D98] mt-1 font-medium">
              {student.degree} in {student.branch} • {student.college}, {student.state}
            </p>
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="text-[#334E68] font-semibold flex items-center gap-1">
                <Target className="w-3.5 h-3.5 text-[#006876]" /> Target Career Goal:{' '}
                <strong className="text-[#0B3B60]">{student.careerGoal}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Employability Score Pill */}
        <div className="flex items-center gap-4 bg-[#F8FAFC] border border-[#CBD5E1] p-3.5 rounded-lg shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
              Employability Index
            </div>
            <div className="text-2xl font-black text-[#0B3B60]">
              {student.employabilityScore}
              <span className="text-xs font-semibold text-[#64748B]"> / 100</span>
            </div>
            <div className="text-[10px] font-semibold text-emerald-600">
              {student.employabilityScore >= 80 ? 'Placement Benchmark Met' : 'Upskilling Required'}
            </div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-t-emerald-200 flex items-center justify-center font-bold text-xs text-[#0B3B60]">
            {student.employabilityScore}%
          </div>
        </div>
      </div>

      {/* 8-Stage Visual Placement Journey Bar */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-5 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[#102A43] uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-[#006876]" /> Longitudinal Placement Journey
          </span>
          <span className="text-xs font-semibold text-[#006876]">
            Current Stage:{' '}
            <strong className="text-[#0B3B60] uppercase px-2 py-0.5 rounded bg-[#E0F2FE]">
              {student.placementStatus}
            </strong>
          </span>
        </div>

        {/* Steps Flow */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 pt-1">
          {PLACEMENT_STAGES.map((stage, idx) => {
            const isPassed = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div
                key={stage}
                className={`p-2.5 rounded border text-center transition-all flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-sm ring-2 ring-[#0B3B60]/20'
                    : isPassed
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    : 'bg-[#F8FAFC] text-[#94A3B8] border-[#E2E8F0]'
                }`}
              >
                <div className="text-[9px] font-bold font-mono opacity-80 mb-1">
                  0{idx + 1}
                </div>
                <div className="text-[10px] font-bold leading-tight uppercase">
                  {stage}
                </div>
                <div className="mt-1 flex justify-center">
                  {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-[#FF9933] animate-ping" />}
                  {!isPassed && !isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Next Best Action Card (Highlight) */}
      <div className="bg-gradient-to-r from-[#002541] via-[#0B3B60] to-[#004D73] text-white rounded-lg p-6 shadow-md border border-[#0B3B60]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 text-[#FF9933] text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> AI Next Best Action
            </div>
            <h3 className="text-base sm:text-lg font-bold">
              {student.nextBestAction.title}
            </h3>
            <p className="text-xs text-[#D1D9E2] leading-relaxed">
              {student.nextBestAction.reason}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSimulateUpskill}
              disabled={isSimulating}
              className="h-10 px-5 rounded bg-[#FF9933] hover:bg-[#E65100] text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-sm uppercase tracking-wider"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>{isSimulating ? 'Simulating Progress...' : 'Complete Course & Upgrade Skills'}</span>
            </button>
            <Link
              href="/student/courses"
              className="h-10 px-4 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20 transition-all"
            >
              <span>View Recommended Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Grid: Skill Gap Snapshot & Active Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1 & 2: Skill Gap Snapshot */}
        <div className="lg:col-span-2 bg-white border border-[#D1D9E2] rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div>
              <h3 className="text-sm font-bold text-[#102A43]">
                My Skill Gap Intelligence Overview
              </h3>
              <p className="text-xs text-[#627D98]">
                Benchmarked against 1,400+ live requisitions for {student.careerGoal}
              </p>
            </div>
            <Link
              href="/student/skill-gap"
              className="text-xs font-bold text-[#006876] hover:underline flex items-center gap-1"
            >
              <span>View Full 4-Tier Breakdown</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick 4-Tier Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-center">
              <div className="text-lg font-black text-emerald-700">
                {student.skillGaps.strong.length}
              </div>
              <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                Strong Skills (Green)
              </div>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-center">
              <div className="text-lg font-black text-amber-700">
                {student.skillGaps.improve.length}
              </div>
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                To Improve (Yellow)
              </div>
            </div>
            <div className="p-3 bg-rose-50 border border-rose-200 rounded text-center">
              <div className="text-lg font-black text-rose-700">
                {student.skillGaps.missing.length}
              </div>
              <div className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">
                Missing Skills (Red)
              </div>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-center">
              <div className="text-lg font-black text-blue-700">
                {student.skillGaps.future.length}
              </div>
              <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                Future Trends (Blue)
              </div>
            </div>
          </div>

          {/* Current Skills Progress Bars */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-[#334E68] uppercase tracking-wider">
              Assessed Skills Proficiency
            </div>
            <div className="space-y-2.5">
              {student.currentSkills.map((sk) => (
                <div key={sk.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#102A43]">{sk.name}</span>
                      <span className="text-[10px] text-[#627D98]">({sk.category})</span>
                      {sk.verified && (
                        <span className="text-[9px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded font-bold">
                          Verified
                        </span>
                      )}
                    </div>
                    <span className="font-mono text-xs font-bold text-[#0B3B60]">
                      {sk.proficiency}%
                    </span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        sk.proficiency >= 75
                          ? 'bg-emerald-500'
                          : sk.proficiency >= 60
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${sk.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Enrolled & Recommended Courses */}
        <div className="bg-white border border-[#D1D9E2] rounded-lg p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <h3 className="text-sm font-bold text-[#102A43]">
              Active & Recommended Courses
            </h3>
            <Link
              href="/student/courses"
              className="text-xs font-bold text-[#006876] hover:underline"
            >
              All Courses
            </Link>
          </div>

          <div className="space-y-3">
            {INITIAL_COURSES.slice(0, 3).map((crs) => {
              const isEnrolled = student.enrolledCourseIds.includes(crs.id);
              const isCompleted = student.completedCourseIds.includes(crs.id);
              return (
                <div
                  key={crs.id}
                  className="p-3 rounded border border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#0B3B60] transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-[#102A43] leading-snug">
                      {crs.title}
                    </h4>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white border border-[#CBD5E1] shrink-0 text-[#0B3B60]">
                      Score: {crs.courseImpactScore}/100
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] text-[#475569] space-y-1">
                    <div className="flex items-center justify-between">
                      <span>Placement Rate:</span>
                      <span className="font-bold text-emerald-700">{crs.placementRatePct}%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Avg Placed Salary:</span>
                      <span className="font-bold text-[#102A43]">₹{crs.avgSalaryLpa} LPA</span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#627D98]">
                      {isCompleted ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Completed
                        </span>
                      ) : isEnrolled ? (
                        <span className="text-[#0369A1]">In Progress</span>
                      ) : (
                        <span>Recommended</span>
                      )}
                    </span>

                    <Link
                      href="/student/courses"
                      className="text-[11px] font-bold text-[#006876] hover:underline flex items-center gap-0.5"
                    >
                      Details <ChevronRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
