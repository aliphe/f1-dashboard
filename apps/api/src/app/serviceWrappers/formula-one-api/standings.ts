import axios from 'axios';
import { RequestResponse } from '.';
import {
  Team,
  TeamStanding,
  Driver,
  DriverStanding,
} from '@f1-dashboard/api-interfaces';

import { environment } from '../../../environments/environment';

type ApiDriver = {
  driverId: string;
  permanentNumber: number;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string; // ISO
  nationality: string;
};

export interface ApiTeam {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

type ApiDriverStanding = {
  position: number;
  points: number;
  wins: number;
  Driver: ApiDriver;
};

type ApiTeamStanding = {
  position: number;
  points: number;
  wins: number;
  Constructor: ApiTeam;
};

export type DriverStandingsRequestResponse = RequestResponse<{
  StandingsTable: {
    StandingsLists: [
      {
        DriverStandings: ApiDriverStanding[];
      }
    ];
  };
}>;

export type TeamStandingsRequestResponse = RequestResponse<{
  StandingsTable: {
    StandingsLists: [
      {
        ConstructorStandings: ApiTeamStanding[];
      }
    ];
  };
}>;

export default class StandingsWrapper {
  static async fetchDriverStandings(year?: number): Promise<DriverStanding[]> {
    const res = await axios.get<DriverStandingsRequestResponse>(
      `${environment.apis.ergast.url}/f1${
        year ? '/' + year : ''
      }/driverstandings.json`
    );
    return res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
      (s) => ({
        driver: {
          id: s.Driver.driverId,
          url: s.Driver.url,
          code: s.Driver.code,
          givenName: s.Driver.givenName,
          familyName: s.Driver.familyName,
          dateOfBirth: s.Driver.dateOfBirth,
          nationality: s.Driver.nationality,
          permanentNumber: s.Driver.permanentNumber,
        },
        wins: Number(s.wins),
        points: Number(s.points),
        position: Number(s.position),
      })
    );
  }

  static async fetchTeamStandings(year?: number): Promise<TeamStanding[]> {
    const res = await axios.get<TeamStandingsRequestResponse>(
      `${environment.apis.ergast.url}/f1${
        year ? '/' + year : ''
      }/constructorstandings.json`
    );
    return res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
      (s) => ({
        position: Number(s.position),
        wins: Number(s.wins),
        points: Number(s.points),
        team: {
          id: s.Constructor.constructorId,
          name: s.Constructor.name,
          url: s.Constructor.url,
          nationality: s.Constructor.nationality,
        },
      })
    );
  }
}
