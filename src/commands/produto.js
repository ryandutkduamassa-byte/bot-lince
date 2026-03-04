import { SlashCommandBuilder } from "discord.js";
import { getProducts, addProduct } from "../utils/productManager.js";
import { updateFixedProductsMessage } from "../utils/fixedMessageManager.js";

export default {
  data: new SlashCommandBuilder()
    .setName("produto")
    .setDescription("Cadastrar um novo produto")
    .addStringOption((option) =>
      option
        .setName("nome")
        .setDescription("Nome do produto")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("preco")
        .setDescription("Preço do produto")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("descricao")
        .setDescription("Descrição do produto")
        .setRequired(true)
    ),

  async execute(interaction, client) {
    // Verificar se o usuário é staff
    const staffRoleId = process.env.STAFF_ROLE_ID;
    const hasStaffRole = interaction.member.roles.cache.has(staffRoleId);

    if (!hasStaffRole) {
      return await interaction.reply({
        content:
          "❌ Apenas staff pode cadastrar produtos!",
        ephemeral: true,
      });
    }

    const nome = interaction.options.getString("nome");
    const preco = interaction.options.getNumber("preco");
    const descricao = interaction.options.getString("descricao");

    // Adicionar produto
    const product = {
      id: Date.now().toString(),
      name: nome,
      price: preco,
      description: descricao,
      createdBy: interaction.user.id,
      createdAt: new Date().toISOString(),
    };

    addProduct(product);

    // Atualizar mensagem fixa de produtos
    await updateFixedProductsMessage(client);

    await interaction.reply({
      content: `✅ Produto **${nome}** cadastrado com sucesso!\n💰 Preço: R$ ${preco.toFixed(2)}\n\n📝 Mensagem de produtos atualizada!`,
      ephemeral: true,
    });
  },
};
