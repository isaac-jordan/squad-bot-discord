import {
  Message, MessageAttachment, CategoryChannel, GuildChannel, GuildChannelManager,
} from 'discord.js';
import { convertChannelListToTxt } from './output_helpers';

const isCategoryChannel = (channel: GuildChannel): channel is CategoryChannel => { return channel.type === 'category' && (channel as CategoryChannel).children !== undefined; };

const getHellLetLooseVoiceChannels = (channels: GuildChannelManager): GuildChannel[] => {
  return channels.cache.array()
    .filter((channel) => { return channel.name.includes('Hell Let Loose'); })
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
  msg.reply('Here are the current squads in Discord!', attachment)
    .catch((err) => { return console.error(err); });
};

export const handleMessage = (msg: Message): void => {
  if (msg.content === '!squaddump') {
    handleSquadDump(msg);
  }
};
