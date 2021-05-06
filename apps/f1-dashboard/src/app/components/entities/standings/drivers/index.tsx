import React from 'react';
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
import { sortByNumber } from '../../../../helpers/utils';
import { driverName } from '../../../../helpers/format';

interface Props {
  standings: DriverStanding[];
}

const DriverStandingsTable: React.FC<Props> = (props: Props) => {
  const { standings: drivers } = props;

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

export default DriverStandingsTable;
