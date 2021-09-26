import axios from "axios";
import { cachedGetCredentials } from "./utils";

const KNOWN_SERVERS_LIST: Record<string, string[]> = {
  "hell let loose": [
    "9262729", // HLL #1
    "9306871", // HLL #2
    "9445914", // HLL #3
  ],
};

const config = {
  headers: { Authorization: `Bearer ${cachedGetCredentials("battlemetrics_token")}` },
};

interface ServerPlayerCount {
  name: string;
  playerCount: number;
}
export const getServersPlayerCount = async (gamename: string): Promise<ServerPlayerCount[]> => {
  const serversForGame = KNOWN_SERVERS_LIST[gamename.toLowerCase()];
  console.log(`Checking ${serversForGame.length} servers for game ${gamename}.`);

  const results = await Promise.all(
    serversForGame.map((serverId) => {
      return axios.get(
        `https://api.battlemetrics.com/servers/${serverId}`,
        config,
      )
        .then((response: any) => {
          return {
            name: response.data.data.attributes.name,
            playerCount: response.data.data.attributes.players,
          } as ServerPlayerCount;
        })
        .catch((error: any) => {
          console.log(error);
        });
    }),
  );

  return results.filter(Boolean) as ServerPlayerCount[]; // Why does this need a cast?!
};
