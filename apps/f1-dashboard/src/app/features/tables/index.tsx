import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NavigationChoice } from '../navigation/navigationSlice';
import DriversList from './drivers/driversList';
import ConstructorsStandings from './standings/constructors';
import DriverStandings from './standings/drivers';

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
      {focusedNavigation === NavigationChoice.CONSTRUCTORS_STANDINGS && (
        <ConstructorsStandings />
      )}
    </div>
  );
};

export default Tables;
