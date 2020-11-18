import { ConstructorStanding } from '@f1-dashboard/api-interfaces';
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import React from 'react';

interface Props {
  constructorStandings: ConstructorStanding[];
}

const ConstructorStandings: React.FC<Props> = (props: Props) => {
  const { constructorStandings } = props;

  return (
    <Paper>
      <Typography variant="h6" component="div">
        Constructors
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Constructor</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {constructorStandings.map((c: ConstructorStanding) => (
              <TableRow key={c.position}>
                <TableCell>{c.position}</TableCell>
                <TableCell>{c.Constructor.name}</TableCell>
                <TableCell>{c.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ConstructorStandings;
