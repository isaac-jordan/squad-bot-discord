import { Message } from "discord.js";
import { getServersPlayerCount } from "../battlemetrics_helpers";
import { replyInChannelOrFallbackToDirectMessage } from "../discord_helpers";
import { GAME_SHORTCUT_NAMES } from "./bot_utils";

export const SEED_BOT_INVOCATION_COMMAND = "!seedbot";

export const handleSeedBot = async (msg: Message): Promise<void> => {
  const { guild } = msg;
  if (!guild?.available) {
    console.warn("No guild available for msg.", msg);
    return;
  }

  // For example:
  // !squadbot HLL
  // would become:
  // !squadbot Hell Let Loose
  const userEnteredCategory = msg.content.substr(SEED_BOT_INVOCATION_COMMAND.length).trim();
  const categoryToSearchFor = GAME_SHORTCUT_NAMES[userEnteredCategory.toLowerCase()] || userEnteredCategory;

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