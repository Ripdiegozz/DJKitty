// Require the necessary discord.js classes
import { Client, Events, GatewayIntentBits } from "discord.js";
import { Player, QueryType } from "discord-player";
import { deployCommands } from "../../application/command-deploy";
import { commands } from "../../application/commands";

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
      GatewayIntentBits.GuildVoiceStates,
    ],
  });

  // Create a new player
  const player = new Player(client);

  // When the client is ready, run this code (only once).
  // The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
  // It makes some properties non-nullable.
  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Bot is ready as ${readyClient.user?.tag}! 🎸😸`);
  });

  // When a new guild is joined, deploy the commands in that guild
  client.on("guildCreate", async (guild) => {
    await deployCommands({ guildId: guild.id });
  });

  // When an interaction is created, check if it's a command and execute it
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    const { commandName } = interaction;

    if (commands[commandName as keyof typeof commands]) {
      commands[commandName as keyof typeof commands].execute(interaction);
    }
  });

  // Add the player events to the client
  // this event is emitted whenever discord-player starts to play a track
  player.events.on("playerStart", (queue, track) => {
    // we will later define queue.metadata object while creating the queue
    queue.metadata.channel.send(`Started playing **${track.title}**!`);
  });

  // this event is emitted whenever discord-player gets an error
  player.on("error", (error: Error) => {
    console.log(
      `[${error.name}] Error emitted from the queue: ${error.message}`
    );
  });

  // Log in to Discord with your client's token
  client.login(TOKEN);
};
