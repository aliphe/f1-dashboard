import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum NavigationPaths {
  DRIVERS_LIST = '/drivers',
  TEAMS_LIST = '/teams',
  DRIVERS_STANDINGS = '/standings/drivers',
  TEAMS_STANDINGS = '/standings/teams',
  CIRCUITS_LIST = '/circuits',
  RACES_LIST = '/races',
}

export interface NavigationState {
  focused: NavigationPaths;
}

const initialState: NavigationState = {
  focused: NavigationPaths.DRIVERS_STANDINGS,
};

const navigationReducer = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigate(state, action: PayloadAction<{ navigation: NavigationPaths }>) {
      state.focused = action.payload.navigation;
    },
  },
});

export const { navigate } = navigationReducer.actions;

export default navigationReducer.reducer;
