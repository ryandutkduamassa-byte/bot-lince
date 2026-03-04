@echo off
echo ========================================
echo    Bot Lince - Script de Inicializacao
echo ========================================
echo.

echo Verificando Node.js...
node -v >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERRO: Node.js nao está instalado!
    echo Faça download em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo OK - Node.js encontrado
echo.

echo Instalando dependências...
call npm install
if errorlevel 1 (
    echo.
    echo ERRO ao instalar dependências!
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo    Instalacao completa!
echo ========================================
echo.
echo Proximos passos:
echo 1. Abra o arquivo .env
echo 2. Cole seu TOKEN do bot
echo 3. Preencha GUILD_ID, LOG_CHANNEL_ID e STAFF_ROLE_ID
echo 4. Execute: npm start
echo.
echo Para mais informacoes, leia: GUIA_RAPIDO.md
echo.
pause
