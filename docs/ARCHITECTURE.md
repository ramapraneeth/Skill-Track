# SkillTrack: System Architecture

SkillTrack is architected as a clean **Modular Monolith** designed for statutory reliability, high throughput, and institutional trust.

```mermaid
graph TD
    subgraph Frontend [Client Layer - React 19 + Vite]
        A[Public Landing Page /] --> B[Unified Login Modal]
        B --> C1[Learner Portal]
        B --> C2[Provider Portal]
        B --> C3[Government Cockpit]
        C1 & C2 & C3 --> D[TanStack Query State Layer]
    end

    subgraph Backend [Application Layer - FastAPI Modular Monolith]
        D --> E[REST API Router]
        E --> F1[Auth & Security Service]
        E --> F2[Learner & Outcome Service]
        E --> F3[Follow-up & Retention Service]
        E --> F4[Analytics & Impact Service]
    end

    subgraph Intelligence [ML & Decision Support Layer]
        E --> G1[Deterministic Skill Gap Engine]
        E --> G2[Explainable Placement Engine]
        E --> G3[90-Day Attrition Predictor]
        E --> G4[Prescriptive Intervention Engine]
    end

    subgraph Persistence [Database Layer - PostgreSQL / Neon]
        F1 & F2 & F3 & F4 --> H[(Neon PostgreSQL 16+)]
        H --> I[Alembic Migrations]
    end
```

## Architectural Responsibilities
- **Frontend (`frontend/`):** React 19 + TypeScript + Tailwind CSS v4. Delivers role-based user interfaces, interactive charts (Recharts), client-side cache management (TanStack Query), and strict GovTech styling.
- **Backend (`backend/`):** FastAPI + SQLAlchemy 2.0 + Pydantic v2. Provides REST API routing, JWT role-based access control, data validation, outcome lifecycle processing, and audit trails.
- **Database (`database/`):** Neon PostgreSQL (or SQLite local fallback). Enforces relational constraints (`chk_learner_age`, `chk_emp_salary`, `uq_learner_skill`, `uq_learner_milestone`), B-tree indexes, and longitudinal event tables.
- **ML & Decision Support (`ml/`):** Provides explainable predictive modeling and deterministic mathematical skill matching without opaque black-boxes.
- **Documentation (`docs/`):** Specifications, architecture blueprints, API definitions, and demo flows.
