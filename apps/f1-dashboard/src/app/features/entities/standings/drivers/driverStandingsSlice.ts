import { DriverStanding } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { f1ApiClient } from '../..';
import FetchableEntity, { defaultFetchableEntity } from '../../fetchableEntity';

export interface DriversStandingsState extends FetchableEntity {
  drivers: DriverStanding[];
}

const initialState: DriversStandingsState = {
  ...defaultFetchableEntity,

  drivers: [],
};

export const fetchDriverStandingsByYear = createAsyncThunk(
  'standings/driver/fetchByYear',
  async (year: number) => f1ApiClient.fetchDriversStandings(year)
);

const driversStandingsReducer = createSlice({
  name: 'driversStandings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDriverStandingsByYear.fulfilled, (state, action) => {
      state.drivers = action.payload.data.driverStandings;
      state.isLoading = false;
      state.isLoaded = true;
    });
    builder.addCase(fetchDriverStandingsByYear.pending, (state) => {
      state.drivers = [];
      state.isLoading = true;
    });
    builder.addCase(fetchDriverStandingsByYear.rejected, (state) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
  },
});
export default driversStandingsReducer.reducer;
