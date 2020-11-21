import React, { useEffect } from 'react';
import { DriverStanding } from '@f1-dashboard/api-interfaces';
import {
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

const DriverStandings: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, isFetched, drivers } = useSelector(
    (state: RootState) => state.driversStandings
  );

  useEffect(() => {
    if (!isLoading && !isFetched) {
      dispatch(fetchDriverStandingsByYear(2020));
    }
  }, [dispatch, isLoading, isFetched]);

  if (isLoading) {
    return <div>Loading...</div>;
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
            {drivers.map((d: DriverStanding) => (
              <TableRow key={d.position}>
                <TableCell>{d.position}</TableCell>
                <TableCell>{d.driver.familyName}</TableCell>
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
