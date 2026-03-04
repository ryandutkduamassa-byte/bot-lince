import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } from "discord.js";
import { getProducts } from "./productManager.js";

// Armazenar ID da mensagem fixa em memória
let fixedMessageId = null;

/**
 * Gerar embed da mensagem de produtos
 */
export function generateProductsEmbed() {
  const products = getProducts();

  const embed = new EmbedBuilder()
    .setTitle("🛍️ PRODUTOS DISPONÍVEIS")
    .setDescription(
      products.length > 0
        ? "Clique nos botões abaixo para comprar seus produtos favoritos!"
        : "Nenhum produto cadastrado no momento."
    )
    .setColor("#00FF00")
    .setThumbnail("https://cdn-icons-png.flaticon.com/512/833/833472.png")
    .setFooter({ text: "Sistema de Vendas - Bot Lince" })
    .setTimestamp();

  // Adicionar cada produto
  if (products.length > 0) {
    products.forEach((product) => {
      embed.addFields({
        name: `${product.name}`,
        value: `💰 **R$ ${product.price.toFixed(2)}**\n📝 ${product.description}`,
        inline: false,
      });
    });
  }

  return embed;
}

/**
 * Gerar botões da mensagem de produtos
 */
export function generateProductButtons() {
  const products = getProducts();
  const buttons = [];

  if (products.length === 0) {
    return [];
  }

  // Criar botão para cada produto
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

  return rows;
}

/**
 * Atualizar ou criar mensagem fixa de produtos
 */
export async function updateFixedProductsMessage(client) {
  try {
    const channelId = process.env.PRODUTOS_CHANNEL_ID;

    if (!channelId) {
      console.log("⚠️ PRODUTOS_CHANNEL_ID não configurado em .env");
      return null;
    }

    const channel = await client.channels.fetch(channelId).catch(() => null);

    if (!channel) {
      console.log("❌ Canal de produtos não encontrado!");
      return null;
    }

    const embed = generateProductsEmbed();
    const rows = generateProductButtons();

    // Tentar atualizar mensagem existente
    if (fixedMessageId) {
      try {
        const message = await channel.messages.fetch(fixedMessageId);
        await message.edit({ 
          embeds: [embed],
          components: rows.length > 0 ? rows : []
        });
        console.log("✅ Mensagem de produtos atualizada!");
        return message;
      } catch (error) {
        console.log("⚠️ Mensagem anterior não encontrada, criando nova...");
        fixedMessageId = null;
      }
    }

    // Criar nova mensagem
    const message = await channel.send({ 
      embeds: [embed],
      components: rows.length > 0 ? rows : []
    });
    fixedMessageId = message.id;
    console.log("✅ Mensagem fixa de produtos criada com botões!");
    return message;
  } catch (error) {
    console.error("❌ Erro ao atualizar mensagem de produtos:", error);
    return null;
  }
}

/**
 * Salvar ID da mensagem (pode ser usado para persistência)
 */
export function setFixedMessageId(messageId) {
  fixedMessageId = messageId;
}

/**
 * Obter ID da mensagem
 */
export function getFixedMessageId() {
  return fixedMessageId;
}
