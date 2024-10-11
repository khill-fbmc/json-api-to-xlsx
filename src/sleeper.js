// @ts-check
import { client } from "./client.js";

class Sleeper {
  league(league_id) {
    return League.create(league_id);
  }
}

class League {
  static create(league_id) {
    return new League(league_id);
  }

  constructor(league_id) {
    this.league_id = league_id;
  }

  async rosters() {
    return client.get(`/league/${this.league_id}/rosters`);
  }

  async rosterIds() {
    const { data: rosters } = await this.rosters();
    return rosters.map((r) => r.roster_id);
  }
}

class Roster {
  static create(roster_id) {
    return new Roster(roster_id);
  }

  constructor(roster_id) {
    this.roster_id = roster_id;
  }

  async getRoster() {
    return client.get(`/league/${this.roster_id}/rosters`);
  }
}

const instance = new Sleeper();

export default instance;
