import { configureStore } from '@reduxjs/toolkit';

import driversReducer, { DriversState } from '../features/tables/drivers/driversSlice';
import navigationReducer, { NavigationState } from '../features/navigation/navigationSlice';
import driversStandingsReducer, { DriversStandingsState } from '../features/tables/standings/drivers/driverStandingsSlice';
import constructorStandingsReducer, { ConstructorsStandingsState } from '../features/tables/standings/constructors/constructorsStandingsSlice';

const store = configureStore({
  reducer: {
    drivers: driversReducer,
    driversStandings: driversStandingsReducer,
    constructorsStandings: constructorStandingsReducer,
    navigation: navigationReducer,
  },
});

export type RootState = {
  drivers: DriversState;
  driversStandings: DriversStandingsState;
  constructorsStandings: ConstructorsStandingsState;
  navigation: NavigationState;
};

export default store;
