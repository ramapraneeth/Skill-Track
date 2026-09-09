import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useJobs, useLearner } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { EmptyState } from '../../components/common/EmptyState'
import { Briefcase, MapPin, IndianRupee, Search, Filter, ArrowRight, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'

export const JobsPage: React.FC = () => {
  const [search, setSearch] = useState('')
  const [selectedSector, setSelectedSector] = useState('all')

  const { data: jobsList = [], isLoading, isError, refetch } = useJobs()
  const { data: learner } = useLearner('learner-1')

  const learnerSkills = new Set((learner?.skills || []).map((s: any) => s.skillId))

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={4} />
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load job vacancies"
        message="Unable to load active regional requisitions."
        onRetry={() => refetch()}
      />
    )
  }

  const filteredJobs = jobsList.filter((job: any) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(search.toLowerCase()) ||
      job.district.toLowerCase().includes(search.toLowerCase())
    const matchesSector = selectedSector === 'all' || job.sector.toLowerCase().includes(selectedSector.toLowerCase())
    return matchesSearch && matchesSector
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-black text-slate-900">Active Job Openings & Skill Matching</h1>
          <p className="text-xs text-slate-500">
            Real-time employer vacancies with instant algorithmic compatibility score for {learner?.fullName || 'Rahul Sharma'}
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 transition self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Sync Openings</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center rounded-2xl border border-slate-200 bg-white p-4 shadow-xs text-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by job title, company, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
          />
        </div>

        <select
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-700 outline-none font-medium"
        >
          <option value="all">All Industry Sectors</option>
          <option value="IT">IT & Data Analytics</option>
          <option value="Logistics">Logistics & Supply Chain</option>
          <option value="Healthcare">Healthcare & Clinical</option>
          <option value="Green Energy">Renewable Energy</option>
        </select>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <EmptyState
          title="No vacancies match your search"
          description="Try broadening your keywords or industry sector filter."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearch('')
            setSelectedSector('all')
          }}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredJobs.map((job: any) => {
            const reqSkills = job.requiredSkills || []
            const matchedCount = reqSkills.filter((r: any) => learnerSkills.has(r.skillId)).length
            const matchScore = reqSkills.length > 0 ? Math.round((matchedCount / reqSkills.length) * 100) : 70

            return (
              <div
                key={job.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-indigo-200 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                        {job.sector}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{job.title}</h3>
                      <p className="text-xs font-medium text-indigo-700">{job.companyName}</p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full font-bold text-xs ${
                          matchScore >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : matchScore >= 60
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {matchScore}% Match
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 border-y border-slate-100 py-2.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {job.district}, {job.state}
                    </span>
                    <span className="flex items-center gap-1 font-bold text-slate-900">
                      <IndianRupee className="h-3.5 w-3.5 text-slate-400" />
                      ₹{job.minSalary?.toLocaleString()} - ₹{job.maxSalary?.toLocaleString()} / mo
                    </span>
                    <span className="text-slate-400">•</span>
                    <span>{job.vacancies} Openings</span>
                  </div>

                  {/* Required Competencies Check */}
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Competency Match Matrix:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {reqSkills.map((req: any) => {
                        const isSatisfied = learnerSkills.has(req.skillId)
                        return (
                          <span
                            key={req.skillId}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium border ${
                              isSatisfied
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : req.importance === 'mandatory'
                                ? 'bg-rose-50 text-rose-800 border-rose-200 font-bold'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {isSatisfied ? (
                              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                            ) : (
                              <AlertCircle className="h-3 w-3 text-rose-500" />
                            )}
                            {req.skillName}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100">
                  <Link
                    to={`/skills/gaps`}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    <span>Run Skill Gap Audit</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>

                  <button className="rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-indigo-700 shadow-xs transition">
                    Match Candidate
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
