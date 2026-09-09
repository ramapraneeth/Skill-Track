# SkillTrack Database Layer

This directory houses the PostgreSQL / Neon database schemas, Alembic migrations, and seed datasets for SkillTrack.

## Structure
- `migrations/`: Alembic database version migration scripts.
- `seeds/`: Initial demographic, skill, job, and longitudinal outcome seed scripts.
- `schema/`: DDL schemas, ER diagrams, and relational constraint definitions.
- `scripts/`: Operational database scripts (migration runners and seed loaders).

## Supported Database Targets
- **Production:** Neon Serverless PostgreSQL (`postgresql+psycopg://...sslmode=require`)
- **Local Development Fallback:** SQLite (`sqlite:///./skilltrack.db`) or local PostgreSQL

## Configuration
Set `DATABASE_URL` in your `.env` file:
```env
DATABASE_URL=postgresql://user:password@ep-sample-pool.neon.tech/neondb?sslmode=require
```
