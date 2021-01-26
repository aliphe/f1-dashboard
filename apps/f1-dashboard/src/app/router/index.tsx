import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CircuitList from '../features/circuits/circuitsList';
import DriversList from '../features/drivers/driversList';
import RaceList from '../features/races/raceList';
import DriverStandings from '../features/standings/drivers';
import TeamsStandings from '../features/standings/teams';

const Router: React.FC = () => (
    <div>
      <Switch>
        <Route path="/drivers">
          <DriversList />
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
