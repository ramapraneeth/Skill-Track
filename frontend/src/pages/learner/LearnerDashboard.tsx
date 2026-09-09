import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLearner, usePlacementPrediction, useJobs, useCreateIntervention } from '../../api/queries'
import { KpiCard } from '../../components/common/KpiCard'
import { StatusBadge } from '../../components/common/StatusBadge'
import { TimelineView } from '../../components/common/TimelineView'
import { ExplainablePredictionCard } from '../../components/common/ExplainablePredictionCard'
import { InterventionModal } from '../../components/common/InterventionModal'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { EmptyState } from '../../components/common/EmptyState'
import { Button } from '../../components/ui/Button'
import {
  GraduationCap,
  Award,
  Briefcase,
  Target,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ExternalLink,
  Zap,
} from 'lucide-react'

export const LearnerDashboard: React.FC = () => {
  const { data: learner, isLoading, isError, refetch } = useLearner('learner-1')
  const { data: prediction } = usePlacementPrediction('learner-1')
  const { data: jobs } = useJobs()
  const createIntervention = useCreateIntervention()
  const [isInterventionOpen, setIsInterventionOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="profile" />
        <LoadingSkeleton variant="kpi" count={4} />
        <LoadingSkeleton variant="card" count={2} />
      </div>
    )
  }

  if (isError || !learner) {
    return (
      <ErrorMessage
        title="Unable to load learner profile"
        message="Could not connect to the skilling outcome service. Please verify your connection."
        onRetry={() => refetch()}
      />
    )
  }

  const primaryJob = jobs?.[0]

  const handleSaveIntervention = (newInt: any) => {
    createIntervention.mutate({
      learnerId: learner.id,
      recommendedBy: newInt.recommendedBy || 'Learner Dashboard',
      category: newInt.category || 'upskilling',
      title: newInt.title,
      description: newInt.description,
      status: 'assigned',
      targetCompletionDate: newInt.targetCompletionDate || '2024-08-30',
    })
  }

  const activePrediction = prediction || learner.predictions?.[0]

  return (
    <div className="space-y-6">
      {/* Learner Profile Banner */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-2xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="h-16 w-16 rounded bg-[#E8F0F7] border-2 border-[#0B3B60] flex items-center justify-center font-black text-xl text-[#0B3B60]">
                {learner.fullName?.charAt(0) || 'R'}
              </div>
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-[#059669] ring-2 ring-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-black text-[#002541] tracking-tight">{learner.fullName}</h1>
                <StatusBadge status={learner.currentStatus} label={learner.currentStatus === 'placed' ? 'Placed' : 'Certified • Seeking Placement'} />
                <span className="rounded bg-[#F4F6F9] px-2 py-0.5 text-[11px] font-mono text-[#4A5568] border border-[#D1D9E2]">
                  {learner.learnerCode}
                </span>
              </div>
              <p className="text-xs text-[#718096] mt-1">
                {learner.programmeTitle} • {learner.providerName}
              </p>
              <div className="mt-1 flex items-center gap-3 text-xs text-[#718096]">
                <span>Location: {learner.district}, {learner.state}</span>
                <span>•</span>
                <span>Education: {learner.educationLevel}</span>
                <span>•</span>
                <span className="font-semibold text-[#0B3B60]">Profile: {learner.profileCompletionPct || 92}% Complete</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:self-center">
            <Link to="/learner/skill-gap">
              <Button variant="secondary" size="md" rightIcon={<ExternalLink className="h-3.5 w-3.5" />}>
                Skill Gap Diagnosis
              </Button>
            </Link>
            <Button
              onClick={() => setIsInterventionOpen(true)}
              variant="primary"
              size="md"
              leftIcon={<Zap className="h-3.5 w-3.5" />}
            >
              Prescribe Action
            </Button>
          </div>
        </div>
      </div>

      {/* Outcome KPIs Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Training Status"
          value="100% Completed"
          subtitle="480 Hrs • 88% Attendance"
          icon={GraduationCap}
          variant="success"
        />
        <KpiCard
          title="NSQF Certification"
          value="NSQF Level 5"
          subtitle="Grade A • NCVET Verified"
          icon={Award}
          variant="indigo"
        />
        <KpiCard
          title="Employment Status"
          value={learner.currentStatus === 'placed' ? `Placed (₹${learner.currentSalary?.toLocaleString()}/mo)` : 'Seeking Placement'}
          subtitle={learner.currentStatus === 'placed' ? 'Verified in formal sector' : '45 Days Post-Assessment'}
          trend={{ value: learner.currentStatus === 'placed' ? 'Retained' : 'Pending', isPositive: learner.currentStatus === 'placed', label: 'Intervention active' }}
          icon={Briefcase}
          variant={learner.currentStatus === 'placed' ? 'success' : 'warning'}
        />
        <KpiCard
          title="Market Skill Match"
          value={`${learner.skillMatchPct || 63}%`}
          subtitle="Target: Data Analyst"
          trend={{ value: '37% Gap', isPositive: false, label: 'SQL Required' }}
          icon={Target}
          variant="danger"
        />
      </div>

      {/* Explainable AI Prediction Module */}
      {activePrediction && (
        <ExplainablePredictionCard
          prediction={activePrediction}
          learnerName={learner.fullName}
          onIntervene={() => setIsInterventionOpen(true)}
        />
      )}

      {/* Longitudinal Milestone Timeline */}
      <TimelineView events={learner.timeline || []} />

      {/* Two Column Section: Verified Skills & Target Opportunity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Current Verified Skills */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-sm font-bold text-[#002541]">Verified Competencies</h2>
              <p className="text-xs text-[#718096]">Formally assessed during NSQF certification</p>
            </div>
            <Link to="/learner/skills" className="text-xs font-bold text-[#0B3B60] hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-2.5">
            {(learner.skills || []).length === 0 ? (
              <EmptyState title="No skills registered" description="Assessments are currently in progress." />
            ) : (
              (learner.skills || []).map((skill: any) => (
                <div
                  key={skill.id}
                  className="flex items-center justify-between p-3 rounded border border-[#D1D9E2] bg-[#F4F6F9] hover:bg-slate-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded bg-[#E8F0F7] border border-[#B4CFE5] flex items-center justify-center text-[#0B3B60] font-bold text-xs font-mono">
                      {skill.assessedScore || 75}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#1C2733]">{skill.skillName}</h4>
                      <p className="text-[11px] text-[#718096] capitalize">{skill.category} • {skill.proficiencyLevel}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded bg-[#E6F4EA] px-2 py-0.5 text-[10px] font-bold text-[#137333] border border-[#A8DAB5] uppercase">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Skill Gap Diagnostic vs Target Vacancy */}
        <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E2E8F0]">
            <div>
              <h2 className="text-sm font-bold text-[#002541]">Target Requisition Match</h2>
              <p className="text-xs text-[#718096]">Matched against national employer requisitions</p>
            </div>
            <span className="rounded bg-[#E8F0F7] px-2.5 py-0.5 text-[11px] font-bold text-[#0B3B60] border border-[#B4CFE5]">
              63% Skill Match
            </span>
          </div>

          {primaryJob && (
            <div className="rounded border border-[#D1D9E2] bg-[#F4F6F9] p-4 mb-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#002541]">{primaryJob.title}</h3>
                  <p className="text-xs text-[#4A5568] mt-0.5">{primaryJob.companyName} • {primaryJob.district}, {primaryJob.state}</p>
                  <p className="text-xs font-bold font-mono text-[#059669] mt-1">₹{primaryJob.minSalary?.toLocaleString()} - ₹{primaryJob.maxSalary?.toLocaleString()} / month</p>
                </div>
                <span className="text-[10px] font-bold text-[#718096] bg-white px-2 py-1 rounded border border-[#D1D9E2] uppercase">
                  {primaryJob.vacancies} Openings
                </span>
              </div>
            </div>
          )}

          {/* Missing Gap Highlight */}
          <div className="rounded border border-[#FFCC80] bg-[#FFF3E0] p-3.5 mb-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-[#E65100] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-[#E65100]">Critical Competency Deficit Detected</h4>
                <p className="text-[11px] text-[#4A5568] mt-0.5 leading-relaxed">
                  Lacks <strong>SQL Database Queries</strong> (Mandatory requirement, Demand: 4.9/5.0). Prescribing the 14-Day Micro-Credential will raise readiness to <strong>90%+</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2">
            <Link to="/learner/skill-gap">
              <Button variant="secondary" size="sm">
                Full Diagnosis
              </Button>
            </Link>
            <Button
              onClick={() => setIsInterventionOpen(true)}
              variant="primary"
              size="sm"
            >
              Prescribe SQL Course
            </Button>
          </div>
        </div>
      </div>

      {/* Active Interventions Summary */}
      <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E2E8F0]">
          <div>
            <h2 className="text-sm font-bold text-[#002541]">Prescribed Interventions ({learner.interventions?.length || 0})</h2>
            <p className="text-xs text-[#718096]">Proactive support deployed to eliminate attrition and placement bottlenecks</p>
          </div>
          <Button
            onClick={() => setIsInterventionOpen(true)}
            size="sm"
            leftIcon={<Zap className="h-3 w-3" />}
          >
            Add Action
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(learner.interventions || []).map((item: any) => (
            <div key={item.id} className="rounded border border-[#D1D9E2] bg-[#F4F6F9] p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#E8F0F7] px-2 py-0.5 text-[9px] font-bold text-[#0B3B60] border border-[#B4CFE5] uppercase tracking-wider">
                  {item.category?.replace('_', ' ')}
                </span>
                <StatusBadge status={item.status} />
              </div>
              <h3 className="text-xs font-bold text-[#1C2733]">{item.title}</h3>
              <p className="text-xs text-[#4A5568] leading-relaxed">{item.description}</p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-[#718096] border-t border-[#E2E8F0]">
                <span>By: {item.recommendedBy}</span>
                <span className="flex items-center gap-1 font-medium font-mono">
                  <Calendar className="h-3 w-3 text-[#0B3B60]" />
                  Due: {item.targetCompletionDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intervention Modal */}
      <InterventionModal
        isOpen={isInterventionOpen}
        onClose={() => setIsInterventionOpen(false)}
        learnerId={learner.id}
        learnerName={learner.fullName}
        onSave={handleSaveIntervention}
      />
    </div>
  )
}
