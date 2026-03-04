# 📚 Índice Completo - Bot Lince

Bem-vindo ao seu bot Discord completo! Aqui está um guia de navegação para todos os arquivos e documentações.

## 🚀 Começar Aqui

| Arquivo | Descrição | Para Quem |
|---------|-----------|-----------|
| **[GUIA_RAPIDO.md](GUIA_RAPIDO.md)** | Instalação em 2 minutos | Iniciantes |
| **[README.md](README.md)** | Documentação completa | Todos |
| **[CHECKLIST.md](CHECKLIST.md)** | Verificar antes de deploy | Antes de publicar |

---

## 📁 Estrutura do Projeto

```
bot-lince/
├── src/                          # Código-fonte do bot
│   ├── index.js                  # Arquivo principal
│   ├── commands/                 # Comandos do bot
│   │   ├── ticket.js            # /ticket - Criar painel de tickets
│   │   ├── produto.js           # /produto - Cadastrar produto
│   │   ├── painelvendas.js      # /painelvendas - Mostrar loja
│   │   └── aprovar.js           # /aprovar - Aprovar pagamento
│   ├── events/                   # Eventos do bot
│   │   ├── ready.js             # Quando bot conecta
│   │   └── interactionCreate.js # Processa comandos/botões
│   └── utils/                    # Funções auxiliares
│       ├── productManager.js    # Gerencia produtos em JSON
│       ├── transcriptManager.js # Gera transcripts de tickets
│       └── logger.js            # Sistema de logs
├── data/
│   └── products.json            # Banco de dados de produtos
├── config.json                  # Configurações globais
├── .env                         # Variáveis de ambiente
├── package.json                 # Dependências
├── .gitignore                   # Arquivos ignorados no Git
└── Documentação/
    ├── README.md               # Documentação completa
    ├── GUIA_RAPIDO.md          # Guia rápido (2 min)
    ├── CHECKLIST.md            # Checklist pré-deploy
    ├── DEPLOY.md               # Como fazer deploy
    └── CUSTOMIZACAO.md         # Como customizar
```

---

## 📖 Documentação Disponível

### 1️⃣ [GUIA_RAPIDO.md](GUIA_RAPIDO.md) - ⭐ COMECE AQUI
Instalação rápida em poucos minutos:
- Instalação de dependências
- Configuração do `.env`
- Como rodar o bot
- Erros comuns

### 2️⃣ [README.md](README.md) - Documentação Completa
Tudo sobre o bot em detalhes:
- Funcionalidades completas
- Estrutura do projeto
- Guia de instalação passo a passo
- Como usar cada comando
- Troubleshooting

### 3️⃣ [CHECKLIST.md](CHECKLIST.md) - Antes de Deploy
Verificação final antes de publicar:
- Verificações de configuração
- Testes no Discord
- Testes de erro
- Preparação para deploy

### 4️⃣ [DEPLOY.md](DEPLOY.md) - Colocar Online
Opções de hospedagem:
- **Railway** (gratuito, recomendado)
- **Repl.it** (gratuito, limitado)
- **DigitalOcean** (barato, confiável)
- **VPS** (poderoso, complexo)
- Comparação de plataformas

### 5️⃣ [CUSTOMIZACAO.md](CUSTOMIZACAO.md) - Personalizar
Como modificar o bot:
- Alterar cores e mensagens
- Criar novos comandos
- Criar novos eventos
- Embeds customizadas
- Usar modals e autocomplete

---

## 🎯 Fluxos de Uso

### Caso 1: Quero Instalar Agora
1. Leia [GUIA_RAPIDO.md](GUIA_RAPIDO.md)
2. Execute `npm install`
3. Configure `.env`
4. Execute `npm start`
5. Teste com `/ticket`

### Caso 2: Preciso de Mais Detalhes
1. Leia [README.md](README.md) completo
2. Explore seção "Como Usar"
3. Teste cada comando
4. Customize em `config.json`

### Caso 3: Vou Fazer Deploy
1. Verifique [CHECKLIST.md](CHECKLIST.md)
2. Faça todos os testes
3. Escolha plataforma em [DEPLOY.md](DEPLOY.md)
4. Siga instruções de deploy
5. Monitore após publicar

### Caso 4: Quero Adicionar Features
1. Leia [CUSTOMIZACAO.md](CUSTOMIZACAO.md)
2. Crie novo arquivo em `src/commands/`
3. Ou crie novo evento em `src/events/`
4. Reinicie o bot

---

## 🛠️ Arquivos de Configuração

### `.env` - Variáveis Sensíveis
Contém informações que **NUNCA** devem ser públicas:
```bash
TOKEN=seu_token_secreto
GUILD_ID=id_do_servidor
LOG_CHANNEL_ID=id_do_canal_log
STAFF_ROLE_ID=id_do_cargo_staff
```
⚠️ **NUNCA faça commit deste arquivo!**

### `config.json` - Customizações
Mensagens, cores e configurações gerais:
```json
{
  "bot": { "color": "#0099FF" },
  "messages": { ... },
  "emojis": { ... }
}
```
✅ **PODE fazer commit deste arquivo**

### `package.json` - Dependências
Define as bibliotecas necessárias:
- discord.js v14
- dotenv

---

## 💻 Comandos Rápidos

### Instalação
```bash
npm install
```

### Executar
```bash
npm start              # Produção
npm run dev           # Desenvolvimento com auto-reload
```

### Scripts do Windows
```bash
setup.bat             # Setup automático (Windows)
```

### Scripts do Linux/Mac
```bash
setup.sh              # Setup automático (Linux/Mac)
```

---

## 📊 Sistema de Tickets

```
Usuário digita /ticket
         ↓
Painel é enviado com botão "Abrir Ticket"
         ↓
Usuário clica no botão
         ↓
Canal privado é criado (ticket-username)
         ↓
Mensagem de boas-vindas é enviada
         ↓
Uma staff responde
         ↓
Usuário clica "Fechar Ticket"
         ↓
Transcript é gerado
         ↓
Transcript é enviado no canal de logs
         ↓
Canal é deletado após 5 segundos
```

---

## 🛍️ Sistema de Vendas

```
Admin cadastra produtos com /produto
         ↓
Admin envia /painelvendas
         ↓
Painel é enviado com todos os produtos
         ↓
Cliente clica em um produto
         ↓
Ticket de venda privado é criado
         ↓
Informações do produto são mostradas
         ↓
Staff aprova pagamento com /aprovar
         ↓
Mensagem de confirmação é enviada
         ↓
Ticket é fechado automaticamente
```

---

## 🎨 Personalizações Rápidas

### Mudar Cor Padrão
Edite `config.json`:
```json
"bot": {
  "color": "#FF1493"  // Rosa
}
```

### Mudar Mensagem de Boas-vindas
Edite `config.json`:
```json
"messages": {
  "ticket_welcome": "Sua mensagem aqui!"
}
```

### Adicionar Novo Comando
Crie `src/commands/meucomando.js` e reinicie

### Mudar Emoji do Ticket
Edite `config.json`:
```json
"emojis": {
  "ticket": "🆕"
}
```

---

## 🐛 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Módulo não encontrado | `npm install` |
| Bot offline | Verifique `.env` |
| Slash commands não aparecem | Espere 1 minuto |
| Sem permissão para criar canais | Adicione permissão ao bot |
| Products.json não existe | Será criado automaticamente |

---

## 🚀 Próximos Passos

1. ✅ Instalar dependências
2. ✅ Configurar `.env`
3. ✅ Rodar bot localmente
4. ✅ Testar todos os comandos
5. ✅ Customizar mensagens
6. ✅ Fazer deploy
7. ✅ Monitorar em produção

---

## 📞 Recursos Úteis

| Recurso | Link |
|---------|------|
| Discord.js Documentação | https://discord.js.org/ |
| Discord Developer Portal | https://discord.com/developers |
| Node.js | https://nodejs.org/ |
| Railway (Deploy) | https://railway.app/ |
| Cores Hex | https://www.color-hex.com/ |
| Emojis Unicode | https://unicode.org/emoji/ |

---

## ✨ Versão

- **Bot Lince** v1.0.0
- **Discord.js** v14.14.0
- **Node.js** 16.9.0+

---

## 📝 Pronto para Começar?

### ⭐ COMECE AQUI: [GUIA_RAPIDO.md](GUIA_RAPIDO.md)

Se você já fez tudo:
```bash
npm start
```

**Seu bot está online! Use `/ticket` no Discord para testar.** 🎉

---

**Desenvolvido com ❤️ para sua comunidade Discord**
