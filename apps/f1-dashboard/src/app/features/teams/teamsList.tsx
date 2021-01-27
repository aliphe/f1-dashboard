import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import { RootState } from '../../store';
import { fetchTeamsByYear } from './teamsSlice';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';

function processAge(dateString: string): number {
  return new Date().getFullYear() - new Date(dateString).getFullYear();
}

const TeamsList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, teams } = useSelector((state: RootState) => ({
    isLoading: state.teams.isLoading,
    teams: Object.values(state.teams.byId),
  }));

  useEffect(() => {
    if (!isLoading && !teams.length) {
      dispatch(fetchTeamsByYear(2020));
    }
  }, [dispatch, teams, isLoading]);

  return (
    <Paper className={'teams-list'}>
      <Typography variant="h6" component="div">
        Teams
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Nationality</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>{team.name}</TableCell>
                <TableCell>{team.nationality}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TeamsList;
