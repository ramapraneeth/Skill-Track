'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GovTechHeader } from '@/components/layout/GovTechHeader';
import { GovTechFooter } from '@/components/layout/GovTechFooter';
import { UnifiedLoginModal } from '@/components/ui/UnifiedLoginModal';
import {
  TrendingUp,
  ShieldCheck,
  Award,
  Users,
  Building2,
  Landmark,
  ArrowRight,
  Activity,
  Layers,
  FileCheck,
  Target,
} from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('skilltrack_user');
    if (saved) {
      try {
        setCurrentUser(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const handleLoginSuccess = (user: any) => {
    setCurrentUser(user);
    if (user.role === 'learner') router.push('/learner/dashboard');
    else if (user.role === 'provider') router.push('/provider/dashboard');
    else router.push('/government/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('skilltrack_token');
    localStorage.removeItem('skilltrack_user');
    localStorage.removeItem('skilltrack_role');
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <GovTechHeader
        user={currentUser}
        onOpenLogin={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#0B3B60] to-[#002541] text-white py-16 sm:py-24 border-b border-[#0B3B60]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-white/10 text-white border border-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-[#FF9933]" />
              <span>Smart India Hackathon (SIH) Outcome Intelligence Platform</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
              Track Skills. Measure Outcomes. <br className="hidden sm:inline" />
              <span className="text-[#FF9933]">Shape Careers.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#D1D9E2] max-w-2xl mx-auto font-normal leading-relaxed">
              Traditional skilling systems measure enrollment and certifications. SkillTrack measures what happens after skilling: employment, retention, wage progression, and lifelong impact.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsLoginOpen(true)}
                className="w-full sm:w-auto h-11 px-6 rounded bg-[#FF9933] hover:bg-[#E65100] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all uppercase tracking-wider"
              >
                <span>Login to Unified Cockpit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => router.push('/outcome-intelligence')}
                className="w-full sm:w-auto h-11 px-6 rounded bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center justify-center gap-2 border border-white/30 transition-all"
              >
                <span>Explore Outcome Intelligence Hub</span>
              </button>
            </div>
          </div>
        </section>

        {/* 7-Stage Longitudinal Closed Loop */}
        <section className="py-14 bg-white border-b border-[#D1D9E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#006876] uppercase tracking-wider">
                Longitudinal Intelligence Cycle
              </span>
              <h2 className="text-2xl font-black text-[#102A43] mt-1">
                The Closed-Loop Skilling Telemetry
              </h2>
              <p className="text-xs text-[#627D98] mt-1.5 leading-relaxed">
                Operating downstream from national skilling portals to protect public investment and verify genuine economic uplift
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
              {[
                { stage: '1. Track', label: 'Candidate Milestones', icon: Activity },
                { stage: '2. Diagnose', label: 'Skill Gap Vectors', icon: Target },
                { stage: '3. Predict', label: 'Placement & Attrition', icon: TrendingUp },
                { stage: '4. Intervene', label: 'Targeted Upskilling', icon: Layers },
                { stage: '5. Follow-up', label: '30-90 Day Checks', icon: FileCheck },
                { stage: '6. Measure', label: 'Wage Progression', icon: Award },
                { stage: '7. Improve', label: 'Curriculum Feedback', icon: ShieldCheck },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 bg-[#F8FAFC] border border-[#D1D9E2] rounded-md text-center flex flex-col items-center justify-between"
                  >
                    <div className="w-8 h-8 rounded bg-[#0B3B60]/10 text-[#0B3B60] flex items-center justify-center mb-2">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="font-extrabold text-xs text-[#0B3B60]">{item.stage}</div>
                    <div className="text-[11px] text-[#627D98] mt-0.5">{item.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3 Institutional Portals */}
        <section className="py-14 bg-[#F0F4F8] border-b border-[#D1D9E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold text-[#E65100] uppercase tracking-wider">
                Institutional Access Portals
              </span>
              <h2 className="text-2xl font-black text-[#102A43] mt-1">
                Purpose-Built Stakeholder Cockpits
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  role: 'learner',
                  title: 'Learner Cockpit',
                  desc: 'Track your career journey, certified credentials, skill match scores against live vacancies, and wage growth.',
                  icon: Users,
                  route: '/learner/dashboard',
                  stats: '30+ Candidate Longitudinal Profiles',
                },
                {
                  role: 'provider',
                  title: 'Training Provider Portal',
                  desc: 'Monitor batch completion rates, manage 30/90-day retention surveys, and maintain SMART Grade accreditation.',
                  icon: Building2,
                  route: '/provider/dashboard',
                  stats: '5 Accredited Training Partners',
                },
                {
                  role: 'government',
                  title: 'Government / Mission Cockpit',
                  desc: 'Access real-time macro funnels, scheme comparison matrices, district league tables, and policy impact measurements.',
                  icon: Landmark,
                  route: '/government/dashboard',
                  stats: 'National & State Level Telemetry',
                },
              ].map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-[#D1D9E2] rounded-md p-6 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded bg-[#0B3B60] text-white flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#102A43]">{card.title}</h3>
                      <p className="text-xs text-[#627D98] mt-2 leading-relaxed">{card.desc}</p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-[#006876]">{card.stats}</span>
                      <button
                        onClick={() => setIsLoginOpen(true)}
                        className="text-xs font-bold text-[#0B3B60] hover:text-[#002541] flex items-center gap-1"
                      >
                        <span>Access Portal</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <GovTechFooter />

      <UnifiedLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </div>
  );
}
