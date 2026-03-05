import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { getProducts, deleteProduct } from "../utils/productManager.js";
import { updateFixedProductsMessage } from "../utils/fixedMessageManager.js";

export default {
  data: new SlashCommandBuilder()
    .setName("removerproduto")
    .setDescription("Remover um produto da venda")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("ID do produto a remover")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction) {
    const products = getProducts();
    const focusedValue = interaction.options.getFocused();

    const filtered = products
      .filter((p) =>
        p.name.toLowerCase().includes(focusedValue.toLowerCase())
      )
      .slice(0, 25);

    await interaction.respond(
      filtered.map((p) => ({
        name: `${p.name} - R$ ${p.price.toFixed(2)}`,
        value: p.id,
      }))
    );
  },

  async execute(interaction, client) {
    // Verificar se é staff
    const staffRoleId = process.env.STAFF_ROLE_ID;
    const hasStaffRole = interaction.member.roles.cache.has(staffRoleId);

    if (!hasStaffRole) {
      return await interaction.reply({
        content: "❌ Apenas staff pode remover produtos!",
        ephemeral: true,
      });
    }

    const productId = interaction.options.getString("id");
    const products = getProducts();
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return await interaction.reply({
        content: "❌ Produto não encontrado!",
        ephemeral: true,
      });
    }

    // Remover produto
    deleteProduct(productId);

    // Criar embed de confirmação
    const embed = new EmbedBuilder()
      .setTitle("🗑️ Produto Removido")
      .setDescription(`O produto **${product.name}** foi removido com sucesso!`)
      .addFields(
        { name: "💰 Preço", value: `R$ ${product.price.toFixed(2)}`, inline: true },
        { name: "🆔 ID", value: productId, inline: true },
        { name: "📝 Descrição", value: product.description, inline: false }
      )
      .setColor("#FF0000")
      .setTimestamp();

    // Atualizar mensagem fixa
    await updateFixedProductsMessage(client);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
