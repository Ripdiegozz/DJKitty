import { CommandInteraction } from "discord.js";
import { SuccessEmbed, WarningEmbed } from "../modules/embeds";
import { GuildQueue } from "discord-player";

export const data = {
  id: "voldown",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction: CommandInteraction, queue: GuildQueue) {
  if (queue.node.volume === 0) {
    return interaction.reply({
      ephemeral: true,
      embeds: [WarningEmbed("Volume is already at minimum.")],
    });
  }

  const level = Math.max(queue.node.volume - 10, 0);

  queue.node.setVolume(level);

  return interaction.reply({
    embeds: [SuccessEmbed(`Volume decreased to ${level}%.`)],
  });
}
