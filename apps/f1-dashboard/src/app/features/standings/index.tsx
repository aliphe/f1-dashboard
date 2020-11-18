import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../../components/basics/card';
import { SectionName } from '../../components/basics/Section';

import { RootState } from '../../store';
import { fetchConstructorStandingsByYear, fetchDriverStandingsByYear } from './standingsSlice';
import ConstructorStandings from './constructors';
import DriverStandings from './drivers';
import styled from 'styled-components';

const DriversContent = styled.div`
display: flex;
`

const Standings: React.FC = () => {
  const dispatch = useDispatch();
  const { drivers, constructors, isLoading } = useSelector(
    (state: RootState) => state.standings
  );

  useEffect(() => {
    if (!isLoading && (!drivers.length || !constructors.length)) {
      dispatch(fetchDriverStandingsByYear(2020));
      dispatch(fetchConstructorStandingsByYear(2020));
    }
  }, [dispatch, isLoading, drivers, constructors]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Card>
      <SectionName>Standings</SectionName>
      <DriversContent>
      <DriverStandings driverStandings={drivers}/>
      <ConstructorStandings constructorStandings={constructors}/>
      </DriversContent>
    </Card>
  );
};

export default Standings;
