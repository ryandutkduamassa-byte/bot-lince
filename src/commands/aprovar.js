import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("aprovar")
    .setDescription("Aprovar pagamento de um ticket de venda")
    .addStringOption((option) =>
      option
        .setName("ticket_id")
        .setDescription("ID do canal do ticket")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    // Verificar se é staff
    const staffRoleId = process.env.STAFF_ROLE_ID;
    const hasStaffRole = interaction.member.roles.cache.has(staffRoleId);

    if (!hasStaffRole) {
      return await interaction.reply({
        content: "❌ Apenas staff pode aprovar pagamentos!",
        ephemeral: true,
      });
    }

    const ticketId = interaction.options.getString("ticket_id");

    try {
      const ticketChannel = await interaction.guild.channels.fetch(ticketId);

      if (!ticketChannel) {
        return await interaction.reply({
          content: "❌ Canal de ticket não encontrado!",
          ephemeral: true,
        });
      }

      // Enviar mensagem de aprovação
      const approvalEmbed = new EmbedBuilder()
        .setTitle("✅ Pagamento Aprovado!")
        .setDescription("Seu pagamento foi confirmado com sucesso. Obrigado pela compra!")
        .setColor("#00FF00")
        .setFooter({ text: "Sistema de Vendas - Bot Lince" })
        .setTimestamp();

      await ticketChannel.send({ embeds: [approvalEmbed] });

      // Botão de fechar
      const closeButton = new ButtonBuilder()
        .setCustomId(`ticket_close_${ticketId}`)
        .setLabel("Fechar Ticket")
        .setStyle(ButtonStyle.Danger)
        .setEmoji("🔒");

      const row = new ActionRowBuilder().addComponents(closeButton);

      await ticketChannel.send({
        content: "Clique abaixo para fechar este ticket:",
        components: [row],
      });

      await interaction.reply({
        content: `✅ Pagamento aprovado! Ticket <#${ticketId}> foi marcado como pago.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error("Erro ao aprovar pagamento:", error);
      await interaction.reply({
        content: "❌ Erro ao processar aprovação!",
        ephemeral: true,
      });
    }
  },
};
