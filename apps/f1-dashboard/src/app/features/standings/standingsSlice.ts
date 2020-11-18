import {
  ConstructorStanding,
  DriverStanding,
} from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StandingsAPI from './standingsApi';

export interface StandingsState {
  drivers: DriverStanding[];

  constructors: ConstructorStanding[];

  isLoading: boolean;
}

const initialState: StandingsState = {
  drivers: [],

  constructors: [],

  isLoading: false,
};

export const fetchDriverStandingsByYear = createAsyncThunk(
  'standings/drivers/fetchByYear',
  async (year: number) => {
    const response = await StandingsAPI.fetchDriverStandingsByYear(year);
    return response.data;
  }
);

export const fetchConstructorStandingsByYear = createAsyncThunk(
  'standings/constructor/fetchByYear',
  async (year: number) => {
    const response = await StandingsAPI.fetchConstructorsStandingsByYear(year);
    return response.data;
  }
);

const standingsReducer = createSlice({
  name: 'standings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDriverStandingsByYear.fulfilled, (state, action) => {
      state.drivers.push(...action.payload.data.driverStandings);
      state.isLoading = false;
    });
    builder.addCase(fetchDriverStandingsByYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDriverStandingsByYear.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(fetchConstructorStandingsByYear.fulfilled, (state, action) => {
      state.constructors.push(...action.payload.data.constructorStandings);
      state.isLoading = false;
    });
    builder.addCase(fetchConstructorStandingsByYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchConstructorStandingsByYear.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default standingsReducer.reducer;
