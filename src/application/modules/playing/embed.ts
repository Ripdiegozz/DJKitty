import { GuildQueue, Track } from "discord-player";
import sourceIcons from "../../../infrastructure/helpers/source-icons";
import { BaseEmbed } from "../embeds.js";

export default (queue: GuildQueue, track: Track) => {
  if (!track) track = queue.currentTrack as Track;
  const repeatMode = {
    0: "Off",
    1: "Track",
    2: "Queue",
    3: "Autoplay",
  }[queue.repeatMode];

  const status = `Duration: ${track.duration}  |  Volume:  ${queue.node.volume}%
Repeat: ${repeatMode}  |  Shuffling: ${queue.isShuffling ? "✅" : "❌"}`;

  if (
    track.source !== "youtube" &&
    track.source !== "soundcloud" &&
    track.source !== "spotify" &&
    track.source !== "apple_music"
  ) {
    throw new Error("Unsupported source.");
  }

  return BaseEmbed()
    .setAuthor({
      name: `Now ${queue.node.isPaused() ? "Paused" : "Playing"}`,
      iconURL:
        sourceIcons[track.source] ??
        queue.player.client.user?.displayAvatarURL(),
    })
    .setDescription(
      `${track.toHyperlink()} ~ [${track.requestedBy?.toString()}]`
    )
    .setImage(
      track.source === "soundcloud"
        ? track.thumbnail.replace("-large.jpg", "-t500x500.jpg")
        : track.thumbnail
    )
    .setFooter({ text: status });
};
