// Require the necessary discord.js classes
import { deployCommands } from "../../application/command-deploy";
import { commands } from "../../application/commands";
import { Client, Events, GatewayIntentBits } from "discord.js";

import * as dotenv from "dotenv";

dotenv.config();

export const build = async () => {
  // Create a new client instance
  const TOKEN = process.env.DISCORD_BOT_TOKEN;

  if (!TOKEN) {
    throw new Error("The DISCORD_BOT_TOKEN environment variable must be set.");
  }

  // Create a new client instance
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.DirectMessages,
    ],
  });

  // When the client is ready, run this code (only once).
  // The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
  // It makes some properties non-nullable.
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Bot is ready as ${readyClient.user?.tag}! 🎸😸`);
  });

  client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }
    const { commandName } = interaction;
    if (commands[commandName as keyof typeof commands]) {
      commands[commandName as keyof typeof commands].execute(interaction);
    }
  });

  // Log in to Discord with your client's token
  client.login(TOKEN);
};
