'use client';

import React from 'react';
import Link from 'next/link';

interface AINextBestActionProps {
  role: 'student' | 'trainer' | 'government';
  customTitle?: string;
  customDescription?: string;
  steps?: { title: string; desc: string; link?: string; actionLabel?: string }[];
}

export const AINextBestAction: React.FC<AINextBestActionProps> = ({
  role,
  customTitle,
  customDescription,
  steps,
}) => {
  const getRoleDefaults = () => {
    switch (role) {
      case 'student':
        return {
          badge: 'AI Career Progression Engine',
          title: customTitle || 'Your Next Best Action Roadmap',
          desc:
            customDescription ||
            'Based on your target role "Full Stack Web Developer" and recent assessment performance, here is your high-impact next sequence:',
          confidence: '94% Match Probability',
          impact: '+22% Placement Readiness',
          defaultSteps: [
            { title: 'Step 1: Complete SQL Schema Assessment', desc: 'Verify relational query competency to unlock Level 6 placement pool.', link: '/learner/assessments/asm-101', actionLabel: 'Take Assessment' },
            { title: 'Step 2: Enroll in Advanced Next.js & REST Architecture', desc: 'Bridge your remaining high-priority API design gap (80 hrs).', link: '/learner/courses/crs-001', actionLabel: 'View Course' },
            { title: 'Step 3: Build Telemedicine Capstone Project', desc: 'Demonstrate full-stack database schema implementation for verified portfolio.', link: '/learner/profile', actionLabel: 'Add Project' },
            { title: 'Step 4: Apply for TCS Associate Web Developer Role', desc: 'Your profile matches 82% of hiring criteria. 45 open positions.', link: '/learner/opportunities', actionLabel: 'Apply Now' },
          ],
        };
      case 'trainer':
        return {
          badge: 'Instructional Intelligence Advisory',
          title: customTitle || 'Cohort Remediation Advisory',
          desc:
            customDescription ||
            'AI analysis of recent formative evaluations across your active cohort BATCH-2026-WD01 indicates a shared conceptual gap.',
          confidence: '91% Statistical Correlation',
          impact: '+14% Expected Exam Pass Rate',
          defaultSteps: [
            { title: '12 Candidates Flagged with Relational SQL Normalization Gap', desc: 'Formative quiz performance in Unit 4 showed 54% average accuracy in multi-table JOIN operations.', link: '/trainer/assessments', actionLabel: 'Review Quiz Rubric' },
            { title: 'Schedule Dedicated Practical Lab Remediation Session', desc: 'Recommended: Conduct a 90-minute live SQL debugging workshop before final summative exam.', link: '/trainer/schedule', actionLabel: 'Schedule Session' },
            { title: 'Dispatch Supplementary Lab Exercise Sheet', desc: 'Auto-generate 10 practice schema normalization problems for at-risk candidates.', link: '/trainer/materials', actionLabel: 'Share Exercise' },
          ],
        };
      case 'government':
        return {
          badge: 'Macro Econometric Skill Advisory',
          title: customTitle || 'Strategic Capacity Allocation Notice',
          desc:
            customDescription ||
            'Labor market demand sensors detect a severe supply-demand imbalance in Cloud Native Infrastructure & DevOps engineering.',
          confidence: '96% Econometric Confidence',
          impact: 'Mitigates ₹420 Cr Unmet Wage Demand',
          defaultSteps: [
            { title: 'Regional Training Capacity Deficit in Southern IT Corridor', desc: 'Visakhapatnam & Hyderabad industrial clusters display 42% training seat deficit vs employer postings.', link: '/government/skill-gap', actionLabel: 'Open Skill Gap Map' },
            { title: 'Reallocate Saturated Traditional Trade Quotas', desc: 'Shift 250 sanctioned seats from foundation computer literacy to cloud-native microservices.', link: '/government/schemes', actionLabel: 'Reallocate Quota' },
            { title: 'Empanel AWS / Red Hat Cloud Centers of Excellence (CoE)', desc: 'Accelerate ToT Level 6 instructor accreditation workshops across state polytechnics.', link: '/government/trainers/create', actionLabel: 'Issue ToT License' },
          ],
        };
    }
  };

  const config = getRoleDefaults();
  const activeSteps = steps || config.defaultSteps;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-[#0B192C] to-[#1E1B4B] rounded-xl border border-indigo-900/60 p-5 text-white shadow-md relative overflow-hidden space-y-4">
      {/* Subtle Background Glow */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-md bg-indigo-500/30 flex items-center justify-center text-sm border border-indigo-400/30">
            ⚡
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-300 block">
              {config.badge}
            </span>
            <h3 className="font-bold text-sm text-white">{config.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
            {config.confidence}
          </span>
          <span className="text-[11px] font-semibold text-indigo-200 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
            {config.impact}
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-300 leading-relaxed relative z-10">{config.desc}</p>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10 pt-1">
        {activeSteps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white/5 hover:bg-white/10 rounded-lg p-3.5 border border-white/10 transition-colors flex flex-col justify-between space-y-2"
          >
            <div>
              <span className="text-[10px] font-mono uppercase text-indigo-300 block">Step 0{idx + 1}</span>
              <h4 className="font-semibold text-xs text-white mt-0.5 leading-snug">{step.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">{step.desc}</p>
            </div>

            {step.link && (
              <Link
                href={step.link}
                className="inline-flex items-center justify-between text-xs font-semibold text-indigo-300 hover:text-white pt-1 border-t border-white/10 group"
              >
                <span>{step.actionLabel || 'Execute Action'}</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
