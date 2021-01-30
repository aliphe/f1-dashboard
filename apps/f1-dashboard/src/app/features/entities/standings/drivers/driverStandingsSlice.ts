import { DriverStanding } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../../helpers/api';

export interface DriversStandingsState {
  drivers: DriverStanding[];

  isLoading: boolean;
}

const initialState: DriversStandingsState = {
  drivers: [],

  isLoading: false,
};

export const fetchDriverStandingsByYear = createAsyncThunk(
  'standings/driver/fetchByYear',
  async (year: number) => {
    const response = await Api.fetchDriversStandingsByYear(year);
    return response.data;
  }
);

const driversStandingsReducer = createSlice({
  name: 'driversStandings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDriverStandingsByYear.fulfilled, (state, action) => {
      state.drivers = action.payload.data.driverStandings;
      state.isLoading = false;
    });
    builder.addCase(fetchDriverStandingsByYear.pending, (state) => {
      state.drivers = [];
      state.isLoading = true;
    });
    builder.addCase(fetchDriverStandingsByYear.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default driversStandingsReducer.reducer;
