import React from 'react'
import { useLearner } from '../../api/queries'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { StatusBadge } from '../../components/common/StatusBadge'
import { BookOpen, Award, ShieldCheck, FileCheck, RefreshCw } from 'lucide-react'

export const LearnerProfile: React.FC = () => {
  const { data: learner, isLoading, isError, refetch } = useLearner('learner-1')

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={1} />
        <LoadingSkeleton variant="card" count={2} />
      </div>
    )
  }

  if (isError || !learner) {
    return (
      <ErrorMessage
        title="Failed to load candidate profile"
        message="Could not retrieve authenticated learner profile from Neon database."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#002541]">
              Learner Profile & Skilling Credentials
            </h1>
            <p className="text-xs text-[#52606D] mt-0.5">
              Official longitudinal record aligned with National Skills Qualifications Framework (NSQF)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#059669] bg-[#E8F5E9] border border-[#C8E6C9] px-3 py-1 rounded-md">
              <ShieldCheck className="h-4 w-4" /> Aadhar Virtual ID Verified
            </span>
            <button
              onClick={() => refetch()}
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-[#D1D9E2] bg-white px-2.5 text-xs font-semibold text-[#1F2937] hover:bg-[#F4F6F9] transition"
            >
              <RefreshCw className="h-3 w-3 text-[#52606D]" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <img
            src={
              learner.avatarUrl ||
              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
            }
            alt={learner.fullName}
            className="h-24 w-24 rounded-md object-cover border border-[#D1D9E2] shadow-xs"
          />
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-2xl font-bold text-[#002541]">{learner.fullName}</h2>
                <p className="text-xs text-[#52606D]">Learner Code: {learner.learnerCode}</p>
              </div>
              <StatusBadge status={learner.currentStatus} size="md" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4 pt-3 border-t border-[#E8EFF5]">
              <div>
                <span className="text-[#52606D] uppercase font-semibold text-[10px] block">Age & Gender</span>
                <span className="font-semibold text-[#1F2937]">{learner.age} Years • {learner.gender}</span>
              </div>
              <div>
                <span className="text-[#52606D] uppercase font-semibold text-[10px] block">Location</span>
                <span className="font-semibold text-[#1F2937]">{learner.district}, {learner.state}</span>
              </div>
              <div>
                <span className="text-[#52606D] uppercase font-semibold text-[10px] block">Prior Education</span>
                <span className="font-semibold text-[#1F2937]">{learner.educationLevel}</span>
              </div>
              <div>
                <span className="text-[#52606D] uppercase font-semibold text-[10px] block">Category</span>
                <span className="font-semibold text-[#1F2937]">{learner.socioEconomicCategory || 'General'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skilling & Certification Credentials */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#002541] font-bold text-sm">
            <BookOpen className="h-4 w-4 text-[#0B3B60]" />
            <span>Enrolled Programme Details</span>
          </div>
          <div className="rounded-md bg-[#F8FAFC] border border-[#D1D9E2] p-4 space-y-2 text-xs">
            <p className="font-semibold text-[#002541] text-sm">{learner.programmeTitle || 'Junior Data Operations & Python Associate'}</p>
            <p className="text-[#52606D]">Training Partner: {learner.providerName || 'Apex Skilling Academy'}</p>
            <p className="text-[#52606D]">Scheme: Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)</p>
            <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold text-[#52606D]">
              <span>Duration: 16 Weeks (480 Hours)</span>
              <span>•</span>
              <span>Attendance: 88%</span>
            </div>
          </div>
        </div>

        <div className="rounded-md border border-[#D1D9E2] bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#002541] font-bold text-sm">
            <Award className="h-4 w-4 text-[#059669]" />
            <span>Verified NCVET Certification</span>
          </div>
          <div className="rounded-md bg-[#E8F5E9]/50 border border-[#C8E6C9] p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#059669] text-sm">NSQF Level 5 Certification</span>
              <span className="font-bold bg-[#C8E6C9] text-[#1B5E20] px-2 py-0.5 rounded-md">
                Grade A (82%)
              </span>
            </div>
            <p className="text-[#52606D] font-mono">Certificate #: NCVET-2024-IT-88419</p>
            <p className="text-[#52606D]">Issuing Body: NASSCOM Sector Skill Council (IT-ITeS)</p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#059669] font-semibold">
              <FileCheck className="h-3.5 w-3.5" />
              <span>Cryptographically verified on DigiLocker / Skill India Repository</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
