import {
  ConstructorStanding,
  Driver,
  DriverStanding,
} from '@f1-dashboard/api-interfaces';
import {
  driversServiceWrapper,
  standingsServiceWrapper,
} from '../serviceWrappers/formula-one-api';

export default class FormulaOneService {
  async fetchDrivers(year?: number): Promise<Driver[]> {
    const res = await driversServiceWrapper.fetchDrivers(year);
    return res.data.MRData.DriverTable.Drivers;
  }

  async fetchDriverStandings(year?: number): Promise<DriverStanding[]> {
    const res = await standingsServiceWrapper.fetchDriverStandings(year);
    return res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
  }

  async fetchConstructorStandings(
    year?: number
  ): Promise<ConstructorStanding[]> {
    const res = await standingsServiceWrapper.fetchConstructorStandings(year);
    return res.data.MRData.StandingsTable.StandingsLists[0]
      .ConstructorStandings;
  }
}
