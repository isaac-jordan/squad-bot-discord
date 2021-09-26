import { Message, MessageAttachment } from "discord.js";
import moment from "moment";
import { getVoiceChannelsUnderCategory, replyInChannelOrFallbackToDirectMessage } from "../discord_helpers";
import { convertChannelListToTxt } from "../output_helpers";
import { GAME_SHORTCUT_NAMES } from "./bot_utils";

export const SQUAD_BOT_INVOCATION_COMMAND = "!squadbot";

export const handleSquadDump = (msg: Message): void => {
  const { guild } = msg;
  if (!guild?.available) {
    console.warn("No guild available for msg.", msg);
    return;
  }

  // For example:
  // !squadbot HLL
  // would become:
  // !squadbot Hell Let Loose
  const userEnteredCategory = msg.content.substr(SQUAD_BOT_INVOCATION_COMMAND.length).trim();
  const categoryToSearchFor = GAME_SHORTCUT_NAMES[userEnteredCategory.toLowerCase()] || userEnteredCategory;

  const foundChannels = getVoiceChannelsUnderCategory(guild.channels, categoryToSearchFor);

  if (foundChannels.length === 0) {
    replyInChannelOrFallbackToDirectMessage({
      msgToReplyTo: msg,
      responseText: `Could not find any channels under the ${categoryToSearchFor} category. `
        + `Please use '${SQUAD_BOT_INVOCATION_COMMAND} <gamename>' and ensure you have at least one `
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
