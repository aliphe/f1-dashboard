import { Race, RaceResult } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../helpers/api';

export interface RacesState {
  byRound: {
    [round: number]: {
      race: Race;
      results: RaceResult[];
    };
  };

  isLoading: boolean;
}

const initialState: RacesState = {
  byRound: {},

  isLoading: false,
};

export const fetchRaces = createAsyncThunk(
  'races/fetch',
  async (season: number) => {
    const response = await Api.fetchRaces(season);
    return response.data;
  }
);

export const fetchRaceResult = createAsyncThunk(
  'races/results/fetch',
  async ({ season, round }: { season: number; round: number }) => {
    const response = await Api.fetchRaceResults(season, round);
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
        state.byRound[race.round] = { race, results: [] };
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

      state.byRound[args.round].results = results;
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
