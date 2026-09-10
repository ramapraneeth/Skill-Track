'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { sidhStore } from '@/lib/sidh-store';

export default function TrainerAttendancePage() {
  const learners = sidhStore.getLearners();
  const batches = sidhStore.getBatches();

  const [selectedBatch, setSelectedBatch] = useState(batches[0]?.id || 'batch-1');
  const [attendanceDate, setAttendanceDate] = useState('2026-09-10');
  const [attendanceMap, setAttendanceMap] = useState<Record<string, 'present' | 'absent' | 'excused'>>(
    learners.reduce((acc, l) => ({ ...acc, [l.id]: 'present' }), {})
  );

  const [syncNotice, setSyncNotice] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const setStatus = (id: string, status: 'present' | 'absent' | 'excused') => {
    setAttendanceMap({ ...attendanceMap, [id]: status });
  };

  const markAll = (status: 'present' | 'absent') => {
    const updated: Record<string, 'present' | 'absent' | 'excused'> = {};
    learners.forEach((l) => {
      updated[l.id] = status;
    });
    setAttendanceMap(updated);
  };

  const handleSyncBiometric = () => {
    setSyncNotice(true);
    setTimeout(() => {
      setSyncNotice(false);
      alert('AEBAS Biometric Reader at NSTI Gate & Lab 3 synced successfully! 4 punch records updated.');
    }, 1200);
  };

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const total = learners.length;
  const presentCount = Object.values(attendanceMap).filter((s) => s === 'present').length;
  const absentCount = Object.values(attendanceMap).filter((s) => s === 'absent').length;
  const excusedCount = Object.values(attendanceMap).filter((s) => s === 'excused').length;
  const rate = total > 0 ? Math.round((presentCount / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Daily Attendance & AEBAS Punch Register"
        subtitle="Record candidate presence, verify biometric thumbprints, and submit daily muster roll"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Attendance' },
        ]}
        actions={
          <div className="flex gap-2">
            <button
              onClick={handleSyncBiometric}
              disabled={syncNotice}
              className="px-3.5 py-2 text-xs font-semibold rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
            >
              <span>🔄</span> {syncNotice ? 'Syncing AEBAS...' : 'Sync Biometric Terminal'}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
            >
              <span>💾</span> Submit Register
            </button>
          </div>
        }
      />

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md text-xs font-semibold">
          ✓ Daily attendance muster roll for {attendanceDate} successfully submitted and cryptographically signed!
        </div>
      )}

      {/* Control Bar & Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 bg-white p-4 rounded-lg border border-slate-200 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Active Batch</label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="px-3 py-1.5 text-xs rounded border border-slate-300 font-semibold"
              >
                {batches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.code})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-slate-500 mb-1">Session Date</label>
              <input
                type="date"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="px-3 py-1.5 text-xs rounded border border-slate-300 font-semibold"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => markAll('present')}
              className="px-3 py-1.5 text-xs font-medium rounded bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
            >
              Mark All Present
            </button>
            <button
              onClick={() => markAll('absent')}
              className="px-3 py-1.5 text-xs font-medium rounded bg-red-50 text-red-800 border border-red-200 hover:bg-red-100"
            >
              Mark All Absent
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="md:col-span-4 bg-white p-4 rounded-lg border border-slate-200 flex items-center justify-around text-center shadow-sm">
          <div>
            <span className="text-slate-500 text-[11px] block">Present</span>
            <span className="text-lg font-bold text-emerald-700">{presentCount}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-slate-500 text-[11px] block">Absent</span>
            <span className="text-lg font-bold text-red-700">{absentCount}</span>
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div>
            <span className="text-slate-500 text-[11px] block">Compliance</span>
            <span className="text-lg font-bold text-[#0B3B60]">{rate}%</span>
          </div>
        </div>
      </div>

      {/* Muster Roll Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Roll No.</th>
              <th className="py-3 px-4">Candidate Name</th>
              <th className="py-3 px-4">Aadhaar Status</th>
              <th className="py-3 px-4">Biometric Punch Time</th>
              <th className="py-3 px-4 text-center">Attendance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {learners.map((l, idx) => {
              const currentStatus = attendanceMap[l.id] || 'present';
              return (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                    HYD-26-{String(idx + 101).padStart(3, '0')}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{l.name}</div>
                    <div className="text-[11px] text-slate-500">{l.phone}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-emerald-700 font-medium">✓ UIDAI Verified</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                    {currentStatus === 'present' ? '08:54 AM (Terminal #2)' : '—'}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="inline-flex rounded-md shadow-sm border border-slate-300 p-0.5 bg-slate-100">
                      <button
                        onClick={() => setStatus(l.id, 'present')}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          currentStatus === 'present'
                            ? 'bg-emerald-700 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Present
                      </button>
                      <button
                        onClick={() => setStatus(l.id, 'absent')}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          currentStatus === 'absent'
                            ? 'bg-red-700 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => setStatus(l.id, 'excused')}
                        className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                          currentStatus === 'excused'
                            ? 'bg-amber-600 text-white shadow-sm'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        Excused
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
