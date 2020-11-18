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

interface Props {
  driverStandings: DriverStanding[];
}

const DriverStandings: React.FC<Props> = (props: Props) => {
  const { driverStandings } = props;
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
            {driverStandings.map((d: DriverStanding) => (
              <TableRow key={d.position}>
                <TableCell>{d.position}</TableCell>
                <TableCell>{d.Driver.familyName}</TableCell>
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
