# 🤖 Bot Lince - Sistema Completo de Tickets e Vendas

Um bot Discord completo e profissional desenvolvido em Node.js com discord.js v14, incluindo sistema avançado de tickets e gerenciamento de vendas.

## ✨ Funcionalidades

### 🎫 Sistema de Tickets
- ✅ Comando `/ticket` para enviar painel de tickets
- ✅ Botão "Abrir Ticket" para criar canais privados
- ✅ Canais automáticos com nome `ticket-usuario`
- ✅ Permissões customizadas (apenas usuário + staff)
- ✅ Mensagem inicial automática no ticket
- ✅ Botão "Fechar Ticket"
- ✅ Geração automática de transcript (TXT)
- ✅ Envio de transcript no canal de logs
- ✅ Exclusão automática após 5 segundos

### 🛍️ Sistema de Vendas
- ✅ Comando `/produto` para cadastrar produtos (nome, preço, descrição)
- ✅ Armazenamento em JSON
- ✅ Comando `/painelvendas` com botões dos produtos
- ✅ Criação automática de ticket ao clicar no produto
- ✅ Exibição de informações do produto
- ✅ Comando `/aprovar` para confirmação de pagamento
- ✅ Fechamento automático após aprovação

### ⚙️ Configuração
- ✅ Variáveis de ambiente (.env)
- ✅ Arquivo de configuração (config.json)
- ✅ Estrutura profissional de pastas
- ✅ Slash commands
- ✅ Intents necessárias configuradas
- ✅ Embeds bonitos e estilizados
- ✅ Botões interativos (ButtonBuilder)
- ✅ Código bem organizado e comentado

### 📊 Sistema de Logs
- ✅ Canal de logs configurável
- ✅ Registro de ações importantes
- ✅ Timestamps automáticos
- ✅ Embeds estilizadas

## 📁 Estrutura de Pastas

```
bot-lince/
├── src/
│   ├── commands/
│   │   ├── ticket.js          # Comando de criar painel de tickets
│   │   ├── produto.js         # Comando de cadastrar produtos
│   │   ├── painelvendas.js    # Comando de mostrar painel de vendas
│   │   └── aprovar.js         # Comando de aprovar pagamentos
│   ├── events/
│   │   ├── ready.js           # Evento de bot conectado
│   │   └── interactionCreate.js # Processamento de interações
│   ├── utils/
│   │   ├── productManager.js  # Gerenciador de produtos (JSON)
│   │   ├── transcriptManager.js # Gerador de transcripts
│   │   └── logger.js          # Sistema de logs
│   └── index.js               # Arquivo principal do bot
├── data/
│   └── products.json          # Banco de dados de produtos
├── config.json                # Arquivo de configuração
├── .env                       # Variáveis de ambiente
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Instalação

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 16.9.0 ou superior
- [Git](https://git-scm.com/) (opcional)
- Um bot criado no [Discord Developer Portal](https://discord.com/developers/applications)

### Passo 1: Clonar ou Baixar o Projeto

```bash
# Via Git
git clone <seu-repositorio>
cd bot-lince

# Ou extrair o arquivo ZIP manualmente
```

### Passo 2: Instalar Dependências

```bash
npm install
```

Isso instalará:
- `discord.js` v14 - API do Discord
- `dotenv` - Variáveis de ambiente

### Passo 3: Configurar Variáveis de Ambiente

1. **Obter o TOKEN do Bot:**
   - Acesse [Discord Developer Portal](https://discord.com/developers/applications)
   - Clique em "New Application"
   - Vá para a aba "Bot" e clique "Add Bot"
   - Clique em "Copy" para copiar o token

2. **Criar arquivo `.env`:**

   ```bash
   # Editar o arquivo .env com suas informações
   TOKEN=seu_token_do_bot_aqui

   # ID do seu servidor Discord
   GUILD_ID=seu_guild_id_aqui

   # ID do canal onde os logs serão enviados
   LOG_CHANNEL_ID=seu_log_channel_id_aqui

   # ID do cargo (role) de staff
   STAFF_ROLE_ID=seu_staff_role_id_aqui
   ```

### Passo 4: Configurar Permissões do Bot

1. No Discord Developer Portal, vá para "OAuth2" > "URL Generator"
2. Selecione os scopes:
   - ✅ `bot`
3. Selecione as permissões:
   - ✅ `Read Messages/View Channels`
   - ✅ `Send Messages`
   - ✅ `Create Private Channels`
   - ✅ `Manage Channels`
   - ✅ `Manage Messages`
   - ✅ `Embed Links`
   - ✅ `Read Message History`
   - ✅ `Mention @everyone`
4. Abra o link gerado no navegador para adicionar o bot ao seu servidor

### Passo 5: Obter IDs Necessários

**Como encontrar IDs no Discord:**

#### Obter GUILD_ID (ID do Servidor):
1. Clique com botão direito no nome do servidor
2. Selecione "Copiar ID do Servidor"

#### Obter LOG_CHANNEL_ID (Canal de Logs):
1. Clique com botão direito no canal
2. Selecione "Copiar ID do Canal"

#### Obter STAFF_ROLE_ID (Cargo de Staff):
1. Vá para configurações do servidor
2. Clique em "Funções"
3. Clique com botão direito no cargo
4. Selecione "Copiar ID"

## ▶️ Como Rodar o Bot

### Modo Normal
```bash
npm start
```

### Modo Desenvolvimento (com auto-reload)
```bash
npm run dev
```

Se tudo estiver configurado corretamente, você deve ver:
```
✅ Bot conectado como YourBot#0000
📦 Carregando 4 comandos...
✅ Comando carregado: /ticket
✅ Comando carregado: /produto
✅ Comando carregado: /painelvendas
✅ Comando carregado: /aprovar
📦 Carregando 2 eventos...
✅ Evento carregado: ready
✅ Evento carregado: interactionCreate
```

## 📋 Guia de Uso

### 1. Sistema de Tickets

#### Enviar Painel de Tickets
```
/ticket
```
Isso enviará um painel com um botão "Abrir Ticket"

#### Fluxo de um Ticket:
1. Usuário clica em "Abrir Ticket"
2. Um canal privado é criado (visível apenas para usuário e staff)
3. Mensagem de boas-vindas é enviada
4. Usuário descreve seu problema
5. Staff responde
6. Clica em "Fechar Ticket"
7. Transcript é gerado e enviado no canal de logs
8. Canal é deletado após 5 segundos

### 2. Sistema de Vendas

#### Cadastrar um Produto
```
/produto nome:Nome do Produto preco:99.99 descricao:Descrição do produto
```

**Exemplo:**
```
/produto nome:Nitro preco:50.00 descricao:Discord Nitro com 2 meses de boost
```

#### Mostrar Painel de Vendas
```
/painelvendas
```
Isso enviará todos os produtos com botões para compra

#### Fluxo de Compra:
1. Usuário clica em um produto
2. Um canal de venda privado é criado
3. Informações do produto são mostradas
4. Channel é criado para comunicação
5. Staff aprova o pagamento com `/aprovar`
6. Mensagem de confirmação é enviada
7. Ticket é fechado automaticamente

#### Aprovar Pagamento
```
/aprovar ticket_id:ID_DO_CANAL
```

**Exemplo:**
```
/aprovar ticket_id:1073857634892824576
```

## 🛠️ Customização

### Alterar Cores e Mensagens

Edite o arquivo `config.json`:

```json
{
  "bot": {
    "prefix": "!",
    "color": "#0099FF"
  },
  "messages": {
    "ticket_welcome": "Sua mensagem aqui",
    "payment_approved": "Sua mensagem aqui"
  }
}
```

### Adicionar Novos Comandos

1. Crie um arquivo em `src/commands/seu_comando.js`:

```javascript
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("seu_comando")
    .setDescription("Descrição do comando"),

  async execute(interaction, client) {
    await interaction.reply("Resposta aqui!");
  },
};
```

2. O arquivo será carregado automaticamente ao iniciar o bot

### Adicionar Novos Eventos

1. Crie um arquivo em `src/events/novo_evento.js`:

```javascript
export default {
  name: "nome_do_evento",
  once: false,

  async execute(client, ...args) {
    // Seu código aqui
  },
};
```

2. O arquivo será carregado automaticamente ao iniciar o bot

## 📊 Gerenciamento de Produtos

Os produtos são armazenados em `data/products.json`:

```json
[
  {
    "id": "1234567890",
    "name": "Nitro",
    "price": 50.00,
    "description": "Discord Nitro com 2 meses de boost",
    "createdBy": "123456789",
    "createdAt": "2024-03-04T10:30:00.000Z"
  }
]
```

## 🐛 Resolução de Problemas

### Bot não aparece offline/online
- Verifique se o token está correto
- Certifique-se de que o bot foi adicionado ao servidor
- Reinicie o bot

### Slash commands não aparecem
- Deixe 1 minuto para que o Discord sincronize
- Saia e entre novamente no servidor
- Tente em um servidor diferente

### Erro: "No token provided"
- Verifique se o arquivo `.env` foi criado
- Certifique-se de que `TOKEN=seu_token` está preenchido
- Não coloque aspas ao redor do token

### Erro: "Cannot find module 'discord.js'"
- Execute `npm install` novamente
- Verifique se há espaço em disco
- Tente deletar `node_modules` e `package-lock.json`, depois execute `npm install`

### Logs não aparecem no canal
- Verifique se o `LOG_CHANNEL_ID` está correto
- Certifique-se de que o bot tem permissão de enviar mensagens no canal
- Verifique se a variável de ambiente foi definida

## 📝 Arquivo de Logs

Os logs podem ser visualizados:
- **Console:** Diretamente no terminal onde o bot está rodando
- **Canal de Logs:** No Discord, no canal configurado

## 🔒 Segurança

- **Nunca compartilhe seu TOKEN** do bot
- Use `.env` para armazenar informações sensíveis
- Não faça commit do `.env` no repositório (está em `.gitignore`)
- Revoke o token se suspeitar que foi comprometido

## 📄 Licença

Este projeto é fornecido como está, sem garantias.

## 🤝 Contribuições

Para sugerir melhorias ou reportar bugs, abra uma issue ou envie um pull request.

## 📞 Suporte

Para dúvidas sobre Discord.js, consulte:
- [Documentação Discord.js](https://discord.js.org/)
- [Discord Developer Portal](https://discord.com/developers)

---

**Desenvolvido com ❤️ para gerenciar sua comunidade Discord**
