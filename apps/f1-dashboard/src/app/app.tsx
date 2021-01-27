import { Grid } from '@material-ui/core';
import React from 'react';
import Header from './components/Header';
import Navigation from './features/navigation';
import SeasonSelector from './features/seasonSelector';
import Router from './router';

export const App = () => {
  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        <Grid item>
          <Navigation />
        </Grid>
        <Grid item>
          <Router />
        </Grid>
        <Grid item>
          <SeasonSelector />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
