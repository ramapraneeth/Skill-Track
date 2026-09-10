'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  ArrowRight,
  BookOpen,
  Sparkles,
  Zap,
  Layers,
  ChevronRight,
  Target,
  ShieldCheck,
} from 'lucide-react';
import {
  StudentRecord,
  getStoredStudents,
  getStudentById,
  INITIAL_COURSES,
  simulateCourseCompletion,
} from '@/lib/store/skillbridge-store';

export default function StudentSkillGapPage() {
  const [student, setStudent] = useState<StudentRecord | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'GREEN' | 'YELLOW' | 'RED' | 'BLUE'>('ALL');
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [upgradeMsg, setUpgradeMsg] = useState<string | null>(null);

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

  if (!student) return <div className="p-8 text-xs text-slate-500">Loading Skill Gap Model...</div>;

  const handleSimulateCompletion = (courseId: string) => {
    setIsUpgrading(true);
    setTimeout(() => {
      const updated = simulateCourseCompletion(student.id, courseId);
      if (updated) {
        setStudent(updated);
        setUpgradeMsg('Course completed successfully! Your skill profile and gaps have recalibrated in real time.');
      }
      setIsUpgrading(false);
    }, 500);
  };

  // Find recommended courses that address this student's missing or improve skills
  const missingSkillNames = student.skillGaps.missing.map((m) => m.name.toLowerCase());
  const improveSkillNames = student.skillGaps.improve.map((i) => i.name.toLowerCase());

  const gapTargetedCourses = INITIAL_COURSES.filter((course) => {
    return course.skillsCovered.some(
      (sc) =>
        missingSkillNames.some((ms) => sc.toLowerCase().includes(ms) || ms.includes(sc.toLowerCase())) ||
        improveSkillNames.some((is) => sc.toLowerCase().includes(is) || is.includes(sc.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Alert banner */}
      {upgradeMsg && (
        <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-900 rounded-r-md text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span className="font-semibold">{upgradeMsg}</span>
          </div>
          <button
            onClick={() => setUpgradeMsg(null)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#006876] uppercase tracking-wider bg-[#E0F2FE] px-2.5 py-0.5 rounded-full border border-[#BAE6FD]">
              Mathematical Diagnostic Engine
            </span>
            <span className="text-xs text-[#627D98] font-medium">Candidate: {student.fullName}</span>
          </div>
          <h1 className="text-2xl font-black text-[#102A43] tracking-tight mt-1">
            MY SKILL GAP
          </h1>
          <p className="text-xs text-[#627D98] mt-1 max-w-2xl leading-relaxed">
            Live comparison of your current competencies against active industry hiring requisitions for{' '}
            <strong className="text-[#0B3B60]">{student.careerGoal}</strong>. Missing competencies dynamically drive
            course recommendations.
          </p>
        </div>

        <div className="bg-[#F8FAFC] border border-[#CBD5E1] p-3 rounded-lg text-center shrink-0">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
            Job Match Alignment
          </div>
          <div className="text-2xl font-black text-[#0B3B60]">
            {student.employabilityScore}%
          </div>
          <div className="text-[10px] text-emerald-600 font-semibold">
            {student.skillGaps.missing.length} Gaps Remaining
          </div>
        </div>
      </div>

      {/* 4 CATEGORIES FILTER TABS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* GREEN */}
        <button
          type="button"
          onClick={() => setSelectedCategory(selectedCategory === 'GREEN' ? 'ALL' : 'GREEN')}
          className={`p-4 rounded-lg border text-left transition-all ${
            selectedCategory === 'GREEN'
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300'
              : 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200 text-emerald-950'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Strong Skills
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black">{student.skillGaps.strong.length}</div>
          <p className="text-[11px] opacity-80 mt-0.5">&gt;75% benchmark met</p>
        </button>

        {/* YELLOW */}
        <button
          type="button"
          onClick={() => setSelectedCategory(selectedCategory === 'YELLOW' ? 'ALL' : 'YELLOW')}
          className={`p-4 rounded-lg border text-left transition-all ${
            selectedCategory === 'YELLOW'
              ? 'bg-amber-500 text-white border-amber-500 shadow-md ring-2 ring-amber-200'
              : 'bg-amber-50/70 hover:bg-amber-100/70 border-amber-200 text-amber-950'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Skills To Improve
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black">{student.skillGaps.improve.length}</div>
          <p className="text-[11px] opacity-80 mt-0.5">50% - 74% proficiency</p>
        </button>

        {/* RED */}
        <button
          type="button"
          onClick={() => setSelectedCategory(selectedCategory === 'RED' ? 'ALL' : 'RED')}
          className={`p-4 rounded-lg border text-left transition-all ${
            selectedCategory === 'RED'
              ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-300'
              : 'bg-rose-50/70 hover:bg-rose-100/70 border-rose-200 text-rose-950'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Missing Skills
            </span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black">{student.skillGaps.missing.length}</div>
          <p className="text-[11px] opacity-80 mt-0.5">Blocking placement readiness</p>
        </button>

        {/* BLUE */}
        <button
          type="button"
          onClick={() => setSelectedCategory(selectedCategory === 'BLUE' ? 'ALL' : 'BLUE')}
          className={`p-4 rounded-lg border text-left transition-all ${
            selectedCategory === 'BLUE'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-300'
              : 'bg-blue-50/70 hover:bg-blue-100/70 border-blue-200 text-blue-950'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              Future Skills
            </span>
            <TrendingUp className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black">{student.skillGaps.future.length}</div>
          <p className="text-[11px] opacity-80 mt-0.5">High-growth market horizons</p>
        </button>
      </div>

      {/* 4-CATEGORY DETAILED BREAKDOWN PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GREEN: Strong Skills */}
        {(selectedCategory === 'ALL' || selectedCategory === 'GREEN') && (
          <div className="bg-white border border-emerald-200 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <div className="flex items-center gap-2 text-emerald-800">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="font-bold text-sm">Strong Competencies (GREEN)</h3>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Cleared Industry Bar
              </span>
            </div>

            <div className="space-y-3">
              {student.skillGaps.strong.map((sk) => (
                <div key={sk.name} className="p-3 rounded bg-emerald-50/40 border border-emerald-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#102A43]">{sk.name}</span>
                    <span className="font-bold text-emerald-700">{sk.score}% ({sk.level})</span>
                  </div>
                  <div className="w-full bg-emerald-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${sk.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* YELLOW: Skills to Improve */}
        {(selectedCategory === 'ALL' || selectedCategory === 'YELLOW') && (
          <div className="bg-white border border-amber-200 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-100">
              <div className="flex items-center gap-2 text-amber-800">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <h3 className="font-bold text-sm">Skills To Improve (YELLOW)</h3>
              </div>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Target: 80% Proficiency
              </span>
            </div>

            <div className="space-y-3">
              {student.skillGaps.improve.map((sk) => (
                <div key={sk.name} className="p-3 rounded bg-amber-50/40 border border-amber-100 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#102A43]">{sk.name}</span>
                    <span className="text-amber-800 font-semibold">
                      Current: <strong>{sk.score}%</strong> • Target: {sk.target}% (Delta: +{sk.delta}%)
                    </span>
                  </div>
                  <div className="w-full bg-amber-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${sk.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RED: Missing Skills */}
        {(selectedCategory === 'ALL' || selectedCategory === 'RED') && (
          <div className="bg-white border border-rose-200 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-rose-100">
              <div className="flex items-center gap-2 text-rose-800">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <h3 className="font-bold text-sm">Critical Missing Skills (RED)</h3>
              </div>
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                Action Required
              </span>
            </div>

            <div className="space-y-3">
              {student.skillGaps.missing.length === 0 ? (
                <div className="p-4 bg-emerald-50 text-emerald-800 text-xs rounded font-semibold text-center">
                  🎉 No critical missing skills remaining! You have met the technical screening baseline.
                </div>
              ) : (
                student.skillGaps.missing.map((sk) => (
                  <div key={sk.name} className="p-3 rounded bg-rose-50/40 border border-rose-100 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#102A43]">{sk.name}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800 uppercase">
                        {sk.industryImportance}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#627D98] leading-relaxed">{sk.reason}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* BLUE: Future Skills */}
        {(selectedCategory === 'ALL' || selectedCategory === 'BLUE') && (
          <div className="bg-white border border-blue-200 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-blue-100">
              <div className="flex items-center gap-2 text-blue-800">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <h3 className="font-bold text-sm">Future Market Horizons (BLUE)</h3>
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Next-Gen Differentiation
              </span>
            </div>

            <div className="space-y-3">
              {student.skillGaps.future.map((sk) => (
                <div key={sk.name} className="p-3 rounded bg-blue-50/40 border border-blue-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#102A43]">{sk.name}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                      Growth: {sk.trendGrowth}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#627D98]">Adoption Horizon: {sk.horizon}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* COURSE → SKILL GAP CONNECTION SECTION */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#006876] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#FF9933]" /> Directly Mapped Interventions
            </div>
            <h2 className="text-base font-bold text-[#102A43] mt-0.5">
              Accredited Courses Specifically Targeted at Closing Your Gaps
            </h2>
          </div>
          <span className="text-xs text-[#627D98]">
            Completing these courses automatically recalibrates your skill metrics
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {gapTargetedCourses.map((course) => {
            const isCompleted = student.completedCourseIds.includes(course.id);
            return (
              <div
                key={course.id}
                className="p-4 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] flex flex-col justify-between space-y-3 hover:border-[#0B3B60] transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-[#CBD5E1] text-[#0B3B60]">
                      {course.category}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Placement: {course.placementRatePct}%
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#102A43] mt-2">
                    {course.title}
                  </h3>

                  {/* Why recommended badge */}
                  <div className="mt-2 p-2 bg-[#E0F2FE] border border-[#BAE6FD] text-[#0369A1] rounded text-[11px] leading-relaxed">
                    <strong>Why Recommended:</strong> Mapped to close your identified competency gap in{' '}
                    <strong>{course.skillsCovered.slice(0, 3).join(', ')}</strong>.
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-xs text-[#475569]">
                    <span>Duration: <strong>{course.durationWeeks} Weeks</strong></span>
                    <span>•</span>
                    <span>Avg Salary: <strong>₹{course.avgSalaryLpa} LPA</strong></span>
                    <span>•</span>
                    <span>Impact: <strong>{course.courseImpactScore}/100</strong></span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                  <div className="text-[11px] text-[#64748B]">
                    Trainer: <strong>{course.trainerName}</strong>
                  </div>

                  {isCompleted ? (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Completed & Verified
                    </span>
                  ) : (
                    <button
                      onClick={() => handleSimulateCompletion(course.id)}
                      disabled={isUpgrading}
                      className="px-3.5 py-1.5 rounded bg-[#0B3B60] hover:bg-[#002541] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#FF9933]" />
                      <span>{isUpgrading ? 'Updating...' : 'Simulate Completion'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
