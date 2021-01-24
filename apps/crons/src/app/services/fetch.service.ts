import { Driver, Circuit, DriverStanding, TeamStanding, Response } from "@f1-dashboard/api-interfaces";
import { logger } from "@f1-dashboard/utils";
import Axios, { AxiosInstance } from "axios";
import { environment } from "../../environments/environment";
import CircuitsServiceWrapper from "../serviceWrappers/formula-one-api/circuits";
import DriversServiceWrapper from "../serviceWrappers/formula-one-api/drivers";
import RacesServiceWrapper from "../serviceWrappers/formula-one-api/races";
import StandingsServiceWrapper from "../serviceWrappers/formula-one-api/standings";

export default class FetchService {
  private readonly http: AxiosInstance
  constructor(http?: AxiosInstance) {
    this.http = http || Axios.create({
      baseURL: environment.services.entities.url,
      headers: {
        apiKey: environment.services.entities.apiKey,
      }
    })
  }

  async fetchSeason(season: number): Promise<void> {
    logger.info(`Starting CRON for season :: ${season}`);
    await this.fetchDrivers(season);
    await this.fetchCircuits();
    await this.fetchRaces(season);
    await this.fetchDriverStandings(season);
    await this.fetchTeamstandings(season);
  
    logger.info(`Ending CRON for season :: ${season}`);
  
  }
  async fetchDrivers(
    season: number
  ): Promise<void> {
    logger.info(`Fetching drivers`);
    const drivers = await DriversServiceWrapper.fetchDrivers(season);
    logger.info({ drivers }, `Fetched drivers`);
    const driversRes = await this.http.post<Response<Driver[]>>('/drivers', {
      drivers,
      season,
    });
    if (driversRes.status === 201) {
      logger.info('Upserted drivers successfully.');
    } else {
      throw new Error(`Failed to upsert drivers : ${driversRes.data.message}`);
    }
  }
  
  async fetchCircuits(): Promise<void> {
    const circuits = await CircuitsServiceWrapper.fetchCircuits();
    logger.info({ circuits }, `Fetched circuits`);
    const circuitsRes = await this.http.post<Response<Circuit[]>>('/circuits', {
      circuits,
    });
    if (circuitsRes.status === 201) {
      logger.info('Upserted circuits successfully');
    } else {
      throw new Error(`Failed to upsert circuits : ${circuitsRes.data.message}`);
    }
  }
  
  async fetchRaces(season: number): Promise<void> {
    const races = await RacesServiceWrapper.fetchRaces(season);
    logger.info({ races }, `Fetched races`);
    const racesRes = await this.http.post<Response<Circuit[]>>('/races', {
      races,
      season,
    });
    if (racesRes.status === 201) {
      logger.info('Upserted races successfully');
    } else {
      throw new Error(`Failed to upsert races : ${racesRes.data.message}`);
    }
  }
  
  async fetchDriverStandings(
    season: number
  ): Promise<void> {
    const driversStandings = await StandingsServiceWrapper.fetchDriverStandings(
      season
    );
    logger.info({ driversStandings }, `Fetched driver Standings`);
    const driversStandingsRes = await this.http.post<Response<DriverStanding[]>>(
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
  
  async fetchTeamstandings(
    season: number
  ): Promise<void> {
    const teamsStandings = await StandingsServiceWrapper.fetchTeamStandings(
      season
    );
    logger.info({ teamsStandings }, `Fetched team Standings`);
    const teamsStandingsRes = await this.http.post<Response<TeamStanding[]>>(
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

}