@echo off
echo ===================================================
echo Seeding SkillTrack Database (30+ Learners, Providers, Outcomes)...
echo ===================================================
cd /d "%~dp0..\backend"
call .venv\Scripts\activate.bat
python -m app.seed
pause
