'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  User,
  GraduationCap,
  Award,
  FolderGit2,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Code2,
  Briefcase,
  AlertCircle,
  FileCheck2,
} from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  getLearner,
  saveLearner,
  LearnerProfile,
  calculateProfileCompletion,
  SkillProficiencyLevel,
  SkillCategory,
  StudentSkill,
  StudentCertification,
  StudentProject,
} from '@/lib/sidh-store';
import {
  STREAMS_REGISTRY,
  getAllStreams,
  getStreamByCode,
  resolveLearnerCareerContext,
  findCareerByTitle,
  StreamDef,
  CareerProfileDef,
} from '@/lib/career-registry';

type TabType = 'basic' | 'academics' | 'skills' | 'certifications' | 'projects';

function LearnerProfileContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get('tab') as TabType) || 'basic';

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [learner, setLearner] = useState<LearnerProfile | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  // New item modal/inline form states
  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: SkillCategory;
    proficiencyLevel: SkillProficiencyLevel;
  }>({
    name: '',
    category: 'Technical Skills',
    proficiencyLevel: 'Intermediate',
  });
  const [showSkillForm, setShowSkillForm] = useState(false);

  const [newCert, setNewCert] = useState<{
    name: string;
    issuingOrg: string;
    completionDate: string;
    credentialId: string;
    relatedSkills: string;
  }>({
    name: '',
    issuingOrg: '',
    completionDate: '',
    credentialId: '',
    relatedSkills: '',
  });
  const [showCertForm, setShowCertForm] = useState(false);

  const [newProject, setNewProject] = useState<{
    title: string;
    description: string;
    technologiesUsed: string;
    studentRole: string;
    projectOutcome: string;
    skillsDemonstrated: string;
    link: string;
  }>({
    title: '',
    description: '',
    technologiesUsed: '',
    studentRole: '',
    projectOutcome: '',
    skillsDemonstrated: '',
    link: '',
  });
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Subject & Achievement input states
  const [newSubject, setNewSubject] = useState('');
  const [newAchievement, setNewAchievement] = useState('');

  useEffect(() => {
    setLearner(getLearner());
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get('tab') as TabType;
    if (tabParam && ['basic', 'academics', 'skills', 'certifications', 'projects'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  if (!learner) return null;

  const completion = calculateProfileCompletion(learner);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!learner) return;
    saveLearner(learner);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 5000);
  };

  const context = learner ? resolveLearnerCareerContext(learner) : null;
  const currentStream = context ? context.stream : STREAMS_REGISTRY[0];
  const currentQual = currentStream.qualifications[0];
  const currentSpec =
    currentQual.specializations.find(
      (sp) => sp.name.toLowerCase() === (learner?.specialization || '').toLowerCase()
    ) || currentQual.specializations[0];
  const currentCareer =
    currentSpec.careers.find(
      (cr) => cr.title.toLowerCase() === (learner?.targetRole || '').toLowerCase()
    ) || currentSpec.careers[0];

  const handleStreamChange = (streamCode: string) => {
    if (!learner) return;
    const stream = getStreamByCode(streamCode) || STREAMS_REGISTRY[0];
    const qual = stream.qualifications[0];
    const spec = qual.specializations[0];
    const career = spec.careers[0];

    const updated: LearnerProfile = {
      ...learner,
      branch: stream.name,
      course: qual.name,
      qualification: qual.name,
      specialization: spec.name,
      targetRole: career.title,
    };
    setLearner(updated);
    saveLearner(updated);
  };

  const handleSpecializationChange = (specName: string) => {
    if (!learner) return;
    const spec = currentQual.specializations.find((sp) => sp.name === specName) || currentQual.specializations[0];
    const career = spec.careers[0];

    const updated: LearnerProfile = {
      ...learner,
      specialization: spec.name,
      targetRole: career.title,
    };
    setLearner(updated);
    saveLearner(updated);
  };

  const handleCareerChange = (careerTitle: string) => {
    if (!learner) return;
    const updated: LearnerProfile = {
      ...learner,
      targetRole: careerTitle,
    };
    setLearner(updated);
    saveLearner(updated);
  };

  const handleSyncDomainPortfolio = () => {
    if (!learner || !currentCareer) return;

    const newSkills: StudentSkill[] = currentCareer.requiredSkills.map((req, idx) => ({
      name: req.skill,
      category:
        req.category === 'Core Technical' || req.category === 'Tools & Software'
          ? 'Technical Skills'
          : 'Other Skills',
      proficiencyLevel: idx < 2 ? 'Advanced' : idx < 4 ? 'Intermediate' : 'Beginner',
      proficiency: idx < 2 ? 88 : idx < 4 ? 72 : 55,
      verified: idx < 3,
    }));

    const newProjects: StudentProject[] = currentCareer.projects.map((p) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      technologiesUsed: p.technologiesUsed,
      technologies: p.technologiesUsed,
      skills: p.technologiesUsed,
      studentRole: p.role,
      role: p.role,
      projectOutcome: p.outcome,
      outcome: p.outcome,
      skillsDemonstrated: p.technologiesUsed,
    }));

    const newCerts: StudentCertification[] = currentCareer.certifications.map((c) => ({
      id: c.id,
      name: c.title,
      title: c.title,
      issuingOrg: c.issuingOrg,
      issuer: c.issuingOrg,
      completionDate: 'Jan 2025',
      date: 'Jan 2025',
      credentialId: `SKB-${c.id.toUpperCase()}-2026`,
      verifyId: `SKB-${c.id.toUpperCase()}-2026`,
      relatedSkills: c.skills,
      status: 'Verified',
    }));

    const updated: LearnerProfile = {
      ...learner,
      skills: newSkills,
      projects: newProjects,
      certifications: newCerts,
    };
    setLearner(updated);
    saveLearner(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 5000);
  };

  // Add Skill
  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim() || !learner) return;

    const proficiencyMap: Record<SkillProficiencyLevel, number> = {
      Beginner: 45,
      Intermediate: 75,
      Advanced: 95,
    };

    const added: StudentSkill = {
      name: newSkill.name.trim(),
      category: newSkill.category,
      proficiencyLevel: newSkill.proficiencyLevel,
      proficiency: proficiencyMap[newSkill.proficiencyLevel],
      verified: true,
    };

    const updated = {
      ...learner,
      skills: [...learner.skills.filter((s) => s.name.toLowerCase() !== added.name.toLowerCase()), added],
    };

    setLearner(updated);
    saveLearner(updated);
    setNewSkill({ name: '', category: 'Technical Skills', proficiencyLevel: 'Intermediate' });
    setShowSkillForm(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  // Delete Skill
  const handleDeleteSkill = (skillName: string) => {
    if (!learner) return;
    const updated = {
      ...learner,
      skills: learner.skills.filter((s) => s.name !== skillName),
    };
    setLearner(updated);
    saveLearner(updated);
  };

  // Add Certification
  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.name.trim() || !learner) return;

    const added: StudentCertification = {
      id: `cert-${Date.now()}`,
      name: newCert.name.trim(),
      title: newCert.name.trim(),
      issuingOrg: newCert.issuingOrg.trim() || 'Accredited Institution',
      issuer: newCert.issuingOrg.trim() || 'Accredited Institution',
      completionDate: newCert.completionDate.trim() || '2025',
      date: newCert.completionDate.trim() || '2025',
      credentialId: newCert.credentialId.trim() || `ID-${Math.floor(1000 + Math.random() * 9000)}`,
      verifyId: newCert.credentialId.trim() || `ID-${Math.floor(1000 + Math.random() * 9000)}`,
      relatedSkills: newCert.relatedSkills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      status: 'Verified',
    };

    const updated = {
      ...learner,
      certifications: [...(learner.certifications || []), added],
    };

    setLearner(updated);
    saveLearner(updated);
    setNewCert({ name: '', issuingOrg: '', completionDate: '', credentialId: '', relatedSkills: '' });
    setShowCertForm(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  // Delete Certification
  const handleDeleteCert = (id: string) => {
    if (!learner) return;
    const updated = {
      ...learner,
      certifications: (learner.certifications || []).filter((c) => c.id !== id),
    };
    setLearner(updated);
    saveLearner(updated);
  };

  // Add Project
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title.trim() || !learner) return;

    const techList = newProject.technologiesUsed
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const demonstratedList = newProject.skillsDemonstrated
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const added: StudentProject = {
      id: `prj-${Date.now()}`,
      title: newProject.title.trim(),
      description: newProject.description.trim(),
      technologiesUsed: techList,
      technologies: techList,
      skills: techList,
      studentRole: newProject.studentRole.trim() || 'Lead Developer',
      role: newProject.studentRole.trim() || 'Lead Developer',
      projectOutcome: newProject.projectOutcome.trim() || 'Successfully developed and deployed working prototype.',
      outcome: newProject.projectOutcome.trim() || 'Successfully developed and deployed working prototype.',
      skillsDemonstrated: demonstratedList.length > 0 ? demonstratedList : techList,
      link: newProject.link.trim() || undefined,
    };

    const updated = {
      ...learner,
      projects: [...(learner.projects || []), added],
    };

    setLearner(updated);
    saveLearner(updated);
    setNewProject({
      title: '',
      description: '',
      technologiesUsed: '',
      studentRole: '',
      projectOutcome: '',
      skillsDemonstrated: '',
      link: '',
    });
    setShowProjectForm(false);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 4000);
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    if (!learner) return;
    const updated = {
      ...learner,
      projects: (learner.projects || []).filter((p) => p.id !== id),
    };
    setLearner(updated);
    saveLearner(updated);
  };

  // Add Subject
  const handleAddSubject = () => {
    if (!newSubject.trim() || !learner) return;
    const updated = {
      ...learner,
      academicDetails: {
        ...learner.academicDetails,
        relevantSubjects: [...(learner.academicDetails.relevantSubjects || []), newSubject.trim()],
      },
    };
    setLearner(updated);
    saveLearner(updated);
    setNewSubject('');
  };

  // Remove Subject
  const handleRemoveSubject = (idx: number) => {
    if (!learner) return;
    const updated = {
      ...learner,
      academicDetails: {
        ...learner.academicDetails,
        relevantSubjects: learner.academicDetails.relevantSubjects.filter((_, i) => i !== idx),
      },
    };
    setLearner(updated);
    saveLearner(updated);
  };

  // Add Achievement
  const handleAddAchievement = () => {
    if (!newAchievement.trim() || !learner) return;
    const updated = {
      ...learner,
      academicDetails: {
        ...learner.academicDetails,
        academicAchievements: [...(learner.academicDetails.academicAchievements || []), newAchievement.trim()],
      },
    };
    setLearner(updated);
    saveLearner(updated);
    setNewAchievement('');
  };

  // Remove Achievement
  const handleRemoveAchievement = (idx: number) => {
    if (!learner) return;
    const updated = {
      ...learner,
      academicDetails: {
        ...learner.academicDetails,
        academicAchievements: learner.academicDetails.academicAchievements.filter((_, i) => i !== idx),
      },
    };
    setLearner(updated);
    saveLearner(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <PageHeader
        title="Student Employability Profile & Skill Passport"
        subtitle="Maintain your comprehensive academic record, verified competencies, certifications, and project portfolio for government and industry career placement"
        badge="Candidate Digital Record"
        actions={
          <div className="flex items-center gap-2">
            <Link
              href="/learner/careers"
              className="h-9 px-3.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-slate-50 text-[#0B1B30] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>💼</span>
              <span>View Career Matches</span>
            </Link>
            <button
              onClick={() => handleSave()}
              className="h-9 px-4 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile Updates</span>
            </button>
          </div>
        }
      />

      {/* Dynamic Recalculation Alert */}
      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-emerald-950">Profile Saved & Synchronized</p>
              <p className="text-emerald-800 text-[11px] font-normal">
                Career recommendations, match percentages, and skill gaps have been dynamically recalculated based on your latest updates.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/learner/careers"
              className="px-3 py-1.5 rounded bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold flex items-center gap-1"
            >
              <span>View Career Posts</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            <Link
              href="/learner/skill-gap"
              className="px-3 py-1.5 rounded border border-emerald-400 bg-white text-emerald-900 text-[11px] font-bold hover:bg-emerald-100"
            >
              <span>View Skill Gaps</span>
            </Link>
          </div>
        </div>
      )}

      {/* Profile Overview Card with 5-Factor Employability Progress */}
      <div className="bg-white border border-[#CBD5E1] rounded-xl p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#F0F4F8] border border-[#CBD5E1] flex items-center justify-center text-[#0B1B30] font-bold text-lg shrink-0">
              {learner.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-[#0B1B30]">{learner.name}</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EFF6FF] text-[#2857D9] border border-blue-200">
                  {learner.studentId}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Active Student
                </span>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                {learner.course} • {learner.year}, {learner.semester} • {learner.institution}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-[#64748B] tracking-wider block">
                Employability Profile Completion
              </span>
              <span className="text-lg font-mono font-bold text-[#2857D9]">{completion.total}%</span>
            </div>
            <div className="w-32 bg-[#F1F5F9] rounded-full h-2.5 overflow-hidden border border-slate-200">
              <div
                className="bg-[#2857D9] h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${completion.total}%` }}
              />
            </div>
          </div>
        </div>

        {/* 5-Section Health Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 text-xs">
          <button
            onClick={() => setActiveTab('basic')}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              activeTab === 'basic'
                ? 'border-[#2857D9] bg-[#EFF6FF]'
                : 'border-[#E2E8F0] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0F172A]">Basic Info</span>
              <span className="text-[10px] font-mono text-[#2857D9] font-bold">{completion.basic}/20</span>
            </div>
            <span className="text-[10px] text-[#64748B] block mt-0.5">Demographics & IDs</span>
          </button>

          <button
            onClick={() => setActiveTab('academics')}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              activeTab === 'academics'
                ? 'border-[#2857D9] bg-[#EFF6FF]'
                : 'border-[#E2E8F0] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0F172A]">Academics</span>
              <span className="text-[10px] font-mono text-[#2857D9] font-bold">{completion.academics}/20</span>
            </div>
            <span className="text-[10px] text-[#64748B] block mt-0.5">CGPA & Semesters</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              activeTab === 'skills'
                ? 'border-[#2857D9] bg-[#EFF6FF]'
                : 'border-[#E2E8F0] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0F172A]">Skills</span>
              <span className="text-[10px] font-mono text-[#2857D9] font-bold">{completion.skills}/20</span>
            </div>
            <span className="text-[10px] text-[#64748B] block mt-0.5">{learner.skills.length} Competencies</span>
          </button>

          <button
            onClick={() => setActiveTab('certifications')}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              activeTab === 'certifications'
                ? 'border-[#2857D9] bg-[#EFF6FF]'
                : 'border-[#E2E8F0] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0F172A]">Certifications</span>
              <span className="text-[10px] font-mono text-[#2857D9] font-bold">{completion.certs}/20</span>
            </div>
            <span className="text-[10px] text-[#64748B] block mt-0.5">{learner.certifications?.length || 0} Verified</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`p-2.5 rounded-lg border text-left transition-all ${
              activeTab === 'projects'
                ? 'border-[#2857D9] bg-[#EFF6FF]'
                : 'border-[#E2E8F0] hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-[#0F172A]">Projects</span>
              <span className="text-[10px] font-mono text-[#2857D9] font-bold">{completion.projects}/20</span>
            </div>
            <span className="text-[10px] text-[#64748B] block mt-0.5">{learner.projects?.length || 0} Capstones</span>
          </button>
        </div>
      </div>

      {/* Main Tab Navigation Bar */}
      <div className="border-b border-[#CBD5E1] flex gap-2 overflow-x-auto text-xs font-semibold">
        {[
          { id: 'basic', label: '1. Basic Information', icon: User },
          { id: 'academics', label: '2. Academic Details', icon: GraduationCap },
          { id: 'skills', label: '3. Skills & Proficiency', icon: Award },
          { id: 'certifications', label: '4. Certifications', icon: FileCheck2 },
          { id: 'projects', label: '5. Projects & Outcomes', icon: FolderGit2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`pb-3 px-3.5 flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'border-[#2857D9] text-[#2857D9] font-bold'
                  : 'border-transparent text-[#64748B] hover:text-[#0F172A] hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#2857D9]' : 'text-[#64748B]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: BASIC INFORMATION */}
      {/* ========================================================================= */}
      {activeTab === 'basic' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <User className="w-4 h-4 text-[#2857D9]" />
              <h3 className="text-sm font-bold text-[#0F172A]">Candidate Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">Student Legal Name *</label>
                <input
                  type="text"
                  value={learner.name}
                  onChange={(e) => setLearner({ ...learner, name: e.target.value })}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">Student ID / Roll No *</label>
                <input
                  type="text"
                  value={learner.studentId}
                  onChange={(e) => setLearner({ ...learner, studentId: e.target.value })}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white font-mono focus:border-[#2857D9] outline-none"
                  placeholder="e.g. STU-2026-CS409"
                />
              </div>

              {/* Dynamic Stream & Academic Hierarchy Selectors */}
              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Academic Discipline / Stream *
                </label>
                <select
                  value={currentStream.code}
                  onChange={(e) => handleStreamChange(e.target.value)}
                  className="w-full h-9 px-3 border border-[#2857D9] bg-blue-50/20 text-[#0F172A] font-bold rounded-lg focus:border-[#2857D9] outline-none"
                >
                  {STREAMS_REGISTRY.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
                <span className="text-[10px] text-[#64748B] mt-0.5 block">
                  Drives personalized skill gaps, roadmaps, and career matching.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Degree / Qualification *
                </label>
                <select
                  value={learner.course}
                  onChange={(e) => {
                    const qual = currentStream.qualifications.find((q) => q.name === e.target.value) || currentQual;
                    const spec = qual.specializations[0];
                    const career = spec.careers[0];
                    const updated = {
                      ...learner,
                      course: qual.name,
                      qualification: qual.name,
                      specialization: spec.name,
                      targetRole: career.title,
                    };
                    setLearner(updated);
                    saveLearner(updated);
                  }}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none"
                >
                  {currentStream.qualifications.map((q) => (
                    <option key={q.id} value={q.name}>
                      {q.name} ({q.level})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">
                  Domain Specialization *
                </label>
                <select
                  value={learner.specialization}
                  onChange={(e) => handleSpecializationChange(e.target.value)}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none font-medium"
                >
                  {currentQual.specializations.map((sp) => (
                    <option key={sp.id} value={sp.name}>
                      {sp.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">Current Academic Year *</label>
                <select
                  value={learner.year}
                  onChange={(e) => setLearner({ ...learner, year: e.target.value })}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Final Year">Final Year</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">Current Semester *</label>
                <select
                  value={learner.semester}
                  onChange={(e) => setLearner({ ...learner, semester: e.target.value })}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none"
                >
                  <option value="1st Semester">1st Semester</option>
                  <option value="2nd Semester">2nd Semester</option>
                  <option value="3rd Semester">3rd Semester</option>
                  <option value="4th Semester">4th Semester</option>
                  <option value="5th Semester">5th Semester</option>
                  <option value="6th Semester">6th Semester</option>
                  <option value="7th Semester">7th Semester</option>
                  <option value="8th Semester">8th Semester</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dynamic Stream Synchronization Banner Card */}
          <div className="bg-gradient-to-r from-blue-50 via-teal-50/40 to-slate-50 border border-blue-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#2857D9]" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-950">
                  Universal Stream Alignment: {currentStream.name} ({currentStream.code})
                </span>
              </div>
              <p className="text-xs text-slate-700">
                Target Role:{' '}
                <strong className="text-[#2857D9]">{currentCareer.title}</strong> • Sector:{' '}
                <span className="font-semibold text-slate-800">{currentCareer.sector}</span> • Work
                Environment: <span className="font-semibold">{currentCareer.workType}</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Changing your stream or role automatically updates your AI Skill Gaps, Roadmap, and
                Eligible Jobs across the platform.
              </p>
            </div>
            <button
              onClick={handleSyncDomainPortfolio}
              className="px-3.5 py-2 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-all shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sync {currentCareer.title} Portfolio</span>
            </button>
          </div>

          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E2E8F0]">
              <Briefcase className="w-4 h-4 text-[#2857D9]" />
              <h3 className="text-sm font-bold text-[#0F172A]">Target Employment Role & Demographics</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-[#1E293B] mb-1">Target Career Role *</label>
                <select
                  value={learner.targetRole}
                  onChange={(e) => handleCareerChange(e.target.value)}
                  className="w-full h-9 px-3 border border-[#2857D9] font-bold text-[#2857D9] rounded-lg bg-white focus:border-[#2857D9] outline-none"
                >
                  {currentSpec.careers.map((c) => (
                    <option key={c.id} value={c.title}>
                      {c.title} ({c.salaryRange})
                    </option>
                  ))}
                  <option value={learner.targetRole}>Custom: {learner.targetRole}</option>
                </select>
                <span className="text-[11px] text-[#64748B] mt-1 block">
                  Used by the recommendation engine to calculate live skill gap percentage and eligible jobs.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">Employment Status</label>
                <select
                  value={learner.employmentStatus}
                  onChange={(e: any) => setLearner({ ...learner, employmentStatus: e.target.value })}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none"
                >
                  <option value="Student">Student (Enrolled)</option>
                  <option value="Unemployed">Seeking Placement / Unemployed</option>
                  <option value="Apprentice">NAPS Apprentice</option>
                  <option value="Employed">Employed</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">Email Address</label>
                <input
                  type="email"
                  value={learner.email}
                  onChange={(e) => setLearner({ ...learner, email: e.target.value })}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">Mobile Contact</label>
                <input
                  type="tel"
                  value={learner.mobile}
                  onChange={(e) => setLearner({ ...learner, mobile: e.target.value })}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] mb-1">State & District</label>
                <input
                  type="text"
                  value={`${learner.district}, ${learner.state}`}
                  onChange={(e) => {
                    const parts = e.target.value.split(',');
                    setLearner({
                      ...learner,
                      district: parts[0]?.trim() || '',
                      state: parts[1]?.trim() || learner.state,
                    });
                  }}
                  className="w-full h-9 px-3 border border-[#CBD5E1] rounded-lg bg-white focus:border-[#2857D9] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ACADEMIC DETAILS */}
      {/* ========================================================================= */}
      {activeTab === 'academics' && (
        <div className="space-y-6">
          {/* CGPA & Overall Score Card */}
          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#2857D9]" />
                <h3 className="text-sm font-bold text-[#0F172A]">Overall Academic Performance</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <label className="block font-semibold text-[#64748B] mb-1">Cumulative CGPA (out of 10.0)</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={learner.academicDetails.cgpa}
                    onChange={(e) =>
                      setLearner({
                        ...learner,
                        academicDetails: { ...learner.academicDetails, cgpa: parseFloat(e.target.value) || 0 },
                      })
                    }
                    className="w-24 h-10 px-3 border border-[#CBD5E1] rounded-lg bg-white font-mono text-base font-bold text-[#0B1B30] focus:border-[#2857D9] outline-none"
                  />
                  <span className="text-xs text-[#64748B]">/ 10.0</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <label className="block font-semibold text-[#64748B] mb-1">Academic Percentage (%)</label>
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={learner.academicDetails.percentage}
                    onChange={(e) =>
                      setLearner({
                        ...learner,
                        academicDetails: { ...learner.academicDetails, percentage: parseFloat(e.target.value) || 0 },
                      })
                    }
                    className="w-24 h-10 px-3 border border-[#CBD5E1] rounded-lg bg-white font-mono text-base font-bold text-[#0B1B30] focus:border-[#2857D9] outline-none"
                  />
                  <span className="text-xs text-[#64748B]">%</span>
                </div>
              </div>

              <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
                <label className="block font-semibold text-[#64748B] mb-1">Degree Institution</label>
                <input
                  type="text"
                  value={learner.institution}
                  onChange={(e) => setLearner({ ...learner, institution: e.target.value })}
                  className="w-full h-10 px-3 border border-[#CBD5E1] rounded-lg bg-white text-xs text-[#0B1B30] focus:border-[#2857D9] outline-none"
                />
              </div>
            </div>
          </div>

          {/* Semester-wise Academic Performance Table */}
          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Semester-wise Academic Performance</h3>
                <p className="text-[11px] text-[#64748B]">SGPA performance tracked across academic terms</p>
              </div>
            </div>

            <div className="overflow-x-auto border border-[#E2E8F0] rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#475569]">
                    <th className="py-2.5 px-4 font-semibold">Semester</th>
                    <th className="py-2.5 px-4 font-semibold">Term SGPA</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {learner.academicDetails.semesterPerformance.map((sem, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60">
                      <td className="py-2 px-4 font-bold text-[#0F172A]">{sem.semester}</td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={sem.gpa}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value) || 0;
                            const updatedList = [...learner.academicDetails.semesterPerformance];
                            updatedList[idx] = { ...updatedList[idx], gpa: val };
                            setLearner({
                              ...learner,
                              academicDetails: { ...learner.academicDetails, semesterPerformance: updatedList },
                            });
                          }}
                          className="w-20 h-7 px-2 border border-[#CBD5E1] rounded bg-white font-mono font-bold text-xs"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sem.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : sem.status === 'Current'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {sem.status}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-right">
                        <button
                          onClick={() => {
                            const updatedList = learner.academicDetails.semesterPerformance.filter((_, i) => i !== idx);
                            setLearner({
                              ...learner,
                              academicDetails: { ...learner.academicDetails, semesterPerformance: updatedList },
                            });
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Relevant Subjects & Academic Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Relevant Subjects */}
            <div className="bg-white border border-[#CBD5E1] rounded-xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">
                Relevant Academic Subjects
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Distributed Operating Systems"
                  className="flex-1 h-8 px-3 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:border-[#2857D9] outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddSubject()}
                />
                <button
                  type="button"
                  onClick={handleAddSubject}
                  className="h-8 px-3 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {learner.academicDetails.relevantSubjects?.map((sub, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#F1F5F9] border border-slate-200 text-xs font-medium text-[#1E293B] flex items-center gap-1.5"
                  >
                    <span>{sub}</span>
                    <button
                      onClick={() => handleRemoveSubject(idx)}
                      className="text-slate-400 hover:text-rose-600 font-bold ml-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Achievements */}
            <div className="bg-white border border-[#CBD5E1] rounded-xl p-5 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-[#0F172A] pb-2 border-b border-[#E2E8F0]">
                Academic Honors & Achievements
              </h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newAchievement}
                  onChange={(e) => setNewAchievement(e.target.value)}
                  placeholder="e.g. Top 1% in NPTEL National Examination"
                  className="flex-1 h-8 px-3 border border-[#CBD5E1] rounded-lg text-xs bg-white focus:border-[#2857D9] outline-none"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddAchievement()}
                />
                <button
                  type="button"
                  onClick={handleAddAchievement}
                  className="h-8 px-3 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>

              <div className="space-y-2 pt-1">
                {learner.academicDetails.academicAchievements?.map((ach, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-[#F8FAFC] border border-slate-200 text-xs text-[#0F172A] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-amber-500">🏆</span>
                      <span className="font-semibold">{ach}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveAchievement(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SKILLS & PROFICIENCY */}
      {/* ========================================================================= */}
      {activeTab === 'skills' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Candidate Skills & Proficiency Levels</h3>
                <p className="text-[11px] text-[#64748B]">
                  Proficiency directly impacts your Career Match Percentage and Skill Gap diagnostics
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSkillForm(!showSkillForm)}
                className="h-8 px-3 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showSkillForm ? 'Close Form' : 'Add New Skill'}</span>
              </button>
            </div>

            {/* Inline Add Skill Form */}
            {showSkillForm && (
              <form
                onSubmit={handleAddSkill}
                className="p-4 rounded-xl bg-[#EFF6FF] border border-blue-200 space-y-3 animate-in fade-in"
              >
                <div className="font-bold text-xs text-[#0B1B30] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#2857D9]" />
                  <span>Register Competency in National Repository</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Skill Name *</label>
                    <input
                      type="text"
                      required
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      placeholder="e.g. Python, SQL, REST APIs, Git"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Skill Category *</label>
                    <select
                      value={newSkill.category}
                      onChange={(e: any) => setNewSkill({ ...newSkill, category: e.target.value })}
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    >
                      <option value="Technical Skills">Technical Skills</option>
                      <option value="Other Skills">Other Skills</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Proficiency Level *</label>
                    <select
                      value={newSkill.proficiencyLevel}
                      onChange={(e: any) => setNewSkill({ ...newSkill, proficiencyLevel: e.target.value })}
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white font-bold"
                    >
                      <option value="Beginner">Beginner (Foundational)</option>
                      <option value="Intermediate">Intermediate (Practitioner)</option>
                      <option value="Advanced">Advanced (Production Expert)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowSkillForm(false)}
                    className="h-8 px-3 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-8 px-4 rounded-lg bg-[#2857D9] text-white text-xs font-bold hover:bg-[#1E42B0]"
                  >
                    Save Competency
                  </button>
                </div>
              </form>
            )}

            {/* Categorized Skills Grid - Technical Skills and Other Skills Only */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(
                ['Technical Skills', 'Other Skills'] as SkillCategory[]
              ).map((category) => {
                const categorySkills = learner.skills.filter((s) => {
                  if (category === 'Other Skills') {
                    return (
                      s.category.toLowerCase() === 'other skills' ||
                      s.category.toLowerCase() === 'soft skills' ||
                      s.name.toLowerCase().includes('problem solving')
                    );
                  }
                  return (
                    s.category.toLowerCase() === 'technical skills' ||
                    (!s.category.toLowerCase().includes('other') && !s.category.toLowerCase().includes('soft') && !s.name.toLowerCase().includes('problem solving'))
                  );
                });
                return (
                  <div key={category} className="border border-[#E2E8F0] rounded-xl p-4 bg-[#F8FAFC] space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                      <span className="font-bold text-xs text-[#0B1B30]">{category}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 font-bold text-slate-600">
                        {categorySkills.length} Skills
                      </span>
                    </div>

                    <div className="space-y-2">
                      {categorySkills.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic py-2">No skills registered in this category.</p>
                      ) : (
                        categorySkills.map((sk) => (
                          <div
                            key={sk.name}
                            className="p-2.5 bg-white border border-[#E2E8F0] rounded-lg flex items-center justify-between text-xs hover:border-blue-300 transition-all"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#0F172A]">{sk.name}</span>
                              {sk.verified && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                                  Verified
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Inline Proficiency Selector */}
                              <select
                                value={sk.proficiencyLevel || 'Intermediate'}
                                onChange={(e: any) => {
                                  const updatedLevel = e.target.value as SkillProficiencyLevel;
                                  const proficiencyMap: Record<SkillProficiencyLevel, number> = {
                                    Beginner: 45,
                                    Intermediate: 75,
                                    Advanced: 95,
                                  };
                                  const updated = {
                                    ...learner,
                                    skills: learner.skills.map((item) =>
                                      item.name === sk.name
                                        ? {
                                            ...item,
                                            proficiencyLevel: updatedLevel,
                                            proficiency: proficiencyMap[updatedLevel],
                                          }
                                        : item
                                    ),
                                  };
                                  setLearner(updated);
                                  saveLearner(updated);
                                  setIsSaved(true);
                                  setTimeout(() => setIsSaved(false), 3000);
                                }}
                                className={`h-7 px-2 border rounded text-[11px] font-bold outline-none cursor-pointer ${
                                  sk.proficiencyLevel === 'Advanced'
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                    : sk.proficiencyLevel === 'Intermediate'
                                    ? 'bg-blue-50 border-blue-300 text-blue-800'
                                    : 'bg-amber-50 border-amber-300 text-amber-800'
                                }`}
                              >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                              </select>

                              <button
                                type="button"
                                onClick={() => handleDeleteSkill(sk.name)}
                                className="text-slate-400 hover:text-rose-600 p-1 rounded"
                                title="Remove skill"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: CERTIFICATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'certifications' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Accredited Certifications & Credentials</h3>
                <p className="text-[11px] text-[#64748B]">
                  Government & industry recognized credentials provide employability boost in recommendation scores
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCertForm(!showCertForm)}
                className="h-8 px-3 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showCertForm ? 'Close Form' : 'Add Certification'}</span>
              </button>
            </div>

            {/* Inline Add Certification Form */}
            {showCertForm && (
              <form
                onSubmit={handleAddCert}
                className="p-4 rounded-xl bg-[#EFF6FF] border border-blue-200 space-y-3 animate-in fade-in"
              >
                <div className="font-bold text-xs text-[#0B1B30] flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#2857D9]" />
                  <span>Register Professional Certification</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Certification Name *</label>
                    <input
                      type="text"
                      required
                      value={newCert.name}
                      onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
                      placeholder="e.g. Python for Enterprise Systems, AWS Cloud Practitioner"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Issuing Organization *</label>
                    <input
                      type="text"
                      required
                      value={newCert.issuingOrg}
                      onChange={(e) => setNewCert({ ...newCert, issuingOrg: e.target.value })}
                      placeholder="e.g. NPTEL / AICTE, NSDC India, Microsoft"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Completion Date</label>
                    <input
                      type="text"
                      value={newCert.completionDate}
                      onChange={(e) => setNewCert({ ...newCert, completionDate: e.target.value })}
                      placeholder="e.g. Jan 2025"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Credential ID / Verify ID</label>
                    <input
                      type="text"
                      value={newCert.credentialId}
                      onChange={(e) => setNewCert({ ...newCert, credentialId: e.target.value })}
                      placeholder="e.g. SIDH-CERT-8849"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-[#1E293B] mb-1">Related Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={newCert.relatedSkills}
                      onChange={(e) => setNewCert({ ...newCert, relatedSkills: e.target.value })}
                      placeholder="e.g. Python, SQL, Problem Solving"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowCertForm(false)}
                    className="h-8 px-3 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-8 px-4 rounded-lg bg-[#2857D9] text-white text-xs font-bold hover:bg-[#1E42B0]"
                  >
                    Save Certification
                  </button>
                </div>
              </form>
            )}

            {/* Certifications List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learner.certifications?.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-blue-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs text-[#0B1B30]">{c.name || c.title}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                          {c.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        Issued by <strong className="text-slate-800">{c.issuingOrg || c.issuer}</strong> • {c.completionDate || c.date}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                        Credential ID: {c.credentialId || c.verifyId}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDeleteCert(c.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Delete certification"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-[#E2E8F0]">
                    <span className="text-[10px] font-bold text-[#64748B] block mb-1">Related Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {c.relatedSkills?.map((sk, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-medium text-slate-700"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: PROJECTS & OUTCOMES */}
      {/* ========================================================================= */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="bg-white border border-[#CBD5E1] rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Practical Projects & Capstone Portfolios</h3>
                <p className="text-[11px] text-[#64748B]">
                  Applied projects demonstrate engineering competency and boost post match percentage
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowProjectForm(!showProjectForm)}
                className="h-8 px-3 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs shrink-0 self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showProjectForm ? 'Close Form' : 'Add Project'}</span>
              </button>
            </div>

            {/* Inline Add Project Form */}
            {showProjectForm && (
              <form
                onSubmit={handleAddProject}
                className="p-4 rounded-xl bg-[#EFF6FF] border border-blue-200 space-y-3 animate-in fade-in"
              >
                <div className="font-bold text-xs text-[#0B1B30] flex items-center gap-1.5">
                  <FolderGit2 className="w-4 h-4 text-[#2857D9]" />
                  <span>Register Capstone Project</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Project Title *</label>
                    <input
                      type="text"
                      required
                      value={newProject.title}
                      onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                      placeholder="e.g. Telemedicine Rural Consultation Scheduler"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Student Role *</label>
                    <input
                      type="text"
                      required
                      value={newProject.studentRole}
                      onChange={(e) => setNewProject({ ...newProject, studentRole: e.target.value })}
                      placeholder="e.g. Backend & Database Engineer"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-[#1E293B] mb-1">Project Description *</label>
                    <textarea
                      required
                      rows={2}
                      value={newProject.description}
                      onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                      placeholder="Explain the problem statement, architecture, and deployment..."
                      className="w-full p-2 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Technologies Used (comma-separated)</label>
                    <input
                      type="text"
                      value={newProject.technologiesUsed}
                      onChange={(e) => setNewProject({ ...newProject, technologiesUsed: e.target.value })}
                      placeholder="e.g. Python, Flask, SQL, React"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Project Outcome / Impact</label>
                    <input
                      type="text"
                      value={newProject.projectOutcome}
                      onChange={(e) => setNewProject({ ...newProject, projectOutcome: e.target.value })}
                      placeholder="e.g. Adopted across 3 clinics handling 400+ weekly appointments"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Skills Demonstrated</label>
                    <input
                      type="text"
                      value={newProject.skillsDemonstrated}
                      onChange={(e) => setNewProject({ ...newProject, skillsDemonstrated: e.target.value })}
                      placeholder="e.g. Python, SQL, REST APIs, Problem Solving"
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-[#1E293B] mb-1">Project URL / GitHub Link</label>
                    <input
                      type="url"
                      value={newProject.link}
                      onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full h-8 px-3 border border-[#CBD5E1] rounded-lg bg-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowProjectForm(false)}
                    className="h-8 px-3 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="h-8 px-4 rounded-lg bg-[#2857D9] text-white text-xs font-bold hover:bg-[#1E42B0]"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            )}

            {/* Projects List */}
            <div className="space-y-4">
              {learner.projects?.map((prj) => (
                <div
                  key={prj.id}
                  className="p-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl hover:border-blue-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[#0F172A]">{prj.title}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                          {prj.studentRole || prj.role}
                        </span>
                      </div>
                      <p className="text-xs text-[#334155] mt-1.5 leading-relaxed">{prj.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {prj.link && (
                        <a
                          href={prj.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#2857D9] hover:underline text-xs flex items-center gap-1 font-semibold"
                        >
                          <span>Repository</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDeleteProject(prj.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Outcome & Skills Demonstrated */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#E2E8F0] text-xs">
                    <div>
                      <span className="font-bold text-[11px] text-[#475569] block mb-1">Project Outcome:</span>
                      <p className="text-[11px] text-emerald-800 font-medium bg-emerald-50/70 p-2 rounded border border-emerald-200/60">
                        {prj.projectOutcome || prj.outcome}
                      </p>
                    </div>

                    <div>
                      <span className="font-bold text-[11px] text-[#475569] block mb-1">Technologies & Skills:</span>
                      <div className="flex flex-wrap gap-1">
                        {(prj.technologiesUsed || prj.technologies || []).map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Save Bar */}
      <div className="sticky bottom-4 z-10 p-3 bg-white/95 backdrop-blur border border-[#CBD5E1] rounded-xl shadow-lg flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-[#475569]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Any updates saved here immediately recalculate your career recommendations and skill gap analysis.</span>
        </div>
        <button
          type="button"
          onClick={() => handleSave()}
          className="h-9 px-5 rounded-lg bg-[#2857D9] hover:bg-[#1E42B0] text-white font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
        >
          <Save className="w-4 h-4" />
          <span>Save All Profile Changes</span>
        </button>
      </div>
    </div>
  );
}

export default function LearnerProfilePage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-slate-500">Loading profile...</div>}>
      <LearnerProfileContent />
    </Suspense>
  );
}

