'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader } from '@/components/ui/PageHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/EmptyState';
import { sidhStore } from '@/lib/sidh-store';
import {
  resolveLearnerCareerContext,
  categorizeJobsForLearner,
  getAllStreams,
  getAllCareers,
  CareerJobRoleDef,
} from '@/lib/career-registry';
import {
  Briefcase,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Building2,
  MapPin,
  BadgeCheck,
} from 'lucide-react';

export default function LearnerOpportunitiesPage() {
  const [learner, setLearner] = useState(() => sidhStore.getLearner());
  const [activeTab, setActiveTab] = useState<'recommended' | 'close' | 'future' | 'all' | 'applications'>('recommended');
  const [selectedStream, setSelectedStream] = useState<string>('All');
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedIds, setAppliedIds] = useState<string[]>(['opp-2']);

  useEffect(() => {
    const profile = sidhStore.getLearner();
    setLearner(profile);
    const ctx = resolveLearnerCareerContext(profile);
    setSelectedStream(ctx.stream.code);
  }, []);

  const { stream: activeStream, career: activeCareer } = resolveLearnerCareerContext(learner);

  // Collect all jobs across registry + legacy opportunities
  const allRegistryCareers = getAllCareers();
  const allRegistryJobs: (CareerJobRoleDef & { streamCode?: string })[] = [];
  allRegistryCareers.forEach((c) => {
    c.jobRoles.forEach((j) => {
      allRegistryJobs.push({
        ...j,
        streamCode: c.streamCode,
      });
    });
  });

  // Categorize jobs into the 3 buckets
  const categorized = categorizeJobsForLearner(learner, allRegistryJobs);

  const handleApply = (id: string, title: string) => {
    if (!appliedIds.includes(id)) {
      setAppliedIds([...appliedIds, id]);
      alert(`Application submitted successfully for "${title}"! Check the "My Applications" tab to track status.`);
    }
  };

  const filterJobList = (jobs: (CareerJobRoleDef & { streamCode?: string })[]) => {
    return jobs.filter((job) => {
      const matchesStream =
        selectedStream === 'All' ||
        job.streamCode === selectedStream ||
        job.sector.toLowerCase().includes(selectedStream.toLowerCase());

      const matchesType =
        selectedType === 'All' || job.type.toLowerCase() === selectedType.toLowerCase();

      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesStream && matchesType && matchesSearch;
    });
  };

  const displayedJobs =
    activeTab === 'recommended'
      ? filterJobList(categorized.recommendedNow)
      : activeTab === 'close'
      ? filterJobList(categorized.closeMatch)
      : activeTab === 'future'
      ? filterJobList(categorized.futureOpportunities)
      : filterJobList(allRegistryJobs);

  const myApplications = allRegistryJobs.filter((j) => appliedIds.includes(j.id));
  const streams = getAllStreams();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jobs & Apprenticeship Opportunities"
        subtitle="National Apprenticeship Promotion Scheme (NAPS) & verified industry partner openings across all engineering, commerce & professional streams"
        breadcrumbs={[
          { label: 'Portal', href: '/learner/dashboard' },
          { label: 'Opportunities' },
        ]}
      />

      {/* Candidate Discipline Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#1D4ED8] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0B192C] dark:text-white">
                Active Career Profile: {activeCareer.title}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-[#1D4ED8] dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {activeStream.name} ({activeStream.code})
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Opportunities are prioritized using our 7-factor match engine into 3 distinct readiness buckets.
            </p>
          </div>
        </div>

        <Link
          href="/learner/profile"
          className="px-3.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold shrink-0"
        >
          Change Target Role
        </Link>
      </div>

      {/* 3 Job Recommendation Buckets Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 sm:gap-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('recommended')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'recommended'
              ? 'border-[#1D4ED8] text-[#1D4ED8] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
          <span>Recommended Now ({categorized.recommendedNow.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('close')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'close'
              ? 'border-[#1D4ED8] text-[#1D4ED8] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-blue-600" />
          <span>Close Match ({categorized.closeMatch.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('future')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'future'
              ? 'border-[#1D4ED8] text-[#1D4ED8] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span>Future Opportunities ({categorized.futureOpportunities.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'all'
              ? 'border-[#1D4ED8] text-[#1D4ED8] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          All Openings ({allRegistryJobs.length})
        </button>

        <button
          onClick={() => setActiveTab('applications')}
          className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'applications'
              ? 'border-[#1D4ED8] text-[#1D4ED8] dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          My Applications ({myApplications.length})
        </button>
      </div>

      {activeTab !== 'applications' && (
        <div className="space-y-4">
          {/* Stream Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Discipline:
            </span>
            <button
              onClick={() => setSelectedStream('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStream === 'All'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-2xs'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
              }`}
            >
              All Disciplines
            </button>
            {streams.map((s) => (
              <button
                key={s.code}
                onClick={() => setSelectedStream(s.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedStream === s.code
                    ? 'bg-[#1D4ED8] text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                {s.name} ({s.code})
              </button>
            ))}
          </div>

          {/* Search & Type Toolbar */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xs">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search job title, company, skill or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-hidden focus:ring-2 focus:ring-[#1D4ED8]"
              />
            </div>
            <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto">
              {['All', 'Job', 'Apprenticeship', 'Internship'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                    selectedType === type
                      ? 'bg-[#1D4ED8] text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {displayedJobs.length === 0 ? (
            <EmptyState
              icon="💼"
              title="No Openings Found"
              description="No opportunities match your current filter selection. Try changing the discipline or search query."
              action={{ label: 'Reset Filters', onClick: () => { setSelectedStream('All'); setSelectedType('All'); setSearchQuery(''); } }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedJobs.map((opp) => {
                const isApplied = appliedIds.includes(opp.id);
                const isRecommended = categorized.recommendedNow.some((j) => j.id === opp.id);
                const isClose = categorized.closeMatch.some((j) => j.id === opp.id);

                return (
                  <div
                    key={opp.id}
                    className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-2xs hover:border-[#1D4ED8] dark:hover:border-blue-500 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4ED8] dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                              {opp.type}
                            </span>
                            {isRecommended && (
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                                ✓ Recommended Now
                              </span>
                            )}
                            {isClose && (
                              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
                                Close Match
                              </span>
                            )}
                            {!isRecommended && !isClose && (
                              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                                Future Opportunity
                              </span>
                            )}
                          </div>

                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base mt-2">
                            {opp.title}
                          </h3>
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>{opp.company}</span>
                          </p>
                        </div>

                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded font-mono shrink-0">
                          {opp.salaryRange}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{opp.location}</span>
                        </span>
                        <span className="text-slate-300">•</span>
                        <span>Sector: {opp.sector}</span>
                        <span className="text-slate-300">•</span>
                        <span>Exp: {opp.experienceRequired}</span>
                      </div>

                      <div className="mt-3">
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
                          Required Competencies:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {opp.requiredSkills.map((s, i) => (
                            <span
                              key={i}
                              className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] px-2 py-0.5 rounded font-medium"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {opp.openings} Openings • Min CGPA: {opp.minCgpa}
                      </span>
                      {isApplied ? (
                        <span className="px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Applied</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleApply(opp.id, opp.title)}
                          className="px-4 py-1.5 bg-[#1D4ED8] hover:bg-[#1E40AF] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                        >
                          Apply with SIDH Profile
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'applications' && (
        <div>
          {myApplications.length === 0 ? (
            <EmptyState
              icon="💼"
              title="No Applications Submitted Yet"
              description="Browse and apply to verified apprenticeship and employment opportunities across your discipline."
              action={{ label: 'Explore Opportunities', onClick: () => setActiveTab('recommended') }}
            />
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Role & Company</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Compensation</th>
                    <th className="py-3 px-4">Application Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {myApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{app.title}</div>
                        <div className="text-slate-500 text-[11px]">{app.company}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300">{app.type}</td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">{app.location}</td>
                      <td className="py-3.5 px-4 font-mono font-semibold text-slate-800 dark:text-slate-200">{app.salaryRange}</td>
                      <td className="py-3.5 px-4">
                        <StatusBadge status="Under Review" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => alert(`Application Details for ${app.title}:\nSIDH Verification: Cleared\nResume Sent: Yes\nNext Steps: Virtual Interview Round 1`)}
                          className="px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium"
                        >
                          View Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
