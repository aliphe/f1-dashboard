import React from 'react';
import { DriverStanding } from '@f1-dashboard/api-interfaces';
import styled from 'styled-components';
import { Card } from '../../../components/basics/card';
import { SectionName } from '../../../components/basics/Section';

const List = styled.div`
  background-color: #f0f0f0;
  width: 500px;
`;

interface Props {
  driverStandings: DriverStanding[];
}

const DriverStandings: React.FC<Props> = (props: Props) => {
  const {driverStandings} = props;
  return (
    <Card>
      <SectionName>Drivers Standings</SectionName>
      <List>
        {driverStandings.map((d: DriverStanding) => (
          <div>
            <div>{d.position}</div>
            <div>{d.points}</div>
          </div>
        ))}
      </List>
    </Card>
  );
};

export default DriverStandings;
