'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Sparkles,
  Award,
  TrendingUp,
  CheckCircle2,
  Users,
  Search,
  Filter,
  Star,
  Zap,
  ArrowRight,
} from 'lucide-react';
import {
  CourseIntelligenceRecord,
  StudentRecord,
  INITIAL_COURSES,
  getStoredCourses,
  getStoredStudents,
  getStudentById,
  simulateCourseCompletion,
} from '@/lib/store/skillbridge-store';

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<CourseIntelligenceRecord[]>(INITIAL_COURSES);
  const [student, setStudent] = useState<StudentRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [successToast, setSuccessToast] = useState<string | null>(null);

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
    setCourses(getStoredCourses());
  }, []);

  const handleEnrollAndComplete = (courseId: string) => {
    if (!student) return;
    const updated = simulateCourseCompletion(student.id, courseId);
    if (updated) {
      setStudent(updated);
      setSuccessToast('Course completed! Acquired skills have been verified and added to your Digital Skill Passport.');
      setTimeout(() => setSuccessToast(null), 5000);
    }
  };

  const categories = ['ALL', 'Software Development', 'Data Analytics', 'Cloud & Infrastructure', 'Artificial Intelligence', 'Cybersecurity'];

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'ALL' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.skillsCovered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.trainerName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Toast */}
      {successToast && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-md text-xs font-semibold shadow-md flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>{successToast}</span>
          </div>
          <button onClick={() => setSuccessToast(null)} className="text-xs font-bold text-emerald-700">
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider bg-[#002541] px-2.5 py-0.5 rounded-full text-white">
              AI Course Recommendation Engine
            </span>
            <span className="text-xs text-[#627D98]">Personalized to your target career goal</span>
          </div>
          <h1 className="text-2xl font-black text-[#102A43] tracking-tight mt-1">
            Outcome-Oriented Course Intelligence
          </h1>
          <p className="text-xs text-[#627D98] mt-1 max-w-2xl leading-relaxed">
            Every course displays verified historical employment outcomes. Transparently compare completion rates,
            average salaries, and placement conversion before enrolling.
          </p>
        </div>

        {student && (
          <div className="bg-[#F0F9FF] border border-[#BAE6FD] p-3 rounded-lg text-xs shrink-0 max-w-xs">
            <span className="text-[#0369A1] font-semibold block">Target Career Goal:</span>
            <span className="font-bold text-[#0C4A6E] text-sm">{student.careerGoal}</span>
            <span className="text-[10px] text-[#0284C7] block mt-0.5">
              Algorithm prioritized courses that resolve your remaining skill gaps.
            </span>
          </div>
        )}
      </div>

      {/* Filters & Search */}
      <div className="bg-white border border-[#D1D9E2] rounded-lg p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by course, skill or trainer..."
            className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B3B60] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isCompleted = student?.completedCourseIds.includes(course.id);
          const isEnrolled = student?.enrolledCourseIds.includes(course.id);

          return (
            <div
              key={course.id}
              className="bg-white border border-[#CBD5E1] rounded-lg shadow-xs hover:shadow-md hover:border-[#0B3B60] transition-all flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5 space-y-3.5">
                {/* Badge Row */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#334155] border border-[#CBD5E1]">
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1 text-[#D97706] font-bold text-xs">
                    <Star className="w-3.5 h-3.5 fill-[#D97706]" />
                    <span>{course.studentRating}</span>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-sm font-bold text-[#102A43] leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Provider: {course.provider} • Trainer: <strong>{course.trainerName}</strong>
                  </p>
                </div>

                {/* Course Impact Score Badge */}
                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                      Course Impact Score
                    </div>
                    <div className="text-lg font-black text-[#0B3B60]">
                      {course.courseImpactScore} <span className="text-xs font-normal text-[#64748B]">/ 100</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ★ {course.courseImpactScore >= 90 ? 'Excellent Employment Impact' : 'High Impact'}
                    </div>
                    <div className="text-[10px] text-[#64748B] mt-0.5">
                      Demand: {course.industryDemand}
                    </div>
                  </div>
                </div>

                {/* VERIFIED OUTCOME STATS: How many completed? How many placed? */}
                <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-3 rounded-lg space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#1E40AF] flex items-center justify-between">
                    <span>Verified Placement Outcome</span>
                    <span className="font-mono text-emerald-800 font-bold">{course.placementRatePct}% Rate</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2 rounded border border-[#DBEAFE]">
                      <span className="text-[10px] text-[#64748B] block">Students Completed:</span>
                      <strong className="text-[#0B3B60] text-sm">{course.completedCount}</strong>
                    </div>
                    <div className="bg-white p-2 rounded border border-[#DBEAFE]">
                      <span className="text-[10px] text-[#64748B] block">Students Placed:</span>
                      <strong className="text-emerald-700 text-sm">{course.placedCount}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] pt-1 text-[#1E3A8A]">
                    <span>Average Starting Salary:</span>
                    <strong className="font-bold text-sm">₹{course.avgSalaryLpa} LPA</strong>
                  </div>
                </div>

                {/* Skills gained */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#475569] mb-1.5">
                    Skills Covered:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {course.skillsCovered.map((sk) => (
                      <span
                        key={sk}
                        className="text-[10px] px-2 py-0.5 bg-white border border-[#CBD5E1] text-[#1E293B] rounded"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-xs text-[#64748B]">
                  {course.durationWeeks} Weeks • {course.skillLevel}
                </span>

                {isCompleted ? (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Completed
                  </span>
                ) : (
                  <button
                    onClick={() => handleEnrollAndComplete(course.id)}
                    className="px-3.5 py-1.5 rounded bg-[#0B3B60] hover:bg-[#002541] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#FF9933]" />
                    <span>{isEnrolled ? 'Complete & Verify' : 'Enroll & Upskill'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
