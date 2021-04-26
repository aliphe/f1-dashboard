import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchCircuits } from './circuitsSlice';
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
import { sortByString } from '../../../helpers/utils';

const CircuitList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, circuits, isLoaded } = useSelector((state: RootState) => ({
    isLoading: state.circuits.isLoading,
    isLoaded: state.circuits.isLoaded,
    circuits: Object.values(state.circuits.byId),
  }));

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      dispatch(fetchCircuits());
    }
  }, [dispatch, circuits, isLoading, isLoaded]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper className="circuits-list">
      <Typography variant="h6" component="div">
        Circuits
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Country</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortByString(circuits, 'name').map((circuit) => (
              <TableRow key={circuit.id}>
                <TableCell>{circuit.name}</TableCell>
                <TableCell>{circuit.city}</TableCell>
                <TableCell>{circuit.country}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CircuitList;
