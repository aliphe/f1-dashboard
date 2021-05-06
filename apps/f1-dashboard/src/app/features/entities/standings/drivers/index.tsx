import React, { useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverStandingsByYear } from './driverStandingsSlice';
import { RootState } from '../../../../store';
import DriverStandingsTable from '../../../../components/entities/standings/drivers';

const DriverStandings: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, drivers, season, isLoaded } = useSelector(
    (state: RootState) => ({
      ...state.driversStandings,
      season: state.season.season,
    })
  );

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      dispatch(fetchDriverStandingsByYear(season));
    }
  }, [dispatch, isLoading, season, isLoaded]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return <DriverStandingsTable standings={drivers} />;
};

export default DriverStandings;
