@echo off
echo ===================================================
echo Setting up SkillTrack Development Environment
echo ===================================================

cd ..\..
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env from example
)

cd backend
if not exist .venv (
    echo Creating Python virtual environment...
    python -m venv .venv
)
call .venv\Scripts\activate
pip install -r requirements.txt
echo Environment setup completed!
pause
