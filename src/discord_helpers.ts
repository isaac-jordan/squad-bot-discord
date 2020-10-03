import {
  Message, MessageAttachment, CategoryChannel, GuildChannel, GuildChannelManager, Constants,
} from 'discord.js';
import { convertChannelListToTxt } from './output_helpers';

const isCategoryChannel = (channel: GuildChannel): channel is CategoryChannel => { return channel.type === 'category' && (channel as CategoryChannel).children !== undefined; };

const getHellLetLooseVoiceChannels = (channels: GuildChannelManager): GuildChannel[] => {
  return channels.cache.array()
    .filter((channel) => { return channel.name.toLowerCase().includes('hell let loose'); })
    .flatMap((channel) => {
      if (isCategoryChannel(channel)) {
        return channel.children.array()
          .filter((childChannel) => { return childChannel.type === 'voice'; });
      }
      return [];
    });
};

const handleSquadDump = (msg: Message): void => {
  const { guild } = msg;
  if (!guild?.available) {
    console.warn('No guild available for msg.', msg);
    return;
  }

  const outputTxt = convertChannelListToTxt(
    getHellLetLooseVoiceChannels(guild.channels)
      .sort((a, b) => { return a.rawPosition - b.rawPosition; }),
  );

  const outputAttachment = Buffer.from(outputTxt, 'utf8');

  const attachment = new MessageAttachment(outputAttachment, 'squads.txt');

  // Attempt to reply to the message first
  msg.reply('Here are the current squads in Discord!', attachment)
    .catch((replyErr) => {
      // Replying didn't work
      if (replyErr.code === Constants.APIErrors.MISSING_PERMISSIONS) {
        // This can happen if the bot doesn't have permissions to post
        // in the channel the command was entered in
        console.log('Could not reply to command due to missing permissions. Attempting to send as DM.');
        msg.author.send('I couldn\'t respond in the channel due to permissions, so here are the current squads in Discord, straight to your inbox!', attachment)
          .catch((dmError) => {
            console.error('Could not send attachment as DM due to error:', dmError);
          });
      } else {
        console.error('Unknown error when responding to message with attachment:', replyErr);
      }
    });
};

export const handleMessage = (msg: Message): void => {
  if (msg.content === '!squaddump') {
    handleSquadDump(msg);
  }
};
