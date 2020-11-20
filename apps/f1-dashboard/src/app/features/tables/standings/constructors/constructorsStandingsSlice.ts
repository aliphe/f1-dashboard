import {
  ConstructorStanding,
} from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import StandingsAPI from '../standingsApi';

export interface ConstructorsStandingsState {
  constructors: ConstructorStanding[];

  isLoading: boolean;

  isFetched: boolean;
}

const initialState: ConstructorsStandingsState = {
  constructors: [],

  isLoading: false,

  isFetched: false,
};

export const fetchConstructorsStandingsByYear = createAsyncThunk(
  'standings/constructor/fetchByYear',
  async (year: number) => {
    const response = await StandingsAPI.fetchConstructorsStandingsByYear(year);
    return response.data;
  }
);

const constructorsStandingsReducer = createSlice({
  name: 'constructorsStandings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchConstructorsStandingsByYear.fulfilled,
      (state, action) => {
        state.constructors.push(...action.payload.data.constructorStandings);
        state.isLoading = false;
        state.isFetched = true;
      }
    );
    builder.addCase(fetchConstructorsStandingsByYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchConstructorsStandingsByYear.rejected, (state) => {
      state.isLoading = false;
      state.isFetched = true;
    });
  },
});
export default constructorsStandingsReducer.reducer;
