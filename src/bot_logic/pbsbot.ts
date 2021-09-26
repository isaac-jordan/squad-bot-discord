import { Message, MessageAttachment } from "discord.js";
import { replyInChannelOrFallbackToDirectMessage } from "../discord_helpers";

export const PBS_BOT_INVOCATION_COMMAND = "!pbsbot";

export const handlePbsBot = (msg: Message): void => {
  if (msg.content.startsWith(`${PBS_BOT_INVOCATION_COMMAND} join`)) {
    replyInChannelOrFallbackToDirectMessage({
      msgToReplyTo: msg,
      responseText: "Doesn't everyone already know you can join PBS by heading to <https://pbsgameteam.com/join-us/> and introducing yourself on our forum?!\n"
        + "Oh well, at least they know now.",
      // Could be a local image path, or a URL
      // responseAttachment: new MessageAttachment("https://pbsgameteam.com/wp-content/uploads/2015/02/eagle-trace.png"),
      responseAttachment: new MessageAttachment("src/images/pbs-eagle.png"),
    });
  } else {
    replyInChannelOrFallbackToDirectMessage({
      msgToReplyTo: msg,
      responseText: "Sorry buddy - pbsbot doesn't know what you're asking for! Maybe pester Sheepzez?",
    });
  }
};
