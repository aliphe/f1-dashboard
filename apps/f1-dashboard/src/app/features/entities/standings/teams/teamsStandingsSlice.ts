import { TeamStanding } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { f1ApiClient } from '../..';

export interface TeamsStandingsState {
  teams: TeamStanding[];

  isLoading: boolean;
}

const initialState: TeamsStandingsState = {
  teams: [],

  isLoading: false,
};

export const fetchTeamsStandingsByYear = createAsyncThunk(
  'standings/team/fetchByYear',
  async (year: number) => f1ApiClient.fetchTeamsStandings(year)
);

const teamsStandingsReducer = createSlice({
  name: 'teamsStandings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeamsStandingsByYear.fulfilled, (state, action) => {
      state.teams = action.payload.data.teamStandings;
      state.isLoading = false;
    });
    builder.addCase(fetchTeamsStandingsByYear.pending, (state) => {
      state.teams = [];
      state.isLoading = true;
    });
    builder.addCase(fetchTeamsStandingsByYear.rejected, (state) => {
      state.isLoading = false;
    });
  },
});
export default teamsStandingsReducer.reducer;
