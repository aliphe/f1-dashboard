import { Circuit } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { f1ApiClient } from '..';
import FetchableEntity, { defaultFetchableEntity } from '../fetchableEntity';

export interface CircuitsState extends FetchableEntity {
  byId: { [circuitId: string]: Circuit };

  allIds: string[];
}

const initialState: CircuitsState = {
  ...defaultFetchableEntity,

  byId: {},

  allIds: [],
};

export const fetchCircuits = createAsyncThunk('circuits/fetch', async () =>
  f1ApiClient.fetchCircuits()
);

const circuitsReducer = createSlice({
  name: 'circuits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCircuits.fulfilled, (state, action) => {
      action.payload.data.circuits.forEach((d: Circuit) => {
        state.allIds.push(d.id);
        state.byId[d.id] = d;
        state.isLoading = false;
        state.isLoaded = true;
      });
    });
    builder.addCase(fetchCircuits.pending, (state) => {
      state.allIds = [];
      state.byId = {};
      state.isLoading = true;
    });
    builder.addCase(fetchCircuits.rejected, (state) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
  },
});

export default circuitsReducer.reducer;
