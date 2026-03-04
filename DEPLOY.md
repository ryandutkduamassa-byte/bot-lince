# 🚀 Deploy do Bot Lince

Guia para fazer deploy em diferentes plataformas.

## 🔵 Opção 1: Railway (Recomendado)

Railway oferece **hospedagem gratuita** com até 5 GB de RAM.

### Passo 1: Preparar Repositório

```bash
git init
git add .
git commit -m "Initial commit"
```

Crie um repositório no GitHub e faça push:

```bash
git remote add origin https://github.com/seu-usuario/bot-lince.git
git branch -M main
git push -u origin main
```

### Passo 2: Conectar ao Railway

1. Acesse [railway.app](https://railway.app/)
2. Clique em "Start a New Project"
3. Selecione "Import from GitHub"
4. Autorize e selecione seu repositório

### Passo 3: Configurar Variáveis

1. No dashboard do Railway, vá para "Variables"
2. Adicione:
   - `TOKEN` = seu token do bot
   - `GUILD_ID` = seu guild id
   - `LOG_CHANNEL_ID` = seu log channel id
   - `STAFF_ROLE_ID` = seu staff role id

### Passo 4: Deploy

Railway fará deploy automaticamente quando você fazer push para main!

---

## 🟣 Opção 2: Heroku (Requer Cartão)

Heroku descontinuou free tier em novembro de 2022.

---

## 🟢 Opção 3: Repl.it

### Passo 1: Upload do Projeto

1. Acesse [replit.com](https://replit.com/)
2. Clique em "Create"
3. Selecione "Import from GitHub" ou faça upload manual

### Passo 2: Configurar .env

1. Crie um arquivo `.env` no Repl
2. Configure as variáveis de ambiente

### Passo 3: Instalar Dependências

```bash
npm install
```

### Passo 4: Executar

```bash
npm start
```

⚠️ **Nota:** Repl.it pode desativar se o Repl ficar inativo por muito tempo.

---

## 🟠 Opção 4: Servidor VPS (Melhor Performance)

### Providers Recomendados:
- [AWS](https://aws.amazon.com/)
- [DigitalOcean](https://www.digitalocean.com/)
- [Linode](https://www.linode.com/)
- [Contabo](https://contabo.com/)

### Passo 1: SSH no Servidor

```bash
ssh root@seu_ip
```

### Passo 2: Instalar Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Passo 3: Clonar Projeto

```bash
git clone https://github.com/seu-usuario/bot-lince.git
cd bot-lince
```

### Passo 4: Instalar Dependências

```bash
npm install
```

### Passo 5: Configurar PM2 (Executor Persistente)

```bash
npm install -g pm2

# Configurar arquivo ecosystem.config.js
pm2 start src/index.js --name "bot-lince"
pm2 save
pm2 startup
```

### Passo 6: Monitorar

```bash
pm2 monit
```

---

## 📊 Comparação de Plataformas

| Plataforma | Custo | Uptime | Facilidade |
|-----------|-------|--------|-----------|
| Railway | Free | 99.9% | ⭐⭐⭐⭐⭐ |
| Repl.it | Free | 60% | ⭐⭐⭐ |
| DigitalOcean | $4/mês | 99.99% | ⭐⭐⭐⭐ |
| AWS | Free tier | 99.99% | ⭐⭐⭐ |
| Começa em casa | $0 | Variável | ⭐⭐ |

**Recomendação:** Railway para começar (gratuito), DigitalOcean para produção (barato e confiável).

---

## 🔄 Atualizações Após Deploy

### Railway

1. Faça alterações localmente
2. Commit e push para GitHub
3. Railway faz deploy automaticamente

### VPS

```bash
cd bot-lince
git pull origin main
npm install # se houver novas dependências
pm2 restart bot-lince
```

---

## 🛡️ Segurança em Produção

✅ **Sempre:**
- Use variáveis de ambiente (NUNCA hardcode o token)
- Faça backup do `data/products.json`
- Monitore logs e erros
- Mantenha Node.js atualizado

❌ **Nunca:**
- Compartilhe seu `.env`
- Faça commit do `.env`
- Revele token publicamente
- Use servidor sem autenticação

---

## 📞 Troubleshooting Deploy

### Bot fica offline após deploy
- Verifique as variáveis de ambiente
- Veja os logs da plataforma
- Teste localmente antes de fazer deploy

### Arquivo products.json não persiste
- Use banco de dados (MongoDB Atlas é gratuito)
- Configure backup automático

### Muito uso de memória
- Reduza limite de mensagens em fetch
- Use um banco de dados ao invés de JSON

---

## 🎯 Próximos Passos

1. Escolha uma plataforma
2. Configure as variáveis
3. Faça deploy
4. Teste no Discord
5. Monitore os logs

**Seu bot está pronto para 24/7!** 🎉
