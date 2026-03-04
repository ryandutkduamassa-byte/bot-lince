import { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { getProduct } from "../utils/productManager.js";
import { createTranscript } from "../utils/transcriptManager.js";
import { logAction } from "../utils/logger.js";
import { generatePixQRCode, getPixKey } from "../utils/pixManager.js";

export default {
  name: "interactionCreate",
  once: false,

  async execute(client, interaction) {
    // Processar Slash Commands
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error("Erro ao executar comando:", error);
        const errorMessage = {
          content: "❌ Ocorreu um erro ao executar este comando!",
          ephemeral: true,
        };

        if (interaction.replied || interaction.deferred) {
          await interaction.followUp(errorMessage);
        } else {
          await interaction.reply(errorMessage);
        }
      }
    }

    // Processar Botões
    if (interaction.isButton()) {
      try {
        // Botão: Criar Ticket
        if (interaction.customId === "ticket_create") {
          await handleCreateTicket(interaction, client);
        }

        // Botão: Fechar Ticket
        if (interaction.customId.startsWith("ticket_close")) {
          await handleCloseTicket(interaction, client);
        }

        // Botão: Produto comprado
        if (interaction.customId.startsWith("product_")) {
          await handleProductPurchase(interaction, client);
        }
      } catch (error) {
        console.error("Erro ao processar botão:", error);
        await interaction.reply({
          content: "❌ Erro ao processar ação!",
          ephemeral: true,
        });
      }
    }
  },
};

// Função para criar ticket
async function handleCreateTicket(interaction, client) {
  const userId = interaction.user.id;
  const ticketName = `ticket-${interaction.user.username}`;
  const guild = interaction.guild;
  const staffRoleId = process.env.STAFF_ROLE_ID;

  // Verificar limite de tickets
  const userTickets = guild.channels.cache.filter(
    (ch) =>
      ch.name.includes(`ticket-${interaction.user.username}`) &&
      ch.type === ChannelType.GuildText
  );

  if (userTickets.size >= 3) {
    return await interaction.reply({
      content: "❌ Você atingiu o limite máximo de tickets abertos (3)!",
      ephemeral: true,
    });
  }

  try {
    // Criar canal
    const channel = await guild.channels.create({
      name: ticketName,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: ["ViewChannel"],
        },
        {
          id: userId,
          allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"],
        },
        {
          id: staffRoleId,
          allow: ["ViewChannel", "SendMessages", "ReadMessageHistory", "ManageChannels"],
        },
      ],
    });

    // Enviar mensagem de boas-vindas
    const welcomeEmbed = new EmbedBuilder()
      .setTitle("🎫 Novo Ticket Criado")
      .setDescription(
        "Bem-vindo ao seu ticket! Descreva seu problema ou necessidade abaixo e aguarde uma resposta da staff."
      )
      .setColor("#0099FF")
      .addFields(
        { name: "👤 Usuário", value: `<@${userId}>`, inline: true },
        { name: "⏰ Horário", value: new Date().toLocaleString("pt-BR"), inline: true }
      )
      .setFooter({ text: "Sistema de Tickets - Bot Lince" })
      .setTimestamp();

    // Botão para fechar
    const closeButton = new ButtonBuilder()
      .setCustomId(`ticket_close_${channel.id}`)
      .setLabel("Fechar Ticket")
      .setStyle(ButtonStyle.Danger)
      .setEmoji("🔒");

    const row = new ActionRowBuilder().addComponents(closeButton);

    await channel.send({
      embeds: [welcomeEmbed],
      components: [row],
    });

    // Responder ao usuário
    await interaction.reply({
      content: `✅ Ticket criado com sucesso! <#${channel.id}>`,
      ephemeral: true,
    });

    // Log
    await logAction(client, `Novo ticket criado: <#${channel.id}> por ${interaction.user.tag}`);
  } catch (error) {
    console.error("Erro ao criar ticket:", error);
    await interaction.reply({
      content: "❌ Erro ao criar ticket!",
      ephemeral: true,
    });
  }
}

// Função para fechar ticket
async function handleCloseTicket(interaction, client) {
  const ticketChannelId = interaction.customId.split("_")[2];
  const originalChannelId = interaction.channelId === ticketChannelId ? interaction.channelId : ticketChannelId;

  try {
    // Gerar transcript
    const transcript = await createTranscript(interaction.channel, interaction.user);

    // Enviar transcript no canal de logs
    const logChannelId = process.env.LOG_CHANNEL_ID;
    const logChannel = await interaction.guild.channels.fetch(logChannelId);

    if (logChannel) {
      const logEmbed = new EmbedBuilder()
        .setTitle("📋 Transcript de Ticket")
        .setDescription(`Ticket: ${interaction.channel.name}`)
        .setColor("#FF0000")
        .addFields(
          { name: "📝 Conteúdo", value: `\`\`\`\n${transcript.slice(0, 1024)}\n\`\`\`` },
          { name: "👤 Usuário", value: `<@${interaction.channel.topic || "Desconhecido"}>` },
          { name: "⏰ Horário de Fechamento", value: new Date().toLocaleString("pt-BR") }
        )
        .setFooter({ text: "Sistema de Tickets - Bot Lince" })
        .setTimestamp();

      await logChannel.send({ embeds: [logEmbed] });
    }

    // Responder ao usuário
    await interaction.reply({
      content: "🔒 Ticket será fechado em 5 segundos...",
      ephemeral: true,
    });

    // Aguardar e deletar
    setTimeout(async () => {
      try {
        await interaction.channel.delete();
      } catch (error) {
        console.error("Erro ao deletar canal:", error);
      }
    }, 5000);

    // Log
    await logAction(client, `Ticket fechado: ${interaction.channel.name} por ${interaction.user.tag}`);
  } catch (error) {
    console.error("Erro ao fechar ticket:", error);
    await interaction.reply({
      content: "❌ Erro ao fechar ticket!",
      ephemeral: true,
    });
  }
}

// Função para compra de produto
async function handleProductPurchase(interaction, client) {
  const productId = interaction.customId.split("_")[1];
  const product = getProduct(productId);

  if (!product) {
    return await interaction.reply({
      content: "❌ Produto não encontrado!",
      ephemeral: true,
    });
  }

  const userId = interaction.user.id;
  const ticketName = `venda-${interaction.user.username}-${Date.now()}`;
  const guild = interaction.guild;
  const staffRoleId = process.env.STAFF_ROLE_ID;

  try {
    // Criar canal de venda
    const channel = await guild.channels.create({
      name: ticketName,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: guild.id,
          deny: ["ViewChannel"],
        },
        {
          id: userId,
          allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"],
        },
        {
          id: staffRoleId,
          allow: ["ViewChannel", "SendMessages", "ReadMessageHistory", "ManageChannels"],
        },
      ],
    });

    // Enviar informações do produto
    const productEmbed = new EmbedBuilder()
      .setTitle(`🛍️ Detalhes do Produto`)
      .setDescription(product.description)
      .setColor("#00FF00")
      .addFields(
        { name: "📦 Produto", value: product.name, inline: true },
        { name: "💰 Valor", value: `R$ ${product.price.toFixed(2)}`, inline: true },
        { name: "👤 Comprador", value: `<@${userId}>`, inline: true },
        { name: "📊 Status", value: "⏳ Aguardando confirmação de pagamento" }
      )
      .setFooter({ text: "Sistema de Vendas - Bot Lince" })
      .setTimestamp();

    await channel.send({ embeds: [productEmbed] });

    // Gerar QR Code do PIX
    const qrCodeAttachment = await generatePixQRCode(product.price);
    
    const pixEmbed = new EmbedBuilder()
      .setTitle("💳 ESCANEIE O QR CODE PARA PAGAR")
      .setDescription(`**PIX - Transferência Instantânea**\n\n💰 Valor: R$ ${product.price.toFixed(2)}\n\n📱 Escaneie o código QR abaixo com seu celular para realizar o pagamento.`)
      .setColor("#FFB800")
      .setImage("attachment://pix_qrcode.png")
      .addFields(
        { name: "🔑 Chave PIX", value: `\`${getPixKey()}\`` },
        { name: "📌", value: "Após realizar o pagamento, aguarde a confirmação da staff!" }
      )
      .setFooter({ text: "Sistema de Pagamento - Bot Lince" })
      .setTimestamp();

    if (qrCodeAttachment) {
      await channel.send({
        embeds: [pixEmbed],
        files: [qrCodeAttachment]
      });
    }

    // Mensagem para staff
    const staffMessage = new EmbedBuilder()
      .setTitle("📢 Nova Venda Registrada")
      .setDescription(`Um novo cliente deseja comprar: **${product.name}**`)
      .setColor("#0099FF")
      .addFields(
        { name: "💰 Valor", value: `R$ ${product.price.toFixed(2)}` },
        { name: "👤 Cliente", value: `<@${userId}>` }
      )
      .setFooter({ text: "Aguardando confirmação de pagamento" });

    await channel.send({
      content: `<@&${staffRoleId}>`,
      embeds: [staffMessage],
    });

    // Responder ao usuário
    await interaction.reply({
      content: `✅ Ticket de venda criado! <#${channel.id}>\n💰 Valor: R$ ${product.price.toFixed(2)}\n\n📱 **QR Code PIX gerado!** Escaneie para pagar.\nAguarde a staff confirmar o pagamento.`,
      ephemeral: true,
    });

    // Log
    await logAction(client, `Nova venda: ${product.name} - Comprador: ${interaction.user.tag} - Valor: R$ ${product.price.toFixed(2)}`);
  } catch (error) {
    console.error("Erro ao criar ticket de venda:", error);
    await interaction.reply({
      content: "❌ Erro ao criar ticket de venda!",
      ephemeral: true,
    });
  }
}
