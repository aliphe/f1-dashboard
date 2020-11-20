import {
  DriverStanding,
} from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StandingsAPI from '../standingsApi';

export interface DriversStandingsState {
  drivers: DriverStanding[];

  isLoading: boolean;

  isFetched: boolean;
}

const initialState: DriversStandingsState = {
  drivers: [],

  isLoading: false,

  isFetched: false,
};

export const fetchDriverStandingsByYear = createAsyncThunk(
  'standings/driver/fetchByYear',
  async (year: number) => {
    const response = await StandingsAPI.fetchDriversStandingsByYear(year);
    return response.data;
  }
);

const driversStandingsReducer = createSlice({
  name: 'driversStandings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchDriverStandingsByYear.fulfilled,
      (state, action) => {
        state.drivers.push(...action.payload.data.driverStandings);
        state.isLoading = false;
        state.isFetched = true;
      }
    );
    builder.addCase(fetchDriverStandingsByYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDriverStandingsByYear.rejected, (state) => {
      state.isLoading = false;
      state.isFetched = true;
    });
  },
});
export default driversStandingsReducer.reducer;
