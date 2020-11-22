import { Grid } from '@material-ui/core';
import React from 'react';
import Header from './components/Header';
import Navigation from './features/navigation';
import Features from './features';

export const App = () => {
  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        <Grid item>
          <Navigation />
        </Grid>
        <Grid item>
          <Features />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
