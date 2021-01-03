import {
  Message, MessageAttachment,
} from "discord.js";
import moment from "moment";
import { getServersPlayerCount } from "./battlemetrics_helpers";
import { getVoiceChannelsUnderCategory, replyInChannelOrFallbackToDirectMessage } from "./discord_helpers";
import { convertChannelListToTxt } from "./output_helpers";

const squadBotInvocationCommand = "!squadbot";
const shortcutNames: Record<string, string> = {
  hll: "Hell Let Loose",
  rs2: "Rising Storm 2",
};

const seedBotInvocationCommand = "!seedbot";

const handleSquadDump = (msg: Message): void => {
  const { guild } = msg;
  if (!guild?.available) {
    console.warn("No guild available for msg.", msg);
    return;
  }

  // For example:
  // !squadbot HLL
  // would become:
  // !squadbot Hell Let Loose
  const userEnteredCategory = msg.content.substr(squadBotInvocationCommand.length).trim();
  const categoryToSearchFor = shortcutNames[userEnteredCategory.toLowerCase()] || userEnteredCategory;

  const foundChannels = getVoiceChannelsUnderCategory(guild.channels, categoryToSearchFor);

  if (foundChannels.length === 0) {
    replyInChannelOrFallbackToDirectMessage({
      msgToReplyTo: msg,
      responseText: `Could not find any channels under the ${categoryToSearchFor} category. `
        + `Please use '${squadBotInvocationCommand} <gamename>' and ensure you have at least one `
        + `category in Discord containing the word(s) '${categoryToSearchFor}'.`,
    });
    return;
  }

  const { outputText, totalMemberCount } = convertChannelListToTxt(
    getVoiceChannelsUnderCategory(guild.channels, categoryToSearchFor)
      .sort((a, b) => { return a.rawPosition - b.rawPosition; }),
  );

  const outputAttachment = Buffer.from(outputText, "utf8");

  const currentDate = moment().format("YYYY-MM-DD-HH-mm");
  const attachment = new MessageAttachment(outputAttachment, `${categoryToSearchFor.toLowerCase()}-squads-${currentDate}.txt`);

  replyInChannelOrFallbackToDirectMessage({
    msgToReplyTo: msg,
    responseText: `Here are the current ${categoryToSearchFor} squads in Discord! A total of ${totalMemberCount} member(s).`,
    responseAttachment: attachment,
  });
};

const handleSeedBot = async (msg: Message) => {
  const { guild } = msg;
  if (!guild?.available) {
    console.warn("No guild available for msg.", msg);
    return;
  }

  // For example:
  // !squadbot HLL
  // would become:
  // !squadbot Hell Let Loose
  const userEnteredCategory = msg.content.substr(squadBotInvocationCommand.length).trim();
  const categoryToSearchFor = shortcutNames[userEnteredCategory.toLowerCase()] || userEnteredCategory;

  if (categoryToSearchFor !== "Hell Let Loose") {
    replyInChannelOrFallbackToDirectMessage({
      msgToReplyTo: msg,
      responseText: "SeedBot currently only supports Hell Let Loose (HLL) servers. Please annoy Sheepzez to fix this.",
    });
    return;
  }

  const serverStatus = await getServersPlayerCount(categoryToSearchFor);

  const serversToSeed = serverStatus.filter((status) => { return status.playerCount < 70; });

  if (serversToSeed.length > 0) {
    replyInChannelOrFallbackToDirectMessage({
      msgToReplyTo: msg,
      responseText: `All seeders, please seed ${serversToSeed[0].name}`,
    });
  } else {
    replyInChannelOrFallbackToDirectMessage({
      msgToReplyTo: msg,
      responseText: "All servers happy!",
    });
  }
};

export const handleMessage = (msg: Message): void => {
  if (msg.content.startsWith(squadBotInvocationCommand)) {
    handleSquadDump(msg);
  } else if (msg.content.startsWith(seedBotInvocationCommand)) {
    handleSeedBot(msg);
  }
};
