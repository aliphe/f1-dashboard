import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SeasonState {
  season: number;
}

const initialState: SeasonState = {
  season: 2020,
};

const seasonSelectorReducer = createSlice({
  name: 'seasonSelector',
  initialState,
  reducers: {
    selectSeason(state, action: PayloadAction<{ season: number }>) {
      state.season = action.payload.season;
    },
  },
});

export const { selectSeason } = seasonSelectorReducer.actions;

export default seasonSelectorReducer.reducer;
