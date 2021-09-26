import Discord from "discord.js";
import { handleMessage } from "./bot_logic";
import { cachedGetCredentials } from "./utils";

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on("message", handleMessage);

client.login(cachedGetCredentials("discord_bot_token"));
