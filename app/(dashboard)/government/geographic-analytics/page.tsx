'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

export default function GovernmentGeographicAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<'states' | 'aspirational'>('states');

  const statesData = [
    { state: 'Uttar Pradesh', trained: '210,400', placed: '143,072', placementRate: '68%', centers: 2340, fundsDisbursed: '₹480 Cr' },
    { state: 'Maharashtra', trained: '184,200', placed: '136,308', placementRate: '74%', centers: 1820, fundsDisbursed: '₹420 Cr' },
    { state: 'Tamil Nadu', trained: '118,500', placed: '88,875', placementRate: '75%', centers: 1210, fundsDisbursed: '₹310 Cr' },
    { state: 'Karnataka', trained: '122,800', placed: '93,328', placementRate: '76%', centers: 1150, fundsDisbursed: '₹325 Cr' },
    { state: 'Telangana', trained: '94,600', placed: '73,788', placementRate: '78%', centers: 890, fundsDisbursed: '₹280 Cr' },
    { state: 'Gujarat', trained: '105,100', placed: '76,723', placementRate: '73%', centers: 980, fundsDisbursed: '₹295 Cr' },
    { state: 'Rajasthan', trained: '88,200', placed: '59,976', placementRate: '68%', centers: 810, fundsDisbursed: '₹220 Cr' },
  ];

  const aspirationalDistricts = [
    { district: 'Komaram Bheem Asifabad', state: 'Telangana', trained: '4,200', placementRate: '72%', focusSector: 'Handloom & Agri-Tech' },
    { district: 'Nuh (Mewat)', state: 'Haryana', trained: '6,800', placementRate: '69%', focusSector: 'Automotive & Logistics' },
    { district: 'Baramulla', state: 'Jammu & Kashmir', trained: '5,100', placementRate: '74%', focusSector: 'Horticulture & IT' },
    { district: 'Wayanad', state: 'Kerala', trained: '3,900', placementRate: '81%', focusSector: 'Eco-Tourism & Food Processing' },
    { district: 'Dahod', state: 'Gujarat', trained: '5,600', placementRate: '70%', focusSector: 'Electrical & Welding' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Geographic Analytics & Regional Penetration"
        subtitle="State-wise implementation metrics, rural skilling equity, and NITI Aayog Aspirational Districts"
        breadcrumbs={[
          { label: 'Government Portal', href: '/government/dashboard' },
          { label: 'Geographic Analytics' },
        ]}
        actions={
          <button
            onClick={() => alert('Geographic penetration atlas exported as PDF.')}
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>🗺️</span> Export Geographic Atlas
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6">
        <button
          onClick={() => setActiveTab('states')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'states'
              ? 'border-[#0B3B60] text-[#0B3B60]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          State & UT Performance Rankings
        </button>
        <button
          onClick={() => setActiveTab('aspirational')}
          className={`pb-3 text-sm font-semibold border-b-2 transition-colors ${
            activeTab === 'aspirational'
              ? 'border-[#0B3B60] text-[#0B3B60]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Aspirational Districts Program (112 Districts)
        </button>
      </div>

      {activeTab === 'states' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">State / UT</th>
                <th className="py-3 px-4">Candidates Trained</th>
                <th className="py-3 px-4">Placed In Industry</th>
                <th className="py-3 px-4">Placement Rate</th>
                <th className="py-3 px-4">Accredited TCs</th>
                <th className="py-3 px-4">PFMS Funds Disbursed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {statesData.map((st, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{st.state}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{st.trained}</td>
                  <td className="py-3.5 px-4 text-slate-700">{st.placed}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">{st.placementRate}</td>
                  <td className="py-3.5 px-4 text-slate-700">{st.centers} Centers</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#0B3B60]">{st.fundsDisbursed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'aspirational' && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Aspirational District</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Youth Trained</th>
                <th className="py-3 px-4">Placement Success</th>
                <th className="py-3 px-4">Key Priority Sector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {aspirationalDistricts.map((ad, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-bold text-slate-900">{ad.district}</td>
                  <td className="py-3.5 px-4 text-slate-700">{ad.state}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{ad.trained}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-700">{ad.placementRate}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 text-[11px] font-medium">
                      {ad.focusSector}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
