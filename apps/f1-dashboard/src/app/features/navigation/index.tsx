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
} from '@material-ui/core';
import { NavigationPaths } from './navigationSlice';
import { useHistory } from 'react-router-dom';

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
  })
);

const pathsDisplayName: { [key in keyof typeof NavigationPaths]: string } = {
  CIRCUITS_LIST: 'Circuits List',
  DRIVERS_LIST: 'Drivers List',
  TEAMS_LIST: 'Teams List',
  DRIVERS_STANDINGS: 'Drivers Standings',
  TEAMS_STANDINGS: 'Teams Standings',
  RACES_LIST: 'Races List',
};

const Navigation: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  console.log(Object.values(NavigationPaths));

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
      <div className={classes.drawerContainer}>
        <List>
          {Object.entries(NavigationPaths).map(([key, path]) => (
            <ListItem key={key} onClick={() => history.push(path)}>
              <ListItemText primary={pathsDisplayName[key]} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Navigation;
