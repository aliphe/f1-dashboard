import {
  Response,
  DriverStanding,
  TeamStanding,
} from '@f1-dashboard/api-interfaces';
import axios from 'axios';

export default class StandingsAPI {
  static async fetchDriversStandingsByYear(year: number) {
    const res = await axios.get<
      Response<{ driverStandings: DriverStanding[] }>
    >(`/api/standings/drivers?year=${year}`);
    return res;
  }

  static async fetchTeamsStandingsByYear(year: number) {
    const res = await axios.get<Response<{ teamStandings: TeamStanding[] }>>(
      `/api/standings/teams?year=${year}`
    );
    return res;
  }
}
