import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { NavigationChoice } from './navigation/navigationSlice';
import DriversList from './drivers/driversList';
import TeamsStandings from './standings/teams';
import DriverStandings from './standings/drivers';
import CircuitList from './circuits/circuitsList';

const Tables: React.FC = () => {
  const focusedNavigation = useSelector(
    (state: RootState) => state.navigation.focused
  );
  return (
    <div>
      {focusedNavigation === NavigationChoice.DRIVERS_LIST && <DriversList />}
      {focusedNavigation === NavigationChoice.DRIVERS_STANDINGS && (
        <DriverStandings />
      )}
      {focusedNavigation === NavigationChoice.TEAMS_STANDINGS && (
        <TeamsStandings />
      )}
      {focusedNavigation === NavigationChoice.CIRCUITS_LIST && <CircuitList />}
    </div>
  );
};

export default Tables;
