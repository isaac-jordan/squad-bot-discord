import {
  Message, MessageAttachment, CategoryChannel, GuildChannel, GuildChannelManager, Constants,
} from "discord.js";

export const isCategoryChannel = (channel: GuildChannel): channel is CategoryChannel => {
  return channel.type === "category" && (channel as CategoryChannel).children !== undefined;
};

export const getVoiceChannelsUnderCategory = (channels: GuildChannelManager, category: string): GuildChannel[] => {
  return channels.cache.array()
    .filter((channel) => { return channel.name.toLowerCase().includes(category.toLowerCase()); })
    .flatMap((channel) => {
      if (isCategoryChannel(channel)) {
        return channel.children.array()
          .filter((childChannel) => { return childChannel.type === "voice"; });
      }
      return [];
    });
};

export interface replyInChannelOrFallbackToDirectMessageArgs {
  msgToReplyTo: Message;
  responseText: string;
  responseAttachment?: MessageAttachment
}
export const replyInChannelOrFallbackToDirectMessage = ({ msgToReplyTo, responseText, responseAttachment }: replyInChannelOrFallbackToDirectMessageArgs): void => {
  // Attempt to reply to the message first
  msgToReplyTo.reply(responseText, responseAttachment)
    .catch((replyErr) => {
      // Replying didn't work
      if (replyErr.code === Constants.APIErrors.MISSING_PERMISSIONS) {
        // This can happen if the bot doesn't have permissions to post
        // in the channel the command was entered in
        console.log("Could not reply to command due to missing permissions. Attempting to send as DM.");
        msgToReplyTo.author.send(
          `I couldn't respond in the channel due to permissions, so here it is delivered straight to your inbox: \n${responseText}`,
          responseAttachment,
        ).catch((dmError) => {
          console.error("Could not send attachment as DM due to error:", dmError);
        });
      } else {
        console.error("Unknown error when responding to message with attachment:", replyErr);
      }
    });
};
