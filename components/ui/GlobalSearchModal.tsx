'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchResultItem {
  id: string;
  title: string;
  category: 'Student' | 'Skill' | 'Course' | 'Training Provider' | 'Trainer' | 'Company' | 'Job' | 'Scheme' | 'Institution';
  subtitle: string;
  url: string;
  badge?: string;
}

const SEARCH_DATABASE: SearchResultItem[] = [
  // Students
  { id: 's-1', title: 'Arjun Patel', category: 'Student', subtitle: 'B.Tech CS • Placement Ready • 84% Readiness', url: '/learner/profile', badge: 'Verified' },
  { id: 's-2', title: 'Priya Sharma', category: 'Student', subtitle: 'MCA • AI & Data Modeling • 78% Readiness', url: '/learner/profile', badge: 'Active' },
  { id: 's-3', title: 'Rahul Verma', category: 'Student', subtitle: 'Diploma Electronics • IoT & Embedded • 65% Readiness', url: '/learner/profile' },

  // Skills
  { id: 'sk-1', title: 'React.js & Next.js App Router', category: 'Skill', subtitle: 'Web Technologies • High National Demand (+42%)', url: '/learner/skills', badge: 'High Demand' },
  { id: 'sk-2', title: 'Python & Applied Machine Learning', category: 'Skill', subtitle: 'Data Science & AI • High National Demand (+58%)', url: '/learner/skills', badge: 'High Demand' },
  { id: 'sk-3', title: 'Relational Database Modeling & SQL', category: 'Skill', subtitle: 'Data Engineering • Core Prerequisite', url: '/learner/skills' },
  { id: 'sk-4', title: 'Docker, Containers & Kubernetes', category: 'Skill', subtitle: 'Cloud & DevOps • Critical Skill Shortage', url: '/learner/skills', badge: 'Critical Gap' },

  // Courses
  { id: 'c-1', title: 'Full Stack Web Development & React Architecture', category: 'Course', subtitle: 'NSDC / PMKVY 4.0 • 240 Hrs • Impact Score: 89/100', url: '/learner/courses/crs-001', badge: '76.5% Placed' },
  { id: 'c-2', title: 'Enterprise Business Intelligence & Power BI', category: 'Course', subtitle: 'GSDM • 160 Hrs • Impact Score: 87/100', url: '/learner/courses/crs-003', badge: '66.7% Placed' },
  { id: 'c-3', title: 'DevOps Engineering & Cloud Infrastructure', category: 'Course', subtitle: 'MSDE Special Project • 320 Hrs • Impact Score: 92/100', url: '/learner/courses/crs-004', badge: '74.2% Placed' },

  // Training Providers & Institutions
  { id: 'p-1', title: 'National Skill Training Institute (NSTI), Hyderabad', category: 'Institution', subtitle: 'SMART Grade A+ • 12 Active Batches • AEBAS Compliant', url: '/government/training-centers/tc-01', badge: 'Grade A+' },
  { id: 'p-2', title: 'Gujarat State Vocational Institute, Ahmedabad', category: 'Institution', subtitle: 'SMART Grade A • 18 Trainers • BFSI & IT CoE', url: '/government/training-centers/tc-02', badge: 'Grade A' },

  // Trainers
  { id: 't-1', title: 'Dr. Rajesh Nair', category: 'Trainer', subtitle: 'ToT Certified Level 6 • IT-ITeS SSC • Rating 4.88', url: '/trainer/profile', badge: 'Master Trainer' },
  { id: 't-2', title: 'Dr. Sunita Rao', category: 'Trainer', subtitle: 'Data Science & BI Specialist • Rating 4.92', url: '/trainer/profile', badge: 'ToT Certified' },

  // Companies & Jobs
  { id: 'j-1', title: 'Associate Web Application Developer', category: 'Job', subtitle: 'Tata Consultancy Services (TCS) • ₹4.5 - ₹5.8 LPA', url: '/learner/opportunities', badge: 'Hiring 45' },
  { id: 'j-2', title: 'Associate Cloud Support Engineer', category: 'Job', subtitle: 'Amazon Web Services (AWS) • ₹8.5 - ₹12.0 LPA', url: '/learner/opportunities', badge: 'Hiring 20' },
  { id: 'j-3', title: 'Data Analytics Apprentice', category: 'Job', subtitle: 'Infosys Limited • NAPS Stipend: ₹22,000/mo', url: '/learner/opportunities', badge: 'Apprenticeship' },

  // Schemes
  { id: 'sc-1', title: 'Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)', category: 'Scheme', subtitle: 'Central Sector Scheme • ₹1,200 Cr • 1.2M Target', url: '/government/schemes' },
  { id: 'sc-2', title: 'National Apprenticeship Promotion Scheme (NAPS)', category: 'Scheme', subtitle: 'MSDE Direct Benefit Transfer • ₹320 Cr Budget', url: '/government/schemes' },
];

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = ['All', 'Student', 'Skill', 'Course', 'Job', 'Institution', 'Trainer', 'Scheme'];

  const filtered = SEARCH_DATABASE.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 animate-in fade-in duration-150">
      <div className="bg-white dark:bg-slate-900 rounded-xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50 dark:bg-slate-950">
          <span className="text-slate-400 text-base">🔍</span>
          <input
            autoFocus
            type="text"
            placeholder="Search students, skills, courses, jobs, trainers, schemes, institutions..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
            ESC
          </kbd>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#1D4ED8] text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching records found for "{query}". Try searching for courses, skills, or institutions.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.url)}
                className="p-3 rounded-lg hover:bg-blue-50/60 dark:hover:bg-slate-800/50 cursor-pointer transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-slate-900 dark:text-slate-100 group-hover:text-[#1D4ED8]">
                      {item.title}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {item.category}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{item.subtitle}</p>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-[#1D4ED8] shrink-0 font-medium">
                  Jump →
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 flex justify-between items-center">
          <span>
            Showing <strong>{filtered.length}</strong> national intelligence entries
          </span>
          <span className="text-slate-400">Press ↵ to navigate</span>
        </div>
      </div>
    </div>
  );
};
