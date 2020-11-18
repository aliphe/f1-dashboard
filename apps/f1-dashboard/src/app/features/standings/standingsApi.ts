import {
  Response,
  DriverStanding,
  ConstructorStanding,
} from '@f1-dashboard/api-interfaces';
import axios from 'axios';

export default class StandingsAPI {
  static async fetchDriverStandingsByYear(year: number) {
    const res = await axios.get<
      Response<{ driverStandings: DriverStanding[] }>
    >(`/api/standings/drivers?year=${year}`);
    return res;
  }

  static async fetchConstructorsStandingsByYear(year: number) {
    const res = await axios.get<
      Response<{ constructorStandings: ConstructorStanding[] }>
    >(`/api/standings/constructors?year=${year}`);
    return res;
  }
}
