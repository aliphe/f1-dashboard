import { Grid, Paper } from '@material-ui/core';
import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchRaces } from './racesSlice';

const RaceList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, bySeason, season } = useSelector((state: RootState) => ({
    ...state.races,
    season: state.season.season,
  }));

  useEffect(() => {
    if (!isLoading && !Object.values(bySeason[season] || []).length) {
      dispatch(fetchRaces(season));
    }
  }, [season, dispatch, isLoading, bySeason]);

  if (isLoading || !bySeason[season]) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Grid container spacing={2}>
        {Object.values(bySeason[season]).map(({ race }) => (
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
