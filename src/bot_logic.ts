import {
  Message,
} from "discord.js";
import { handlePbsBot, PBS_BOT_INVOCATION_COMMAND } from "./bot_logic/pbsbot";
import { handleSeedBot, SEED_BOT_INVOCATION_COMMAND } from "./bot_logic/seedbot";
import { handleSquadDump, SQUAD_BOT_INVOCATION_COMMAND } from "./bot_logic/squadbot";

export const handleMessage = (msg: Message): void => {
  if (msg.content.startsWith(SQUAD_BOT_INVOCATION_COMMAND)) {
    handleSquadDump(msg);
  } else if (msg.content.startsWith(SEED_BOT_INVOCATION_COMMAND)) {
    handleSeedBot(msg);
  } else if (msg.content.startsWith(PBS_BOT_INVOCATION_COMMAND)) {
    handlePbsBot(msg);
  }
};
