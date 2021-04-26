import React from 'react';
import {
  AppBar,
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      zIndex: theme.zIndex.drawer + 1,
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.appBar} position="static">
      <Toolbar>
        <Typography variant="h6">F1 Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
