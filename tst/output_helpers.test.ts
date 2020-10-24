import { GuildChannel } from "discord.js";
import { convertChannelListToTxt } from "../src/output_helpers";

describe("output_helpers", () => {
  describe("convertChannelListToTxt", () => {
    it("doesn't fail when no channels match", () => {
      const channels: GuildChannel[] = [];
      const result = convertChannelListToTxt(channels);
      expect(result).toStrictEqual({
        outputText: "",
        totalMemberCount: 0,
      });
    });
  });
});
