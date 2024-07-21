import dotenv from "dotenv";

dotenv.config();

const {
  DISCORD_BOT_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_PUBLIC_KEY,
} = process.env;

if (
  !DISCORD_BOT_TOKEN ||
  !DISCORD_CLIENT_ID ||
  !DISCORD_CLIENT_SECRET ||
  !DISCORD_PUBLIC_KEY
) {
  throw new Error(`-----------------------------------
    💀 FATAL ERROR: MISSING VARIABLES ❓
    The DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, and DISCORD_PUBLIC_KEY environment variables must be set.
    -----------------------------------`);
}

export const config = {
  DISCORD_BOT_TOKEN,
  DISCORD_CLIENT_ID,
  DISCORD_CLIENT_SECRET,
  DISCORD_PUBLIC_KEY,
};
