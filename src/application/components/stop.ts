import { CommandInteraction } from "discord.js";
import { SuccessEmbed } from "../modules/embeds";
import { GuildQueue } from "discord-player";

export const data = {
  id: "stop",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction: CommandInteraction, queue: GuildQueue) {
  queue.node.stop();

  return interaction.reply({
    embeds: [SuccessEmbed("Stopped the playback.")],
  });
}
