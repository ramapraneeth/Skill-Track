import React from 'react'
import { useLearnerTimeline } from '../../api/queries'
import { TimelineView } from '../../components/common/TimelineView'
import { LoadingSkeleton } from '../../components/common/LoadingSkeleton'
import { ErrorMessage } from '../../components/common/ErrorMessage'
import { EmptyState } from '../../components/common/EmptyState'
import { GitCommit, Calendar, ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react'

export const LearnerTimeline: React.FC = () => {
  const { data: events = [], isLoading, isError, refetch } = useLearnerTimeline('learner-1')

  if (isLoading) {
    return (
      <div className="space-y-6">
        <LoadingSkeleton variant="card" count={2} />
      </div>
    )
  }

  if (isError) {
    return (
      <ErrorMessage
        title="Failed to load timeline stream"
        message="Unable to load chronological milestone history."
        onRetry={() => refetch()}
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Longitudinal Milestone Trajectory</h1>
          <p className="text-xs text-slate-500">
            Chronological audit trail of learner skilling, certification, placement, and retention check-ins
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1.5 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync</span>
          </button>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            <GitCommit className="h-4 w-4" /> Real-time Audit Stream
          </span>
        </div>
      </div>

      <TimelineView events={events} />

      {/* Detailed Chronological Log Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-4">Milestone Event Log & Audit Metadata</h2>
        {events.length === 0 ? (
          <EmptyState title="No milestone events found" description="Events will appear as the candidate progresses." />
        ) : (
          <div className="space-y-4">
            {events.map((evt: any) => (
              <div
                key={evt.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 p-4 text-xs gap-3 bg-slate-50/40"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{evt.title}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        evt.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : evt.status === 'at_risk'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {evt.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed max-w-2xl">{evt.description}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="font-mono text-slate-500 font-medium block">{evt.date}</span>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">
                    Milestone: {evt.milestone}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
