import { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } from "discord.js";
import { getProducts } from "../utils/productManager.js";

export default {
  data: new SlashCommandBuilder()
    .setName("listarprodutos")
    .setDescription("Listar todos os produtos cadastrados")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

  async execute(interaction) {
    const products = getProducts();

    if (products.length === 0) {
      return await interaction.reply({
        content: "❌ Nenhum produto cadastrado no momento!",
        ephemeral: true,
      });
    }

    // Criar embed com lista de produtos
    const embed = new EmbedBuilder()
      .setTitle("📋 Lista de Produtos")
      .setDescription(`Total: **${products.length}** produto(s)`)
      .setColor("#0099FF")
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/833/833472.png")
      .setTimestamp();

    // Adicionar cada produto em um field
    products.forEach((product, index) => {
      embed.addFields({
        name: `${index + 1}. ${product.name}`,
        value: `🆔 **ID:** \`${product.id}\`\n💰 **Preço:** R$ ${product.price.toFixed(2)}\n📝 **Desc:** ${product.description}`,
        inline: false,
      });
    });

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
