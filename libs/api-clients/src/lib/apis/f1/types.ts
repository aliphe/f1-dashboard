import {
  ApiResponse,
  Driver,
  Team,
  Circuit,
  Race,
  RaceResult,
  DriverStanding,
  TeamStanding,
} from '@f1-dashboard/api-interfaces';

/**
 * @description Races
 */
export type FetchRacesResponse = ApiResponse<{ races: Race[] }>;

export type InsertRacesBody = { races: Race[] };
export type InsertRacesResponse = ApiResponse<{ races: Race[] }>;

/**
 * @description Races Results
 */
export type FetchRaceResultsResponse = ApiResponse<{
  raceResults: RaceResult[];
}>;

export type InsertRaceResultsBody = { raceResults: RaceResult[] };
export type InsertRaceResultsResponse = ApiResponse<{
  raceResults: RaceResult[];
}>;

/**
 * @description Drivers standings
 */
export type FetchDriverStandingsResponse = ApiResponse<{
  driverStandings: DriverStanding[];
}>;

export type InsertDriverStandingsBody = { driverStandings: DriverStanding[] };
export type InsertDriverStandingsResponse = ApiResponse<{
  driverStandings: DriverStanding[];
}>;

/**
 * @description Teams standings
 */
export type FetchTeamStandingsResponse = ApiResponse<{
  teamStandings: TeamStanding[];
}>;

export type InsertTeamStandingsBody = { teamStandings: TeamStanding[] };
export type InsertTeamStandingsResponse = ApiResponse<{
  teamStandings: TeamStanding[];
}>;

/**
 * @description Circuits
 */
export type FetchCircuitsResponse = ApiResponse<{
  circuits: Circuit[];
}>;

export type InsertCircuitsBody = { circuits: Circuit[] };
export type InsertCircuitsResponse = ApiResponse<{
  circuits: Circuit[];
}>;

/**
 * @description Driver
 */
export type FetchDriversResponse = ApiResponse<{
  drivers: Driver[];
}>;

export type InsertDriversBody = { drivers: Driver[] };
export type InsertDriversResponse = ApiResponse<{
  drivers: Driver[];
}>;

/**
 * @description Team
 */
export type FetchTeamsResponse = ApiResponse<{
  teams: Team[];
}>;

export type InsertTeamsBody = { teams: Team[] };
export type InsertTeamsResponse = ApiResponse<{
  teams: Team[];
}>;
