import { Client, Collection, GatewayIntentBits, ChannelType } from "discord.js";
import { config } from "dotenv";
import { readdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

config();

const __dirname = dirname(fileURLToPath(import.meta.url));

// Criar cliente do Discord com intents necessárias
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Coleções para armazenar comandos
client.commands = new Collection();
client.buttons = new Collection();

// Carregar comandos dinamicamente
const commandsPath = join(__dirname, "commands");
const commandFiles = readdirSync(commandsPath).filter((file) =>
  file.endsWith(".js")
);

console.log(`📦 Carregando ${commandFiles.length} comandos...`);

for (const file of commandFiles) {
  const filePath = join(commandsPath, file);
  const { default: command } = await import(`file://${filePath}`);
  
  if (command.data && command.execute) {
    client.commands.set(command.data.name, command);
    console.log(`✅ Comando carregado: /${command.data.name}`);
  }
}

// Carregar eventos dinamicamente
const eventsPath = join(__dirname, "events");
const eventFiles = readdirSync(eventsPath).filter((file) =>
  file.endsWith(".js")
);

console.log(`📦 Carregando ${eventFiles.length} eventos...`);

for (const file of eventFiles) {
  const filePath = join(eventsPath, file);
  const { default: event } = await import(`file://${filePath}`);
  
  if (event.name && event.execute) {
    if (event.once) {
      client.once(event.name, (...args) => event.execute(client, ...args));
    } else {
      client.on(event.name, (...args) => event.execute(client, ...args));
    }
    console.log(`✅ Evento carregado: ${event.name}`);
  }
}

// Login do bot
client.login(process.env.TOKEN);
