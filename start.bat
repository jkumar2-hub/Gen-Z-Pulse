@echo off
echo ===================================================
echo Starting Gen Z Pulse...
echo ===================================================
echo.
echo Installing dependencies (this may take a minute if running for the first time)...
call npm install
echo.
echo Starting development server...
echo Please open http://localhost:3000 in your browser if it does not open automatically.
call npm run dev
pause
