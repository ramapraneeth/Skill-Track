@echo off
echo ===================================================
echo Verifying SkillTrack System Health
echo ===================================================

cd ..\..\backend
call .venv\Scripts\activate
echo Running automated pytest suite...
python -m pytest -v
cd ..\frontend
echo Verifying frontend production build...
call npm run build
echo ===================================================
echo SkillTrack verification completed!
pause
