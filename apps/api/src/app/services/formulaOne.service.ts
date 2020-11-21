import {
  TeamStanding,
  Driver,
  DriverStanding,
} from '@f1-dashboard/api-interfaces';
import { PrismaClient } from '@prisma/client';
import { useImperativeHandle } from 'react';
import { isOlderThan } from '../helpers/time';
import TeamStandingRepository from '../repositories/constructorStanding.repository';
import DriverRepository from '../repositories/driver.repository';
import DriverStandingRepository from '../repositories/driverStanding.repository';
import {
  driversServiceWrapper,
  standingsServiceWrapper,
} from '../serviceWrappers/formula-one-api';

export default class FormulaOneService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly driverRepository: DriverRepository,
    private readonly driverStandingRepository: DriverStandingRepository,
    private readonly teamStandingRepository: TeamStandingRepository
  ) {}

  async fetchDrivers(season?: number): Promise<Driver[]> {
    const cachedDrivers = await this.prisma.driver.findMany({
      where: {
        seasons: {
          some: {
            year: season,
          },
        },
      },
    });
    if (
      !cachedDrivers.length ||
      cachedDrivers.some((d) => isOlderThan(d.updatedAt, 7))
    ) {
      const fetchedDrivers = await driversServiceWrapper.fetchDrivers(season);

      await this.driverRepository.upsertBatch(fetchedDrivers, season);

      return fetchedDrivers;
    }
    return cachedDrivers.map((d) => ({
      ...d,
      dateOfBirth: d.dateOfBirth.toISOString(),
    }));
  }

  async fetchDriverStandings(season?: number): Promise<DriverStanding[]> {
    const cachedDriversStandings = await this.prisma.driverStanding.findMany({
      where: {
        season: {
          year: season,
        },
      },
      include: {
        driver: true,
      },
    });
    if (
      !cachedDriversStandings.length ||
      cachedDriversStandings.some((d) => isOlderThan(d.updatedAt, 7))
    ) {
      const fetchedDriversStandings = await standingsServiceWrapper.fetchDriverStandings(
        season
      );
      await this.driverStandingRepository.upsertBatch(
        fetchedDriversStandings,
        season
      );
      return fetchedDriversStandings;
    }
    return cachedDriversStandings.map((d) => ({
      ...d,
      driver: {
        ...d.driver,
        dateOfBirth: d.driver.dateOfBirth.toISOString(),
      },
    }));
  }

  async fetchTeamStandings(season?: number): Promise<TeamStanding[]> {
    const cachedTeamsStandings = await this.prisma.teamStanding.findMany({
      where: {
        season: {
          year: season,
        },
      },
      include: {
        team: true,
      },
    });
    if (
      !cachedTeamsStandings.length ||
      cachedTeamsStandings.some((d) => isOlderThan(d.updatedAt, 7))
    ) {
      const fetchedTeamsStandings = await standingsServiceWrapper.fetchTeamStandings(
        season
      );
      await this.teamStandingRepository.upsertBatch(
        fetchedTeamsStandings,
        season
      );
      return fetchedTeamsStandings;
    }
    return cachedTeamsStandings;
  }
}
