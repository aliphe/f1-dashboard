import { Team } from '@f1-dashboard/api-interfaces';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../../../helpers/api';

export interface TeamsState {
  byId: { [teamId: string]: Team };

  allIds: string[];

  isLoading: boolean;
}

const initialState: TeamsState = {
  byId: {},

  allIds: [],

  isLoading: false,
};

export const fetchTeamsByYear = createAsyncThunk(
  'teams/fetchByYear',
  async (year: number) => {
    const response = await Api.fetchTeamsByYear(year);
    return response.data;
  }
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
      });
    });
    builder.addCase(fetchTeamsByYear.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTeamsByYear.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default teamsReducer.reducer;
