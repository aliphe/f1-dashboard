import axios from 'axios';

import { Race, RaceResult } from '@f1-dashboard/api-interfaces';
import { RequestResponse } from '.';
import { environment } from '../../../environments/environment';
import CircuitsWrapper, { ApiCircuit } from './circuits';
import DriversServiceWrapper, { ApiDriver } from './drivers';
import StandingsServiceWrapper, { ApiTeam } from './standings';
import { logger } from '@f1-dashboard/utils';

type ApiRace = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: ApiCircuit;
  date: string; // YYYY-MM-DD
  time?: string; // HH:MM:SS:00Z
};

type ApiRaceResult = {
  number: string;
  position: string;
  points: string;
  Driver: ApiDriver;
  Constructor: ApiTeam;
  grid: string;
  laps: string;
  status: 'Finished';
  Time?: {
    millis: string;
    time: string;
  };
  FastestLap: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed: {
      units: string;
      speed: string;
    };
  };
};

type RacesRequestResponse = RequestResponse<{
  RaceTable: {
    Races: ApiRace[];
  };
}>;

type RaceResultsRequestResponse = RequestResponse<{
  RaceTable: {
    Races: (ApiRace & { Results: ApiRaceResult[] })[];
  };
}>;

export default class RacesServiceWrapper {
  static async fetchRaces(season: number): Promise<Race[]> {
    const res = await axios.get<RacesRequestResponse>(
      `${environment.apis.ergast.url}/f1/${season}/races.json`
    );
    return res.data.MRData.RaceTable.Races.map((r) =>
      RacesServiceWrapper.formatRace(r)
    );
  }

  static async fetchRaceResults(
    season: number,
    round: number
  ): Promise<{ race: Race; results: RaceResult[] }> {
    const res = await axios.get<RaceResultsRequestResponse>(
      `${environment.apis.ergast.url}/f1/${season}/${round}/results.json`
    );

    const results = res.data.MRData.RaceTable.Races.map((race) =>
      race.Results.map((result) => ({
        driver: DriversServiceWrapper.formatDriver(result.Driver),
        grid: Number(result.grid),
        laps: Number(result.laps),
        points: Number(result.points),
        position: Number(result.position),
        status: result.status,
        team: StandingsServiceWrapper.formatTeam(result.Constructor),
        time: result.Time?.time || null,
      }))
    ).flat(1);
    return {
      race: RacesServiceWrapper.formatRace(res.data.MRData.RaceTable.Races[0]),
      results,
    };
  }

  static formatRace(race: ApiRace): Race {
    logger.info(race);
    return {
      season: { year: Number(race.season) },
      round: Number(race.round),
      url: race.url,
      circuit: CircuitsWrapper.formatCircuit(race.Circuit),
      date: race.time
        ? new Date(`${race.date}T${race.time}`).toISOString()
        : new Date(race.date).toISOString(),
      name: race.raceName,
    };
  }
}
