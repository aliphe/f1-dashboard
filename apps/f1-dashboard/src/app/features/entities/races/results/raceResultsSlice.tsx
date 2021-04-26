import { RaceResult } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { f1ApiClient } from '../..';
import FetchableEntity, { defaultFetchableEntity } from '../../fetchableEntity';

export interface RaceResultRoundState extends FetchableEntity {
  results: RaceResult[];
}

export type RaceResultsState = {
  [round: number]: RaceResultRoundState;
};

const initialState: RaceResultsState = {};

function getOrInitRoundState(
  state: RaceResultsState,
  round: number
): RaceResultRoundState {
  if (state[round]) {
    return state[round];
  }
  state[round] = {
    ...defaultFetchableEntity,
    results: [],
  };
  return state[round];
}

export const fetchRaceResults = createAsyncThunk(
  'raceResults/fetch',
  async ({ season, round }: { season: number; round: number }) =>
    f1ApiClient.fetchRaceResults(season, round)
);

export const fetchSeasonRaceResults = createAsyncThunk(
  'raceResults/fetch-season',
  async (season: number) => f1ApiClient.fetchRaceResults(season)
);

const raceResultsReducer = createSlice({
  name: 'raceResults',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRaceResults.fulfilled, (state, action) => {
      const { raceResults } = action.payload.data;
      const { round } = action.meta.arg;
      const activeRoundState = state[round];
      activeRoundState.results = raceResults;
      activeRoundState.isLoading = false;
      activeRoundState.isLoaded = true;
    });
    builder.addCase(fetchRaceResults.pending, (state, action) => {
      const { round } = action.meta.arg;
      const activeRoundState = getOrInitRoundState(state, round);
      activeRoundState.isLoading = true;
    });
    builder.addCase(fetchRaceResults.rejected, (state, action) => {
      const { round } = action.meta.arg;
      const activeRoundState = state[round];
      activeRoundState.isLoading = true;
      activeRoundState.isLoaded = true;
    });
    builder.addCase(fetchSeasonRaceResults.fulfilled, (state, action) => {
      const resultsByRound = action.payload.data.raceResults.reduce(
        (acc: { [round: number]: RaceResult[] }, res) => {
          if (acc[res.round]) {
            acc[res.round].push(res);
          } else {
            acc[res.round] = [res];
          }
          return acc;
        },
        {}
      );
      Object.entries(resultsByRound).forEach(([round, results]) => {
        state[Number(round)] = {
          results,
          isLoaded: true,
          isLoading: false,
        };
      });
    });
  },
});

export default raceResultsReducer.reducer;
