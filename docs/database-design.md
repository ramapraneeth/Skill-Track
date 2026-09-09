# SkillTrack: Database Design & Neon PostgreSQL Schema

## 1. Database Target
- **Database Engine:** PostgreSQL 16 (Neon Serverless Cloud)
- **ORM:** Prisma ORM v6
- **Driver:** `@prisma/client` with pooled connection string

---

## 2. Relational Models (14 Core Tables)

1. **`users`**: Authentication credentials, bcrypt password hashes, full names, and roles (`learner`, `provider`, `government`).
2. **`training_providers`**: Accredited vocational institutions, states, districts, accreditation tier, and placement benchmarks.
3. **`programmes`**: Schemes (PMKVY 4.0, DDU-GKY, PM-Vishwakarma), sectors, duration, and enrollment statistics.
4. **`learners`**: Candidate records, demographics, current status, salary, and predictive risk tier.
5. **`skills`**: Master taxonomy of technical, soft, and digital tool competencies with market demand weights.
6. **`learner_skills`**: Competency records mapping learners to acquired skills with assessed scores.
7. **`jobs`**: Industry job vacancies with required competency vectors and salary brackets.
8. **`employment_outcomes`**: Verified wage placements with employer names, designations, and start dates.
9. **`self_employment_outcomes`**: Micro-enterprise ventures and monthly revenue.
10. **`apprenticeship_outcomes`**: Formal registered apprenticeships, contracts, and monthly stipends.
11. **`followups`**: Longitudinal surveys at 30-day, 60-day, 90-day, 180-day, and 365-day milestones with retention status and satisfaction scores.
12. **`predictions`**: Explainable machine forecasts with ranked positive and risk attribution factors.
13. **`interventions`**: Prescriptive remediation assignments (upskilling, counseling, relocations).
14. **`impact_measurements`**: Macro-economic evaluations comparing baseline vs. post-training metrics.

---

## 3. Data Integrity & Constraints
- Foreign keys with referential integrity.
- Unique constraints on candidate codes, provider codes, and `(learner_id, milestone)` pairs.
- Indexes on `(state, district)`, `(sector)`, `(status, risk_level)` for sub-millisecond query latency.
