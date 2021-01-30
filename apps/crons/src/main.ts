import { config as dotenvConfig } from 'dotenv';
import { environment } from './environments/environment';
import FetchService from './app/services/fetch.service';

dotenvConfig();

async function main() {
  const season = environment.crons.fetch.season;
  if (!season) {
    throw new Error('Missing FETCH_CRON_SEASON in env');
  }
  const fetchService = new FetchService();

  await fetchService.fetchSeason(season);
  process.exit(0);
}

main();
