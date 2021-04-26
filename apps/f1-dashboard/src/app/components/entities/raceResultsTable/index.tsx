import React from 'react';
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
import { RaceResult } from '@f1-dashboard/api-interfaces';
import { driverName } from '../../../helpers/format';
import { sortByNumber } from '../../../helpers/utils';

interface Props {
  raceResults: RaceResult[];
}

export default function RaceResultsTable(props: Props) {
  const { raceResults } = props;

  return (
    <Paper className={'race-list'}>
      <Typography variant="h6" component="div">
        Races Results
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Driver</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Time</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortByNumber(raceResults, 'position').map((result) => (
              <TableRow key={result.position}>
                <TableCell>{result.position}</TableCell>
                <TableCell>{driverName(result.driver)}</TableCell>
                <TableCell>{result.points}</TableCell>
                <TableCell>{result.time || 'NO TIME'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
