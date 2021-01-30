import { Race } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../helpers/api';

export interface RacesState {
  races: Race[];

  isLoading: boolean;
}

const initialState: RacesState = {
  races: [],

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
      state.races = action.payload.data.races;
      state.isLoading = false;
    });
    builder.addCase(fetchRaces.pending, (state) => {
      state.races = [];
      state.isLoading = true;
    });
    builder.addCase(fetchRaces.rejected, (state) => {
      state.isLoading = false;
    });

    // builder.addCase(fetchRaceResult.fulfilled, (state, action) => {
    //   const args = action.meta.arg;
    //   const results = action.payload.data.results;
    // });
    // builder.addCase(fetchRaceResult.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(fetchRaceResult.rejected, (state) => {
    //   state.isLoading = false;
    // });
  },
});

export default racesReducer.reducer;
