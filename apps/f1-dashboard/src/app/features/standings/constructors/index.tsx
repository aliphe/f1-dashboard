import { ConstructorStanding} from '@f1-dashboard/api-interfaces';
import React from 'react';
import styled from 'styled-components';
import { Card } from '../../../components/basics/card';
import { SectionName } from '../../../components/basics/Section';

const List = styled.div`
  background-color: #f0f0f0;
  width: 500px;
`;

interface Props  {
  constructorStandings: ConstructorStanding[];
}

const ConstructorStandings: React.FC<Props> = (props: Props) => {
  const {constructorStandings} = props;
  return (
    <Card>
      <SectionName>Constructors Standings</SectionName>
      <List>
        {constructorStandings.map((c: ConstructorStanding) => (
          <div>
            <div>{c.position}</div>
            <div>{c.points}</div>
          </div>
        ))}
      </List>
    </Card>
  );
};

export default ConstructorStandings;
