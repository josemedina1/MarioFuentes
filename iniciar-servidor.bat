@echo off
REM Levanta el servidor local de Vite (npm run dev) en http://127.0.0.1:5190/
cd /d "%~dp0"
if not exist node_modules (
  echo Instalando dependencias...
  call npm install
)
call npm run dev
pause
