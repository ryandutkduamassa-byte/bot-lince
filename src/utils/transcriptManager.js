import { ChannelType } from "discord.js";

/**
 * Gerar transcript de um canal
 */
export async function createTranscript(channel, closedBy) {
  try {
    const messages = await channel.messages.fetch({ limit: 100 });
    const sortedMessages = Array.from(messages.values()).reverse();

    let transcript = `═══════════════════════════════════════\n`;
    transcript += `TRANSCRIPT DO TICKET\n`;
    transcript += `Canal: ${channel.name}\n`;
    transcript += `Fechado por: ${closedBy.tag}\n`;
    transcript += `Data: ${new Date().toLocaleString("pt-BR")}\n`;
    transcript += `═══════════════════════════════════════\n\n`;

    sortedMessages.forEach((msg) => {
      const author = msg.author.username;
      const timestamp = new Date(msg.createdTimestamp).toLocaleString("pt-BR");
      const content = msg.content || "[Sem conteúdo]";

      transcript += `[${timestamp}] ${author}:\n${content}\n`;

      if (msg.embeds.length > 0) {
        msg.embeds.forEach((embed) => {
          transcript += `[EMBED] ${embed.title}\n`;
        });
      }

      transcript += "\n";
    });

    transcript += `\n═══════════════════════════════════════\n`;
    transcript += `FIM DO TRANSCRIPT\n`;
    transcript += `═══════════════════════════════════════\n`;

    return transcript;
  } catch (error) {
    console.error("Erro ao gerar transcript:", error);
    return "Erro ao gerar transcript";
  }
}

/**
 * Formatar mensagens para HTML
 */
export async function createHTMLTranscript(channel, closedBy) {
  try {
    const messages = await channel.messages.fetch({ limit: 100 });
    const sortedMessages = Array.from(messages.values()).reverse();

    let html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transcript - ${channel.name}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #36393F;
            color: #DCDDDE;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: #2C2F33;
            border-radius: 10px;
            padding: 20px;
        }
        .header {
            border-bottom: 2px solid #0099FF;
            padding-bottom: 15px;
            margin-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #0099FF;
        }
        .info {
            font-size: 14px;
            color: #B0BEC5;
        }
        .message {
            background-color: #36393F;
            padding: 10px;
            margin-bottom: 10px;
            border-radius: 5px;
            border-left: 3px solid #0099FF;
        }
        .author {
            color: #0099FF;
            font-weight: bold;
        }
        .timestamp {
            color: #72767D;
            font-size: 12px;
        }
        .content {
            margin-top: 5px;
            color: #DCDDDE;
        }
        .footer {
            border-top: 2px solid #0099FF;
            padding-top: 15px;
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #B0BEC5;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📋 Transcript do Ticket</h1>
            <div class="info">
                <strong>Canal:</strong> #${channel.name}<br>
                <strong>Fechado por:</strong> ${closedBy.tag}<br>
                <strong>Data:</strong> ${new Date().toLocaleString("pt-BR")}<br>
                <strong>Total de mensagens:</strong> ${sortedMessages.length}
            </div>
        </div>
`;

    sortedMessages.forEach((msg) => {
      const author = msg.author.username;
      const timestamp = new Date(msg.createdTimestamp).toLocaleString("pt-BR");
      const content = msg.content.replace(/</g, "&lt;").replace(/>/g, "&gt;");

      html += `
        <div class="message">
            <span class="author">${author}</span>
            <span class="timestamp">${timestamp}</span>
            <div class="content">${content}</div>
        </div>
`;
    });

    html += `
        <div class="footer">
            <p>Gerado pelo Bot Lince - Sistema de Tickets</p>
        </div>
    </div>
</body>
</html>
`;

    return html;
  } catch (error) {
    console.error("Erro ao gerar transcript HTML:", error);
    return "Erro ao gerar transcript";
  }
}
