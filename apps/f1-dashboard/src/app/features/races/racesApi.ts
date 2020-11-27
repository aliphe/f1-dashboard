import { Response, Race, RaceResult } from '@f1-dashboard/api-interfaces';
import axios from 'axios';

export default class Races {
  static fetchRaces(year: number) {
    return axios.get<Response<{ races: Race[] }>>(`/api/races?year=${year}`);
  }

  static fetchRaceResults(year: number, round: number) {
    return axios.get<Response<{ results: RaceResult[] }>>(
      `/api/races/results?year=${year}&round=${round}`
    );
  }
}
