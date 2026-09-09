'use client';

import React, { useState, useEffect } from 'react';
import { MetricCard } from '@/components/outcome-intelligence/MetricCard';
import { StatusBadge } from '@/components/outcome-intelligence/StatusBadge';
import { Award, Briefcase, Target, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function LearnerCockpitPage() {
  const [skillGap, setSkillGap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadLearnerData() {
      try {
        // Pick first learner for demo cockpit
        const res = await fetch('/api/outcome-intelligence/skill-gap?learnerId=learner-1');
        const json = await res.json();
        if (json.success) setSkillGap(json.data);
      } catch (err) {
        console.error('Failed to load learner data', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadLearnerData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="border-b border-[#D1D9E2] pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-[#102A43]">Learner Outcome & Career Cockpit</h1>
          <span className="bg-[#0B3B60] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            Candidate Portal
          </span>
        </div>
        <p className="text-xs text-[#627D98] mt-1">
          Welcome, {skillGap?.learnerName || 'Rahul Sharma'}. Track your verified credentials, target role compatibility, and career progression.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Skill Match Score"
          value={isLoading ? '...' : `${skillGap?.matchPercentage || 75}%`}
          subtitle={`Target: ${skillGap?.targetJob || 'Software Engineer'}`}
          icon={Target}
          trendPositive={true}
        />
        <MetricCard
          title="Competency Tier"
          value={isLoading ? '...' : skillGap?.matchTier || 'Moderate'}
          subtitle="Evaluated against market vacancy"
          icon={Award}
        />
        <MetricCard
          title="Evaluated Skills"
          value={isLoading ? '...' : skillGap?.evaluatedSkillsCount || 4}
          subtitle={`${skillGap?.satisfiedSkillsCount || 3} requirements satisfied`}
          icon={Briefcase}
        />
        <MetricCard
          title="Missing Skill Gaps"
          value={isLoading ? '...' : skillGap?.missingSkillsCount || 1}
          subtitle="Actionable remediation modules"
          icon={TrendingUp}
        />
      </div>

      {/* Actionable Upskilling Sprints */}
      {skillGap?.missingSkills && skillGap.missingSkills.length > 0 && (
        <div className="bg-white border border-[#D1D9E2] rounded-md p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div>
              <h3 className="text-sm font-bold text-[#102A43]">Targeted Competency Remediation</h3>
              <p className="text-xs text-[#627D98] mt-0.5">
                Deterministic skill gaps prioritized to achieve 90%+ match with industry vacancies
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {skillGap.missingSkills.map((gap: any, idx: number) => (
              <div
                key={idx}
                className="p-3.5 bg-[#F8FAFC] border border-[#CBD5E1] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#102A43]">{gap.skillName}</span>
                    <StatusBadge status={gap.gapSeverity} />
                    <span className="text-[#627D98]">Priority Score: {gap.priorityScore}</span>
                  </div>
                  <p className="text-[#627D98] mt-1">{gap.recommendedModule}</p>
                </div>

                <button className="h-8 px-4 rounded bg-[#0B3B60] text-white font-semibold text-xs shrink-0 self-start sm:self-auto hover:bg-[#002541] transition-colors">
                  Start Bridge Module
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/outcome-intelligence/outcomes"
          className="bg-white border border-[#D1D9E2] rounded-md p-5 hover:border-[#0B3B60] transition-colors flex items-center justify-between group"
        >
          <div>
            <div className="font-bold text-sm text-[#102A43]">View Outcome Timeline</div>
            <div className="text-xs text-[#627D98] mt-0.5">Track wage employment verifications and surveys</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#0B3B60] group-hover:translate-x-1 transition-transform" />
        </Link>

        <Link
          href="/outcome-intelligence/insights"
          className="bg-white border border-[#D1D9E2] rounded-md p-5 hover:border-[#0B3B60] transition-colors flex items-center justify-between group"
        >
          <div>
            <div className="font-bold text-sm text-[#102A43]">Career Diagnostics</div>
            <div className="text-xs text-[#627D98] mt-0.5">Explainable risk attribution and coaching suggestions</div>
          </div>
          <ArrowRight className="w-4 h-4 text-[#0B3B60] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
