import { Driver } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { f1ApiClient } from '..';

export interface DriversState {
  byId: { [driverId: string]: Driver };

  allIds: string[];

  isLoading: boolean;
}

const initialState: DriversState = {
  byId: {},

  allIds: [],

  isLoading: false,
};

export const fetchDriversByYear = createAsyncThunk(
  'drivers/fetchByYear',
  async (year: number) => f1ApiClient.fetchDrivers(year)
);

const driversReducer = createSlice({
  name: 'drivers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDriversByYear.fulfilled, (state, action) => {
      action.payload.data.drivers.forEach((d: Driver) => {
        state.allIds.push(d.id);
        state.byId[d.id] = d;
        state.isLoading = false;
      });
    });
    builder.addCase(fetchDriversByYear.pending, (state) => {
      state.allIds = [];
      state.byId = {};
      state.isLoading = true;
    });
    builder.addCase(fetchDriversByYear.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default driversReducer.reducer;
