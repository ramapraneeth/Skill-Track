'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckCircle2, Sparkles, Award } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  getLearner,
  saveLearner,
  SkillProficiencyLevel,
  SkillCategory,
  StudentSkill,
  LearnerProfile,
} from '@/lib/sidh-store';

export default function SkillsProficiencyPage() {
  const targetTechnical: StudentSkill[] = [
    { name: 'SQL', category: 'Technical Skills', proficiencyLevel: 'Intermediate' as SkillProficiencyLevel, proficiency: 70, verified: true },
    { name: 'REST APIs', category: 'Technical Skills', proficiencyLevel: 'Beginner' as SkillProficiencyLevel, proficiency: 40, verified: false },
    { name: 'HTML5 & CSS3', category: 'Technical Skills', proficiencyLevel: 'Advanced' as SkillProficiencyLevel, proficiency: 92, verified: true },
    { name: 'React.js', category: 'Technical Skills', proficiencyLevel: 'Intermediate' as SkillProficiencyLevel, proficiency: 70, verified: true },
  ];
  const targetOther: StudentSkill[] = [
    { name: 'Problem Solving', category: 'Other Skills', proficiencyLevel: 'Intermediate' as SkillProficiencyLevel, proficiency: 80, verified: true },
  ];

  const [learner, setLearner] = useState<LearnerProfile>(() => {
    const current = getLearner();
    return {
      ...current,
      skills: [...targetTechnical, ...targetOther],
    };
  });
  const [isSaved, setIsSaved] = useState(false);
  const [showSkillForm, setShowSkillForm] = useState(false);
  const [newSkill, setNewSkill] = useState<{
    name: string;
    category: 'Technical Skills' | 'Other Skills';
    proficiencyLevel: SkillProficiencyLevel;
  }>({
    name: '',
    category: 'Technical Skills',
    proficiencyLevel: 'Intermediate',
  });

  useEffect(() => {
    const current = getLearner();
    // Normalize skills to the two categories and ensure target skills exist
    const hasTarget = current.skills.some((s) => s.name === 'SQL');
    if (!hasTarget) {
      const updated = { ...current, skills: [...targetTechnical, ...targetOther] };
      saveLearner(updated);
      setLearner(updated);
    }
  }, []);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const proficiencyScoreMap: Record<SkillProficiencyLevel, number> = {
      Beginner: 45,
      Intermediate: 75,
      Advanced: 95,
    };

    const added: StudentSkill = {
      name: newSkill.name.trim(),
      category: newSkill.category,
      proficiencyLevel: newSkill.proficiencyLevel,
      proficiency: proficiencyScoreMap[newSkill.proficiencyLevel],
      verified: false,
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
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleDeleteSkill = (skillName: string) => {
    const updated = {
      ...learner,
      skills: learner.skills.filter((s) => s.name !== skillName),
    };
    setLearner(updated);
    saveLearner(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleProficiencyChange = (skillName: string, level: SkillProficiencyLevel) => {
    const proficiencyMap: Record<SkillProficiencyLevel, number> = {
      Beginner: 45,
      Intermediate: 75,
      Advanced: 95,
    };
    const updated = {
      ...learner,
      skills: learner.skills.map((item) =>
        item.name === skillName
          ? {
              ...item,
              proficiencyLevel: level,
              proficiency: proficiencyMap[level],
            }
          : item
      ),
    };
    setLearner(updated);
    saveLearner(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const categories: Array<'Technical Skills' | 'Other Skills'> = ['Technical Skills', 'Other Skills'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Skills & Proficiency"
        subtitle="Candidate skill inventory, proficiency benchmarks, and verified competency levels"
        badge="Skill Matrix"
      />

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Skill profile synchronized and updated successfully.</span>
        </div>
      )}

      {/* Main Container */}
      <div className="bg-white dark:bg-slate-900 border border-[#CBD5E1] dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-5 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0] dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] dark:text-white">
              Candidate Skills & Proficiency Levels
            </h3>
            <p className="text-[11px] text-[#64748B] dark:text-slate-400 mt-0.5">
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
            className="p-4 rounded-xl bg-[#EFF6FF] dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-3 animate-in fade-in"
          >
            <div className="font-bold text-xs text-[#0B1B30] dark:text-blue-200 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#2857D9] dark:text-blue-400" />
              <span>Register Competency in National Repository</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-[#1E293B] dark:text-slate-200 mb-1">
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g. Python, SQL, REST APIs"
                  className="w-full h-8 px-3 border border-[#CBD5E1] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] dark:text-slate-200 mb-1">
                  Skill Category *
                </label>
                <select
                  value={newSkill.category}
                  onChange={(e: any) => setNewSkill({ ...newSkill, category: e.target.value })}
                  className="w-full h-8 px-3 border border-[#CBD5E1] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                >
                  <option value="Technical Skills">Technical Skills</option>
                  <option value="Other Skills">Other Skills</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#1E293B] dark:text-slate-200 mb-1">
                  Proficiency Level *
                </label>
                <select
                  value={newSkill.proficiencyLevel}
                  onChange={(e: any) => setNewSkill({ ...newSkill, proficiencyLevel: e.target.value })}
                  className="w-full h-8 px-3 border border-[#CBD5E1] dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-slate-100"
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
                className="h-8 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
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

        {/* Categorized Skills Grid - Technical Skills and Other Skills Side-by-Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category) => {
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
                (!s.category.toLowerCase().includes('other') &&
                  !s.category.toLowerCase().includes('soft') &&
                  !s.name.toLowerCase().includes('problem solving'))
              );
            });

            return (
              <div
                key={category}
                className="border border-[#E2E8F0] dark:border-slate-800 rounded-xl p-4 bg-[#F8FAFC] dark:bg-slate-800/40 space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] dark:border-slate-800">
                    <span className="font-bold text-xs text-[#0B1B30] dark:text-white uppercase tracking-wider">
                      {category}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300">
                      {categorySkills.length} Skills
                    </span>
                  </div>

                  <div className="space-y-2 pt-2">
                    {categorySkills.length === 0 ? (
                      <p className="text-[11px] text-slate-400 italic py-2">
                        No skills registered in this category.
                      </p>
                    ) : (
                      categorySkills.map((sk) => (
                        <div
                          key={sk.name}
                          className="p-2.5 bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 rounded-lg flex items-center justify-between text-xs hover:border-blue-300 dark:hover:border-blue-800 transition-all shadow-2xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#0F172A] dark:text-slate-100">{sk.name}</span>
                            {sk.verified && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-bold">
                                Verified
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            {/* Inline Proficiency Selector */}
                            <select
                              value={sk.proficiencyLevel || 'Intermediate'}
                              onChange={(e) =>
                                handleProficiencyChange(sk.name, e.target.value as SkillProficiencyLevel)
                              }
                              className={`h-7 px-2 border rounded text-[11px] font-bold outline-none cursor-pointer ${
                                sk.proficiencyLevel === 'Advanced'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                                  : sk.proficiencyLevel === 'Intermediate'
                                  ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300'
                                  : 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                              }`}
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => handleDeleteSkill(sk.name)}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
