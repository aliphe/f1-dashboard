import { TeamStanding } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { f1ApiClient } from '../..';
import FetchableEntity, { defaultFetchableEntity } from '../../fetchableEntity';

export interface TeamsStandingsState extends FetchableEntity {
  teams: TeamStanding[];

  isLoading: boolean;
}

const initialState: TeamsStandingsState = {
  ...defaultFetchableEntity,

  teams: [],
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
      state.isLoaded = true;
    });
    builder.addCase(fetchTeamsStandingsByYear.pending, (state) => {
      state.teams = [];
      state.isLoading = true;
    });
    builder.addCase(fetchTeamsStandingsByYear.rejected, (state) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
  },
});
export default teamsStandingsReducer.reducer;
