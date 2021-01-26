import { Team } from '@f1-dashboard/api-interfaces';
import axios from 'axios';
import { RequestResponse } from '.';
import { environment } from '../../../environments/environment';

export type ApiTeam = {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
};

export type TeamsRequestResponse = RequestResponse<{
  ConstructorTable: {
    Constructors: ApiTeam[];
  };
}>;

export default class TeamsServiceWrapper {
  static async fetchTeams(year: number): Promise<Team[]> {
    const res = await axios.get<TeamsRequestResponse>(
      `${environment.apis.ergast.url}/f1${
        year ? '/' + year : ''
      }/constructors.json`
    );
    return res.data.MRData.ConstructorTable.Constructors.map((d) =>
      TeamsServiceWrapper.formatTeam(d)
    );
  }

  static formatTeam(team: ApiTeam): Team {
    return {
      id: team.constructorId,
      name: team.name,
      nationality: team.nationality,
      url: team.url,
    };
  }
}
