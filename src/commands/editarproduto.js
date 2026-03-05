import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { getProducts, updateProduct } from "../utils/productManager.js";
import { updateFixedProductsMessage } from "../utils/fixedMessageManager.js";

export default {
  data: new SlashCommandBuilder()
    .setName("editarproduto")
    .setDescription("Editar um produto existente")
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("ID do produto a editar")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("nome")
        .setDescription("Novo nome do produto")
        .setRequired(false)
    )
    .addNumberOption((option) =>
      option
        .setName("preco")
        .setDescription("Novo preço do produto")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("descricao")
        .setDescription("Nova descrição do produto")
        .setRequired(false)
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
        content: "❌ Apenas staff pode editar produtos!",
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

    // Preparar atualizações
    const updates = {};
    const novoNome = interaction.options.getString("nome");
    const novoPreco = interaction.options.getNumber("preco");
    const novaDescricao = interaction.options.getString("descricao");

    if (novoNome) updates.name = novoNome;
    if (novoPreco) updates.price = novoPreco;
    if (novaDescricao) updates.description = novaDescricao;

    // Validar se pelo menos um campo foi fornecido
    if (Object.keys(updates).length === 0) {
      return await interaction.reply({
        content: "❌ Você precisa fornecer pelo menos um campo para editar!",
        ephemeral: true,
      });
    }

    // Atualizar produto
    const produtoAtualizado = updateProduct(productId, updates);

    // Criar embed com antes e depois
    const embed = new EmbedBuilder()
      .setTitle("✏️ Produto Atualizado")
      .setDescription(`Produto **${product.name}** foi atualizado com sucesso!`)
      .setColor("#0099FF");

    if (novoNome) {
      embed.addFields({
        name: "📛 Nome",
        value: `${product.name} → **${novoNome}**`,
        inline: false,
      });
    }

    if (novoPreco) {
      embed.addFields({
        name: "💰 Preço",
        value: `R$ ${product.price.toFixed(2)} → **R$ ${novoPreco.toFixed(2)}**`,
        inline: false,
      });
    }

    if (novaDescricao) {
      embed.addFields({
        name: "📝 Descrição",
        value: `*Anterior:* ${product.description}\n*Nova:* **${novaDescricao}**`,
        inline: false,
      });
    }

    embed.setTimestamp();

    // Atualizar mensagem fixa
    await updateFixedProductsMessage(client);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
