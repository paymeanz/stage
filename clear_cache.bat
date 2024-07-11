@echo off
:loop
php artisan optimize:clear
timeout /t 20 >nul
goto loop
