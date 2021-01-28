import { CircularProgress, Grid, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setLastRequest } from '../../requests/requestsSlice';
import { fetchRaces } from './racesSlice';

const RaceList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, byRound, season, isLastRequested } = useSelector(
    (state: RootState) => ({
      ...state.races,
      season: state.season.season,
      isLastRequested: state.requests.lastRequested === 'races',
    })
  );

  useEffect(() => {
    if (!isLoading && !isLastRequested) {
      dispatch(fetchRaces(season));
      dispatch(setLastRequest({ lastRequested: 'races' }));
    }
  }, [season, dispatch, isLoading, isLastRequested]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Grid container spacing={2}>
        {Object.values(byRound).map(({ race }) => (
          <Grid item xs={12} md={3} key={race.round}>
            <Paper>
              <div>{race.name}</div>
              <div>{race.circuit.city}</div>
              <div>{race.circuit.country}</div>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RaceList;
