// @ts-check
import { flatObjectMap } from "./src/lib.js";
import { usePlayerCache } from "./src/player-cache.js";
import SleeperApi from "./src/sleeper.js";
import { useWorkbook } from "./src/xlsx.js";

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

// console.log(rosters[0]);
// process.exit();

const enrichedRosters = rosters.map((r) => {
  r.players = r.players.map(getPlayer);
  r.reserve = r.reserve.map(getPlayer);
  r.starters = r.starters.map(getPlayer);
  return r;
});

for (const roster of enrichedRosters) {
  const { utils, appendSheet, writeFile } = useWorkbook();

  const normalPlayers = flatObjectMap(roster.players);
  const playerSheet = utils.json_to_sheet(normalPlayers);
  appendSheet(playerSheet, "Players");

  const normalReserve = flatObjectMap(roster.reserve);
  const reserveSheet = utils.json_to_sheet(normalReserve);
  appendSheet(reserveSheet, "Reserves");

  const normalStarters = flatObjectMap(roster.starters);
  const starterSheet = utils.json_to_sheet(normalStarters);
  appendSheet(starterSheet, "Starters");

  writeFile(`${roster.roster_id}_${roster.owner_id}`);
}
