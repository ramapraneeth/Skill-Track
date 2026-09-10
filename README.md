# SkillTrack — Longitudinal Skilling Outcome Intelligence & Impact Measurement Platform

**Smart India Hackathon (SIH) Solution**  
*Track Skills. Measure Outcomes. Shape Careers.*

---

## 1. Executive Summary
Traditional skilling platforms measure activity metrics: candidates enrolled, training hours completed, and certificates issued. They lose visibility the moment training ends.

**SkillTrack** measures what happens after skilling:
- Verified wage employment, self-employment, and apprenticeships
- 30, 60, 90, 180, and 365-day longitudinal retention verifications with documentary proof
- Transparent mathematical skill gap diagnosis against live industry requisitions
- Explainable placement and attrition risk forecasts with ranked attribution factors
- Prescriptive upskilling interventions to arrest dropouts
- Real-time national and state-level policy analytics powered by live database aggregations

---

## 2. Architecture & Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) Full-Stack Monolith |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS with GovTech Indian Digital Service Design System |
| **Database** | Neon PostgreSQL (Serverless Cloud Database) |
| **ORM** | Prisma ORM v6 |
| **Validation** | Zod |
| **Security** | Bcrypt password hashing & Signed JWT access tokens |
| **Icons & Charts** | Lucide React, Recharts |

---

## 3. Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Ensure `.env` exists with your Neon PostgreSQL connection string:
```ini
DATABASE_URL="postgresql://[user]:[password]@[neon-hostname]/[dbname]?sslmode=require"
SECRET_KEY="skilltrack_longitudinal_super_secret_jwt_key_2024"
```

### 3. Generate Prisma Client
```bash
npx prisma generate
npx prisma validate
```

### 4. Build & Run
```bash
npm run build
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the platform.

---

## 4. Key Platform Routes

- `/` — Public Landing Page with 8 longitudinal value sections and 2-step Unified Login Modal.
- `/outcome-intelligence` — Executive Outcome Intelligence Cockpit.
- `/outcome-intelligence/outcomes` — Longitudinal Outcome Registry.
- `/outcome-intelligence/evidence` — Milestone Evidence & Retention Verification.
- `/outcome-intelligence/analytics` — National & State Analytics with Multi-Parameter Filter Engine.
- `/outcome-intelligence/insights` — Explainable Risk Attribution & Prescriptive Interventions.
- `/government/dashboard` — Policy Maker & Mission Director Cockpit.
- `/learner/dashboard` — Candidate Outcome & Competency Cockpit.
- `/provider/dashboard` — Training Provider Accreditation & Retention Portal.

---

## 5. Security & Data Integrity
- Passwords stored as Bcrypt hashes (never plaintext).
- Server-side role authorization (`learner`, `provider`, `government`).
- No client-side database exposure.
- All metrics computed live via SQL/Prisma aggregations against Neon PostgreSQL without fabricated data.
