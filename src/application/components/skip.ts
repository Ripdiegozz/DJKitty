import { GuildQueue, QueueRepeatMode } from "discord-player";
import { ErrorEmbed, SuccessEmbed } from "../modules/embeds";
import { CommandInteraction } from "discord.js";

export const data = {
  id: "skip",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction: CommandInteraction, queue: GuildQueue) {
  if (queue.isEmpty() && queue.repeatMode !== QueueRepeatMode.AUTOPLAY) {
    return interaction.reply({
      ephemeral: true,
      embeds: [ErrorEmbed("There is no next song to skip.")],
    });
  }

  queue.node.skip();

  return interaction.reply({
    embeds: [SuccessEmbed("Skipped to the next song.")],
  });
}
