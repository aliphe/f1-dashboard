import { RootState } from '../../../../store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setLastRequest } from '../../../requests/requestsSlice';
import { fetchRaceResults, setLastRoundRequest } from './raceResultsSlice';
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
import { sortByNumber } from '../../../../helpers/utils';
import { driverName } from '../../../../helpers/format';

const selector = (round: number) => (state: RootState) => ({
  season: state.season.season,
  raceResults:
    Number(round) === state.raceResults.round
      ? state.raceResults.raceResults
      : [],
  isLoading: state.raceResults.isLoading,
  isLastRequested:
    Number(round) === state.raceResults.round &&
    state.requests.lastRequested === 'raceResults',
});

const RaceResults: React.FC = () => {
  const dispatch = useDispatch();
  const { round } = useParams<{ round: string }>();
  const { season, raceResults, isLoading, isLastRequested } = useSelector(
    selector(Number(round))
  );

  useEffect(() => {
    if (!isLoading && !isLastRequested) {
      dispatch(
        fetchRaceResults({
          season,
          round: Number(round),
        })
      );
      dispatch(setLastRequest({ lastRequested: 'raceResults' }));
      dispatch(setLastRoundRequest({ round: Number(round) }));
    }
  }, [season, dispatch, isLoading, round, isLastRequested]);

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
};

export default RaceResults;
