import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../helpers/format';
import { sortByNumber } from '../../../helpers/utils';
import { RootState } from '../../../store';
import { setLastRequest } from '../../requests/requestsSlice';
import { fetchRaces } from './racesSlice';

const RaceList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, races, season, isLastRequested } = useSelector(
    (state: RootState) => ({
      ...state.races,
      season: state.season.season,
      isLastRequested: state.requests.lastRequested === 'races',
    })
  );

  useEffect(() => {
    if (!isLoading && !isLastRequested) {
      dispatch(fetchRaces(season));
      dispatch(setLastRequest({ lastRequested: 'races' }));
    }
  }, [season, dispatch, isLoading, isLastRequested]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper className={'race-list'}>
      <Typography variant="h6" component="div">
        Races
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Round</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortByNumber(races, 'round').map((race) => (
              <TableRow key={race.round}>
                <TableCell>{race.round}</TableCell>
                <TableCell>{race.name}</TableCell>
                <TableCell>{formatDate(race.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RaceList;
