import { Response, Team } from '@f1-dashboard/api-interfaces';
import axios from 'axios';

export default class TeamsAPI {
  static async fetchTeamsByYear(year: number) {
    const res = await axios.get<Response<{ teams: Team[] }>>(
      `/api/teams?year=${year}`
    );
    return res;
  }
}
