import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  createStyles,
  Toolbar,
  Divider,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import SeasonSelector from '../seasonSelector';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

export enum BasicNavigationPaths {
  DRIVERS_LIST = '/drivers',
  TEAMS_LIST = '/teams',
  DRIVERS_STANDINGS = '/standings/drivers',
  TEAMS_STANDINGS = '/standings/teams',
  CIRCUITS_LIST = '/circuits',
  RACES_LIST = '/races',
}

export enum ChartsNavigationPaths {
  CUSTOM_POINT_SYSTEM = '/standings/drivers/custom',
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      width: 240,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    divider: {
      marginTop: `${theme.spacing(5)}px`,
    },
    dividerLabel: {
      margin: `5px 0 0 ${theme.spacing(2)}px`,
    },
  })
);

const basicPathsDisplayName: {
  [key in keyof typeof BasicNavigationPaths]: string;
} = {
  CIRCUITS_LIST: 'Circuits List',
  DRIVERS_LIST: 'Drivers List',
  TEAMS_LIST: 'Teams List',
  DRIVERS_STANDINGS: 'Drivers Standings',
  TEAMS_STANDINGS: 'Teams Standings',
  RACES_LIST: 'Races List',
};

const chartsPathDisplayName: {
  [key in keyof typeof ChartsNavigationPaths]: string;
} = {
  CUSTOM_POINT_SYSTEM: 'Custom Point System',
};

const Navigation: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const season = useSelector((state: RootState) => state.season.season);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Toolbar />
      <SeasonSelector />
      <div className={classes.drawerContainer}>
        <List>
          <Divider component="li" />
          <li>
            <Typography
              className={classes.dividerLabel}
              color="textSecondary"
              display="block"
              variant="caption"
            >
              Basic Data
            </Typography>
          </li>
          {Object.entries(BasicNavigationPaths).map(([key, path]) => (
            <ListItem
              button
              key={key}
              onClick={() => history.push(`/season/${season}` + path)}
            >
              <ListItemText primary={basicPathsDisplayName[key]} />
            </ListItem>
          ))}
          <Divider className={classes.divider} component="li" />
          <li>
            <Typography
              className={classes.dividerLabel}
              color="textSecondary"
              display="block"
              variant="caption"
            >
              Charts
            </Typography>
          </li>
          {Object.entries(ChartsNavigationPaths).map(([key, path]) => (
            <ListItem
              button
              key={key}
              onClick={() => history.push(`/season/${season}` + path)}
            >
              <ListItemText primary={chartsPathDisplayName[key]} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Navigation;
