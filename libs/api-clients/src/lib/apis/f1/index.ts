import { AxiosInstance } from 'axios';
import createAxios from '../../../utils/createAxios';
import * as ApiTypes from './types';

export interface F1ApiClientOptions {
  apiUrl: string;
  apiKey?: string;
}

export default class F1ApiClient {
  private readonly axios: AxiosInstance;

  constructor(options: F1ApiClientOptions) {
    this.axios = createAxios({
      baseURL: options.apiUrl,
      headers: {
        apiKey: options.apiKey,
      },
    });
  }

  async fetchDrivers(season: number): Promise<ApiTypes.FetchDriversResponse> {
    const { data } = await this.axios.get(`/drivers/${season}`);
    return data;
  }

  async insertDrivers(
    season: number,
    payload: ApiTypes.InsertDriversBody
  ): Promise<ApiTypes.InsertDriversResponse> {
    const { data } = await this.axios.post(`/drivers/${season}`, payload);
    return data;
  }

  async fetchCircuits(): Promise<ApiTypes.FetchCircuitsResponse> {
    const { data } = await this.axios.get(`/circuits`);
    return data;
  }

  async insertCircuits(
    payload: ApiTypes.InsertCircuitsBody
  ): Promise<ApiTypes.InsertCircuitsResponse> {
    const { data } = await this.axios.post(`/circuits`, payload);
    return data;
  }

  async fetchTeams(season: number): Promise<ApiTypes.FetchTeamsResponse> {
    const { data } = await this.axios.get(`/teams/${season}`);
    return data;
  }

  async insertTeams(
    season: number,
    payload: ApiTypes.InsertTeamsBody
  ): Promise<ApiTypes.InsertTeamsResponse> {
    const { data } = await this.axios.post(`/teams/${season}`, payload);
    return data;
  }

  async fetchRaces(season: number): Promise<ApiTypes.FetchRacesResponse> {
    const { data } = await this.axios.get(`/races/${season}`);
    return data;
  }

  async insertRaces(
    season: number,
    payload: ApiTypes.InsertRacesBody
  ): Promise<ApiTypes.InsertRacesResponse> {
    const { data } = await this.axios.post(`/races/${season}`, payload);
    return data;
  }

  /**
   * @param round if omitted, fetches the whole season's results
   */
  async fetchRaceResults(
    season: number,
    round?: number
  ): Promise<ApiTypes.FetchRaceResultsResponse> {
    const { data } = await this.axios.get(
      `/races/${season}/results${round ? `/${round}` : ''}`
    );
    return data;
  }

  async insertRaceResults(
    season: number,
    round: number,
    payload: ApiTypes.InsertRaceResultsBody
  ): Promise<ApiTypes.InsertRaceResultsResponse> {
    const { data } = await this.axios.post(
      `/races/${season}/results/${round}`,
      payload
    );
    return data;
  }

  async fetchDriversStandings(
    season: number
  ): Promise<ApiTypes.FetchDriverStandingsResponse> {
    const { data } = await this.axios.get(`/standings/${season}/drivers`);
    return data;
  }

  async insertDriversStandings(
    season: number,
    payload: ApiTypes.InsertDriverStandingsBody
  ): Promise<ApiTypes.InsertDriverStandingsResponse> {
    const { data } = await this.axios.post(
      `/standings/${season}/drivers`,
      payload
    );
    return data;
  }

  async fetchTeamsStandings(
    season: number
  ): Promise<ApiTypes.FetchTeamStandingsResponse> {
    const { data } = await this.axios.get(`/standings/${season}/teams`);
    return data;
  }

  async insertTeamsStandings(
    season: number,
    payload: ApiTypes.InsertTeamStandingsBody
  ): Promise<ApiTypes.InsertTeamStandingsResponse> {
    const { data } = await this.axios.post(
      `/standings/${season}/teams`,
      payload
    );
    return data;
  }
}

export * from './types';
