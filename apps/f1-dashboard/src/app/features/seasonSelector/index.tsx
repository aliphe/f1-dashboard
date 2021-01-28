import { createStyles, makeStyles, TextField, Theme } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { selectSeason } from './seasonSelectorSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      margin: '20px',
    },
  })
);

const SeasonSelector: React.FC = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const { season } = useSelector((state: RootState) => ({
    season: state.season.season,
  }));

  return (
    <TextField
      className={styles.textField}
      label="Season"
      variant="outlined"
      type="number"
      onChange={(e) =>
        dispatch(
          selectSeason({ season: (e.target.value as unknown) as number })
        )
      }
      value={season}
    />
  );
};

export default SeasonSelector;
