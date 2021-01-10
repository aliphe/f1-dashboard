import { config as dotenvConfig } from 'dotenv';
import {
  Response,
  Driver,
  Circuit,
  DriverStanding,
  TeamStanding,
} from '@f1-dashboard/api-interfaces';
import { logger } from '@f1-dashboard/utils';
import Axios, { AxiosInstance } from 'axios';
import CircuitsServiceWrapper from './app/serviceWrappers/formula-one-api/circuits';
import DriversServiceWrapper from './app/serviceWrappers/formula-one-api/drivers';
import RacesServiceWrapper from './app/serviceWrappers/formula-one-api/races';
import { environment } from './environments/environment';
import StandingsServiceWrapper from './app/serviceWrappers/formula-one-api/standings';

dotenvConfig();

async function main() {
  const season = environment.crons.fetch.season;
  if (!season) {
    throw new Error('Missing FETCH_CRON_SEASON in env');
  }
  const axios = Axios.create({
    baseURL: environment.services.entities.url,
  });

  logger.info(`Starting CRON for season :: ${season}`);
  await fetchDrivers(axios, season);
  await fetchCircuits(axios);
  await fetchRaces(axios, season);
  await fetchDriverStandings(axios, season);
  await fetchTeamstandings(axios, season);

  logger.info(`Ending CRON for season :: ${season}`);
}

async function fetchDrivers(
  axios: AxiosInstance,
  season: number
): Promise<void> {
  logger.info(`Fetching drivers`);
  const drivers = await DriversServiceWrapper.fetchDrivers(season);
  logger.info({ drivers }, `Fetched drivers`);
  const driversRes = await axios.post<Response<Driver[]>>('/drivers', {
    drivers,
    season,
  });
  if (driversRes.status === 201) {
    logger.info('Upserted drivers successfully.');
  } else {
    throw new Error(`Failed to upsert drivers : ${driversRes.data.message}`);
  }
}

async function fetchCircuits(axios: AxiosInstance): Promise<void> {
  const circuits = await CircuitsServiceWrapper.fetchCircuits();
  logger.info({ circuits }, `Fetched circuits`);
  const circuitsRes = await axios.post<Response<Circuit[]>>('/circuits', {
    circuits,
  });
  if (circuitsRes.status === 201) {
    logger.info('Upserted circuits successfully');
  } else {
    throw new Error(`Failed to upsert circuits : ${circuitsRes.data.message}`);
  }
}

async function fetchRaces(axios: AxiosInstance, season: number): Promise<void> {
  const races = await RacesServiceWrapper.fetchRaces(season);
  logger.info({ races }, `Fetched races`);
  const racesRes = await axios.post<Response<Circuit[]>>('/races', {
    races,
    season,
  });
  if (racesRes.status === 201) {
    logger.info('Upserted races successfully');
  } else {
    throw new Error(`Failed to upsert races : ${racesRes.data.message}`);
  }
}

async function fetchDriverStandings(
  axios: AxiosInstance,
  season: number
): Promise<void> {
  const driversStandings = await StandingsServiceWrapper.fetchDriverStandings(
    season
  );
  logger.info({ driversStandings }, `Fetched driver Standings`);
  const driversStandingsRes = await axios.post<Response<DriverStanding[]>>(
    '/standings/drivers',
    {
      driversStandings,
      season,
    }
  );
  if (driversStandingsRes.status === 201) {
    logger.info('Upserted Drivers Standings successfully');
  } else {
    throw new Error(
      `Failed to upsert drivers standings: ${driversStandingsRes.data.message}`
    );
  }
}

async function fetchTeamstandings(
  axios: AxiosInstance,
  season: number
): Promise<void> {
  const teamsStandings = await StandingsServiceWrapper.fetchTeamStandings(
    season
  );
  logger.info({ teamsStandings }, `Fetched team Standings`);
  const teamsStandingsRes = await axios.post<Response<TeamStanding[]>>(
    '/standings/teams',
    {
      teamsStandings,
      season,
    }
  );
  if (teamsStandingsRes.status === 201) {
    logger.info('Upserted Teams Standings successfully');
  } else {
    throw new Error(
      `Failed to upsert teams standings: ${teamsStandingsRes.data.message}`
    );
  }
}

main();
