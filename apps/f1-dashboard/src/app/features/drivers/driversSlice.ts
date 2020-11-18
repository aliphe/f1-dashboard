import { Driver } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import DriversAPI from './driversApi';

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
  async (year: number) => {
    const response = await DriversAPI.fetchDriversByYear(year);
    return response.data;
  }
);

const driversReducer = createSlice({
  name: 'drivers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDriversByYear.fulfilled, (state, action) => {
      action.payload.data.drivers.forEach((d: Driver) => {
        state.allIds.push(d.driverId);
        state.byId[d.driverId] = d;
        state.isLoading = false;
      });
    });
    builder.addCase(fetchDriversByYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDriversByYear.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default driversReducer.reducer;
