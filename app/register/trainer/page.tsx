'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { getTrainers, saveTrainers, TrainerProfile } from '@/lib/sidh-store';

export default function RegisterTrainerPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    qualification: 'M.Tech / PhD Scholar',
    experienceYears: 8,
    specialization: 'Full Stack & Cloud Architecture',
    skills: 'Java, Spring Boot, React, AWS',
    sector: 'IT-ITeS',
    trainingCenter: 'Apex National Skilling Centre, Visakhapatnam',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      const newTrainer: TrainerProfile = {
        id: `trn-${Date.now()}`,
        name: formData.fullName || 'Verified Trainer',
        email: formData.email,
        mobile: formData.mobile,
        qualification: formData.qualification,
        experienceYears: Number(formData.experienceYears) || 5,
        specialization: formData.specialization,
        skills: formData.skills.split(',').map((s) => s.trim()),
        sector: formData.sector,
        trainingCenter: formData.trainingCenter,
        state: formData.state,
        district: formData.district,
        verificationStatus: 'Pending',
        rating: 4.8,
        activeBatchIds: [],
        courseIds: [],
      };

      const existing = getTrainers();
      saveTrainers([newTrainer, ...existing]);

      // Set session
      const sessionUser = {
        id: newTrainer.id,
        fullName: newTrainer.name,
        email: newTrainer.email,
        role: 'trainer',
        organization: newTrainer.trainingCenter,
      };
      localStorage.setItem('skilltrack_user', JSON.stringify(sessionUser));
      localStorage.setItem('skilltrack_role', 'trainer');
      localStorage.setItem('skilltrack_token', 'demo_jwt_' + Date.now());

      setIsLoading(false);
      setIsSubmitted(true);
    }, 450);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Tricolor Micro-strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <header className="bg-white border-b border-[#CBD5E1] p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/register" className="text-xs font-bold text-[#0B3B60] hover:underline flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Role Selection
          </Link>
          <span className="text-xs text-[#64748B]">Step 2 of 2: Master Educator Onboarding</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-xl max-w-xl w-full overflow-hidden">
          <div className="bg-[#0B3B60] text-white p-6 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF9933] uppercase tracking-wider">
              <Briefcase className="w-4 h-4" /> Instructor Accreditation
            </div>
            <h2 className="text-lg font-black mt-1">Register as a Certified Trainer</h2>
            <p className="text-xs text-[#CBD5E1] mt-0.5">
              Subject to State Skilling Mission verification
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Clock className="w-7 h-7" />
              </div>
              <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs uppercase tracking-wider">
                Verification Pending
              </div>
              <h3 className="text-base font-bold text-[#102A43]">
                Application Submitted for Accreditation
              </h3>
              <p className="text-xs text-[#627D98] max-w-md mx-auto leading-relaxed">
                Your trainer profile has been recorded in the National Trainer Registry. A state verification officer
                will review your submitted qualifications and center affiliation within 2 business days.
              </p>
              <div className="pt-4 flex items-center justify-center gap-3">
                <Link
                  href="/trainer/dashboard"
                  className="px-5 py-2.5 rounded bg-[#0B3B60] text-white font-bold text-xs hover:bg-[#002541] transition-all"
                >
                  Enter Trainer Portal (Preview Mode)
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Prof. Rajesh Nair"
                    className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Institutional Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="trainer@institute.gov.in"
                      className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Mobile Number *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                    <input
                      type="tel"
                      required
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      placeholder="+91 98450..."
                      className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Highest Qualification *</label>
                  <input
                    type="text"
                    required
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Years of Experience *</label>
                  <input
                    type="number"
                    required
                    value={formData.experienceYears}
                    onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                    className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Specialization *</label>
                  <input
                    type="text"
                    required
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1E293B] mb-1">Industry Sector *</label>
                  <input
                    type="text"
                    required
                    value={formData.sector}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    placeholder="IT-ITeS / Automotive / BFSI"
                    className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Affiliated Training Center *</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={formData.trainingCenter}
                    onChange={(e) => setFormData({ ...formData, trainingCenter: e.target.value })}
                    className="w-full h-9 pl-9 pr-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">Core Competencies & Skills (Comma Separated) *</label>
                <input
                  type="text"
                  required
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Java, Spring Boot, React, AWS"
                  className="w-full h-9 px-3 text-xs border border-[#CBD5E1] rounded bg-white text-[#0F172A]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 rounded bg-[#0B3B60] hover:bg-[#002541] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider shadow-xs mt-2"
              >
                {isLoading ? 'Submitting Application...' : 'Submit Accreditation Request'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
