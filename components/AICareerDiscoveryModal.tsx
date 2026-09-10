'use client';

import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  X,
  Briefcase,
  GraduationCap,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building,
  Wrench,
  Cpu,
  BadgePercent,
} from 'lucide-react';
import {
  runCareerDiscovery,
  CareerDiscoveryInputs,
  CareerProfileDef,
  StreamDef,
  getAllStreams,
} from '@/lib/career-registry';
import { sidhStore } from '@/lib/sidh-store';

interface AICareerDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCareerAdopted?: (career: CareerProfileDef, stream: StreamDef) => void;
}

const EDUCATION_OPTIONS = [
  'B.Tech / B.E. (Engineering)',
  'Diploma in Engineering / Polytechnic',
  'B.Com / M.Com (Commerce & Finance)',
  'B.Sc / M.Sc (Science / Agriculture)',
  'B.Pharm / M.Pharm (Pharmacy)',
  'BHM / BBA (Hospitality / Management)',
  'LL.B / B.A. LL.B (Law & Legal Studies)',
  'BCA / MCA / B.Sc Computer Science',
];

const DISCIPLINE_PRESETS = [
  { label: 'ECE / Electronics & Embedded', value: 'ECE' },
  { label: 'Civil Engineering / Construction', value: 'Civil' },
  { label: 'Commerce, Accounting & Finance', value: 'Commerce' },
  { label: 'Mechanical & Automation Design', value: 'Mechanical' },
  { label: 'Pharmacy & Drug Safety', value: 'Pharmacy' },
  { label: 'Agriculture & Agronomy', value: 'Agriculture' },
  { label: 'Hospitality & Hotel Operations', value: 'Hospitality' },
  { label: 'Corporate Law & Legal Compliance', value: 'Law' },
  { label: 'Computer Science & Software', value: 'Computer Science' },
];

const INTEREST_OPTIONS = [
  'Embedded Systems & Microcontrollers',
  'Structural Detailing & AutoCAD',
  'Taxation, GST & Financial Statements',
  '3D Modeling, SolidWorks & Manufacturing',
  'Pharmacovigilance & Clinical Trial Safety',
  'Soil Health, Precision Farming & Drone Sprayers',
  'Hotel Front Office & Guest Experience',
  'Corporate Contracts, M&A & Statutory Filings',
  'Full Stack Web & Cloud Architectures',
];

const STRENGTH_OPTIONS = [
  'Hands-on Lab Experiments & Circuit Testing',
  'On-Site Physical Inspection & Measurements',
  'Numerical Accuracy, Auditing & Balances',
  'Geometric Dimensioning & Mechanical Tolerances',
  'Adverse Event Data Analysis & Medical Coding',
  'Agronomic Field Scouting & Pest Diagnostics',
  'Guest Conflict Resolution & Hospitality Diplomacy',
  'Legal Drafting, Due Diligence & Statutory Research',
  'Algorithmic Logic & Systematic Debugging',
];

const WORK_TYPE_OPTIONS: Array<'Field' | 'Desk/Office' | 'Lab' | 'Remote' | 'On-site'> = [
  'Field',
  'Desk/Office',
  'Lab',
  'Remote',
  'On-site',
];

const INDUSTRY_OPTIONS = [
  'Semiconductors & IoT Hardware',
  'Infrastructure, Real Estate & Smart Cities',
  'BFSI, FinTech & Corporate Audit',
  'Automotive, Aerospace & Heavy Engineering',
  'Pharmaceuticals & Contract Research (CRO)',
  'Agri-Inputs, Crop Science & Food Processing',
  'Luxury Hospitality, Resorts & Tourism',
  'Legal Advisory & Regulatory Compliance',
  'Information Technology & Software Services',
];

export default function AICareerDiscoveryModal({
  isOpen,
  onClose,
  onCareerAdopted,
}: AICareerDiscoveryModalProps) {
  const [step, setStep] = useState<number>(1);
  const [educationLevel, setEducationLevel] = useState<string>(EDUCATION_OPTIONS[0]);
  const [branchOrField, setBranchOrField] = useState<string>('ECE');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [preferredWorkType, setPreferredWorkType] = useState<
    'Field' | 'Desk/Office' | 'Lab' | 'Remote' | 'On-site'
  >('Lab');
  const [industryPreference, setIndustryPreference] = useState<string>(INDUSTRY_OPTIONS[0]);

  const [recommendations, setRecommendations] = useState<
    ReturnType<typeof runCareerDiscovery>['topRecommendations'] | null
  >(null);

  if (!isOpen) return null;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleStrength = (strength: string) => {
    setSelectedStrengths((prev) =>
      prev.includes(strength) ? prev.filter((s) => s !== strength) : [...prev, strength]
    );
  };

  const handleRunDiscovery = () => {
    const inputs: CareerDiscoveryInputs = {
      educationLevel,
      branchOrField,
      interests: selectedInterests.length > 0 ? selectedInterests : [branchOrField],
      strengths: selectedStrengths.length > 0 ? selectedStrengths : [branchOrField],
      preferredWorkType,
      industryPreference,
    };

    const results = runCareerDiscovery(inputs);
    setRecommendations(results.topRecommendations);
    setStep(6); // Step 6: Results view
  };

  const handleAdoptCareer = (career: CareerProfileDef, stream: StreamDef) => {
    // 1. Sync to store
    const current = sidhStore.getLearner();
    sidhStore.saveLearner({
      ...current,
      branch: stream.name,
      course: stream.qualifications[0]?.name || stream.name,
      qualification: stream.qualifications[0]?.level || 'Undergraduate',
      specialization: career.sector,
      targetRole: career.title,
      skills: career.requiredSkills.map((rs, idx) => ({
        id: `sk-adopt-${idx + 1}`,
        name: rs.skill,
        category: (rs.category || 'Technical') as any,
        proficiencyLevel: rs.requiredLevel,
        level: rs.requiredLevel,
        verified: rs.priority === 'High',
        proficiency: rs.defaultStudentPercentage || 60,
      })),
      certifications: career.certifications.slice(0, 2).map((c, idx) => ({
        id: `cert-adopt-${idx + 1}`,
        name: c.title,
        title: c.title,
        issuingOrg: c.issuingOrg,
        issuer: c.issuingOrg,
        completionDate: '2025-06-15',
        date: '2025-06-15',
        credentialId: `NSDC-${stream.code}-${idx + 101}`,
        verifyId: `NSDC-${stream.code}-${idx + 101}`,
        relatedSkills: c.skills,
        status: 'Verified',
      })),
      projects: career.projects.slice(0, 2).map((p, idx) => ({
        id: `prj-adopt-${idx + 1}`,
        title: p.title,
        description: p.description,
        technologiesUsed: p.technologiesUsed,
        technologies: p.technologiesUsed,
        studentRole: career.title,
        role: career.title,
        projectOutcome: p.outcome,
        outcome: p.outcome,
        skillsDemonstrated: p.technologiesUsed,
        verified: true,
      })),
    });

    if (onCareerAdopted) {
      onCareerAdopted(career, stream);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl w-full max-w-3xl overflow-hidden my-6">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#1D4ED8] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-[#0B192C] dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>AI Career Discovery Engine</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 font-semibold border border-blue-200 dark:border-blue-800">
                  Universal Multi-Stream
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personalized career path matching across engineering, commerce, science, healthcare & humanities
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Step Progress (When not in result step) */}
        {step < 6 && (
          <div className="px-6 pt-4 pb-2 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
              <span>Step {step} of 5</span>
              <span className="text-[#1D4ED8] dark:text-blue-400 font-bold">
                {step === 1 && 'Education & Background'}
                {step === 2 && 'Domain Interests'}
                {step === 3 && 'Core Strengths'}
                {step === 4 && 'Work Environment'}
                {step === 5 && 'Industry Preference'}
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1D4ED8] h-full rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6">
          {/* Step 1: Education Level & Discipline */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#0B192C] dark:text-white">
                  What is your academic qualification and discipline?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  We calibrate career expectations and NSQF certification bands based on your discipline.
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Highest / Current Qualification
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
                >
                  {EDUCATION_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Discipline / Academic Field
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DISCIPLINE_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setBranchOrField(p.value)}
                      className={`text-left p-2.5 rounded-lg border text-xs font-medium transition-all ${
                        branchOrField === p.value
                          ? 'border-[#1D4ED8] bg-blue-50/60 dark:bg-blue-950/40 text-[#1D4ED8] dark:text-blue-300 font-semibold ring-1 ring-[#1D4ED8]'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#0B192C] dark:text-white">
                  Which topics or practical domains excite you most?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select 1 to 3 areas you want to spend your daily work hours solving.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INTEREST_OPTIONS.map((item) => {
                  const active = selectedInterests.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item)}
                      className={`text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 ${
                        active
                          ? 'border-[#1D4ED8] bg-blue-50/60 dark:bg-blue-950/40 text-[#1D4ED8] dark:text-blue-300 font-semibold ring-1 ring-[#1D4ED8]'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{item}</span>
                      {active && <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Core Strengths */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#0B192C] dark:text-white">
                  What are your strongest capabilities?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select the day-to-day activities where you feel most confident and effective.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STRENGTH_OPTIONS.map((item) => {
                  const active = selectedStrengths.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleStrength(item)}
                      className={`text-left p-3 rounded-lg border text-xs transition-all flex items-start justify-between gap-2 ${
                        active
                          ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold ring-1 ring-emerald-600'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{item}</span>
                      {active && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Work Environment */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#0B192C] dark:text-white">
                  What is your preferred work environment?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Different streams offer varied working conditions from outdoor site work to lab cleanrooms.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {WORK_TYPE_OPTIONS.map((wt) => {
                  const active = preferredWorkType === wt;
                  return (
                    <button
                      key={wt}
                      type="button"
                      onClick={() => setPreferredWorkType(wt)}
                      className={`p-4 rounded-xl border text-center transition-all ${
                        active
                          ? 'border-[#1D4ED8] bg-blue-50/60 dark:bg-blue-950/40 text-[#1D4ED8] dark:text-blue-300 font-semibold ring-2 ring-[#1D4ED8]'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-sm font-bold">{wt}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {wt === 'Field' && 'Site work, outdoor infrastructure, physical execution'}
                        {wt === 'Desk/Office' && 'Corporate offices, analytical drafting, consulting'}
                        {wt === 'Lab' && 'Testing benches, oscilloscope, chemical cleanrooms'}
                        {wt === 'Remote' && 'Distributed digital workspace & hybrid flexibility'}
                        {wt === 'On-site' && 'Plant floor, hotels, hospitals & operational facilities'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Industry Sector Preference */}
          {step === 5 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#0B192C] dark:text-white">
                  Which national industry sector do you want to enter?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Select the industrial ecosystem where you want to build long-term seniority.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {INDUSTRY_OPTIONS.map((ind) => {
                  const active = industryPreference === ind;
                  return (
                    <button
                      key={ind}
                      type="button"
                      onClick={() => setIndustryPreference(ind)}
                      className={`text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${
                        active
                          ? 'border-[#1D4ED8] bg-blue-50/60 dark:bg-blue-950/40 text-[#1D4ED8] dark:text-blue-300 font-semibold ring-1 ring-[#1D4ED8]'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span>{ind}</span>
                      {active && <CheckCircle2 className="w-4 h-4 text-[#1D4ED8] dark:text-blue-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 6: Recommendations Result */}
          {step === 6 && recommendations && (
            <div className="space-y-4">
              <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <BadgePercent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-100">
                    Top 3 Career Matches Discovered
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400">
                    Calculated using multi-dimensional alignment across your {branchOrField} background, {preferredWorkType} preference, and industry aspirations.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <div
                    key={rec.career.id}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-[#1D4ED8] dark:hover:border-blue-500 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                          {rec.stream.name} ({rec.career.streamCode})
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          {rec.career.nsqfLevel}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                          Avg: {rec.career.salaryRange}
                        </span>
                      </div>

                      <h4 className="text-base font-bold text-[#0B192C] dark:text-white">
                        {rec.career.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                        {rec.career.description}
                      </p>

                      <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 pt-1 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                        <span>{rec.matchReason}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0 gap-2">
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-[#1D4ED8] dark:text-blue-400 font-mono">
                          {rec.discoveryScore}%
                        </div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Match Score
                        </div>
                      </div>

                      <button
                        onClick={() => handleAdoptCareer(rec.career, rec.stream)}
                        className="px-4 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
                      >
                        <span>Adopt This Career Path</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
          {step > 1 && step < 6 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 5 && (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-4 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-all"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 5 && (
            <button
              onClick={handleRunDiscovery}
              className="px-5 py-2 rounded-lg bg-[#1D4ED8] hover:bg-[#1E40AF] text-white text-xs font-bold flex items-center gap-2 shadow-xs transition-all animate-pulse"
            >
              <Sparkles className="w-4 h-4" />
              <span>Run AI Career Discovery</span>
            </button>
          )}

          {step === 6 && (
            <button
              onClick={() => setStep(1)}
              className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
            >
              <span>Retake Discovery Wizard</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
