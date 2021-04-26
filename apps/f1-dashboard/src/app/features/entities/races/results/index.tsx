import { RootState } from '../../../../store';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRaceResults } from './raceResultsSlice';
import RaceResultsTable from '../../../../components/entities/raceResultsTable';

const selector = (round: number) => (state: RootState) => ({
  season: state.season.season,
  raceResults: state.raceResults[round]?.results || [],
  isLoading: !!state.raceResults[round]?.isLoading,
  isLoaded: !!state.raceResults[round]?.isLoaded,
});

const RaceResults: React.FC = () => {
  const dispatch = useDispatch();
  const { round } = useParams<{ round: string }>();
  const { season, raceResults, isLoading, isLoaded } = useSelector(
    selector(Number(round))
  );

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      dispatch(
        fetchRaceResults({
          season,
          round: Number(round),
        })
      );
    }
  }, [season, dispatch, isLoading, round, isLoaded]);

  return <RaceResultsTable raceResults={raceResults} />;
};

export default RaceResults;
