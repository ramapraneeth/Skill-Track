@echo off
echo ===================================================
echo Starting SkillTrack (Backend + Frontend)...
echo ===================================================

start "SkillTrack Backend (FastAPI)" cmd /k "cd /d %~dp0..\backend && call .venv\Scripts\activate.bat && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

start "SkillTrack Frontend (Vite)" cmd /k "cd /d %~dp0..\frontend && npm run dev"

echo Both servers are launching in separate windows!
echo Backend: http://localhost:8000 (Swagger: http://localhost:8000/docs)
echo Frontend: http://localhost:5173
