import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RequestsState {
  lastRequested: string;
}

const initialState: RequestsState = {
  lastRequested: '',
};

const requestsSelectorReducer = createSlice({
  name: 'requestsSelector',
  initialState,
  reducers: {
    setLastRequest(state, action: PayloadAction<{ lastRequested: string }>) {
      state.lastRequested = action.payload.lastRequested;
    },
  },
});

export const { setLastRequest } = requestsSelectorReducer.actions;

export default requestsSelectorReducer.reducer;
