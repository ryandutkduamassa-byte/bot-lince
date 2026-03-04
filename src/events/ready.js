import { ActivityType, Routes } from "discord.js";
import { REST } from "discord.js";
import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { updateFixedProductsMessage } from "../utils/fixedMessageManager.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(`✅ Bot conectado como ${client.user.tag}`);

    // Definir status do bot
    client.user.setActivity("🎫 Tickets & Vendas", {
      type: ActivityType.Watching,
    });

    // Criar/atualizar mensagem fixa de produtos
    await updateFixedProductsMessage(client);

    // Registrar comandos globalmente
    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

    try {
      console.log("🔄 Registrando slash commands...");

      const commandsPath = join(__dirname, "../commands");
      const commandFiles = readdirSync(commandsPath).filter((file) =>
        file.endsWith(".js")
      );

      const commands = [];

      for (const file of commandFiles) {
        const filePath = join(commandsPath, file);
        const { default: command } = await import(`file://${filePath}`);
        if (command.data) {
          commands.push(command.data.toJSON());
        }
      }

      await rest.put(Routes.applicationCommands(client.user.id), {
        body: commands,
      });

      console.log(`✅ ${commands.length} slash commands registrados com sucesso!`);
    } catch (error) {
      console.error("❌ Erro ao registrar comandos:", error);
    }
  },
};
