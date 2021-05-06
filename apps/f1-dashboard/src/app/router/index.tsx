import React, { PropsWithChildren } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useParams,
} from 'react-router-dom';
import CircuitList from '../features/entities/circuits/circuitsList';
import DriversList from '../features/entities/drivers/driversList';
import RaceList from '../features/entities/races/raceList';
import RaceResults from '../features/entities/races/results';
import CustomPointSystem from '../features/customPointSystem';
import DriverStandings from '../features/entities/standings/drivers';
import TeamsStandings from '../features/entities/standings/teams';
import TeamsList from '../features/entities/teams/teamsList';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface Props {
  path: string;
  exact?: boolean;
}

function WrappedChildren(props) {
  const history = useHistory();
  const location = useLocation();
  const { season } = useParams<{ season: string }>();

  const actualSeason = useSelector((state: RootState) => state.season.season);
  if (isNaN(Number(season))) {
    history.push('/');
  } else if (actualSeason !== Number(season)) {
    // reset season state here
    const newPath = location.pathname.replace(
      /\/season\/\d+/g,
      `/season/${actualSeason}`
    );
    return <Redirect to={newPath} />;
  }
  return props.children;
}

const PluggedRoute: React.FC<Props> = (props) => {
  const { children, ...args } = props;
  return (
    <Route {...args}>
      <WrappedChildren path={args.path}>{children}</WrappedChildren>
    </Route>
  );
};

const Router: React.FC = () => {
  return (
    <div>
      <Switch>
        <PluggedRoute path="/season/:season/drivers">
          <DriversList />
        </PluggedRoute>
        <PluggedRoute path="/season/:season/teams">
          <TeamsList />
        </PluggedRoute>
        <PluggedRoute exact path="/season/:season/standings/drivers">
          <DriverStandings />
        </PluggedRoute>
        <PluggedRoute exact path="/season/:season/standings/teams">
          <TeamsStandings />
        </PluggedRoute>
        <PluggedRoute path="/season/:season/circuits">
          <CircuitList />
        </PluggedRoute>
        <PluggedRoute path="/season/:season/races/:round/results">
          <RaceResults />
        </PluggedRoute>
        <PluggedRoute path="/season/:season/races">
          <RaceList />
        </PluggedRoute>

        <PluggedRoute exact path="/season/:season/standings/drivers/custom">
          <CustomPointSystem />
        </PluggedRoute>

        <Route path="/">
          <DriversList />
        </Route>
      </Switch>
    </div>
  );
};
export default Router;
