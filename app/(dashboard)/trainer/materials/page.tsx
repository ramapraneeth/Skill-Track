'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';

interface MaterialItem {
  id: string;
  title: string;
  type: 'PDF Handbook' | 'Lab Exercise' | 'Slide Deck' | 'Code Repository';
  unit: string;
  size: string;
  updatedAt: string;
}

const INITIAL_MATERIALS: MaterialItem[] = [
  { id: 'mat-1', title: 'NSQF Level 5 Participant Handbook - Web Development', type: 'PDF Handbook', unit: 'All Modules', size: '14.2 MB', updatedAt: '02 Sep 2026' },
  { id: 'mat-2', title: 'Lab Manual 03: React Hooks and Context Implementation', type: 'Lab Exercise', unit: 'Module 3', size: '2.4 MB', updatedAt: '06 Sep 2026' },
  { id: 'mat-3', title: 'Presentation: Database Architecture & Relational Schema', type: 'Slide Deck', unit: 'Module 4', size: '8.7 MB', updatedAt: '08 Sep 2026' },
  { id: 'mat-4', title: 'Starter Codebase: REST API Routes & TypeScript Boilerplate', type: 'Code Repository', unit: 'Module 4', size: '1.1 MB', updatedAt: '09 Sep 2026' },
  { id: 'mat-5', title: 'Trainer Facilitator Guide: NSQF Practical Rubrics', type: 'PDF Handbook', unit: 'Assessment', size: '4.5 MB', updatedAt: '20 Aug 2026' },
];

export default function TrainerMaterialsPage() {
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'PDF Handbook' | 'Lab Exercise' | 'Slide Deck' | 'Code Repository'>('Lab Exercise');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newDoc: MaterialItem = {
      id: `mat-${Date.now()}`,
      title: newTitle.trim(),
      type: newType,
      unit: 'Module 3 & 4',
      size: '3.8 MB',
      updatedAt: 'Just now',
    };
    setMaterials([newDoc, ...materials]);
    setNewTitle('');
    setShowUploadModal(false);
    alert('Material uploaded and published to candidate portal view!');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Training Materials & Digital Library"
        subtitle="Participant handbooks, practical lab exercise sheets, slide decks, and code starter repositories"
        breadcrumbs={[
          { label: 'Trainer Portal', href: '/trainer/dashboard' },
          { label: 'Training Materials' },
        ]}
        actions={
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-3.5 py-2 text-xs font-semibold rounded bg-[#0B3B60] text-white hover:bg-[#082a47] shadow-sm flex items-center gap-1.5"
          >
            <span>📤</span> Upload Resource
          </button>
        }
      />

      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
            <tr>
              <th className="py-3 px-4">Resource Document</th>
              <th className="py-3 px-4">Resource Type</th>
              <th className="py-3 px-4">Curriculum Unit</th>
              <th className="py-3 px-4">File Size</th>
              <th className="py-3 px-4">Updated Date</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {materials.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50">
                <td className="py-3.5 px-4">
                  <div className="font-semibold text-slate-900">{m.title}</div>
                  <div className="text-slate-400 text-[11px]">NSQF SSC IT-ITeS Approved Content</div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium">
                    {m.type}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-700">{m.unit}</td>
                <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">{m.size}</td>
                <td className="py-3.5 px-4 text-slate-600">{m.updatedAt}</td>
                <td className="py-3.5 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => alert(`Downloading "${m.title}"...`)}
                      className="px-2.5 py-1 text-xs font-semibold rounded bg-blue-50 text-[#0B3B60] hover:bg-blue-100"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => alert('Candidate access share link copied to clipboard.')}
                      className="px-2 py-1 text-xs text-slate-600 hover:text-slate-900 border border-slate-200 rounded"
                    >
                      Share
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full border border-slate-300 shadow-xl p-6 space-y-4">
            <h3 className="font-semibold text-sm text-slate-900 border-b border-slate-100 pb-2">
              Upload New Training Material
            </h3>
            <form onSubmit={handleUpload} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Document Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab Exercise 4: SQL Queries & Aggregations"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded border-slate-300"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Resource Category *</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded border-slate-300"
                >
                  <option value="Lab Exercise">Lab Exercise</option>
                  <option value="Slide Deck">Slide Deck</option>
                  <option value="PDF Handbook">PDF Handbook</option>
                  <option value="Code Repository">Code Repository</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Select File (PDF, ZIP, PPTX, DOCX)</label>
                <div className="border-2 border-dashed border-slate-300 rounded p-4 text-center text-slate-500 bg-slate-50 hover:bg-slate-100 cursor-pointer">
                  Click or drag files here to attach
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 border rounded text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-[#0B3B60] text-white hover:bg-[#082a47] font-semibold"
                >
                  Upload & Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
