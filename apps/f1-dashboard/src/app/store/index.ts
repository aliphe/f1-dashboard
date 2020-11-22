import { configureStore } from '@reduxjs/toolkit';

import driversReducer, {
  DriversState,
} from '../features/tables/drivers/driversSlice';
import navigationReducer, {
  NavigationState,
} from '../features/navigation/navigationSlice';
import driversStandingsReducer, {
  DriversStandingsState,
} from '../features/tables/standings/drivers/driverStandingsSlice';
import teamStandingsReducer, {
  TeamsStandingsState,
} from '../features/tables/standings/teams/teamsStandingsSlice';

const store = configureStore({
  reducer: {
    drivers: driversReducer,
    driversStandings: driversStandingsReducer,
    teamsStandings: teamStandingsReducer,
    navigation: navigationReducer,
  },
});

export type RootState = {
  drivers: DriversState;
  driversStandings: DriversStandingsState;
  teamsStandings: TeamsStandingsState;
  navigation: NavigationState;
};

export default store;
