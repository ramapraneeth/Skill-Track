'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
  ChevronRight,
  Play,
  Layers,
  BarChart3,
  Target,
  Clock,
  Filter,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  getLearner,
  CAREER_POSTS,
  calculateCareerMatch,
  CareerPost,
  CareerMatchResult,
  GapCategory,
  SkillPriority,
  SkillProficiencyLevel,
  LearnerProfile,
} from '@/lib/sidh-store';

function StudentSkillGapContent() {
  const searchParams = useSearchParams();
  const requestedPostId = searchParams.get('post');

  const [learner, setLearner] = useState<LearnerProfile | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string>(requestedPostId || 'post-python');
  const [activeFilter, setActiveFilter] = useState<'All' | GapCategory>('All');
  const [learningStarted, setLearningStarted] = useState<string | null>(null);

  useEffect(() => {
    const profile = getLearner();
    setLearner(profile);
  }, []);

  useEffect(() => {
    if (requestedPostId) {
      setSelectedPostId(requestedPostId);
    }
  }, [requestedPostId]);

  if (!learner) return null;

  const currentPost =
    CAREER_POSTS.find((p) => p.id === selectedPostId) || CAREER_POSTS[0];

  const matchResult: CareerMatchResult = calculateCareerMatch(learner, currentPost);

  const totalRequired = currentPost.requiredSkills.length;
  const noGapCount = matchResult.skillGaps.filter((g) => g.gap === 'No Gap').length;
  const gapCount = totalRequired - noGapCount;
  const skillGapScore = Math.max(0, 100 - matchResult.matchPercentage);

  const filteredGaps =
    activeFilter === 'All'
      ? matchResult.skillGaps
      : matchResult.skillGaps.filter((g) => g.gap === activeFilter);

  const highPriorityGaps = matchResult.skillGaps.filter(
    (g) => g.priority === 'High' && g.gap !== 'No Gap'
  );
  const mediumPriorityGaps = matchResult.skillGaps.filter(
    (g) => g.priority === 'Medium' && g.gap !== 'No Gap'
  );
  const lowPriorityGaps = matchResult.skillGaps.filter(
    (g) => g.priority === 'Low' && g.gap !== 'No Gap'
  );
  const masteredSkills = matchResult.skillGaps.filter((g) => g.gap === 'No Gap');

  const handleStartLearning = (courseTitle: string) => {
    setLearningStarted(courseTitle);
    setTimeout(() => setLearningStarted(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <PageHeader
        title="Skill Gap Analysis & Bridging Engine"
        subtitle="Detailed comparative diagnostics between your verified profile and target career employment requirements"
        badge="AI Diagnostic System"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/learner/profile?tab=skills"
              className="h-9 px-3.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-[#0B1B30] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>✏️</span>
              <span>Update Skills in Profile</span>
            </Link>
            <Link
              href="/learner/careers"
              className="h-9 px-4 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>💼</span>
              <span>All Recommended Posts</span>
            </Link>
          </div>
        }
      />

      {/* Learning Notification Toast */}
      {learningStarted && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#2857D9]" />
            <span>Enrolled in <strong>{learningStarted}</strong>. Course modules added to your Learning Roadmap.</span>
          </div>
          <Link
            href="/learner/roadmap"
            className="px-3 py-1 rounded bg-[#2857D9] text-white text-[11px] font-bold hover:bg-[#1E42B0]"
          >
            Go to Roadmap
          </Link>
        </div>
      )}

      {/* Closed-Loop Skilling Workflow Banner */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-4 shadow-xs overflow-x-auto">
        <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block mb-2">
          Closed-Loop Career Bridging Flow
        </span>
        <div className="flex items-center justify-between min-w-[780px] text-center text-xs">
          {[
            { step: '01', title: 'Current Skills', desc: `${learner.skills.length} Profile Skills`, active: true },
            { step: '02', title: 'Target Post', desc: currentPost.postName, active: true },
            { step: '03', title: 'Skill Gap Detection', desc: `${gapCount} Identified Gaps`, active: true },
            { step: '04', title: 'Recommended Courses', desc: 'Targeted Modules', active: true },
            { step: '05', title: 'Learning', desc: 'Interactive Content', active: false },
            { step: '06', title: 'Skill Assessment', desc: 'Summative Exam', active: false },
            { step: '07', title: 'Skill Update', desc: 'Profile Sync', active: false },
            { step: '08', title: 'Improved Match', desc: 'Placement Ready', active: false },
          ].map((item, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    item.active
                      ? 'bg-[#2857D9] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {item.step}
                </span>
                <span className="font-semibold text-slate-800 mt-1 text-[11px]">{item.title}</span>
                <span className="text-[10px] text-slate-400 truncate max-w-[90px]">{item.desc}</span>
              </div>
              {i < 7 && <div className="h-0.5 w-6 bg-slate-200 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Interactive Target Post Selector Bar */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-[#2857D9]" />
            <h3 className="text-xs font-bold text-[#0B1B30] uppercase tracking-wide">
              Select Target Employment Post for Gap Diagnosis
            </h3>
          </div>
          <span className="text-[11px] text-[#64748B]">
            Benchmarked against official NSQF qualification packs
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {CAREER_POSTS.map((post) => {
            const isSelected = post.id === selectedPostId;
            return (
              <button
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#2857D9] border-[#2857D9] text-white shadow-xs'
                    : 'bg-white border-[#CBD5E1] text-[#334155] hover:bg-slate-50'
                }`}
              >
                <span>{post.postName}</span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Target Post Diagnostic Summary Cockpit */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-[#0B1B30]">{currentPost.postName}</h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  matchResult.status === 'Strong Match'
                    ? 'bg-emerald-100 text-emerald-800'
                    : matchResult.status === 'Good Match'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {matchResult.status}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-1">
              Sector: <strong className="text-slate-800">{currentPost.sector}</strong> • {currentPost.salaryRange} • {currentPost.requiredQualification}
            </p>
          </div>

          {/* Dual Progress KPI: Skill Match vs Skill Gap */}
          <div className="flex flex-col sm:flex-row items-center gap-6 lg:border-l lg:border-[#E2E8F0] lg:pl-6 shrink-0">
            {/* Overall Skill Match Progress */}
            <div className="w-full sm:w-44">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
                  Overall Skill Match
                </span>
                <span className="font-mono font-bold text-base text-[#2857D9]">
                  {matchResult.matchPercentage}%
                </span>
              </div>
              <div className="w-full bg-[#F1F5F9] rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-[#2857D9] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${matchResult.matchPercentage}%` }}
                />
              </div>
            </div>

            {/* Skill Gap Percentage */}
            <div className="w-full sm:w-44">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider">
                  Skill Gap Score
                </span>
                <span className="font-mono font-bold text-base text-amber-600">
                  {skillGapScore}%
                </span>
              </div>
              <div className="w-full bg-[#F1F5F9] rounded-full h-2.5 overflow-hidden border border-slate-200">
                <div
                  className="bg-amber-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${skillGapScore}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Diagnostic Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <span className="text-[10px] font-bold text-[#64748B] block">Total Required Competencies</span>
            <span className="font-mono font-bold text-lg text-[#0B1B30] block mt-1">{totalRequired}</span>
            <span className="text-[10px] text-slate-500">Benchmark requirement</span>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="text-[10px] font-bold text-emerald-800 block">Fully Matched (No Gap)</span>
            <span className="font-mono font-bold text-lg text-emerald-900 block mt-1">{noGapCount}</span>
            <span className="text-[10px] text-emerald-700">Meets or exceeds required level</span>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <span className="text-[10px] font-bold text-amber-800 block">Competencies with Gaps</span>
            <span className="font-mono font-bold text-lg text-amber-900 block mt-1">{gapCount}</span>
            <span className="text-[10px] text-amber-700">Requires upskilling modules</span>
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg">
            <span className="text-[10px] font-bold text-rose-800 block">High Priority Gaps</span>
            <span className="font-mono font-bold text-lg text-rose-900 block mt-1">{highPriorityGaps.length}</span>
            <span className="text-[10px] text-rose-700">Critical for shortlisting</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: CURRENT VS REQUIRED SKILL LEVEL COMPARISON TABLE */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">
              Current Student Level vs. Required Skill Level Comparison
            </h3>
            <p className="text-[11px] text-[#64748B]">
              Direct matrix comparison showing exact level difference, gap severity, and priority weight
            </p>
          </div>

          {/* Filter by Gap Severity */}
          <div className="flex items-center gap-1 text-xs">
            {(['All', 'No Gap', 'Medium Gap', 'High Gap'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-2.5 py-1 rounded text-xs font-semibold transition-all ${
                  activeFilter === cat
                    ? 'bg-[#0B1B30] text-white'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto border border-[#E2E8F0] rounded-xl">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
                <th className="py-3 px-4 font-semibold">Required Skill</th>
                <th className="py-3 px-4 font-semibold">Current Student Level</th>
                <th className="py-3 px-4 font-semibold">Required Level</th>
                <th className="py-3 px-4 font-semibold">Gap Severity</th>
                <th className="py-3 px-4 font-semibold">Priority</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredGaps.map((item) => {
                const isNoGap = item.gap === 'No Gap';
                const isHighGap = item.gap === 'High Gap';

                return (
                  <tr key={item.skill} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#0F172A] block">{item.skill}</span>
                      <span className="text-[10px] text-[#64748B] block mt-0.5">{item.whyRequired}</span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          item.currentLevel === 'Advanced'
                            ? 'bg-emerald-100 text-emerald-800'
                            : item.currentLevel === 'Intermediate'
                            ? 'bg-blue-100 text-blue-800'
                            : item.currentLevel === 'Beginner'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {item.currentLevel === 'None' ? 'Not Present' : item.currentLevel}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {item.requiredLevel}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          isNoGap
                            ? 'bg-emerald-100 text-emerald-800'
                            : isHighGap
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isNoGap ? '✓ No Gap' : `⚡ ${item.gap}`}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.priority === 'High'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : item.priority === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-50 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      {isNoGap ? (
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center justify-end gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Mastered
                        </span>
                      ) : (
                        <button
                          onClick={() => handleStartLearning(item.recommendedCourse)}
                          className="px-2.5 py-1 rounded-md bg-[#2857D9] hover:bg-[#1E42B0] text-white text-[11px] font-bold inline-flex items-center gap-1 shadow-2xs"
                        >
                          <span>Bridge Gap</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: PRIORITY-BASED SKILL GAP CARDS */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2857D9]" />
            <h3 className="text-sm font-bold text-[#0F172A]">
              Priority-Based Skill Gap Cards
            </h3>
          </div>
          <span className="text-xs text-[#64748B]">Organized by urgency for {currentPost.postName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. High Priority Gaps */}
          <div className="bg-white border border-rose-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-rose-100">
              <span className="font-bold text-xs text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                High Priority Gaps
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                {highPriorityGaps.length} Skills
              </span>
            </div>

            <div className="space-y-2.5">
              {highPriorityGaps.length === 0 ? (
                <p className="text-xs text-emerald-700 py-3 text-center font-medium">
                  ✓ All high priority requirements satisfied!
                </p>
              ) : (
                highPriorityGaps.map((g) => (
                  <div key={g.skill} className="p-3 bg-rose-50/50 border border-rose-200/80 rounded-lg text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-950">{g.skill}</span>
                      <span className="text-[10px] font-mono text-rose-700 font-bold">
                        {g.currentLevel} → {g.requiredLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">{g.whyRequired}</p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-rose-800 font-semibold">{g.estimatedHours}</span>
                      <button
                        onClick={() => handleStartLearning(g.recommendedCourse)}
                        className="text-[10px] font-bold text-[#2857D9] hover:underline flex items-center gap-0.5"
                      >
                        <span>Start Course</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 2. Medium Priority Gaps */}
          <div className="bg-white border border-amber-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-amber-100">
              <span className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                Medium Priority Gaps
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                {mediumPriorityGaps.length} Skills
              </span>
            </div>

            <div className="space-y-2.5">
              {mediumPriorityGaps.length === 0 ? (
                <p className="text-xs text-emerald-700 py-3 text-center font-medium">
                  ✓ No medium gaps present.
                </p>
              ) : (
                mediumPriorityGaps.map((g) => (
                  <div key={g.skill} className="p-3 bg-amber-50/50 border border-amber-200/80 rounded-lg text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-950">{g.skill}</span>
                      <span className="text-[10px] font-mono text-amber-700 font-bold">
                        {g.currentLevel} → {g.requiredLevel}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 leading-tight">{g.whyRequired}</p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-amber-800 font-semibold">{g.estimatedHours}</span>
                      <button
                        onClick={() => handleStartLearning(g.recommendedCourse)}
                        className="text-[10px] font-bold text-[#2857D9] hover:underline flex items-center gap-0.5"
                      >
                        <span>Start Course</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 3. Fully Mastered (No Gap) */}
          <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-100">
              <span className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Mastered Skills (No Gap)
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                {masteredSkills.length} Skills
              </span>
            </div>

            <div className="space-y-2.5">
              {masteredSkills.map((g) => (
                <div key={g.skill} className="p-3 bg-emerald-50/50 border border-emerald-200/80 rounded-lg text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-emerald-950">{g.skill}</span>
                    <span className="text-[10px] font-semibold text-emerald-700">Level: {g.currentLevel}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">Meets industry benchmark requirements.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION: ACTIONABLE RECOMMENDED LEARNING PATHWAY */}
      {/* ========================================================================= */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">
              Actionable Recommended Learning Pathway
            </h3>
            <p className="text-[11px] text-[#64748B]">
              Curated government-approved courses specifically targeted to eliminate identified gaps
            </p>
          </div>
          <Link
            href="/learner/roadmap"
            className="text-xs text-[#2857D9] hover:underline font-semibold flex items-center gap-1"
          >
            <span>View Full Learning Roadmap</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matchResult.recommendedLearning.map((course, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#2857D9] transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#2857D9] tracking-wider block">
                      Targeted Skill: {course.skill}
                    </span>
                    <h4 className="text-sm font-bold text-[#0F172A] mt-0.5">
                      {course.courseTitle}
                    </h4>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                      course.priority === 'High'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {course.priority} Priority
                  </span>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed">
                  <strong className="text-slate-800">Why It Is Required:</strong> {course.whyRequired}
                </p>

                <div className="flex items-center gap-4 text-xs text-[#64748B] pt-1">
                  <span>Difficulty: <strong className="text-slate-800">{course.difficulty}</strong></span>
                  <span>Duration: <strong className="text-slate-800">{course.duration}</strong></span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold">
                  +15% Match Projection upon completion
                </span>
                <button
                  onClick={() => handleStartLearning(course.courseTitle)}
                  className="h-8 px-4 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Start Learning</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function StudentSkillGapPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading skill gap analysis...</div>}>
      <StudentSkillGapContent />
    </Suspense>
  );
}

