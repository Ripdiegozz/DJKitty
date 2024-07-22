import { CommandInteraction } from "discord.js";
import { SuccessEmbed } from "../modules/embeds";
import { GuildQueue } from "discord-player";

export const data = {
  id: "songs_menu",
  queueOnly: true,
  validateVC: true,
};

export async function execute(interaction: CommandInteraction, queue: GuildQueue) {
  const index = Number(interaction);

  queue.node.jump(index);

  return interaction.reply({
    embeds: [SuccessEmbed(`Jumped to the ${index + 1} song.`)],
  });
}
