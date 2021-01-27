import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { connectRouter } from 'connected-react-router';

import driversReducer, {
  DriversState,
} from '../features/entities/drivers/driversSlice';
import circuitsReducer, {
  CircuitsState,
} from '../features/entities/circuits/circuitsSlice';
import driversStandingsReducer, {
  DriversStandingsState,
} from '../features/entities/standings/drivers/driverStandingsSlice';
import teamStandingsReducer, {
  TeamsStandingsState,
} from '../features/entities/standings/teams/teamsStandingsSlice';
import racesReducer, {
  RacesState,
} from '../features/entities/races/racesSlice';
import teamsReducer, {
  TeamsState,
} from '../features/entities/teams/teamsSlice';
import seasonSelectorReducer, {
  SeasonState,
} from '../features/seasonSelector/seasonSelectorSlice';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    router: connectRouter(history),
    drivers: driversReducer,
    driversStandings: driversStandingsReducer,
    circuits: circuitsReducer,
    teamsStandings: teamStandingsReducer,
    races: racesReducer,
    teams: teamsReducer,
    season: seasonSelectorReducer,
  },
});

export type RootState = {
  drivers: DriversState;
  driversStandings: DriversStandingsState;
  teamsStandings: TeamsStandingsState;
  circuits: CircuitsState;
  races: RacesState;
  teams: TeamsState;
  season: SeasonState;
};

export default store;
