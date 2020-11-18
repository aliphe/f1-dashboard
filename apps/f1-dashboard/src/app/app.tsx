import { Grid } from '@material-ui/core';
import React from 'react';
import { SectionName } from './components/basics/Section';
import DriversList from './features/drivers/driversList';
import Standings from './features/standings';

export const App = () => {
  return (
    <>
      <SectionName>Welcome to f1-dashboard!</SectionName>
      <Grid container spacing={2}>
        <Grid item>
          <DriversList />
        </Grid>
        <Grid item>
          <Standings />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
