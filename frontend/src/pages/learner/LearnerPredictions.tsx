import React, { useState } from 'react'
import { useLearner, usePlacementPrediction, useAttritionPrediction, useCreateIntervention } from '../../api/queries'
import { ExplainablePredictionCard } from '../../components/common/ExplainablePredictionCard'
import { InterventionModal } from '../../components/common/InterventionModal'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { BrainCircuit, ShieldAlert, Sparkles, HelpCircle, Target, RefreshCw } from 'lucide-react'

export const LearnerPredictions: React.FC = () => {
  const { data: learner, isLoading: isLearnerLoading, isError: isLearnerError, refetch: refetchLearner } = useLearner('learner-1')
  const { data: placementPred, isLoading: isPlacementLoading, isError: isPlacementError, refetch: refetchPlacement } = usePlacementPrediction('learner-1')
  const { data: attritionPred, isLoading: isAttritionLoading } = useAttritionPrediction('learner-1')
  const createIntervention = useCreateIntervention()
  const [isInterventionOpen, setIsInterventionOpen] = useState(false)

  if (isLearnerLoading || isPlacementLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={2} />
      </div>
    )
  }

  if (isLearnerError || !learner) {
    return (
      <ErrorMessage
        title="Failed to load AI prediction diagnostics"
        message="Could not reach the prediction service. Please check API server."
        onRetry={() => {
          refetchLearner()
          refetchPlacement()
        }}
      />
    )
  }

  const handleSaveIntervention = (newInt: any) => {
    createIntervention.mutate({
      learnerId: learner.id,
      recommendedBy: newInt.recommendedBy || 'AI Prediction Diagnostics',
      category: newInt.category || 'upskilling',
      title: newInt.title,
      description: newInt.description,
      status: 'assigned',
      targetCompletionDate: newInt.targetCompletionDate || '2024-08-30',
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Explainable AI Outcome Diagnostics</h1>
          <p className="text-xs text-slate-500">
            Transparent machine learning diagnostics explaining outcome probabilities, positive drivers, and risk factors
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              refetchLearner()
              refetchPlacement()
            }}
            className="text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recalculate</span>
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            <BrainCircuit className="h-4 w-4" /> Transparent XAI (No Black Boxes)
          </span>
        </div>
      </div>

      {/* Primary Placement Likelihood Card */}
      {placementPred && (
        <ExplainablePredictionCard
          prediction={placementPred}
          learnerName={learner.fullName}
          onIntervene={() => setIsInterventionOpen(true)}
        />
      )}

      {/* 90-Day Retention Friction Diagnostic */}
      {attritionPred && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">90-Day Job Retention & Friction Early Warning</h2>
            <span className="text-xs font-mono text-slate-400">Model: {attritionPred.modelVersion}</span>
          </div>
          <ExplainablePredictionCard
            prediction={attritionPred}
            learnerName={learner.fullName}
            onIntervene={() => setIsInterventionOpen(true)}
          />
        </div>
      )}

      {/* Methodology Explainability Explainer */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-5">
        <div className="flex items-start gap-3">
          <HelpCircle className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h3 className="text-xs font-bold text-slate-900">How SkillTrack Calculates Outcome Likelihood</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              SkillTrack uses an interpretable tree-ensemble scoring framework trained on historical longitudinal outcomes across PMKVY, DDU-GKY, and NULM cohorts. Every prediction decomposes into additive attribution weights (SHAP values):
            </p>
            <ul className="text-xs text-slate-500 list-disc pl-5 pt-1 space-y-0.5">
              <li><strong>Competency Alignment (30%):</strong> Overlap between candidate verified skills and live employer demand.</li>
              <li><strong>Assessment Rigor (30%):</strong> Practical lab scores and NCVET certification performance.</li>
              <li><strong>Attendance Consistency (25%):</strong> Diligence throughout the 480-hour training phase.</li>
              <li><strong>Interview Readiness (15%):</strong> Communication, mock screening scores, and employer presentation.</li>
            </ul>
          </div>
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
