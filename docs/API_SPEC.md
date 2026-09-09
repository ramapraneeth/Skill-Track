# SkillTrack: REST API Specification

Base URL: `/api/v1`

## Authentication (`/auth`)
- `POST /auth/login`: Authenticate candidate or administrator; returns Bearer JWT.
- `POST /auth/register`: Register new user.
- `GET /auth/me`: Fetch authenticated user profile.

## Candidates & Learners (`/learners`)
- `GET /learners`: List candidates with filters (`provider_id`, `state`, `status`, `risk_level`).
- `GET /learners/{id}`: Detailed candidate profile with acquired skills and active interventions.
- `GET /learners/{id}/timeline`: Longitudinal milestone trajectory (Registered $\rightarrow$ Certified $\rightarrow$ Placed $\rightarrow$ 90d Retention).
- `POST /learners`: Register candidate.
- `PATCH /learners/{id}`: Update candidate details or status.

## Outcomes & Verification (`/outcomes`)
- `GET /outcomes`: Consolidated placement records.
- `GET /outcomes/summary`: High-level outcome KPIs, salary distribution brackets, and verification percentages.
- `POST /outcomes/employment`: Log formal wage placement.
- `PATCH /outcomes/employment/{id}/verify`: Audit and verify employment documentary proof.
- `POST /outcomes/self-employment`: Log micro-enterprise creation and monthly revenue.
- `POST /outcomes/apprenticeship`: Log formal apprenticeship contract and stipend.

## Competencies & Gap Diagnosis (`/skills`)
- `GET /skills`: National skill registry with sector and market demand weights.
- `POST /skills/gap/calculate`: Direct deterministic skill gap calculation against custom requirements and market demand.
- `GET /skills/learners/{learner_id}/skill-gap`: Dynamic gap diagnosis comparing candidate against target job.

## Requisitions & Employer Demand (`/jobs`)
- `GET /jobs`: Employer vacancies and required competencies.
- `GET /jobs/demand`: Sectoral demand weights, vacancy volumes, and YoY growth rates.
- `GET /jobs/{id}`: Vacancy requisition details.

## Predictive Decision Support (`/predictions`)
- `GET /predictions/{learner_id}/placement`: Placement probability, risk tier, positive drivers, and risk factors.
- `GET /predictions/{learner_id}/attrition`: 90-day retention likelihood, friction indicators, and mitigation actions.

## Interventions (`/interventions`)
- `GET /interventions`: List active support interventions.
- `POST /interventions`: Prescribe targeted intervention (technical upskilling, mentorship, transport stipend).
- `PATCH /interventions/{id}`: Update intervention lifecycle status (`assigned` $\rightarrow$ `in_progress` $\rightarrow$ `completed`).

## Longitudinal Follow-ups (`/followups`)
- `GET /followups`: Retrieve milestone check-ins.
- `POST /followups`: Record 30-day, 60-day, or 90-day retention verification; automatically advances candidate milestone.

## Policy & Macro Analytics (`/analytics`)
- `GET /analytics/government`: National outcome KPIs, 7-stage drop-off funnel, failure modes, and state rankings.
- `GET /analytics/providers`: Training provider league table.
- `GET /analytics/skills`: Skill demand vs supply analytics.

## Causal Impact Measurement (`/impact`)
- `GET /impact`: Empirical before/after cohort evaluations, wage progression indices, and net placement uplift.
