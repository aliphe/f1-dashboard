import { config as dotenvConfig } from 'dotenv';
import { environment } from './environments/environment';
import FetchService from './app/services/fetch.service';

dotenvConfig();

/**
 * @description This function aims at fetching every round-level data, like races results
 */
async function main() {
  const season = environment.crons.fetch.season;
  const round = environment.crons.fetch.round;
  if (!season) {
    throw new Error('Missing FETCH_CRON_SEASON in env');
  }
  if (!round) {
    throw new Error('Missing FETCH_CRON_ROUND in env');
  }
  const fetchService = new FetchService();

  await fetchService.fetchSeasonRound(season, round);
}

main();
