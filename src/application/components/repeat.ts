import { CommandInteraction } from "discord.js";
import { SuccessEmbed } from "../modules/embeds";
import { GuildQueue } from "discord-player";

export const data = {
  id: "repeat",
  queueOnly: true,
  validateVC: true,
};

export function execute(interaction: CommandInteraction, queue: GuildQueue) {
  const mode = (queue.repeatMode + 1) % 4;

  queue.setRepeatMode(mode);

  const status = {
    0: "Turned off repeat mode.",
    1: "Now looping the current song.",
    2: "Now looping the entire queue.",
    3: "Autoplay mode activated.",
  }[mode];

  return interaction.reply({
    embeds: [SuccessEmbed(status as string)],
  });
}
