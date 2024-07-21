import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Provides information about the server.");

const execute = async (interaction: CommandInteraction) => {
  // interaction.guild is the object representing the Guild in which the command was run
  await interaction.reply(
    `This server is ${interaction.guild?.name} and has ${interaction.guild?.memberCount} members.`
  );
};

export { data, execute };
