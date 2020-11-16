import React from 'react';
import { Driver } from '@f1-dashboard/api-interfaces';
import styled from 'styled-components';
import { Card } from '../../components/basics/card';

interface Props {
  driver: Driver;
}

const HorizontalCard = styled(Card)`
  display: flex;
`;

const CardTitle = styled.h3``;

const CardSubtitle = styled.span`
  color: #6b6b6b;
`;

const CardContent = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  margin: auto 0;
`;

function processAge(dateString: string): number {
  return new Date().getFullYear() - new Date(dateString).getFullYear();
}

const DriverCard: React.FC<Props> = (props: Props) => {
  const { driver } = props;
  return (
    <HorizontalCard className="driver-card">
      <CardTitle className="driver-name">
        {driver.familyName}
        <CardSubtitle>#{driver.permanentNumber}</CardSubtitle>
      </CardTitle>
      <CardContent>
        <span className="driver-nationality">{driver.nationality}</span>
        <span className="driver-age">{processAge(driver.dateOfBirth)}</span>
      </CardContent>
    </HorizontalCard>
  );
};

export default DriverCard;
