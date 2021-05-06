import { TeamStanding } from '@f1-dashboard/api-interfaces';
import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
} from '@material-ui/core';
import { RootState } from '../../../../store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeamsStandingsByYear } from './teamsStandingsSlice';
import { sortByNumber } from '../../../../helpers/utils';

const TeamsStandings: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, teams, season, isLoaded } = useSelector(
    (state: RootState) => ({
      ...state.teamsStandings,
      season: state.season.season,
    })
  );

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      dispatch(fetchTeamsStandingsByYear(season));
    }
  }, [dispatch, isLoading, season, isLoaded]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Paper>
      <Typography variant="h6" component="div">
        Teams
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Position</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortByNumber(teams, 'position').map((c: TeamStanding) => (
              <TableRow key={c.position}>
                <TableCell>{c.position}</TableCell>
                <TableCell>{c.team.name}</TableCell>
                <TableCell>{c.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TeamsStandings;
