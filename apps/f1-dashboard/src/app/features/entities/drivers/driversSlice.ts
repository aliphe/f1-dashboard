import { Driver } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { f1ApiClient } from '..';
import FetchableEntity, { defaultFetchableEntity } from '../fetchableEntity';

export interface DriversState extends FetchableEntity {
  byId: { [driverId: string]: Driver };

  allIds: string[];
}

const initialState: DriversState = {
  ...defaultFetchableEntity,

  byId: {},

  allIds: [],
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
        state.isLoaded = true;
      });
    });
    builder.addCase(fetchDriversByYear.pending, (state) => {
      state.allIds = [];
      state.byId = {};
      state.isLoading = true;
    });
    builder.addCase(fetchDriversByYear.rejected, (state) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
  },
});

export default driversReducer.reducer;
