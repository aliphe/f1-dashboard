import { configureStore } from '@reduxjs/toolkit';

import driversReducer, { DriversState } from '../features/drivers/driversSlice';
import circuitsReducer, {
  CircuitsState,
} from '../features/circuits/circuitsSlice';
import navigationReducer, {
  NavigationState,
} from '../features/navigation/navigationSlice';
import driversStandingsReducer, {
  DriversStandingsState,
} from '../features/standings/drivers/driverStandingsSlice';
import teamStandingsReducer, {
  TeamsStandingsState,
} from '../features/standings/teams/teamsStandingsSlice';
import racesReducer, { RacesState } from '../features/races/racesSlice';

const store = configureStore({
  reducer: {
    drivers: driversReducer,
    driversStandings: driversStandingsReducer,
    circuits: circuitsReducer,
    teamsStandings: teamStandingsReducer,
    navigation: navigationReducer,
    races: racesReducer,
  },
});

export type RootState = {
  drivers: DriversState;
  driversStandings: DriversStandingsState;
  teamsStandings: TeamsStandingsState;
  navigation: NavigationState;
  circuits: CircuitsState;
  races: RacesState;
};

export default store;
