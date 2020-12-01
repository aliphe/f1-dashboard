import { Race, RaceResult } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import RacesAPI from './racesApi';

export interface RacesState {
  byYear: {
    [year: number]: {
      [round: number]: {
        race: Race;
        results: RaceResult[];
      };
    };
  };

  isLoading: boolean;
}

const initialState: RacesState = {
  byYear: {},

  isLoading: false,
};

export const fetchRaces = createAsyncThunk(
  'races/fetch',
  async (year: number) => {
    const response = await RacesAPI.fetchRaces(year);
    return response.data;
  }
);

export const fetchRaceResult = createAsyncThunk(
  'races/results/fetch',
  async ({ year, round }: { year: number; round: number }) => {
    const response = await RacesAPI.fetchRaceResults(year, round);
    return response.data;
  }
);

const racesReducer = createSlice({
  name: 'races',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRaces.fulfilled, (state, action) => {
      action.payload.data.races.forEach((race: Race) => {
        if (!state.byYear[race.season.year]) {
          state.byYear[race.season.year] = {};
        }
        state.byYear[race.season.year][race.round] = { race, results: [] };
        state.isLoading = false;
      });
    });
    builder.addCase(fetchRaces.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRaces.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchRaceResult.fulfilled, (state, action) => {
      const args = action.meta.arg;
      const results = action.payload.data.results;
      if (!state.byYear[args.year] || !state.byYear[args.year][args.round]) {
        return state;
      }
      state.byYear[args.year][args.round].results = results;
    });
    builder.addCase(fetchRaceResult.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRaceResult.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default racesReducer.reducer;
