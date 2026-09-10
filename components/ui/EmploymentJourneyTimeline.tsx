'use client';

import React, { useState } from 'react';

export interface JourneyStep {
  id: string;
  title: string;
  stage: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  details: string;
  institution?: string;
}

const DEFAULT_STEPS: JourneyStep[] = [
  { id: '1', title: 'Formal Education', stage: 'Education', status: 'completed', date: 'Graduated 2025', details: 'B.Tech Computer Science & Engineering, Andhra University', institution: 'AU College of Engineering' },
  { id: '2', title: 'Diagnostic Benchmark', stage: 'Skill Assessment', status: 'completed', date: '10 Jan 2026', details: 'Baseline assessment scored 74% across Core Web & Logic', institution: 'SkillBridge Diagnostic Engine' },
  { id: '3', title: 'AI Gap Identification', stage: 'Skill Gap', status: 'completed', date: '12 Jan 2026', details: 'Flagged 3 missing industry skills: React Hooks, SQL Schema, API Security', institution: 'AI Skill Matrix' },
  { id: '4', title: 'Course Recommendation', stage: 'Recommended Course', status: 'completed', date: '14 Jan 2026', details: 'Recommended Full Stack Web Development (Impact Score: 89/100)', institution: 'SkillBridge Recommendation Engine' },
  { id: '5', title: 'Hands-on Training', stage: 'Training', status: 'completed', date: 'Jan - Apr 2026', details: '240 Hours practical lab sessions with 92.4% AEBAS attendance', institution: 'NSTI Hyderabad' },
  { id: '6', title: 'Summative Evaluation', stage: 'Assessment', status: 'completed', date: '15 Apr 2026', details: 'Cleared practical examination with 84% marks', institution: 'IT-ITeS SSC External Assessor' },
  { id: '7', title: 'NSQF Level 6 Credential', stage: 'Certification', status: 'completed', date: '20 Apr 2026', details: 'Cryptographically signed credential pushed to DigiLocker NAD', institution: 'NCVET / Skill India' },
  { id: '8', title: 'NAPS Apprenticeship', stage: 'Internship', status: 'completed', date: 'May - Jul 2026', details: '3 Months on-the-job apprenticeship with DBT stipend allowance', institution: 'Infosys BPM' },
  { id: '9', title: 'Industry Placement', stage: 'Placement', status: 'current', date: 'Active Phase', details: 'Interview cleared with TCS for Associate Web Application Developer', institution: 'Campus Placement Cell' },
  { id: '10', title: 'Formal Employment', stage: 'Employment', status: 'upcoming', date: 'Target: Oct 2026', details: 'EPFO UAN account onboarding & verified formal wage disbursal', institution: 'Tata Consultancy Services' },
  { id: '11', title: 'Continuous Career Growth', stage: 'Career Growth', status: 'upcoming', date: 'Longitudinal', details: 'Periodic micro-credential upskilling in Cloud Native & AI Systems', institution: 'SkillBridge Longitudinal Tracker' },
];

export const EmploymentJourneyTimeline: React.FC<{ steps?: JourneyStep[] }> = ({ steps = DEFAULT_STEPS }) => {
  const [activeStep, setActiveStep] = useState<JourneyStep>(steps.find((s) => s.status === 'current') || steps[0]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base">🚀</span>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              Individual Skill & Employment Outcome Journey
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
            End-to-end longitudinal progression tracking from classroom enrollment to verified industry placement
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-50 dark:bg-blue-950/60 text-[#1D4ED8] dark:text-blue-300 border border-blue-200 dark:border-blue-900 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] animate-pulse" />
          Stage 9: Placement Ready
        </span>
      </div>

      {/* Horizontal Scrollable Timeline Bar */}
      <div className="overflow-x-auto pb-3 pt-1">
        <div className="flex items-center min-w-[760px] relative px-2">
          {/* Connector Line */}
          <div className="absolute left-6 right-6 top-3.5 h-0.5 bg-slate-200 dark:bg-slate-800 -z-0" />

          {steps.map((step, idx) => {
            const isSelected = activeStep.id === step.id;
            const isCompleted = step.status === 'completed';
            const isCurrent = step.status === 'current';

            return (
              <div
                key={step.id}
                onClick={() => setActiveStep(step)}
                className="flex-1 flex flex-col items-center cursor-pointer group relative z-10"
              >
                {/* Node Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all shadow-xs ${
                    isCompleted
                      ? 'bg-emerald-600 text-white border-2 border-white dark:border-slate-900 ring-2 ring-emerald-200 dark:ring-emerald-950'
                      : isCurrent
                      ? 'bg-[#1D4ED8] text-white border-2 border-white dark:border-slate-900 ring-4 ring-blue-100 dark:ring-blue-950 animate-pulse'
                      : 'bg-white dark:bg-slate-800 text-slate-400 border-2 border-slate-300 dark:border-slate-700'
                  } ${isSelected ? 'scale-110 ring-4 ring-violet-300 dark:ring-violet-900' : ''}`}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>

                {/* Step Label */}
                <span
                  className={`text-[10px] text-center font-medium mt-1.5 line-clamp-1 max-w-[70px] transition-colors ${
                    isSelected
                      ? 'font-bold text-[#1D4ED8] dark:text-blue-400'
                      : isCompleted
                      ? 'text-slate-800 dark:text-slate-300'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {step.stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Detail Panel */}
      <div className="bg-slate-50 dark:bg-slate-950/70 rounded-lg p-4 border border-slate-200 dark:border-slate-800 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Step {activeStep.id}: {activeStep.title}
            </span>
            <span
              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                activeStep.status === 'completed'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : activeStep.status === 'current'
                  ? 'bg-blue-100 text-[#1D4ED8] dark:bg-blue-950 dark:text-blue-300'
                  : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
              }`}
            >
              {activeStep.status}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">{activeStep.details}</p>
          {activeStep.institution && (
            <p className="text-[11px] text-slate-500 dark:text-slate-500">
              Verified Authority / Partner: <strong>{activeStep.institution}</strong>
            </p>
          )}
        </div>

        {activeStep.date && (
          <div className="text-right shrink-0 bg-white dark:bg-slate-900 px-3 py-1.5 rounded border border-slate-200 dark:border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Timeline</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">{activeStep.date}</span>
          </div>
        )}
      </div>
    </div>
  );
};
