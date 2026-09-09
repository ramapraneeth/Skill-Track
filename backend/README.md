# SkillTrack Backend Service

FastAPI-powered REST API and outcome intelligence engine for the SkillTrack platform.

## Architecture
- `app/api/routes/`: Domain endpoint controllers (`auth`, `learners`, `outcomes`, `skills`, `jobs`, `predictions`, `interventions`, `followups`, `analytics`, `impact`, `reports`).
- `app/api/dependencies/`: Reusable request dependencies (database session, authentication).
- `app/core/`: Application settings, security utilities (JWT, bcrypt), and database connection factories.
- `app/models/`: SQLAlchemy 2.0 relational schema definitions.
- `app/schemas/`: Pydantic v2 serialization and validation schemas.
- `app/services/`: Core business logic layers.
- `tests/`: Automated pytest test suites.

## Quickstart
```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
python -m app.seed
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## Running Tests
```bash
python -m pytest -v
```
