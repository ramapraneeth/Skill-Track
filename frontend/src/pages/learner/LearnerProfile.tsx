import React from 'react'
import { mockLearners } from '../../data/mockData'
import { StatusBadge } from '../../components/common/StatusBadge'
import { User, Award, BookOpen, MapPin, Building, ShieldCheck, FileCheck } from 'lucide-react'

export const LearnerProfile: React.FC = () => {
  const learner = mockLearners[0] // Rahul Sharma

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Learner Profile & Skilling Credentials</h1>
          <p className="text-xs text-slate-500">
            Official longitudinal record aligned with National Skills Qualifications Framework (NSQF)
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <ShieldCheck className="h-4 w-4" /> Aadhar Virtual ID Verified
        </span>
      </div>

      {/* Main Details Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <img
            src={learner.avatarUrl}
            alt={learner.fullName}
            className="h-24 w-24 rounded-2xl object-cover border-2 border-indigo-600 shadow-sm"
          />
          <div className="flex-1 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{learner.fullName}</h2>
                <p className="text-xs text-slate-500">Learner Permanent Identifier: {learner.learnerCode}</p>
              </div>
              <StatusBadge status={learner.currentStatus} size="md" />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs sm:grid-cols-4 pt-2 border-t border-slate-100">
              <div>
                <span className="text-slate-400 uppercase font-semibold text-[10px] block">Age & Gender</span>
                <span className="font-bold text-slate-800">{learner.age} Years • {learner.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-semibold text-[10px] block">State & District</span>
                <span className="font-bold text-slate-800">{learner.district}, {learner.state}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-semibold text-[10px] block">Prior Education</span>
                <span className="font-bold text-slate-800">{learner.educationLevel}</span>
              </div>
              <div>
                <span className="text-slate-400 uppercase font-semibold text-[10px] block">Social Category</span>
                <span className="font-bold text-slate-800">{learner.socioEconomicCategory}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skilling & Certification Credentials */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <BookOpen className="h-4 w-4 text-indigo-600" />
            <span>Enrolled Programme Details</span>
          </div>
          <div className="rounded-lg bg-slate-50 p-4 space-y-2 text-xs">
            <p className="font-bold text-slate-900 text-sm">{learner.programmeTitle}</p>
            <p className="text-slate-600">Training Partner: {learner.providerName}</p>
            <p className="text-slate-600">Scheme: Pradhan Mantri Kaushal Vikas Yojana (PMKVY 4.0)</p>
            <div className="flex items-center gap-3 pt-2 text-[11px] font-semibold text-slate-500">
              <span>Duration: 16 Weeks (480 Hours)</span>
              <span>•</span>
              <span>Attendance: 88%</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
            <Award className="h-4 w-4 text-emerald-600" />
            <span>Verified NCVET Certification</span>
          </div>
          <div className="rounded-lg bg-emerald-50/50 border border-emerald-100 p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-sm">NSQF Level 5 Certification</span>
              <span className="font-bold bg-emerald-200/60 text-emerald-900 px-2 py-0.5 rounded">
                Grade A (82%)
              </span>
            </div>
            <p className="text-slate-600 font-mono">Certificate #: NCVET-2024-IT-88419</p>
            <p className="text-slate-600">Issuing Body: NASSCOM Sector Skill Council (IT-ITeS)</p>
            <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-700 font-medium">
              <FileCheck className="h-3.5 w-3.5" />
              <span>Cryptographically verified on DigiLocker / Skill India Repository</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
