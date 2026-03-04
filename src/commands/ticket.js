import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Abrir painel de tickets"),
  
  async execute(interaction, client) {
    // Criar embed do painel
    const embed = new EmbedBuilder()
      .setTitle("🎫 Sistema de Tickets")
      .setDescription("Clique no botão abaixo para abrir um ticket e entrar em contato com a staff!")
      .setColor("#0099FF")
      .setFooter({ text: "Sistema de Tickets - Bot Lince" })
      .setTimestamp();

    // Criar botão
    const button = new ButtonBuilder()
      .setCustomId("ticket_create")
      .setLabel("Abrir Ticket")
      .setStyle(ButtonStyle.Success)
      .setEmoji("🎫");

    // Enviar mensagem com botão
    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  },
};
