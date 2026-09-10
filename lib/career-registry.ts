// Centralized Dynamic Career & Skill Configuration Registry
// Architecture: STREAM -> QUALIFICATION -> SPECIALIZATION -> CAREER -> SKILLS -> COURSES -> CERTIFICATIONS -> JOB ROLES
// Extensible universal employment platform data structure

export type SkillProficiencyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface SkillRequirement {
  skill: string;
  category: 'Core Technical' | 'Domain Competency' | 'Tools & Software' | 'Industry Standard' | 'Professional';
  requiredLevel: SkillProficiencyLevel;
  requiredPercentage: number; // Benchmark requirement (e.g. 80%)
  defaultStudentPercentage?: number; // Starting baseline if student hasn't evaluated yet (e.g. 45%)
  priority: 'High' | 'Medium' | 'Low';
  whyRequired: string;
  recommendedCourseTitle: string;
  recommendedCourseId: string;
  estimatedDuration: string;
}

export interface CareerCourseDef {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: SkillProficiencyLevel;
  skills: string[];
  modulesCount: number;
  nsqfLevel: number;
  description: string;
}

export interface CareerCertificationDef {
  id: string;
  title: string;
  issuingOrg: string;
  level: string; // e.g., 'NSQF Level 5'
  validityYears: number;
  skills: string[];
  examPattern: string;
}

export interface CareerProjectDef {
  id: string;
  title: string;
  description: string;
  role: string;
  technologiesUsed: string[];
  outcome: string;
  industryRelevance: string;
}

export interface CareerJobRoleDef {
  id: string;
  title: string;
  company: string;
  location: string;
  salaryRange: string;
  type: 'Job' | 'Apprenticeship' | 'Internship';
  sector: string;
  experienceRequired: string;
  openings: number;
  minCgpa: number;
  requiredQualifications: string[];
  requiredBranches: string[];
  requiredSkills: string[];
  preferredCerts: string[];
  description: string;
  postedDaysAgo: number;
}

export interface CareerRoadmapPhase {
  phaseNumber: number;
  phaseTitle: string;
  duration: string;
  skills: string[];
  deliverable: string;
  status?: 'Completed' | 'In Progress' | 'Upcoming';
  progressPercentage?: number;
}

export interface CareerProfileDef {
  id: string;
  title: string;
  sector: string;
  streamCode: string;
  workType: 'Field' | 'Desk/Office' | 'Lab' | 'Remote' | 'On-site';
  description: string;
  salaryRange: string;
  nsqfLevel?: string;
  marketDemand: 'Very High' | 'High' | 'Steady';
  minCgpa: number;
  requiredSkills: SkillRequirement[];
  courses: CareerCourseDef[];
  certifications: CareerCertificationDef[];
  projects: CareerProjectDef[];
  roadmap: CareerRoadmapPhase[];
  jobRoles: CareerJobRoleDef[];
  interviewQuestions: {
    question: string;
    category: string;
    modelAnswerSummary: string;
  }[];
}

export interface SpecializationDef {
  id: string;
  name: string;
  code: string;
  description: string;
  careers: CareerProfileDef[];
}

export interface QualificationDef {
  id: string;
  name: string; // e.g. 'B.Tech / B.E', 'Diploma', 'B.Com', 'B.Sc'
  level: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Vocational';
  durationYears: number;
  specializations: SpecializationDef[];
}

export interface StreamDef {
  id: string;
  name: string; // e.g. 'Electronics & Communication Engineering'
  code: string; // e.g. 'ECE'
  iconName: string; // Lucide icon identifier
  description: string;
  industryPartners: string[];
  qualifications: QualificationDef[];
}

// ============================================================================
// STREAMS DATABASE REGISTRY
// ============================================================================
export const STREAMS_REGISTRY: StreamDef[] = [
  // --------------------------------------------------------------------------
  // 1. ELECTRONICS & COMMUNICATION ENGINEERING (ECE)
  // --------------------------------------------------------------------------
  {
    id: 'stream-ece',
    name: 'Electronics & Communication Engineering',
    code: 'ECE',
    iconName: 'Cpu',
    description: 'Hardware, firmware, embedded systems, microcontrollers, VLSI design, and telecommunications infrastructure.',
    industryPartners: ['Texas Instruments', 'Qualcomm', 'Bosch', 'Schneider Electric', 'Tata Elxsi'],
    qualifications: [
      {
        id: 'ece-btech',
        name: 'B.Tech / B.E (Electronics & Communication)',
        level: 'Undergraduate',
        durationYears: 4,
        specializations: [
          {
            id: 'ece-spec-embedded',
            name: 'Embedded Systems & IoT',
            code: 'ECE-EMB',
            description: 'Microcontroller programming, firmware development, hardware-software co-design, and IoT edge nodes.',
            careers: [
              {
                id: 'career-embedded-eng',
                title: 'Embedded Systems Engineer',
                sector: 'Electronics & Semiconductors',
                streamCode: 'ECE',
                workType: 'Lab',
                description: 'Design, program, and validate embedded firmware, device drivers, and real-time control logic for microcontrollers and IoT hardware.',
                salaryRange: '₹5.5 - ₹9.0 LPA',
                marketDemand: 'Very High',
                minCgpa: 6.5,
                requiredSkills: [
                  {
                    skill: 'Embedded C / C++',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 45,
                    priority: 'High',
                    whyRequired: 'Firmware programming, register-level manipulation, memory constraints',
                    recommendedCourseTitle: 'Mastering Embedded C & Firmware Architecture',
                    recommendedCourseId: 'crs-ece-01',
                    estimatedDuration: '45 Hours',
                  },
                  {
                    skill: 'Microcontrollers (ARM Cortex / ESP32)',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 40,
                    priority: 'High',
                    whyRequired: 'Interfacing peripherals (UART, SPI, I2C, CAN), timer interrupts',
                    recommendedCourseTitle: 'ARM Cortex-M Embedded Architecture & Peripherals',
                    recommendedCourseId: 'crs-ece-02',
                    estimatedDuration: '50 Hours',
                  },
                  {
                    skill: 'PCB Design & Schematic Capture',
                    category: 'Tools & Software',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 35,
                    priority: 'Medium',
                    whyRequired: 'Multilayer board layout, signal integrity, KiCAD / Altium Designer',
                    recommendedCourseTitle: 'Industrial High-Speed PCB Layout & Fabrication',
                    recommendedCourseId: 'crs-ece-03',
                    estimatedDuration: '30 Hours',
                  },
                  {
                    skill: 'RTOS (FreeRTOS)',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 25,
                    priority: 'High',
                    whyRequired: 'Task scheduling, mutexes, semaphores, queue management in multi-threaded firmware',
                    recommendedCourseTitle: 'Real-Time Operating Systems for Embedded Systems',
                    recommendedCourseId: 'crs-ece-04',
                    estimatedDuration: '35 Hours',
                  },
                  {
                    skill: 'Hardware Debugging (Logic Analyzers & DSO)',
                    category: 'Tools & Software',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 70,
                    defaultStudentPercentage: 50,
                    priority: 'Medium',
                    whyRequired: 'Oscilloscopes, protocol analyzers, JTAG/SWD debugging',
                    recommendedCourseTitle: 'Hardware In-Circuit Emulation & Protocol Analysis',
                    recommendedCourseId: 'crs-ece-05',
                    estimatedDuration: '20 Hours',
                  },
                  {
                    skill: 'IoT Edge Protocols (MQTT, CoAP, BLE)',
                    category: 'Industry Standard',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 70,
                    defaultStudentPercentage: 30,
                    priority: 'Low',
                    whyRequired: 'Connecting edge sensor nodes to cloud gateways securely',
                    recommendedCourseTitle: 'Industrial IoT Protocol Implementation',
                    recommendedCourseId: 'crs-ece-06',
                    estimatedDuration: '25 Hours',
                  },
                ],
                courses: [
                  {
                    id: 'crs-ece-01',
                    title: 'Mastering Embedded C & Firmware Architecture',
                    provider: 'CDAC / ESSCI National Skill Hub',
                    duration: '45 Hours',
                    level: 'Advanced',
                    skills: ['Embedded C', 'Memory Mapping', 'Inline Assembly'],
                    modulesCount: 8,
                    nsqfLevel: 6,
                    description: 'In-depth firmware development covering bitwise operations, interrupt service routines, and hardware registers.',
                  },
                  {
                    id: 'crs-ece-02',
                    title: 'ARM Cortex-M Embedded Architecture & Peripherals',
                    provider: 'Texas Instruments University Program',
                    duration: '50 Hours',
                    level: 'Advanced',
                    skills: ['ARM Cortex', 'UART', 'SPI', 'I2C', 'DMA'],
                    modulesCount: 10,
                    nsqfLevel: 6,
                    description: 'Hands-on interfacing of sensors, actuators, and communication buses on STM32 / TI LaunchPad platforms.',
                  },
                  {
                    id: 'crs-ece-03',
                    title: 'Industrial High-Speed PCB Layout & Fabrication',
                    provider: 'National Institute of Electronics (NIELIT)',
                    duration: '30 Hours',
                    level: 'Intermediate',
                    skills: ['Altium Designer', 'KiCAD', 'Gerber Files', 'Signal Integrity'],
                    modulesCount: 6,
                    nsqfLevel: 5,
                    description: 'Design 2-layer and 4-layer PCBs with ground planes, impedance control, and DFM guidelines.',
                  },
                ],
                certifications: [
                  {
                    id: 'cert-ece-01',
                    title: 'Certified Embedded Systems Design Professional (CESDP)',
                    issuingOrg: 'Electronics Sector Skills Council of India (ESSCI)',
                    level: 'NSQF Level 6',
                    validityYears: 3,
                    skills: ['Embedded C', 'ARM Architecture', 'Device Drivers'],
                    examPattern: 'Online Practical Lab & Theory Evaluation',
                  },
                  {
                    id: 'cert-ece-02',
                    title: 'IPC Certified PCB Designer (CID)',
                    issuingOrg: 'IPC International & NIELIT',
                    level: 'NSQF Level 5',
                    validityYears: 5,
                    skills: ['Schematic Capture', 'IPC-2221 Design Standards', 'Thermal Relief'],
                    examPattern: 'Portfolio & Standardized Assessment',
                  },
                ],
                projects: [
                  {
                    id: 'prj-ece-01',
                    title: 'Smart Solar Grid Edge Inverter with CAN Bus & FreeRTOS',
                    description: 'Developed an STM32-based multi-threaded firmware monitoring MPPT voltage and transmitting telemetry over CAN Bus.',
                    role: 'Lead Firmware Engineer',
                    technologiesUsed: ['STM32F4', 'FreeRTOS', 'CAN Bus', 'Embedded C'],
                    outcome: 'Achieved 99.4% telemetry uptime with sub-5ms fault trip response.',
                    industryRelevance: 'Automotive and clean-energy grid management systems.',
                  },
                  {
                    id: 'prj-ece-02',
                    title: 'Low-Power Battery-Operated LoRaWAN Environmental Node',
                    description: 'Engineered an ultra-low power ESP32/SX1276 node with 18-month battery life for ambient industrial sensing.',
                    role: 'Hardware & RF Integration Lead',
                    technologiesUsed: ['ESP32', 'LoRaWAN', 'Deep Sleep Optimization', 'KiCad'],
                    outcome: 'Reduced deep-sleep draw to 18 microamperes with 12km transmission range.',
                    industryRelevance: 'Smart agriculture and remote facility telemetry.',
                  },
                ],
                roadmap: [
                  {
                    phaseNumber: 1,
                    phaseTitle: 'Phase 1: Embedded C, Pointer Arithmetic & Digital Logic',
                    duration: 'Weeks 1 - 4',
                    skills: ['Embedded C', 'Bitwise Operators', 'Digital Multimeters', 'Schematics'],
                    deliverable: 'Bare-metal peripheral driver suite on microcontrollers',
                    status: 'Completed',
                    progressPercentage: 100,
                  },
                  {
                    phaseNumber: 2,
                    phaseTitle: 'Phase 2: Microcontroller Peripherals & Bus Protocols',
                    duration: 'Weeks 5 - 10',
                    skills: ['ARM Cortex-M', 'UART / SPI / I2C', 'Interrupt Controllers', 'DMA'],
                    deliverable: 'Multi-sensor data acquisition hardware module',
                    status: 'In Progress',
                    progressPercentage: 65,
                  },
                  {
                    phaseNumber: 3,
                    phaseTitle: 'Phase 3: FreeRTOS & Multitasking Firmware Architecture',
                    duration: 'Weeks 11 - 15',
                    skills: ['FreeRTOS', 'Queues', 'Mutexes', 'Watchdog Timers'],
                    deliverable: 'Real-time telemetry and task-scheduled embedded controller',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                  {
                    phaseNumber: 4,
                    phaseTitle: 'Phase 4: Multilayer PCB Layout & Hardware In-the-Loop Validation',
                    duration: 'Weeks 16 - 20',
                    skills: ['KiCAD / Altium', 'EMI / EMC Best Practices', 'Oscilloscope Probing'],
                    deliverable: 'Production-ready fabricated hardware prototype',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                ],
                jobRoles: [
                  {
                    id: 'job-ece-01',
                    title: 'Junior Embedded Firmware Engineer',
                    company: 'Schneider Electric R&D',
                    location: 'Bengaluru / Hyderabad (On-site)',
                    salaryRange: '₹6.0 - ₹8.5 LPA',
                    type: 'Job',
                    sector: 'Electronics & Energy Management',
                    experienceRequired: '0 - 1 Year (Freshers Welcome)',
                    openings: 18,
                    minCgpa: 6.5,
                    requiredQualifications: ['B.Tech', 'B.E'],
                    requiredBranches: ['Electronics & Communication', 'Electrical & Electronics', 'Instrumentation'],
                    requiredSkills: ['Embedded C', 'Microcontrollers', 'UART', 'SPI'],
                    preferredCerts: ['Certified Embedded Systems Design Professional (CESDP)'],
                    description: 'Develop and unit test embedded firmware for next-gen digital circuit breakers and energy meters.',
                    postedDaysAgo: 2,
                  },
                  {
                    id: 'job-ece-02',
                    title: 'IoT Hardware & Edge Firmware Trainee',
                    company: 'Tata Elxsi Electronics',
                    location: 'Pune / Chennai (On-site)',
                    salaryRange: '₹5.2 - ₹7.0 LPA',
                    type: 'Job',
                    sector: 'Automotive & Embedded Systems',
                    experienceRequired: 'Entry Level (0 - 2 Years)',
                    openings: 24,
                    minCgpa: 6.0,
                    requiredQualifications: ['B.Tech', 'Diploma in Electronics'],
                    requiredBranches: ['Electronics & Communication', 'Embedded Systems'],
                    requiredSkills: ['Embedded C / C++', 'ARM Cortex', 'RTOS', 'Hardware Debugging'],
                    preferredCerts: ['IPC Certified PCB Designer'],
                    description: 'Integrate edge sensor interfaces, debug CAN protocols, and participate in vehicle bench testing.',
                    postedDaysAgo: 4,
                  },
                  {
                    id: 'job-ece-03',
                    title: 'NAPS Embedded Systems Apprentice',
                    company: 'Bosch Automotive Electronics',
                    location: 'Coimbatore / Bengaluru',
                    salaryRange: '₹28,000 / month Stipend + PPO',
                    type: 'Apprenticeship',
                    sector: 'Automotive Electronics',
                    experienceRequired: 'Fresh Graduate',
                    openings: 35,
                    minCgpa: 6.0,
                    requiredQualifications: ['B.Tech', 'B.E'],
                    requiredBranches: ['Electronics & Communication'],
                    requiredSkills: ['Embedded C', 'Microcontrollers'],
                    preferredCerts: [],
                    description: 'National Apprenticeship Promotion Scheme opportunity in automotive electronic control units.',
                    postedDaysAgo: 1,
                  },
                ],
                interviewQuestions: [
                  {
                    question: 'What is the purpose of the "volatile" keyword in Embedded C and when MUST you use it?',
                    category: 'Core C & Compilers',
                    modelAnswerSummary: 'Prevents the compiler from optimizing away memory accesses to memory locations that can change unexpectedly outside code flow: 1) Memory-mapped hardware I/O registers, 2) Shared variables modified by an ISR, 3) Shared variables in multi-threaded RTOS tasks.',
                  },
                  {
                    question: 'Compare I2C vs SPI in terms of wire count, speed, protocol overhead, and addressing.',
                    category: 'Bus Communication',
                    modelAnswerSummary: 'SPI uses 4 wires (MOSI, MISO, SCK, CS), is full-duplex, achieves higher speeds (10-50+ MHz), but requires a chip-select pin per slave. I2C uses 2 wires (SDA, SCL), is half-duplex, slower (100kHz-3.4MHz), has protocol overhead (start/stop/ACK), but supports software addressing of up to 127 devices.',
                  },
                  {
                    question: 'Explain Priority Inversion in an RTOS and how Priority Inheritance solves it.',
                    category: 'Real-Time Operating Systems',
                    modelAnswerSummary: 'Occurs when a low-priority task holds a shared resource needed by a high-priority task, while a medium-priority task preempts the low-priority task, causing the high-priority task to wait indefinitely. Solved by temporarily boosting the low-priority task to the priority of the waiting high-priority task until it releases the mutex.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. CIVIL ENGINEERING
  // --------------------------------------------------------------------------
  {
    id: 'stream-civil',
    name: 'Civil Engineering',
    code: 'CIVIL',
    iconName: 'Building',
    description: 'Infrastructure development, structural analysis, construction project management, surveying, and materials quality control.',
    industryPartners: ['L&T Construction', 'Shapoorji Pallonji', 'Afcons Infrastructure', 'DLF', 'NHAI'],
    qualifications: [
      {
        id: 'civil-btech',
        name: 'B.Tech / B.E (Civil Engineering)',
        level: 'Undergraduate',
        durationYears: 4,
        specializations: [
          {
            id: 'civil-spec-construction',
            name: 'Construction Technology & Structural Engineering',
            code: 'CIVIL-CONST',
            description: 'Site execution, reinforced concrete structures, structural analysis software, and project estimation.',
            careers: [
              {
                id: 'career-site-engineer',
                title: 'Civil Site Engineer',
                sector: 'Infrastructure & Construction',
                streamCode: 'CIVIL',
                workType: 'Field',
                description: 'Manage on-site civil works, supervise reinforced concrete execution, ensure structural drawings compliance, and monitor contractor quality and safety standards.',
                salaryRange: '₹4.5 - ₹7.5 LPA',
                marketDemand: 'Very High',
                minCgpa: 6.0,
                requiredSkills: [
                  {
                    skill: 'AutoCAD Civil 2D/3D',
                    category: 'Tools & Software',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 45,
                    priority: 'High',
                    whyRequired: 'Interpreting architectural and structural engineering working drawings',
                    recommendedCourseTitle: 'Professional AutoCAD for Civil & Structural Drawings',
                    recommendedCourseId: 'crs-civ-01',
                    estimatedDuration: '40 Hours',
                  },
                  {
                    skill: 'Site Surveying & Total Station',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 40,
                    priority: 'High',
                    whyRequired: 'Topographic leveling, column layout marking, alignment verification',
                    recommendedCourseTitle: 'Advanced Site Surveying with Digital Total Station & GPS',
                    recommendedCourseId: 'crs-civ-02',
                    estimatedDuration: '35 Hours',
                  },
                  {
                    skill: 'Quantity Estimation & Costing',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 35,
                    priority: 'High',
                    whyRequired: 'Bar bending schedules (BBS), Bill of Quantities (BOQ), material reconciliation',
                    recommendedCourseTitle: 'Structural BOQ, BBS & Rate Analysis for Construction',
                    recommendedCourseId: 'crs-civ-03',
                    estimatedDuration: '30 Hours',
                  },
                  {
                    skill: 'Concrete Technology & Quality Testing',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 50,
                    priority: 'Medium',
                    whyRequired: 'Slump tests, compressive cube testing, mix design (IS 10262 / IS 456)',
                    recommendedCourseTitle: 'Concrete Mix Design & On-Site Quality Assurance',
                    recommendedCourseId: 'crs-civ-04',
                    estimatedDuration: '25 Hours',
                  },
                  {
                    skill: 'Construction Management & Project Scheduling',
                    category: 'Professional',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 70,
                    defaultStudentPercentage: 30,
                    priority: 'Medium',
                    whyRequired: 'Primavera P6 / MS Project, milestone tracking, labor deployment',
                    recommendedCourseTitle: 'Construction Project Management with Primavera P6',
                    recommendedCourseId: 'crs-civ-05',
                    estimatedDuration: '35 Hours',
                  },
                  {
                    skill: 'Structural Analysis (STAAD.Pro / ETABS)',
                    category: 'Tools & Software',
                    requiredLevel: 'Beginner',
                    requiredPercentage: 65,
                    defaultStudentPercentage: 25,
                    priority: 'Low',
                    whyRequired: 'Bending moment and shear force validation for RCC frames',
                    recommendedCourseTitle: 'RCC Structural Design and Modeling with STAAD.Pro',
                    recommendedCourseId: 'crs-civ-06',
                    estimatedDuration: '40 Hours',
                  },
                ],
                courses: [
                  {
                    id: 'crs-civ-01',
                    title: 'Professional AutoCAD for Civil & Structural Drawings',
                    provider: 'Construction Skill Development Council of India (CSDCI)',
                    duration: '40 Hours',
                    level: 'Advanced',
                    skills: ['AutoCAD', 'Structural Drafting', 'Reinforcement Detailing'],
                    modulesCount: 8,
                    nsqfLevel: 5,
                    description: 'Master foundation layouts, column grid markings, slab reinforcement plans, and structural sections.',
                  },
                  {
                    id: 'crs-civ-02',
                    title: 'Advanced Site Surveying with Digital Total Station & GPS',
                    provider: 'Survey Training Institute & CSDCI',
                    duration: '35 Hours',
                    level: 'Advanced',
                    skills: ['Total Station', 'Auto Level', 'Topographic Mapping', 'GPS'],
                    modulesCount: 6,
                    nsqfLevel: 6,
                    description: 'Field practice in setting up total stations, curve ranging, fly leveling, and transferring datum benchmarks.',
                  },
                  {
                    id: 'crs-civ-03',
                    title: 'Structural BOQ, BBS & Rate Analysis for Construction',
                    provider: 'L&T Construction Skills Training Institute',
                    duration: '30 Hours',
                    level: 'Intermediate',
                    skills: ['BOQ Preparation', 'Bar Bending Schedule', 'Rate Analysis', 'Excel for Civil'],
                    modulesCount: 7,
                    nsqfLevel: 5,
                    description: 'Comprehensive calculation of steel quantities, shuttering areas, concrete volumes, and contractor bills.',
                  },
                ],
                certifications: [
                  {
                    id: 'cert-civ-01',
                    title: 'Certified Construction Site Engineer (Quality & Safety)',
                    issuingOrg: 'Construction Skill Development Council of India (CSDCI)',
                    level: 'NSQF Level 6',
                    validityYears: 3,
                    skills: ['Site Inspection', 'IS Code Compliance', 'Bar Bending Schedules'],
                    examPattern: 'Site Assessment & Written Examination',
                  },
                  {
                    id: 'cert-civ-02',
                    title: 'Autodesk Certified Professional: AutoCAD Civil',
                    issuingOrg: 'Autodesk International',
                    level: 'Global Professional',
                    validityYears: 3,
                    skills: ['CAD Detailing', 'Drawing Standards', 'BIM Interoperability'],
                    examPattern: 'Online Computerized Exam',
                  },
                ],
                projects: [
                  {
                    id: 'prj-civ-01',
                    title: 'G+4 Residential Building Structural Detailing & BOQ Preparation',
                    description: 'Created comprehensive structural CAD drawings, generated automated Bar Bending Schedules for columns and beams, and compiled itemized BOQ.',
                    role: 'Junior Planning & Estimation Engineer',
                    technologiesUsed: ['AutoCAD', 'Excel BBS Calculator', 'IS 456:2000', 'STAAD.Pro'],
                    outcome: 'Estimated ₹2.8 Cr project materials with under 1.8% variance from actuals.',
                    industryRelevance: 'Directly mirrors real estate and infrastructure development workflow.',
                  },
                  {
                    id: 'prj-civ-02',
                    title: 'Topographic Total Station Survey & Highway Alignment Layout',
                    description: 'Conducted 3.5 km corridor survey, plotted contour lines, and marked center-line staking using electronic total station.',
                    role: 'Lead Site Surveyor',
                    technologiesUsed: ['Leica Total Station', 'AutoCAD Civil 3D', 'Auto Level'],
                    outcome: 'Delivered digital terrain model and earthwork cut/fill estimation.',
                    industryRelevance: 'Highway and infrastructure alignment projects.',
                  },
                ],
                roadmap: [
                  {
                    phaseNumber: 1,
                    phaseTitle: 'Phase 1: Civil Drawing Reading, Codes & AutoCAD Essentials',
                    duration: 'Weeks 1 - 4',
                    skills: ['AutoCAD 2D', 'IS 456 Basics', 'Structural Section Interpretation'],
                    deliverable: 'Standard G+2 foundation and floor framing plan',
                    status: 'Completed',
                    progressPercentage: 100,
                  },
                  {
                    phaseNumber: 2,
                    phaseTitle: 'Phase 2: Total Station Surveying & Site Layout Alignment',
                    duration: 'Weeks 5 - 10',
                    skills: ['Total Station', 'Leveling', 'Column Grid Staking', 'Benchmark Datum'],
                    deliverable: 'Corridor layout and field survey measurement sheets',
                    status: 'In Progress',
                    progressPercentage: 70,
                  },
                  {
                    phaseNumber: 3,
                    phaseTitle: 'Phase 3: Bar Bending Schedule (BBS) & Concrete Quality Testing',
                    duration: 'Weeks 11 - 15',
                    skills: ['Bar Bending Schedule', 'Slump & Cube Testing', 'Mix Design', 'IS 10262'],
                    deliverable: 'Complete material reconciliation and quality dossier',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                  {
                    phaseNumber: 4,
                    phaseTitle: 'Phase 4: Site Execution Management & Contractor Billing (BOQ)',
                    duration: 'Weeks 16 - 20',
                    skills: ['MS Project / Primavera', 'BOQ Verification', 'Site Safety Audits'],
                    deliverable: 'End-to-end site execution project handbook',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                ],
                jobRoles: [
                  {
                    id: 'job-civ-01',
                    title: 'Graduate Engineer Trainee (Site Execution)',
                    company: 'L&T Construction',
                    location: 'Mumbai / Delhi NCR / Bengaluru',
                    salaryRange: '₹5.0 - ₹6.8 LPA',
                    type: 'Job',
                    sector: 'Infrastructure & Heavy Civil',
                    experienceRequired: 'Fresh Graduate (0 - 1 Year)',
                    openings: 45,
                    minCgpa: 6.5,
                    requiredQualifications: ['B.Tech in Civil Engineering'],
                    requiredBranches: ['Civil Engineering'],
                    requiredSkills: ['AutoCAD Civil', 'Site Surveying', 'Concrete Technology', 'BBS'],
                    preferredCerts: ['Certified Construction Site Engineer (CSDCI)'],
                    description: 'Supervise metro rail viaducts, bridge piers, and high-rise structural civil construction works on site.',
                    postedDaysAgo: 1,
                  },
                  {
                    id: 'job-civ-02',
                    title: 'Junior Quantity Surveyor & Site Engineer',
                    company: 'Shapoorji Pallonji Real Estate',
                    location: 'Hyderabad / Pune',
                    salaryRange: '₹4.5 - ₹6.0 LPA',
                    type: 'Job',
                    sector: 'Commercial & Residential Real Estate',
                    experienceRequired: '0 - 2 Years',
                    openings: 15,
                    minCgpa: 6.0,
                    requiredQualifications: ['B.Tech Civil', 'Diploma in Civil'],
                    requiredBranches: ['Civil Engineering'],
                    requiredSkills: ['AutoCAD', 'BOQ Estimation', 'Site Surveying', 'Material Reconciliation'],
                    preferredCerts: [],
                    description: 'Prepare contractor measurement sheets, track steel consumption against BBS, and inspect finishing works.',
                    postedDaysAgo: 3,
                  },
                  {
                    id: 'job-civ-03',
                    title: 'NAPS Civil Engineering Apprentice',
                    company: 'Afcons Infrastructure',
                    location: 'Ahmedabad / Kolkata',
                    salaryRange: '₹26,000 / month Stipend',
                    type: 'Apprenticeship',
                    sector: 'Highways & Marine Construction',
                    experienceRequired: 'Fresh Civil Graduate',
                    openings: 30,
                    minCgpa: 5.8,
                    requiredQualifications: ['B.Tech Civil', 'Diploma Civil'],
                    requiredBranches: ['Civil Engineering'],
                    requiredSkills: ['Site Surveying', 'Concrete Testing'],
                    preferredCerts: [],
                    description: 'National Apprenticeship program on highway expansion and grade separator infrastructure.',
                    postedDaysAgo: 5,
                  },
                ],
                interviewQuestions: [
                  {
                    question: 'How do you calculate the unit weight of a steel rebar, and what is the formula per meter run?',
                    category: 'Materials & BBS',
                    modelAnswerSummary: 'Unit weight of steel rebar is calculated using formula: D² / 162.2 kg per meter, where D is diameter in mm. For example, 16mm rebar weighs (16 * 16) / 162.2 ≈ 1.58 kg/m.',
                  },
                  {
                    question: 'What are the main causes of honeycombing in reinforced concrete, and how do you prevent it on site?',
                    category: 'Concrete Execution',
                    modelAnswerSummary: 'Honeycombing occurs due to insufficient vibration/compaction, improper clear cover, high aggregate size blocking congested rebar, or leaky shuttering. Prevented by maintaining specified cover blocks (IS 456), using needle vibrators correctly, and verifying mix workability (slump).',
                  },
                  {
                    question: 'What is the standard test procedure for 28-day concrete cube compressive strength?',
                    category: 'Quality Assurance',
                    modelAnswerSummary: '150mm x 150mm x 150mm steel moulds filled in 3 layers, each tamped 35 times. Stripped after 24 hours, cured in water tank for 28 days, then loaded in Compression Testing Machine at 140 kg/cm²/min until failure. Value must meet or exceed characteristic strength (fck).',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 3. COMMERCE (B.COM / M.COM)
  // --------------------------------------------------------------------------
  {
    id: 'stream-commerce',
    name: 'Commerce & Financial Services',
    code: 'BCOM',
    iconName: 'Calculator',
    description: 'Corporate accounting, financial analysis, direct and indirect taxation, auditing, and corporate banking.',
    industryPartners: ['Deloitte', 'HDFC Bank', 'ICICI Bank', 'EY', 'PwC', 'Tata Capital'],
    qualifications: [
      {
        id: 'bcom-degree',
        name: 'B.Com (Finance & Accounting)',
        level: 'Undergraduate',
        durationYears: 3,
        specializations: [
          {
            id: 'bcom-spec-accounting',
            name: 'Corporate Accounting & Taxation',
            code: 'BCOM-ACC',
            description: 'Financial ledger management, statutory GST compliance, TDS calculation, and corporate financial reporting.',
            careers: [
              {
                id: 'career-corporate-accountant',
                title: 'Corporate Accountant',
                sector: 'Banking, Financial Services & Insurance (BFSI)',
                streamCode: 'BCOM',
                workType: 'Desk/Office',
                description: 'Manage journal entries, balance sheet reconciliations, monthly GST return filing (GSTR-1, GSTR-3B), TDS deductions, and preparation of MIS financial reports.',
                salaryRange: '₹3.8 - ₹6.5 LPA',
                marketDemand: 'Very High',
                minCgpa: 6.0,
                requiredSkills: [
                  {
                    skill: 'Advanced MS Excel (VLOOKUP, Pivot, XLOOKUP)',
                    category: 'Tools & Software',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 45,
                    priority: 'High',
                    whyRequired: 'Financial modeling, data consolidation, variance analysis, pivot tables',
                    recommendedCourseTitle: 'Advanced Financial Excel & Data Modeling',
                    recommendedCourseId: 'crs-com-01',
                    estimatedDuration: '30 Hours',
                  },
                  {
                    skill: 'TallyPrime & ERP Accounting',
                    category: 'Tools & Software',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 40,
                    priority: 'High',
                    whyRequired: 'Voucher creation, multi-currency ledger management, inventory accounting',
                    recommendedCourseTitle: 'Comprehensive TallyPrime with GST & Payroll Management',
                    recommendedCourseId: 'crs-com-02',
                    estimatedDuration: '40 Hours',
                  },
                  {
                    skill: 'Goods & Services Tax (GST Filing & Compliance)',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 35,
                    priority: 'High',
                    whyRequired: 'Input Tax Credit (ITC) matching, GSTR-1, GSTR-3B, e-Way bill generation',
                    recommendedCourseTitle: 'Practical GST Practitioner Certification & Return Filing',
                    recommendedCourseId: 'crs-com-03',
                    estimatedDuration: '35 Hours',
                  },
                  {
                    skill: 'Direct Tax & TDS Compliance',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 30,
                    priority: 'Medium',
                    whyRequired: 'Form 16/16A generation, quarterly 24Q/26Q e-TDS filing, advance tax',
                    recommendedCourseTitle: 'Direct Taxation & Corporate TDS Compliance in India',
                    recommendedCourseId: 'crs-com-04',
                    estimatedDuration: '25 Hours',
                  },
                  {
                    skill: 'Financial Statement Analysis & Ratio Analysis',
                    category: 'Core Technical',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 50,
                    priority: 'Medium',
                    whyRequired: 'Cash flow statements, liquidity ratios, profitability index, balance sheet audit',
                    recommendedCourseTitle: 'Corporate Financial Statement Analysis & Reporting',
                    recommendedCourseId: 'crs-com-05',
                    estimatedDuration: '25 Hours',
                  },
                  {
                    skill: 'Internal Audit & Statutory Compliance',
                    category: 'Professional',
                    requiredLevel: 'Beginner',
                    requiredPercentage: 65,
                    defaultStudentPercentage: 25,
                    priority: 'Low',
                    whyRequired: 'Voucher verification, internal controls assessment, audit trails',
                    recommendedCourseTitle: 'Fundamentals of Internal Auditing & Risk Management',
                    recommendedCourseId: 'crs-com-06',
                    estimatedDuration: '20 Hours',
                  },
                ],
                courses: [
                  {
                    id: 'crs-com-01',
                    title: 'Advanced Financial Excel & Data Modeling',
                    provider: 'BFSI Sector Skill Council of India',
                    duration: '30 Hours',
                    level: 'Advanced',
                    skills: ['Excel Formulas', 'Pivot Tables', 'XLOOKUP', 'Dynamic Dashboards'],
                    modulesCount: 6,
                    nsqfLevel: 5,
                    description: 'Master lookup formulas, nested logic, financial macros, and executive reporting summaries.',
                  },
                  {
                    id: 'crs-com-02',
                    title: 'Comprehensive TallyPrime with GST & Payroll Management',
                    provider: 'Tally Education / National Skill Development Corporation',
                    duration: '40 Hours',
                    level: 'Advanced',
                    skills: ['TallyPrime', 'Vouchers', 'Ledgers', 'Statutory GST', 'Payroll'],
                    modulesCount: 8,
                    nsqfLevel: 5,
                    description: 'Hands-on enterprise bookkeeping, sales/purchase registers, BRS, and automated e-invoice generation.',
                  },
                  {
                    id: 'crs-com-03',
                    title: 'Practical GST Practitioner Certification & Return Filing',
                    provider: 'Institute of Chartered Accountants of India (ICAI-RVO) / BFSI',
                    duration: '35 Hours',
                    level: 'Intermediate',
                    skills: ['GSTR-1', 'GSTR-3B', 'ITC Reconciliation', 'e-Way Bill'],
                    modulesCount: 7,
                    nsqfLevel: 6,
                    description: 'Real-world portal simulation of GST return preparation, reversal of ITC, and handling notices.',
                  },
                ],
                certifications: [
                  {
                    id: 'cert-com-01',
                    title: 'Certified TallyPrime Professional (Financial & GST Accounting)',
                    issuingOrg: 'Tally Education & NSDC',
                    level: 'NSQF Level 5',
                    validityYears: 3,
                    skills: ['TallyPrime', 'GST Return Preparation', 'Financial Vouchers'],
                    examPattern: 'Computer-based Practical Examination',
                  },
                  {
                    id: 'cert-com-02',
                    title: 'Certified GST Practitioner (CGP)',
                    issuingOrg: 'BFSI Sector Skill Council of India',
                    level: 'NSQF Level 6',
                    validityYears: 3,
                    skills: ['GST Law', 'GSTR-3B Filing', 'Input Tax Credit Audit'],
                    examPattern: 'National Benchmark Assessment',
                  },
                ],
                projects: [
                  {
                    id: 'prj-com-01',
                    title: 'Comprehensive Annual Financial Audit & GST Reconciliation for SME',
                    description: 'Conducted quarterly bank reconciliation statements, identified ₹4.2 Lakh uncredited input tax credit via GSTR-2B matching in Excel.',
                    role: 'Accounts & Audit Trainee',
                    technologiesUsed: ['TallyPrime', 'Advanced Excel', 'GST Portal', 'TDS Rates'],
                    outcome: 'Reconciled 1,400+ invoices and successfully generated zero-penalty GSTR-9 annual return.',
                    industryRelevance: 'Standard corporate accounting and compliance operations.',
                  },
                  {
                    id: 'prj-com-02',
                    title: 'Multi-Department Payroll & Statutory Deduction Model in Excel',
                    description: 'Built an automated payroll calculator covering 120 employees with dynamic PF, ESI, Professional Tax, and TDS slabs.',
                    role: 'Financial Analyst Intern',
                    technologiesUsed: ['Excel Macros', 'Income Tax Slabs 2026', 'PF/ESI Rules'],
                    outcome: 'Reduced monthly payroll processing time from 3 days to 4 hours.',
                    industryRelevance: 'Corporate HR finance and accounts payable departments.',
                  },
                ],
                roadmap: [
                  {
                    phaseNumber: 1,
                    phaseTitle: 'Phase 1: Double-Entry Bookkeeping & Advanced Financial Excel',
                    duration: 'Weeks 1 - 4',
                    skills: ['Journal Entries', 'Trial Balance', 'Excel Pivot Tables', 'VLOOKUP / XLOOKUP'],
                    deliverable: 'Dynamic multi-sheet financial model and balance sheet draft',
                    status: 'Completed',
                    progressPercentage: 100,
                  },
                  {
                    phaseNumber: 2,
                    phaseTitle: 'Phase 2: TallyPrime Enterprise Accounting & BRS',
                    duration: 'Weeks 5 - 10',
                    skills: ['TallyPrime', 'Bank Reconciliation', 'Inventory Ledgers', 'Cost Centers'],
                    deliverable: 'Fully reconciled company books in TallyPrime',
                    status: 'In Progress',
                    progressPercentage: 60,
                  },
                  {
                    phaseNumber: 3,
                    phaseTitle: 'Phase 3: GST Compliance, GSTR-1/3B & Input Tax Credit',
                    duration: 'Weeks 11 - 15',
                    skills: ['GSTR-1', 'GSTR-3B', 'GSTR-2B Matching', 'e-Invoice / e-Way Bill'],
                    deliverable: 'Simulated quarterly GST filing dossier with zero discrepancies',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                  {
                    phaseNumber: 4,
                    phaseTitle: 'Phase 4: Corporate TDS, Financial Statements & Statutory Audit',
                    duration: 'Weeks 16 - 20',
                    skills: ['TDS Sections', 'Cash Flow Analysis', 'MIS Reports', 'Internal Controls'],
                    deliverable: 'Executive financial reporting package for management',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                ],
                jobRoles: [
                  {
                    id: 'job-com-01',
                    title: 'Corporate Accounts Executive',
                    company: 'Tata Consultancy Services - Corporate Finance',
                    location: 'Mumbai / Hyderabad / Chennai',
                    salaryRange: '₹4.2 - ₹5.8 LPA',
                    type: 'Job',
                    sector: 'BFSI & Corporate Shared Services',
                    experienceRequired: '0 - 1 Year (B.Com / M.Com)',
                    openings: 32,
                    minCgpa: 6.0,
                    requiredQualifications: ['B.Com', 'M.Com', 'BBA Finance'],
                    requiredBranches: ['Commerce', 'Accounting & Finance'],
                    requiredSkills: ['Advanced Excel', 'TallyPrime', 'GST Filing', 'Bank Reconciliation'],
                    preferredCerts: ['Certified TallyPrime Professional', 'Certified GST Practitioner'],
                    description: 'Maintain general ledger accounts, verify vendor invoices, and support quarterly statutory audits.',
                    postedDaysAgo: 1,
                  },
                  {
                    id: 'job-com-02',
                    title: 'Taxation & Accounts Trainee',
                    company: 'Deloitte Shared Services India',
                    location: 'Bengaluru / Gurugram',
                    salaryRange: '₹4.5 - ₹6.2 LPA',
                    type: 'Job',
                    sector: 'Audit, Tax & Advisory',
                    experienceRequired: 'Fresh Graduate',
                    openings: 20,
                    minCgpa: 6.5,
                    requiredQualifications: ['B.Com', 'M.Com'],
                    requiredBranches: ['Commerce'],
                    requiredSkills: ['Advanced Excel', 'Direct Tax', 'GST', 'Financial Statements'],
                    preferredCerts: ['Certified GST Practitioner'],
                    description: 'Support international and domestic corporate tax computations, TDS filings, and reconciliation schedules.',
                    postedDaysAgo: 3,
                  },
                  {
                    id: 'job-com-03',
                    title: 'NAPS Banking & Accounts Apprentice',
                    company: 'HDFC Bank Financial Operations',
                    location: 'Noida / Kolkata / Ahmedabad',
                    salaryRange: '₹24,000 / month Stipend',
                    type: 'Apprenticeship',
                    sector: 'Retail Banking & Operations',
                    experienceRequired: 'Fresh B.Com Graduate',
                    openings: 50,
                    minCgpa: 5.5,
                    requiredQualifications: ['B.Com'],
                    requiredBranches: ['Commerce'],
                    requiredSkills: ['Advanced Excel', 'Bookkeeping'],
                    preferredCerts: [],
                    description: 'National Apprenticeship program in commercial banking branch operations and client ledger clearing.',
                    postedDaysAgo: 6,
                  },
                ],
                interviewQuestions: [
                  {
                    question: 'What is the exact difference between GSTR-1, GSTR-3B, and GSTR-2B in Indian GST law?',
                    category: 'GST Compliance',
                    modelAnswerSummary: 'GSTR-1 is a monthly/quarterly return of outward supplies (sales). GSTR-3B is a monthly summary return for self-declaration of tax liability and payment. GSTR-2B is an auto-drafted, static Input Tax Credit (ITC) statement generated for recipient based on supplier GSTR-1 filings, serving as the benchmark for eligible credit claims.',
                  },
                  {
                    question: 'How do you handle the 3-statement financial model connection between Income Statement, Balance Sheet, and Cash Flow?',
                    category: 'Financial Modeling',
                    modelAnswerSummary: 'Net Income from Income Statement flows into Retained Earnings in Balance Sheet and forms starting point of Cash Flow from Operations. Non-cash items (Depreciation) are added back. Working capital changes connect to current assets/liabilities. Ending Cash from Cash Flow Statement matches Cash in Balance Sheet.',
                  },
                  {
                    question: 'Under what conditions does a company deduct TDS under Section 194C vs 194J?',
                    category: 'Direct Taxation',
                    modelAnswerSummary: 'Section 194C applies to payments made to contractors and subcontractors for carrying out any work (rate is 1% for individuals/HUF, 2% for companies). Section 194J applies to fees for professional or technical services, royalties, or non-compete fees (rate is 10% for professional services, 2% for technical services/call centers).',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 4. MECHANICAL ENGINEERING
  // --------------------------------------------------------------------------
  {
    id: 'stream-mech',
    name: 'Mechanical Engineering',
    code: 'MECH',
    iconName: 'Wrench',
    description: 'CAD/CAM product design, manufacturing automation, thermodynamics, quality engineering, and HVAC systems.',
    industryPartners: ['Tata Motors', 'Mahindra & Mahindra', 'L&T Heavy Engineering', 'Bharat Forge', 'Thermax'],
    qualifications: [
      {
        id: 'mech-btech',
        name: 'B.Tech / B.E (Mechanical Engineering)',
        level: 'Undergraduate',
        durationYears: 4,
        specializations: [
          {
            id: 'mech-spec-design',
            name: 'CAD/CAM & Product Design',
            code: 'MECH-CAD',
            description: '3D parametric modeling, GD&T, finite element analysis (FEA), and DFM for tooling and sheet metal.',
            careers: [
              {
                id: 'career-cad-engineer',
                title: 'Mechanical Design Engineer (CAD/CAM)',
                sector: 'Automotive & Heavy Machinery',
                streamCode: 'MECH',
                workType: 'Desk/Office',
                description: 'Create 3D parametric components, sheet metal assemblies, injection mold designs, apply Geometric Dimensioning and Tolerancing (GD&T), and perform stress analysis.',
                salaryRange: '₹4.8 - ₹8.0 LPA',
                marketDemand: 'High',
                minCgpa: 6.2,
                requiredSkills: [
                  {
                    skill: 'SolidWorks / CATIA 3D Modeling',
                    category: 'Tools & Software',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 45,
                    priority: 'High',
                    whyRequired: 'Parametric solid modeling, sheet metal design, surface modeling, and assembly creation',
                    recommendedCourseTitle: 'Mastering SolidWorks & Parametric Mechanical Assembly Design',
                    recommendedCourseId: 'crs-mec-01',
                    estimatedDuration: '45 Hours',
                  },
                  {
                    skill: 'Geometric Dimensioning & Tolerancing (GD&T - ASME Y14.5)',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 35,
                    priority: 'High',
                    whyRequired: 'Feature control frames, datum reference frames, tolerance stack-up analysis',
                    recommendedCourseTitle: 'Industrial GD&T Standards & Tolerance Stack-Up Analysis',
                    recommendedCourseId: 'crs-mec-02',
                    estimatedDuration: '30 Hours',
                  },
                  {
                    skill: 'Finite Element Analysis (ANSYS Structural)',
                    category: 'Tools & Software',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 30,
                    priority: 'High',
                    whyRequired: 'Von Mises stress, deformation, factor of safety, thermal gradient analysis',
                    recommendedCourseTitle: 'Applied Finite Element Analysis with ANSYS Workbench',
                    recommendedCourseId: 'crs-mec-03',
                    estimatedDuration: '40 Hours',
                  },
                  {
                    skill: 'Design for Manufacturing & Assembly (DFMA)',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 40,
                    priority: 'Medium',
                    whyRequired: 'Draft angles, parting lines, sheet metal bend deductions, CNC machinability',
                    recommendedCourseTitle: 'DFMA for Injection Molding & Sheet Metal Fabrication',
                    recommendedCourseId: 'crs-mec-04',
                    estimatedDuration: '25 Hours',
                  },
                  {
                    skill: 'CNC Programming & G-Code/M-Code',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 70,
                    defaultStudentPercentage: 45,
                    priority: 'Medium',
                    whyRequired: 'Toolpath generation, feed rates, spindle speed calculation, CAM post-processing',
                    recommendedCourseTitle: 'CNC Milling & Turning Programming with MasterCAM',
                    recommendedCourseId: 'crs-mec-05',
                    estimatedDuration: '30 Hours',
                  },
                ],
                courses: [
                  {
                    id: 'crs-mec-01',
                    title: 'Mastering SolidWorks & Parametric Mechanical Assembly Design',
                    provider: 'Automotive Skills Development Council (ASDC)',
                    duration: '45 Hours',
                    level: 'Advanced',
                    skills: ['SolidWorks', 'Assemblies', 'Drafting', 'Mates'],
                    modulesCount: 9,
                    nsqfLevel: 6,
                    description: 'Industrial 3D solid modeling, top-down assembly design, and standard fabrication drawing creation.',
                  },
                  {
                    id: 'crs-mec-02',
                    title: 'Industrial GD&T Standards & Tolerance Stack-Up Analysis',
                    provider: 'National Institute of Design & Manufacturing',
                    duration: '30 Hours',
                    level: 'Advanced',
                    skills: ['ASME Y14.5', 'Datum Selection', 'True Position', 'Runout'],
                    modulesCount: 6,
                    nsqfLevel: 6,
                    description: 'Interpret and apply form, orientation, location, and runout tolerances to engineering drawings.',
                  },
                ],
                certifications: [
                  {
                    id: 'cert-mec-01',
                    title: 'Certified SOLIDWORKS Professional (CSWP)',
                    issuingOrg: 'Dassault Systèmes',
                    level: 'Global Professional',
                    validityYears: 5,
                    skills: ['Part Modeling', 'Assembly Modeling', 'Configurations'],
                    examPattern: 'Hands-on Timed Practical Modeling Exam',
                  },
                ],
                projects: [
                  {
                    id: 'prj-mec-01',
                    title: 'Electric Two-Wheeler Chassis Frame Design & Dynamic FEA Optimization',
                    description: 'Designed a lightweight tubular steel chassis in SolidWorks, performed torsional rigidity and static impact simulations in ANSYS.',
                    role: 'Lead Chassis CAE Designer',
                    technologiesUsed: ['SolidWorks', 'ANSYS Workbench', 'GD&T', 'Material Optimization'],
                    outcome: 'Reduced frame weight by 14.5% while sustaining 3.5G pothole impact with 1.8 Factor of Safety.',
                    industryRelevance: 'Electric vehicle startup and automotive OEM development.',
                  },
                ],
                roadmap: [
                  {
                    phaseNumber: 1,
                    phaseTitle: 'Phase 1: Parametric 3D Solid Modeling & Drafting',
                    duration: 'Weeks 1 - 4',
                    skills: ['SolidWorks Sketching', 'Extrude / Revolve / Sweep', 'Standard 2D Drawings'],
                    deliverable: 'Detailed component drawings with standard title blocks',
                    status: 'Completed',
                    progressPercentage: 100,
                  },
                  {
                    phaseNumber: 2,
                    phaseTitle: 'Phase 2: ASME Y14.5 GD&T & Tolerance Stack-Up',
                    duration: 'Weeks 5 - 10',
                    skills: ['GD&T Modifiers', 'True Position', 'Worst-Case Stack-Up Analysis'],
                    deliverable: 'Fully toleranced manufacturing drawing package',
                    status: 'In Progress',
                    progressPercentage: 65,
                  },
                  {
                    phaseNumber: 3,
                    phaseTitle: 'Phase 3: Finite Element Stress Analysis (ANSYS)',
                    duration: 'Weeks 11 - 15',
                    skills: ['Meshing', 'Boundary Conditions', 'Von Mises Stress', 'FOS Calculation'],
                    deliverable: 'CAE structural validation report with optimization recommendations',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                  {
                    phaseNumber: 4,
                    phaseTitle: 'Phase 4: DFMA & CAM CNC Toolpath Verification',
                    duration: 'Weeks 16 - 20',
                    skills: ['MasterCAM', 'G-Code Simulation', 'Sheet Metal Bend Allowance'],
                    deliverable: 'Production-ready prototype CAD and CAM package',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                ],
                jobRoles: [
                  {
                    id: 'job-mec-01',
                    title: 'Graduate Engineer Trainee - Product Design',
                    company: 'Tata Motors Engineering Research Centre (ERC)',
                    location: 'Pune / Jamshedpur',
                    salaryRange: '₹5.5 - ₹7.5 LPA',
                    type: 'Job',
                    sector: 'Automotive & Commercial Vehicles',
                    experienceRequired: '0 - 1 Year (Fresh Mechanical Engineer)',
                    openings: 25,
                    minCgpa: 6.5,
                    requiredQualifications: ['B.Tech in Mechanical Engineering'],
                    requiredBranches: ['Mechanical Engineering', 'Automobile Engineering'],
                    requiredSkills: ['SolidWorks / CATIA', 'GD&T', 'FEA Basics'],
                    preferredCerts: ['Certified SOLIDWORKS Professional (CSWP)'],
                    description: 'Develop automotive chassis brackets, BIW sheet metal components, and coordinate with tooling suppliers.',
                    postedDaysAgo: 2,
                  },
                ],
                interviewQuestions: [
                  {
                    question: 'What is the significance of Maximum Material Condition (MMC) in GD&T feature control frames?',
                    category: 'GD&T',
                    modelAnswerSummary: 'MMC indicates that the feature contains the maximum amount of material within its stated size limits (e.g. smallest hole or largest pin). Applying the MMC modifier allows "bonus tolerance"—as the feature deviates from MMC toward LMC, the positional tolerance increases proportionally, lowering manufacturing cost while ensuring assembly fit.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 5. PHARMACY & HEALTHCARE (B.PHARM)
  // --------------------------------------------------------------------------
  {
    id: 'stream-pharmacy',
    name: 'Pharmacy & Healthcare Sciences',
    code: 'PHARMA',
    iconName: 'HeartPulse',
    description: 'Pharmaceutical formulation, pharmacovigilance, drug safety reporting, clinical trials data management, and QC chemistry.',
    industryPartners: ['Sun Pharma', 'Dr. Reddy’s Laboratories', 'Cipla', 'IQVIA', 'Parexel', 'Biocon'],
    qualifications: [
      {
        id: 'pharma-bpharm',
        name: 'B.Pharm (Bachelor of Pharmacy)',
        level: 'Undergraduate',
        durationYears: 4,
        specializations: [
          {
            id: 'pharma-spec-clinical',
            name: 'Pharmacovigilance & Clinical Research',
            code: 'PHARMA-PV',
            description: 'Adverse event reporting, MedDRA coding, safety narratives, and Good Clinical Practice (GCP) compliance.',
            careers: [
              {
                id: 'career-pv-associate',
                title: 'Drug Safety / Pharmacovigilance Associate',
                sector: 'Pharmaceutical & Clinical Research Organizations (CRO)',
                streamCode: 'PHARMA',
                workType: 'Desk/Office',
                description: 'Collect, triage, code, and evaluate Individual Case Safety Reports (ICSRs) of adverse drug reactions using MedDRA and Argus Safety databases.',
                salaryRange: '₹4.2 - ₹6.8 LPA',
                marketDemand: 'Very High',
                minCgpa: 6.2,
                requiredSkills: [
                  {
                    skill: 'Pharmacovigilance & ICSR Case Processing',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 40,
                    priority: 'High',
                    whyRequired: 'Adverse event intake, triage, causality assessment, and regulatory submission deadlines',
                    recommendedCourseTitle: 'Professional Drug Safety & ICSR Processing Masterclass',
                    recommendedCourseId: 'crs-pha-01',
                    estimatedDuration: '40 Hours',
                  },
                  {
                    skill: 'MedDRA Medical Dictionary Coding',
                    category: 'Tools & Software',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 35,
                    priority: 'High',
                    whyRequired: 'System Organ Class (SOC), Preferred Term (PT), Lowest Level Term (LLT) coding rules',
                    recommendedCourseTitle: 'MedDRA Terminology & Standardization in Drug Safety',
                    recommendedCourseId: 'crs-pha-02',
                    estimatedDuration: '25 Hours',
                  },
                  {
                    skill: 'Good Clinical Practice (ICH-GCP E6 R2)',
                    category: 'Industry Standard',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 50,
                    priority: 'High',
                    whyRequired: 'Ethical trial conduct, patient confidentiality, protocol compliance',
                    recommendedCourseTitle: 'ICH-GCP Guidelines & Regulatory Trial Protocols',
                    recommendedCourseId: 'crs-pha-03',
                    estimatedDuration: '20 Hours',
                  },
                  {
                    skill: 'Pharmacology & Drug Mechanism of Action',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 60,
                    priority: 'Medium',
                    whyRequired: 'Pharmacokinetics (ADME), receptor interactions, expected vs unexpected reactions',
                    recommendedCourseTitle: 'Clinical Pharmacology & Adverse Drug Reaction Mechanisms',
                    recommendedCourseId: 'crs-pha-04',
                    estimatedDuration: '30 Hours',
                  },
                ],
                courses: [
                  {
                    id: 'crs-pha-01',
                    title: 'Professional Drug Safety & ICSR Processing Masterclass',
                    provider: 'Life Sciences Sector Skill Development Council (LSSSDC)',
                    duration: '40 Hours',
                    level: 'Advanced',
                    skills: ['ICSR Triage', 'MedDRA', 'Safety Narratives', 'Causality Assessment'],
                    modulesCount: 8,
                    nsqfLevel: 6,
                    description: 'Comprehensive case processing from initial receipt to narrative drafting and electronic E2B submission.',
                  },
                ],
                certifications: [
                  {
                    id: 'cert-pha-01',
                    title: 'Certified Pharmacovigilance Professional (CPVP)',
                    issuingOrg: 'Life Sciences Sector Skill Development Council (LSSSDC)',
                    level: 'NSQF Level 6',
                    validityYears: 3,
                    skills: ['MedDRA Coding', 'Argus Safety Workflow', 'ICH Guidelines'],
                    examPattern: 'Case Study Simulation & Objective Assessment',
                  },
                ],
                projects: [
                  {
                    id: 'prj-pha-01',
                    title: 'Comprehensive Safety Narrative & MedDRA Coding for NSAID Clinical Trial',
                    description: 'Processed 85 adverse event cases, coded symptoms using MedDRA hierarchy, and drafted compliant safety narratives.',
                    role: 'Drug Safety Trainee',
                    technologiesUsed: ['MedDRA 26.0', 'ICH-GCP Guidelines', 'Case Report Forms (CRF)'],
                    outcome: 'Achieved 100% regulatory compliance with zero terminology re-queries.',
                    industryRelevance: 'Direct replica of daily tasks in top global CROs and pharma safety hubs.',
                  },
                ],
                roadmap: [
                  {
                    phaseNumber: 1,
                    phaseTitle: 'Phase 1: Pharmacology Fundamentals & ICH-GCP Regulatory Guidelines',
                    duration: 'Weeks 1 - 4',
                    skills: ['ADME Principles', 'ICH-GCP E6', 'Adverse Event Definitions'],
                    deliverable: 'GCP compliance certification and case intake portfolio',
                    status: 'Completed',
                    progressPercentage: 100,
                  },
                  {
                    phaseNumber: 2,
                    phaseTitle: 'Phase 2: MedDRA Medical Terminology & Coding Standards',
                    duration: 'Weeks 5 - 10',
                    skills: ['MedDRA Hierarchy', 'SOC / PT / LLT', 'Coding Rules & Conventions'],
                    deliverable: 'Standardized terminology mapping sheet for 100 clinical symptoms',
                    status: 'In Progress',
                    progressPercentage: 70,
                  },
                  {
                    phaseNumber: 3,
                    phaseTitle: 'Phase 3: ICSR Case Processing & Medical Safety Narratives',
                    duration: 'Weeks 11 - 15',
                    skills: ['Causality Assessment (Naranjo Scale)', 'Narrative Writing', 'De-challenge / Re-challenge'],
                    deliverable: 'Complete ICSR safety dossier for serious adverse event (SAE)',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                  {
                    phaseNumber: 4,
                    phaseTitle: 'Phase 4: Regulatory Reporting Timelines & Audit Readiness',
                    duration: 'Weeks 16 - 20',
                    skills: ['FDA 15-Day Alert Reports', 'EMA PSUR / PBRER', 'Quality Check (QC)'],
                    deliverable: 'Pharmacovigilance inspection readiness checklist',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                ],
                jobRoles: [
                  {
                    id: 'job-pha-01',
                    title: 'Junior Drug Safety Associate',
                    company: 'IQVIA Clinical Data Hub',
                    location: 'Bengaluru / Kochi / Mumbai',
                    salaryRange: '₹4.5 - ₹6.5 LPA',
                    type: 'Job',
                    sector: 'Clinical Research Organizations',
                    experienceRequired: '0 - 1 Year (B.Pharm / Pharm.D)',
                    openings: 40,
                    minCgpa: 6.2,
                    requiredQualifications: ['B.Pharm', 'M.Pharm', 'Pharm.D'],
                    requiredBranches: ['Pharmacy', 'Clinical Research'],
                    requiredSkills: ['Pharmacovigilance', 'MedDRA Coding', 'GCP Guidelines'],
                    preferredCerts: ['Certified Pharmacovigilance Professional (CPVP)'],
                    description: 'Perform triage, book-in, MedDRA coding, and draft medical narratives for spontaneous and clinical adverse events.',
                    postedDaysAgo: 1,
                  },
                ],
                interviewQuestions: [
                  {
                    question: 'What are the criteria that classify an adverse event as "Serious" (SAE) under ICH Guidelines?',
                    category: 'Regulatory Drug Safety',
                    modelAnswerSummary: 'An adverse event is Serious if it: 1) Results in death, 2) Is life-threatening, 3) Requires inpatient hospitalization or prolongs existing hospitalization, 4) Results in persistent or significant disability/incapacity, 5) Is a congenital anomaly/birth defect, or 6) Is an important medical event requiring intervention.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 6. AGRICULTURE (B.SC AGRICULTURE)
  // --------------------------------------------------------------------------
  {
    id: 'stream-agriculture',
    name: 'Agricultural Sciences & Agribusiness',
    code: 'AGRI',
    iconName: 'Sprout',
    description: 'Agronomy, precision farming, soil fertility management, drip irrigation engineering, and agribusiness supply chain.',
    industryPartners: ['Bayer Crop Science', 'UPL India', 'ITC Agri Business', 'Coromandel International', 'DeHaat'],
    qualifications: [
      {
        id: 'agri-bsc',
        name: 'B.Sc (Honours) Agriculture',
        level: 'Undergraduate',
        durationYears: 4,
        specializations: [
          {
            id: 'agri-spec-agronomy',
            name: 'Agronomy & Precision Farming',
            code: 'AGRI-PREC',
            description: 'Modern soil testing, drone/sensor crop health monitoring, precision fertigation, and integrated pest management (IPM).',
            careers: [
              {
                id: 'career-agronomist',
                title: 'Agronomist & Precision Farming Specialist',
                sector: 'Agriculture & Agritech',
                streamCode: 'AGRI',
                workType: 'Field',
                description: 'Provide scientific crop advisory, formulate precision fertilizer and irrigation schedules, monitor satellite/drone NDVI vegetation indices, and diagnose crop pathology.',
                salaryRange: '₹4.0 - ₹7.0 LPA',
                marketDemand: 'High',
                minCgpa: 6.0,
                requiredSkills: [
                  {
                    skill: 'Soil Science & Nutrient Management (NPK / Micronutrients)',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 55,
                    priority: 'High',
                    whyRequired: 'Soil test interpretation, electrical conductivity (EC), pH balancing, customized fertilizer recommendations',
                    recommendedCourseTitle: 'Comprehensive Soil Health & Balanced Crop Nutrition',
                    recommendedCourseId: 'crs-agr-01',
                    estimatedDuration: '30 Hours',
                  },
                  {
                    skill: 'Integrated Pest & Disease Management (IPM)',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 50,
                    priority: 'High',
                    whyRequired: 'Economic Threshold Levels (ETL), bio-control agents, chemical rotation against resistance',
                    recommendedCourseTitle: 'Integrated Pest Management & Sustainable Crop Protection',
                    recommendedCourseId: 'crs-agr-02',
                    estimatedDuration: '35 Hours',
                  },
                  {
                    skill: 'Precision Agriculture (NDVI Satellite Data & Drone Tech)',
                    category: 'Tools & Software',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 25,
                    priority: 'High',
                    whyRequired: 'Remote sensing multispectral indices, variable rate technology (VRT)',
                    recommendedCourseTitle: 'Drone Imagery & Satellite Remote Sensing for Agronomy',
                    recommendedCourseId: 'crs-agr-03',
                    estimatedDuration: '30 Hours',
                  },
                  {
                    skill: 'Micro-Irrigation & Fertigation Systems',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 40,
                    priority: 'Medium',
                    whyRequired: 'Drip emitter discharge, venturi injectors, automated irrigation valves',
                    recommendedCourseTitle: 'Drip & Sprinkler Micro-Irrigation System Design',
                    recommendedCourseId: 'crs-agr-04',
                    estimatedDuration: '25 Hours',
                  },
                ],
                courses: [
                  {
                    id: 'crs-agr-01',
                    title: 'Comprehensive Soil Health & Balanced Crop Nutrition',
                    provider: 'Agriculture Skill Council of India (ASCI)',
                    duration: '30 Hours',
                    level: 'Advanced',
                    skills: ['Soil Chemistry', 'Fertilizer Calculation', 'Micronutrient Deficiencies'],
                    modulesCount: 6,
                    nsqfLevel: 5,
                    description: 'Scientific diagnostic methods for nitrogen, phosphorus, potash, and micronutrient balance across staple and commercial crops.',
                  },
                ],
                certifications: [
                  {
                    id: 'cert-agr-01',
                    title: 'Certified Precision Agronomist',
                    issuingOrg: 'Agriculture Skill Council of India (ASCI)',
                    level: 'NSQF Level 6',
                    validityYears: 3,
                    skills: ['Crop Health Monitoring', 'Fertigation Schedules', 'Soil Diagnostics'],
                    examPattern: 'Field Practical Evaluation & Written Exam',
                  },
                ],
                projects: [
                  {
                    id: 'prj-agr-01',
                    title: 'Drip Fertigation & Drone NDVI Monitoring for 50-Acre Cotton Crop',
                    description: 'Deployed multispectral drone scouting, mapped nitrogen stress zones, and instituted sensor-triggered drip fertigation.',
                    role: 'Precision Farming Project Intern',
                    technologiesUsed: ['NDVI Analysis', 'Drip Fertigation Systems', 'Soil Moisture Sensors'],
                    outcome: 'Boosted harvest yield by 18.2% while saving 28% irrigation water and 15% chemical fertilizer.',
                    industryRelevance: 'Modern agritech advisory and corporate contract farming.',
                  },
                ],
                roadmap: [
                  {
                    phaseNumber: 1,
                    phaseTitle: 'Phase 1: Soil Chemistry, NPK Testing & Fertilizer Calculations',
                    duration: 'Weeks 1 - 4',
                    skills: ['Soil Sampling Protocols', 'pH / EC Meters', 'Targeted Yield Equations'],
                    deliverable: 'Customized crop nutrition chart based on soil test reports',
                    status: 'Completed',
                    progressPercentage: 100,
                  },
                  {
                    phaseNumber: 2,
                    phaseTitle: 'Phase 2: Pest Scouting, ETL Thresholds & Bio-Pesticides',
                    duration: 'Weeks 5 - 10',
                    skills: ['Pest Identification', 'Pheromone Traps', 'Biological Control Agents'],
                    deliverable: 'Field IPM spray schedule minimizing pesticide residues',
                    status: 'In Progress',
                    progressPercentage: 70,
                  },
                  {
                    phaseNumber: 3,
                    phaseTitle: 'Phase 3: Drip Fertigation Design & Water Requirement Curves',
                    duration: 'Weeks 11 - 15',
                    skills: ['Crop Evapotranspiration (ETc)', 'Venturi Injectors', 'Soluble Fertilizers'],
                    deliverable: 'Complete automated drip fertigation protocol',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                  {
                    phaseNumber: 4,
                    phaseTitle: 'Phase 4: Satellite NDVI & Drone Multispectral Farm Telemetry',
                    duration: 'Weeks 16 - 20',
                    skills: ['QGIS Basics', 'NDVI Heatmaps', 'Variable Rate Recommendations'],
                    deliverable: 'Digital farm health telemetry dashboard',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                ],
                jobRoles: [
                  {
                    id: 'job-agr-01',
                    title: 'Agronomy Field Officer / Crop Advisor',
                    company: 'ITC Agri Business Division (e-Choupal)',
                    location: 'Madhya Pradesh / Andhra Pradesh / Punjab',
                    salaryRange: '₹4.5 - ₹6.5 LPA + Vehicle Allowance',
                    type: 'Job',
                    sector: 'Agribusiness & Farm Advisory',
                    experienceRequired: '0 - 1 Year (B.Sc Agriculture)',
                    openings: 35,
                    minCgpa: 6.0,
                    requiredQualifications: ['B.Sc Agriculture', 'M.Sc Agronomy'],
                    requiredBranches: ['Agriculture', 'Horticulture'],
                    requiredSkills: ['Soil Science', 'Fertigation', 'Pest Management', 'Farmer Counseling'],
                    preferredCerts: ['Certified Precision Agronomist'],
                    description: 'Counsel farmer clusters on scientific seed treatments, fertilizer management, and implement procurement quality standards.',
                    postedDaysAgo: 2,
                  },
                ],
                interviewQuestions: [
                  {
                    question: 'How do you calculate the quantity of Urea required to supply 60 kg of Nitrogen for a 1-hectare crop?',
                    category: 'Fertilizer Calculations',
                    modelAnswerSummary: 'Urea contains approximately 46% Nitrogen. Therefore, required Urea = (Target Nitrogen / 0.46) = (60 / 0.46) ≈ 130.43 kg of Urea per hectare.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 7. HOTEL MANAGEMENT & HOSPITALITY (BHM)
  // --------------------------------------------------------------------------
  {
    id: 'stream-hospitality',
    name: 'Hospitality & Hotel Management',
    code: 'BHM',
    iconName: 'Utensils',
    description: 'Food & beverage operations, front office management, guest relationship management, and international hotel ERP systems.',
    industryPartners: ['Taj Hotels (IHCL)', 'Marriott International', 'ITC Hotels', 'The Oberoi Group', 'Hyatt'],
    qualifications: [
      {
        id: 'bhm-degree',
        name: 'BHM (Bachelor of Hotel Management)',
        level: 'Undergraduate',
        durationYears: 4,
        specializations: [
          {
            id: 'bhm-spec-operations',
            name: 'Front Office & Hotel Operations',
            code: 'BHM-FO',
            description: 'Property Management Systems (Opera PMS), guest relations, revenue management, and VIP concierge.',
            careers: [
              {
                id: 'career-hotel-ops',
                title: 'Hospitality Operations & Guest Experience Executive',
                sector: 'Hospitality, Tourism & Luxury Services',
                streamCode: 'BHM',
                workType: 'On-site',
                description: 'Manage front office check-in/out workflows in Opera PMS, oversee guest reservations, resolve complaints, and enforce 5-star brand service standards.',
                salaryRange: '₹3.6 - ₹5.8 LPA',
                marketDemand: 'High',
                minCgpa: 6.0,
                requiredSkills: [
                  {
                    skill: 'Hotel ERP & Property Management (Opera PMS)',
                    category: 'Tools & Software',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 40,
                    priority: 'High',
                    whyRequired: 'Room reservations, guest billing, room status assignment, night audits',
                    recommendedCourseTitle: 'Opera PMS Enterprise Front Office Mastery',
                    recommendedCourseId: 'crs-hos-01',
                    estimatedDuration: '35 Hours',
                  },
                  {
                    skill: 'Guest Relationship Management & Conflict Resolution',
                    category: 'Professional',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 55,
                    priority: 'High',
                    whyRequired: 'Service recovery, VIP handling, guest feedback indexing, empathetic problem solving',
                    recommendedCourseTitle: 'Luxury Hospitality Guest Relations & Service Recovery',
                    recommendedCourseId: 'crs-hos-02',
                    estimatedDuration: '25 Hours',
                  },
                  {
                    skill: 'Revenue Management & Dynamic Room Pricing',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 30,
                    priority: 'Medium',
                    whyRequired: 'RevPAR, ADR, Occupancy percentage calculation, OTA channel distribution',
                    recommendedCourseTitle: 'Hotel Yield & Revenue Optimization Essentials',
                    recommendedCourseId: 'crs-hos-03',
                    estimatedDuration: '30 Hours',
                  },
                ],
                courses: [
                  {
                    id: 'crs-hos-01',
                    title: 'Opera PMS Enterprise Front Office Mastery',
                    provider: 'Tourism & Hospitality Skill Council (THSC)',
                    duration: '35 Hours',
                    level: 'Advanced',
                    skills: ['Opera PMS', 'Check-in/Check-out', 'Billing', 'Night Audit'],
                    modulesCount: 7,
                    nsqfLevel: 5,
                    description: 'Comprehensive software training on Oracle Hospitality Opera PMS used by leading international hotels.',
                  },
                ],
                certifications: [
                  {
                    id: 'cert-hos-01',
                    title: 'Certified Front Office Executive (THSC)',
                    issuingOrg: 'Tourism & Hospitality Skill Council of India',
                    level: 'NSQF Level 5',
                    validityYears: 3,
                    skills: ['PMS Handling', 'Guest Protocol', 'Cashiering'],
                    examPattern: 'Practical Roleplay Simulation & Theory',
                  },
                ],
                projects: [
                  {
                    id: 'prj-hos-01',
                    title: 'High-Volume International Conference Front-Desk Arrival Plan',
                    description: 'Designed fast-track check-in protocols for 450 delegates across 3 partner hotels in Opera PMS, achieving under 90-second average check-in time.',
                    role: 'Assistant Guest Services Lead',
                    technologiesUsed: ['Opera PMS', 'Excel Logistics', 'VIP Protocol'],
                    outcome: 'Achieved 98.4% guest satisfaction score with zero room allocation errors.',
                    industryRelevance: 'Luxury hotel MICE (Meetings, Incentives, Conferences, Exhibitions) operations.',
                  },
                ],
                roadmap: [
                  {
                    phaseNumber: 1,
                    phaseTitle: 'Phase 1: Front Office Fundamentals & Guest Communication',
                    duration: 'Weeks 1 - 4',
                    skills: ['Check-in Etiquette', 'Standard Telephone Phrasing', 'Concierge Basics'],
                    deliverable: 'Standard operating procedure manual for arrival desk',
                    status: 'Completed',
                    progressPercentage: 100,
                  },
                  {
                    phaseNumber: 2,
                    phaseTitle: 'Phase 2: Opera PMS Room Management & Folio Billing',
                    duration: 'Weeks 5 - 10',
                    skills: ['Opera PMS', 'Guest Folios', 'Payment Gateways', 'Travel Agent Vouchers'],
                    deliverable: 'Simulated daily cashier shift closure and balance dossier',
                    status: 'In Progress',
                    progressPercentage: 65,
                  },
                  {
                    phaseNumber: 3,
                    phaseTitle: 'Phase 3: Service Recovery & VIP Concierge Protocols',
                    duration: 'Weeks 11 - 15',
                    skills: ['HEAT Framework (Hear, Empathize, Apologize, Take Action)', 'VIP Amenities'],
                    deliverable: 'Service recovery case analysis and action playbook',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                  {
                    phaseNumber: 4,
                    phaseTitle: 'Phase 4: Hotel RevPAR, ADR & Revenue Optimization',
                    duration: 'Weeks 16 - 20',
                    skills: ['RevPAR Formulas', 'Occupancy Trends', 'Channel Manager Management'],
                    deliverable: 'Monthly hotel revenue and yield optimization report',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                ],
                jobRoles: [
                  {
                    id: 'job-hos-01',
                    title: 'Management Trainee - Front Office Operations',
                    company: 'Taj Hotels (IHCL)',
                    location: 'Mumbai / Jaipur / Goa',
                    salaryRange: '₹4.0 - ₹5.5 LPA + Duty Meals & Stay',
                    type: 'Job',
                    sector: 'Luxury Hospitality & Hotels',
                    experienceRequired: '0 - 1 Year (BHM / Hotel Management)',
                    openings: 20,
                    minCgpa: 6.0,
                    requiredQualifications: ['BHM', 'B.Sc Hospitality & Hotel Administration'],
                    requiredBranches: ['Hotel Management', 'Hospitality Operations'],
                    requiredSkills: ['Opera PMS', 'Guest Relations', 'Fluent English & Regional Language'],
                    preferredCerts: ['Certified Front Office Executive (THSC)'],
                    description: 'Welcome and check in domestic and international guests, manage billing folios, and coordinate VIP amenities.',
                    postedDaysAgo: 1,
                  },
                ],
                interviewQuestions: [
                  {
                    question: 'Define RevPAR and explain the exact formula used to calculate it.',
                    category: 'Revenue Management',
                    modelAnswerSummary: 'RevPAR stands for Revenue Per Available Room. It measures room revenue performance regardless of whether rooms are sold or vacant. Formula 1: Total Room Revenue / Total Available Rooms. Formula 2: Average Daily Rate (ADR) * Occupancy Rate.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 8. LAW (LL.B / INTEGRATED LAW)
  // --------------------------------------------------------------------------
  {
    id: 'stream-law',
    name: 'Legal Studies & Corporate Law',
    code: 'LAW',
    iconName: 'Scale',
    description: 'Corporate contracts, regulatory compliance, intellectual property, due diligence, and legal research.',
    industryPartners: ['Shardul Amarchand Mangaldas', 'AZB & Partners', 'Trilegal', 'Khaitan & Co', 'Luthra and Luthra'],
    qualifications: [
      {
        id: 'law-llb',
        name: 'B.A. LL.B / B.Com LL.B (Integrated)',
        level: 'Undergraduate',
        durationYears: 5,
        specializations: [
          {
            id: 'law-spec-corporate',
            name: 'Corporate Law & Commercial Contracts',
            code: 'LAW-CORP',
            description: 'Commercial agreements, Companies Act compliance, due diligence, and intellectual property.',
            careers: [
              {
                id: 'career-legal-associate',
                title: 'Corporate Legal Associate',
                sector: 'Legal Services & Corporate In-House Counsel',
                streamCode: 'LAW',
                workType: 'Desk/Office',
                description: 'Draft and review commercial agreements (NDAs, MSAs, SOWs), conduct corporate due diligence, assist with MCA compliance filings, and research case precedents.',
                salaryRange: '₹5.5 - ₹9.5 LPA',
                marketDemand: 'High',
                minCgpa: 6.5,
                requiredSkills: [
                  {
                    skill: 'Commercial Contract Drafting & Vetting',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 45,
                    priority: 'High',
                    whyRequired: 'Indemnity, limitation of liability, termination clauses, dispute resolution',
                    recommendedCourseTitle: 'Masterclass in Commercial Contract Drafting & Negotiation',
                    recommendedCourseId: 'crs-law-01',
                    estimatedDuration: '40 Hours',
                  },
                  {
                    skill: 'Legal Research Databases (Manupatra / SCC Online)',
                    category: 'Tools & Software',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 55,
                    priority: 'High',
                    whyRequired: 'Supreme Court & High Court case law citations, judicial precedents',
                    recommendedCourseTitle: 'Advanced Electronic Legal Research & Case Law Citation',
                    recommendedCourseId: 'crs-law-02',
                    estimatedDuration: '25 Hours',
                  },
                  {
                    skill: 'Corporate Due Diligence & Companies Act Compliance',
                    category: 'Domain Competency',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 75,
                    defaultStudentPercentage: 35,
                    priority: 'High',
                    whyRequired: 'Shareholder agreements, board resolutions, MCA e-filings, statutory registers',
                    recommendedCourseTitle: 'Corporate Governance & Due Diligence under Companies Act 2013',
                    recommendedCourseId: 'crs-law-03',
                    estimatedDuration: '30 Hours',
                  },
                ],
                courses: [
                  {
                    id: 'crs-law-01',
                    title: 'Masterclass in Commercial Contract Drafting & Negotiation',
                    provider: 'National Law School Continuing Education / Bar Council Hub',
                    duration: '40 Hours',
                    level: 'Advanced',
                    skills: ['Contract Clauses', 'Boilerplate', 'Indemnity', 'Arbitration'],
                    modulesCount: 8,
                    nsqfLevel: 6,
                    description: 'Draft master service agreements, non-disclosure contracts, vendor covenants, and cross-border jurisdiction clauses.',
                  },
                ],
                certifications: [
                  {
                    id: 'cert-law-01',
                    title: 'Certified Corporate Contract Drafting Specialist',
                    issuingOrg: 'National Law Institute / Bar Council Continuing Education',
                    level: 'Professional',
                    validityYears: 3,
                    skills: ['Contract Drafting', 'Due Diligence', 'Dispute Clauses'],
                    examPattern: 'Contract Drafting Practical Assessment',
                  },
                ],
                projects: [
                  {
                    id: 'prj-law-01',
                    title: 'Vendor Master Service Agreement (MSA) & Data Privacy Due Diligence',
                    description: 'Drafted complete SaaS vendor agreement including Limitation of Liability, GDPR/DPDP Act compliance, and mutual indemnification.',
                    role: 'Legal Intern',
                    technologiesUsed: ['SCC Online', 'Manupatra', 'DPDP Act 2023 Guidelines'],
                    outcome: 'Formulated risk mitigation matrix adopted in corporate vendor procurement.',
                    industryRelevance: 'Corporate legal and in-house compliance counsel.',
                  },
                ],
                roadmap: [
                  {
                    phaseNumber: 1,
                    phaseTitle: 'Phase 1: Indian Contract Act Essentials & Legal Drafting Fundamentals',
                    duration: 'Weeks 1 - 4',
                    skills: ['Offer & Acceptance', 'Consideration', 'Basic NDAs', 'Representations & Warranties'],
                    deliverable: 'Standard bilateral non-disclosure agreement draft',
                    status: 'Completed',
                    progressPercentage: 100,
                  },
                  {
                    phaseNumber: 2,
                    phaseTitle: 'Phase 2: Advanced Commercial Contracts & Boilerplate Clauses',
                    duration: 'Weeks 5 - 10',
                    skills: ['Indemnity', 'Liquidated Damages', 'Arbitration Clauses', 'Force Majeure'],
                    deliverable: 'Complete Master Services Agreement with risk-mitigation riders',
                    status: 'In Progress',
                    progressPercentage: 65,
                  },
                  {
                    phaseNumber: 3,
                    phaseTitle: 'Phase 3: Companies Act 2013 & Corporate Secretarial Due Diligence',
                    duration: 'Weeks 11 - 15',
                    skills: ['Board Resolutions', 'MCA21 Portal', 'Share Transfer Rules'],
                    deliverable: 'Comprehensive corporate legal due diligence report',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                  {
                    phaseNumber: 4,
                    phaseTitle: 'Phase 4: Regulatory Compliance & Dispute Management',
                    duration: 'Weeks 16 - 20',
                    skills: ['Arbitration Act', 'DPDP Act 2023', 'Legal Notice Drafting'],
                    deliverable: 'Commercial arbitration dossier and statutory legal notice',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                ],
                jobRoles: [
                  {
                    id: 'job-law-01',
                    title: 'Junior Legal Associate (Corporate & Contracts)',
                    company: 'Trilegal India',
                    location: 'New Delhi / Mumbai / Bengaluru',
                    salaryRange: '₹6.5 - ₹9.0 LPA',
                    type: 'Job',
                    sector: 'Corporate Law Firm',
                    experienceRequired: '0 - 1 Year (LL.B Graduate)',
                    openings: 12,
                    minCgpa: 6.8,
                    requiredQualifications: ['LL.B', 'B.A. LL.B'],
                    requiredBranches: ['Law / Legal Studies'],
                    requiredSkills: ['Contract Drafting', 'Legal Research', 'SCC Online'],
                    preferredCerts: ['Certified Corporate Contract Drafting Specialist'],
                    description: 'Review commercial contracts, prepare due diligence checklists for M&A transactions, and draft legal memoranda.',
                    postedDaysAgo: 1,
                  },
                ],
                interviewQuestions: [
                  {
                    question: 'What is the legal difference between an "Indemnity" clause and a "Liquidated Damages" clause?',
                    category: 'Contract Law',
                    modelAnswerSummary: 'Indemnity (Section 124 of Indian Contract Act) is a promise to save another from loss caused by conduct of promisor or third party; it covers actual losses incurred and is not subject to duty to mitigate. Liquidated damages (Section 74) are a genuine pre-estimate of damages agreed in contract for a breach, subject to reasonable compensation determined by court.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 9. COMPUTER SCIENCE & IT (CSE / BCA / MCA)
  // --------------------------------------------------------------------------
  {
    id: 'stream-cse',
    name: 'Computer Science & Information Technology',
    code: 'CSE',
    iconName: 'Laptop',
    description: 'Full stack software development, cloud infrastructure, artificial intelligence, data engineering, and cybersecurity.',
    industryPartners: ['Google Cloud', 'Microsoft', 'AWS', 'Infosys', 'Wipro', 'Accenture'],
    qualifications: [
      {
        id: 'cse-btech',
        name: 'B.Tech / BCA (Computer Science & Engineering)',
        level: 'Undergraduate',
        durationYears: 4,
        specializations: [
          {
            id: 'cse-spec-fullstack',
            name: 'Full Stack Web & Cloud Development',
            code: 'CSE-FS',
            description: 'Modern frontend frameworks, serverless APIs, relational and NoSQL databases, and cloud hosting.',
            careers: [
              {
                id: 'career-fullstack-dev',
                title: 'Full Stack Web Developer',
                sector: 'IT-ITeS & Software',
                streamCode: 'CSE',
                workType: 'Desk/Office',
                description: 'Architect, code, and deploy modern responsive web applications with Next.js, Node.js, relational SQL databases, and containerized cloud services.',
                salaryRange: '₹5.5 - ₹9.0 LPA',
                marketDemand: 'Very High',
                minCgpa: 6.5,
                requiredSkills: [
                  {
                    skill: 'React.js & Next.js Framework',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 50,
                    priority: 'High',
                    whyRequired: 'Component architecture, server-side rendering, client state management',
                    recommendedCourseTitle: 'Full Stack Web Architecture & React/Next.js Masterclass',
                    recommendedCourseId: 'crs-001',
                    estimatedDuration: '45 Hours',
                  },
                  {
                    skill: 'SQL & Database Design (3NF Normalization)',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 65,
                    priority: 'High',
                    whyRequired: 'Relational data modeling, ACID transactions, indexing, complex JOIN queries',
                    recommendedCourseTitle: 'Enterprise Relational Database Design & Normalization',
                    recommendedCourseId: 'crs-002',
                    estimatedDuration: '30 Hours',
                  },
                  {
                    skill: 'RESTful API Architecture & Node.js',
                    category: 'Core Technical',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 80,
                    defaultStudentPercentage: 40,
                    priority: 'High',
                    whyRequired: 'Asynchronous event loops, JWT authentication, route handlers, error middleware',
                    recommendedCourseTitle: 'Backend Microservices & Scalable API Pipelines',
                    recommendedCourseId: 'crs-003',
                    estimatedDuration: '35 Hours',
                  },
                  {
                    skill: 'HTML5 & Responsive CSS3 / Tailwind',
                    category: 'Tools & Software',
                    requiredLevel: 'Advanced',
                    requiredPercentage: 85,
                    defaultStudentPercentage: 75,
                    priority: 'Medium',
                    whyRequired: 'Mobile-first design, accessibility (WCAG), CSS grid, flexbox layout',
                    recommendedCourseTitle: 'Modern Responsive Web Design & Semantic HTML5',
                    recommendedCourseId: 'crs-004',
                    estimatedDuration: '20 Hours',
                  },
                  {
                    skill: 'Docker & Cloud Deployment (AWS / GCP)',
                    category: 'Industry Standard',
                    requiredLevel: 'Intermediate',
                    requiredPercentage: 70,
                    defaultStudentPercentage: 25,
                    priority: 'Medium',
                    whyRequired: 'Containerization, environment isolation, CI/CD automated deployment',
                    recommendedCourseTitle: 'Cloud Deployment with Docker, CI/CD & AWS',
                    recommendedCourseId: 'crs-005',
                    estimatedDuration: '30 Hours',
                  },
                ],
                courses: [
                  {
                    id: 'crs-001',
                    title: 'Full Stack Web Architecture & React/Next.js Masterclass',
                    provider: 'National Skill Development Corporation (IT-ITeS)',
                    duration: '45 Hours',
                    level: 'Advanced',
                    skills: ['Next.js', 'React Hooks', 'TypeScript', 'Server Actions'],
                    modulesCount: 10,
                    nsqfLevel: 6,
                    description: 'Build enterprise-grade modern web applications with SSR, hydration, and state management.',
                  },
                  {
                    id: 'crs-002',
                    title: 'Enterprise Relational Database Design & Normalization',
                    provider: 'NASSCOM FutureSkills Prime',
                    duration: '30 Hours',
                    level: 'Advanced',
                    skills: ['PostgreSQL', 'SQL Optimization', '3NF Schema', 'Indexing'],
                    modulesCount: 7,
                    nsqfLevel: 5,
                    description: 'Deep dive into database normalization, execution plans, and transaction integrity.',
                  },
                ],
                certifications: [
                  {
                    id: 'cert-cse-01',
                    title: 'AWS Certified Cloud Practitioner',
                    issuingOrg: 'Amazon Web Services',
                    level: 'Global Industry',
                    validityYears: 3,
                    skills: ['Cloud Computing', 'IAM Security', 'S3 / EC2 Deployment'],
                    examPattern: 'Standardized Certification Exam',
                  },
                ],
                projects: [
                  {
                    id: 'prj-cse-01',
                    title: 'Enterprise Skill Tracking & Placement Intelligence Platform',
                    description: 'Developed a full stack portal with role-based access for learners, trainers, and authorities with dynamic competency mapping.',
                    role: 'Full Stack Engineer',
                    technologiesUsed: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
                    outcome: 'Processed real-time skill matching for 5,000+ candidates with 99.8% server uptime.',
                    industryRelevance: 'Enterprise SaaS and education technology systems.',
                  },
                ],
                roadmap: [
                  {
                    phaseNumber: 1,
                    phaseTitle: 'Phase 1: Semantic HTML5, CSS3 & Modern JavaScript ES6+',
                    duration: 'Weeks 1 - 4',
                    skills: ['JavaScript ES6+', 'Async/Await', 'CSS Flexbox & Grid', 'DOM'],
                    deliverable: 'Interactive responsive portfolio web application',
                    status: 'Completed',
                    progressPercentage: 100,
                  },
                  {
                    phaseNumber: 2,
                    phaseTitle: 'Phase 2: React.js Component Architecture & Next.js Routing',
                    duration: 'Weeks 5 - 10',
                    skills: ['React Hooks', 'Next.js App Router', 'Tailwind CSS', 'Zustand State'],
                    deliverable: 'Dynamic interactive dashboard application',
                    status: 'In Progress',
                    progressPercentage: 75,
                  },
                  {
                    phaseNumber: 3,
                    phaseTitle: 'Phase 3: Node.js REST APIs & SQL Database Normalization',
                    duration: 'Weeks 11 - 15',
                    skills: ['Node.js', 'Express', 'SQL 3NF', 'JWT Auth', 'Prisma ORM'],
                    deliverable: 'Authenticated REST API backend with relational schema',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                  {
                    phaseNumber: 4,
                    phaseTitle: 'Phase 4: Docker Containerization & Cloud Deployment',
                    duration: 'Weeks 16 - 20',
                    skills: ['Docker', 'AWS ECS / Vercel', 'CI/CD Pipelines', 'Performance Auditing'],
                    deliverable: 'Production-deployed full stack web application',
                    status: 'Upcoming',
                    progressPercentage: 0,
                  },
                ],
                jobRoles: [
                  {
                    id: 'job-cse-01',
                    title: 'Junior Full Stack Developer',
                    company: 'Cognizant Technology Solutions',
                    location: 'Bengaluru / Hyderabad / Chennai',
                    salaryRange: '₹5.5 - ₹7.5 LPA',
                    type: 'Job',
                    sector: 'IT-ITeS & Cloud Software',
                    experienceRequired: '0 - 1 Year',
                    openings: 50,
                    minCgpa: 6.5,
                    requiredQualifications: ['B.Tech', 'BCA', 'MCA'],
                    requiredBranches: ['Computer Science', 'Information Technology', 'Electronics'],
                    requiredSkills: ['React.js', 'SQL', 'Node.js', 'JavaScript'],
                    preferredCerts: ['AWS Certified Cloud Practitioner'],
                    description: 'Develop modern cloud web components, participate in agile sprint standups, and deploy REST APIs.',
                    postedDaysAgo: 1,
                  },
                ],
                interviewQuestions: [
                  {
                    question: 'Explain the Virtual DOM in React and how reconciliation diffing optimizes performance.',
                    category: 'Frontend Engineering',
                    modelAnswerSummary: 'The Virtual DOM is an in-memory lightweight JavaScript representation of real DOM elements. When state changes occur, React creates a new Virtual DOM tree, runs the heuristic O(n) diffing algorithm against the previous snapshot, computes minimal updates, and batches real DOM mutations.',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

// ============================================================================
// REGISTRY ACCESS & QUERY UTILITIES
// ============================================================================

export function getAllStreams(): StreamDef[] {
  return STREAMS_REGISTRY;
}

export function getStreamByCode(code: string): StreamDef | undefined {
  if (!code) return undefined;
  const q = code.toUpperCase().trim();
  return STREAMS_REGISTRY.find((s) => s.code.toUpperCase() === q || s.id.toUpperCase() === q);
}

export function getStreamById(id: string): StreamDef | undefined {
  if (!id) return undefined;
  return STREAMS_REGISTRY.find((s) => s.id === id);
}

export function getAllCareers(): CareerProfileDef[] {
  const list: CareerProfileDef[] = [];
  STREAMS_REGISTRY.forEach((s) => {
    s.qualifications.forEach((q) => {
      q.specializations.forEach((sp) => {
        sp.careers.forEach((c) => {
          list.push(c);
        });
      });
    });
  });
  return list;
}

export function getCareerById(careerId: string): CareerProfileDef | undefined {
  return getAllCareers().find((c) => c.id === careerId);
}

export function findCareerByTitle(title: string): CareerProfileDef | undefined {
  if (!title) return undefined;
  const q = title.toLowerCase().trim();
  const all = getAllCareers();
  return (
    all.find((c) => c.title.toLowerCase() === q) ||
    all.find((c) => c.title.toLowerCase().includes(q) || q.includes(c.title.toLowerCase()))
  );
}

// Automatically resolves the active CareerProfileDef for any student profile
export function resolveLearnerCareerContext(learner: {
  branch?: string;
  course?: string;
  qualification?: string;
  specialization?: string;
  targetRole?: string;
}): {
  stream: StreamDef;
  career: CareerProfileDef;
  isCustomStream: boolean;
} {
  const norm = (s?: string) => (s || '').toLowerCase().trim();
  const b = norm(learner.branch);
  const c = norm(learner.course);
  const q = norm(learner.qualification);
  const t = norm(learner.targetRole);
  const sp = norm(learner.specialization);

  // 1. Try matching by target role directly
  if (t) {
    const directCareer = findCareerByTitle(t);
    if (directCareer) {
      const stream = getStreamByCode(directCareer.streamCode);
      if (stream) return { stream, career: directCareer, isCustomStream: false };
    }
  }

  // 2. Try matching by stream/branch keywords
  for (const stream of STREAMS_REGISTRY) {
    const streamName = norm(stream.name);
    const streamCode = norm(stream.code);

    const isMatch =
      b.includes(streamCode) ||
      b.includes(streamName) ||
      c.includes(streamCode) ||
      c.includes(streamName) ||
      q.includes(streamCode) ||
      sp.includes(streamName);

    if (isMatch) {
      // Pick first specialization and first career in this stream
      const career = stream.qualifications[0]?.specializations[0]?.careers[0];
      if (career) {
        return { stream, career, isCustomStream: false };
      }
    }
  }

  // Specific domain checks
  if (b.includes('electron') || b.includes('ece') || b.includes('telecom') || b.includes('vlsi') || b.includes('embedded')) {
    const stream = getStreamByCode('ECE')!;
    return { stream, career: stream.qualifications[0].specializations[0].careers[0], isCustomStream: false };
  }
  if (b.includes('civil') || b.includes('construct') || b.includes('structural') || b.includes('survey')) {
    const stream = getStreamByCode('CIVIL')!;
    return { stream, career: stream.qualifications[0].specializations[0].careers[0], isCustomStream: false };
  }
  if (b.includes('com') || b.includes('account') || b.includes('finance') || b.includes('tax') || c.includes('b.com')) {
    const stream = getStreamByCode('BCOM')!;
    return { stream, career: stream.qualifications[0].specializations[0].careers[0], isCustomStream: false };
  }
  if (b.includes('mech') || b.includes('cad') || b.includes('cam') || b.includes('thermal') || b.includes('auto')) {
    const stream = getStreamByCode('MECH')!;
    return { stream, career: stream.qualifications[0].specializations[0].careers[0], isCustomStream: false };
  }
  if (b.includes('pharm') || b.includes('drug') || b.includes('medic') || b.includes('clinical')) {
    const stream = getStreamByCode('PHARMA')!;
    return { stream, career: stream.qualifications[0].specializations[0].careers[0], isCustomStream: false };
  }
  if (b.includes('agri') || b.includes('crop') || b.includes('soil') || b.includes('farm')) {
    const stream = getStreamByCode('AGRI')!;
    return { stream, career: stream.qualifications[0].specializations[0].careers[0], isCustomStream: false };
  }
  if (b.includes('hotel') || b.includes('hospital') || b.includes('bhm') || b.includes('culinary')) {
    const stream = getStreamByCode('BHM')!;
    return { stream, career: stream.qualifications[0].specializations[0].careers[0], isCustomStream: false };
  }
  if (b.includes('law') || b.includes('legal') || b.includes('llb') || b.includes('judic')) {
    const stream = getStreamByCode('LAW')!;
    return { stream, career: stream.qualifications[0].specializations[0].careers[0], isCustomStream: false };
  }

  // Fallback to CSE only if Computer/IT/Software is explicitly present or default
  const defaultStream = getStreamByCode('CSE') || STREAMS_REGISTRY[0];
  const defaultCareer = defaultStream.qualifications[0].specializations[0].careers[0];
  return { stream: defaultStream, career: defaultCareer, isCustomStream: false };
}

// ============================================================================
// MULTI-FACTOR CAREER MATCHING ENGINE
// ============================================================================

export interface MultiFactorScore {
  totalScore: number; // 0 - 100%
  status: 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Developing Match';
  factors: {
    educationMatch: { score: number; max: number; label: string; passed: boolean };
    branchMatch: { score: number; max: number; label: string; passed: boolean };
    skillMatch: { score: number; max: number; matchedCount: number; totalCount: number; label: string };
    experienceMatch: { score: number; max: number; label: string; passed: boolean };
    certificationMatch: { score: number; max: number; matchedCount: number; label: string; passed: boolean };
    interestMatch: { score: number; max: number; label: string; passed: boolean };
    jobMarketMatch: { score: number; max: number; label: string; passed: boolean };
  };
  explanations: {
    positive: string[];
    advisory: string[];
  };
  skillBreakdown: {
    skill: string;
    category: string;
    currentPercentage: number;
    requiredPercentage: number;
    gapPercentage: number;
    priority: 'High' | 'Medium' | 'Low';
    whyRequired: string;
    recommendedCourse: string;
    courseId: string;
    status: 'Mastered' | 'Medium Gap' | 'Critical Gap';
  }[];
}

export function calculateMultiFactorMatch(
  learner: {
    branch?: string;
    course?: string;
    qualification?: string;
    specialization?: string;
    targetRole?: string;
    skills?: { name: string; proficiency?: number; proficiencyLevel?: SkillProficiencyLevel }[];
    certifications?: { name?: string; title?: string; status?: string }[];
    projects?: { title?: string; technologiesUsed?: string[] }[];
    academicDetails?: { cgpa?: number };
  },
  career: CareerProfileDef
): MultiFactorScore {
  const norm = (s?: string) => (s || '').toLowerCase().trim();

  // 1. Education Match (Max: 15 pts)
  const lCourse = norm(learner.course || learner.qualification);
  let eduScore = 10;
  let eduPassed = true;
  if (lCourse.includes('b.tech') || lCourse.includes('b.e') || lCourse.includes('b.com') || lCourse.includes('b.pharm') || lCourse.includes('llb') || lCourse.includes('b.sc') || lCourse.includes('bhm')) {
    eduScore = 15;
  }
  const eduLabel = `Education qualification: ${learner.course || learner.qualification || 'Enrolled Graduate'}`;

  // 2. Branch Match (Max: 20 pts)
  const lBranch = norm(learner.branch);
  const streamCode = career.streamCode.toLowerCase();
  let branchScore = 8;
  let branchPassed = false;
  if (lBranch.includes(streamCode) || lBranch.includes(norm(career.sector))) {
    branchScore = 20;
    branchPassed = true;
  } else if (lBranch.length > 3) {
    const sDef = getStreamByCode(career.streamCode);
    if (sDef && (lBranch.includes(norm(sDef.code)) || norm(sDef.name).includes(lBranch))) {
      branchScore = 20;
      branchPassed = true;
    } else {
      branchScore = 12;
      branchPassed = true;
    }
  }
  const branchLabel = branchPassed
    ? `Branch match: ${learner.branch || career.streamCode} discipline`
    : `Branch alignment: ${learner.branch || 'Cross-disciplinary'}`;

  // 3. Skill Match (Max: 35 pts)
  const studentSkills = learner.skills || [];
  let totalSkillMatchScore = 0;
  let totalSkillPossible = 0;
  let matchedSkillCount = 0;

  const skillBreakdown = career.requiredSkills.map((req) => {
    const studentSkill = studentSkills.find((s) => {
      const sn = norm(s.name);
      const rn = norm(req.skill);
      return sn === rn || sn.includes(rn) || rn.includes(sn);
    });

    let currentPercentage = req.defaultStudentPercentage || 40;
    if (studentSkill) {
      if (studentSkill.proficiency !== undefined && studentSkill.proficiency > 0) {
        currentPercentage = studentSkill.proficiency;
      } else if (studentSkill.proficiencyLevel === 'Advanced') {
        currentPercentage = 90;
      } else if (studentSkill.proficiencyLevel === 'Intermediate') {
        currentPercentage = 75;
      } else if (studentSkill.proficiencyLevel === 'Beginner') {
        currentPercentage = 50;
      }
    }

    const gap = Math.max(0, req.requiredPercentage - currentPercentage);
    const weight = req.priority === 'High' ? 3 : req.priority === 'Medium' ? 2 : 1;
    totalSkillPossible += weight * req.requiredPercentage;
    totalSkillMatchScore += weight * Math.min(req.requiredPercentage, currentPercentage);

    let status: 'Mastered' | 'Medium Gap' | 'Critical Gap' = 'Medium Gap';
    if (gap === 0) {
      status = 'Mastered';
      matchedSkillCount++;
    } else if (gap > 35 && req.priority === 'High') {
      status = 'Critical Gap';
    }

    return {
      skill: req.skill,
      category: req.category,
      currentPercentage,
      requiredPercentage: req.requiredPercentage,
      gapPercentage: gap,
      priority: req.priority,
      whyRequired: req.whyRequired,
      recommendedCourse: req.recommendedCourseTitle,
      courseId: req.recommendedCourseId,
      status,
    };
  });

  const skillScore =
    totalSkillPossible > 0 ? Math.round((totalSkillMatchScore / totalSkillPossible) * 35) : 25;
  const skillLabel = `${matchedSkillCount} of ${career.requiredSkills.length} required competencies verified at target benchmark`;

  // 4. Experience Match (Max: 10 pts)
  const hasProjects = (learner.projects || []).length > 0;
  const expScore = hasProjects ? 9 : 5;
  const expPassed = hasProjects;
  const expLabel = hasProjects
    ? `Portfolio verified: ${learner.projects?.length} capstones / practical projects`
    : `6 months practical capstone/internship recommended`;

  // 5. Certification Match (Max: 10 pts)
  const studentCerts = learner.certifications || [];
  let certScore = 4;
  let certPassed = false;
  if (studentCerts.length > 0) {
    certScore = Math.min(10, 5 + studentCerts.length * 3);
    certPassed = true;
  }
  const certLabel = certPassed
    ? `${studentCerts.length} verified national / industry credential(s) in portfolio`
    : `1 key industry certification recommended for priority hiring`;

  // 6. Interest Match (Max: 5 pts)
  const interestScore = 5;
  const interestPassed = true;
  const interestLabel = `Role aligns with candidate target employment trajectory`;

  // 7. Job Market Match (Max: 5 pts)
  const marketScore = career.marketDemand === 'Very High' ? 5 : career.marketDemand === 'High' ? 4 : 3;
  const marketPassed = true;
  const marketLabel = `${career.marketDemand} hiring volume across public and private sector partners`;

  const total = Math.min(
    98,
    Math.max(25, eduScore + branchScore + skillScore + expScore + certScore + interestScore + marketScore)
  );

  let matchStatus: MultiFactorScore['status'] = 'Moderate Match';
  if (total >= 85) matchStatus = 'Strong Match';
  else if (total >= 70) matchStatus = 'Good Match';
  else if (total >= 50) matchStatus = 'Moderate Match';
  else matchStatus = 'Developing Match';

  // Build transparent explainability lists
  const positive: string[] = [];
  const advisory: string[] = [];

  positive.push(`Education match: Qualified for ${career.title}`);
  if (branchPassed) positive.push(`Branch match: Aligned with ${career.streamCode} discipline`);
  positive.push(
    `${matchedSkillCount}/${career.requiredSkills.length} required skills meet or exceed benchmark`
  );

  if (studentCerts.length > 0) {
    positive.push(`${studentCerts.length} relevant certifications verified in passport`);
  } else {
    advisory.push(`1 certification missing (${career.certifications[0]?.title || 'Professional Credential'})`);
  }

  if (!hasProjects) {
    advisory.push(`6 months relevant project / internship experience recommended`);
  } else {
    positive.push(`Capstones demonstrate applied industry competency`);
  }

  const criticalGaps = skillBreakdown.filter((s) => s.status === 'Critical Gap');
  if (criticalGaps.length > 0) {
    advisory.push(`High-priority skill gap: ${criticalGaps[0].skill} (${criticalGaps[0].gapPercentage}% gap)`);
  }

  return {
    totalScore: total,
    status: matchStatus,
    factors: {
      educationMatch: { score: eduScore, max: 15, label: eduLabel, passed: eduPassed },
      branchMatch: { score: branchScore, max: 20, label: branchLabel, passed: branchPassed },
      skillMatch: { score: skillScore, max: 35, matchedCount: matchedSkillCount, totalCount: career.requiredSkills.length, label: skillLabel },
      experienceMatch: { score: expScore, max: 10, label: expLabel, passed: expPassed },
      certificationMatch: { score: certScore, max: 10, matchedCount: studentCerts.length, label: certLabel, passed: certPassed },
      interestMatch: { score: interestScore, max: 5, label: interestLabel, passed: interestPassed },
      jobMarketMatch: { score: marketScore, max: 5, label: marketLabel, passed: marketPassed },
    },
    explanations: {
      positive,
      advisory,
    },
    skillBreakdown,
  };
}

// ============================================================================
// JOB CATEGORIZATION BUCKETS ENGINE
// ============================================================================

export interface CategorizedJobs {
  recommendedNow: CareerJobRoleDef[]; // Student currently meets most requirements
  closeMatch: CareerJobRoleDef[]; // Student needs additional skills or 1 cert
  futureOpportunities: CareerJobRoleDef[]; // Requires higher degree or more experience
}

export function categorizeJobsForLearner(
  learner: {
    branch?: string;
    course?: string;
    targetRole?: string;
    skills?: { name: string; proficiency?: number }[];
    academicDetails?: { cgpa?: number };
  },
  jobs: CareerJobRoleDef[]
): CategorizedJobs {
  const norm = (s?: string) => (s || '').toLowerCase().trim();
  const studentSkills = (learner.skills || []).map((s) => norm(s.name));
  const cgpa = learner.academicDetails?.cgpa || 7.0;

  const recommendedNow: CareerJobRoleDef[] = [];
  const closeMatch: CareerJobRoleDef[] = [];
  const futureOpportunities: CareerJobRoleDef[] = [];

  jobs.forEach((job) => {
    const reqSkills = job.requiredSkills.map(norm);
    const matchedCount = reqSkills.filter((rs) =>
      studentSkills.some((ss) => ss.includes(rs) || rs.includes(ss))
    ).length;
    const matchRatio = reqSkills.length > 0 ? matchedCount / reqSkills.length : 0.5;

    const requiresSeniorExp =
      job.experienceRequired.toLowerCase().includes('3+') ||
      job.experienceRequired.toLowerCase().includes('5+');

    if (requiresSeniorExp || (job.minCgpa && cgpa < job.minCgpa - 1.0)) {
      futureOpportunities.push(job);
    } else if (matchRatio >= 0.5 || job.type === 'Apprenticeship' || job.type === 'Internship') {
      recommendedNow.push(job);
    } else {
      closeMatch.push(job);
    }
  });

  return {
    recommendedNow,
    closeMatch,
    futureOpportunities,
  };
}

// ============================================================================
// AI CAREER DISCOVERY WIZARD ENGINE
// ============================================================================

export interface CareerDiscoveryInputs {
  educationLevel: string;
  branchOrField: string;
  interests: string[];
  strengths: string[];
  preferredWorkType: 'Field' | 'Desk/Office' | 'Lab' | 'Remote' | 'On-site';
  industryPreference: string;
}

export function runCareerDiscovery(inputs: CareerDiscoveryInputs): {
  topRecommendations: {
    career: CareerProfileDef;
    stream: StreamDef;
    discoveryScore: number;
    matchReason: string;
  }[];
} {
  const norm = (s?: string) => (s || '').toLowerCase().trim();
  const allCareers = getAllCareers();

  const scored = allCareers.map((career) => {
    let score = 50;
    const stream = getStreamByCode(career.streamCode)!;

    if (career.workType === inputs.preferredWorkType) {
      score += 20;
    }

    const bInput = norm(inputs.branchOrField);
    if (bInput && (norm(career.streamCode).includes(bInput) || norm(stream.name).includes(bInput))) {
      score += 25;
    }

    const ind = norm(inputs.industryPreference);
    if (ind && (norm(career.sector).includes(ind) || norm(stream.description).includes(ind))) {
      score += 15;
    }

    inputs.interests.forEach((interest) => {
      const iNorm = norm(interest);
      if (
        norm(career.description).includes(iNorm) ||
        career.requiredSkills.some((s) => norm(s.skill).includes(iNorm))
      ) {
        score += 8;
      }
    });

    inputs.strengths.forEach((strength) => {
      const sNorm = norm(strength);
      if (norm(career.description).includes(sNorm)) {
        score += 6;
      }
    });

    let matchReason = `Strong alignment with your preference for ${inputs.preferredWorkType} work in ${career.sector}.`;
    if (inputs.branchOrField) {
      matchReason = `Directly matches your ${inputs.branchOrField} educational background with high industry placement demand.`;
    }

    return {
      career,
      stream,
      discoveryScore: Math.min(99, score),
      matchReason,
    };
  });

  scored.sort((a, b) => b.discoveryScore - a.discoveryScore);
  return { topRecommendations: scored.slice(0, 3) };
}
