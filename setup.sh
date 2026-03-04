#!/bin/bash

echo "========================================"
echo "    Bot Lince - Script de Inicialização"
echo "========================================"
echo ""

# Verificar Node.js
echo "Verificando Node.js..."
if ! command -v node &> /dev/null; then
    echo ""
    echo "ERRO: Node.js não está instalado!"
    echo "Faça download em: https://nodejs.org/"
    echo ""
    exit 1
fi

echo "OK - Node.js encontrado"
echo ""

# Instalar dependências
echo "Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "ERRO ao instalar dependências!"
    echo ""
    exit 1
fi

echo ""
echo "========================================"
echo "    Instalação completa!"
echo "========================================"
echo ""
echo "Próximos passos:"
echo "1. Abra o arquivo .env"
echo "2. Cole seu TOKEN do bot"
echo "3. Preencha GUILD_ID, LOG_CHANNEL_ID e STAFF_ROLE_ID"
echo "4. Execute: npm start"
echo ""
echo "Para mais informações, leia: GUIA_RAPIDO.md"
echo ""
