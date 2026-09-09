# SkillTrack: Next.js Full-Stack Architecture

## 1. Architectural Philosophy
SkillTrack is architected as a modular, full-stack **Next.js (App Router)** enterprise monolith. It removes unnecessary microservice overhead while strictly enforcing:
- Thin Next.js API Route Handlers
- Centralized Service Layer
- Independent Intelligence & Analytics Engines
- Parameterized Database Access via Prisma ORM
- Cloud PostgreSQL persistence via Neon

```
User Browser
   ↓
Next.js UI (Public Sans, GovTech Design System, Tailwind CSS)
   ↓
Next.js Route Handlers (`app/api/...`)
   ↓
Authentication (JWT) & Server-Side Role Authorization
   ↓
Zod Input & Parameter Validation
   ↓
Outcome Intelligence Service Layer (`lib/services/...`)
   ↓
Transparent Deterministic Intelligence Layer (`lib/intelligence/...`)
   ↓
Prisma Client (`lib/db/prisma.ts`)
   ↓
Neon PostgreSQL (Cloud Database)
   ↓
Standardized API Envelopes (`{ success: true, data: ... }`)
   ↓
UI Visualization (Cards, Funnels, Tables, Radars)
```

---

## 2. Directory Structure
- `app/`: Next.js App Router (Public landing, institutional cockpits, and API routes).
- `components/`:
  - `components/outcome-intelligence/`: Domain-specific outcome cards, tables, filters, and diagnostics.
  - `components/layout/`: GovTech header with Indian digital-service tricolor strip, sidebar, and footer.
  - `components/ui/`: Unified 2-step login modal, buttons, badges, inputs.
- `lib/`:
  - `lib/db/prisma.ts`: Prisma Client singleton.
  - `lib/services/`: Core business logic (`outcome-intelligence.service.ts`, `outcome.service.ts`, `evidence.service.ts`, `analytics.service.ts`, `auth.service.ts`).
  - `lib/intelligence/`: Transparent formulas (`scoring.ts`, `metrics.ts`, `insights.ts`, `trends.ts`).
  - `lib/validations/`: Zod validation schemas.
  - `lib/auth/`: JWT verification and role permission guards.
  - `lib/api/`: Standardized JSON envelopes and error handling.
- `types/`: Shared TypeScript domain definitions.
- `prisma/`: Introspected database schema (`schema.prisma`).
