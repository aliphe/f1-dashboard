import {
  ApiResponse,
  Circuit,
  Driver,
  Race,
  RaceResult,
  DriverStanding,
  Team,
  TeamStanding,
} from '@f1-dashboard/api-interfaces';
import axios from 'axios';

export default class Api {
  static fetchCircuits() {
    return axios.get<ApiResponse<{ circuits: Circuit[] }>>(`/api/circuits`);
  }

  static async fetchDriversByYear(year: number) {
    const res = await axios.get<ApiResponse<{ drivers: Driver[] }>>(
      `/api/drivers?year=${year}`
    );
    return res;
  }

  static fetchRaces(year: number) {
    return axios.get<ApiResponse<{ races: Race[] }>>(`/api/races?year=${year}`);
  }

  static fetchRaceResults(year: number, round: number) {
    return axios.get<ApiResponse<{ results: RaceResult[] }>>(
      `/api/races/results?year=${year}&round=${round}`
    );
  }

  static async fetchDriversStandingsByYear(year: number) {
    const res = await axios.get<
      ApiResponse<{ driverStandings: DriverStanding[] }>
    >(`/api/standings/drivers?year=${year}`);
    return res;
  }

  static async fetchTeamsStandingsByYear(year: number) {
    const res = await axios.get<ApiResponse<{ teamStandings: TeamStanding[] }>>(
      `/api/standings/teams?year=${year}`
    );
    return res;
  }

  static async fetchTeamsByYear(year: number) {
    const res = await axios.get<ApiResponse<{ teams: Team[] }>>(
      `/api/teams?year=${year}`
    );
    return res;
  }
}
