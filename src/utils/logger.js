import { EmbedBuilder } from "discord.js";

/**
 * Fazer log de ações importante no canal de logs
 */
export async function logAction(client, message) {
  try {
    const logChannelId = process.env.LOG_CHANNEL_ID;

    if (!logChannelId) {
      console.log(`📝 Log (sem canal configurado): ${message}`);
      return;
    }

    const logChannel = await client.channels.fetch(logChannelId).catch(() => null);

    if (!logChannel) {
      console.log(`📝 Log (canal não encontrado): ${message}`);
      return;
    }

    const logEmbed = new EmbedBuilder()
      .setTitle("📝 Log do Sistema")
      .setDescription(message)
      .setColor("#FFFF00")
      .setTimestamp()
      .setFooter({ text: "Sistema de Logs - Bot Lince" });

    await logChannel.send({ embeds: [logEmbed] });
    console.log(`✅ Log enviado: ${message}`);
  } catch (error) {
    console.error("Erro ao fazer log:", error);
  }
}

/**
 * Log de erro
 */
export async function logError(client, error, context = "") {
  try {
    const logChannelId = process.env.LOG_CHANNEL_ID;

    if (!logChannelId) {
      console.error(`❌ Erro (sem canal): ${context} - ${error.message}`);
      return;
    }

    const logChannel = await client.channels.fetch(logChannelId).catch(() => null);

    if (!logChannel) {
      console.error(`❌ Erro (canal não encontrado): ${context} - ${error.message}`);
      return;
    }

    const errorEmbed = new EmbedBuilder()
      .setTitle("❌ Erro no Sistema")
      .setDescription(`**Contexto:** ${context}`)
      .addFields({ name: "Mensagem", value: `\`\`\`${error.message}\`\`\`` })
      .setColor("#FF0000")
      .setTimestamp()
      .setFooter({ text: "Sistema de Logs - Bot Lince" });

    await logChannel.send({ embeds: [errorEmbed] });
    console.error(`✅ Erro registrado: ${error.message}`);
  } catch (err) {
    console.error("Erro ao fazer log de erro:", err);
  }
}
