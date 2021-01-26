import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

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

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    router: connectRouter(history),
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
