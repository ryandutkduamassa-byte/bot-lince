import QRCode from "qrcode";
import { AttachmentBuilder } from "discord.js";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";

const PIX_KEY = "6bdae594-d510-497a-b31c-5ad4464f91ec";

/**
 * Gerar string de PIX dinâmica com valor
 * Formato simplificado para QR Code de PIX
 */
export function generatePixString(amount) {
  // Formatar o valor com 2 casas decimais
  const formattedAmount = amount.toFixed(2).replace(".", "");

  // String PIX simplificada (pode ser customizada conforme necessário)
  const pixData = `00020126580014br.gov.bcb.brcode0136${PIX_KEY}520400005303986540${formattedAmount}5802BR5913Bot Lince6009SAO PAULO62410503***63041D3B`;

  return pixData;
}

/**
 * Gerar QR Code do PIX e retornar como attachment
 */
export async function generatePixQRCode(amount) {
  try {
    const pixString = generatePixString(amount);

    // Caminho temporário para salvar a imagem
    const tempPath = join(process.cwd(), `data/qr_${Date.now()}.png`);

    // Gerar QR Code e salvar
    await QRCode.toFile(tempPath, pixString, {
      errorCorrectionLevel: "H",
      type: "image/png",
      quality: 0.95,
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });

    // Criar attachment
    const attachment = new AttachmentBuilder(tempPath, {
      name: "pix_qrcode.png",
    });

    // Limpar arquivo temporário após 60 segundos
    setTimeout(() => {
      try {
        unlinkSync(tempPath);
      } catch (error) {
        console.log("Arquivo QR Code já foi removido");
      }
    }, 60000);

    return attachment;
  } catch (error) {
    console.error("Erro ao gerar QR Code do PIX:", error);
    return null;
  }
}

/**
 * Obter chave PIX configurada
 */
export function getPixKey() {
  return PIX_KEY;
}
