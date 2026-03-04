# 🎨 Customização - Bot Lince

Guia completo para customizar seus comandos, embeds, cores e mensagens.

## 1️⃣ Alterar Cores e Mensagens Globais

Edite `config.json`:

```json
{
  "bot": {
    "prefix": "!",
    "color": "#0099FF"
  },
  "tickets": {
    "category": "Tickets",
    "reopenTime": 5000,
    "maxTickets": 3
  },
  "messages": {
    "ticket_welcome": "Bem-vindo ao seu ticket! 🎫\n\nDescreva seu problema ou necessidade abaixo e aguarde uma resposta da staff.",
    "ticket_closed": "Este ticket foi fechado pela staff.",
    "sale_created": "Um novo ticket de venda foi criado! Descrição do produto será enviada em breve.",
    "payment_approved": "✅ Pagamento aprovado! Obrigado pela compra!",
    "payment_rejected": "❌ Pagamento rejeitado. Entre em contato com a staff."
  },
  "emojis": {
    "ticket": "🎫",
    "product": "🛍️",
    "success": "✅",
    "error": "❌",
    "loading": "⏳"
  }
}
```

## 2️⃣ Adicionar Novo Comando

### Exemplo: Comando `/help`

Crie o arquivo `src/commands/help.js`:

```javascript
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Mostrar ajuda sobre os comandos"),

  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle("📖 Ajuda - Comandos Disponíveis")
      .setDescription("Lista de todos os comandos do bot")
      .setColor("#0099FF")
      .addFields(
        {
          name: "/ticket",
          value: "Enviar painel de criação de tickets",
          inline: false,
        },
        {
          name: "/produto",
          value: "Cadastrar um novo produto para venda (apenas staff)",
          inline: false,
        },
        {
          name: "/painelvendas",
          value: "Mostrar painel com todos os produtos",
          inline: false,
        },
        {
          name: "/aprovar",
          value: "Aprovar pagamento de um ticket (apenas staff)",
          inline: false,
        }
      )
      .setFooter({ text: "Bot Lince - Sistema de Tickets e Vendas" })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
```

O comando será carregado automaticamente!

## 3️⃣ Criar Comando com Opções

### Exemplo: Comando `/info` com sub-opções

```javascript
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Obter informações")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("bot")
        .setDescription("Informações do bot")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("servidor")
        .setDescription("Informações do servidor")
    ),

  async execute(interaction, client) {
    const subcommand = interaction.options.getSubcommand();

    if (subcommand === "bot") {
      const embed = new EmbedBuilder()
        .setTitle("🤖 Informações do Bot")
        .addFields(
          { name: "Nome", value: client.user.username },
          { name: "Versão", value: "1.0.0" },
          { name: "Ping", value: `${client.ws.ping}ms` }
        )
        .setColor("#0099FF");

      await interaction.reply({ embeds: [embed] });
    } else if (subcommand === "servidor") {
      const embed = new EmbedBuilder()
        .setTitle("🏠 Informações do Servidor")
        .addFields(
          { name: "Nome", value: interaction.guild.name },
          { name: "Membros", value: interaction.guild.memberCount.toString() },
          { name: "Canais", value: interaction.guild.channels.cache.size.toString() }
        )
        .setColor("#00FF00");

      await interaction.reply({ embeds: [embed] });
    }
  },
};
```

## 4️⃣ Criar Novo Evento

### Exemplo: Evento `messageCreate` (mensagens normais)

Crie `src/events/messageCreate.js`:

```javascript
export default {
  name: "messageCreate",
  once: false,

  async execute(client, message) {
    // Ignorar mensagens do bot
    if (message.author.bot) return;

    // Responder a menções
    if (message.mentions.has(client.user)) {
      await message.reply("Oi! 👋 Use `/help` para ver os comandos disponíveis.");
    }

    // Responder a reações específicas
    if (message.content.toLowerCase().includes("oi")) {
      await message.react("👋");
    }
  },
};
```

## 5️⃣ Adicionar Reações a Botões Personalizados

### Exemplo: Botão com ação customizada

No arquivo `src/events/interactionCreate.js`, adicione:

```javascript
// Botão customizado
if (interaction.customId === "meu_botao") {
  await interaction.reply({
    content: "Você clicou no meu botão! 🎉",
    ephemeral: true
  });
}
```

## 6️⃣ Usar Autocomplete em Comandos

### Exemplo: Comando com sugestões

```javascript
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("produto")
    .setDescription("Buscar produto")
    .addStringOption((option) =>
      option
        .setName("nome")
        .setDescription("Nome do produto")
        .setRequired(true)
        .setAutocomplete(true) // Ativar autocomplete
    ),

  async execute(interaction, client) {
    const productName = interaction.options.getString("nome");
    await interaction.reply(`Você buscou por: ${productName}`);
  },
};
```

No `src/events/interactionCreate.js`:

```javascript
if (interaction.isAutocomplete()) {
  const focusedOption = interaction.options.getFocused(true);

  if (focusedOption.name === "nome") {
    const choices = ["Nitro", "Bot Premium", "Consultoria"];
    const filtered = choices.filter((choice) =>
      choice.toLowerCase().includes(focusedOption.value.toLowerCase())
    );

    await interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  }
}
```

## 7️⃣ Embeds com Imagem e Cores Personalizadas

```javascript
const embed = new EmbedBuilder()
  .setTitle("🎀 Título Bonito")
  .setDescription("Descrição com **negrito** e *itálico*")
  .setColor("#FF1493") // Cor em hex
  .setImage("https://imagem.com/banner.png")
  .setThumbnail("https://imagem.com/thumb.png")
  .addFields(
    { name: "Campo 1", value: "Valor 1", inline: true },
    { name: "Campo 2", value: "Valor 2", inline: true },
    { name: "Campo Grande", value: "Ocupa a linha toda", inline: false }
  )
  .setFooter({ text: "Rodapé", iconURL: "url_da_imagem" })
  .setTimestamp();
```

## 8️⃣ Cores Recomendadas

```javascript
const cores = {
  sucesso: "#00FF00",
  erro: "#FF0000",
  aviso: "#FFD700",
  info: "#0099FF",
  roxo: "#9900FF",
  rosa: "#FF1493",
  azul_claro: "#87CEEB",
  verde_escuro: "#006400",
};
```

## 9️⃣ Adicionar Permissões a Comandos

```javascript
import { PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("De kick em um membro")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false), // Não funciona em DM

  async execute(interaction, client) {
    // Seu código aqui
  },
};
```

## 🔟 Usar Modals (Formulários)

```javascript
import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";

// No botão:
if (interaction.customId === "meu_botao") {
  const modal = new ModalBuilder()
    .setCustomId("meu_modal")
    .setTitle("Preencha o formulário");

  const input = new TextInputBuilder()
    .setCustomId("meu_input")
    .setLabel("Seu nome")
    .setStyle(TextInputStyle.Short);

  const row = new ActionRowBuilder().addComponents(input);
  modal.addComponents(row);

  await interaction.showModal(modal);
}

// No evento interactionCreate:
if (interaction.isModalSubmit()) {
  if (interaction.customId === "meu_modal") {
    const answer = interaction.fields.getTextInputValue("meu_input");
    await interaction.reply(`Você respondeu: ${answer}`);
  }
}
```

## 📚 Mais Recursos

- [Discord.js Docs](https://discord.js.org/)
- [Cores Hex](https://www.color-hex.com/)
- [Emojis Unicode](https://unicode.org/emoji/)

---

**Divirta-se customizando seu bot!** 🎨
