import React, { useState } from 'react'
import { TimelineEvent } from '../../types'
import { Check, Calendar } from 'lucide-react'

interface TimelineViewProps {
  events: TimelineEvent[]
  currentMilestone?: string
}

export const TimelineView: React.FC<TimelineViewProps> = ({ events }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(events[0]?.id || '')

  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0]

  return (
    <div className="rounded-md border border-[#D1D9E2] bg-white p-6 shadow-2xs">
      <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-sm font-bold text-[#002541] tracking-tight">Longitudinal Outcome Timeline</h3>
          <p className="text-xs text-[#718096]">
            End-to-end milestone journey from initial enrollment through sustained multi-month retention
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-[#4A5568] bg-[#F4F6F9] border border-[#D1D9E2] px-2.5 py-1 rounded w-fit font-medium">
          <Calendar className="h-3.5 w-3.5 text-[#0B3B60]" />
          <span>Longitudinal Audit Active</span>
        </span>
      </div>

      {/* Horizontal Stepper */}
      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-[760px] items-center justify-between relative px-4">
          {/* Connecting Spine Line */}
          <div className="absolute left-8 right-8 top-4 h-0.5 bg-[#D1D9E2] -z-0" />

          {events.map((evt) => {
            const isSelected = evt.id === selectedEventId
            const isDone = evt.status === 'completed'
            const isCurrent = evt.status === 'in_progress' || evt.status === 'at_risk'

            return (
              <div
                key={evt.id}
                onClick={() => setSelectedEventId(evt.id)}
                className="group relative z-10 flex flex-col items-center cursor-pointer select-none"
              >
                {/* Stepper Node Disk */}
                {isDone ? (
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#028090] text-white shadow-xs transition-all ${
                      isSelected ? 'ring-3 ring-[#0B3B60]/30 scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                ) : isCurrent ? (
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-white border-3 border-[#0B3B60] transition-all ${
                      isSelected ? 'ring-3 ring-[#0B3B60]/30 scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className="h-2.5 w-2.5 rounded-full bg-[#0B3B60]" />
                  </div>
                ) : (
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-[#D1D9E2] transition-all ${
                      isSelected ? 'border-[#0B3B60] ring-2 ring-[#0B3B60]/20' : 'hover:border-[#718096]'
                    }`}
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-[#D1D9E2]" />
                  </div>
                )}

                {/* Node Metadata Label */}
                <div className="mt-2.5 text-center max-w-[95px]">
                  <p
                    className={`text-[11px] font-bold truncate ${
                      isSelected
                        ? 'text-[#0B3B60]'
                        : isDone
                        ? 'text-[#1C2733]'
                        : 'text-[#718096]'
                    }`}
                  >
                    {evt.title}
                  </p>
                  <p className="text-[10px] text-[#718096] font-mono mt-0.5">{evt.date}</p>
                </div>

                {isCurrent && (
                  <span className="absolute -top-6 text-[9px] font-bold text-[#E65100] bg-[#FFF3E0] border border-[#FFCC80] px-1.5 py-0.2 rounded whitespace-nowrap uppercase">
                    Active Milestone
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Step Deep Dive Card */}
      {selectedEvent && (
        <div className="mt-4 rounded border border-[#D1D9E2] bg-[#F4F6F9] p-4 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#718096]">
                  Milestone Details:
                </span>
                <h4 className="text-xs font-bold text-[#002541]">{selectedEvent.title}</h4>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${
                    selectedEvent.status === 'completed'
                      ? 'bg-[#E6F4EA] text-[#137333] border-[#A8DAB5]'
                      : selectedEvent.status === 'at_risk'
                      ? 'bg-[#FCE8E6] text-[#C5221F] border-[#F5A9A4]'
                      : selectedEvent.status === 'in_progress'
                      ? 'bg-[#FFF3E0] text-[#E65100] border-[#FFCC80]'
                      : 'bg-slate-200 text-[#4A5568] border-slate-300'
                  }`}
                >
                  {selectedEvent.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-[#4A5568] leading-relaxed">{selectedEvent.description}</p>
            </div>
            <span className="text-xs font-mono font-semibold text-[#718096] whitespace-nowrap">
              {selectedEvent.date}
            </span>
          </div>

          {selectedEvent.details && (
            <div className="mt-3 grid grid-cols-2 gap-2 pt-3 border-t border-[#E2E8F0] sm:grid-cols-4">
              {Object.entries(selectedEvent.details).map(([k, v]) => (
                <div key={k} className="bg-white rounded border border-[#D1D9E2] p-2.5 text-xs">
                  <span className="text-[10px] uppercase font-bold text-[#718096] block tracking-wider">
                    {k.replace(/([A-Z])/g, ' $1')}
                  </span>
                  <span className="font-semibold text-[#1C2733] font-mono mt-0.5 block">{String(v)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
