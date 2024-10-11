// @ts-check
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { CACHE_DIR } from "./cache.js";

// Define the URL and the output file path
const cacheFile = path.join(CACHE_DIR, "players.json");

export async function initPlayerCache() {
  console.log(`Fetching Players from sleeper.app`);
  try {
    // Fetch data from the URL
    const response = await axios.get("https://api.sleeper.app/v1/players/nfl");

    // Save the data to a JSON file
    await fs.writeFile(
      cacheFile,
      JSON.stringify(response.data, null, 2),
      "utf-8"
    );

    console.log(`Data successfully saved to ${cacheFile}`);
  } catch (error) {
    console.error("Error downloading or saving data:", error.message);
  }
}

export async function usePlayerCache() {
  const contents = await fs.readFile(cacheFile, { encoding: "utf-8" });
  const players = JSON.parse(contents);
  return {
    players,
    getPlayer: (playerId) => players[playerId],
  };
}
