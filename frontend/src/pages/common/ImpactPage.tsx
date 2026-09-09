import React from 'react'
import { GovernmentImpact } from '../government/GovernmentImpact'

export const ImpactPage: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-slate-900 text-white p-6 mb-6">
        <h1 className="text-2xl font-black">Public Outcome Transparency & Impact Portal</h1>
        <p className="text-slate-300 text-xs mt-1">
          Open data outcome intelligence demonstrating long-term value created by public skilling investments
        </p>
      </div>
      <GovernmentImpact />
    </div>
  )
}
