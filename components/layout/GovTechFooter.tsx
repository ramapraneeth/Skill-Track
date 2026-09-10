import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export const GovTechFooter: React.FC = () => {
  return (
    <footer className="bg-[#002541] text-[#D1D9E2] text-xs py-10 border-t border-[#0B3B60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-white text-[#002541] font-black text-sm flex items-center justify-center">
                ST
              </div>
              <span className="font-bold text-white text-sm">SkillTrack National Outcome Platform</span>
            </div>
            <p className="text-[#9FB3C8] max-w-md leading-relaxed text-xs">
              National Digital Platform for Longitudinal Skilling Outcome Intelligence, Tracking, and Impact Measurement across national and state skilling initiatives.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Institutional Modules</h4>
            <ul className="space-y-2 text-[#9FB3C8]">
              <li><Link href="/outcome-intelligence/outcomes" className="hover:text-white transition-colors">Longitudinal Registry</Link></li>
              <li><Link href="/outcome-intelligence/evidence" className="hover:text-white transition-colors">Milestone Proof Verification</Link></li>
              <li><Link href="/outcome-intelligence/analytics" className="hover:text-white transition-colors">National Funnel Analytics</Link></li>
              <li><Link href="/outcome-intelligence/insights" className="hover:text-white transition-colors">Explainable Risk Detection</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider mb-3">Security & Compliance</h4>
            <div className="flex items-center gap-2 text-[#9FB3C8]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Bcrypt / Signed JWT Encryption</span>
            </div>
            <p className="text-[11px] text-[#627D98] mt-2">
              Integrated with Neon PostgreSQL Cloud. Fully parameterized queries with role-based access control.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#0B3B60]/60 flex flex-col sm:flex-row items-center justify-between text-[#627D98] text-[11px]">
          <div>SkillTrack — National Outcome Intelligence Edition</div>
          <div className="mt-2 sm:mt-0 font-medium">Core Positioning: SkillTrack measures what happens after skilling.</div>
        </div>
      </div>
    </footer>
  );
};
