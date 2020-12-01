import { Grid, GridList, GridListTile, Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchRaces } from './racesSlice';

const RaceList: React.FC = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2020);
  const { isLoading, byYear } = useSelector((state: RootState) => state.races);

  useEffect(() => {
    if (!isLoading && !Object.values(byYear[year] || []).length) {
      dispatch(fetchRaces(year));
    }
  }, [year, dispatch, isLoading, byYear]);

  if (isLoading || !byYear[year]) {
    return <div>loading...</div>;
  }
  return (
    <div>
      <Grid container spacing={2}>
        {Object.values(byYear[year]).map(({ race }) => (
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
