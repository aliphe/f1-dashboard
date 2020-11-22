import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum NavigationChoice {
  DRIVERS_LIST = 'Drivers List',
  DRIVERS_STANDINGS = 'Drivers Standings',
  TEAMS_STANDINGS = 'Teams Standings',
  CIRCUITS_LIST = 'Circuits',
}

export interface NavigationState {
  focused: NavigationChoice;
}

const initialState: NavigationState = {
  focused: NavigationChoice.DRIVERS_STANDINGS,
};

const navigationReducer = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigate(state, action: PayloadAction<{ navigation: NavigationChoice }>) {
      state.focused = action.payload.navigation;
    },
  },
});

export const { navigate } = navigationReducer.actions;

export default navigationReducer.reducer;
