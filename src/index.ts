import Discord from "discord.js"
import * as discord_helpers from "./discord_helpers"

// Requires a credentials.json file to exist (git ignored)
// JSON file must contain a 'discord_bot_token' key
import credentials from "./credentials.json"

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client?.user?.tag}!`);
});

client.on('message', msg => discord_helpers.handleMessage);

client.login(credentials.discord_bot_token);