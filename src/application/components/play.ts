import { CommandInteraction } from "discord.js";
import { SuccessEmbed } from "../modules/embeds";
import { GuildQueue } from "discord-player";

export const data = {
  id: "play",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction: CommandInteraction, queue: GuildQueue) {
  if (queue.node.isPaused()) {
    queue.node.resume();
  } else {
    queue.node.pause();
  }

  return interaction.reply({
    embeds: [
      SuccessEmbed(
        `${queue.node.isPaused() ? "Paused" : "Resumed"} the playback.`
      ),
    ],
  });
}
