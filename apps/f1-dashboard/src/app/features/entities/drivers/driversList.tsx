import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import { RootState } from '../../../store';
import { fetchDriversByYear } from './driversSlice';
import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import { setLastRequest } from '../../requests/requestsSlice';
import { sortByString } from '../../../helpers/utils';
import { driverName, processAge } from '../../../helpers/format';

const DriversList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, drivers, season, isLastFetched } = useSelector(
    (state: RootState) => ({
      isLoading: state.drivers.isLoading,
      drivers: Object.values(state.drivers.byId),
      season: state.season.season,
      isLastFetched: state.requests.lastRequested === 'drivers',
    })
  );

  useEffect(() => {
    if (!isLoading && !isLastFetched) {
      dispatch(fetchDriversByYear(season));
      dispatch(setLastRequest({ lastRequested: 'drivers' }));
    }
  }, [dispatch, drivers, isLoading, season, isLastFetched]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper className={'drivers-list'}>
      <Typography variant="h6" component="div">
        Drivers
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Age</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortByString(drivers, 'familyName').map((driver) => (
              <TableRow key={driver.id}>
                <TableCell>{driverName(driver)}</TableCell>
                <TableCell>{driver.permanentNumber}</TableCell>
                <TableCell>{driver.nationality}</TableCell>
                <TableCell>{processAge(driver.dateOfBirth)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default DriversList;
