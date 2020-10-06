import { GuildChannel } from "discord.js";

export const convertChannelListToTxt = (channels: GuildChannel[]): string => {
  const outputArr: string[] = [];
  channels.forEach((channel) => {
    console.log(`Members in: ${channel.name}`);
    outputArr.push(`${channel.name}\n`);
    channel.members.forEach((member) => {
      outputArr.push(`${member.user.username}\n`);
      console.log(member.user.username);
    });
    outputArr.push("\n");
  });

  return outputArr.join("");
};
