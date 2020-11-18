import axios from 'axios';
import { RequestResponse } from '.';
import {
  ConstructorStanding,
  DriverStanding,
} from '@f1-dashboard/api-interfaces';

import { environment } from '../../../environments/environment';

export type DriverStandingsRequestResponse = RequestResponse<{
  StandingsTable: {
    StandingsLists: [
      {
        DriverStandings: DriverStanding[];
      }
    ];
  };
}>;

export type ConstructorStandingsRequestResponse = RequestResponse<{
  StandingsTable: {
    StandingsLists: [
      {
        ConstructorStandings: ConstructorStanding[];
      }
    ];
  };
}>;

export default class StandingsWrapper {
  static fetchDriverStandings(year?: number) {
    return axios.get<DriverStandingsRequestResponse>(
      `${environment.apis.ergast.url}/f1${
        year ? '/' + year : ''
      }/driverstandings.json`
    );
  }

  static fetchConstructorStandings(year?: number) {
    return axios.get<ConstructorStandingsRequestResponse>(
      `${environment.apis.ergast.url}/f1${
        year ? '/' + year : ''
      }/constructorstandings.json`
    );
  }
}
