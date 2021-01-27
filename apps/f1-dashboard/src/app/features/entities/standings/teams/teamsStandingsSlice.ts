import { TeamStanding } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../../helpers/api';

export interface TeamsStandingsState {
  teams: TeamStanding[];

  isLoading: boolean;

  isFetched: boolean;
}

const initialState: TeamsStandingsState = {
  teams: [],

  isLoading: false,

  isFetched: false,
};

export const fetchTeamsStandingsByYear = createAsyncThunk(
  'standings/team/fetchByYear',
  async (year: number) => {
    const response = await Api.fetchTeamsStandingsByYear(year);
    return response.data;
  }
);

const teamsStandingsReducer = createSlice({
  name: 'teamsStandings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeamsStandingsByYear.fulfilled, (state, action) => {
      state.teams.push(...action.payload.data.teamStandings);
      state.isLoading = false;
      state.isFetched = true;
    });
    builder.addCase(fetchTeamsStandingsByYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTeamsStandingsByYear.rejected, (state) => {
      state.isLoading = false;
      state.isFetched = true;
    });
  },
});
export default teamsStandingsReducer.reducer;
