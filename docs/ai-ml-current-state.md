# SkillTrack: AI/ML Current State & Architecture Gap Analysis
**Problem Statement:** 26135 — Longitudinal Skilling Outcomes & Impact Measurement System  
**Evaluation Phase:** Phase 0 — Inspection Only (Zero Code Modification)  
**Date:** September 10, 2026  
**Auditor:** Senior Full-Stack Engineer, Software Architect, Security Reviewer & ML Evaluator  

---

## 1. Current Backend Status

SkillTrack currently operates as a Next.js 15 (App Router) full-stack TypeScript monolith backed by Neon Serverless PostgreSQL and Prisma ORM v6.

### 1.1 Existing API Routes (`app/api/`)
The backend provides 10 active endpoints:
* **Authentication:**
  * `POST /api/auth/login`: Bcrypt password verification against the Neon `users` table; issues 24-hour signed JWTs with role metadata (`learner`, `provider`, `government`).
  * `GET /api/auth/me`: Validates the `Authorization: Bearer <token>` header and returns user session details.
* **Outcome Intelligence:**
  * `GET /api/outcome-intelligence`: Aggregates top-level longitudinal KPIs, 5-stage funnel, and dropout failure modes.
  * `GET /api/outcome-intelligence/outcomes`: Lists verified wage employment, self-employment, and apprenticeships with sector/state filters.
  * `POST /api/outcome-intelligence/outcomes`: Zod-validated endpoint (`createEmploymentOutcomeSchema`) requiring JWT authorization.
  * `GET /api/outcome-intelligence/evidence`: Lists milestone verification surveys (30d, 60d, 90d, 180d, 365d) and computes retention stats.
  * `POST /api/outcome-intelligence/evidence`: Zod-validated endpoint (`createFollowupSchema`) for logging audit milestone verifications.
  * `GET /api/outcome-intelligence/analytics`: Dynamic SQL/Prisma aggregations with multi-parameter filter engine (State, District, Scheme, Sector).
  * `GET /api/outcome-intelligence/indicators`: Returns scheme-level and training-provider-level indicators (placement rate, retention, compliance).
  * `GET /api/outcome-intelligence/insights`: Returns explainable risk forecasts with ranked positive and negative attribution drivers.
  * `GET / POST /api/outcome-intelligence/interventions`: Manages prescriptive remediation sprints (bridge workshops, counseling).
  * `GET / POST /api/outcome-intelligence/skill-gap`: Evaluates candidate skills against job vacancy requisitions using deterministic competency vector scoring.

### 1.2 Service Layer (`lib/services/`)
* `OutcomeService`: Manages employment, self-employment, and apprenticeship lifecycles and calculates wage averages.
* `AnalyticsService`: Live SQL aggregations over enrolled, certified, placed, and retained cohorts.
* `EvidenceService`: Longitudinal retention milestone surveys and status transitions.
* `IndicatorService`: Aggregates accreditation benchmarks and scheme delivery rates.
* `InsightService`: Retrieves risk prediction records and prescriptive interventions.
* `AuthService`: Bcrypt authentication and JWT session creation.

### 1.3 Deterministic Algorithms (`lib/intelligence/`)
* `scoring.ts`: Implements `evaluateSkillGap()`. Compares candidate proficiency (`basic`, `intermediate`, `advanced`) against job requirement importance weights (`mandatory`, `preferred`, `optional`). Produces transparent percentage match, gap tiers, and prioritized missing skills.
* `metrics.ts`: Deterministic retention, placement rate, and wage uplift formulas.
* `trends.ts`: Cohort tracking over 30d/60d/90d intervals.
* `insights.ts`: Attribution factor generation based on verified records.
* `recommendations.ts`: Rule-based intervention mapping.

---

## 2. Current Database Schema (Neon PostgreSQL via Prisma ORM)

The live database comprises 14 relational tables in `prisma/schema.prisma`:
1. `users`: Authentication identities (Bcrypt hashes, roles: `government`, `provider`, `learner`).
2. `training_providers`: Institute profiles, accreditation tier, compliance score, active learners count.
3. `programmes`: Vocational schemes (PMKVY 4.0, DDU-GKY, etc.), NSQF levels, certified counts, placed counts.
4. `learners`: Candidate longitudinal profiles (status: `enrolled`, `certified`, `seeking_job`, `placed`, `attrited`).
5. `skills`: Skill repository (name, sector, category, demand weight).
6. `learner_skills`: Many-to-many link between learners and skills with assessed score, proficiency level, and verification flag.
7. `jobs`: Employer vacancy requisitions (title, sector, salary range, required skills JSON).
8. `employment_outcomes`: Formal wage placements (employer name, salary, designation, EPFO verification status).
9. `self_employment_outcomes`: Micro-enterprise creation (revenue, sector, microfinance support).
10. `apprenticeship_outcomes`: Formal contracts (stipend, duration, contract number).
11. `followups`: Longitudinal milestone surveys (30, 60, 90, 180, 365 days; satisfaction score, attrition reason, retention status).
12. `predictions`: Forecast storage (probability, risk level, positive factors JSON, risk factors JSON, model version).
13. `interventions`: Prescriptive upskilling interventions, target dates, and status.
14. `impact_measurements`: Empirical cohort comparison (baseline vs. post placement/wage uplift).

---

## 3. Data Available for AI/ML

Following the user-instructed cleanup to eliminate mock and demo data, the current state in Neon PostgreSQL is:
* **Users:** 3 clean test accounts (`government@skilltrack.gov.in`, `provider@skilltrack.gov.in`, `learner@skilltrack.gov.in`).
* **Learners:** 1 test candidate record (`learner-test-01`), 0 historical skills, 0 outcomes.
* **Training Providers:** 1 test institution (`NSTI-DEL-01`).
* **Skills Inventory:** 0 records.
* **Jobs & Requisitions:** 1 baseline requisition (`job-baseline-1`).
* **Historical Placement Outcomes:** 0 records.
* **Historical Retention Followups:** 0 records.
* **Historical Predictions:** 0 records.
* **Historical Interventions:** 0 records.

### Critical Engineering Finding:
> [!CAUTION]
> **Insufficient data for reliable ML training.**  
> There are currently **zero historical labeled training samples** in the database. Per Rule 11 and Operating Principles, no machine learning model may be trained or deployed that produces fabricated predictions. The system must operate on transparent, deterministic mathematical rules, explicit scoring matrices, and honest data-sufficiency safeguards until real historical data accumulates.

---

## 4. Missing Data and Data-Quality Risks

1. **Missing `courses` and `course_skills` Tables in Database:**
   * The repository contains frontend pages for `/courses/intelligence`, `/courses/compare`, and `/student/courses`.
   * However, there is **no database table for courses or curriculum-skill relationships** in `prisma/schema.prisma`.
   * These pages currently bypass the database entirely and import in-memory objects from `lib/sidh-store.ts` and `lib/store/skillbridge-store.ts` using `localStorage`.
2. **Missing `job_applications` Table:**
   * No table exists to record a candidate's formal application to a job requisition or track interview outcomes.
3. **Missing `target_careers` / Learner Preferences:**
   * No database table tracks a candidate's preferred job role, target sector, or location preference.
4. **Disconnection between Frontend Sub-portals and Database:**
   * Pages under `/student/*` and `/trainer/*` read and write to `lib/store/skillbridge-store.ts` (in-memory `localStorage` mock store) instead of consuming `app/api/*` backed by Neon PostgreSQL.
5. **Absence of Provenance Metadata:**
   * There are no database fields to distinguish whether a metric is:
     * `OBSERVED` (audited salary slip, EPFO confirmation)
     * `DETERMINISTIC_CALCULATION` (mathematical vector match score)
     * `ML_PREDICTION` (statistical inference from trained weights)
     * `LLM_EXPLANATION` (bounded natural-language interpretation)

---

## 5. Files That May Be Safely Modified

These files are located in backend, database, service, and documentation layers:
* `prisma/schema.prisma` (Add missing domain tables: `courses`, `course_skills`, `job_applications`, `learner_preferences`)
* `lib/services/*` (Backend services: `skill-gap.service.ts`, `recommendation.service.ts`, `job-match.service.ts`, `analytics.service.ts`)
* `lib/intelligence/*` (Deterministic mathematical calculation engines)
* `lib/validations/*` (Zod validation schemas for request/response payloads)
* `app/api/*` (New Next.js route handlers under `/api/v2/` or extending `/api/outcome-intelligence/`)
* `docs/*` (Architecture specifications, audit reports, and API contracts)
* `scripts/*` (Seed scripts, data migration checks, and benchmark tools)
* `tests/*` (New automated unit and integration tests)
* `ml-service/*` (Optional separate Python FastAPI service, if justified)

---

## 6. Files That Must NOT Be Modified (Phase 0-8)

Per Operating Rule 3, no frontend pages, visual designs, layouts, or Tailwind styles may be altered without explicit later authorization:
* `app/(dashboard)/**/page.tsx`
* `app/(dashboard)/**/layout.tsx`
* `app/page.tsx`, `app/layout.tsx`
* `components/**`
* `app/globals.css`, `tailwind.config.ts`

---

## 7. Recommended Target Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│               Existing Frontend UI (Next.js 15 Client Pages)           │
│   (Student Cockpit, Trainer Portal, Government Dashboard, Outcome Hub) │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP Requests with JWT
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             TypeScript Backend API Gateway (Next.js 15 Monolith)        │
│                                                                        │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ 1. Security & RBAC Guard: JWT Session Verification & Role Checks │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
│                                     ▼                                  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ 2. Request Validation: Strict Zod Schemas (Input Minimization)   │  │
│  └──────────────────────────────────┬───────────────────────────────┘  │
│                                     ▼                                  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ 3. Deterministic Business Logic & Provenance Tagger              │  │
│  │    - Competency Vector Matching (scoring.ts)                     │  │
│  │    - Priority Calculation & Gap Remediation                      │  │
│  │    - Transparent Course & Job Ranking Formulas                   │  │
│  │    - Longitudinal Funnel & Attrition SQL Aggregations            │  │
│  │    - Insufficient-Data Detection Boundary                        │  │
│  └──────────────────┬───────────────────────────────┬───────────────┘  │
│                     │                               │                  │
│                     ▼                               ▼                  │
│  ┌────────────────────────────────────┐ ┌───────────────────────────┐  │
│  │ 4. Prisma ORM v6 Client Singleton  │ │ 5. Internal AI/ML Gateway │  │
│  └──────────────────┬─────────────────┘ └───────────┬───────────────┘  │
└─────────────────────┼───────────────────────────────┼──────────────────┘
                      │                               │
                      ▼                               ▼ (Sanitized Features Only)
       ┌──────────────────────────────┐ ┌────────────────────────────────┐
       │   Neon Serverless PostgreSQL │ │ Optional Python ML Microservice│
       │   - 14 Existing Tables       │ │ - Timeout-safe (< 2s)          │
       │   - Courses & Course-Skills  │ │ - Circuit breaker & Fallback   │
       │   - Job Applications         │ │ - Zero DB access               │
       │   - Provenance Metadata      │ └────────────────────────────────┘
       └──────────────────────────────┘               │
                                                      ▼ (Optional Bounded Text)
                                        ┌────────────────────────────────┐
                                        │ Bounded LLM Explainer (Gemini) │
                                        │ - Explains verified math only  │
                                        │ - Schema-validated output      │
                                        │ - No PII, rate-limited         │
                                        └────────────────────────────────┘
```

---

## 8. Requirement Gap Matrix

| Requirement | Expected Behavior | Current Implementation | Status | Missing / Broken / Risk Factor |
| :--- | :--- | :--- | :--- | :--- |
| **Deterministic Skill-Gap Scoring** | Mathematically match candidate competencies against job vacancy requirements | `evaluateSkillGap()` in `lib/intelligence/scoring.ts` | **COMPLETE** | Logic is deterministic and tested against Prisma. UI needs dynamic candidate linking. |
| **Course Recommendation Engine** | Rank courses that remediate prioritized candidate skill gaps | Frontend imports `INITIAL_COURSES` from `lib/store/skillbridge-store.ts` | **MOCKED** | No `courses` table in Neon. Must migrate course entities to Prisma and implement backend recommendation service. |
| **Transparent Job Matching** | Calculate vacancy fit score based on weighted required skills | `GET /api/outcome-intelligence/skill-gap` compares against first active job | **PARTIAL** | Only compares single active job. Needs multi-job ranking endpoint (`/api/learners/:id/recommendations/jobs`). |
| **Longitudinal Outcome Tracking** | Record and audit wage employment at 30, 60, 90, 180, and 365 days | `OutcomeService`, `employment_outcomes`, `followups` | **COMPLETE** | Database models and API exist in backend. |
| **National Policy Funnel Telemetry** | 5-stage funnel (Enrolled $\rightarrow$ Completed $\rightarrow$ Certified $\rightarrow$ Placed $\rightarrow$ Retained) | `AnalyticsService.getGovernmentAnalytics()` | **COMPLETE** | Live SQL aggregations against Neon DB with zero hardcoding. |
| **Predictive Risk Modeling (ML)** | Statistical placement and retention risk classification | `predictions` table in DB, but zero training data exists | **INSUFFICIENT DATA** | Per SIH Rule 11, cannot train fake models. Must return explicit data-insufficiency state. |
| **Explainable AI Insights** | Transparent positive and negative attribution drivers | Handled deterministically in `InsightService` | **PARTIAL** | Current drivers are stored in JSON. Needs dynamic explainability engine based on audited metrics. |
| **Course Intelligence Database** | Course registry with NSQF levels, duration, and associated skills | Frontend pages `/courses/intelligence` rely on `lib/sidh-store.ts` | **MOCKED** | Courses are not stored in Neon PostgreSQL. |
| **Role-Based Access Control (RBAC)** | Strict server-side route guards for student, trainer, and government | JWT issuance works; API route guards partial; page middleware missing | **PARTIAL** | Missing Next.js route protection middleware; GET endpoints are public. |
| **Data Provenance & Auditability** | Explicit distinction between observed, calculated, and predicted metrics | No provenance fields in database | **MISSING** | Responses must flag whether data is audited fact or calculated score. |

---

## 9. Proposed Implementation Phases

### Phase 1: Data and Contract Foundation
* Add missing Prisma schema entities:
  * `courses`: id, code, title, description, sector, nsqf_level, duration_hours, provider_id.
  * `course_skills`: course_id, skill_id, proficiency_gained.
  * `job_applications`: id, learner_id, job_id, match_score, status, applied_at.
  * `learner_preferences`: id, learner_id, target_role, preferred_sector, preferred_state.
* Add data provenance enum/field (`OBSERVED`, `CALCULATED`, `PREDICTED`, `EXPLAINED`).
* Generate Prisma client and validate schema.
* Define Zod validation schemas for all new API contracts.

### Phase 2: Deterministic Backend Services
* Implement `lib/services/skill-gap.service.ts`: Multi-job candidate competency vector matching.
* Implement `lib/services/course-recommendation.service.ts`: Deterministic course ranking formula based on prioritized skill deficits.
* Implement `lib/services/job-match.service.ts`: Transparent score breakdown (`matchedSkills`, `missingSkills`, `fitPercentage`).
* Implement `lib/services/data-sufficiency.service.ts`: Boundary detector returning `insufficient_data: true` when sample sizes are below statistical confidence thresholds.

### Phase 3: AI/ML Gateway & Security
* Create `lib/ai-gateway/`:
  * Authentication & role check decorator.
  * Timeout handler (default 2500ms).
  * Rate limiter and request sanitizer.
  * Fallback interceptor returning deterministic metrics if external services are unavailable.

### Phase 4: Data Audit & Validation for Real ML
* Create automated script `scripts/audit-ml-data-readiness.ts`.
* Audit row counts, label distribution, class balance, and missing attributes.
* Generate documented report on whether training an ML model is statistically sound or if deterministic rules must remain.

### Phase 5: Python ML Microservice (Only if Justified)
* If and only if labeled data thresholds are met, create `ml-service/` with FastAPI, Scikit-Learn, and XGBoost.
* Otherwise, keep deterministic scoring and document the rationale.

### Phase 6: Optional LLM Explanation Service
* Integrate Gemini API strictly through the backend gateway.
* Workflow: Neon DB $\rightarrow$ Backend calculation $\rightarrow$ Sanitized context $\rightarrow$ LLM prompt $\rightarrow$ Zod schema validation $\rightarrow$ Client.
* Purely for natural language explanations of verified metrics. Zero hallucinated statistics.

### Phase 7: Minimal API Surface
* `GET /api/learners/:learnerId/skill-gaps`
* `GET /api/learners/:learnerId/recommendations/courses`
* `GET /api/learners/:learnerId/recommendations/jobs`
* `GET /api/analytics/skill-demand`
* `GET /api/analytics/insights/:entityId`

### Phase 8: Automated Testing Suite
* Unit tests for deterministic algorithms.
* Integration tests for API route handlers and Zod validation.
* Data-sufficiency and fallback behavior tests.
* Full build verification (`npm run build`).

### Phase 9: Limited Frontend Integration (Authorized Only)
* Connect existing empty state and loading state components to new verified endpoints.
* Never display fabricated AI or mock values.

### Phase 10: Final Audit & Demonstration Script
* Compile `docs/ai-ml-final-audit.md`.
* Deliver an honest, technically rigorous SIH demonstration walkthrough.
