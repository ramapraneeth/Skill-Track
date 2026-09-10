// SkillBridge AI - National Outcome Intelligence & Data Architecture Store

export type PlacementStage =
  | 'NOT READY'
  | 'TRAINING'
  | 'SKILL DEVELOPMENT'
  | 'ASSESSMENT'
  | 'PLACEMENT READY'
  | 'INTERVIEWING'
  | 'PLACED'
  | 'EMPLOYED';

export interface StudentSkill {
  id: string;
  name: string;
  proficiency: number; // 0 - 100
  category: 'Software' | 'Data' | 'Cloud & DevOps' | 'Core Engineering' | 'Soft Skills' | 'AI & ML';
  verified: boolean;
}

export interface SkillGapAnalysis {
  strong: { name: string; score: number; level: string }[];
  improve: { name: string; score: number; target: number; delta: number }[];
  missing: { name: string; industryImportance: 'CRITICAL' | 'HIGH' | 'MEDIUM'; reason: string }[];
  future: { name: string; horizon: string; trendGrowth: string }[];
}

export interface StudentRecord {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  mobile: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  state: string;
  district: string;
  college: string;
  university: string;
  degree: string;
  branch: string;
  graduationYear: number;
  careerGoal: string;
  targetRole: string;
  employabilityScore: number; // 0 - 100
  placementStatus: PlacementStage;
  currentSkills: StudentSkill[];
  skillGaps: SkillGapAnalysis;
  enrolledCourseIds: string[];
  completedCourseIds: string[];
  certifications: { title: string; issuer: string; date: string; verified: boolean }[];
  projects: { title: string; skills: string[]; description: string; githubUrl?: string }[];
  internships: { company: string; role: string; duration: string; stipend: string }[];
  placementDetails?: {
    company: string;
    role: string;
    salaryLpa: number;
    placementDate: string;
    status: 'PLACED' | 'EMPLOYED';
  };
  assignedTrainerId: string;
  nextBestAction: {
    title: string;
    reason: string;
    recommendedCourseId?: string;
    urgency: 'HIGH' | 'MEDIUM' | 'RECOMMENDED';
  };
}

export interface TrainerRecord {
  id: string;
  userId: string;
  name: string;
  trainerIdCode: string;
  email: string;
  mobile: string;
  organization: string;
  qualification: string;
  specialization: string;
  experienceYears: number;
  skills: string[];
  certifications: string[];
  location: string;
  rating: number;
  assignedStudentIds: string[];
  activeCourseIds: string[];
  nextBestAction: {
    action: string;
    reason: string;
    targetCount: number;
  };
}

export interface CourseIntelligenceRecord {
  id: string;
  courseCode: string;
  title: string;
  provider: string;
  trainerId: string;
  trainerName: string;
  category: string;
  skillsCovered: string[];
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  capacity: number;
  enrolledCount: number;
  completedCount: number;
  certifiedCount: number;
  placementReadyCount: number;
  placedCount: number;
  placementRatePct: number; // (placedCount / completedCount) * 100
  avgSalaryLpa: number;
  industryDemand: 'VERY HIGH' | 'HIGH' | 'MODERATE';
  courseImpactScore: number; // 0 - 100
  studentRating: number;
  status: 'ACTIVE' | 'UPCOMING';
  impactBreakdown: {
    skillImprovementPct: number;
    completionRatePct: number;
    assessmentAvgPct: number;
    certificationRatePct: number;
    placementRatePct: number;
    industryRelevancePct: number;
  };
  description: string;
  syllabus: string[];
}

export interface CompanyRecord {
  id: string;
  name: string;
  industry: string;
  location: string;
  openRolesCount: number;
  hiredStudentsCount: number;
  topSkillsRequired: string[];
  avgSalaryOfferedLpa: number;
}

export interface SkillCapacityRecord {
  skillName: string;
  sector: string;
  studentsMissing: number;
  industryDemand: 'VERY HIGH' | 'HIGH' | 'MODERATE';
  availableCourses: number;
  currentSeats: number;
  capacityGap: number;
  recommendation: string;
  affectedStates: string[];
}

// -------------------------------------------------------------
// INITIAL SEED DATA
// -------------------------------------------------------------

export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: 'std-101',
    userId: 'usr-std-101',
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@skillbridge.gov.in',
    mobile: '+91 98480 12345',
    dob: '2003-04-15',
    gender: 'Male',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    college: 'Andhra University College of Engineering',
    university: 'Andhra University',
    degree: 'B.Tech',
    branch: 'Computer Science & Engineering',
    graduationYear: 2025,
    careerGoal: 'Full Stack Software Developer',
    targetRole: 'Full Stack Engineer',
    employabilityScore: 78,
    placementStatus: 'SKILL DEVELOPMENT',
    assignedTrainerId: 'trn-201',
    currentSkills: [
      { id: 'sk-1', name: 'Python', proficiency: 85, category: 'Software', verified: true },
      { id: 'sk-2', name: 'C++', proficiency: 80, category: 'Software', verified: true },
      { id: 'sk-3', name: 'HTML & CSS', proficiency: 88, category: 'Software', verified: true },
      { id: 'sk-4', name: 'JavaScript', proficiency: 72, category: 'Software', verified: true },
      { id: 'sk-5', name: 'Java', proficiency: 58, category: 'Software', verified: false },
      { id: 'sk-6', name: 'DBMS / SQL', proficiency: 62, category: 'Data', verified: false },
    ],
    skillGaps: {
      strong: [
        { name: 'Python', score: 85, level: 'Advanced' },
        { name: 'C++', score: 80, level: 'Proficient' },
        { name: 'HTML & CSS', score: 88, level: 'Advanced' },
      ],
      improve: [
        { name: 'JavaScript', score: 72, target: 85, delta: 13 },
        { name: 'Java', score: 58, target: 80, delta: 22 },
        { name: 'DBMS / SQL', score: 62, target: 80, delta: 18 },
      ],
      missing: [
        { name: 'Data Structures & Algorithms', industryImportance: 'CRITICAL', reason: 'Mandatory for technical screenings in 84% of IT product companies' },
        { name: 'Git & CI/CD Pipelines', industryImportance: 'HIGH', reason: 'Essential modern version control and DevOps workflow requirement' },
        { name: 'Cloud Architecture (AWS)', industryImportance: 'HIGH', reason: 'Required by top cloud consulting and backend engineering teams' },
      ],
      future: [
        { name: 'GenAI & LangChain', horizon: '6 Months', trendGrowth: '+140% YoY' },
        { name: 'Microservices Architecture', horizon: '12 Months', trendGrowth: '+65% YoY' },
      ],
    },
    enrolledCourseIds: ['crs-001', 'crs-002'],
    completedCourseIds: ['crs-001'],
    certifications: [
      { title: 'Python for Enterprise Applications', issuer: 'NPTEL / AICTE', date: 'Jan 2025', verified: true },
      { title: 'Frontend Web Specialist', issuer: 'National Skill Development Corp', date: 'Nov 2024', verified: true },
    ],
    projects: [
      { title: 'Smart Village Healthcare Portal', skills: ['Python', 'Flask', 'HTML/CSS'], description: 'Telemedicine scheduler for primary health centers in Vizianagaram.' },
      { title: 'Campus Placement Prep Tracker', skills: ['JavaScript', 'LocalStorage', 'Tailwind'], description: 'Interactive mock test evaluator with dynamic scoring.' },
    ],
    internships: [
      { company: 'AP State Data Center (APSDC)', role: 'Web Development Trainee', duration: '2 Months (Summer 2024)', stipend: '₹8,000/mo' },
    ],
    nextBestAction: {
      title: 'Complete Java & Data Structures Masterclass',
      reason: 'Java & DSA constitute 40% of your remaining skill gap for Full Stack Developer roles.',
      recommendedCourseId: 'crs-002',
      urgency: 'HIGH',
    },
  },
  {
    id: 'std-102',
    userId: 'usr-std-102',
    fullName: 'Priya Patel',
    email: 'priya.patel@skillbridge.gov.in',
    mobile: '+91 97123 45678',
    dob: '2002-11-20',
    gender: 'Female',
    state: 'Gujarat',
    district: 'Ahmedabad',
    college: 'L.D. College of Engineering',
    university: 'Gujarat Technological University',
    degree: 'B.E.',
    branch: 'Information Technology',
    graduationYear: 2025,
    careerGoal: 'Business Intelligence & Data Analyst',
    targetRole: 'Data Analyst',
    employabilityScore: 84,
    placementStatus: 'PLACEMENT READY',
    assignedTrainerId: 'trn-202',
    currentSkills: [
      { id: 'sk-11', name: 'Python for Data Science', proficiency: 88, category: 'Data', verified: true },
      { id: 'sk-12', name: 'Advanced SQL', proficiency: 86, category: 'Data', verified: true },
      { id: 'sk-13', name: 'Microsoft Power BI', proficiency: 82, category: 'Data', verified: true },
      { id: 'sk-14', name: 'Advanced Excel', proficiency: 92, category: 'Data', verified: true },
      { id: 'sk-15', name: 'Statistical Modeling', proficiency: 70, category: 'Data', verified: false },
    ],
    skillGaps: {
      strong: [
        { name: 'Advanced Excel', score: 92, level: 'Expert' },
        { name: 'Python for Data Science', score: 88, level: 'Advanced' },
        { name: 'Advanced SQL', score: 86, level: 'Advanced' },
        { name: 'Microsoft Power BI', score: 82, level: 'Proficient' },
      ],
      improve: [
        { name: 'Statistical Modeling', score: 70, target: 85, delta: 15 },
      ],
      missing: [
        { name: 'Snowflake Data Cloud', industryImportance: 'HIGH', reason: 'High enterprise demand for cloud data warehouse migration' },
        { name: 'Apache Spark / Big Data', industryImportance: 'MEDIUM', reason: 'Differentiator for mid-to-large corporate analytics teams' },
      ],
      future: [
        { name: 'Predictive AI in Power BI', horizon: '6 Months', trendGrowth: '+115% YoY' },
      ],
    },
    enrolledCourseIds: ['crs-004', 'crs-005'],
    completedCourseIds: ['crs-004', 'crs-005'],
    certifications: [
      { title: 'Microsoft Certified: Power BI Data Analyst Associate', issuer: 'Microsoft', date: 'Dec 2024', verified: true },
      { title: 'PostgreSQL for Data Engineers', issuer: 'Coursera / AWS', date: 'Aug 2024', verified: true },
    ],
    projects: [
      { title: 'Statewide Agricultural Crop Yield Dashboard', skills: ['Power BI', 'SQL', 'Python'], description: 'Analyzed 5-year monsoon data to forecast district yields in Saurashtra.' },
    ],
    internships: [
      { company: 'Adani Digital Labs', role: 'Analytics Intern', duration: '3 Months', stipend: '₹18,000/mo' },
    ],
    placementDetails: {
      company: 'Tata Consultancy Services',
      role: 'Associate Business Intelligence Analyst',
      salaryLpa: 6.2,
      placementDate: '2025-02-14',
      status: 'PLACED',
    },
    nextBestAction: {
      title: 'Enroll in Cloud Data Warehousing (Snowflake)',
      reason: 'Elevates placement prospects to Tier-1 product analytics consulting roles.',
      recommendedCourseId: 'crs-006',
      urgency: 'RECOMMENDED',
    },
  },
  {
    id: 'std-103',
    userId: 'usr-std-103',
    fullName: 'Amit Verma',
    email: 'amit.verma@skillbridge.gov.in',
    mobile: '+91 99887 76655',
    dob: '2003-08-10',
    gender: 'Male',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    college: 'Institute of Engineering and Technology (IET)',
    university: 'AKTU',
    degree: 'B.Tech',
    branch: 'Electronics & Communication',
    graduationYear: 2025,
    careerGoal: 'Cloud & DevOps Engineer',
    targetRole: 'DevOps Engineer',
    employabilityScore: 61,
    placementStatus: 'TRAINING',
    assignedTrainerId: 'trn-203',
    currentSkills: [
      { id: 'sk-21', name: 'Linux System Admin', proficiency: 68, category: 'Cloud & DevOps', verified: true },
      { id: 'sk-22', name: 'Bash Scripting', proficiency: 65, category: 'Cloud & DevOps', verified: false },
      { id: 'sk-23', name: 'Computer Networking', proficiency: 74, category: 'Core Engineering', verified: true },
    ],
    skillGaps: {
      strong: [
        { name: 'Computer Networking', score: 74, level: 'Proficient' },
      ],
      improve: [
        { name: 'Linux System Admin', score: 68, target: 85, delta: 17 },
        { name: 'Bash Scripting', score: 65, target: 80, delta: 15 },
      ],
      missing: [
        { name: 'Docker & Containerization', industryImportance: 'CRITICAL', reason: 'Mandatory standard for 96% of enterprise DevOps roles' },
        { name: 'Kubernetes Orchestration', industryImportance: 'CRITICAL', reason: 'Required in almost all cloud native deployment vacancies' },
        { name: 'Terraform Infrastructure as Code', industryImportance: 'HIGH', reason: 'Key automation technology for multi-cloud deployments' },
        { name: 'AWS Certified Cloud Practitioner', industryImportance: 'HIGH', reason: 'Baseline industry certification benchmark' },
      ],
      future: [
        { name: 'GitOps & ArgoCD', horizon: '12 Months', trendGrowth: '+85% YoY' },
      ],
    },
    enrolledCourseIds: ['crs-007'],
    completedCourseIds: [],
    certifications: [],
    projects: [
      { title: 'Automated Multi-Server Log Backup', skills: ['Bash', 'Linux', 'Cron'], description: 'Automated cron-based archiving with rsync over SSH.' },
    ],
    internships: [],
    nextBestAction: {
      title: 'Complete Docker & Container Fundamentals',
      reason: 'Containerization is your highest-impact missing skill to reach placement-ready criteria.',
      recommendedCourseId: 'crs-007',
      urgency: 'HIGH',
    },
  },
  {
    id: 'std-104',
    userId: 'usr-std-104',
    fullName: 'Sneha Reddy',
    email: 'sneha.reddy@skillbridge.gov.in',
    mobile: '+91 94401 23456',
    dob: '2002-05-18',
    gender: 'Female',
    state: 'Telangana',
    district: 'Hyderabad',
    college: 'JNTU College of Engineering',
    university: 'JNTU Hyderabad',
    degree: 'B.Tech',
    branch: 'Computer Science',
    graduationYear: 2025,
    careerGoal: 'AI & Machine Learning Engineer',
    targetRole: 'Machine Learning Engineer',
    employabilityScore: 92,
    placementStatus: 'EMPLOYED',
    assignedTrainerId: 'trn-201',
    currentSkills: [
      { id: 'sk-31', name: 'Python & NumPy', proficiency: 94, category: 'AI & ML', verified: true },
      { id: 'sk-32', name: 'PyTorch / Deep Learning', proficiency: 88, category: 'AI & ML', verified: true },
      { id: 'sk-33', name: 'Natural Language Processing', proficiency: 85, category: 'AI & ML', verified: true },
      { id: 'sk-34', name: 'MLOps & Model Deployment', proficiency: 81, category: 'AI & ML', verified: true },
    ],
    skillGaps: {
      strong: [
        { name: 'Python & NumPy', score: 94, level: 'Expert' },
        { name: 'PyTorch / Deep Learning', score: 88, level: 'Advanced' },
        { name: 'Natural Language Processing', score: 85, level: 'Advanced' },
        { name: 'MLOps & Model Deployment', score: 81, level: 'Proficient' },
      ],
      improve: [],
      missing: [
        { name: 'Distributed GPU Training (DeepSpeed)', industryImportance: 'MEDIUM', reason: 'High performance cluster tuning for large LLMs' },
      ],
      future: [
        { name: 'Multi-Modal Reasoning Models', horizon: '6 Months', trendGrowth: '+220% YoY' },
      ],
    },
    enrolledCourseIds: ['crs-008'],
    completedCourseIds: ['crs-008'],
    certifications: [
      { title: 'TensorFlow Developer Certificate', issuer: 'Google', date: 'Oct 2024', verified: true },
      { title: 'AWS Certified Machine Learning - Specialty', issuer: 'Amazon Web Services', date: 'Jan 2025', verified: true },
    ],
    projects: [
      { title: 'Telugu Speech-to-Text for Rural Governance', skills: ['PyTorch', 'Whisper', 'FastAPI'], description: 'Fine-tuned speech model for citizen grievance redressal kiosks.' },
    ],
    internships: [
      { company: 'Microsoft IDC Hyderabad', role: 'Applied ML Research Intern', duration: '6 Months', stipend: '₹45,000/mo' },
    ],
    placementDetails: {
      company: 'Microsoft IDC',
      role: 'Software Development Engineer - AI',
      salaryLpa: 19.5,
      placementDate: '2025-01-20',
      status: 'EMPLOYED',
    },
    nextBestAction: {
      title: 'Mentor Junior Cohort in Applied ML',
      reason: 'All target skills achieved. Eligible for Master Student Digital Skill Passport accreditation.',
      urgency: 'RECOMMENDED',
    },
  },
  {
    id: 'std-105',
    userId: 'usr-std-105',
    fullName: 'Kavita Sundaram',
    email: 'kavita.sundaram@skillbridge.gov.in',
    mobile: '+91 94440 98765',
    dob: '2003-02-14',
    gender: 'Female',
    state: 'Tamil Nadu',
    district: 'Chennai',
    college: 'Anna University CEG Campus',
    university: 'Anna University',
    degree: 'B.E.',
    branch: 'Computer Technology',
    graduationYear: 2025,
    careerGoal: 'Cybersecurity Analyst & SOC Specialist',
    targetRole: 'Cybersecurity Analyst',
    employabilityScore: 74,
    placementStatus: 'INTERVIEWING',
    assignedTrainerId: 'trn-204',
    currentSkills: [
      { id: 'sk-41', name: 'Network Security', proficiency: 78, category: 'Software', verified: true },
      { id: 'sk-42', name: 'Wireshark & Packet Analysis', proficiency: 82, category: 'Software', verified: true },
      { id: 'sk-43', name: 'Vulnerability Assessment', proficiency: 65, category: 'Software', verified: false },
    ],
    skillGaps: {
      strong: [
        { name: 'Wireshark & Packet Analysis', score: 82, level: 'Proficient' },
        { name: 'Network Security', score: 78, level: 'Proficient' },
      ],
      improve: [
        { name: 'Vulnerability Assessment', score: 65, target: 80, delta: 15 },
      ],
      missing: [
        { name: 'SIEM Tools (Splunk / QRadar)', industryImportance: 'CRITICAL', reason: 'Core tool for Security Operations Center incident triage' },
        { name: 'Incident Response Protocols', industryImportance: 'HIGH', reason: 'Tested in all second-round SOC technical interviews' },
      ],
      future: [
        { name: 'Zero Trust Architecture', horizon: '12 Months', trendGrowth: '+95% YoY' },
      ],
    },
    enrolledCourseIds: ['crs-009'],
    completedCourseIds: [],
    certifications: [
      { title: 'CompTIA Security+ Certified', issuer: 'CompTIA', date: 'Nov 2024', verified: true },
    ],
    projects: [
      { title: 'Automated Intrusion Detection Honeypot', skills: ['Snort', 'Python', 'Linux'], description: 'Simulated IoT vulnerabilities to log dictionary attacks.' },
    ],
    internships: [
      { company: 'Tamil Nadu e-Governance Agency (TNeGA)', role: 'Cyber Threat Intern', duration: '2 Months', stipend: '₹12,000/mo' },
    ],
    nextBestAction: {
      title: 'Complete Splunk SIEM Hands-On Lab',
      reason: 'Splunk proficiency closes the only remaining gap before your upcoming Wipro SOC interview.',
      recommendedCourseId: 'crs-009',
      urgency: 'HIGH',
    },
  },
];

export const INITIAL_TRAINERS: TrainerRecord[] = [
  {
    id: 'trn-201',
    userId: 'usr-trn-201',
    name: 'Prof. Rajesh Nair',
    trainerIdCode: 'TRN-IND-4091',
    email: 'rajesh.nair@skillbridge.gov.in',
    mobile: '+91 98450 11223',
    organization: 'Apex National Skilling Academy',
    qualification: 'M.Tech (Computer Science), PhD Scholar',
    specialization: 'Full Stack Engineering & Cloud Platforms',
    experienceYears: 12,
    skills: ['Java', 'Spring Boot', 'React', 'AWS', 'System Design'],
    certifications: ['AWS Certified Solutions Architect', 'Oracle Certified Professional Java SE'],
    location: 'Visakhapatnam, Andhra Pradesh',
    rating: 4.88,
    assignedStudentIds: ['std-101', 'std-104'],
    activeCourseIds: ['crs-001', 'crs-002', 'crs-008'],
    nextBestAction: {
      action: 'Provide additional DSA practice to 18 students',
      reason: 'Recent mid-term assessment performance indicates a common DSA recursion & trees skill gap.',
      targetCount: 18,
    },
  },
  {
    id: 'trn-202',
    userId: 'usr-trn-202',
    name: 'Dr. Sunita Rao',
    trainerIdCode: 'TRN-IND-5210',
    email: 'sunita.rao@skillbridge.gov.in',
    mobile: '+91 98200 33445',
    organization: 'Gujarat Council for Skill Development',
    qualification: 'Ph.D. in Data Science & Operations Research',
    specialization: 'Big Data, Business Analytics & Power BI',
    experienceYears: 15,
    skills: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Tableau'],
    certifications: ['Microsoft Certified Trainer (MCT)', 'Google Professional Data Engineer'],
    location: 'Ahmedabad, Gujarat',
    rating: 4.92,
    assignedStudentIds: ['std-102'],
    activeCourseIds: ['crs-004', 'crs-005', 'crs-006'],
    nextBestAction: {
      action: 'Conduct Snowflake schema design masterclass',
      reason: 'Enterprise demand for cloud warehouse skills surged by 34% this quarter in banking clients.',
      targetCount: 14,
    },
  },
  {
    id: 'trn-203',
    userId: 'usr-trn-203',
    name: 'Vikramjit Singh',
    trainerIdCode: 'TRN-IND-6112',
    email: 'vikram.singh@skillbridge.gov.in',
    mobile: '+91 99100 55667',
    organization: 'Northern Regional Skilling Institute',
    qualification: 'B.Tech (IT), Red Hat Certified Architect (RHCA)',
    specialization: 'DevOps, Kubernetes & Infrastructure as Code',
    experienceYears: 9,
    skills: ['Docker', 'Kubernetes', 'Terraform', 'Linux', 'Ansible'],
    certifications: ['Certified Kubernetes Administrator (CKA)', 'Red Hat RHCA'],
    location: 'Lucknow, Uttar Pradesh',
    rating: 4.79,
    assignedStudentIds: ['std-103'],
    activeCourseIds: ['crs-007'],
    nextBestAction: {
      action: 'Schedule hands-on container troubleshooting lab',
      reason: '6 students in Batch 2025-A need remediation in Docker multi-stage builds.',
      targetCount: 6,
    },
  },
  {
    id: 'trn-204',
    userId: 'usr-trn-204',
    name: 'Ananya Deshmukh',
    trainerIdCode: 'TRN-IND-7834',
    email: 'ananya.deshmukh@skillbridge.gov.in',
    mobile: '+91 98800 77889',
    organization: 'Cyber Defense & Security Training Hub',
    qualification: 'M.S. in Information Security, CEH, CISSP',
    specialization: 'SOC Operations, Threat Hunting & SIEM',
    experienceYears: 11,
    skills: ['Splunk', 'Wireshark', 'Metasploit', 'Incident Response', 'OWASP'],
    certifications: ['CISSP', 'Certified Ethical Hacker (CEH v12)'],
    location: 'Chennai, Tamil Nadu',
    rating: 4.85,
    assignedStudentIds: ['std-105'],
    activeCourseIds: ['crs-009'],
    nextBestAction: {
      action: 'Launch Splunk log correlation drill',
      reason: 'Prepares 12 candidates for upcoming government e-Governance SOC placement drive.',
      targetCount: 12,
    },
  },
];

export const INITIAL_COURSES: CourseIntelligenceRecord[] = [
  {
    id: 'crs-001',
    courseCode: 'CRS-FSD-01',
    title: 'Full Stack Web Development & React Architecture',
    provider: 'National Skill Development Corporation (NSDC)',
    trainerId: 'trn-201',
    trainerName: 'Prof. Rajesh Nair',
    category: 'Software Development',
    skillsCovered: ['HTML & CSS', 'JavaScript', 'React.js', 'Node.js', 'REST APIs'],
    skillLevel: 'Intermediate',
    durationWeeks: 12,
    capacity: 500,
    enrolledCount: 500,
    completedCount: 420,
    certifiedCount: 380,
    placementReadyCount: 310,
    placedCount: 245,
    placementRatePct: 58.3, // 245 / 420 * 100
    avgSalaryLpa: 5.8,
    industryDemand: 'VERY HIGH',
    courseImpactScore: 91,
    studentRating: 4.8,
    status: 'ACTIVE',
    impactBreakdown: {
      skillImprovementPct: 88,
      completionRatePct: 84,
      assessmentAvgPct: 86,
      certificationRatePct: 90,
      placementRatePct: 58,
      industryRelevancePct: 95,
    },
    description: 'Government-certified immersion covering frontend state management, serverless APIs, and database integration for high-growth tech firms.',
    syllabus: ['Modern JS & DOM', 'React Component Lifecycles', 'Node.js API Engineering', 'Authentication & JWT', 'Capstone Deployment'],
  },
  {
    id: 'crs-002',
    courseCode: 'CRS-JAVA-02',
    title: 'Enterprise Java Programming & Data Structures (DSA)',
    provider: 'Apex National Skilling Academy',
    trainerId: 'trn-201',
    trainerName: 'Prof. Rajesh Nair',
    category: 'Software Development',
    skillsCovered: ['Java', 'Object Oriented Programming', 'Collections Framework', 'Data Structures & Algorithms', 'Exception Handling'],
    skillLevel: 'Intermediate',
    durationWeeks: 14,
    capacity: 450,
    enrolledCount: 450,
    completedCount: 390,
    certifiedCount: 350,
    placementReadyCount: 320,
    placedCount: 260,
    placementRatePct: 66.7, // 260 / 390
    avgSalaryLpa: 6.4,
    industryDemand: 'VERY HIGH',
    courseImpactScore: 94,
    studentRating: 4.9,
    status: 'ACTIVE',
    impactBreakdown: {
      skillImprovementPct: 92,
      completionRatePct: 87,
      assessmentAvgPct: 89,
      certificationRatePct: 90,
      placementRatePct: 67,
      industryRelevancePct: 98,
    },
    description: 'Rigorous algorithmic problem solving and production-grade OOP design required by Tier-1 IT services and product multinationals.',
    syllabus: ['Core Java Fundamentals', 'OOP & Design Patterns', 'Complexity Analysis & LeetCode Patterns', 'Trees & Graph Traversal', 'Spring Boot Basics'],
  },
  {
    id: 'crs-004',
    courseCode: 'CRS-ANL-04',
    title: 'Enterprise Business Intelligence & Power BI Mastery',
    provider: 'Gujarat Skill Development Mission',
    trainerId: 'trn-202',
    trainerName: 'Dr. Sunita Rao',
    category: 'Data Analytics',
    skillsCovered: ['Microsoft Power BI', 'Advanced Excel', 'DAX Formulas', 'Data Modeling', 'Storytelling with Data'],
    skillLevel: 'Beginner',
    durationWeeks: 8,
    capacity: 600,
    enrolledCount: 600,
    completedCount: 540,
    certifiedCount: 510,
    placementReadyCount: 460,
    placedCount: 360,
    placementRatePct: 66.7,
    avgSalaryLpa: 5.4,
    industryDemand: 'HIGH',
    courseImpactScore: 92,
    studentRating: 4.85,
    status: 'ACTIVE',
    impactBreakdown: {
      skillImprovementPct: 90,
      completionRatePct: 90,
      assessmentAvgPct: 88,
      certificationRatePct: 94,
      placementRatePct: 67,
      industryRelevancePct: 92,
    },
    description: 'Transform raw institutional and commercial databases into executive KPI cockpits and automated data pipelines.',
    syllabus: ['Power Query ETL', 'Data Modeling & Star Schema', 'Advanced DAX Measures', 'Executive Dashboards', 'Power BI Service Gateway'],
  },
  {
    id: 'crs-005',
    courseCode: 'CRS-SQL-05',
    title: 'Advanced SQL & Database Systems for Analytics',
    provider: 'National Council for Vocational Education (NCVET)',
    trainerId: 'trn-202',
    trainerName: 'Dr. Sunita Rao',
    category: 'Data Analytics',
    skillsCovered: ['Advanced SQL', 'Window Functions', 'Query Optimization', 'PostgreSQL', 'Database Tuning'],
    skillLevel: 'Intermediate',
    durationWeeks: 6,
    capacity: 400,
    enrolledCount: 380,
    completedCount: 350,
    certifiedCount: 330,
    placementReadyCount: 290,
    placedCount: 215,
    placementRatePct: 61.4,
    avgSalaryLpa: 5.6,
    industryDemand: 'VERY HIGH',
    courseImpactScore: 89,
    studentRating: 4.75,
    status: 'ACTIVE',
    impactBreakdown: {
      skillImprovementPct: 86,
      completionRatePct: 92,
      assessmentAvgPct: 85,
      certificationRatePct: 94,
      placementRatePct: 61,
      industryRelevancePct: 94,
    },
    description: 'Hands-on query structuring, subqueries, indexing, execution plans, and analytical window functions on production tables.',
    syllabus: ['Relational Algebra Refresher', 'Complex Joins & Aggregations', 'Window Ranking & Lead/Lag', 'Indexes & Query Plans', 'Transactions & ACID'],
  },
  {
    id: 'crs-007',
    courseCode: 'CRS-CLD-07',
    title: 'DevOps Engineering, Docker & Kubernetes Ecosystem',
    provider: 'Ministry of Skill Development & Entrepreneurship (MSDE)',
    trainerId: 'trn-203',
    trainerName: 'Vikramjit Singh',
    category: 'Cloud & Infrastructure',
    skillsCovered: ['Docker', 'Kubernetes Orchestration', 'Linux System Admin', 'CI/CD with GitHub Actions', 'Terraform'],
    skillLevel: 'Advanced',
    durationWeeks: 16,
    capacity: 350,
    enrolledCount: 350,
    completedCount: 280,
    certifiedCount: 240,
    placementReadyCount: 220,
    placedCount: 185,
    placementRatePct: 66.1,
    avgSalaryLpa: 7.8,
    industryDemand: 'VERY HIGH',
    courseImpactScore: 93,
    studentRating: 4.9,
    status: 'ACTIVE',
    impactBreakdown: {
      skillImprovementPct: 94,
      completionRatePct: 80,
      assessmentAvgPct: 87,
      certificationRatePct: 86,
      placementRatePct: 66,
      industryRelevancePct: 99,
    },
    description: 'End-to-end continuous deployment, microservice containerization, Helm packages, and zero-downtime cluster management.',
    syllabus: ['Linux Kernel & Cgroups', 'Dockerfile Optimization', 'Pod Networking & Services', 'Ingress & Cert-Manager', 'Terraform on AWS'],
  },
  {
    id: 'crs-008',
    courseCode: 'CRS-AIML-08',
    title: 'Applied AI, PyTorch & Foundation LLM Engineering',
    provider: 'Indian Institute of Information Technology & MSDE',
    trainerId: 'trn-201',
    trainerName: 'Prof. Rajesh Nair',
    category: 'Artificial Intelligence',
    skillsCovered: ['Python & NumPy', 'PyTorch / Deep Learning', 'Natural Language Processing', 'MLOps & Model Deployment', 'Vector DBs'],
    skillLevel: 'Advanced',
    durationWeeks: 16,
    capacity: 300,
    enrolledCount: 300,
    completedCount: 260,
    certifiedCount: 235,
    placementReadyCount: 210,
    placedCount: 175,
    placementRatePct: 67.3,
    avgSalaryLpa: 11.2,
    industryDemand: 'VERY HIGH',
    courseImpactScore: 96,
    studentRating: 4.94,
    status: 'ACTIVE',
    impactBreakdown: {
      skillImprovementPct: 96,
      completionRatePct: 87,
      assessmentAvgPct: 92,
      certificationRatePct: 90,
      placementRatePct: 67,
      industryRelevancePct: 100,
    },
    description: 'Neural network backpropagation, Transformer architectures, parameter-efficient fine-tuning (LoRA), and production API serving.',
    syllabus: ['Linear Algebra for ML', 'Convolutional & Recurrent Nets', 'Attention Mechanisms & Transformers', 'RAG with Pinecone', 'Quantization & Deployment'],
  },
  {
    id: 'crs-009',
    courseCode: 'CRS-SEC-09',
    title: 'Cyber Defense, SOC Operations & Threat Analytics',
    provider: 'National Critical Information Infrastructure Protection Centre (NCIIPC)',
    trainerId: 'trn-204',
    trainerName: 'Ananya Deshmukh',
    category: 'Cybersecurity',
    skillsCovered: ['SIEM Tools (Splunk / QRadar)', 'Wireshark & Packet Analysis', 'Network Security', 'Vulnerability Assessment', 'Incident Response'],
    skillLevel: 'Intermediate',
    durationWeeks: 12,
    capacity: 250,
    enrolledCount: 250,
    completedCount: 220,
    certifiedCount: 195,
    placementReadyCount: 170,
    placedCount: 138,
    placementRatePct: 62.7,
    avgSalaryLpa: 6.8,
    industryDemand: 'HIGH',
    courseImpactScore: 88,
    studentRating: 4.78,
    status: 'ACTIVE',
    impactBreakdown: {
      skillImprovementPct: 85,
      completionRatePct: 88,
      assessmentAvgPct: 84,
      certificationRatePct: 89,
      placementRatePct: 63,
      industryRelevancePct: 91,
    },
    description: 'Live cyber range attack simulations, network packet dissecting, SIEM alert triage, and ISO 27001 regulatory compliance protocols.',
    syllabus: ['OSI Layer Attacks', 'Packet Capturing with Wireshark', 'Splunk Search Processing Language', 'MITRE ATT&CK Framework', 'Forensic Memory Dumps'],
  },
];

export const INITIAL_COMPANIES: CompanyRecord[] = [
  {
    id: 'cmp-01',
    name: 'Tata Consultancy Services',
    industry: 'IT Services & Consulting',
    location: 'Pan-India',
    openRolesCount: 1420,
    hiredStudentsCount: 680,
    topSkillsRequired: ['Java', 'SQL', 'React.js', 'Python', 'Cloud Basics'],
    avgSalaryOfferedLpa: 4.5,
  },
  {
    id: 'cmp-02',
    name: 'Infosys Technologies',
    industry: 'IT Services',
    location: 'Bengaluru, Hyderabad, Pune',
    openRolesCount: 1100,
    hiredStudentsCount: 520,
    topSkillsRequired: ['Java', 'Data Structures & Algorithms', 'SQL', 'Spring Boot'],
    avgSalaryOfferedLpa: 4.8,
  },
  {
    id: 'cmp-03',
    name: 'Microsoft IDC',
    industry: 'Software Products & Cloud',
    location: 'Hyderabad, Bengaluru, Noida',
    openRolesCount: 180,
    hiredStudentsCount: 45,
    topSkillsRequired: ['Data Structures & Algorithms', 'C++', 'PyTorch', 'Distributed Systems'],
    avgSalaryOfferedLpa: 18.5,
  },
  {
    id: 'cmp-04',
    name: 'Amazon Web Services (AWS)',
    industry: 'Cloud Computing & Infrastructure',
    location: 'Hyderabad, Bengaluru',
    openRolesCount: 240,
    hiredStudentsCount: 62,
    topSkillsRequired: ['Linux System Admin', 'Docker', 'Kubernetes', 'Networking', 'Python'],
    avgSalaryOfferedLpa: 16.0,
  },
  {
    id: 'cmp-05',
    name: 'Wipro Limited',
    industry: 'IT Services & Cybersecurity',
    location: 'Bengaluru, Chennai, Hyderabad',
    openRolesCount: 890,
    hiredStudentsCount: 390,
    topSkillsRequired: ['Network Security', 'Splunk', 'Python', 'Linux', 'SQL'],
    avgSalaryOfferedLpa: 4.2,
  },
  {
    id: 'cmp-06',
    name: 'Larsen & Toubro Technology Services',
    industry: 'Engineering & IoT',
    location: 'Vadodara, Chennai, Mumbai',
    openRolesCount: 310,
    hiredStudentsCount: 140,
    topSkillsRequired: ['C++', 'Embedded Systems', 'IoT Protocols', 'Python'],
    avgSalaryOfferedLpa: 5.2,
  },
];

export const INITIAL_SKILL_CAPACITIES: SkillCapacityRecord[] = [
  {
    skillName: 'Cloud Computing & DevOps',
    sector: 'Cloud & Infrastructure',
    studentsMissing: 18420,
    industryDemand: 'VERY HIGH',
    availableCourses: 24,
    currentSeats: 4000,
    capacityGap: 14420,
    recommendation: 'Increase Cloud & DevOps training capacity by 250% across Tier-2 engineering colleges.',
    affectedStates: ['Andhra Pradesh', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar'],
  },
  {
    skillName: 'Data Structures & Algorithms (DSA)',
    sector: 'Software Engineering',
    studentsMissing: 26800,
    industryDemand: 'VERY HIGH',
    availableCourses: 45,
    currentSeats: 12000,
    capacityGap: 14800,
    recommendation: 'Incorporate mandatory accredited DSA problem-solving labs into 3rd-year university curriculum.',
    affectedStates: ['Maharashtra', 'Tamil Nadu', 'Karnataka', 'Telangana'],
  },
  {
    skillName: 'Cybersecurity & SOC Operations',
    sector: 'Information Security',
    studentsMissing: 9200,
    industryDemand: 'HIGH',
    availableCourses: 14,
    currentSeats: 2200,
    capacityGap: 7000,
    recommendation: 'Establish regional cyber defense range simulators in state skilling universities.',
    affectedStates: ['Delhi NCR', 'Gujarat', 'Tamil Nadu'],
  },
  {
    skillName: 'Power BI & Advanced Analytics',
    sector: 'Data Analytics',
    studentsMissing: 14100,
    industryDemand: 'HIGH',
    availableCourses: 32,
    currentSeats: 8500,
    capacityGap: 5600,
    recommendation: 'Scale vocational analytics programs with Microsoft and NASSCOM accreditation.',
    affectedStates: ['Gujarat', 'Rajasthan', 'West Bengal'],
  },
];

// -------------------------------------------------------------
// LOCAL STORAGE & CLIENT STATE MANAGEMENT
// -------------------------------------------------------------

const STORAGE_KEY_STUDENTS = 'skillbridge_students_v1';
const STORAGE_KEY_COURSES = 'skillbridge_courses_v1';
const STORAGE_KEY_CURRENT_USER = 'skilltrack_user';

export function getStoredStudents(): StudentRecord[] {
  if (typeof window === 'undefined') return INITIAL_STUDENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_STUDENTS;
  }
}

export function saveStoredStudents(students: StudentRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  } catch (err) {
    console.error('Failed to save students to localStorage', err);
  }
}

export function getStoredCourses(): CourseIntelligenceRecord[] {
  if (typeof window === 'undefined') return INITIAL_COURSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COURSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(INITIAL_COURSES));
      return INITIAL_COURSES;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_COURSES;
  }
}

export function saveStoredCourses(courses: CourseIntelligenceRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courses));
  } catch (err) {
    console.error('Failed to save courses to localStorage', err);
  }
}

export function getStudentById(id: string): StudentRecord | undefined {
  const students = getStoredStudents();
  return students.find((s) => s.id === id || s.userId === id || s.email === id);
}

export function getTrainerById(id: string): TrainerRecord | undefined {
  return INITIAL_TRAINERS.find((t) => t.id === id || t.userId === id || t.email === id);
}

export function getStudentsForTrainer(trainerId: string): StudentRecord[] {
  const trainer = getTrainerById(trainerId);
  const students = getStoredStudents();
  if (!trainer) return students.slice(0, 3);
  return students.filter((s) => s.assignedTrainerId === trainer.id || trainer.assignedStudentIds.includes(s.id));
}

export function simulateCourseCompletion(studentId: string, courseId: string): StudentRecord | null {
  const students = getStoredStudents();
  const studentIndex = students.findIndex((s) => s.id === studentId || s.userId === studentId);
  if (studentIndex === -1) return null;

  const student = { ...students[studentIndex] };
  const course = INITIAL_COURSES.find((c) => c.id === courseId);
  if (!course) return null;

  // Add course to completed
  if (!student.completedCourseIds.includes(courseId)) {
    student.completedCourseIds = [...student.completedCourseIds, courseId];
  }

  // Upgrade skills covered in course
  const updatedSkills = [...student.currentSkills];
  course.skillsCovered.forEach((skillName) => {
    const existingIndex = updatedSkills.findIndex((sk) => sk.name.toLowerCase() === skillName.toLowerCase());
    if (existingIndex >= 0) {
      // Upgrade existing skill proficiency
      updatedSkills[existingIndex] = {
        ...updatedSkills[existingIndex],
        proficiency: Math.min(95, updatedSkills[existingIndex].proficiency + 22),
        verified: true,
      };
    } else {
      // Add newly acquired skill
      updatedSkills.push({
        id: `sk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: skillName,
        proficiency: 82,
        category: 'Software',
        verified: true,
      });
    }
  });

  student.currentSkills = updatedSkills;

  // Recalibrate skill gaps
  const strong: { name: string; score: number; level: string }[] = [];
  const improve: { name: string; score: number; target: number; delta: number }[] = [];

  updatedSkills.forEach((sk) => {
    if (sk.proficiency >= 75) {
      strong.push({
        name: sk.name,
        score: sk.proficiency,
        level: sk.proficiency >= 90 ? 'Expert' : 'Proficient',
      });
    } else {
      improve.push({
        name: sk.name,
        score: sk.proficiency,
        target: 80,
        delta: Math.max(0, 80 - sk.proficiency),
      });
    }
  });

  // Remove missing skills that have now been acquired
  const remainingMissing = student.skillGaps.missing.filter(
    (m) => !course.skillsCovered.some((sc) => sc.toLowerCase() === m.name.toLowerCase())
  );

  student.skillGaps = {
    ...student.skillGaps,
    strong,
    improve,
    missing: remainingMissing,
  };

  // Increase Employability Score
  student.employabilityScore = Math.min(98, student.employabilityScore + 14);

  // Upgrade placement status if enough progress
  if (student.employabilityScore >= 80 && student.placementStatus === 'SKILL DEVELOPMENT') {
    student.placementStatus = 'PLACEMENT READY';
  }

  students[studentIndex] = student;
  saveStoredStudents(students);
  return student;
}
