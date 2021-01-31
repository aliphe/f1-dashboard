import { Circuit } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { f1ApiClient } from '..';

export interface CircuitsState {
  byId: { [circuitId: string]: Circuit };

  allIds: string[];

  isLoading: boolean;
}

const initialState: CircuitsState = {
  byId: {},

  allIds: [],

  isLoading: false,
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
      });
    });
    builder.addCase(fetchCircuits.pending, (state) => {
      state.allIds = [];
      state.byId = {};
      state.isLoading = true;
    });
    builder.addCase(fetchCircuits.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default circuitsReducer.reducer;