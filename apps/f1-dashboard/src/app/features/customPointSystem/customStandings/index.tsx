import {
  DriverStanding,
  PointSystem,
  RaceResult,
} from '@f1-dashboard/api-interfaces';
import React from 'react';
import DriverStandingsTable from '../../../components/entities/standings/drivers';

interface Props {
  results: RaceResult[];
  pointSystem: PointSystem;
}

const CustomStandings: React.FC<Props> = (props: Props) => {
  const { results, pointSystem } = props;

  const pointsByDriver = results.reduce(
    (rankings: { [driverId: string]: DriverStanding }, result) => {
      if (!rankings[result.driver.id]) {
        rankings[result.driver.id] = {
          driver: result.driver,
          points: 0,
          position: 0,
          wins: 0,
        };
      }
      rankings[result.driver.id].points +=
        pointSystem.pointsByPosition[result.position] || 0;
      if (
        result.position <= 10 &&
        !Object.values(pointSystem.pointsByPosition).find(
          (p) => p === result.points
        )
      ) {
        rankings[result.driver.id].points += pointSystem.fastestLap;
      }
      rankings[result.driver.id].wins += result.position === 1 ? 1 : 0;
      return rankings;
    },
    {}
  );

  const driversStandings = Object.values(pointsByDriver)
    .sort((a, b) => b.points - a.points)
    .map((standing, index) => ({
      ...standing,
      position: index + 1,
    }));
  return <DriverStandingsTable standings={driversStandings} />;
};

export default CustomStandings;
