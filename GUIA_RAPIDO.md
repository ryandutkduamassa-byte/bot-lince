# ⚡ Guia Rápido - Bot Lince

## 1️⃣ Instalação em 2 Minutos

### Windows (CMD ou PowerShell)
```powershell
npm install
```

### Linux/Mac (Terminal)
```bash
npm install
```

## 2️⃣ Configurar `.env`

Abra o arquivo `.env` e preencha:

```
TOKEN=cole_seu_token_aqui
GUILD_ID=seu_guild_id
LOG_CHANNEL_ID=seu_log_channel_id
STAFF_ROLE_ID=seu_staff_role_id
```

### Como encontrar IDs?

**Ativar Modo de Desenvolvedor:**
1. Discord Settings → Advanced → Developer Mode (ON)

**Token do Bot:**
1. [Discord Developer Portal](https://discord.com/developers/applications)
2. New Application → Bot → Copy Token

**GUILD_ID (ID do servidor):**
- Clique direito na logo do servidor → Copy Server ID

**LOG_CHANNEL_ID (Canal de logs):**
- Clique direito no canal → Copy Channel ID

**STAFF_ROLE_ID (Cargo de staff):**
- Server Settings → Roles → Clique direito → Copy Role ID

## 3️⃣ Rodar o Bot

```bash
npm start
```

## 4️⃣ Testar no Discord

### Comando de Tickets
```
/ticket
```

### Cadastrar Produto
```
/produto nome:Nitro preco:50.00 descricao:2 meses de Nitro
```

### Ver Produtos
```
/painelvendas
```

### Aprovar Pagamento
```
/aprovar ticket_id:123456789
```

## ✅ Verificar se Tudo Funciona

Quando rodar o bot, você deve ver:

```
✅ Bot conectado como MeuBot#0000
📦 Carregando 4 comandos...
✅ Comando carregado: /ticket
✅ Comando carregado: /produto
✅ Comando carregado: /painelvendas
✅ Comando carregado: /aprovar
📦 Carregando 2 eventos...
✅ Evento carregado: ready
✅ Evento carregado: interactionCreate
```

## 🐛 Erros Comuns

| Erro | Solução |
|------|---------|
| "No token provided" | Verifique `.env` se TOKEN está preenchido |
| Slash commands não aparecem | Espere 1 minuto e recarregue o Discord |
| Bot offline | Token está errado ou expirou |
| Sem permissão para criar canais | Dar permissão de "Manage Channels" ao bot |

## 📁 Arquivos Importantes

```
bot-lince/
├── .env              ← CONFIGURE AQUI
├── config.json       ← Mensagens customizáveis
├── package.json      ← Dependências
├── src/
│   ├── index.js      ← Main do bot
│   ├── commands/     ← Seus comandos
│   ├── events/       ← Seus eventos
│   └── utils/        ← Funções úteis
└── data/
    └── products.json ← Banco de dados
```

## 🚀 Próximos Passos

1. ✅ Instalar dependências
2. ✅ Configurar `.env`
3. ✅ Rodar o bot
4. ✅ Testar comandos
5. ✅ Customizar no `config.json`
6. ✅ Adicionar mais comandos em `src/commands/`

## 💡 Dicas

- Use `npm run dev` para modo desenvolvimento com auto-reload
- Todos os produtos ficam salvos em `data/products.json`
- Transcripts são gerados automaticamente ao fechar ticket
- Você pode editar `config.json` para customizar mensagens

## ❓ Precisa de Ajuda?

Consulte o `README.md` para documentação completa!

---

**Agora teste o bot digitando `/ticket` no Discord! 🎉**
