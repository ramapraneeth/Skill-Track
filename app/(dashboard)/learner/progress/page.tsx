'use client';

import React from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { KPICard } from '@/components/ui/KPICard';
import { ProgressBar } from '@/components/ui/ProgressBar';

export default function LearnerProgressPage() {
  const weeklyHours = [
    { day: 'Mon', hours: 4.5 },
    { day: 'Tue', hours: 5.0 },
    { day: 'Wed', hours: 3.5 },
    { day: 'Thu', hours: 6.0 },
    { day: 'Fri', hours: 4.0 },
    { day: 'Sat', hours: 2.0 },
    { day: 'Sun', hours: 0.0 },
  ];

  const skillProgress = [
    { skill: 'Frontend Web Development (React / Next)', level: 'Advanced', progress: 85 },
    { skill: 'JavaScript / TypeScript', level: 'Advanced', progress: 90 },
    { skill: 'State Management & Store Systems', level: 'Intermediate', progress: 70 },
    { skill: 'Database Systems & SQL', level: 'Beginner', progress: 40 },
    { skill: 'AI & Data Integration Foundations', level: 'Intermediate', progress: 65 },
  ];

  const milestones = [
    { date: '15 Aug 2026', title: 'NSQF Level 5 Assessment Passed', desc: 'Scored 84% in Web Application Development (PMKVY-4.0)', icon: '🏆' },
    { date: '01 Aug 2026', title: 'Full Stack Batch Mid-Term Cleared', desc: 'Practical lab examination verified by accredited trainer', icon: '📝' },
    { date: '10 Jul 2026', title: 'AEBAS Biometric Attendance Benchmark', desc: 'Maintained 90%+ physical attendance across 30 consecutive sessions', icon: '⏱️' },
    { date: '15 May 2026', title: 'Enrollment in Web Development Batch', desc: 'Registered under PMKVY 4.0 at NSTI Ramanthapur', icon: '🎓' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Learning Progress & Analytics"
        subtitle="Track your classroom hours, biometric attendance logs, assessment scores, and skill progression"
        breadcrumbs={[
          { label: 'Portal', href: '/learner/dashboard' },
          { label: 'Progress & Analytics' },
        ]}
      />

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Total Hours Completed"
          value="142 / 200"
          subtitle="71% of curriculum hours"
          icon="⏱️"
          trend={{ value: "+18 hrs this week", isPositive: true }}
          highlightColor="#0B3B60"
        />
        <KPICard
          title="Biometric Attendance"
          value="92.4%"
          subtitle="AEBAS verified classroom rate"
          icon="📊"
          trend={{ value: "Above 80% cutoff", isPositive: true }}
          highlightColor="#10b981"
        />
        <KPICard
          title="Competencies Cleared"
          value="14 NOS"
          subtitle="National Occupational Standards"
          icon="🎯"
          trend={{ value: "3 pending evaluation", isPositive: true }}
          highlightColor="#6366f1"
        />
        <KPICard
          title="Average Score"
          value="84.2%"
          subtitle="Across 3 module assessments"
          icon="⭐"
          trend={{ value: "+6% from diagnostic", isPositive: true }}
          highlightColor="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Hours Bar Chart */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-slate-800">Weekly Learning Activity (Hours)</h3>
            <span className="text-xs text-slate-500 font-medium">Total: 25 hrs this week</span>
          </div>

          <div className="pt-6 pb-2 flex items-end justify-between h-44 px-4 border-b border-slate-100">
            {weeklyHours.map((item) => {
              const heightPercent = (item.hours / 8.0) * 100;
              return (
                <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-semibold text-slate-600">{item.hours}h</span>
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-8 rounded-t bg-[#0B3B60] hover:bg-blue-800 transition-all"
                  />
                  <span className="text-xs font-medium text-slate-500">{item.day}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500">
            Attendance synchronized with NSTI Hyderabad biometric punch system. Daily requirement: 4 hrs.
          </p>
        </div>

        {/* Skill Mastery Progression */}
        <div className="lg:col-span-6 bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-slate-800">Skill Competency Mastery</h3>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              NSQF Aligned
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {skillProgress.map((sk) => (
              <div key={sk.skill} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-800">{sk.skill}</span>
                  <span className="font-bold text-[#0B3B60]">{sk.progress}%</span>
                </div>
                <ProgressBar value={sk.progress} max={100} color="#0B3B60" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones & Timeline */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
        <h3 className="font-semibold text-sm text-slate-800 mb-4">Milestones & Credential History</h3>
        <div className="space-y-4">
          {milestones.map((ms, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-base shrink-0">
                {ms.icon}
              </div>
              <div className="flex-1 border-b border-slate-100 pb-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{ms.title}</h4>
                  <span className="text-[11px] text-slate-500 font-medium">{ms.date}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
