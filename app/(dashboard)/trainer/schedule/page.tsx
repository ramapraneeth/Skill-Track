'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

interface ScheduleSlot {
  day: string;
  time: string;
  batchCode: string;
  courseTitle: string;
  venue: string;
  type: 'Practical Lab' | 'Theory Lecture' | 'Assessment / Quiz';
}

const SCHEDULE_DATA: ScheduleSlot[] = [
  { day: 'Monday', time: '09:00 - 11:00', batchCode: 'BATCH-2026-WD01', courseTitle: 'Web Architecture & Modern Styling', venue: 'Lab 3 (Room 204)', type: 'Practical Lab' },
  { day: 'Monday', time: '11:30 - 13:00', batchCode: 'BATCH-2026-WD01', courseTitle: 'React Hooks & State Management', venue: 'Lecture Hall 1', type: 'Theory Lecture' },
  { day: 'Tuesday', time: '09:00 - 13:00', batchCode: 'BATCH-2026-WD01', courseTitle: 'Database Schema Normalization & SQL Queries', venue: 'Lab 3 (Room 204)', type: 'Practical Lab' },
  { day: 'Wednesday', time: '09:30 - 12:30', batchCode: 'BATCH-2026-AI02', courseTitle: 'Python Data Structures & NumPy Ops', venue: 'AI Center Lab 1', type: 'Practical Lab' },
  { day: 'Wednesday', time: '14:00 - 15:30', batchCode: 'BATCH-2026-WD01', courseTitle: 'Remedial Doubt Clearing & Debugging Session', venue: 'Seminar Room B', type: 'Theory Lecture' },
  { day: 'Thursday', time: '09:00 - 13:00', batchCode: 'BATCH-2026-WD01', courseTitle: 'Next.js App Routing & API Route Handlers', venue: 'Lab 3 (Room 204)', type: 'Practical Lab' },
  { day: 'Friday', time: '10:00 - 12:00', batchCode: 'BATCH-2026-WD01', courseTitle: 'Module 3 Practical Skills Evaluation', venue: 'Testing Hall A', type: 'Assessment / Quiz' },
];

export default function TrainerSchedulePage() {
  const [selectedDay, setSelectedDay] = useState('All');

  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const filtered = selectedDay === 'All'
    ? SCHEDULE_DATA
    : SCHEDULE_DATA.filter((s) => s.day === selectedDay);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Training Timetable & Class Schedule"
        subtitle="NSTI Ramanthapur • Weekly laboratory allocations and theory lecture timetable"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Class Schedule' },
        ]}
        actions={
          <button
            onClick={() => alert('Schedule timetable exported as printable PDF.')}
            className="px-3.5 py-2 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <span>📥</span> Download Timetable PDF
          </button>
        }
      />

      {/* Day Filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              selectedDay === day
                ? 'bg-[#0B3B60] text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Grid */}
      <div className="space-y-3">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-4">
              <div className="w-20 text-center shrink-0 bg-slate-100 p-2 rounded">
                <span className="text-[11px] font-bold text-slate-600 uppercase block">{item.day}</span>
                <span className="text-[10px] text-slate-500 font-medium">{item.time}</span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      item.type === 'Practical Lab'
                        ? 'bg-blue-100 text-blue-800'
                        : item.type === 'Assessment / Quiz'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {item.type}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">{item.batchCode}</span>
                </div>
                <h3 className="font-semibold text-slate-900 text-sm mt-1">{item.courseTitle}</h3>
                <p className="text-xs text-slate-600 mt-0.5">Venue: {item.venue}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs w-full sm:w-auto justify-end">
              <button
                onClick={() => alert(`Attendance register opened for ${item.batchCode}`)}
                className="px-3 py-1.5 rounded bg-[#0B3B60] text-white font-semibold hover:bg-[#082a47]"
              >
                Launch Lab Session
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
