import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Card } from '../../components/basics/card';
import { SectionName } from '../../components/basics/Section';
import { RootState } from '../../store';
import DriverCard from './driverCard';
import { fetchDriversByYear } from './driversSlice';

const List = styled.div`
  background-color: #f0f0f0;
  width: 500px;
`;

const DriversList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, drivers } = useSelector((state: RootState) => ({
    isLoading: state.drivers.isLoading,
    drivers: Object.values(state.drivers.byId),
  }));

  useEffect(() => {
    if (!isLoading && !drivers.length) {
      dispatch(fetchDriversByYear(2020));
    }
  }, [dispatch, drivers, isLoading]);

  return (
    <Card>
      <SectionName>Drivers list</SectionName>
      <List>
        {drivers.map((driver) => (
          <DriverCard driver={driver} />
        ))}
      </List>
    </Card>
  );
};

export default DriversList;
