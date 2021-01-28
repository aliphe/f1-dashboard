import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '@material-ui/core/TableContainer';
import { RootState } from '../../../store';
import { fetchTeamsByYear } from './teamsSlice';
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

const TeamsList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, teams, season, isLastRequested } = useSelector(
    (state: RootState) => ({
      isLoading: state.teams.isLoading,
      teams: Object.values(state.teams.byId),
      season: state.season.season,
      isLastRequested: state.requests.lastRequested === 'teams',
    })
  );

  useEffect(() => {
    if (!isLoading && !isLastRequested) {
      dispatch(fetchTeamsByYear(season));
      dispatch(setLastRequest({ lastRequested: 'teams' }));
    }
  }, [dispatch, teams, isLoading, season, isLastRequested]);

  if (isLoading) {
    return <CircularProgress />;
  }

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
