import { RaceResult } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { f1ApiClient } from '../..';

export interface RaceResultsState {
  raceResults: RaceResult[];

  round: number;

  isLoading: boolean;
}

const initialState: RaceResultsState = {
  raceResults: [],

  round: -1,

  isLoading: false,
};

export const fetchRaceResults = createAsyncThunk(
  'raceResults/fetch',
  async ({ season, round }: { season: number; round: number }) =>
    f1ApiClient.fetchRaceResults(season, round)
);

const raceResultsReducer = createSlice({
  name: 'raceResults',
  initialState,
  reducers: {
    setLastRoundRequest(state, action: PayloadAction<{ round: number }>) {
      state.round = action.payload.round;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRaceResults.fulfilled, (state, action) => {
      const { raceResults } = action.payload.data;
      state.round = action.meta.arg.round;
      state.raceResults = raceResults;
      state.isLoading = false;
    });
    builder.addCase(fetchRaceResults.pending, (state, action) => {
      state.round = action.meta.arg.round;
      state.isLoading = true;
    });
    builder.addCase(fetchRaceResults.rejected, (state, action) => {
      state.round = action.meta.arg.round;
      state.isLoading = false;
    });
  },
});

export const { setLastRoundRequest } = raceResultsReducer.actions;

export default raceResultsReducer.reducer;
