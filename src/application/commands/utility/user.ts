import { CommandInteraction, SlashCommandBuilder } from "discord.js";

const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Provides information about the user.");

const execute = async (interaction: CommandInteraction) => {
  // interaction.user is the object representing the User who ran the command
  // interaction.member is the GuildMember object, which represents the user in the specific guild
  const guildMembers = await interaction.guild?.members.fetch();
  
  const member = guildMembers?.get(interaction.user.id);

  const joinedAtTimestamp = member?.joinedTimestamp;

  if (!joinedAtTimestamp) {
    await interaction.reply("Failed to retrieve user information.");
    return;
  }

  const joinedAt = new Date(joinedAtTimestamp);

  await interaction.reply(
    `This command was run by ${
      interaction.user.username
    }, who joined on ${joinedAt.toLocaleDateString()}.`
  );
};

export { data, execute };
