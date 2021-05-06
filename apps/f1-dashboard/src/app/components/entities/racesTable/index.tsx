import { Race } from '@f1-dashboard/api-interfaces';
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import React from 'react';
import { formatDate } from '../../../helpers/format';
import { sortByNumber } from '../../../helpers/utils';

interface Props {
  races: Race[];
  onRaceDetails: (round: number) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    clickable: {
      cursor: 'pointer',
    },
  })
);

export default function RacesTable(props: Props) {
  const { races, onRaceDetails } = props;

  const classes = useStyles();

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

          <TableBody className={classes.clickable}>
            {sortByNumber(races, 'round').map((race) => (
              <TableRow
                hover
                key={race.round}
                onClick={() => onRaceDetails(race.round)}
              >
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
}
