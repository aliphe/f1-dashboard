import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchCircuits } from './circuitsSlice';
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

const CircuitList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, circuits } = useSelector((state: RootState) => ({
    isLoading: state.circuits.isLoading,
    circuits: Object.values(state.circuits.byId),
  }));

  useEffect(() => {
    if (!isLoading && !circuits.length) {
      dispatch(fetchCircuits());
    }
  }, [dispatch, circuits, isLoading]);

  console.log(circuits);
  return (
    <Paper className={'circuits-list'}>
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
            {circuits.map((circuit) => (
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
