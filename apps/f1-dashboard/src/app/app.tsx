import React from 'react';
import styled from 'styled-components';
import { SectionName } from './components/basics/Section';
import DriversList from './features/drivers/driversList';
import Standings from './features/standings';

const MainDisplay = styled.div`
  display: flex;
`;

export const App = () => {
  return (
    <>
      <SectionName>Welcome to f1-dashboard!</SectionName>
      <MainDisplay>
        <DriversList />
        <Standings />
      </MainDisplay>
    </>
  );
};

export default App;
