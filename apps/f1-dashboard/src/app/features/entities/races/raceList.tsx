import { CircularProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RacesTable from '../../../components/entities/racesTable';
import { RootState } from '../../../store';
import { fetchRaces } from './racesSlice';

const RaceList: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, races, season, isLoaded } = useSelector(
    (state: RootState) => ({
      ...state.races,
      season: state.season.season,
    })
  );

  useEffect(() => {
    if (!isLoaded && !isLoading) {
      dispatch(fetchRaces(season));
    }
  }, [season, dispatch, isLoading, isLoaded]);

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <RacesTable
      races={races}
      onRaceDetails={(round: number) => history.push(`/races/${round}/results`)}
    />
  );
};

export default RaceList;
