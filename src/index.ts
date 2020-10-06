import Discord from "discord.js";
import { existsSync, readFileSync } from "fs";
import { handleMessage } from "./bot_logic";

const getDiscordBotToken = () => {
  if (existsSync("src/credentials.json")) {
    const fileData = readFileSync("src/credentials.json", "utf8");
    return JSON.parse(fileData).discord_bot_token;
  } if (process.env.DISCORD_BOT_TOKEN) {
    return process.env.DISCORD_BOT_TOKEN;
  }
  throw new Error("Could not find Discord bot token. Please either provide src/credentials.json or DISCORD_BOT_TOKEN env variable.");
};

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on("message", handleMessage);

client.login(getDiscordBotToken());
