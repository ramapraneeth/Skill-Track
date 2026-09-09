import React, { useState } from 'react'
import {
  Compass,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Building2,
  Activity,
  Layers,
  Search,
  Briefcase,
  AlertTriangle,
  Globe,
  FileCheck2,
  Lock,
} from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { UnifiedLoginModal } from '../../components/ui/UnifiedLoginModal'

export const HomePage: React.FC = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN')

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-[#1C2733] flex flex-col font-sans">
      {/* 1. INSTITUTIONAL TOP BAR & HEADER */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#D1D9E2] shadow-2xs">
        {/* National Tricolor Micro Strip */}
        <div className="h-1 bg-gradient-to-r from-[#E65100] via-white to-[#059669]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & National Attribution */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-[#0B3B60] text-white font-black text-sm tracking-tighter">
              ST
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-[#0B3B60] tracking-tight">SkillTrack</span>
                <span className="text-[10px] bg-[#E8F0F7] text-[#0B3B60] font-bold px-2 py-0.5 rounded border border-[#B4CFE5] uppercase">
                  National Registry
                </span>
              </div>
              <p className="text-[10px] text-[#718096] font-medium hidden sm:block">
                Longitudinal Skilling Outcome Intelligence & Impact Measurement Platform
              </p>
            </div>
          </div>

          {/* Navigation & Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-[#4A5568]">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:text-[#0B3B60] transition">
                About
              </a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="hover:text-[#0B3B60] transition">
                How It Works
              </a>
              <a href="#outcomes" onClick={(e) => { e.preventDefault(); scrollToSection('outcomes'); }} className="hover:text-[#0B3B60] transition">
                Outcomes
              </a>
              <a href="#audience" onClick={(e) => { e.preventDefault(); scrollToSection('audience'); }} className="hover:text-[#0B3B60] transition">
                Stakeholders
              </a>
            </nav>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'EN' ? 'HI' : 'EN')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#4A5568] bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded border border-slate-200 transition"
              title="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#0B3B60]" />
              <span>{language === 'EN' ? 'हिंदी' : 'English'}</span>
            </button>

            {/* Single Unified Login Action Button */}
            <Button
              onClick={() => setIsLoginModalOpen(true)}
              variant="primary"
              size="md"
              leftIcon={<Lock className="w-3.5 h-3.5" />}
            >
              Login
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION */}
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F4F6F9] border-b border-[#D1D9E2] py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Mission Headline & Value Proposition */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#E8F0F7] border border-[#B4CFE5] text-xs font-bold text-[#0B3B60]">
                  <ShieldCheck className="w-4 h-4 text-[#0B3B60]" />
                  <span>Sovereign Skilling Intelligence Layer • Post-Training Focus</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#002541] tracking-tight leading-tight">
                  Track Skills. <br />
                  <span className="text-[#0B3B60]">Measure Outcomes.</span> <br />
                  <span className="text-[#006876]">Shape Careers.</span>
                </h1>

                <p className="text-base text-[#4A5568] leading-relaxed max-w-2xl font-normal">
                  SkillTrack goes beyond training and certification to understand what happens after skilling.
                  From verified formal employment and wage progression to 90-day retention and causal impact measurement.
                </p>

                {/* Primary CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button
                    onClick={() => setIsLoginModalOpen(true)}
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="h-11 px-6 shadow-xs"
                  >
                    Access Platform (Login)
                  </Button>
                  <Button
                    onClick={() => scrollToSection('how-it-works')}
                    variant="secondary"
                    size="lg"
                    className="h-11 px-6"
                  >
                    How SkillTrack Works
                  </Button>
                </div>

                {/* Statutory Reliability Badges */}
                <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-[#718096]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Aadhaar & PF/UAN Audit Ready</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>Explainable AI (No Black-Boxes)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                    <span>30/60/90-Day Retention Tracking</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual Cockpit Demonstration */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-[#D1D9E2] rounded-lg p-6 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                    <div>
                      <span className="text-[10px] font-bold text-[#718096] uppercase tracking-wider">
                        Candidate Outcome Ledger
                      </span>
                      <h3 className="text-sm font-bold text-[#1C2733]">Rahul Sharma (ST-2024-8841)</h3>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#E6F4EA] text-[#137333] border border-[#A8DAB5]">
                      74% Placement Prob
                    </span>
                  </div>

                  {/* Micro Stepper */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-[#4A5568]">Longitudinal Milestone Trajectory</span>
                    <div className="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                      <div className="p-2 rounded bg-[#E6F4EA] text-[#137333] font-bold border border-[#A8DAB5]">
                        Certified
                      </div>
                      <div className="p-2 rounded bg-[#E8F0F7] text-[#0B3B60] font-bold border border-[#B4CFE5]">
                        Placed
                      </div>
                      <div className="p-2 rounded bg-[#FFF3E0] text-[#E65100] font-bold border border-[#FFCC80]">
                        Day-30 Ver.
                      </div>
                      <div className="p-2 rounded bg-slate-50 text-slate-400 font-medium border border-slate-200">
                        Day-90 Ret.
                      </div>
                    </div>
                  </div>

                  {/* Skill Gap Diagnostic Snippet */}
                  <div className="p-3 rounded bg-[#F4F6F9] border border-[#D1D9E2] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#1C2733]">Target Competency Alignment</span>
                      <span className="font-mono font-bold text-[#0B3B60]">63% Match</span>
                    </div>
                    <p className="text-[11px] text-[#4A5568]">
                      <strong className="text-[#E65100]">Critical Deficit:</strong> SQL Database Queries (Demand: 4.9/5.0).
                      Prescribed 14-day micro-credential to attain 90%+ readiness.
                    </p>
                  </div>

                  {/* 1-Click Persona Login Triggers */}
                  <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                    <span className="text-[11px] text-[#718096]">Ready to evaluate?</span>
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="text-xs font-bold text-[#0B3B60] hover:underline flex items-center gap-1"
                    >
                      <span>Choose Role & Login</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PROBLEM STATEMENT SECTION */}
        <section id="about" className="py-16 bg-white border-b border-[#D1D9E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="max-w-3xl">
              <span className="text-xs font-bold text-[#E65100] uppercase tracking-wider">
                The Skilling Blindspot
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#002541] mt-1">
                Why Measuring Outcomes Matters More Than Counting Enrolments
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568] mt-2">
                Traditional skilling platforms celebrate output milestones like candidate enrollment and course
                completion certificates. However, the true socioeconomic value is determined by what happens downstream.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-md border border-[#D1D9E2] bg-[#F4F6F9] space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FCE8E6] text-[#C5221F] border border-[#F5A9A4]">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#1C2733]">High 30–90 Day Attrition</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Nearly 28% of placed candidates drop out within the first 90 days due to wage dissatisfaction,
                  relocation friction, or unaddressed workplace skill deficits.
                </p>
              </div>

              <div className="p-6 rounded-md border border-[#D1D9E2] bg-[#F4F6F9] space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FFF3E0] text-[#E65100] border border-[#FFCC80]">
                  <Briefcase className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#1C2733]">Unverified Placement Data</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Without rigorous documentary validation (offer letters, salary slips, and EPF UAN integration),
                  unverified employment claims distort scheme performance metrics.
                </p>
              </div>

              <div className="p-6 rounded-md border border-[#D1D9E2] bg-[#F4F6F9] space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-[#E8F0F7] text-[#0B3B60] border border-[#B4CFE5]">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-[#1C2733]">Static Non-Adaptive Training</h3>
                <p className="text-xs text-[#4A5568] leading-relaxed">
                  Curriculums fail to adapt to real-time regional vacancy demands, creating severe competency mismatches
                  even when candidates complete formal certifications.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HOW SKILLTRACK WORKS (7-STAGE INTELLIGENCE LOOP) */}
        <section id="how-it-works" className="py-16 bg-[#F4F6F9] border-b border-[#D1D9E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#0B3B60] uppercase tracking-wider">
                The Closed-Loop Framework
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#002541]">
                7-Stage Outcome Intelligence Engine
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                SkillTrack continuously diagnoses, supports, and evaluates learners throughout their post-skilling trajectory.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { step: '01', title: 'Track', desc: 'Aadhaar e-KYC & longitudinal identity' },
                { step: '02', title: 'Diagnose', desc: 'Mathematical competency gap matching' },
                { step: '03', title: 'Predict', desc: 'Explainable placement & attrition risk' },
                { step: '04', title: 'Intervene', desc: 'Prescriptive upskilling & stipends' },
                { step: '05', title: 'Follow-up', desc: '30/60/90-day retention verification' },
                { step: '06', title: 'Measure', desc: 'Before/after cohort wage uplift' },
                { step: '07', title: 'Improve', desc: 'Data-driven policy optimization' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-md border border-[#D1D9E2] bg-white shadow-2xs space-y-2 flex flex-col justify-between"
                >
                  <div>
                    <span className="font-mono text-xs font-black text-[#0B3B60]">{item.step}</span>
                    <h4 className="text-xs font-bold text-[#1C2733] mt-1">{item.title}</h4>
                  </div>
                  <p className="text-[10px] text-[#718096] leading-tight">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. OUTCOME INTELLIGENCE STATISTICS SECTION */}
        <section id="outcomes" className="py-16 bg-white border-b border-[#D1D9E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold text-[#059669] uppercase tracking-wider">
                Demonstrated Impact
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#002541] mt-1">
                Real-World Demonstrable Outturn
              </h2>
              <p className="text-xs sm:text-sm text-[#4A5568]">
                Longitudinal benchmarks monitored across active demonstration cohorts in 8 states.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="p-6 rounded-md border border-[#D1D9E2] bg-[#F4F6F9] space-y-1">
                <span className="text-[11px] font-semibold text-[#718096] uppercase">Overall Placement Rate</span>
                <div className="text-3xl font-black font-mono text-[#0B3B60]">74.8%</div>
                <p className="text-[11px] text-[#059669] font-medium">+14.2% uplift post-intervention</p>
              </div>

              <div className="p-6 rounded-md border border-[#D1D9E2] bg-[#F4F6F9] space-y-1">
                <span className="text-[11px] font-semibold text-[#718096] uppercase">90-Day Retention</span>
                <div className="text-3xl font-black font-mono text-[#059669]">71.2%</div>
                <p className="text-[11px] text-[#4A5568]">Verified via monthly salary slips</p>
              </div>

              <div className="p-6 rounded-md border border-[#D1D9E2] bg-[#F4F6F9] space-y-1">
                <span className="text-[11px] font-semibold text-[#718096] uppercase">Average Starting Wage</span>
                <div className="text-3xl font-black font-mono text-[#002541]">₹18,500</div>
                <p className="text-[11px] text-[#059669] font-medium">+22% over minimum baseline wage</p>
              </div>

              <div className="p-6 rounded-md border border-[#D1D9E2] bg-[#F4F6F9] space-y-1">
                <span className="text-[11px] font-semibold text-[#718096] uppercase">Monitored Candidates</span>
                <div className="text-3xl font-black font-mono text-[#E65100]">32,450+</div>
                <p className="text-[11px] text-[#4A5568]">Across 8 pilot states & 14 sectors</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. AUDIENCE & STAKEHOLDER PORTALS */}
        <section id="audience" className="py-16 bg-[#F4F6F9] border-b border-[#D1D9E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#0B3B60] uppercase tracking-wider">
                Tailored Workspaces
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#002541]">
                Serving the Entire Skilling Ecosystem
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Learner Card */}
              <div className="bg-white border border-[#D1D9E2] rounded-md p-6 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#E8F0F7] text-[#0B3B60] border border-[#B4CFE5]">
                    <Users className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1C2733]">For Learners</h3>
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    Track verified certifications, examine explainable job placement predictions, diagnose skill gaps against employer requisitions, and access targeted micro-credentials.
                  </p>
                </div>
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  Learner Portal Login
                </Button>
              </div>

              {/* Training Provider Card */}
              <div className="bg-white border border-[#D1D9E2] rounded-md p-6 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#E6F4EA] text-[#059669] border border-[#A8DAB5]">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1C2733]">For Training Providers</h3>
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    Audit candidate registries, record 30/60/90-day milestone follow-ups, upload documentary offer proofs, and prescribe proactive interventions for at-risk cohorts.
                  </p>
                </div>
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  Provider Portal Login
                </Button>
              </div>

              {/* Government Card */}
              <div className="bg-white border border-[#D1D9E2] rounded-md p-6 shadow-2xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FFF3E0] text-[#E65100] border border-[#FFCC80]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1C2733]">For Policy Makers & Government</h3>
                  <p className="text-xs text-[#4A5568] leading-relaxed">
                    National & state cockpits with 7-stage outcome funnels, district performance maps, training provider rankings, and before-vs-after causal impact evaluations.
                  </p>
                </div>
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  variant="outline"
                  size="md"
                  className="w-full"
                >
                  Government Cockpit Login
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. CALL TO ACTION SECTION */}
        <section className="py-16 bg-[#002541] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Measure What Happens After Skilling?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              Explore the live prototype to test candidate outcomes, explainable risk forecasts, and national analytics dashboards.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                className="bg-[#059669] hover:bg-[#047857] text-white h-11 px-8 font-bold border-none"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Launch Unified Login Modal
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* 8. CIVIC FOOTER */}
      <footer className="bg-white border-t border-[#D1D9E2] text-xs text-[#718096] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#0B3B60] text-white flex items-center justify-center font-bold text-xs">
                ST
              </div>
              <span className="font-bold text-[#1C2733]">SkillTrack Outcome Intelligence</span>
            </div>
            <p className="text-[11px] text-[#718096] text-center sm:text-right">
              Designed in alignment with National Skilling Framework standards. Demonstration prototype.
            </p>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
            <span>© 2026 SkillTrack. All rights reserved. Government Digital-Service Reference Prototype.</span>
            <div className="flex items-center gap-4">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }} className="hover:underline">
                Terms of Reference
              </a>
              <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }} className="hover:underline">
                Audit Guidelines
              </a>
              <button onClick={() => setIsLoginModalOpen(true)} className="text-[#0B3B60] font-semibold hover:underline">
                Login
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* The Single Unified Login Modal */}
      <UnifiedLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </div>
  )
}
