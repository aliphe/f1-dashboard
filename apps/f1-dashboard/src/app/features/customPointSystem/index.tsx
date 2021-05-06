import { PointSystem } from '@f1-dashboard/api-interfaces';
import { CircularProgress, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchSeasonRaceResults } from '../entities/races/results/raceResultsSlice';
import CustomStandings from './customStandings';
import CustomPointSystemForm from './form';

export const defaultPointSystem: PointSystem = {
  fastestLap: 1,
  pointsByPosition: {
    1: 25,
    2: 18,
    3: 15,
    4: 12,
    5: 10,
    6: 8,
    7: 6,
    8: 4,
    9: 2,
    10: 1,
  },
};

const selector = (state: RootState) => {
  const raceResults = Object.values(state.raceResults);
  return {
    races: state.races.races,
    areRacesResultsLoaded:
      raceResults.length > 0 && !raceResults.find((r) => !r.isLoaded),
    areRacesResultsLoading:
      raceResults.length > 0 && raceResults.find((r) => r.isLoading),
    results: raceResults.flatMap((results) => results.results),
    season: state.season.season,
  };
};

const CustomPointSystem: React.FC = () => {
  const dispatch = useDispatch();
  const {
    results,
    season,
    areRacesResultsLoaded,
    areRacesResultsLoading,
  } = useSelector(selector);
  const [pointSystem, setPointSystem] = useState(defaultPointSystem);

  useEffect(() => {
    if (!areRacesResultsLoaded && !areRacesResultsLoading) {
      dispatch(fetchSeasonRaceResults(season));
    }
  }, [areRacesResultsLoaded, areRacesResultsLoading, dispatch, season]);
  if (areRacesResultsLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper className={'custom-point-table'}>
      <Typography variant="h6" component="div">
        Custom Point System
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <CustomStandings results={results} pointSystem={pointSystem} />
        </Grid>
        <Grid item>
          <CustomPointSystemForm
            initialValues={pointSystem}
            onChange={setPointSystem}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CustomPointSystem;
