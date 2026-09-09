import React, { useState } from 'react'
import { useInterventions, useCreateIntervention, useUpdateIntervention } from '../../api/queries'
import { StatusBadge } from '../../components/common/StatusBadge'
import { InterventionModal } from '../../components/common/InterventionModal'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { EmptyState } from '../../components/common/EmptyState'
import { Zap, Plus, Sparkles, Filter, CheckCircle2, RefreshCw } from 'lucide-react'

export const InterventionsPage: React.FC = () => {
  const { data: allInterventions = [], isLoading, isError, refetch } = useInterventions()
  const createIntervention = useCreateIntervention()
  const updateIntervention = useUpdateIntervention()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedIntervention, setSelectedIntervention] = useState<any>(null)

  const handleSave = (savedInt: any) => {
    if (savedInt.id) {
      updateIntervention.mutate({
        id: savedInt.id,
        data: {
          status: savedInt.status,
          outcomeNotes: savedInt.outcomeNotes,
        },
      })
    } else {
      createIntervention.mutate({
        learnerId: savedInt.learnerId || 'learner-1',
        recommendedBy: savedInt.recommendedBy || 'Intervention Workflow Engine',
        category: savedInt.category || 'upskilling',
        title: savedInt.title,
        description: savedInt.description,
        status: savedInt.status || 'assigned',
        targetCompletionDate: savedInt.targetCompletionDate || '2024-08-30',
        outcomeNotes: savedInt.outcomeNotes,
      })
    }
  }

  const handleEdit = (intItem: any) => {
    setSelectedIntervention(intItem)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-xl font-black text-slate-900">Intervention Workflow Engine</h1>
          <p className="text-xs text-slate-500">
            Diagnose → Prescribe → Track → Follow-up → Measure outcome improvement
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 flex items-center gap-1.5 transition shadow-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Sync</span>
          </button>
          <button
            onClick={() => {
              setSelectedIntervention(null)
              setIsModalOpen(true)
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
          >
            <Plus className="h-4 w-4" />
            <span>Prescribe New Intervention</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">Active Ecosystem Interventions</h2>
          <span className="text-xs font-bold text-slate-500">{allInterventions.length} Interventions Total</span>
        </div>

        {isLoading ? (
          <div className="p-6">
            <LoadingSkeleton variant="table" count={4} />
          </div>
        ) : isError ? (
          <div className="p-6">
            <ErrorMessage
              title="Failed to load interventions"
              message="Could not reach the interventions service."
              onRetry={() => refetch()}
            />
          </div>
        ) : allInterventions.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No interventions active"
              description="Prescribe a targeted support action for any at-risk candidate."
              actionLabel="Prescribe Intervention"
              onAction={() => {
                setSelectedIntervention(null)
                setIsModalOpen(true)
              }}
            />
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {allInterventions.map((item: any) => (
              <div key={item.id} className="p-5 hover:bg-slate-50/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{item.title}</span>
                    <span className="rounded bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-700 border border-indigo-100 uppercase">
                      {item.category.replace('_', ' ')}
                    </span>
                    <StatusBadge status={item.status} />
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>Assigned Candidate: <strong className="text-slate-700">{item.learnerName}</strong></span>
                    <span>•</span>
                    <span>Recommended by: {item.recommendedBy}</span>
                    <span>•</span>
                    <span className="font-medium text-indigo-600">Due: {item.targetCompletionDate}</span>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                  >
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <InterventionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existingIntervention={selectedIntervention}
        onSave={handleSave}
      />
    </div>
  )
}
