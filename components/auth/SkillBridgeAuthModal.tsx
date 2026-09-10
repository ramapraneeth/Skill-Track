'use client';

import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  ArrowRight,
  Lock,
  Mail,
  User,
  Phone,
  Calendar,
  Building,
  GraduationCap,
  Briefcase,
  Award,
  Compass,
  CheckCircle2,
  Shield,
  KeyRound,
  Sparkles,
} from 'lucide-react';
import { UserRole } from '@/types/auth';
import {
  INITIAL_STUDENTS,
  INITIAL_TRAINERS,
  StudentRecord,
  TrainerRecord,
  getStoredStudents,
  saveStoredStudents,
} from '@/lib/store/skillbridge-store';

interface SkillBridgeAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
  initialRole?: UserRole;
}

export const SkillBridgeAuthModal: React.FC<SkillBridgeAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialRole = 'student',
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot' | 'verify'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Login credentials
  const [loginIdentifier, setLoginIdentifier] = useState('rahul.sharma@skillbridge.gov.in');
  const [loginPassword, setLoginPassword] = useState('skillbridge2025');

  // Student Registration fields
  const [studentForm, setStudentForm] = useState({
    fullName: '',
    dob: '',
    gender: 'Male' as const,
    email: '',
    mobile: '',
    state: 'Andhra Pradesh',
    district: '',
    college: '',
    university: '',
    degree: 'B.Tech',
    branch: 'Computer Science',
    graduationYear: 2026,
    currentSkills: 'Python, C++, HTML, SQL',
    certifications: 'NPTEL Java Specialist',
    projects: 'AI Chatbot, E-commerce Portal',
    internshipExperience: '2 Months Web Development Intern',
    careerGoal: 'Full Stack Software Engineer',
    password: '',
  });

  // Trainer Registration fields
  const [trainerForm, setTrainerForm] = useState({
    trainerName: '',
    trainerId: '',
    organization: '',
    qualification: 'M.Tech / PhD Scholar',
    specialization: 'Cloud & Full Stack Systems',
    experienceYears: 8,
    skills: 'Java, Spring Boot, React, Docker',
    certifications: 'AWS Solutions Architect, CKA',
    trainingPrograms: 'National Skilling Mission Batch 2025',
    location: 'Hyderabad, Telangana',
    email: '',
    mobile: '',
    password: '',
  });

  if (!isOpen) return null;

  const roleOptions: { role: UserRole; title: string; subtitle: string; icon: any }[] = [
    {
      role: 'student',
      title: 'Student / Candidate',
      subtitle: 'Skill gaps, AI roadmaps & verified placement readiness',
      icon: GraduationCap,
    },
    {
      role: 'trainer',
      title: 'Trainer / Institute',
      subtitle: 'Cohort progress, student skill gaps & placement conversion',
      icon: Briefcase,
    },
    {
      role: 'college',
      title: 'College / University',
      subtitle: 'Institutional cohorts, curriculum matching & campus hiring',
      icon: Building,
    },
    {
      role: 'company',
      title: 'Company / Employer',
      subtitle: 'Verified outcome candidate sourcing & industry requisitions',
      icon: Compass,
    },
    {
      role: 'government',
      title: 'Government Admin',
      subtitle: 'National skilling intelligence, regional heatmaps & capacity',
      icon: Shield,
    },
  ];

  const handleQuickDemoFill = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    setSuccessMessage(null);

    if (role === 'student') {
      setLoginIdentifier('rahul.sharma@skillbridge.gov.in');
      setLoginPassword('studentPass2025');
    } else if (role === 'trainer') {
      setLoginIdentifier('rajesh.nair@skillbridge.gov.in');
      setLoginPassword('trainerPass2025');
    } else if (role === 'government') {
      setLoginIdentifier('director.msde@skillbridge.gov.in');
      setLoginPassword('adminSecure2025');
    } else if (role === 'college') {
      setLoginIdentifier('dean.engg@andhrauniversity.edu.in');
      setLoginPassword('collegePass2025');
    } else if (role === 'company') {
      setLoginIdentifier('talent.acquisition@tcs.com');
      setLoginPassword('corporatePass2025');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      let loggedInUser: any = null;

      if (selectedRole === 'student') {
        const students = getStoredStudents();
        const found = students.find((s) => s.email.toLowerCase() === loginIdentifier.toLowerCase());
        const student = found || students[0];
        loggedInUser = {
          id: student.userId || 'usr-std-101',
          studentId: student.id,
          fullName: student.fullName,
          email: student.email,
          role: 'student',
          organization: student.college,
        };
      } else if (selectedRole === 'trainer') {
        const found = INITIAL_TRAINERS.find((t) => t.email.toLowerCase() === loginIdentifier.toLowerCase());
        const trainer = found || INITIAL_TRAINERS[0];
        loggedInUser = {
          id: trainer.userId,
          trainerId: trainer.id,
          fullName: trainer.name,
          email: trainer.email,
          role: 'trainer',
          organization: trainer.organization,
        };
      } else if (selectedRole === 'government') {
        loggedInUser = {
          id: 'usr-gov-001',
          fullName: 'Dr. Rajiv Kumar (Mission Director)',
          email: loginIdentifier || 'director.msde@skillbridge.gov.in',
          role: 'government',
          organization: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
        };
      } else if (selectedRole === 'college') {
        loggedInUser = {
          id: 'usr-clg-001',
          fullName: 'Dr. K. V. Subbarao (Principal)',
          email: loginIdentifier || 'dean.engg@andhrauniversity.edu.in',
          role: 'college',
          organization: 'Andhra University College of Engineering',
        };
      } else {
        loggedInUser = {
          id: 'usr-cmp-001',
          fullName: 'Nalini Menon (Head of Campus Recruitment)',
          email: loginIdentifier || 'talent.acquisition@tcs.com',
          role: 'company',
          organization: 'Tata Consultancy Services',
        };
      }

      localStorage.setItem('skilltrack_user', JSON.stringify(loggedInUser));
      localStorage.setItem('skilltrack_role', loggedInUser.role);
      localStorage.setItem('skilltrack_token', 'demo_jwt_token_' + Date.now());

      setIsLoading(false);
      onSuccess(loggedInUser);
      onClose();
    }, 450);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    setTimeout(() => {
      if (selectedRole === 'student') {
        if (!studentForm.fullName || !studentForm.email) {
          setErrorMessage('Please fill in your Full Name and Email.');
          setIsLoading(false);
          return;
        }

        const newStudent: StudentRecord = {
          id: `std-${Date.now()}`,
          userId: `usr-std-${Date.now()}`,
          fullName: studentForm.fullName,
          email: studentForm.email,
          mobile: studentForm.mobile || '+91 98765 43210',
          dob: studentForm.dob || '2004-01-01',
          gender: studentForm.gender,
          state: studentForm.state,
          district: studentForm.district || 'Central District',
          college: studentForm.college || 'Government Polytechnic & Engineering College',
          university: studentForm.university || 'State Technical University',
          degree: studentForm.degree,
          branch: studentForm.branch,
          graduationYear: Number(studentForm.graduationYear) || 2026,
          careerGoal: studentForm.careerGoal || 'Software Engineer',
          targetRole: studentForm.careerGoal || 'Software Developer',
          employabilityScore: 68,
          placementStatus: 'SKILL DEVELOPMENT',
          assignedTrainerId: 'trn-201',
          currentSkills: studentForm.currentSkills
            .split(',')
            .map((s, idx) => ({
              id: `sk-new-${idx}`,
              name: s.trim(),
              proficiency: 70,
              category: 'Software',
              verified: true,
            })),
          skillGaps: {
            strong: [{ name: 'Foundation Programming', score: 75, level: 'Proficient' }],
            improve: [{ name: 'System Design', score: 55, target: 80, delta: 25 }],
            missing: [
              { name: 'Cloud Fundamentals (AWS)', industryImportance: 'HIGH', reason: 'High industry hiring weight' },
              { name: 'Data Structures & Algorithms', industryImportance: 'CRITICAL', reason: 'Core technical screening prerequisite' },
            ],
            future: [{ name: 'Agentic AI Workflows', horizon: '6 Months', trendGrowth: '+180% YoY' }],
          },
          enrolledCourseIds: ['crs-001'],
          completedCourseIds: [],
          certifications: studentForm.certifications
            ? [{ title: studentForm.certifications, issuer: 'National Portal', date: 'Feb 2025', verified: true }]
            : [],
          projects: studentForm.projects
            ? [{ title: studentForm.projects, skills: ['Full Stack'], description: 'Initial portfolio milestone project.' }]
            : [],
          internships: studentForm.internshipExperience
            ? [{ company: 'Vocational Training Trainee', role: 'Trainee', duration: '1 Month', stipend: '₹5,000' }]
            : [],
          nextBestAction: {
            title: 'Complete Skill Gap Assessment Diagnostic',
            reason: 'Establishes verified baseline benchmarks across target industry hiring filters.',
            recommendedCourseId: 'crs-002',
            urgency: 'HIGH',
          },
        };

        const existing = getStoredStudents();
        saveStoredStudents([newStudent, ...existing]);

        const loggedInUser = {
          id: newStudent.userId,
          studentId: newStudent.id,
          fullName: newStudent.fullName,
          email: newStudent.email,
          role: 'student',
          organization: newStudent.college,
        };

        localStorage.setItem('skilltrack_user', JSON.stringify(loggedInUser));
        localStorage.setItem('skilltrack_role', 'student');
        localStorage.setItem('skilltrack_token', 'demo_jwt_token_' + Date.now());

        setIsLoading(false);
        onSuccess(loggedInUser);
        onClose();
      } else {
        // Generic organization/trainer registration
        const loggedInUser = {
          id: `usr-${selectedRole}-${Date.now()}`,
          fullName: trainerForm.trainerName || 'Verified Institutional User',
          email: trainerForm.email || `${selectedRole}@skillbridge.gov.in`,
          role: selectedRole,
          organization: trainerForm.organization || 'Accredited State Partner',
        };

        localStorage.setItem('skilltrack_user', JSON.stringify(loggedInUser));
        localStorage.setItem('skilltrack_role', selectedRole);
        localStorage.setItem('skilltrack_token', 'demo_jwt_token_' + Date.now());

        setIsLoading(false);
        onSuccess(loggedInUser);
        onClose();
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00172A]/75 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white border border-[#CBD5E1] rounded-lg shadow-2xl max-w-2xl w-full my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B3B60] via-[#0A4B78] to-[#0B3B60] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF9933]" />
              <span className="text-[10px] font-bold text-[#FF9933] uppercase tracking-wider">
                Government of India • National Skilling Portal
              </span>
            </div>
            <h2 className="text-lg font-black tracking-tight mt-0.5">Welcome to SkillBridge AI</h2>
            <p className="text-xs text-[#E2E8F0] font-normal">
              One ecosystem. Every skill. Every opportunity.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-[#F1F5F9] p-2 border-b border-[#D1D9E2]">
          <div className="text-[10px] font-bold text-[#475569] uppercase tracking-wider px-2 mb-1.5 flex items-center justify-between">
            <span>Select Your Institutional Role</span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <Shield className="w-3 h-3" /> Role-Based Access Control
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {roleOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = selectedRole === opt.role;
              return (
                <button
                  key={opt.role}
                  type="button"
                  onClick={() => handleQuickDemoFill(opt.role)}
                  className={`px-2.5 py-2 rounded text-left transition-all flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-[#0B3B60] text-white border-[#0B3B60] shadow-xs'
                      : 'bg-white hover:bg-[#E2E8F0] text-[#1E293B] border-[#CBD5E1]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#FF9933]' : 'text-[#0B3B60]'}`} />
                    <span className="font-bold text-[11px] truncate">{opt.title.split('/')[0]}</span>
                  </div>
                  <span className={`text-[9px] leading-tight truncate ${isSelected ? 'text-white/80' : 'text-[#64748B]'}`}>
                    {opt.role.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Mode Toggle (Login / Register / Forgot) */}
        <div className="px-6 pt-3 pb-2 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`text-xs font-bold px-3 py-1.5 rounded transition-all ${
                authMode === 'login'
                  ? 'bg-[#0B3B60] text-white'
                  : 'text-[#475569] hover:bg-[#F1F5F9]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`text-xs font-bold px-3 py-1.5 rounded transition-all ${
                authMode === 'register'
                  ? 'bg-[#0B3B60] text-white'
                  : 'text-[#475569] hover:bg-[#F1F5F9]'
              }`}
            >
              New Registration
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('forgot')}
              className={`text-xs font-bold px-3 py-1.5 rounded transition-all ${
                authMode === 'forgot'
                  ? 'bg-[#0B3B60] text-white'
                  : 'text-[#475569] hover:bg-[#F1F5F9]'
              }`}
            >
              Forgot Password
            </button>
          </div>

          {/* 1-Click Persona Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#0369A1] bg-[#F0F9FF] px-2.5 py-1 rounded border border-[#BAE6FD]">
            <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>Click any role above to pre-fill test credentials</span>
          </div>
        </div>

        {/* Form Container */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {errorMessage && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded text-xs flex items-center gap-2">
              <span className="font-bold">Error:</span> {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ---------------- LOGIN FORM ---------------- */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-md flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Authenticating as:</span>
                <span className="font-bold text-[#0B3B60] uppercase px-2 py-0.5 rounded bg-white border border-[#CBD5E1]">
                  {selectedRole}
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Email ID or Registered Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="user@skillbridge.gov.in"
                    className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#0F172A] focus:outline-none focus:border-[#0B3B60] focus:ring-1 focus:ring-[#0B3B60]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-[#1E293B]">Password</label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] text-[#0284C7] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#CBD5E1] rounded text-[#0F172A] focus:outline-none focus:border-[#0B3B60] focus:ring-1 focus:ring-[#0B3B60]"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div className="text-[11px] text-[#64748B]">
                  Protected by 256-bit State Key Encryption
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 px-6 rounded bg-[#0B3B60] text-white font-bold text-xs flex items-center gap-2 hover:bg-[#002541] transition-all disabled:opacity-50 shadow-sm"
                >
                  {isLoading ? 'Verifying Credentials...' : 'Secure Login'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ---------------- REGISTRATION FORM ---------------- */}
          {authMode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="bg-[#EFF6FF] border border-[#BFDBFE] p-2.5 rounded text-xs text-[#1E40AF]">
                Registering new profile for role:{' '}
                <strong className="uppercase">{selectedRole}</strong>. All data integrates into the National Skill
                Outcome Registry.
              </div>

              {selectedRole === 'student' ? (
                /* Student Multi-Field Profile */
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={studentForm.fullName}
                        onChange={(e) => setStudentForm({ ...studentForm, fullName: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        required
                        value={studentForm.dob}
                        onChange={(e) => setStudentForm({ ...studentForm, dob: e.target.value })}
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Gender</label>
                      <select
                        value={studentForm.gender}
                        onChange={(e: any) => setStudentForm({ ...studentForm, gender: e.target.value })}
                        className="w-full h-9 px-2 text-xs border border-[#CBD5E1] rounded bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        value={studentForm.email}
                        onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                        placeholder="ramesh@college.edu"
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Mobile *</label>
                      <input
                        type="tel"
                        required
                        value={studentForm.mobile}
                        onChange={(e) => setStudentForm({ ...studentForm, mobile: e.target.value })}
                        placeholder="+91 98480..."
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">State</label>
                      <input
                        type="text"
                        value={studentForm.state}
                        onChange={(e) => setStudentForm({ ...studentForm, state: e.target.value })}
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">District</label>
                      <input
                        type="text"
                        value={studentForm.district}
                        onChange={(e) => setStudentForm({ ...studentForm, district: e.target.value })}
                        placeholder="e.g. Visakhapatnam"
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">College</label>
                      <input
                        type="text"
                        value={studentForm.college}
                        onChange={(e) => setStudentForm({ ...studentForm, college: e.target.value })}
                        placeholder="e.g. Govt Engineering College"
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">Degree & Branch</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={studentForm.degree}
                          onChange={(e) => setStudentForm({ ...studentForm, degree: e.target.value })}
                          placeholder="B.Tech"
                          className="w-24 h-9 px-2 text-xs border border-[#CBD5E1] rounded bg-white"
                        />
                        <input
                          type="text"
                          value={studentForm.branch}
                          onChange={(e) => setStudentForm({ ...studentForm, branch: e.target.value })}
                          placeholder="CSE / ECE / IT"
                          className="flex-1 h-9 px-2 text-xs border border-[#CBD5E1] rounded bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                      Current Skills (Comma Separated)
                    </label>
                    <input
                      type="text"
                      value={studentForm.currentSkills}
                      onChange={(e) => setStudentForm({ ...studentForm, currentSkills: e.target.value })}
                      placeholder="e.g. Python, SQL, C++, HTML"
                      className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                      Target Career Goal *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentForm.careerGoal}
                      onChange={(e) => setStudentForm({ ...studentForm, careerGoal: e.target.value })}
                      placeholder="e.g. Full Stack Developer / Data Analyst / Cloud Architect"
                      className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                    />
                  </div>
                </div>
              ) : (
                /* Trainer / Org Registration */
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                        Full Name / Organization Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={trainerForm.trainerName}
                        onChange={(e) => setTrainerForm({ ...trainerForm, trainerName: e.target.value })}
                        placeholder="e.g. Prof. Arvind Mehra"
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                        Institutional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={trainerForm.email}
                        onChange={(e) => setTrainerForm({ ...trainerForm, email: e.target.value })}
                        placeholder="trainer@institute.gov.in"
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                        Organization / Affiliated Institute
                      </label>
                      <input
                        type="text"
                        value={trainerForm.organization}
                        onChange={(e) => setTrainerForm({ ...trainerForm, organization: e.target.value })}
                        placeholder="Apex National Skilling Centre"
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#334155] mb-1">
                        Specialization Area
                      </label>
                      <input
                        type="text"
                        value={trainerForm.specialization}
                        onChange={(e) => setTrainerForm({ ...trainerForm, specialization: e.target.value })}
                        placeholder="Full Stack / Cloud / AI"
                        className="w-full h-9 px-2.5 text-xs border border-[#CBD5E1] rounded bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-10 px-6 rounded bg-[#FF9933] hover:bg-[#E65100] text-slate-950 font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50 shadow-sm uppercase tracking-wider"
                >
                  {isLoading ? 'Creating Account...' : 'Complete Registration'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* ---------------- FORGOT PASSWORD ---------------- */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              <p className="text-xs text-[#475569] leading-relaxed">
                Enter your registered email address or mobile number. A government-grade OTP verification link will be
                dispatched to your authenticated address.
              </p>
              <div>
                <label className="block text-xs font-semibold text-[#1E293B] mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                  <input
                    type="email"
                    placeholder="user@skillbridge.gov.in"
                    className="w-full h-10 pl-9 pr-3 text-xs bg-white border border-[#CBD5E1] rounded"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs font-semibold text-[#64748B] hover:text-[#0F172A]"
                >
                  Return to Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSuccessMessage('Password reset verification link has been dispatched to your email.');
                    setAuthMode('login');
                  }}
                  className="h-10 px-5 rounded bg-[#0B3B60] text-white text-xs font-bold"
                >
                  Send Reset OTP
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
