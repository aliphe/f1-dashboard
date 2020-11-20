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
import { RootState } from '../../../../store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConstructorsStandingsByYear } from './constructorsStandingsSlice';

const ConstructorsStandings: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, isFetched, constructors } = useSelector(
    (state: RootState) => state.constructorsStandings
  );

  useEffect(() => {
    if (!isLoading && !isFetched) {
      dispatch(fetchConstructorsStandingsByYear(2020));
    }
  }, [dispatch, isLoading, isFetched]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
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
            {constructors.map((c: ConstructorStanding) => (
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

export default ConstructorsStandings;
