import { configureStore } from '@reduxjs/toolkit';

import driversReducer, { DriversState } from '../features/drivers/driversSlice';
import standingsReducer, {
  StandingsState,
} from '../features/standings/standingsSlice';

const store = configureStore({
  reducer: {
    drivers: driversReducer,
    standings: standingsReducer,
  },
});

export type RootState = {
  drivers: DriversState;
  standings: StandingsState;
};

export default store;
