import { SlashCommandBuilder } from "discord.js";
import { updateFixedProductsMessage } from "../utils/fixedMessageManager.js";

export default {
  data: new SlashCommandBuilder()
    .setName("atualizarprodutos")
    .setDescription("Atualizar/Recriar a mensagem fixa de produtos no canal"),

  async execute(interaction, client) {
    // Verificar se o usuário é staff
    const staffRoleId = process.env.STAFF_ROLE_ID;
    const hasStaffRole = interaction.member.roles.cache.has(staffRoleId);

    if (!hasStaffRole) {
      return await interaction.reply({
        content: "❌ Apenas staff pode atualizar a mensagem de produtos!",
        ephemeral: true,
      });
    }

    await interaction.deferReply({ ephemeral: true });

    try {
      const message = await updateFixedProductsMessage(client);

      if (message) {
        await interaction.editReply({
          content: `✅ Mensagem de produtos atualizada/criada com sucesso!\n🔗 Canal: ${message.channel}`,
        });
      } else {
        await interaction.editReply({
          content: "❌ Erro ao atualizar mensagem. Verifique se PRODUTOS_CHANNEL_ID está configurado.",
        });
      }
    } catch (error) {
      console.error("Erro ao atualizar produtos:", error);
      await interaction.editReply({
        content: "❌ Erro ao atualizar mensagem de produtos!",
      });
    }
  },
};
