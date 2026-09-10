'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Award,
  Search,
  BookOpen,
  Filter,
  GraduationCap,
  Sparkles,
  Info,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  getLearner,
  getCareerRecommendations,
  CareerMatchResult,
  LearnerProfile,
} from '@/lib/sidh-store';

export default function LearnerCareersPage() {
  const [learner, setLearner] = useState<LearnerProfile | null>(null);
  const [recommendations, setRecommendations] = useState<CareerMatchResult[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedMatch, setSelectedMatch] = useState<CareerMatchResult | null>(null);

  useEffect(() => {
    const profile = getLearner();
    setLearner(profile);
    const recs = getCareerRecommendations(profile);
    setRecommendations(recs);
    if (recs.length > 0) {
      setSelectedMatch(recs[0]);
    }
  }, []);

  if (!learner) return null;

  const sectors = ['All', 'IT-ITeS & Software', 'BFSI & IT Analytics', 'Cloud & Infrastructure', 'Cybersecurity & Defense', 'Artificial Intelligence & Deep Tech'];

  const filtered = recommendations.filter((rec) => {
    const matchesSector = selectedSector === 'All' || rec.post.sector === selectedSector;
    const matchesSearch =
      rec.postName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.post.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.matchingSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      rec.missingSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Career Recommendation Engine"
        subtitle="Automated career role matching based on your live academic qualifications, verified skills, certifications, and project portfolio"
        badge="Government Skilling & Employment System"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/learner/profile"
              className="h-9 px-3.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-[#0B1B30] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>👤</span>
              <span>Edit Employability Profile</span>
            </Link>
            <Link
              href="/learner/skill-gap"
              className="h-9 px-4 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <span>⚡</span>
              <span>Deep Skill Gap Analysis</span>
            </Link>
          </div>
        }
      />

      {/* Candidate Employability Attributes Basis Card */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2857D9]" />
            <span className="text-xs font-bold text-[#0B1B30] uppercase tracking-wide">
              Profile Input Attributes Applied by Matching Engine
            </span>
          </div>
          <Link
            href="/learner/profile"
            className="text-xs text-[#2857D9] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Update Profile Data</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 text-xs">
          <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] font-bold text-[#64748B] block">Degree & Course</span>
            <span className="font-bold text-[#0F172A] truncate block mt-0.5">{learner.qualification}</span>
            <span className="text-[10px] text-slate-500">{learner.branch}</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] font-bold text-[#64748B] block">Academic CGPA</span>
            <span className="font-mono font-bold text-base text-[#2857D9] block mt-0.5">
              {learner.academicDetails?.cgpa || 8.7}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold">Eligibility Met</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] font-bold text-[#64748B] block">Skills Registered</span>
            <span className="font-mono font-bold text-base text-[#0B1B30] block mt-0.5">
              {learner.skills.length}
            </span>
            <span className="text-[10px] text-slate-500">
              {learner.skills.filter((s) => s.proficiencyLevel === 'Advanced').length} Advanced
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] font-bold text-[#64748B] block">Certifications</span>
            <span className="font-mono font-bold text-base text-[#0B1B30] block mt-0.5">
              {learner.certifications?.length || 0}
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold">Verified NCVET</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <span className="text-[10px] font-bold text-[#64748B] block">Applied Projects</span>
            <span className="font-mono font-bold text-base text-[#0B1B30] block mt-0.5">
              {learner.projects?.length || 0}
            </span>
            <span className="text-[10px] text-slate-500">Industry Capstones</span>
          </div>

          <div className="p-2.5 rounded-lg bg-[#EFF6FF] border border-blue-200">
            <span className="text-[10px] font-bold text-[#2857D9] block">Target Career Role</span>
            <span className="font-bold text-[#0B1B30] truncate block mt-0.5">{learner.targetRole}</span>
            <span className="text-[10px] text-blue-700 font-medium">Primary Benchmark</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-[#64748B] font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Sector:
          </span>
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSector === sec
                  ? 'bg-[#0B1B30] text-white shadow-xs'
                  : 'bg-white border border-[#CBD5E1] text-[#475569] hover:bg-slate-50'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search roles or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none"
          />
        </div>
      </div>

      {/* Recommended Career Posts Grid */}
      <div>
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#2857D9]" />
            <h2 className="text-sm font-bold text-[#0B1B30]">
              Recommended Career Posts ({filtered.length})
            </h2>
          </div>
          <span className="text-xs text-[#64748B]">Ranked by composite employability match score</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((rec) => {
            const isSelected = selectedMatch?.post.id === rec.post.id;
            const isTarget = learner.targetRole.toLowerCase().includes(rec.postName.toLowerCase()) ||
                             rec.postName.toLowerCase().includes(learner.targetRole.toLowerCase());

            return (
              <div
                key={rec.post.id}
                className={`bg-white border rounded-xl p-5 shadow-xs transition-all hover:border-[#2857D9] flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#2857D9] ring-2 ring-blue-100'
                    : 'border-[#CBD5E1]'
                }`}
              >
                <div>
                  {/* Top Bar: Title, Match Badge, Sector */}
                  <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-[#0B1B30] hover:text-[#2857D9] transition-colors">
                          {rec.postName}
                        </h3>
                        {isTarget && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EFF6FF] text-[#2857D9] border border-blue-200">
                            Target Role
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#64748B] block mt-0.5">
                        {rec.post.sector} • {rec.post.salaryRange} • {rec.post.openings} active openings
                      </span>
                    </div>

                    {/* Match Score Indicator */}
                    <div className="text-right shrink-0">
                      <div className="flex items-baseline justify-end gap-1">
                        <span className="text-2xl font-bold font-mono text-[#0B1B30]">
                          {rec.matchPercentage}%
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">Match</span>
                      </div>
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold mt-0.5 ${
                          rec.status === 'Strong Match'
                            ? 'bg-emerald-100 text-emerald-800'
                            : rec.status === 'Good Match'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </div>
                  </div>

                  {/* Required Qualification */}
                  <div className="py-3 text-xs border-b border-[#E2E8F0]">
                    <span className="text-[10px] uppercase font-bold text-[#64748B] block tracking-wider">
                      Required Qualification
                    </span>
                    <p className="text-xs text-[#1E293B] font-medium mt-0.5">
                      {rec.requiredQualification}
                    </p>
                  </div>

                  {/* Matching vs Missing Skills */}
                  <div className="py-3 space-y-2.5 text-xs">
                    {/* Matching Skills */}
                    <div>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="font-bold text-[11px] text-emerald-900">
                          Matching Skills ({rec.matchingSkills.length})
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {rec.matchingSkills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold"
                          >
                            ✓ {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Skills / Skills to Acquire */}
                    {rec.missingSkills.length > 0 && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="font-bold text-[11px] text-amber-900">
                            Missing Skills to Bridge ({rec.missingSkills.length})
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.missingSkills.map((sk) => (
                            <span
                              key={sk}
                              className="px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-semibold"
                            >
                              + {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                  <Link
                    href={`/learner/skill-gap?post=${rec.post.id}`}
                    className="flex-1 h-9 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>View Skill Gap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    href={`/learner/opportunities?search=${encodeURIComponent(rec.postName)}`}
                    className="h-9 px-3 rounded-lg border border-[#CBD5E1] hover:bg-slate-50 text-[#0B1B30] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Openings</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanatory Architecture Notice */}
      <div className="bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-5 text-xs text-[#475569] space-y-2">
        <div className="flex items-center gap-2 text-[#0B1B30] font-bold">
          <Info className="w-4 h-4 text-[#2857D9]" />
          <span>How the Career Recommendation Engine Calculates Match Scores</span>
        </div>
        <p className="leading-relaxed">
          The national recommendation engine applies weighted multi-attribute synthesis: 
          <strong> Technical Competencies & Proficiency Levels (75%)</strong>, 
          <strong> NCVET-Accredited Certifications (+12%)</strong>, 
          <strong> Applied Capstone Projects (+10%)</strong>, and 
          <strong> Academic CGPA Thresholds (+5%)</strong>. 
          Updating your profile with new skills, certifications, or projects automatically recalculates these scores in real time.
        </p>
      </div>
    </div>
  );
}
