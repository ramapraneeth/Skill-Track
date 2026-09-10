# SkillTrack: REST API Specification

All Next.js route handlers return standardized JSON envelopes:
```json
{
  "success": true,
  "data": { ... },
  "meta": { "timestamp": "2026-09-09T18:00:00.000Z" }
}
```

Errors follow:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input parameters",
    "details": { ... }
  },
  "meta": { "timestamp": "2026-09-09T18:00:00.000Z" }
}
```

---

## 1. Authentication Endpoints

### `POST /api/auth/login`
- **Description:** Authenticates user via bcrypt password comparison and issues signed JWT.
- **Body:**
  ```json
  {
    "email": "rahul.sharma@skilltrack.in",
    "password": "demo1234",
    "role": "learner"
  }
  ```
- **Response:** `200 OK` with user profile and JWT token.

### `GET /api/auth/me`
- **Description:** Returns profile of the authenticated session.
- **Header:** `Authorization: Bearer <token>`
- **Response:** `200 OK`

---

## 2. Outcome Intelligence Endpoints

### `GET /api/outcome-intelligence`
- **Description:** Executive overview with national KPIs, 5-stage funnel, and failure modes.
- **Query Params:** `state`, `district`, `programmeId`, `sector`, `schemeName`.

### `GET /api/outcome-intelligence/outcomes`
- **Description:** Lists verified employment, self-employment, and apprenticeship outcomes.
- **Query Params:** `learnerId`, `sector`, `state`.

### `POST /api/outcome-intelligence/outcomes`
- **Description:** Registers new verified placement.
- **Auth:** Requires `provider` or `government` role.

### `GET /api/outcome-intelligence/evidence`
- **Description:** Lists longitudinal follow-up surveys and retention statistics.
- **Query Params:** `learnerId`, `stats=true`.

### `POST /api/outcome-intelligence/evidence`
- **Description:** Records 30/60/90/180-day milestone verification.

### `GET /api/outcome-intelligence/analytics`
- **Description:** Dynamic SQL/Prisma aggregation with multi-parameter filter engine.

### `GET /api/outcome-intelligence/insights`
- **Description:** Explainable risk profiles with positive and risk attribution factors.

### `POST /api/outcome-intelligence/skill-gap`
- **Description:** Calculates mathematical competency vector match against job requisitions.
