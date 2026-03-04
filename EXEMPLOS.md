# 📋 Exemplos Práticos - Bot Lince

Exemplos reais de como usar cada comando do bot.

---

## 🎫 Sistema de Tickets

### 1. Enviar Painel de Tickets

**Comando:**
```
/ticket
```

**Resultado:**
Um painel é enviado com o seguinte conteúdo:

```
┌─────────────────────────────────────┐
│ 🎫 Sistema de Tickets               │
│                                     │
│ Clique no botão abaixo para abrir  │
│ um ticket e entrar em contato com  │
│ a staff!                            │
│                                     │
│ [🎫 Abrir Ticket]                  │
└─────────────────────────────────────┘
```

---

### 2. Usuário Abre um Ticket

**Ação:** Clicar em "🎫 Abrir Ticket"

**Resultado Automático:**
- ✅ Canal privado criado: `#ticket-username`
- ✅ Mensagem de boas-vindas enviada
- ✅ Botão "Fechar Ticket" adicionado
- ✅ Apenas usuário + staff conseguem ver
- ✅ Log no canal de logs

**Exemplo do Canal Criado:**
```
┌─────────────────────────────────────┐
│ 🎫 Novo Ticket Criado              │
│                                     │
│ Bem-vindo ao seu ticket! Descreva  │
│ seu problema ou necessidade abaixo  │
│ e aguarde uma resposta da staff.    │
│                                     │
│ 👤 Usuário: @Username              │
│ ⏰ Horário: 04/03/2024 14:30       │
│                                     │
│ [🔒 Fechar Ticket]                 │
└─────────────────────────────────────┘
```

---

### 3. Fechar Ticket

**Ação:** Clicar em "🔒 Fechar Ticket"

**Resultado Automático:**
1. ✅ Transcript do chat é gerado
2. ✅ Enviado no canal de logs com formato:

```
┌─────────────────────────────────────┐
│ 📋 Transcript de Ticket             │
│                                     │
│ Ticket: ticket-username             │
│ 📝 [primeiras 1024 caracteres]      │
│ 👤 Usuário: @Username              │
│ ⏰ 04/03/2024 14:35                 │
└─────────────────────────────────────┘
```

3. ✅ Mensagem "🔒 Ticket será fechado em 5 segundos..."
4. ✅ Canal deletado automaticamente

---

## 🛍️ Sistema de Vendas

### 1. Cadastrar Produtos

**Comando (Staff apenas):**
```
/produto nome:Discord Nitro preco:50.00 descricao:2 meses de Nitro com server boost
```

**Resultado:**
```
✅ Produto Discord Nitro cadastrado com sucesso!
💰 Preço: R$ 50.00
```

**Produto Salvo em `data/products.json`:**
```json
{
  "id": "1234567890",
  "name": "Discord Nitro",
  "price": 50.00,
  "description": "2 meses de Nitro com server boost",
  "createdBy": "123456789",
  "createdAt": "2024-03-04T14:00:00.000Z"
}
```

---

### 2. Exemplos de Produtos Cadastrados

```
/produto nome:Bot Premium preco:29.90 descricao:Acesso premium por 30 dias
```

```
/produto nome:Consultoria preco:99.90 descricao:1 hora de consultoria personalizada
```

```
/produto nome:Custom Bot preco:199.90 descricao:Bot customizado para seu servidor
```

---

### 3. Mostrar Painel de Vendas

**Comando:**
```
/painelvendas
```

**Resultado:**
Um painel é enviado mostrando todos os produtos:

```
┌─────────────────────────────────────┐
│ 🛍️ Loja - Produtos Disponíveis      │
│                                     │
│ Clique em um produto para abrir um  │
│ ticket de compra                    │
│                                     │
│ [🛍️ Discord Nitro - R$ 50.00]     │
│ [🛍️ Bot Premium - R$ 29.90]       │
│ [🛍️ Consultoria - R$ 99.90]       │
│ [🛍️ Custom Bot - R$ 199.90]       │
│                                     │
│ Discord Nitro                       │
│ 💰 R$ 50.00                         │
│ 2 meses de Nitro com server boost   │
│                                     │
│ Bot Premium                         │
│ 💰 R$ 29.90                         │
│ Acesso premium por 30 dias          │
│                                     │
│ [...mais produtos]                  │
└─────────────────────────────────────┘
```

---

### 4. Cliente Compra um Produto

**Ação:** Cliente clica em um produto, ex: "🛍️ Discord Nitro - R$ 50.00"

**Resultado Automático:**
- ✅ Canal privado criado: `venda-username-timestamp`
- ✅ Informações do produto mostradas

**Canal de Venda:**
```
┌─────────────────────────────────────┐
│ 🛍️ Detalhes do Produto             │
│                                     │
│ Descrição: 2 meses de Nitro com    │
│ server boost                        │
│                                     │
│ 📦 Produto: Discord Nitro          │
│ 💰 Valor: R$ 50.00                 │
│ 👤 Comprador: @Username            │
│ 📊 Status: ⏳ Aguardando            │
│    confirmação de pagamento         │
│                                     │
│ @Staff: Um novo cliente deseja     │
│ comprar: Discord Nitro              │
│ 💰 R$ 50.00                         │
│ 👤 Cliente: @Username              │
└─────────────────────────────────────┘
```

**Resultado no Discord:**
```
✅ Ticket de venda criado! #venda-username-xxx
💰 Valor: R$ 50.00

Aguarde a staff confirmar o pagamento.
```

---

### 5. Staff Aprova Pagamento

**Comando (Staff apenas):**
```
/aprovar ticket_id:1073857634892824576
```

> **Dica:** Você pode copiar o ID clicando com botão direito no canal

**Resultado:**
```
✅ Pagamento aprovado! Ticket #venda-username-xxx foi marcado como pago.
```

**No Canal da Venda Aparece:**
```
┌─────────────────────────────────────┐
│ ✅ Pagamento Aprovado!              │
│                                     │
│ Seu pagamento foi confirmado com    │
│ sucesso. Obrigado pela compra!      │
│                                     │
│ Clique abaixo para fechar este:     │
│ [🔒 Fechar Ticket]                  │
└─────────────────────────────────────┘
```

---

### 6. Fluxo Completo de Venda

```
Cliente vê painel /painelvendas
        ↓
Clica no produto que quer
        ↓
Ticket privado é criado
        ↓
Informações do produto aparecem
        ↓
Staff revisa o pedido
        ↓
Staff aprova com: /aprovar ticket_id:XXX
        ↓
Mensagem de confirmação é enviada
        ↓
Ticket é fechado automaticamente
        ↓
Cliente recebe o que comprou privadamente
```

---

## 📊 Logs Automáticos

Todas as ações são registradas automaticamente no canal de logs.

**Exemplos de Logs:**

```
[LOG] Novo ticket criado: #ticket-username por @Username#0000

[LOG] Ticket fechado: ticket-username por @Username#0000

[LOG] Nova venda: Discord Nitro - Comprador: @Username#0000 - Valor: R$ 50.00

[LOG] Pagamento aprovado para ticket #venda-username-xxx
```

---

## ⚙️ Configurações Customizáveis

Edite `config.json` para mudar mensagens e cores:

### Exemplo: Mudar Mensagem de Boas-vindas

**Antes:**
```json
"ticket_welcome": "Bem-vindo ao seu ticket! 🎫\n\nDescreva seu problema..."
```

**Depois:**
```json
"ticket_welcome": "Olá! Você abriu um ticket. Como posso ajudar?"
```

---

### Exemplo: Mudar Cor Padrão

**Antes:**
```json
"color": "#0099FF"
```

**Depois:**
```json
"color": "#FF1493"  // Rosa
```

---

## 🎯 Exemplos Avançados

### Caso 1: Mais de 5 Produtos

Se você tiver muitos produtos, a painel vai organizar os botões em linhas:

```
Linha 1: [Produto 1] [Produto 2] [Produto 3] [Produto 4] [Produto 5]
Linha 2: [Produto 6] [Produto 7] [Produto 8] [Produto 9] [Produto 10]
Linha 3: [Produto 11] [Produto 12]
```

---

### Caso 2: Usuário com 3 Tickets Abertos

Se tentar abrir um 4º ticket:

```
❌ Você atingiu o limite máximo de tickets abertos (3)!
```

---

### Caso 3: Produto Não Existe

Se tentar aprovar um ticket com ID inválido:

```
❌ Canal de ticket não encontrado!
```

---

## 📝 Dicas Práticas

✅ **Como Copiar ID de um Canal:**
1. Clique com botão direito no canal
2. Clique em "Copy Channel ID"
3. Cole em: `/aprovar ticket_id:COLAR_AQUI`

✅ **Como Encontrar seu GUILD_ID:**
1. Clique com botão direito no servidor
2. Clique em "Copy Server ID"

✅ **Como Encontrar STAFF_ROLE_ID:**
1. Server Settings → Roles
2. Clique com botão direito no cargo
3. Clique em "Copy Role ID"

---

## 🚀 Pronto para Testar?

1. Instale: `npm install`
2. Configure `.env`
3. Execute: `npm start`
4. No Discord, digite: `/ticket`
5. Clique no botão
6. Veja a mágica acontecer! ✨

---

**Todos os exemplos acima funcionam exatamente como mostrados!** ✅

Dúvidas? Leia [README.md](README.md) para documentação completa.
