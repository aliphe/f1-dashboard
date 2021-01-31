import axios from 'axios';
import { RequestResponse } from '.';
import {
  TeamStanding,
  DriverStanding,
  Team,
} from '@f1-dashboard/api-interfaces';

import { environment } from '../../../environments/environment';
import DriversServiceWrapper, { ApiDriver } from './drivers';

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

export default class StandingsServiceWrapper {
  static async fetchDriverStandings(year: number): Promise<DriverStanding[]> {
    const res = await axios.get<DriverStandingsRequestResponse>(
      `${environment.apis.ergast.url}/f1/${year}/driverstandings.json`
    );
    return res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings.map(
      (s) => ({
        wins: Number(s.wins),
        points: Number(s.points),
        position: Number(s.position),
        driver: DriversServiceWrapper.formatDriver(s.Driver),
      })
    );
  }

  static async fetchTeamStandings(year: number): Promise<TeamStanding[]> {
    const res = await axios.get<TeamStandingsRequestResponse>(
      `${environment.apis.ergast.url}/f1/${year}/constructorstandings.json`
    );
    return res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings.map(
      (s) => ({
        position: Number(s.position),
        wins: Number(s.wins),
        points: Number(s.points),
        team: StandingsServiceWrapper.formatTeam(s.Constructor),
      })
    );
  }

  static formatTeam(team: ApiTeam): Team {
    return {
      id: team.constructorId,
      name: team.name,
      url: team.url,
      nationality: team.nationality,
    };
  }
}
