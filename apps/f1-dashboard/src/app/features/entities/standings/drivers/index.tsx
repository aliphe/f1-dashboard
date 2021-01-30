import React, { useEffect } from 'react';
import { DriverStanding } from '@f1-dashboard/api-interfaces';
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchDriverStandingsByYear } from './driverStandingsSlice';
import { RootState } from '../../../../store';
import { setLastRequest } from '../../../requests/requestsSlice';
import { sortByNumber } from '../../../../helpers/utils';
import { driverName } from '../../../../helpers/format';

const DriverStandings: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, drivers, season, isLastRequested } = useSelector(
    (state: RootState) => ({
      ...state.driversStandings,
      season: state.season.season,
      isLastRequested: state.requests.lastRequested === 'driversStandings',
    })
  );

  useEffect(() => {
    if (!isLoading && !isLastRequested) {
      dispatch(fetchDriverStandingsByYear(season));
      dispatch(setLastRequest({ lastRequested: 'driversStandings' }));
    }
  }, [dispatch, isLoading, isLastRequested, season]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper>
      <Typography variant="h6" component="div">
        Drivers
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortByNumber(drivers, 'position').map((d: DriverStanding) => (
              <TableRow key={d.position}>
                <TableCell>{d.position}</TableCell>
                <TableCell>{driverName(d.driver)}</TableCell>
                <TableCell>{d.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DriverStandings;
