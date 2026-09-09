import React from 'react'
import { mockGovernmentAnalytics } from '../../data/mockData'
import { LineChart, TrendingUp, Building, MapPin, Briefcase } from 'lucide-react'

export const JobDemandPage: React.FC = () => {
  const topHiringSectors = [
    { sector: 'IT-ITeS & Data Operations', vacancies: 14200, growth: '+34% YoY', avgWage: '₹22,500/mo' },
    { sector: 'Logistics, Warehousing & Supply Chain', vacancies: 18500, growth: '+28% YoY', avgWage: '₹18,000/mo' },
    { sector: 'Healthcare, Nursing & Patient Care', vacancies: 12400, growth: '+22% YoY', avgWage: '₹19,000/mo' },
    { sector: 'Green Energy & Solar Installation', vacancies: 8900, growth: '+46% YoY', avgWage: '₹17,500/mo' },
    { sector: 'Electronics & Hardware Assembly', vacancies: 9800, growth: '+19% YoY', avgWage: '₹16,500/mo' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">Industry Job Demand & Vacancy Heatmap</h1>
          <p className="text-xs text-slate-500">
            Macro analysis of real-time employment demand by sector, growth velocity, and geography
          </p>
        </div>
      </div>

      {/* Top Hiring Sectors */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 mb-4">High-Demand Employment Sectors</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topHiringSectors.map((sec, i) => (
            <div key={i} className="rounded-xl border border-slate-200 p-4 bg-slate-50/40 text-xs space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-slate-900 text-sm">{sec.sector}</h3>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                  {sec.growth}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-slate-500">Active Vacancies:</span>
                <span className="font-bold font-mono text-slate-900">{sec.vacancies.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Median Monthly Wage:</span>
                <span className="font-bold font-mono text-indigo-700">{sec.avgWage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
