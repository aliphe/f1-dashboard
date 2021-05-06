import { Team } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { f1ApiClient } from '..';
import FetchableEntity, { defaultFetchableEntity } from '../fetchableEntity';

export interface TeamsState extends FetchableEntity {
  byId: { [teamId: string]: Team };

  allIds: string[];
}

const initialState: TeamsState = {
  ...defaultFetchableEntity,

  byId: {},

  allIds: [],
};

export const fetchTeamsByYear = createAsyncThunk(
  'teams/fetchByYear',
  async (year: number) => f1ApiClient.fetchTeams(year)
);

const teamsReducer = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeamsByYear.fulfilled, (state, action) => {
      action.payload.data.teams.forEach((d: Team) => {
        state.allIds.push(d.id);
        state.byId[d.id] = d;
        state.isLoading = false;
        state.isLoaded = true;
      });
    });
    builder.addCase(fetchTeamsByYear.pending, (state) => {
      state.allIds = [];
      state.byId = {};
      state.isLoading = true;
    });
    builder.addCase(fetchTeamsByYear.rejected, (state) => {
      state.isLoading = false;
      state.isLoaded = true;
    });
  },
});

export default teamsReducer.reducer;
