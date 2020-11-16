import { configureStore } from '@reduxjs/toolkit';

import driversReducer, { DriversState } from '../features/drivers/driversSlice';

const store = configureStore({
  reducer: {
    drivers: driversReducer,
  },
});

export type RootState = {
  drivers: DriversState;
};

export default store;
