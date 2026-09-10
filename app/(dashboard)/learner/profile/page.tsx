'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Clock,
  Edit3,
  X,
  Target,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { sidhStore, saveLearner, LearnerProfile, StudentSkill } from '@/lib/sidh-store';

export default function LearnerProfilePage() {
  const [learner, setLearner] = useState<LearnerProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    targetRole: '',
    qualification: '',
    institution: '',
    state: '',
    district: '',
    email: '',
    mobile: '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    const data = sidhStore.getLearner();
    if (data) {
      setLearner(data);
      setEditForm({
        name: data.name || '',
        targetRole: data.targetRole || 'Full Stack Web Developer',
        qualification: data.qualification || 'B.Tech Computer Science & Engineering',
        institution: data.institution || 'National Skill Training Institute (NSTI), Hyderabad',
        state: data.state || 'Telangana',
        district: data.district || 'Hyderabad',
        email: data.email || 'arjun.patel@student.gov.in',
        mobile: data.mobile || '+91 98765 43210',
      });
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!learner) return;

    const updated: LearnerProfile = {
      ...learner,
      name: editForm.name,
      targetRole: editForm.targetRole,
      qualification: editForm.qualification,
      institution: editForm.institution,
      state: editForm.state,
      district: editForm.district,
      email: editForm.email,
      mobile: editForm.mobile,
    };

    saveLearner(updated);
    setLearner(updated);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const skills: StudentSkill[] = learner?.skills && learner.skills.length > 0 ? learner.skills : [
    { name: 'JavaScript & TypeScript', category: 'Programming Languages', proficiencyLevel: 'Advanced', proficiency: 90, verified: true },
    { name: 'React.js & Modern UI', category: 'Technical Skills', proficiencyLevel: 'Advanced', proficiency: 85, verified: true },
    { name: 'Node.js & Express APIs', category: 'Technical Skills', proficiencyLevel: 'Intermediate', proficiency: 65, verified: true },
    { name: 'Relational Databases & SQL', category: 'Tools and Technologies', proficiencyLevel: 'Intermediate', proficiency: 60, verified: true },
    { name: 'Cloud Architecture & DevOps', category: 'Tools and Technologies', proficiencyLevel: 'Beginner', proficiency: 40, verified: false },
    { name: 'Algorithmic Problem Solving', category: 'Technical Skills', proficiencyLevel: 'Intermediate', proficiency: 75, verified: true },
  ];

  const skillGaps = [
    {
      skill: 'Cloud Architecture & DevOps',
      current: 'Beginner',
      target: 'Intermediate',
      gapSeverity: 'High Skill Gap',
      severityColor: 'bg-rose-50 text-rose-700 border-rose-200',
      recommendedCourse: 'Cloud Infrastructure & DevOps Engineering',
      courseId: 'crs-002',
    },
    {
      skill: 'Node.js & Express APIs',
      current: 'Intermediate',
      target: 'Advanced',
      gapSeverity: 'Moderate Skill Gap',
      severityColor: 'bg-amber-50 text-amber-700 border-amber-200',
      recommendedCourse: 'Full Stack Web & Application Development',
      courseId: 'crs-001',
    },
    {
      skill: 'Relational Databases & SQL',
      current: 'Intermediate',
      target: 'Advanced',
      gapSeverity: 'Moderate Skill Gap',
      severityColor: 'bg-amber-50 text-amber-700 border-amber-200',
      recommendedCourse: 'Relational Database Architecture & SQL Analytics',
      courseId: 'crs-003',
    },
  ];

  const certificates = sidhStore.getCertificates();

  return (
    <div className="space-y-8">
      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile updated successfully in your Digital Skill Passport.</span>
        </div>
      )}

      {/* 1. PROFILE HEADER: Digital Skill Passport Anchor */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-blue-700 text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-xs shrink-0">
              {learner?.name ? learner.name.slice(0, 2).toUpperCase() : 'AP'}
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {learner?.name || 'Arjun Patel'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  UIDAI Verified
                </span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {learner?.studentId || 'ST-2024-8841'}
                </span>
              </div>

              <p className="text-xs sm:text-sm font-medium text-blue-700">
                {learner?.targetRole || 'Aspiring Full Stack Web Developer'}
              </p>

              <p className="text-xs text-slate-500">
                {learner?.state || 'Telangana'}, India • APAAR ID: 2024-AP-8841
              </p>
            </div>
          </div>

          {/* Right side: Profile Completion & Edit CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
            <div className="space-y-1.5 w-full sm:w-44">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Profile Completion</span>
                <span className="text-blue-700">85%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-700 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. PROFILE OVERVIEW: Clean Information Blocks */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
          Profile Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-slate-400 font-medium block">Career Goal</span>
            <strong className="text-slate-800 text-sm block">
              {learner?.targetRole || 'Full Stack Web Developer'}
            </strong>
            <span className="text-slate-500">Target Level: NSQF Level 6</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium block">Academic Qualification</span>
            <strong className="text-slate-800 text-sm block">
              {learner?.qualification || 'B.Tech Computer Science'}
            </strong>
            <span className="text-slate-500">{learner?.institution || 'NSTI Hyderabad'}</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium block">Preferred Domain</span>
            <strong className="text-slate-800 text-sm block">
              IT & Software Development
            </strong>
            <span className="text-slate-500">Web & Cloud Engineering</span>
          </div>

          <div className="space-y-1">
            <span className="text-slate-400 font-medium block">Learning Preferences</span>
            <strong className="text-slate-800 text-sm block">
              Practical / Hybrid Labs
            </strong>
            <span className="text-slate-500">Self-Paced & Proctored Tests</span>
          </div>
        </div>
      </div>

      {/* 3. SIGNATURE UI: Personalized Skill Development Pathway */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Personalized Skill Development Pathway
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              How your learning actions directly translate into verified competence on Skill Track.
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
            Active Journey
          </span>
        </div>

        {/* Horizontal Pipeline on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 pt-2">
          {[
            { step: '1', title: 'Current Skills', desc: 'Identified & logged' },
            { step: '2', title: 'Skill Gap', desc: 'Benchmark evaluated' },
            { step: '3', title: 'Recommended Course', desc: 'Accredited curriculum' },
            { step: '4', title: 'Learning Progress', desc: 'Practical modules' },
            { step: '5', title: 'Assessment', desc: 'Proctored test' },
            { step: '6', title: 'Improved Skill', desc: 'Verified level' },
            { step: '7', title: 'Certificate', desc: 'Digital credential' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 flex flex-col justify-between text-xs space-y-2 relative"
            >
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center">
                  {item.step}
                </span>
                {idx < 6 && (
                  <span className="hidden md:block text-slate-300 font-bold text-xs">→</span>
                )}
              </div>
              <div>
                <strong className="text-slate-800 text-[11px] block leading-tight">
                  {item.title}
                </strong>
                <span className="text-[10px] text-slate-500">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. TWO-COLUMN SECTION: My Skills & Skill Gap Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: My Skills Profile (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              My Skill Profile
            </h2>
            <Link
              href="/learner/skills"
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              View Full Inventory →
            </Link>
          </div>

          <div className="space-y-3.5">
            {skills.map((skill, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-slate-50/30 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{skill.name}</span>
                    {skill.verified && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-slate-500">
                      {skill.proficiencyLevel || 'Intermediate'}
                    </span>
                    <strong className="text-slate-800 font-mono text-xs">
                      {skill.proficiency || 70}%
                    </strong>
                  </div>
                </div>

                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${
                      (skill.proficiency || 70) >= 80
                        ? 'bg-emerald-600'
                        : (skill.proficiency || 70) >= 60
                        ? 'bg-blue-600'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${skill.proficiency || 70}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Skill Gap Analysis - Where You Can Improve (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Where You Can Improve
              </h2>
              <p className="text-xs text-slate-500">Target Role: Full Stack Developer</p>
            </div>
          </div>

          <div className="space-y-3">
            {skillGaps.map((gap, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-2 text-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900">{gap.skill}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${gap.severityColor}`}>
                    {gap.gapSeverity}
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 flex items-center gap-1.5 font-medium">
                  <span>Current: <strong>{gap.current}</strong></span>
                  <span>→</span>
                  <span>Target: <strong className="text-blue-700">{gap.target}</strong></span>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 line-clamp-1 max-w-[170px]">
                    Rec: {gap.recommendedCourse}
                  </span>
                  <Link
                    href={`/learner/courses/${gap.courseId}`}
                    className="text-xs font-semibold text-blue-700 hover:underline flex items-center gap-0.5 shrink-0"
                  >
                    <span>Learn Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. METRICS & PROGRESS SUMMARY */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
            Career Readiness
          </span>
          <div className="text-2xl font-bold text-blue-700 mt-1">78%</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Benchmark for entry roles</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
            Courses In Progress
          </span>
          <div className="text-2xl font-bold text-slate-900 mt-1">2 Courses</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Average completion 68%</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
            Verified Assessments
          </span>
          <div className="text-2xl font-bold text-emerald-600 mt-1">3 Tests Cleared</div>
          <p className="text-[11px] text-slate-500 mt-0.5">Average score 84%</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider block">
            Verified Certificates
          </span>
          <div className="text-2xl font-bold text-indigo-700 mt-1">{certificates.length} Issued</div>
          <p className="text-[11px] text-slate-500 mt-0.5">NSQF accredited credentials</p>
        </div>
      </div>

      {/* 6. VERIFIED CREDENTIALS & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left: Verified Certificates (7 cols) */}
        <div className="md:col-span-7 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">
              Verified Certificates & Qualifications
            </h2>
            <Link
              href="/learner/certificates"
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              View All ({certificates.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/40 flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      NSQF Level {cert.nsqfLevel || 5}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 font-mono">
                      ID: {cert.credentialId}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900">{cert.title}</h3>
                  <p className="text-[11px] text-slate-500">{cert.issuingAuthority}</p>
                </div>

                <Link
                  href="/learner/certificates"
                  className="px-3 py-1.5 rounded bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs shrink-0"
                >
                  Verify
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Recent Activity Timeline (5 cols) */}
        <div className="md:col-span-5 bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-slate-900">
            Recent Learning Activity
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <p className="font-semibold text-slate-900">Cleared Algorithmic Benchmark</p>
                <p className="text-[11px] text-slate-500">Scored 88% on proctored diagnostic • 2 days ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ●
              </div>
              <div>
                <p className="font-semibold text-slate-900">Completed React Component State Lab</p>
                <p className="text-[11px] text-slate-500">Module 2 marked complete • 4 days ago</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ★
              </div>
              <div>
                <p className="font-semibold text-slate-900">Enrolled in Full Stack Pathway</p>
                <p className="text-[11px] text-slate-500">WD-NSQF-5 batch assigned • 1 week ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 shadow-xl overflow-hidden animate-in fade-in">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">Edit Skill Passport Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">Target Career Role</label>
                <input
                  type="text"
                  value={editForm.targetRole}
                  onChange={(e) => setEditForm({ ...editForm, targetRole: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">State</label>
                  <input
                    type="text"
                    value={editForm.state}
                    onChange={(e) => setEditForm({ ...editForm, state: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-semibold text-slate-700">District</label>
                  <input
                    type="text"
                    value={editForm.district}
                    onChange={(e) => setEditForm({ ...editForm, district: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">Academic Qualification</label>
                <input
                  type="text"
                  value={editForm.qualification}
                  onChange={(e) => setEditForm({ ...editForm, qualification: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-semibold text-slate-700">Institution / Training Center</label>
                <input
                  type="text"
                  value={editForm.institution}
                  onChange={(e) => setEditForm({ ...editForm, institution: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
