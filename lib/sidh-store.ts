// SIDH Skill Development Platform - Central State Store & Service Abstraction
// Supports Learner, Trainer, and Government Portals with LocalStorage persistence and realistic data.

export type SkillProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type SkillCategory = 'Technical Skills' | 'Programming Languages' | 'Tools and Technologies' | 'Soft Skills';

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

  skills: [
    { name: 'Python', category: 'Programming Languages', proficiencyLevel: 'Intermediate', proficiency: 75, verified: true },
    { name: 'SQL', category: 'Technical Skills', proficiencyLevel: 'Intermediate', proficiency: 70, verified: true },
    { name: 'Problem Solving', category: 'Soft Skills', proficiencyLevel: 'Intermediate', proficiency: 80, verified: true },
    { name: 'Git', category: 'Tools and Technologies', proficiencyLevel: 'Beginner', proficiency: 45, verified: false },
    { name: 'REST APIs', category: 'Technical Skills', proficiencyLevel: 'Beginner', proficiency: 40, verified: false },
    { name: 'HTML5 & CSS3', category: 'Technical Skills', proficiencyLevel: 'Advanced', proficiency: 92, verified: true },
    { name: 'JavaScript ES6', category: 'Programming Languages', proficiencyLevel: 'Intermediate', proficiency: 75, verified: true },
    { name: 'React.js', category: 'Technical Skills', proficiencyLevel: 'Intermediate', proficiency: 70, verified: true },
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'Python for Enterprise Systems',
      title: 'Python for Enterprise Systems',
      issuingOrg: 'NPTEL / AICTE',
      issuer: 'NPTEL / AICTE',
      completionDate: 'Jan 2025',
      date: 'Jan 2025',
      credentialId: 'SIDH-CERT-8849',
      verifyId: 'SIDH-CERT-8849',
      relatedSkills: ['Python', 'SQL', 'Problem Solving'],
      status: 'Verified',
    },
    {
      id: 'cert-2',
      name: 'Certified Frontend Web Specialist',
      title: 'Certified Frontend Web Specialist',
      issuingOrg: 'NSDC India',
      issuer: 'NSDC India',
      completionDate: 'Nov 2024',
      date: 'Nov 2024',
      credentialId: 'SIDH-CERT-3291',
      verifyId: 'SIDH-CERT-3291',
      relatedSkills: ['HTML5 & CSS3', 'JavaScript ES6', 'React.js'],
      status: 'Verified',
    },
  ],

  projects: [
    {
      id: 'prj-1',
      title: 'Telemedicine Rural Consultation Scheduler',
      description: 'Web application integrating primary health centers with district hospitals for remote medical triage and automated doctor appointment slots.',
      technologiesUsed: ['Python', 'Flask', 'SQL', 'HTML5 & CSS3'],
      technologies: ['Python', 'Flask', 'SQL', 'HTML5 & CSS3'],
      skills: ['Python', 'Flask', 'SQL', 'HTML5 & CSS3'],
      studentRole: 'Backend & Database Engineer',
      role: 'Backend & Database Engineer',
      projectOutcome: 'Adopted across 3 rural blocks facilitating 400+ weekly consultation appointments with zero database downtime.',
      outcome: 'Adopted across 3 rural blocks facilitating 400+ weekly consultation appointments with zero database downtime.',
      skillsDemonstrated: ['Python', 'SQL', 'Problem Solving'],
      link: 'https://github.com/rahul-au/telemed-rural',
    },
    {
      id: 'prj-2',
      title: 'Vocational Batch Attendance & QR Scanner',
      description: 'Biometric and QR-assisted auditing tool for technical polytechnic laboratories and NSDC vocational skilling batches.',
      technologiesUsed: ['JavaScript ES6', 'React.js', 'REST APIs', 'SQL'],
      technologies: ['JavaScript ES6', 'React.js', 'REST APIs', 'SQL'],
      skills: ['JavaScript ES6', 'React.js', 'REST APIs', 'SQL'],
      studentRole: 'Frontend & API Integration Lead',
      role: 'Frontend & API Integration Lead',
      projectOutcome: 'Reduced batch attendance audit latency from 48 hours to instantaneous digital synchronization.',
      outcome: 'Reduced batch attendance audit latency from 48 hours to instantaneous digital synchronization.',
      skillsDemonstrated: ['JavaScript ES6', 'React.js', 'Problem Solving'],
      link: 'https://github.com/rahul-au/vocational-qr',
    },
  ],

  enrolledCourseIds: ['crs-001', 'crs-002'],
  completedCourseIds: ['crs-001'],
  attendanceRate: 91.5,
  learningHours: 142,
  careerReadinessScore: 82,
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
  status: 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Low Match';
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
}

export const CAREER_POSTS: CareerPost[] = [
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
        skill: 'Git',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Collaborative version control, pull requests, and CI/CD pipelines',
        recommendedCourse: 'Enterprise Git Branching & CI/CD Pipelines',
        courseId: 'crs-004',
        difficulty: 'Intermediate',
        duration: '20 Hours',
      },
      {
        skill: 'REST APIs',
        requiredLevel: 'Intermediate',
        priority: 'High',
        whyRequired: 'Building scalable web services with FastAPI, Django, or Flask',
        recommendedCourse: 'RESTful API Engineering with FastAPI & Django',
        courseId: 'crs-001',
        difficulty: 'Intermediate',
        duration: '35 Hours',
      },
      {
        skill: 'Problem Solving',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Algorithmic thinking and data structures optimization',
        recommendedCourse: 'Data Structures & Algorithmic Problem Solving',
        courseId: 'crs-002',
        difficulty: 'Intermediate',
        duration: '30 Hours',
      },
    ],
  },
  {
    id: 'post-fullstack',
    postName: 'Full Stack Web Developer',
    sector: 'IT-ITeS & Software',
    requiredQualification: 'B.Tech / B.E / MCA in Computer Science, IT or related disciplines',
    minCgpa: 6.5,
    experienceLevel: 'Entry to Mid Level',
    salaryRange: '₹5.5 - ₹9.5 LPA',
    openings: 480,
    description: 'Architect responsive user interfaces and high-performance server APIs using React, Node.js, and cloud datastores.',
    requiredSkills: [
      {
        skill: 'HTML5 & CSS3',
        requiredLevel: 'Advanced',
        priority: 'Medium',
        whyRequired: 'Accessible semantic layouts and responsive design',
        recommendedCourse: 'Advanced CSS Grid, Flexbox & Responsive UI',
        courseId: 'crs-001',
        difficulty: 'Advanced',
        duration: '20 Hours',
      },
      {
        skill: 'JavaScript ES6',
        requiredLevel: 'Advanced',
        priority: 'High',
        whyRequired: 'Asynchronous workflows, functional patterns, and TypeScript',
        recommendedCourse: 'Modern JavaScript & Async Control Flow',
        courseId: 'crs-001',
        difficulty: 'Advanced',
        duration: '30 Hours',
      },
      {
        skill: 'React.js',
        requiredLevel: 'Advanced',
        priority: 'High',
        whyRequired: 'Component state architecture, hooks, and Next.js rendering',
        recommendedCourse: 'React Hooks, State & Component Lifecycle',
        courseId: 'crs-001',
        difficulty: 'Advanced',
        duration: '45 Hours',
      },
      {
        skill: 'SQL',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Relational data schema, normalization, and query performance',
        recommendedCourse: 'Enterprise Database Systems & Normalization',
        courseId: 'crs-001',
        difficulty: 'Intermediate',
        duration: '25 Hours',
      },
      {
        skill: 'REST APIs',
        requiredLevel: 'Intermediate',
        priority: 'High',
        whyRequired: 'Backend endpoint consumption and JSON payload serialization',
        recommendedCourse: 'Node.js, Express & Enterprise REST APIs',
        courseId: 'crs-001',
        difficulty: 'Intermediate',
        duration: '40 Hours',
      },
      {
        skill: 'Git',
        requiredLevel: 'Intermediate',
        priority: 'Low',
        whyRequired: 'Collaborative code reviews and release automation',
        recommendedCourse: 'Enterprise Git Branching & CI/CD Pipelines',
        courseId: 'crs-004',
        difficulty: 'Intermediate',
        duration: '20 Hours',
      },
    ],
  },
  {
    id: 'post-bi-analyst',
    postName: 'Data Analyst / BI Specialist',
    sector: 'BFSI & IT Analytics',
    requiredQualification: 'B.Tech, B.Sc (Maths/Stats/CS), BCA, or Economics with analytics background',
    minCgpa: 6.0,
    experienceLevel: 'Entry Level',
    salaryRange: '₹4.8 - ₹8.0 LPA',
    openings: 290,
    description: 'Transform complex multi-source organizational datasets into executive decision dashboards and automated reporting pipelines.',
    requiredSkills: [
      {
        skill: 'SQL',
        requiredLevel: 'Advanced',
        priority: 'High',
        whyRequired: 'Complex aggregations, window functions, and CTE data modeling',
        recommendedCourse: 'Advanced SQL & Window Functions for Analytics',
        courseId: 'crs-001',
        difficulty: 'Advanced',
        duration: '30 Hours',
      },
      {
        skill: 'Python',
        requiredLevel: 'Intermediate',
        priority: 'High',
        whyRequired: 'Data wrangling with Pandas, NumPy, and automation scripts',
        recommendedCourse: 'Python for Data Analysis & Pandas Pipelines',
        courseId: 'crs-003',
        difficulty: 'Intermediate',
        duration: '35 Hours',
      },
      {
        skill: 'Problem Solving',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Statistical reasoning, outlier detection, and anomaly diagnosis',
        recommendedCourse: 'Business Analytics Foundations & Hypothesis Testing',
        courseId: 'crs-003',
        difficulty: 'Intermediate',
        duration: '25 Hours',
      },
    ],
  },
  {
    id: 'post-cloud-devops',
    postName: 'Cloud & DevOps Associate',
    sector: 'Cloud & Infrastructure',
    requiredQualification: 'B.Tech / Diploma in CS, IT, or Electronics',
    minCgpa: 6.0,
    experienceLevel: 'Entry to Associate Level',
    salaryRange: '₹5.0 - ₹9.0 LPA',
    openings: 240,
    description: 'Provision scalable container clusters, configure CI/CD delivery pipelines, and monitor cloud uptime.',
    requiredSkills: [
      {
        skill: 'Git',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'GitOps workflows and branch protection rules',
        recommendedCourse: 'Enterprise Git Branching & CI/CD Pipelines',
        courseId: 'crs-004',
        difficulty: 'Intermediate',
        duration: '20 Hours',
      },
      {
        skill: 'REST APIs',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Configuring webhooks, cloud API gateways, and telemetry endpoints',
        recommendedCourse: 'RESTful API Engineering with FastAPI & Django',
        courseId: 'crs-001',
        difficulty: 'Intermediate',
        duration: '35 Hours',
      },
      {
        skill: 'Python',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Infrastructure automation scripts and CLI utility development',
        recommendedCourse: 'Python Automation for Cloud Systems',
        courseId: 'crs-002',
        difficulty: 'Intermediate',
        duration: '25 Hours',
      },
      {
        skill: 'Problem Solving',
        requiredLevel: 'Intermediate',
        priority: 'High',
        whyRequired: 'Production outage diagnosis and root-cause post-mortems',
        recommendedCourse: 'DevOps Engineering, Docker Containers & Kubernetes',
        courseId: 'crs-004',
        difficulty: 'Intermediate',
        duration: '45 Hours',
      },
    ],
  },
  {
    id: 'post-cybersecurity',
    postName: 'Cybersecurity Analyst (SOC Tier 1)',
    sector: 'Cybersecurity & Defense',
    requiredQualification: 'B.Tech / B.Sc in Information Security, Computer Science, or Electronics',
    minCgpa: 6.5,
    experienceLevel: 'Entry Level',
    salaryRange: '₹5.2 - ₹8.8 LPA',
    openings: 180,
    description: 'Triage real-time threat telemetry, analyze suspicious network packet captures, and enforce defensive posture.',
    requiredSkills: [
      {
        skill: 'Python',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Security automation scripts, IOC scraping, and payload parsing',
        recommendedCourse: 'Python for Security Practitioners',
        courseId: 'crs-002',
        difficulty: 'Intermediate',
        duration: '25 Hours',
      },
      {
        skill: 'REST APIs',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Integrating SIEM platforms with threat intelligence feeds',
        recommendedCourse: 'RESTful API Engineering with FastAPI & Django',
        courseId: 'crs-001',
        difficulty: 'Intermediate',
        duration: '35 Hours',
      },
      {
        skill: 'Problem Solving',
        requiredLevel: 'Intermediate',
        priority: 'High',
        whyRequired: 'Incident triage and security forensic analysis',
        recommendedCourse: 'Cyber Defense & Web Application Security',
        courseId: 'crs-005',
        difficulty: 'Intermediate',
        duration: '30 Hours',
      },
    ],
  },
  {
    id: 'post-aiml',
    postName: 'AI / Machine Learning Junior Engineer',
    sector: 'Artificial Intelligence & Deep Tech',
    requiredQualification: 'B.Tech / M.Tech in CS, AI, Data Science with strong algorithmic foundations',
    minCgpa: 7.0,
    experienceLevel: 'Entry to Research Associate',
    salaryRange: '₹6.5 - ₹12.0 LPA',
    openings: 210,
    description: 'Train predictive models, fine-tune transformer weights, and deploy real-time inference microservices.',
    requiredSkills: [
      {
        skill: 'Python',
        requiredLevel: 'Advanced',
        priority: 'High',
        whyRequired: 'NumPy vectorization, PyTorch pipelines, and model evaluation',
        recommendedCourse: 'Applied Deep Learning & PyTorch Architecture',
        courseId: 'crs-002',
        difficulty: 'Advanced',
        duration: '50 Hours',
      },
      {
        skill: 'SQL',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Extracting training datasets and feature engineering from data warehouses',
        recommendedCourse: 'Enterprise Database Systems & Normalization',
        courseId: 'crs-001',
        difficulty: 'Intermediate',
        duration: '25 Hours',
      },
      {
        skill: 'Problem Solving',
        requiredLevel: 'Advanced',
        priority: 'High',
        whyRequired: 'Mathematical optimization, gradient descent, and loss minimization',
        recommendedCourse: 'Algorithmic Mathematics & Statistical Modeling',
        courseId: 'crs-002',
        difficulty: 'Advanced',
        duration: '40 Hours',
      },
      {
        skill: 'REST APIs',
        requiredLevel: 'Intermediate',
        priority: 'Medium',
        whyRequired: 'Deploying model prediction endpoints via FastAPI and container runtimes',
        recommendedCourse: 'RESTful API Engineering with FastAPI & Django',
        courseId: 'crs-001',
        difficulty: 'Intermediate',
        duration: '35 Hours',
      },
    ],
  },
];

export function calculateCareerMatch(profile: LearnerProfile, post: CareerPost): CareerMatchResult {
  const norm = (s: string) => (s || '').toLowerCase().trim();

  // Helper to find a skill in candidate profile
  const findSkill = (reqName: string) => {
    const q = norm(reqName);
    return profile.skills.find((s) => {
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
  return CAREER_POSTS.map((post) => calculateCareerMatch(profile, post)).sort(
    (a, b) => b.matchPercentage - a.matchPercentage
  );
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
          ? parsed.skills.map((s: any) => ({
              ...s,
              proficiencyLevel:
                s.proficiencyLevel ||
                (s.proficiency >= 80 ? 'Advanced' : s.proficiency >= 60 ? 'Intermediate' : 'Beginner'),
            }))
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

const DEFAULT_TRAINER: any = {
  id: 'trainer-default',
  name: 'Accredited Master Trainer',
  email: 'provider@skilltrack.org.in',
  phone: '+91 80 2345 6789',
  status: 'Verified',
  sector: 'IT & ITES',
  qualification: 'M.Tech / Certified Master Trainer',
};

const DEFAULT_COURSE: any = {
  id: 'crs-default',
  title: 'Full Stack Web & Application Development',
  code: 'WD-NSQF-5',
  sector: 'IT & ITES',
  nsqfLevel: 5,
  totalHours: 200,
  mode: 'Hybrid',
  description: 'Accredited NSQF course aligned with National Occupational Standards.',
  syllabus: [],
};

const DEFAULT_BATCH: any = {
  id: 'batch-default',
  trainerId: 'trainer-1',
  name: 'Standard Skilling Batch',
  code: 'BATCH-2026-01',
  timing: 'Mon-Fri 09:30 AM - 01:30 PM',
  enrolledLearners: 0,
  maxCapacity: 30,
  status: 'In Progress',
};

const DEFAULT_ASSESSMENT: any = {
  id: 'ass-default',
  title: 'Summative Practical Assessment',
  totalQuestions: 5,
  passingScore: 60,
  sector: 'IT & ITES',
  nsqfLevel: 5,
};

export const sidhStore = {
  getLearners: () => {
    const l = getLearner();
    return l && l.id ? [l] : [];
  },
  getLearner: () => getLearner(),
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
    return list.find((t) => t.id === id || t.id === 'trainer-1') || list[0] || DEFAULT_TRAINER;
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
    return list.find((c) => c.id === id) || list[0] || DEFAULT_COURSE;
  },

  getBatches: () =>
    getBatches().map((b, idx) => ({
      ...b,
      id: idx === 0 ? 'batch-1' : b.id,
      trainerId: 'trainer-1',
      name: b.courseTitle || 'Web Application Development Batch',
      code: b.id.toUpperCase() || 'BATCH-2026-WD01',
      timing: b.timings || 'Mon-Fri 09:30 AM - 01:30 PM',
      enrolledLearners: b.enrolledLearnerIds?.length ? b.enrolledLearnerIds.length : 0,
      maxCapacity: b.capacity || 30,
      status: b.status || 'In Progress',
    })),
  getBatchById: (id: string) => {
    const list = sidhStore.getBatches();
    return list.find((b) => b.id === id) || list[0] || DEFAULT_BATCH;
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
    return list.find((a) => a.id === id) || list[0] || DEFAULT_ASSESSMENT;
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

