import axios from 'axios';

import { Circuit, Race } from '@f1-dashboard/api-interfaces';
import { RequestResponse } from '.';
import { environment } from 'apps/api/src/environments/environment';
import CircuitsWrapper, { ApiCircuit } from './circuits';

type ApiRace = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: ApiCircuit;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM:SS:00Z
};

type RacesRequestResponse = RequestResponse<{
  RacesTable: {
    Races: ApiRace[];
  };
}>;

export default class RacesServiceWrapper {
  static async fetchRaces(season: number): Promise<Race[]> {
    const res = await axios.get<RacesRequestResponse>(
      `${environment.apis.ergast.url}/f1/${season}/races.json`
    );
    return res.data.MRData.RacesTable.Races.map((r) =>
      RacesServiceWrapper.formatRace(r)
    );
  }

  static formatRace(race: ApiRace): Race {
    return {
      round: Number(race.round),
      url: race.url,
      circuit: CircuitsWrapper.formatCircuit(race.Circuit),
      date: new Date(`${race.date}T${race.time}`).toISOString(),
      name: race.raceName,
    };
  }
}
