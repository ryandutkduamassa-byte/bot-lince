# 🎉 COMECE AQUI - Bot Lince

Seu bot Discord completo está pronto! Siga estes 3 passos simples.

## ⏱️ Tempo Total: 5 minutos

---

## 1️⃣ Instalar (1 minuto)

Abra o terminal/CMD na pasta do bot e execute:

```bash
npm install
```

ou no Windows com setup automático:

```bash
setup.bat
```

**Esperado:** Vários pacotes sendo baixados... ✅ Pronto!

---

## 2️⃣ Configurar Bot (2 minutos)

### A. Obter Token do Bot

1. Acesse: https://discord.com/developers/applications
2. Crie "New Application"
3. Vá para "Bot" → "Add Bot"
4. Clique "Copy" ao lado do token

### B. Preencher `.env`

1. Abra o arquivo `.env` nesta pasta
2. Cole seu token:
   ```
   TOKEN=seu_token_aqui
   ```
3. Obtenha outros IDs (ativar Developer Mode no Discord):
   ```
   GUILD_ID=seu_servidor_id
   LOG_CHANNEL_ID=seu_canal_log_id
   STAFF_ROLE_ID=seu_cargo_staff_id
   ```

### C. Adicionar Bot ao Servidor

1. Vá para "OAuth2" → "URL Generator"
2. Selecione scopes: `bot`
3. Selecione permissões:
   - ✅ Read Messages
   - ✅ Send Messages
   - ✅ Create Private Channels
   - ✅ Manage Channels
   - ✅ Manage Roles
4. Abra o link gerado e autorize

---

## 3️⃣ Rodar Bot (2 minutos)

Execute no terminal:

```bash
npm start
```

**Esperado:** Você verá mensagens assim:
```
✅ Bot conectado como MeuBot#0000
📦 Carregando 4 comandos...
✅ Comando carregado: /ticket
✅ Comando carregado: /produto
✅ Comando carregado: /painelvendas
✅ Comando carregado: /aprovar
```

---

## ✅ Sucesso!

Vá no Discord e teste:

```
/ticket
```

Um painel deve aparecer com um botão "Abrir Ticket"! 🎉

---

## 🎯 O que Seu Bot Faz

### 🎫 Sistema de Tickets
- Enviar painel para abrir tickets
- Criar canais privados
- Gerar transcripts automaticamente
- Registrar tudo em logs

### 🛍️ Sistema de Vendas
- Cadastrar produtos
- Mostrar painel de loja
- Criar tickets de venda
- Aprovar pagamentos

---

## 📚 Documentação

**Leia em ordem:**

1. **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** - 2 minutos (agora!)
2. **[README.md](README.md)** - Completo
3. **[CUSTOMIZACAO.md](CUSTOMIZACAO.md)** - Se quiser mudar cores/mensagens
4. **[DEPLOY.md](DEPLOY.md)** - Quando quiser colocar online 24/7
5. **[CHECKLIST.md](CHECKLIST.md)** - Antes de fazer deploy

---

## 🚨 Dúvidas?

### Bot não conecta?
- Verifique se `.env` tem `TOKEN=`
- Certifique-se que o token está correto
- Regenere o token no Discord Developer Portal

### Comandos não aparecem?
- Verifique se bot está online
- Saia e entre no servidor novamente
- Aguarde 1 minuto para sincronização

### Erro ao criar ticket?
- Verifique permissões do bot (Manage Channels)
- Verifique se `LOG_CHANNEL_ID` e `STAFF_ROLE_ID` estão corretos

---

## 🎨 Quer Customizar?

### Mudar Tipo de Boas-vindas
Edite `config.json` → `messages.ticket_welcome`

### Mudar Cores
Edite `config.json` → `bot.color`

### Adicionar Novo Comando
Crie arquivo em `src/commands/seu_comando.js`

---

## 🚀 Próximas Etapas

Após testar localmente:

1. Teste todos os comandos
2. Customizando mensagens em `config.json`
3. Faça deploy (leia [DEPLOY.md](DEPLOY.md))
4. Seu bot roda 24/7!

---

## ⚡ Comandos Úteis

```bash
npm start                    # Rodar bot
npm run dev                  # Modo desenvolvimento (auto-reload)
npm install                  # Instalar dependências
```

---

## 📁 Arquivos Importantes

```
bot-lince/
├── .env                 ← Seu token vai aqui
├── config.json          ← Customizações
├── src/
│   ├── commands/        ← Seus comandos
│   ├── events/          ← Seus eventos
│   └── utils/           ← Funções auxiliares
└── data/
    └── products.json    ← Banco de dados
```

---

## ✨ Pronto?

```bash
npm install
npm start
```

Digite `/ticket` no Discord e veja seu bot funcionando! 🚀

---

**👉 Próximo: Leia [GUIA_RAPIDO.md](GUIA_RAPIDO.md) para mais detalhes**

---

*Bot Lince v1.0.0 - Desenvolvido para gerenciar sua comunidade Discord* ❤️
