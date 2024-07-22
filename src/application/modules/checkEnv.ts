function checkEnv() {
  if (!process.env["DISCORD_TOKEN"]) {
    throw new Error(
      "[ENV]: 'DISCORD_TOKEN' is missing. Bot will not function without it."
    );
  }
}

checkEnv();
