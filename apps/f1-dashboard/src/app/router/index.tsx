import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CircuitList from '../features/entities/circuits/circuitsList';
import DriversList from '../features/entities/drivers/driversList';
import RaceList from '../features/entities/races/raceList';
import RaceResults from '../features/entities/races/results';
import DriverStandings from '../features/entities/standings/drivers';
import TeamsStandings from '../features/entities/standings/teams';
import TeamsList from '../features/entities/teams/teamsList';

const Router: React.FC = () => (
  <div>
    <Switch>
      <Route path="/drivers">
        <DriversList />
      </Route>
      <Route path="/teams">
        <TeamsList />
      </Route>
      <Route path="/standings/drivers">
        <DriverStandings />
      </Route>
      <Route path="/standings/teams">
        <TeamsStandings />
      </Route>
      <Route path="/circuits">
        <CircuitList />
      </Route>
      <Route path="/races/:round/results">
        <RaceResults />
      </Route>
      <Route path="/races">
        <RaceList />
      </Route>
      <Route path="/">
        <DriversList />
      </Route>
    </Switch>
  </div>
);
export default Router;
