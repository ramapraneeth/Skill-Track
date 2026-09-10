// SIDH Skill Development Platform - Central State Store & Service Abstraction
// Supports Learner, Trainer, and Government Portals with LocalStorage persistence and realistic data.

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
  id: 'lrn-101',
  name: 'Rahul Sharma',
  studentId: 'STU-2026-CS409',
  course: 'B.Tech - Computer Science & Engineering',
  branch: 'Computer Science & Engineering',
  year: '4th Year',
  semester: '7th Semester',
  email: 'rahul.sharma@skillbridge.gov.in',
  mobile: '+91 98480 12345',
  dob: '2003-04-15',
  gender: 'Male',
  state: 'Andhra Pradesh',
  district: 'Visakhapatnam',
  qualification: 'B.Tech (CSE)',
  institution: 'Andhra University College of Engineering',
  specialization: 'Computer Science & Engineering',
  passingYear: 2025,
  employmentStatus: 'Student',
  targetRole: 'Junior Python Developer',

  academicDetails: {
    cgpa: 8.72,
    percentage: 82.8,
    semesterPerformance: [
      { semester: 'Semester 1', gpa: 8.4, status: 'Completed' },
      { semester: 'Semester 2', gpa: 8.6, status: 'Completed' },
      { semester: 'Semester 3', gpa: 8.5, status: 'Completed' },
      { semester: 'Semester 4', gpa: 8.9, status: 'Completed' },
      { semester: 'Semester 5', gpa: 8.8, status: 'Completed' },
      { semester: 'Semester 6', gpa: 9.1, status: 'Completed' },
      { semester: 'Semester 7', gpa: 8.7, status: 'Current' },
      { semester: 'Semester 8', gpa: 0.0, status: 'Upcoming' },
    ],
    relevantSubjects: [
      'Data Structures & Algorithms',
      'Database Management Systems (DBMS)',
      'Object Oriented Programming in Python & Java',
      'Operating Systems & Linux CLI',
      'Computer Networks & Protocols',
      'Software Engineering & Agile',
    ],
    academicAchievements: [
      "Dean's Honor List for Academic Excellence (2024)",
      '1st Place in University Skilling Hackathon 2024',
      'Merit Scholarship for Top 5% in CSE Department',
    ],
  },

  skills: [
    { name: 'SQL', category: 'Technical Skills', proficiencyLevel: 'Intermediate', proficiency: 70, verified: true },
    { name: 'REST APIs', category: 'Technical Skills', proficiencyLevel: 'Beginner', proficiency: 40, verified: false },
    { name: 'HTML5 & CSS3', category: 'Technical Skills', proficiencyLevel: 'Advanced', proficiency: 92, verified: true },
    { name: 'React.js', category: 'Technical Skills', proficiencyLevel: 'Intermediate', proficiency: 70, verified: true },
    { name: 'Problem Solving', category: 'Other Skills', proficiencyLevel: 'Intermediate', proficiency: 80, verified: true },
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

export const INITIAL_TRAINERS: TrainerProfile[] = [
  {
    id: 'trn-201',
    name: 'Prof. Rajesh Nair',
    email: 'rajesh.nair@skillbridge.gov.in',
    mobile: '+91 98450 11223',
    qualification: 'M.Tech (Computer Science), PhD Scholar',
    experienceYears: 12,
    specialization: 'Full Stack Web Architecture & Cloud Systems',
    skills: ['Java', 'Spring Boot', 'React', 'AWS', 'System Design'],
    sector: 'IT-ITeS',
    trainingCenter: 'Apex National Skilling Centre, Visakhapatnam',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    verificationStatus: 'Verified',
    rating: 4.88,
    activeBatchIds: ['btc-01', 'btc-02'],
    courseIds: ['crs-001', 'crs-002'],
  },
  {
    id: 'trn-202',
    name: 'Dr. Sunita Rao',
    email: 'sunita.rao@skillbridge.gov.in',
    mobile: '+91 98200 33445',
    qualification: 'Ph.D. in Data Science',
    experienceYears: 15,
    specialization: 'Business Analytics & Power BI Data Modeling',
    skills: ['Python', 'SQL', 'Power BI', 'Machine Learning', 'Excel'],
    sector: 'BFSI & IT',
    trainingCenter: 'Gujarat State Vocational Institute, Ahmedabad',
    state: 'Gujarat',
    district: 'Ahmedabad',
    verificationStatus: 'Verified',
    rating: 4.92,
    activeBatchIds: ['btc-03'],
    courseIds: ['crs-003'],
  },
  {
    id: 'trn-203',
    name: 'Vikramjit Singh',
    email: 'vikram.singh@skillbridge.gov.in',
    mobile: '+91 99100 55667',
    qualification: 'B.Tech (IT), Red Hat Certified Architect',
    experienceYears: 9,
    specialization: 'Cloud Infrastructure, Docker & Kubernetes',
    skills: ['Docker', 'Kubernetes', 'Linux', 'Terraform', 'CI/CD'],
    sector: 'IT-ITeS',
    trainingCenter: 'Regional Advanced Technology Hub, Lucknow',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    verificationStatus: 'Pending',
    rating: 4.75,
    activeBatchIds: ['btc-04'],
    courseIds: ['crs-004'],
  },
  {
    id: 'trn-204',
    name: 'Ananya Deshmukh',
    email: 'ananya.deshmukh@skillbridge.gov.in',
    mobile: '+91 98800 77889',
    qualification: 'M.S. in Information Security, CEH, CISSP',
    experienceYears: 11,
    specialization: 'SOC Threat Hunting & Network Defense',
    skills: ['Splunk', 'Wireshark', 'Incident Response', 'OWASP'],
    sector: 'Cybersecurity',
    trainingCenter: 'National Cyber Range Training Facility, Chennai',
    state: 'Tamil Nadu',
    district: 'Chennai',
    verificationStatus: 'Verified',
    rating: 4.85,
    activeBatchIds: ['btc-05'],
    courseIds: ['crs-005'],
  },
];

export const INITIAL_TRAINING_CENTERS: TrainingCenter[] = [
  {
    id: 'tc-01',
    name: 'Apex National Skilling Centre, Visakhapatnam',
    code: 'TC-AP-012',
    state: 'Andhra Pradesh',
    district: 'Visakhapatnam',
    address: 'Near Tech Park, Siripuram, Visakhapatnam - 530003',
    capacity: 600,
    currentEnrollment: 540,
    utilizationRate: 90.0,
    sector: 'IT-ITeS & Electronics',
    status: 'Active',
    trainerCount: 14,
    facilities: ['High-speed Fiber Lab', 'Smart Classrooms', 'Hardware Sandbox', 'Placement Cell'],
  },
  {
    id: 'tc-02',
    name: 'Gujarat State Vocational Institute, Ahmedabad',
    code: 'TC-GJ-045',
    state: 'Gujarat',
    district: 'Ahmedabad',
    address: 'Opp. Polytechnic Circle, Ambawadi, Ahmedabad - 380015',
    capacity: 750,
    currentEnrollment: 680,
    utilizationRate: 90.6,
    sector: 'BFSI, IT & Manufacturing',
    status: 'Active',
    trainerCount: 18,
    facilities: ['Advanced Analytics Lab', 'IoT Assembly Station', 'Conference Center'],
  },
  {
    id: 'tc-03',
    name: 'Regional Advanced Technology Hub, Lucknow',
    code: 'TC-UP-088',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    address: 'Vikas Nagar, Sector 4, Lucknow - 226022',
    capacity: 500,
    currentEnrollment: 380,
    utilizationRate: 76.0,
    sector: 'IT-ITeS & Telecom',
    status: 'Active',
    trainerCount: 10,
    facilities: ['Server Rack Lab', 'Linux Terminal Lab', 'Auditorium'],
  },
  {
    id: 'tc-04',
    name: 'National Cyber Range Training Facility, Chennai',
    code: 'TC-TN-029',
    state: 'Tamil Nadu',
    district: 'Chennai',
    address: 'Guindy Industrial Estate, Chennai - 600032',
    capacity: 400,
    currentEnrollment: 360,
    utilizationRate: 90.0,
    sector: 'Cybersecurity & Defense',
    status: 'Active',
    trainerCount: 12,
    facilities: ['Isolated Air-Gapped Range', 'Threat Emulation Lab', 'Forensics Suite'],
  },
];

export const INITIAL_COURSES: CourseProgram[] = [
  {
    id: 'crs-001',
    title: 'Full Stack Web Development & React Architecture',
    code: 'CRS-FSD-01',
    sector: 'IT-ITeS',
    provider: 'National Skill Development Corporation (NSDC)',
    trainerName: 'Prof. Rajesh Nair',
    durationWeeks: 12,
    hoursTotal: 240,
    mode: 'Hybrid',
    level: 'Intermediate',
    nsqfLevel: 6,
    skillsCovered: ['HTML5 & CSS3', 'JavaScript ES6', 'React.js', 'Node.js', 'REST APIs'],
    description: 'Comprehensive curriculum spanning state management, serverless API design, and asynchronous database integration for enterprise cloud applications.',
    eligibility: 'Diploma / Degree in Engineering, Science, or BCA with basic programming knowledge.',
    enrolledCount: 500,
    completedCount: 420,
    certifiedCount: 380,
    placementRate: 58.3,
    avgSalaryLpa: 5.8,
    status: 'Approved',
    modules: [
      { id: 'm1', title: 'Modern JavaScript & Async Control Flow', duration: '30 Hours', completed: true },
      { id: 'm2', title: 'React Hooks, State & Component Lifecycle', duration: '60 Hours', completed: true },
      { id: 'm3', title: 'Node.js, Express & Enterprise REST APIs', duration: '60 Hours', completed: false },
      { id: 'm4', title: 'Database Integration, Auth & Security', duration: '50 Hours', completed: false },
      { id: 'm5', title: 'Industry Capstone & Production Deployment', duration: '40 Hours', completed: false },
    ],
  },
  {
    id: 'crs-002',
    title: 'Enterprise Java Programming & Algorithmic Problem Solving',
    code: 'CRS-JAVA-02',
    sector: 'IT-ITeS',
    provider: 'Apex National Skilling Academy',
    trainerName: 'Prof. Rajesh Nair',
    durationWeeks: 14,
    hoursTotal: 280,
    mode: 'Offline',
    level: 'Intermediate',
    nsqfLevel: 6,
    skillsCovered: ['Core Java & OOP', 'Collections Framework', 'Data Structures & Algorithms', 'Exception Handling', 'Spring Boot'],
    description: 'Rigorous algorithmic problem solving and production-grade Object Oriented design patterns required by Tier-1 IT services and product multinationals.',
    eligibility: 'Pre-final or Final year B.Tech, MCA, or M.Sc students.',
    enrolledCount: 450,
    completedCount: 390,
    certifiedCount: 350,
    placementRate: 66.7,
    avgSalaryLpa: 6.4,
    status: 'Approved',
    modules: [
      { id: 'm1', title: 'Java Syntax, OOP Fundamentals & Memory Models', duration: '40 Hours' },
      { id: 'm2', title: 'Collections Framework & Generic Classes', duration: '50 Hours' },
      { id: 'm3', title: 'Data Structures: Stacks, Queues, Trees & Graphs', duration: '80 Hours' },
      { id: 'm4', title: 'Spring Boot REST microservices', duration: '60 Hours' },
      { id: 'm5', title: 'Unit Testing with JUnit & Mockito', duration: '50 Hours' },
    ],
  },
  {
    id: 'crs-003',
    title: 'Enterprise Business Intelligence & Power BI Data Modeling',
    code: 'CRS-BI-03',
    sector: 'BFSI & IT',
    provider: 'Gujarat Skill Development Mission',
    trainerName: 'Dr. Sunita Rao',
    durationWeeks: 8,
    hoursTotal: 160,
    mode: 'Online',
    level: 'Beginner',
    nsqfLevel: 5,
    skillsCovered: ['Microsoft Power BI', 'Advanced Excel', 'DAX Formulas', 'Data Modeling', 'Storytelling'],
    description: 'Transform raw commercial and government databases into automated KPI cockpits, star schemas, and actionable decision pipelines.',
    eligibility: 'Graduates in Commerce, Science, Arts, or Engineering.',
    enrolledCount: 600,
    completedCount: 540,
    certifiedCount: 510,
    placementRate: 66.7,
    avgSalaryLpa: 5.4,
    status: 'Approved',
    modules: [
      { id: 'm1', title: 'Excel Advanced Formulas & Power Query ETL', duration: '30 Hours' },
      { id: 'm2', title: 'Star Schema & Relational Data Modeling', duration: '40 Hours' },
      { id: 'm3', title: 'Advanced DAX Measures & Time Intelligence', duration: '50 Hours' },
      { id: 'm4', title: 'Executive Dashboarding & Report Sharing', duration: '40 Hours' },
    ],
  },
  {
    id: 'crs-004',
    title: 'DevOps Engineering, Docker Containers & Kubernetes',
    code: 'CRS-OPS-04',
    sector: 'IT-ITeS',
    provider: 'Ministry of Skill Development & Entrepreneurship',
    trainerName: 'Vikramjit Singh',
    durationWeeks: 16,
    hoursTotal: 320,
    mode: 'Hybrid',
    level: 'Advanced',
    nsqfLevel: 7,
    skillsCovered: ['Docker', 'Kubernetes', 'Linux Admin', 'Terraform', 'CI/CD Pipelines'],
    description: 'Production infrastructure automation, container orchestration, microservice telemetry, and declarative infrastructure code.',
    eligibility: 'Prior knowledge of basic Linux commands and networking.',
    enrolledCount: 350,
    completedCount: 280,
    certifiedCount: 240,
    placementRate: 66.1,
    avgSalaryLpa: 7.8,
    status: 'Approved',
    modules: [
      { id: 'm1', title: 'Linux Administration & Shell Scripting', duration: '50 Hours' },
      { id: 'm2', title: 'Docker Containers & Image Optimization', duration: '60 Hours' },
      { id: 'm3', title: 'Kubernetes Cluster Administration', duration: '90 Hours' },
      { id: 'm4', title: 'CI/CD with GitHub Actions & ArgoCD', duration: '60 Hours' },
      { id: 'm5', title: 'Terraform Multi-Cloud Automation', duration: '60 Hours' },
    ],
  },
  {
    id: 'crs-005',
    title: 'Cyber Defense, SOC Operations & Threat Hunting',
    code: 'CRS-SEC-05',
    sector: 'Cybersecurity',
    provider: 'National Critical Information Infrastructure Protection Centre',
    trainerName: 'Ananya Deshmukh',
    durationWeeks: 12,
    hoursTotal: 240,
    mode: 'Offline',
    level: 'Intermediate',
    nsqfLevel: 6,
    skillsCovered: ['Splunk', 'Wireshark', 'Network Security', 'Vulnerability Assessment', 'Incident Response'],
    description: 'Hands-on defense in simulated cyber ranges, SIEM rule tuning, log correlation, packet dissection, and attack mitigation protocols.',
    eligibility: 'Degree in CS/IT/Electronics or CompTIA Network+ baseline.',
    enrolledCount: 250,
    completedCount: 220,
    certifiedCount: 195,
    placementRate: 62.7,
    avgSalaryLpa: 6.8,
    status: 'Approved',
    modules: [
      { id: 'm1', title: 'TCP/IP Packets & Wireshark Deep Inspection', duration: '40 Hours' },
      { id: 'm2', title: 'SIEM Architecture with Splunk Enterprise', duration: '60 Hours' },
      { id: 'm3', title: 'Vulnerability Scanning with Nessus & OpenVAS', duration: '50 Hours' },
      { id: 'm4', title: 'Incident Response & Threat Containment Playbooks', duration: '50 Hours' },
      { id: 'm5', title: 'Live Cyber Range Red vs Blue Drill', duration: '40 Hours' },
    ],
  },
];

export const INITIAL_BATCHES: BatchRecord[] = [
  {
    id: 'btc-01',
    courseId: 'crs-001',
    courseTitle: 'Full Stack Web Development & React Architecture',
    trainerId: 'trn-201',
    trainerName: 'Prof. Rajesh Nair',
    trainingCenter: 'Apex National Skilling Centre, Visakhapatnam',
    startDate: '2025-01-10',
    endDate: '2025-04-10',
    timings: 'Mon-Fri 09:30 AM - 01:30 PM',
    capacity: 35,
    enrolledLearnerIds: ['lrn-101'],
    status: 'In Progress',
    attendanceRate: 92.4,
  },
  {
    id: 'btc-02',
    courseId: 'crs-002',
    courseTitle: 'Enterprise Java Programming & Algorithmic Problem Solving',
    trainerId: 'trn-201',
    trainerName: 'Prof. Rajesh Nair',
    trainingCenter: 'Apex National Skilling Centre, Visakhapatnam',
    startDate: '2025-02-01',
    endDate: '2025-05-15',
    timings: 'Mon-Fri 02:00 PM - 06:00 PM',
    capacity: 30,
    enrolledLearnerIds: ['lrn-101'],
    status: 'In Progress',
    attendanceRate: 88.6,
  },
  {
    id: 'btc-03',
    courseId: 'crs-003',
    courseTitle: 'Enterprise Business Intelligence & Power BI Data Modeling',
    trainerId: 'trn-202',
    trainerName: 'Dr. Sunita Rao',
    trainingCenter: 'Gujarat State Vocational Institute, Ahmedabad',
    startDate: '2025-01-15',
    endDate: '2025-03-15',
    timings: 'Mon-Fri 10:00 AM - 02:00 PM',
    capacity: 40,
    enrolledLearnerIds: [],
    status: 'In Progress',
    attendanceRate: 94.1,
  },
  {
    id: 'btc-04',
    courseId: 'crs-004',
    courseTitle: 'DevOps Engineering, Docker Containers & Kubernetes',
    trainerId: 'trn-203',
    trainerName: 'Vikramjit Singh',
    trainingCenter: 'Regional Advanced Technology Hub, Lucknow',
    startDate: '2025-02-15',
    endDate: '2025-06-15',
    timings: 'Mon-Fri 09:00 AM - 01:00 PM',
    capacity: 25,
    enrolledLearnerIds: [],
    status: 'Upcoming',
    attendanceRate: 0,
  },
];

export const INITIAL_ASSESSMENTS: AssessmentRecord[] = [
  {
    id: 'asm-101',
    title: 'Core Java & Data Structures Benchmark Test',
    skill: 'Core Java & OOP',
    durationMinutes: 30,
    questionCount: 5,
    passingScore: 70,
    difficulty: 'Intermediate',
    status: 'Published',
    instructions: [
      'This benchmark consists of 5 multiple choice questions testing fundamental OOP and data structures.',
      'Each question carries equal marks. There is no negative marking.',
      'You cannot pause the timer once the assessment starts.',
      'Ensure a stable internet connection before clicking Start.',
    ],
    questions: [
      {
        id: 1,
        question: 'Which of the following data structures offers O(1) average time complexity for both search and insertion operations?',
        options: ['Binary Search Tree', 'HashMap', 'LinkedList', 'Heap'],
        correctAnswer: 1,
        explanation: 'A properly hashed HashMap achieves O(1) average time complexity through hash buckets.',
      },
      {
        id: 2,
        question: 'In Java, what happens when an object becomes unreachable by any active thread references?',
        options: [
          'It is immediately deallocated from the Stack',
          'It becomes eligible for Garbage Collection from the Heap',
          'It causes an OutOfMemoryError exception',
          'Its finalize method executes synchronously on the main thread',
        ],
        correctAnswer: 1,
        explanation: 'Unreachable heap objects become eligible for GC during mark-and-sweep passes.',
      },
      {
        id: 3,
        question: 'What is the primary difference between an Abstract Class and an Interface in Java 8+?',
        options: [
          'Interfaces cannot contain any method implementations',
          'A class can implement multiple interfaces, but extend only one abstract class',
          'Abstract classes cannot have instance constructors',
          'Interfaces can maintain mutable private instance variables',
        ],
        correctAnswer: 1,
        explanation: 'Java supports multiple interface inheritance while retaining single class inheritance.',
      },
      {
        id: 4,
        question: 'Which algorithmic traversal approach utilizes a Queue data structure?',
        options: ['Depth First Search (DFS)', 'Breadth First Search (BFS)', 'In-order Traversal', 'Post-order Traversal'],
        correctAnswer: 1,
        explanation: 'Breadth First Search traverses level by level using a FIFO Queue.',
      },
      {
        id: 5,
        question: 'What is the worst-case time complexity of QuickSort when a poor pivot is repeatedly selected?',
        options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
        correctAnswer: 2,
        explanation: 'Repeatedly selecting the minimum or maximum element as pivot degrades QuickSort to O(N^2).',
      },
    ],
  },
  {
    id: 'asm-102',
    title: 'Modern JavaScript & React Architectural Assessment',
    skill: 'JavaScript ES6',
    durationMinutes: 25,
    questionCount: 4,
    passingScore: 75,
    difficulty: 'Intermediate',
    status: 'Published',
    instructions: [
      'Covers ES6 scoping, Promises, async/await, and React hook dependencies.',
      'Total duration is 25 minutes.',
    ],
    questions: [
      {
        id: 1,
        question: 'What is the output of typeof null in JavaScript?',
        options: ['"null"', '"undefined"', '"object"', '"boolean"'],
        correctAnswer: 2,
        explanation: 'Due to legacy JavaScript implementation, typeof null returns "object".',
      },
      {
        id: 2,
        question: 'When does useEffect with an empty dependency array [] execute?',
        options: [
          'On every component render',
          'Only once after the initial mount',
          'Whenever state changes',
          'Never unless manually invoked',
        ],
        correctAnswer: 1,
        explanation: 'An empty dependency array ensures the effect runs only once on mount.',
      },
      {
        id: 3,
        question: 'Which method returns a new array with elements that pass a testing condition?',
        options: ['forEach()', 'map()', 'filter()', 'reduce()'],
        correctAnswer: 2,
        explanation: 'Array.prototype.filter() returns elements satisfying the predicate.',
      },
      {
        id: 4,
        question: 'What does the useMemo hook memoize in React?',
        options: [
          'A callback function reference',
          'The computed return value of a function',
          'DOM element references',
          'Global Redux state',
        ],
        correctAnswer: 1,
        explanation: 'useMemo caches the result of an expensive calculation between re-renders.',
      },
    ],
  },
];

export const INITIAL_SCHEMES: SchemeRecord[] = [
  {
    id: 'sch-01',
    name: 'Pradhan Mantri Kaushal Vikas Yojana 4.0 (PMKVY)',
    code: 'SCH-MSDE-PMKVY4',
    ministry: 'Ministry of Skill Development & Entrepreneurship',
    objective: 'Enable youth to take up industry-relevant skill training that will help them in securing a better livelihood.',
    eligibility: 'Indian youth aged 15-45 with minimum Class 10 qualification.',
    targetBeneficiaries: 120000,
    currentEnrolled: 84500,
    budgetCr: 450,
    state: 'Pan-India',
    district: 'All Districts',
    startDate: '2023-04-01',
    endDate: '2026-03-31',
    status: 'Active',
  },
  {
    id: 'sch-02',
    name: 'National Apprenticeship Promotion Scheme (NAPS)',
    code: 'SCH-MSDE-NAPS',
    ministry: 'Ministry of Skill Development & Entrepreneurship',
    objective: 'Promote apprenticeship training and incentivize employers who engage apprentices.',
    eligibility: 'ITI pass-outs, graduates, and 10+2 vocational candidates.',
    targetBeneficiaries: 85000,
    currentEnrolled: 62000,
    budgetCr: 320,
    state: 'Pan-India',
    district: 'All Districts',
    startDate: '2022-06-01',
    endDate: '2026-06-30',
    status: 'Active',
  },
  {
    id: 'sch-03',
    name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)',
    code: 'SCH-RD-DDUGKY',
    ministry: 'Ministry of Rural Development',
    objective: 'Demand-driven placement-linked skilling for rural poor youth.',
    eligibility: 'Rural youth aged 15-35 belonging to poor families.',
    targetBeneficiaries: 60000,
    currentEnrolled: 48900,
    budgetCr: 280,
    state: 'Pan-India',
    district: 'Rural Districts',
    startDate: '2023-01-01',
    endDate: '2025-12-31',
    status: 'Active',
  },
];

export const INITIAL_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: 'opp-1',
    title: 'Junior Full Stack Developer',
    organization: 'Tata Consultancy Services',
    location: 'Visakhapatnam / Hyderabad',
    type: 'Full-time',
    stipendOrSalary: '₹4.5 - ₹5.8 LPA',
    requiredSkills: ['JavaScript ES6', 'React.js', 'Node.js', 'Core Java & OOP'],
    deadline: '2025-03-30',
    eligibility: 'B.Tech / MCA with minimum 60% aggregate',
    matchPercentage: 82,
  },
  {
    id: 'opp-2',
    title: 'Associate Cloud Support Engineer',
    organization: 'Amazon Web Services (AWS)',
    location: 'Hyderabad',
    type: 'Full-time',
    stipendOrSalary: '₹8.5 - ₹12.0 LPA',
    requiredSkills: ['Linux Admin', 'Docker', 'Computer Networking', 'Python Programming'],
    deadline: '2025-04-15',
    eligibility: 'Engineering graduates with cloud certifications',
    matchPercentage: 68,
  },
  {
    id: 'opp-3',
    title: 'Data Analyst Apprentice',
    organization: 'Infosys Limited',
    location: 'Bengaluru / Pune',
    type: 'Apprenticeship',
    stipendOrSalary: '₹22,000 / month',
    requiredSkills: ['Advanced Excel', 'Microsoft Power BI', 'Relational DBMS & SQL'],
    deadline: '2025-03-25',
    eligibility: 'B.Sc / B.Com / B.Tech graduating batch',
    matchPercentage: 74,
  },
];

export const INITIAL_ALERTS: PolicyAlert[] = [
  {
    id: 'alt-1',
    severity: 'Critical',
    type: 'Skill Shortage',
    region: 'Andhra Pradesh (Visakhapatnam & Vijayawada)',
    title: 'Acute Deficit in Cloud Infrastructure & Containerization Skills',
    description: 'Industry hiring requisitions grew by 44% while local training seat capacity displays a deficit of 14,420 seats.',
    timestamp: '25 mins ago',
  },
  {
    id: 'alt-2',
    severity: 'High',
    type: 'Underutilization',
    region: 'Uttar Pradesh (Lucknow District)',
    title: 'Training Center Utilization Below 80% Threshold',
    description: 'TC-UP-088 facility is running at 76% capacity. Reallocate 120 seats to high-demand AI and Cybersecurity batches.',
    timestamp: '2 hours ago',
  },
  {
    id: 'alt-3',
    severity: 'Medium',
    type: 'High Dropout',
    region: 'Bihar (Patna District)',
    title: 'Dropout Warning in Foundation Electronics Batch',
    description: 'Week-6 attendance dropped to 68%. Mandate student counseling and stipend distribution verification.',
    timestamp: '5 hours ago',
  },
];

export const INITIAL_INSIGHTS: PolicyInsight[] = [
  {
    id: 'ins-1',
    title: 'Rapid Demand Acceleration for Cloud Native Engineering',
    finding: 'Demand for Cloud Computing & DevOps engineers has increased by 58% across Tier-2 technology clusters.',
    evidence: 'High employer postings (3,400+ active requisitions) versus low certified graduate output (940 certified).',
    affectedRegion: 'Andhra Pradesh, Telangana & Karnataka',
    affectedSkill: 'Docker, Kubernetes, AWS Cloud',
    impact: 'Critical talent bottleneck causing wage inflation and unfilled employment vouchers.',
    recommendation: 'Authorize 250% training capacity expansion in state polytechnics and partner with AWS Academy.',
    priority: 'Urgent',
  },
  {
    id: 'ins-2',
    title: 'High Placement Conversion in NCVET-Aligned Power BI Curriculums',
    finding: 'Courses integrating live data storytelling achieve a 66.7% placement conversion rate within 90 days.',
    evidence: 'Verified audit of 600 candidates across Gujarat and Maharashtra vocational institutes.',
    affectedRegion: 'Gujarat & Western Zone',
    affectedSkill: 'Power BI, Advanced SQL, Excel Analytics',
    impact: 'Higher starting wages (₹5.4 LPA vs ₹3.2 LPA baseline).',
    recommendation: 'Scale the enterprise Power BI curriculum framework to all 28 state skill development missions.',
    priority: 'High',
  },
];

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
const MOCK_LEARNERS_LIST = [
  {
    ...INITIAL_LEARNER,
    id: 'learner-1',
    name: 'Arjun Patel',
    email: 'arjun.patel@skillindia.gov.in',
    phone: '+91 98765 43210',
    education: 'B.Tech Computer Science',
    targetRole: 'Full Stack Web Developer',
    gender: 'Male',
    skills: [
      { skillName: 'JavaScript & TypeScript', level: 'Advanced' },
      { skillName: 'React.js & Next.js', level: 'Advanced' },
      { skillName: 'Relational DBMS & SQL', level: 'Intermediate' },
      { skillName: 'RESTful API Engineering', level: 'Advanced' },
    ],
  },
  {
    id: 'learner-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@skillindia.gov.in',
    phone: '+91 98123 45678',
    education: 'MCA / B.Sc Computer Science',
    targetRole: 'AI & Data Analyst',
    gender: 'Female',
    skills: [
      { skillName: 'Python & Data Modeling', level: 'Advanced' },
      { skillName: 'Power BI & SQL', level: 'Intermediate' },
    ],
  },
  {
    id: 'learner-3',
    name: 'Rahul Verma',
    email: 'rahul.verma@skillindia.gov.in',
    phone: '+91 98234 56789',
    education: 'Diploma in Electronics',
    targetRole: 'IoT & Embedded Systems Engineer',
    gender: 'Male',
    skills: [
      { skillName: 'Microcontrollers & Sensors', level: 'Intermediate' },
      { skillName: 'C++ Programming', level: 'Intermediate' },
    ],
  },
];

export const sidhStore = {
  getLearners: () => [getLearner(), ...MOCK_LEARNERS_LIST.slice(1)],
  getLearner: () => getLearner(),
  getLearnerById: (id: string) => {
    if (id === 'lrn-101' || id === 'learner-1') return getLearner();
    return MOCK_LEARNERS_LIST.find((l) => l.id === id) || getLearner();
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

