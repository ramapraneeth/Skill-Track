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

export const INITIAL_STUDENTS: StudentRecord[] = [];

export const INITIAL_TRAINERS: TrainerRecord[] = [];


export const INITIAL_COURSES: CourseIntelligenceRecord[] = [];
export const INITIAL_COMPANIES: CompanyRecord[] = [];
export const INITIAL_SKILL_CAPACITIES: SkillCapacityRecord[] = [];


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
