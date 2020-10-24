import { GuildChannel } from "discord.js";

export const convertChannelListToTxt = (channels: GuildChannel[]): {
  outputText: string;
  totalMemberCount: number;
} => {
  const outputArr: string[] = [];
  let totalMemberCount = 0;
  channels.forEach((channel) => {
    const members = Array.from(
      // Retrieve member from Collection<SnowFlake, GuildMember>
      channel.members.map((member) => {
        return member;
      }),
    );

    console.log(`Found ${members.length} members in: ${channel.name}`);
    totalMemberCount += members.length;
    outputArr.push(`${channel.name} (Total: ${members.length})\n`);

    members.forEach((member) => {
      outputArr.push(`${member.user.username}\n`);
      console.log(member.user.username);
    });
    outputArr.push("\n");
  });

  return {
    outputText: outputArr.join(""),
    totalMemberCount,
  };
};
