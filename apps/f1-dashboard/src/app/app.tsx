import { Grid } from '@material-ui/core';
import React from 'react';
import Header from './components/Header';
import Navigation from './features/navigation';
import Tables from './features/tables';

export const App = () => {
  return (
    <div>
      <Header />
      <Grid container spacing={2}>
        <Grid item>
          <Navigation />
        </Grid>
        <Grid item>
          <Tables />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
