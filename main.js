// @ts-check
import { usePlayerCache } from "./src/player-cache.js";
import SleeperApi from "./src/sleeper.js";

/**
 * WOUNDED_DUCK_DYNASTY
 */
const LEAGUE_ID = "1129463776308305920";

/**
 * Load the cached player map into memory
 */
const { getPlayer } = await usePlayerCache();

const league = SleeperApi.league(LEAGUE_ID);
const { data: rosters } = await league.rosters();

const enrichedRosters = rosters.map((r) => {
  r.players = r.players.map(getPlayer);
  r.reserve = r.reserve.map(getPlayer);
  r.starters = r.starters.map(getPlayer);
  return r;
});

console.log(enrichedRosters);
