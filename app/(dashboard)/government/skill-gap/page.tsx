'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface RegionSkillGap {
  id: string;
  state: string;
  district: string;
  institution: string;
  gapLevel: 'High' | 'Moderate' | 'Low';
  highDemandSkills: string[];
  availableSkills: string[];
  missingSkills: string[];
  trainingCapacity: number;
  employmentDemand: number;
  netDeficit: number;
}

const REGION_GAPS: RegionSkillGap[] = [
  {
    id: 'rg-1',
    state: 'Telangana',
    district: 'Hyderabad',
    institution: 'National Skill Training Institute (NSTI), Ramanthapur',
    gapLevel: 'High',
    highDemandSkills: ['Cloud Infrastructure & DevOps', 'Full Stack React / Next.js', 'AI Inference Pipelines'],
    availableSkills: ['Core Java', 'Foundation Web Design', 'Manual Software Testing'],
    missingSkills: ['Docker & Kubernetes', 'Vector Search & LLM Ops', 'SQL Schema 3NF'],
    trainingCapacity: 2400,
    employmentDemand: 6800,
    netDeficit: 4400,
  },
  {
    id: 'rg-2',
    state: 'Maharashtra',
    district: 'Pune',
    institution: 'Automotive Vocational Training Center, Pimpri',
    gapLevel: 'High',
    highDemandSkills: ['Electric Vehicle (EV) Powertrain', 'BMS Diagnostics', 'Automotive Embedded C'],
    availableSkills: ['Internal Combustion Engine Tuning', 'Basic Auto Electricals'],
    missingSkills: ['Lithium-ion Cell Balancing', 'CAN Bus Network Protocols'],
    trainingCapacity: 1800,
    employmentDemand: 4200,
    netDeficit: 2400,
  },
  {
    id: 'rg-3',
    state: 'Gujarat',
    district: 'Ahmedabad',
    institution: 'Gujarat State Vocational Institute, Ambawadi',
    gapLevel: 'Moderate',
    highDemandSkills: ['Power BI Enterprise Modeling', 'Financial Data Analytics', 'Advanced DAX'],
    availableSkills: ['Advanced Excel', 'Basic Tally ERP'],
    missingSkills: ['Data Warehousing ETL', 'Python Statistical Pipelines'],
    trainingCapacity: 2200,
    employmentDemand: 3100,
    netDeficit: 900,
  },
  {
    id: 'rg-4',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    institution: 'Government Tool Room & Training Centre (GTTC)',
    gapLevel: 'High',
    highDemandSkills: ['Semiconductor Packaging', 'VLSI Design', 'Industrial IoT Telemetry'],
    availableSkills: ['PCB Soldering', 'Basic Electronic Circuitry'],
    missingSkills: ['Clean Room Fab Operations', 'High-Speed Signal Inspection'],
    trainingCapacity: 1200,
    employmentDemand: 4600,
    netDeficit: 3400,
  },
  {
    id: 'rg-5',
    state: 'Tamil Nadu',
    district: 'Chennai',
    institution: 'National Cyber Range Training Facility, Guindy',
    gapLevel: 'Low',
    highDemandSkills: ['SOC Threat Hunting', 'SIEM Operations', 'Penetration Testing'],
    availableSkills: ['Network Security', 'Firewall Admin', 'Wireshark Inspection'],
    missingSkills: ['Cloud Security Posture Management (CSPM)'],
    trainingCapacity: 1600,
    employmentDemand: 1850,
    netDeficit: 250,
  },
];

export default function GovernmentSkillGapMapPage() {
  const [drillLevel, setDrillLevel] = useState<'Country' | 'State' | 'District' | 'Institution'>('Country');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedGapFilter, setSelectedGapFilter] = useState<string>('All');

  const filtered = REGION_GAPS.filter((r) => {
    const matchesState = selectedState === 'All' || r.state === selectedState;
    const matchesGap = selectedGapFilter === 'All' || r.gapLevel === selectedGapFilter;
    return matchesState && matchesGap;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="National Skill Gap Map & Capacity Intelligence"
        subtitle="Interactive econometric heatmap analyzing regional industry labor demand versus accredited training capacity"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Skill Gap Map' },
        ]}
        actions={
          <button
            onClick={() => alert('Regional capacity shortfall bulletin exported for State Skill Mission Directors.')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#1D4ED8] text-white hover:bg-blue-800 shadow-xs flex items-center gap-1.5"
          >
            <span>🗺️</span> Export Skill Gap Atlas
          </button>
        }
      />

      {/* Drill-down breadcrumb bar as requested in Section 14 */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <span>Drill-down Scope:</span>
          {(['Country', 'State', 'District', 'Institution'] as const).map((lvl, idx) => (
            <React.Fragment key={lvl}>
              <button
                onClick={() => setDrillLevel(lvl)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  drillLevel === lvl
                    ? 'bg-[#1D4ED8] text-white font-bold shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lvl}
              </button>
              {idx < 3 && <span>→</span>}
            </React.Fragment>
          ))}
        </div>

        <div className="flex gap-2">
          {['All', 'High', 'Moderate', 'Low'].map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGapFilter(g)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                selectedGapFilter === g
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              {g === 'All' ? 'All Gaps' : `${g} Gap`}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Map Style Cards Grid */}
      <div className="space-y-4">
        {filtered.map((region) => {
          const capacityPercent = Math.round((region.trainingCapacity / region.employmentDemand) * 100);
          return (
            <div
              key={region.id}
              className={`p-5 rounded-xl border shadow-xs bg-white dark:bg-slate-900 transition-all ${
                region.gapLevel === 'High'
                  ? 'border-l-4 border-l-red-500 border-slate-200 dark:border-slate-800'
                  : region.gapLevel === 'Moderate'
                  ? 'border-l-4 border-l-amber-500 border-slate-200 dark:border-slate-800'
                  : 'border-l-4 border-l-emerald-500 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                      {region.district}, {region.state}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        region.gapLevel === 'High'
                          ? 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300'
                          : region.gapLevel === 'Moderate'
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      }`}
                    >
                      {region.gapLevel} Skill Gap ({100 - capacityPercent}% Deficit)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{region.institution}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">Net Skill Deficit</span>
                  <span className="text-base font-black text-red-700 dark:text-red-400">
                    -{region.netDeficit.toLocaleString()} Technicians
                  </span>
                </div>
              </div>

              {/* Demand vs Capacity Telemetry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Training Capacity vs Demand:</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {region.trainingCapacity.toLocaleString()} / {region.employmentDemand.toLocaleString()}
                    </span>
                  </div>
                  <ProgressBar value={capacityPercent} max={100} color={capacityPercent < 50 ? '#ef4444' : '#f59e0b'} />
                  <span className="text-[10px] text-slate-500">{capacityPercent}% Training Fulfillment</span>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block text-[11px] mb-1">High-Demand Emerging Skills:</span>
                  <div className="flex flex-wrap gap-1">
                    {region.highDemandSkills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-[10px] font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-red-600 dark:text-red-400 font-semibold block text-[11px] mb-1">
                    Critical Missing Pipeline Skills:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {region.missingSkills.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 text-[10px] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  onClick={() => alert(`Seat reallocation order dispatched to ${region.institution} (+${region.netDeficit} seats).`)}
                  className="px-3 py-1 font-semibold rounded bg-[#1D4ED8] hover:bg-blue-800 text-white shadow-2xs"
                >
                  Authorize Capacity Expansion
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
