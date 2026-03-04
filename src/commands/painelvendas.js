import {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} from "discord.js";
import { getProducts } from "../utils/productManager.js";

export default {
  data: new SlashCommandBuilder()
    .setName("painelvendas")
    .setDescription("Enviar painel de vendas com produtos disponíveis"),

  async execute(interaction, client) {
    const products = getProducts();

    if (products.length === 0) {
      return await interaction.reply({
        content: "❌ Nenhum produto cadastrado no momento!",
        ephemeral: true,
      });
    }

    // Criar embed
    const embed = new EmbedBuilder()
      .setTitle("🛍️ Loja - Produtos Disponíveis")
      .setDescription("Clique em um produto para abrir um ticket de compra")
      .setColor("#00FF00")
      .setFooter({ text: "Sistema de Vendas - Bot Lince" })
      .setTimestamp();

    // Adicionar cada produto no embed
    products.forEach((product) => {
      embed.addFields({
        name: `${product.name}`,
        value: `💰 R$ ${product.price.toFixed(2)}\n${product.description}`,
        inline: false,
      });
    });

    // Criar botões para cada produto
    const buttons = [];
    products.forEach((product) => {
      buttons.push(
        new ButtonBuilder()
          .setCustomId(`product_${product.id}`)
          .setLabel(`${product.name} - R$ ${product.price.toFixed(2)}`)
          .setStyle(ButtonStyle.Primary)
          .setEmoji("🛍️")
      );
    });

    // Dividir botões em linhas (máximo 5 por linha)
    const rows = [];
    for (let i = 0; i < buttons.length; i += 5) {
      const row = new ActionRowBuilder().addComponents(buttons.slice(i, i + 5));
      rows.push(row);
    }

    await interaction.reply({
      embeds: [embed],
      components: rows,
    });
  },
};
