// SIDH Skill Development Platform - Central State Store & Service Abstraction
// Supports Learner, Trainer, and Government Portals with LocalStorage persistence and realistic data.

export * from './career-registry';
import {
  getAllCareers,
  getCareerById,
  findCareerByTitle,
  calculateMultiFactorMatch,
  MultiFactorScore,
  CareerProfileDef,
} from './career-registry';

export type SkillProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type SkillCategory = 'Technical Skills' | 'Other Skills' | 'Programming Languages' | 'Tools and Technologies' | 'Soft Skills';

export interface StudentSkill {
  name: string;
  skillName?: string;
  category: SkillCategory | string;
  proficiencyLevel?: SkillProficiencyLevel;
  level?: string;
  proficiency?: number; // 0-100 for backward compatibility
  verified: boolean;
}

export interface SemesterPerformance {
  semester: string;
  gpa: number;
  status: 'Completed' | 'Current' | 'Upcoming';
}

export interface StudentAcademicDetails {
  cgpa: number;
  percentage: number;
  semesterPerformance: SemesterPerformance[];
  relevantSubjects: string[];
  academicAchievements: string[];
}

export interface StudentCertification {
  id: string;
  name: string; // Certification Name
  title?: string; // alias for backward compatibility
  issuingOrg: string; // Issuing Organization
  issuer?: string; // alias
  completionDate: string; // Completion Date
  date?: string; // alias
  credentialId: string; // Credential ID
  verifyId?: string; // alias
  relatedSkills: string[];
  status: 'Verified' | 'Pending';
}

export interface StudentProject {
  id: string;
  title: string; // Project Title
  description: string; // Project Description
  technologiesUsed: string[]; // Technologies Used
  technologies?: string[]; // alias
  skills?: string[]; // alias
  studentRole: string; // Student Role
  role?: string; // alias
  projectOutcome: string; // Project Outcome
  outcome?: string; // alias
  skillsDemonstrated: string[]; // Skills Demonstrated
  link?: string;
}

export interface LearnerProfile {
  id: string;
  // 1. Basic Information
  name: string;
  studentId: string;
  course: string;
  branch: string;
  year: string;
  semester: string;
  email: string;
  mobile: string;
  phone?: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  state: string;
  district: string;
  qualification: string;
  education?: string;
  institution: string;
  specialization: string;
  passingYear: number;
  employmentStatus: 'Unemployed' | 'Employed' | 'Student' | 'Apprentice';
  occupation?: string;
  targetRole: string;

  // 2. Academic Details
  academicDetails: StudentAcademicDetails;

  // 3. Skills
  skills: StudentSkill[];

  // 4. Certifications
  certifications: StudentCertification[];

  // 5. Projects
  projects: StudentProject[];

  // Operational metrics
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  attendanceRate: number;
  learningHours: number;
  careerReadinessScore: number;
}

export interface TrainerProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  phone?: string;
  qualification: string;
  experienceYears: number;
  experience?: string | number;
  specialization: string;
  skills: string[];
  sector: string;
  trainingCenter: string;
  state: string;
  district: string;
  verificationStatus: 'Verified' | 'Pending' | 'Rejected' | 'Suspended';
  rating: number;
  activeBatchIds: string[];
  courseIds: string[];
}

export interface TrainingCenter {
  id: string;
  name: string;
  code: string;
  state: string;
  district: string;
  address: string;
  capacity: number;
  currentEnrollment: number;
  utilizationRate: number;
  sector: string;
  status: 'Active' | 'Under Inspection' | 'Suspended';
  trainerCount: number;
  facilities: string[];
}

export interface CourseProgram {
  id: string;
  title: string;
  code: string;
  sector: string;
  provider: string;
  trainerName: string;
  durationWeeks: number;
  hoursTotal: number;
  mode: 'Offline' | 'Online' | 'Hybrid';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  nsqfLevel: number;
  skillsCovered: string[];
  description: string;
  eligibility: string;
  enrolledCount: number;
  completedCount: number;
  certifiedCount: number;
  placementRate: number;
  avgSalaryLpa: number;
  modules: { id: string; title: string; duration: string; completed?: boolean }[];
  status: 'Approved' | 'Pending Approval' | 'Draft';
}

export interface BatchRecord {
  id: string;
  courseId: string;
  courseTitle: string;
  trainerId: string;
  trainerName: string;
  trainingCenter: string;
  startDate: string;
  endDate: string;
  timings: string;
  capacity: number;
  enrolledLearnerIds: string[];
  status: 'In Progress' | 'Upcoming' | 'Completed';
  attendanceRate: number;
}

export interface AssessmentRecord {
  id: string;
  title: string;
  skill: string;
  durationMinutes: number;
  questionCount: number;
  passingScore: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Published' | 'Draft' | 'Completed';
  instructions: string[];
  questions: {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

export interface SchemeRecord {
  id: string;
  name: string;
  code: string;
  ministry: string;
  objective: string;
  eligibility: string;
  targetBeneficiaries: number;
  currentEnrolled: number;
  budgetCr: number;
  state: string;
  district: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Draft' | 'Completed';
}

export interface CareerOpportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: 'Full-time' | 'Apprenticeship' | 'Internship';
  stipendOrSalary: string;
  requiredSkills: string[];
  deadline: string;
  eligibility: string;
  matchPercentage: number;
}

export interface PolicyAlert {
  id: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  type: 'High Dropout' | 'Trainer Shortage' | 'Skill Shortage' | 'Underutilization';
  region: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface PolicyInsight {
  id: string;
  title: string;
  finding: string;
  evidence: string;
  affectedRegion: string;
  affectedSkill: string;
  impact: string;
  recommendation: string;
  priority: 'Urgent' | 'High' | 'Routine';
}

// -------------------------------------------------------------
// INITIAL REALISTIC DATASETS
// -------------------------------------------------------------

export const INITIAL_LEARNER: LearnerProfile = {
  id: '',
  name: '',
  studentId: '',
  course: '',
  branch: '',
  year: '',
  semester: '',
  email: '',
  mobile: '',
  dob: '',
  gender: 'Male',
  state: '',
  district: '',
  qualification: '',
  institution: '',
  specialization: '',
  passingYear: 2025,
  employmentStatus: 'Unemployed',
  targetRole: '',
  academicDetails: {
    cgpa: 0,
    percentage: 0,
    semesterPerformance: [],
    relevantSubjects: [],
    academicAchievements: [],
  },
  skills: [],
  certifications: [],
  projects: [],
  enrolledCourseIds: [],
  completedCourseIds: [],
  attendanceRate: 0,
  learningHours: 0,
  careerReadinessScore: 0,
};

export const INITIAL_TRAINERS: TrainerProfile[] = [];
export const INITIAL_TRAINING_CENTERS: TrainingCenter[] = [];
export const INITIAL_COURSES: CourseProgram[] = [];
export const INITIAL_BATCHES: BatchRecord[] = [];
export const INITIAL_ASSESSMENTS: AssessmentRecord[] = [];
export const INITIAL_SCHEMES: SchemeRecord[] = [];
export const INITIAL_OPPORTUNITIES: CareerOpportunity[] = [];
export const INITIAL_ALERTS: PolicyAlert[] = [];
export const INITIAL_INSIGHTS: PolicyInsight[] = [];

// -------------------------------------------------------------
// LOCAL STORAGE & REACTIVE SERVICE METHODS
// -------------------------------------------------------------

const KEY_LEARNER = 'sidh_learner_v2';
const KEY_TRAINERS = 'sidh_trainers_v2';
const KEY_CENTERS = 'sidh_centers_v2';
const KEY_COURSES = 'sidh_courses_v2';
const KEY_BATCHES = 'sidh_batches_v2';
const KEY_SCHEMES = 'sidh_schemes_v2';

// -------------------------------------------------------------
// CAREER RECOMMENDATION & SKILL GAP ENGINE
// -------------------------------------------------------------

export type GapCategory = 'No Gap' | 'Low Gap' | 'Medium Gap' | 'High Gap';
export type SkillPriority = 'High' | 'Medium' | 'Low';

export interface RequiredSkillSpec {
  skill: string;
  requiredLevel: SkillProficiencyLevel;
  priority: SkillPriority;
  whyRequired: string;
  recommendedCourse: string;
  courseId: string;
  difficulty: SkillProficiencyLevel;
  duration: string;
}

export interface CareerPost {
  id: string;
  postName: string;
  sector: string;
  streamCode?: string;
  requiredQualification: string;
  minCgpa: number;
  experienceLevel: string;
  salaryRange: string;
  openings: number;
  description: string;
  requiredSkills: RequiredSkillSpec[];
}

export interface SkillGapItem {
  skill: string;
  currentLevel: SkillProficiencyLevel | 'None';
  requiredLevel: SkillProficiencyLevel;
  gap: GapCategory;
  priority: SkillPriority;
  gapScore: number;
  recommendedCourse: string;
  courseId: string;
  difficulty: SkillProficiencyLevel;
  estimatedHours: string;
  whyRequired: string;
}

export interface CareerMatchResult {
  post: CareerPost;
  postName: string;
  matchPercentage: number;
  status: 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Low Match' | 'Developing Match';
  matchingSkills: string[];
  missingSkills: string[];
  skillGaps: SkillGapItem[];
  requiredQualification: string;
  recommendedLearning: {
    skill: string;
    whyRequired: string;
    courseTitle: string;
    courseId: string;
    difficulty: SkillProficiencyLevel;
    duration: string;
    priority: SkillPriority;
  }[];
  multiFactor?: MultiFactorScore;
  explanations?: {
    positive: string[];
    advisory: string[];
  };
}

// Dynamically generate career posts from all streams in career-registry
const REGISTRY_CAREER_POSTS: CareerPost[] = getAllCareers().map((c) => ({
  id: c.id,
  postName: c.title,
  sector: c.sector,
  streamCode: c.streamCode,
  requiredQualification: `Minimum ${c.minCgpa} CGPA in ${c.streamCode} or related discipline`,
  minCgpa: c.minCgpa,
  experienceLevel: 'Entry Level (0-2 Years)',
  salaryRange: c.salaryRange,
  openings: c.jobRoles.reduce((acc, j) => acc + (j.openings || 10), 0) || 30,
  description: c.description,
  requiredSkills: c.requiredSkills.map((rs) => ({
    skill: rs.skill,
    requiredLevel: rs.requiredLevel,
    priority: rs.priority,
    whyRequired: rs.whyRequired,
    recommendedCourse: rs.recommendedCourseTitle,
    courseId: rs.recommendedCourseId,
    difficulty: rs.requiredLevel,
    duration: rs.estimatedDuration,
  })),
}));

// Legacy aliases for backward compatibility with existing query params & tests
const LEGACY_ALIASES: CareerPost[] = [
  {
    id: 'post-python',
    postName: 'Junior Python Developer',
    sector: 'IT-ITeS & Software',
    requiredQualification: 'B.Tech / BCA / B.Sc in Computer Science or IT (Min 60% / 6.5 CGPA)',
    minCgpa: 6.5,
    experienceLevel: 'Entry Level (0-2 Years)',
    salaryRange: '₹4.5 - ₹7.5 LPA',
    openings: 320,
    description: 'Develop backend APIs, automated data pipelines, and scalable enterprise logic with Python, SQL, and modern frameworks.',
    requiredSkills: [
      {
        skill: 'Python',
        requiredLevel: 'Advanced',
        priority: 'High',
        whyRequired: 'Core application logic, microservices, and asynchronous frameworks',
        recommendedCourse: 'Advanced Python Architecture & Asyncio',
        courseId: 'crs-002',
        difficulty: 'Advanced',
        duration: '40 Hours',
      },
      {
        skill: 'SQL',
        requiredLevel: 'Intermediate',
        priority: 'Low',
        whyRequired: 'Database design, indexing, and ORM query optimization',
        recommendedCourse: 'Enterprise Database Systems & Normalization',
        courseId: 'crs-001',
        difficulty: 'Intermediate',
        duration: '25 Hours',
      },
      {
        skill: 'REST APIs',
        requiredLevel: 'Intermediate',
        priority: 'High',
        whyRequired: 'API contract design, serialization, and frontend integration',
        recommendedCourse: 'RESTful API Engineering with FastAPI & Django',
        courseId: 'crs-001',
        difficulty: 'Intermediate',
        duration: '35 Hours',
      },
    ],
  },
];

export const CAREER_POSTS: CareerPost[] = [...REGISTRY_CAREER_POSTS, ...LEGACY_ALIASES];

export function calculateCareerMatch(profile: LearnerProfile, post: CareerPost): CareerMatchResult {
  const norm = (s: string) => (s || '').toLowerCase().trim();

  // Try matching against registry career definition for full 7-factor engine
  const regCareer =
    getCareerById(post.id) ||
    findCareerByTitle(post.postName) ||
    (post.id === 'post-python' ? findCareerByTitle('Full Stack Web Developer') : undefined);

  if (regCareer) {
    const mf = calculateMultiFactorMatch(profile, regCareer);
    const matchingSkills = mf.skillBreakdown.filter((s) => s.status === 'Mastered').map((s) => s.skill);
    const missingSkills = mf.skillBreakdown.filter((s) => s.status !== 'Mastered').map((s) => s.skill);

    const skillGaps: SkillGapItem[] = mf.skillBreakdown.map((s) => {
      const studentSkill = (profile.skills || []).find((sk) => norm(sk.name) === norm(s.skill));
      const currentLevel = studentSkill?.proficiencyLevel || (studentSkill && studentSkill.proficiency && studentSkill.proficiency >= 80 ? 'Advanced' : studentSkill && studentSkill.proficiency && studentSkill.proficiency >= 60 ? 'Intermediate' : studentSkill ? 'Beginner' : 'None');
      const reqSpec = regCareer.requiredSkills.find((rs) => rs.skill === s.skill);

      let gap: GapCategory = 'Medium Gap';
      if (s.status === 'Mastered') gap = 'No Gap';
      else if (s.status === 'Critical Gap') gap = 'High Gap';

      return {
        skill: s.skill,
        currentLevel,
        requiredLevel: reqSpec?.requiredLevel || 'Intermediate',
        gap,
        priority: s.priority,
        gapScore: s.gapPercentage,
        recommendedCourse: s.recommendedCourse,
        courseId: s.courseId,
        difficulty: reqSpec?.requiredLevel || 'Intermediate',
        estimatedHours: reqSpec?.estimatedDuration || '30 Hours',
        whyRequired: s.whyRequired,
      };
    });

    const recommendedLearning = skillGaps
      .filter((g) => g.gap !== 'No Gap')
      .map((g) => ({
        skill: g.skill,
        whyRequired: g.whyRequired,
        courseTitle: g.recommendedCourse,
        courseId: g.courseId,
        difficulty: g.difficulty,
        duration: g.estimatedHours,
        priority: g.priority,
      }));

    return {
      post,
      postName: post.postName,
      matchPercentage: mf.totalScore,
      status: mf.status,
      matchingSkills,
      missingSkills,
      skillGaps,
      requiredQualification: post.requiredQualification,
      recommendedLearning,
      multiFactor: mf,
      explanations: mf.explanations,
    };
  }

  // Fallback heuristic matching for non-registry posts
  const findSkill = (reqName: string) => {
    const q = norm(reqName);
    return (profile.skills || []).find((s) => {
      const sn = norm(s.name);
      return sn === q || sn.includes(q) || q.includes(sn);
    });
  };

  const levelValues: Record<string, number> = {
    'None': 0,
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3,
  };

  const priorityWeights: Record<SkillPriority, number> = {
    'High': 3,
    'Medium': 2,
    'Low': 1,
  };

  let totalWeightedSkillScore = 0;
  let totalPossibleWeight = 0;
  const matchingSkills: string[] = [];
  const missingSkills: string[] = [];
  const skillGaps: SkillGapItem[] = [];

  post.requiredSkills.forEach((req) => {
    const weight = priorityWeights[req.priority] || 2;
    totalPossibleWeight += weight;

    const studentSkill = findSkill(req.skill);
    const currentLevel: SkillProficiencyLevel | 'None' = studentSkill
      ? (studentSkill.proficiencyLevel || (studentSkill.proficiency && studentSkill.proficiency >= 80 ? 'Advanced' : studentSkill.proficiency && studentSkill.proficiency >= 60 ? 'Intermediate' : 'Beginner'))
      : 'None';

    const currentVal = levelValues[currentLevel] || 0;
    const reqVal = levelValues[req.requiredLevel] || 2;
    const diff = reqVal - currentVal;

    let gap: GapCategory = 'No Gap';
    let skillScoreFactor = 1.0;
    let gapScore = 0;

    if (diff <= 0) {
      gap = 'No Gap';
      skillScoreFactor = 1.0;
      gapScore = 0;
      matchingSkills.push(req.skill);
    } else if (diff === 1) {
      gap = 'Medium Gap';
      skillScoreFactor = 0.65;
      gapScore = 35;
      missingSkills.push(req.skill);
    } else if (diff === 2) {
      gap = 'Medium Gap';
      skillScoreFactor = 0.40;
      gapScore = 60;
      missingSkills.push(req.skill);
    } else {
      gap = 'High Gap';
      skillScoreFactor = 0.0;
      gapScore = 100;
      missingSkills.push(req.skill);
    }

    totalWeightedSkillScore += skillScoreFactor * weight;

    skillGaps.push({
      skill: req.skill,
      currentLevel,
      requiredLevel: req.requiredLevel,
      gap,
      priority: req.priority,
      gapScore,
      recommendedCourse: req.recommendedCourse,
      courseId: req.courseId,
      difficulty: req.difficulty,
      estimatedHours: req.duration,
      whyRequired: req.whyRequired,
    });
  });

  const baseSkillPercent = totalPossibleWeight > 0 ? (totalWeightedSkillScore / totalPossibleWeight) * 75 : 50;

  // Bonus for relevant Certifications (up to +12%)
  let certBonus = 0;
  const allReqSkills = post.requiredSkills.map((r) => norm(r.skill));
  (profile.certifications || []).forEach((c) => {
    const certSkills = (c.relatedSkills || []).map(norm);
    const certTitle = norm(c.name || c.title || '');
    const isRelevant = allReqSkills.some(
      (rs) => certSkills.some((cs) => cs.includes(rs) || rs.includes(cs)) || certTitle.includes(rs)
    );
    if (isRelevant) {
      certBonus += c.status === 'Verified' ? 6 : 4;
    }
  });
  certBonus = Math.min(certBonus, 12);

  // Bonus for relevant Projects (up to +10%)
  let projectBonus = 0;
  (profile.projects || []).forEach((p) => {
    const pTech = (p.technologiesUsed || p.technologies || p.skills || []).map(norm);
    const isRelevant = allReqSkills.some((rs) => pTech.some((pt) => pt.includes(rs) || rs.includes(pt)));
    if (isRelevant) {
      projectBonus += 5;
    }
  });
  projectBonus = Math.min(projectBonus, 10);

  // Academic Qualification match bonus (up to +5%)
  let academicBonus = 0;
  if (profile.academicDetails?.cgpa && profile.academicDetails.cgpa >= post.minCgpa) {
    academicBonus = 5;
  }

  let finalPercent = Math.round(baseSkillPercent + certBonus + projectBonus + academicBonus);
  finalPercent = Math.max(20, Math.min(98, finalPercent));

  let status: 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Low Match' = 'Moderate Match';
  if (finalPercent >= 80) status = 'Strong Match';
  else if (finalPercent >= 65) status = 'Good Match';
  else if (finalPercent >= 50) status = 'Moderate Match';
  else status = 'Low Match';

  const recommendedLearning = skillGaps
    .filter((g) => g.gap !== 'No Gap')
    .map((g) => ({
      skill: g.skill,
      whyRequired: g.whyRequired,
      courseTitle: g.recommendedCourse,
      courseId: g.courseId,
      difficulty: g.difficulty,
      duration: g.estimatedHours,
      priority: g.priority,
    }));

  return {
    post,
    postName: post.postName,
    matchPercentage: finalPercent,
    status,
    matchingSkills,
    missingSkills,
    skillGaps,
    requiredQualification: post.requiredQualification,
    recommendedLearning,
  };
}

export function getCareerRecommendations(profile: LearnerProfile): CareerMatchResult[] {
  const norm = (s?: string) => (s || '').toLowerCase().trim();
  const target = norm(profile.targetRole);
  const branch = norm(profile.branch);

  const results = CAREER_POSTS.map((post) => calculateCareerMatch(profile, post));

  return results.sort((a, b) => {
    const aIsTarget = target && (norm(a.postName).includes(target) || target.includes(norm(a.postName)));
    const bIsTarget = target && (norm(b.postName).includes(target) || target.includes(norm(b.postName)));
    if (aIsTarget && !bIsTarget) return -1;
    if (!aIsTarget && bIsTarget) return 1;

    return b.matchPercentage - a.matchPercentage;
  });
}

export function calculateProfileCompletion(profile: LearnerProfile) {
  let basic = 0;
  if (profile.name && profile.studentId && profile.course && profile.branch && profile.year && profile.semester) {
    basic = 20;
  } else if (profile.name) {
    basic = 12;
  }

  let academics = 0;
  if (profile.academicDetails?.cgpa && profile.academicDetails.semesterPerformance?.length > 0) {
    academics = 20;
  } else if (profile.qualification) {
    academics = 10;
  }

  let skills = 0;
  if (profile.skills && profile.skills.length >= 4) {
    skills = 20;
  } else if (profile.skills && profile.skills.length > 0) {
    skills = 12;
  }

  let certs = 0;
  if (profile.certifications && profile.certifications.length >= 2) {
    certs = 20;
  } else if (profile.certifications && profile.certifications.length > 0) {
    certs = 14;
  }

  let projects = 0;
  if (profile.projects && profile.projects.length >= 2) {
    projects = 20;
  } else if (profile.projects && profile.projects.length > 0) {
    projects = 12;
  }

  const total = basic + academics + skills + certs + projects;
  return { total, basic, academics, skills, certs, projects };
}

export function getLearner(): LearnerProfile {
  if (typeof window === 'undefined') return INITIAL_LEARNER;
  try {
    const raw = localStorage.getItem(KEY_LEARNER);
    if (!raw) {
      localStorage.setItem(KEY_LEARNER, JSON.stringify(INITIAL_LEARNER));
      return INITIAL_LEARNER;
    }
    const parsed = JSON.parse(raw);
    const merged: LearnerProfile = {
      ...INITIAL_LEARNER,
      ...parsed,
      academicDetails: {
        ...INITIAL_LEARNER.academicDetails,
        ...(parsed.academicDetails || {}),
        semesterPerformance:
          parsed.academicDetails?.semesterPerformance || INITIAL_LEARNER.academicDetails.semesterPerformance,
        relevantSubjects:
          parsed.academicDetails?.relevantSubjects || INITIAL_LEARNER.academicDetails.relevantSubjects,
        academicAchievements:
          parsed.academicDetails?.academicAchievements || INITIAL_LEARNER.academicDetails.academicAchievements,
      },
      skills:
        parsed.skills && parsed.skills.length > 0
          ? parsed.skills.map((s: any) => {
              let category: SkillCategory = 'Technical Skills';
              if (
                s.category === 'Other Skills' ||
                s.category === 'Soft Skills' ||
                s.name?.toLowerCase().includes('problem solving')
              ) {
                category = 'Other Skills';
              }
              return {
                ...s,
                category,
                proficiencyLevel:
                  s.proficiencyLevel ||
                  (s.proficiency >= 80 ? 'Advanced' : s.proficiency >= 60 ? 'Intermediate' : 'Beginner'),
              };
            })
          : INITIAL_LEARNER.skills,
      certifications:
        parsed.certifications && parsed.certifications.length > 0
          ? parsed.certifications.map((c: any) => ({
              ...c,
              name: c.name || c.title || 'Certification',
              title: c.title || c.name || 'Certification',
              issuingOrg: c.issuingOrg || c.issuer || 'NSDC India',
              issuer: c.issuer || c.issuingOrg || 'NSDC India',
              completionDate: c.completionDate || c.date || '2025',
              date: c.date || c.completionDate || '2025',
              credentialId: c.credentialId || c.verifyId || 'ID-000',
              verifyId: c.verifyId || c.credentialId || 'ID-000',
              relatedSkills: c.relatedSkills || ['Technical Skills'],
            }))
          : INITIAL_LEARNER.certifications,
      projects:
        parsed.projects && parsed.projects.length > 0
          ? parsed.projects.map((p: any) => ({
              ...p,
              technologiesUsed: p.technologiesUsed || p.technologies || p.skills || ['Python'],
              technologies: p.technologies || p.technologiesUsed || p.skills || ['Python'],
              skills: p.skills || p.technologiesUsed || ['Python'],
              studentRole: p.studentRole || p.role || 'Lead Engineer',
              role: p.role || p.studentRole || 'Lead Engineer',
              projectOutcome: p.projectOutcome || p.outcome || 'Deployed functional prototype.',
              outcome: p.outcome || p.projectOutcome || 'Deployed functional prototype.',
              skillsDemonstrated: p.skillsDemonstrated || p.technologiesUsed || ['Software Engineering'],
            }))
          : INITIAL_LEARNER.projects,
    };
    return merged;
  } catch {
    return INITIAL_LEARNER;
  }
}

export function saveLearner(learner: LearnerProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_LEARNER, JSON.stringify(learner));
  } catch (e) {
    console.error(e);
  }
}

export function getTrainers(): TrainerProfile[] {
  if (typeof window === 'undefined') return INITIAL_TRAINERS;
  try {
    const raw = localStorage.getItem(KEY_TRAINERS);
    if (!raw) {
      localStorage.setItem(KEY_TRAINERS, JSON.stringify(INITIAL_TRAINERS));
      return INITIAL_TRAINERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TRAINERS;
  }
}

export function saveTrainers(trainers: TrainerProfile[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_TRAINERS, JSON.stringify(trainers));
  } catch (e) {
    console.error(e);
  }
}

export function getTrainingCenters(): TrainingCenter[] {
  if (typeof window === 'undefined') return INITIAL_TRAINING_CENTERS;
  try {
    const raw = localStorage.getItem(KEY_CENTERS);
    if (!raw) {
      localStorage.setItem(KEY_CENTERS, JSON.stringify(INITIAL_TRAINING_CENTERS));
      return INITIAL_TRAINING_CENTERS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TRAINING_CENTERS;
  }
}

export function getCourses(): CourseProgram[] {
  if (typeof window === 'undefined') return INITIAL_COURSES;
  try {
    const raw = localStorage.getItem(KEY_COURSES);
    if (!raw) {
      localStorage.setItem(KEY_COURSES, JSON.stringify(INITIAL_COURSES));
      return INITIAL_COURSES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_COURSES;
  }
}

export function saveCourses(courses: CourseProgram[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_COURSES, JSON.stringify(courses));
  } catch (e) {
    console.error(e);
  }
}

export function getBatches(): BatchRecord[] {
  if (typeof window === 'undefined') return INITIAL_BATCHES;
  try {
    const raw = localStorage.getItem(KEY_BATCHES);
    if (!raw) {
      localStorage.setItem(KEY_BATCHES, JSON.stringify(INITIAL_BATCHES));
      return INITIAL_BATCHES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_BATCHES;
  }
}

export function saveBatches(batches: BatchRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_BATCHES, JSON.stringify(batches));
  } catch (e) {
    console.error(e);
  }
}

export function getSchemes(): SchemeRecord[] {
  if (typeof window === 'undefined') return INITIAL_SCHEMES;
  try {
    const raw = localStorage.getItem(KEY_SCHEMES);
    if (!raw) {
      localStorage.setItem(KEY_SCHEMES, JSON.stringify(INITIAL_SCHEMES));
      return INITIAL_SCHEMES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_SCHEMES;
  }
}

export function saveSchemes(schemes: SchemeRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(KEY_SCHEMES, JSON.stringify(schemes));
  } catch (e) {
    console.error(e);
  }
}

// Consolidated SIDH Store facade for multi-portal access
const MOCK_LEARNERS_LIST: any[] = [];

export const sidhStore = {
  getLearners: () => {
    const l = getLearner();
    return l && l.id ? [l] : [];
  },
  getLearner: () => getLearner(),
  saveLearner: (learner: LearnerProfile) => saveLearner(learner),
  getLearnerById: (id: string) => {
    const l = getLearner();
    return l && l.id === id ? l : null;
  },
  getCareerPosts: () => CAREER_POSTS,
  getCareerRecommendations: (profile?: LearnerProfile) => getCareerRecommendations(profile || getLearner()),
  calculateCareerMatch: (profile: LearnerProfile, post: CareerPost) => calculateCareerMatch(profile, post),
  calculateProfileCompletion: (profile?: LearnerProfile) => calculateProfileCompletion(profile || getLearner()),

  getTrainers: () =>
    getTrainers().map((t, idx) => ({
      ...t,
      id: idx === 0 ? 'trainer-1' : t.id,
      phone: t.mobile,
      status: t.verificationStatus || 'Verified',
      sector: t.sector || 'IT & ITES',
      qualification: t.qualification || 'M.Tech / Ph.D.',
    })),
  getTrainerById: (id: string) => {
    const list = sidhStore.getTrainers();
    return list.find((t) => t.id === id || t.id === 'trainer-1') || list[0];
  },

  getCourses: () =>
    getCourses().map((c) => ({
      ...c,
      totalHours: c.hoursTotal || 120,
      mode: c.mode || 'Hybrid',
      nsqfLevel: c.nsqfLevel || 5,
    })),
  getCourseById: (id: string) => {
    const list = sidhStore.getCourses();
    return list.find((c) => c.id === id) || list[0];
  },

  getBatches: () =>
    getBatches().map((b, idx) => ({
      ...b,
      id: idx === 0 ? 'batch-1' : b.id,
      trainerId: 'trainer-1',
      name: b.courseTitle || 'Web Application Development Batch',
      code: b.id.toUpperCase() || 'BATCH-2026-WD01',
      timing: b.timings || 'Mon-Fri 09:30 AM - 01:30 PM',
      enrolledLearners: b.enrolledLearnerIds?.length ? b.enrolledLearnerIds.length + 27 : 28,
      maxCapacity: b.capacity || 30,
      status: b.status || 'In Progress',
    })),
  getBatchById: (id: string) => {
    const list = sidhStore.getBatches();
    return list.find((b) => b.id === id) || list[0];
  },

  getAssessments: () =>
    INITIAL_ASSESSMENTS.map((a) => ({
      ...a,
      totalQuestions: a.questionCount || 5,
      sector: 'IT & ITES',
      nsqfLevel: 5,
    })),
  getAssessmentById: (id: string) => {
    const list = sidhStore.getAssessments();
    return list.find((a) => a.id === id) || list[0];
  },

  getSkills: () => [
    { id: 'sk-1', name: 'Frontend Web Development (React & Next.js)', sector: 'IT & ITES', demandLevel: 'High', description: 'Interactive web UI, reactive hooks, and modern server rendering.', relatedJobRoles: ['Web Developer', 'Frontend Engineer'] },
    { id: 'sk-2', name: 'Database Architecture & Relational SQL', sector: 'IT & ITES', demandLevel: 'High', description: 'Relational data schema, normalization, indexes, and queries.', relatedJobRoles: ['Database Administrator', 'Backend Engineer'] },
    { id: 'sk-3', name: 'Python & Machine Learning Foundations', sector: 'IT & ITES', demandLevel: 'High', description: 'Algorithmic programming, statistical modeling, and data pipelines.', relatedJobRoles: ['Data Analyst', 'AI Engineer'] },
    { id: 'sk-4', name: 'Industrial IoT & Sensor Networks', sector: 'Electronics & Hardware', demandLevel: 'Medium', description: 'Embedded systems, microcontrollers, and sensory MQTT telemetry.', relatedJobRoles: ['IoT Specialist', 'Hardware Engineer'] },
    { id: 'sk-5', name: 'Solar PV Plant Installation & Maintenance', sector: 'Renewable Energy', demandLevel: 'High', description: 'Rooftop solar installation, inverter grid synchronization, and safety.', relatedJobRoles: ['Solar Technician', 'Energy Auditor'] },
  ],

  getCertificates: () =>
    INITIAL_LEARNER.certifications.map((c) => ({
      id: c.id,
      title: c.title || c.name || 'NSQF Certificate',
      issuingAuthority: c.issuer || c.issuingOrg || 'NSDC',
      issueDate: c.date || c.completionDate || '2024-05-15',
      credentialId: c.verifyId || c.credentialId || 'NSDC-IND-2024',
      nsqfLevel: 5,
    })),

  getOpportunities: () =>
    INITIAL_OPPORTUNITIES.map((o) => ({
      ...o,
      stipend: o.stipendOrSalary,
      company: o.organization,
      salary: o.stipendOrSalary,
      minNsqfLevel: 5,
      sector: 'IT & ITES',
      skillsRequired: o.requiredSkills,
    })),

  getCenters: () =>
    getTrainingCenters().map((tc) => ({
      ...tc,
      city: tc.district,
      activeBatches: 2,
    })),
  getCenterById: (id: string) => {
    const list = sidhStore.getCenters();
    return list.find((c) => c.id === id) || list[0];
  },

  getSchemes: () =>
    getSchemes().map((s) => ({
      ...s,
      code: s.code,
      enrolledCount: s.currentEnrolled || 62000,
      budgetAllocated: s.budgetCr ? `₹${s.budgetCr} Cr` : '₹500 Cr',
      budgetSpent: `₹${Math.round((s.budgetCr || 300) * 0.82)} Cr`,
      placedCount: Math.round((s.currentEnrolled || 62000) * 0.71),
    })),

  getPolicyInsights: () =>
    INITIAL_INSIGHTS.map((i) => ({
      ...i,
      sector: 'IT-ITeS & Emerging Technologies',
      confidence: 94,
      impactEstimate: 'High (+18% Placements)',
      description: i.finding + ' ' + i.recommendation,
    })),

  getAlerts: () => INITIAL_ALERTS,
};

