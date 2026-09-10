'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Compass, Plus, CheckCircle2, ArrowRight } from 'lucide-react';
import { PageHeader } from '@/components/ui/PageHeader';
import { getLearner, saveLearner } from '@/lib/sidh-store';

interface SkillItem {
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  occupations: string[];
  relatedCourseId: string;
}

const DISCOVERY_SKILLS: SkillItem[] = [
  {
    name: 'Cloud Computing & AWS Architecture',
    category: 'Cloud & Infrastructure',
    difficulty: 'Intermediate',
    description: 'EC2 instances, S3 storage, VPC subnets, and IAM role management on Amazon Web Services.',
    occupations: ['Cloud Engineer', 'DevOps Specialist', 'Solutions Architect'],
    relatedCourseId: 'crs-004',
  },
  {
    name: 'Data Structures & Algorithms (DSA)',
    category: 'Software & IT',
    difficulty: 'Intermediate',
    description: 'Trees, graph traversal, dynamic programming, and amortized complexity analysis in Java/C++.',
    occupations: ['Software Engineer', 'Backend Developer', 'System Programmer'],
    relatedCourseId: 'crs-002',
  },
  {
    name: 'Microsoft Power BI & DAX',
    category: 'Data Analytics',
    difficulty: 'Beginner',
    description: 'Relational data modeling, star schemas, time intelligence measures, and executive KPI reporting.',
    occupations: ['Business Intelligence Analyst', 'Data Reporter', 'MIS Executive'],
    relatedCourseId: 'crs-003',
  },
  {
    name: 'Docker & Kubernetes Containerization',
    category: 'Cloud & Infrastructure',
    difficulty: 'Advanced',
    description: 'Multi-stage container builds, pod manifests, ingress controller routing, and Helm charts.',
    occupations: ['DevOps Engineer', 'Site Reliability Engineer', 'Cloud Architect'],
    relatedCourseId: 'crs-004',
  },
  {
    name: 'SOC Operations & SIEM Splunk',
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    description: 'Log correlation, packet dissection with Wireshark, threat hunting, and incident triage.',
    occupations: ['SOC Analyst (L1/L2)', 'Cyber Threat Hunter', 'Security Auditor'],
    relatedCourseId: 'crs-005',
  },
  {
    name: 'Full Stack React & Node Architecture',
    category: 'Web Technologies',
    difficulty: 'Intermediate',
    description: 'State machines, serverless REST API endpoints, JWT authentication, and asynchronous persistence.',
    occupations: ['Full Stack Developer', 'Frontend Engineer', 'Web Applications Lead'],
    relatedCourseId: 'crs-001',
  },
];

export default function SkillDiscoveryPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [learner, setLearner] = useState(getLearner());
  const [addedSkill, setAddedSkill] = useState<string | null>(null);

  const categories = ['ALL', 'Software & IT', 'Web Technologies', 'Data Analytics', 'Cloud & Infrastructure', 'Cybersecurity'];

  const filteredSkills = DISCOVERY_SKILLS.filter((s) => {
    const matchesCat = selectedCategory === 'ALL' || s.category === selectedCategory;
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleAddSkill = (skill: SkillItem) => {
    const current = getLearner();
    if (current.skills.some((sk) => sk.name.toLowerCase() === skill.name.toLowerCase())) {
      return;
    }
    const updated = {
      ...current,
      skills: [
        ...current.skills,
        { name: skill.name, proficiency: 60, category: skill.category, verified: false },
      ],
    };
    saveLearner(updated);
    setLearner(updated);
    setAddedSkill(skill.name);
    setTimeout(() => setAddedSkill(null), 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Skill Discovery & Taxonomy"
        subtitle="Explore national NSQF-aligned competency standards, market demand indices, and mapped industry occupations"
        badge="Discovery Engine"
      />

      {addedSkill && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Added "{addedSkill}" to your candidate profile. Take an assessment to verify proficiency.</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#CBD5E1] rounded-lg p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search skills by name or keyword..."
            className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0B3B60] text-white'
                  : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSkills.map((sk) => {
          const isAdded = learner.skills.some((s) => s.name.toLowerCase() === sk.name.toLowerCase());

          return (
            <div
              key={sk.name}
              className="bg-white border border-[#CBD5E1] rounded-lg p-5 shadow-xs flex flex-col justify-between hover:border-[#0B3B60] transition-all space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569]">
                    {sk.category}
                  </span>
                  <span className="text-[10px] font-bold text-[#0B3B60]">{sk.difficulty}</span>
                </div>

                <h3 className="text-sm font-bold text-[#0F172A] leading-snug">{sk.name}</h3>
                <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">{sk.description}</p>

                <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                    Related Occupations:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {sk.occupations.map((occ) => (
                      <span key={occ} className="text-[9px] px-1.5 py-0.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#334E68]">
                        {occ}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                <Link
                  href={`/learner/courses/${sk.relatedCourseId}`}
                  className="text-xs font-bold text-[#0B3B60] hover:underline flex items-center gap-1"
                >
                  View Course <ArrowRight className="w-3 h-3" />
                </Link>

                {isAdded ? (
                  <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Profile
                  </span>
                ) : (
                  <button
                    onClick={() => handleAddSkill(sk)}
                    className="px-3 py-1.5 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add to Profile</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
