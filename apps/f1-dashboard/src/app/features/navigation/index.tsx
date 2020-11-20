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
import { navigate, NavigationChoice } from './navigationSlice';
import { useDispatch } from 'react-redux';

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

const Navigation: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

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
          {Object.values(NavigationChoice).map((c) => (
            <ListItem
              button
              onClick={() => dispatch(navigate({ navigation: c }))}
              key={c}
            >
              <ListItemText primary={c} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default Navigation;
