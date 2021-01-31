import { config as dotenvConfig } from 'dotenv';
import { environment } from './environments/environment';
import FetchService from './app/services/fetch.service';

dotenvConfig();

/**
 * @description This function aims at fetching every season-level data, like drivers, teams, races etc.
 */
async function fetchSeason() {
  const season = environment.crons.fetch.season;
  if (!season) {
    throw new Error('Missing FETCH_CRON_SEASON in env');
  }
  const fetchService = new FetchService();

  await fetchService.fetchSeason(season);
}

fetchSeason();
