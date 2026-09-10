'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, CheckCircle2, ArrowLeft, Trophy, Star } from 'lucide-react';
import { INITIAL_COURSES, CourseIntelligenceRecord } from '@/lib/store/skillbridge-store';

const defaultCourseA: CourseIntelligenceRecord = {
  id: 'crs-compare-1',
  courseCode: 'WD-NSQF-5',
  title: 'Full Stack Web & Application Development',
  provider: 'National Skill Training Institute',
  trainerId: 'trainer-1',
  trainerName: 'Accredited Master Trainer',
  category: 'IT & ITES',
  skillsCovered: ['Next.js', 'React', 'TypeScript', 'SQL'],
  skillLevel: 'Intermediate',
  durationWeeks: 12,
  capacity: 30,
  enrolledCount: 30,
  completedCount: 28,
  certifiedCount: 26,
  placementReadyCount: 24,
  placedCount: 22,
  placementRatePct: 78.5,
  avgSalaryLpa: 5.8,
  industryDemand: 'VERY HIGH',
  courseImpactScore: 89,
  studentRating: 4.8,
  status: 'ACTIVE',
  impactBreakdown: {
    skillImprovementPct: 82,
    completionRatePct: 93.3,
    assessmentAvgPct: 84.5,
    certificationRatePct: 86.7,
    placementRatePct: 78.5,
    industryRelevancePct: 94,
  },
  description: 'Full stack development with modern web frameworks.',
  syllabus: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
};

const defaultCourseB: CourseIntelligenceRecord = {
  id: 'crs-compare-2',
  courseCode: 'CLOUD-NSQF-6',
  title: 'Cloud Infrastructure & DevOps Systems',
  provider: 'National Skill Training Institute',
  trainerId: 'trainer-1',
  trainerName: 'Accredited Master Trainer',
  category: 'IT & ITES',
  skillsCovered: ['AWS', 'Docker', 'Kubernetes', 'Linux'],
  skillLevel: 'Advanced',
  durationWeeks: 16,
  capacity: 30,
  enrolledCount: 30,
  completedCount: 27,
  certifiedCount: 25,
  placementReadyCount: 25,
  placedCount: 23,
  placementRatePct: 85.2,
  avgSalaryLpa: 7.4,
  industryDemand: 'VERY HIGH',
  courseImpactScore: 92,
  studentRating: 4.9,
  status: 'ACTIVE',
  impactBreakdown: {
    skillImprovementPct: 88,
    completionRatePct: 90.0,
    assessmentAvgPct: 86.0,
    certificationRatePct: 88.0,
    placementRatePct: 85.2,
    industryRelevancePct: 96,
  },
  description: 'Enterprise cloud infrastructure and deployment pipelines.',
  syllabus: ['Linux', 'Docker', 'Kubernetes', 'Cloud Security'],
};

export default function CourseComparePage() {
  const availableCourses = INITIAL_COURSES.length >= 2 ? INITIAL_COURSES : [defaultCourseA, defaultCourseB];
  const [courseAId, setCourseAId] = useState<string>(availableCourses[0].id);
  const [courseBId, setCourseBId] = useState<string>(availableCourses[1].id);

  const courseA = availableCourses.find((c) => c.id === courseAId) || availableCourses[0];
  const courseB = availableCourses.find((c) => c.id === courseBId) || availableCourses[1];

  const metrics = [
    { label: 'Students Enrolled', valA: courseA.enrolledCount, valB: courseB.enrolledCount, higherBetter: true },
    { label: 'Students Completed', valA: courseA.completedCount, valB: courseB.completedCount, higherBetter: true },
    { label: 'Completion Rate', valA: `${courseA.impactBreakdown.completionRatePct}%`, valB: `${courseB.impactBreakdown.completionRatePct}%`, numA: courseA.impactBreakdown.completionRatePct, numB: courseB.impactBreakdown.completionRatePct, higherBetter: true },
    { label: 'Skill Improvement %', valA: `${courseA.impactBreakdown.skillImprovementPct}%`, valB: `${courseB.impactBreakdown.skillImprovementPct}%`, numA: courseA.impactBreakdown.skillImprovementPct, numB: courseB.impactBreakdown.skillImprovementPct, higherBetter: true },
    { label: 'Certified Count', valA: courseA.certifiedCount, valB: courseB.certifiedCount, higherBetter: true },
    { label: 'Students Placed', valA: courseA.placedCount, valB: courseB.placedCount, higherBetter: true },
    { label: 'Verified Placement Rate', valA: `${courseA.placementRatePct}%`, valB: `${courseB.placementRatePct}%`, numA: courseA.placementRatePct, numB: courseB.placementRatePct, higherBetter: true, highlight: true },
    { label: 'Average Placement Salary', valA: `₹${courseA.avgSalaryLpa} LPA`, valB: `₹${courseB.avgSalaryLpa} LPA`, numA: courseA.avgSalaryLpa, numB: courseB.avgSalaryLpa, higherBetter: true },
    { label: 'Course Impact Score', valA: `${courseA.courseImpactScore} / 100`, valB: `${courseB.courseImpactScore} / 100`, numA: courseA.courseImpactScore, numB: courseB.courseImpactScore, higherBetter: true, highlight: true },
    { label: 'Industry Relevance', valA: `${courseA.impactBreakdown.industryRelevancePct}%`, valB: `${courseB.impactBreakdown.industryRelevancePct}%`, numA: courseA.impactBreakdown.industryRelevancePct, numB: courseB.impactBreakdown.industryRelevancePct, higherBetter: true },
  ];

  const winner = courseA.courseImpactScore >= courseB.courseImpactScore ? courseA : courseB;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link
            href="/courses/intelligence"
            className="text-xs font-bold text-[#006876] hover:underline flex items-center gap-1 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Course Intelligence
          </Link>
          <h1 className="text-2xl font-black text-[#102A43] tracking-tight">
            Curriculum Outcome Comparison Matrix
          </h1>
          <p className="text-xs text-[#627D98] mt-1">
            Side-by-side longitudinal outcome audit. Identify which syllabus generates superior employment conversion.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg flex items-center gap-2.5 text-xs text-emerald-900 shrink-0">
          <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Stronger Outcome:</span>
            <strong>{winner.title}</strong> ({winner.courseImpactScore} Score)
          </div>
        </div>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-[#CBD5E1] p-4 rounded-lg space-y-2">
          <label className="text-xs font-bold text-[#0B3B60] uppercase tracking-wider block">
            Select Course A
          </label>
          <select
            value={courseAId}
            onChange={(e) => setCourseAId(e.target.value)}
            className="w-full h-10 px-3 text-xs border border-[#CBD5E1] rounded bg-white font-semibold text-[#102A43]"
          >
            {availableCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.provider})
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white border border-[#CBD5E1] p-4 rounded-lg space-y-2">
          <label className="text-xs font-bold text-[#0B3B60] uppercase tracking-wider block">
            Select Course B
          </label>
          <select
            value={courseBId}
            onChange={(e) => setCourseBId(e.target.value)}
            className="w-full h-10 px-3 text-xs border border-[#CBD5E1] rounded bg-white font-semibold text-[#102A43]"
          >
            {availableCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.provider})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg shadow-xs overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#0B3B60] text-white">
              <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-1/3">
                Measurable Dimension
              </th>
              <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-1/3 border-l border-white/10">
                {courseA.title}
              </th>
              <th className="py-3.5 px-4 font-bold text-xs uppercase tracking-wider w-1/3 border-l border-white/10">
                {courseB.title}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {metrics.map((m, idx) => {
              const aHigher = (m.numA ?? m.valA) > (m.numB ?? m.valB);
              const bHigher = (m.numB ?? m.valB) > (m.numA ?? m.valA);

              return (
                <tr
                  key={idx}
                  className={`hover:bg-[#F8FAFC] transition-colors ${
                    m.highlight ? 'bg-[#F0F9FF] font-semibold' : ''
                  }`}
                >
                  <td className="py-3 px-4 font-bold text-[#334E68] flex items-center justify-between">
                    <span>{m.label}</span>
                    {m.highlight && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-[#0B3B60] text-white rounded uppercase font-bold">
                        Key KPI
                      </span>
                    )}
                  </td>
                  <td className={`py-3 px-4 border-l border-[#E2E8F0] ${aHigher ? 'text-emerald-700 font-bold bg-emerald-50/30' : 'text-[#102A43]'}`}>
                    <div className="flex items-center justify-between">
                      <span>{m.valA}</span>
                      {aHigher && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                  </td>
                  <td className={`py-3 px-4 border-l border-[#E2E8F0] ${bHigher ? 'text-emerald-700 font-bold bg-emerald-50/30' : 'text-[#102A43]'}`}>
                    <div className="flex items-center justify-between">
                      <span>{m.valB}</span>
                      {bHigher && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
