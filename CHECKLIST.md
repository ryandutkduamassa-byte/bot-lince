# ✅ Checklist - Bot Pronto para Deploy

Use esta checklist para verificar se tudo está configurado corretamente antes de fazer deploy.

## 📋 Configuração Inicial

- [ ] Node.js instalado (versão 16.9.0+)
- [ ] Pasta `bot-lince` criada
- [ ] `npm install` executado com sucesso
- [ ] Arquivo `.env` criado na raiz

## 🤖 Conta Discord

- [ ] Aplicação criada em [Discord Developer Portal](https://discord.com/developers)
- [ ] Bot adicionado à aplicação
- [ ] Token copiado e colado em `.env`
- [ ] Intents ativadas no portal (Message Content Intent ativado)

## 📝 Variáveis de Ambiente (`.env`)

- [ ] `TOKEN` = seu token do bot
- [ ] `GUILD_ID` = ID do seu servidor
- [ ] `LOG_CHANNEL_ID` = ID do canal de logs
- [ ] `STAFF_ROLE_ID` = ID do cargo de staff
- [ ] Nenhuma informação sensível foi commitada

## 🔑 Permissões do Bot

Verifique no Discord:

- [ ] Bot tem permissão "Read Messages/View Channels"
- [ ] Bot tem permissão "Send Messages"
- [ ] Bot tem permissão "Create Private Channels"
- [ ] Bot tem permissão "Manage Channels"
- [ ] Bot tem permissão "Manage Roles" (para permissões)
- [ ] Bot tem permissão "Embed Links"
- [ ] Bot tem permissão "Read Message History"

## 📂 Estrutura de Arquivos

- [ ] Pasta `src/` existe
- [ ] Pasta `src/commands/` contém todos os 4 comandos
- [ ] Pasta `src/events/` contém `ready.js` e `interactionCreate.js`
- [ ] Pasta `src/utils/` contém 3 arquivos de utilidade
- [ ] Pasta `data/` existe com `products.json`
- [ ] Arquivo `config.json` existe

## 📋 Arquivos Obrigatórios

### Comandos
- [ ] `src/commands/ticket.js` (/ticket command)
- [ ] `src/commands/produto.js` (/produto command)
- [ ] `src/commands/painelvendas.js` (/painelvendas command)
- [ ] `src/commands/aprovar.js` (/aprovar command)

### Eventos
- [ ] `src/events/ready.js` (bot ready event)
- [ ] `src/events/interactionCreate.js` (interactions handler)

### Utilitários
- [ ] `src/utils/productManager.js` (JSON storage)
- [ ] `src/utils/transcriptManager.js` (transcript generator)
- [ ] `src/utils/logger.js` (logging system)

### Configuração
- [ ] `src/index.js` (main file)
- [ ] `package.json` (dependencies)
- [ ] `.env` (environment variables)
- [ ] `config.json` (customizable messages)
- [ ] `.gitignore`

## 🧪 Testes Locais

Execute `npm start` e verifique:

- [ ] Bot conecta sem erros
- [ ] Vê mensagem "✅ Bot conectado como [nome]#0000"
- [ ] 4 comandos carregados
- [ ] 2 eventos carregados
- [ ] Nenhum erro no console

## 🎮 Testes no Discord

Conecte o bot ao seu servidor e teste:

### Comando /ticket
- [ ] Comando aparece ao digitar `/ticket`
- [ ] Painel de tickets é enviado
- [ ] Botão "Abrir Ticket" funciona
- [ ] Canal privado é criado
- [ ] Apenas usuário + staff conseguem ver
- [ ] Mensagem de boas-vindas é enviada
- [ ] Botão "Fechar Ticket" funciona
- [ ] Transcript é gerado
- [ ] Transcript é enviado no canal de logs
- [ ] Canal é deletado após 5 segundos

### Comando /produto
- [ ] Apenas staff pode usar o comando
- [ ] Produto é cadastrado com sucesso
- [ ] Produto aparece em `data/products.json`

### Comando /painelvendas
- [ ] Painel é enviado com todos os produtos
- [ ] Cada produto tem um botão
- [ ] Clicar no produto cria ticket de venda
- [ ] Informações do produto aparecem no ticket

### Comando /aprovar
- [ ] Apenas staff pode usar
- [ ] Pagamento é aprovado
- [ ] Mensagem de confirmação é enviada
- [ ] Ticket pode ser fechado

### Logs
- [ ] Todas as ações aparecem no canal de logs
- [ ] Timestamps estão corretos

## 🐛 Testes de Erro

- [ ] Bot continua rodando após erro de comando
- [ ] Mensagens de erro são apropriadas
- [ ] Logs de erro aparecem no console

## 📊 Banco de Dados

- [ ] `data/products.json` contém produtos teste
- [ ] Produtos persistem após restart do bot
- [ ] Deletar produto funciona

## 🚀 Antes do Deploy

- [ ] Todos os testes acima passaram ✅
- [ ] `.env` não está em `.gitignore` ✅ (ou está?)
- [ ] Arquivo `.env` **NÃO** foi commitado
- [ ] Arquivo `.gitignore` contém `node_modules` e `.env`
- [ ] Token foi regenerado (se exposto)
- [ ] Mensagens estão apropriadas em `config.json`
- [ ] Cores estão agradáveis em `config.json`

## 📚 Documentação

- [ ] `README.md` está completo
- [ ] `GUIA_RAPIDO.md` está acessível
- [ ] `DEPLOY.md` está pronto para consulta
- [ ] `CUSTOMIZACAO.md` está pronto para referência

## 🏠 Deploy em Produção

Escolha a plataforma e verifique:

### Railway
- [ ] Repositório GitHub criado e publico
- [ ] Repositório conectado ao Railway
- [ ] Variáveis de ambiente configuradas no Railway
- [ ] Deploy automático ativado
- [ ] Bot funciona 24/7

### VPS (DigitalOcean, etc)
- [ ] Node.js instalado no servidor
- [ ] Projeto clonado
- [ ] Dependencies instaladas
- [ ] PM2 configurado para auto-start
- [ ] Firewall configurado
- [ ] SSL/HTTPS não é necessário (bot Discord)

### Repl.it
- [ ] Projeto importado ou enviado
- [ ] `.env` configurado
- [ ] Dependencies instaladas
- [ ] Bot rodando 24/7 (com limitações)

## 📞 Troubleshooting Final

Se algo não funciona:

- [ ] Verifique console do bot (erros?)
- [ ] Verifique canal de logs (ações foram registradas?)
- [ ] Teste localmente primeiro
- [ ] Verifique permissões do bot
- [ ] Verifique variáveis de ambiente
- [ ] Leia [Discord.js Docs](https://discord.js.org/)

## ✨ Pronto para Deploy!

Se marcou ✅ em TUDO acima, seu bot está pronto!

```
npm start
```

ou

```
npm run dev
```

**Parabéns! 🎉 Seu bot Discord está funcionando!**

---

**Data do Deploy:** _______________

**Plataforma:** _______________

**Anotações:** _______________________________________________

_______________________________________________
