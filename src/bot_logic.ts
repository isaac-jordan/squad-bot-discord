import {
  Message, MessageAttachment,
} from "discord.js";
import moment from "moment";
import { getVoiceChannelsUnderCategory, replyInChannelOrFallbackToDirectMessage } from "./discord_helpers";
import { convertChannelListToTxt } from "./output_helpers";

const botInvocationCommand = "!squadbot";
const shortcutNames: Record<string, string> = {
  hll: "Hell Let Loose",
  rs2: "Rising Storm 2",
};

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
  const userEnteredCategory = msg.content.substr(botInvocationCommand.length).trim();
  const categoryToSearchFor = shortcutNames[userEnteredCategory.toLowerCase()] || userEnteredCategory;

  const foundChannels = getVoiceChannelsUnderCategory(guild.channels, categoryToSearchFor);

  if (foundChannels.length === 0) {
    replyInChannelOrFallbackToDirectMessage({
      msgToReplyTo: msg,
      responseText: `Could not find any channels under the ${categoryToSearchFor} category. `
        + `Please use '${botInvocationCommand} <gamename>' and ensure you have at least one `
        + `category in Discord containing the word(s) '${categoryToSearchFor}'.`,
    });
    return;
  }

  const outputTxt = convertChannelListToTxt(
    getVoiceChannelsUnderCategory(guild.channels, categoryToSearchFor)
      .sort((a, b) => { return a.rawPosition - b.rawPosition; }),
  );

  const outputAttachment = Buffer.from(outputTxt, "utf8");

  const currentDate = moment().format("YYYY-MM-DD-HH-mm");
  const attachment = new MessageAttachment(outputAttachment, `${categoryToSearchFor.toLowerCase()}-squads-${currentDate}.txt`);

  replyInChannelOrFallbackToDirectMessage({
    msgToReplyTo: msg,
    responseText: `Here are the current ${categoryToSearchFor} squads in Discord!`,
    responseAttachment: attachment,
  });
};

export const handleMessage = (msg: Message): void => {
  if (msg.content.startsWith(botInvocationCommand)) {
    handleSquadDump(msg);
  }
};
