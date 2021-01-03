import { existsSync, readFileSync } from "fs";

let CREDENTIALS_FILE_CACHE: Record<string, string> | null = null;

export const cachedGetCredentials = (key: string): string => {
  if (!CREDENTIALS_FILE_CACHE && existsSync("src/credentials.json")) {
    const fileData = readFileSync("src/credentials.json", "utf8");
    CREDENTIALS_FILE_CACHE = JSON.parse(fileData);
  }

  if (CREDENTIALS_FILE_CACHE && CREDENTIALS_FILE_CACHE[key]) {
    return CREDENTIALS_FILE_CACHE[key];
  }

  const uppercaseKey = key.toUpperCase();

  if (process.env[uppercaseKey]) {
    return process.env[uppercaseKey] as string;
  }

  throw new Error(`Could not find ${key}. Please either provide src/credentials.json or ${uppercaseKey} env variable.`);
};
