// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { F1ApiClient } from '@f1-dashboard/api-clients'; // Don't know why I need this since api-clients is a lib

import { logger } from '@f1-dashboard/utils';
import CircuitsServiceWrapper from '../serviceWrappers/formula-one-api/circuits';
import DriversServiceWrapper from '../serviceWrappers/formula-one-api/drivers';
import RacesServiceWrapper from '../serviceWrappers/formula-one-api/races';
import StandingsServiceWrapper from '../serviceWrappers/formula-one-api/standings';
import TeamsServiceWrapper from '../serviceWrappers/formula-one-api/teams';
import { environment } from '../../environments/environment';

export default class FetchService {
  private readonly api: F1ApiClient;
  constructor(api?: F1ApiClient) {
    this.api =
      api ||
      new F1ApiClient({
        apiUrl: environment.services.f1Api.url,
        apiKey: environment.services.f1Api.apiKey,
      });
  }

  async fetchSeason(season: number): Promise<void> {
    logger.info(`Starting CRON for season :: ${season}`);
    await this.fetchDrivers(season);
    await this.fetchCircuits();
    await this.fetchRaces(season);
    await this.fetchDriverStandings(season);
    await this.fetchTeams(season);
    await this.fetchTeamstandings(season);

    logger.info(`Ending CRON for season :: ${season}`);
  }

  async fetchSeasonRound(season: number, round: number): Promise<void> {
    await this.fetchRaceResults(season, round);
  }

  async fetchDrivers(season: number): Promise<void> {
    logger.info(`Fetching drivers`);
    const drivers = await DriversServiceWrapper.fetchDrivers(season);
    logger.info({ drivers }, `Fetched drivers`);
    await this.api.insertDrivers(season, {
      drivers,
    });
    logger.info('Upserted drivers successfully.');
  }

  async fetchCircuits(): Promise<void> {
    const circuits = await CircuitsServiceWrapper.fetchCircuits();
    logger.info({ circuits }, `Fetched circuits`);
    await this.api.insertCircuits({
      circuits,
    });
    logger.info('Upserted circuits successfully');
  }

  async fetchRaces(season: number): Promise<void> {
    const races = await RacesServiceWrapper.fetchRaces(season);
    logger.info({ races }, `Fetched races`);
    await this.api.insertRaces(season, {
      races,
    });
    logger.info('Upserted races successfully');
  }

  async fetchDriverStandings(season: number): Promise<void> {
    const driverStandings = await StandingsServiceWrapper.fetchDriverStandings(
      season
    );
    logger.info({ driverStandings }, `Fetched Drivers Standings`);
    await this.api.insertDriversStandings(season, { driverStandings });
    logger.info('Upserted Drivers Standings successfully');
  }

  async fetchTeams(season: number): Promise<void> {
    logger.info(`Fetching teams`);
    const teams = await TeamsServiceWrapper.fetchTeams(season);
    logger.info({ teams }, `Fetched teams`);
    await this.api.insertTeams(season, {
      teams,
    });
    logger.info('Upserted teams successfully.');
  }

  async fetchTeamstandings(season: number): Promise<void> {
    const teamStandings = await StandingsServiceWrapper.fetchTeamStandings(
      season
    );
    logger.info({ teamStandings }, `Fetched team Standings`);
    await this.api.insertTeamsStandings(season, {
      teamStandings,
    });
    logger.info('Upserted Teams Standings successfully');
  }

  async fetchRaceResults(season: number, round: number): Promise<void> {
    const raceResults = await RacesServiceWrapper.fetchRaceResults(
      season,
      round
    );
    logger.info({ raceResults }, `Fetched Race results`);
    await this.api.insertRaceResults(season, round, {
      raceResults: raceResults.results,
    });
    logger.info('Upserted Race Results successfully');
  }
}
