import {
  TeamStanding,
  Driver,
  DriverStanding,
  Circuit,
  Race,
} from '@f1-dashboard/api-interfaces';
import { PrismaClient } from '@prisma/client';
import { isLastUpdateOlder, isOlderThan } from '../helpers/time';
import CircuitRepository from '../repositories/circuit.repository';
import TeamStandingRepository from '../repositories/constructorStanding.repository';
import DriverRepository from '../repositories/driver.repository';
import DriverStandingRepository from '../repositories/driverStanding.repository';
import RaceRepository from '../repositories/race.repository';
import RaceResultRepository from '../repositories/raceResult.repository';
import CircuitsServiceWrapper from '../serviceWrappers/formula-one-api/circuits';
import DriversServiceWrapper from '../serviceWrappers/formula-one-api/drivers';
import RacesServiceWrapper from '../serviceWrappers/formula-one-api/races';
import StandingsServiceWrapper from '../serviceWrappers/formula-one-api/standings';

export default class FormulaOneService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly driverRepository: DriverRepository,
    private readonly driverStandingRepository: DriverStandingRepository,
    private readonly teamStandingRepository: TeamStandingRepository,
    private readonly circuitRepository: CircuitRepository,
    private readonly raceRepository: RaceRepository,
    private readonly raceResultRepository: RaceResultRepository
  ) {}

  async fetchDrivers(season: number): Promise<Driver[]> {
    const cachedDrivers = await this.prisma.driver.findMany({
      where: {
        seasons: {
          some: {
            year: season,
          },
        },
      },
    });
    if (!cachedDrivers.length || isLastUpdateOlder(cachedDrivers, 7)) {
      const fetchedDrivers = await DriversServiceWrapper.fetchDrivers(season);

      await this.driverRepository.upsertBatch(fetchedDrivers, season);

      return fetchedDrivers;
    }
    return cachedDrivers.map((d) => ({
      ...d,
      dateOfBirth: d.dateOfBirth.toISOString(),
    }));
  }

  async fetchDriverStandings(season: number): Promise<DriverStanding[]> {
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
      isLastUpdateOlder(cachedDriversStandings, 7)
    ) {
      const fetchedDriversStandings = await StandingsServiceWrapper.fetchDriverStandings(
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

  async fetchTeamStandings(season: number): Promise<TeamStanding[]> {
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
      isLastUpdateOlder(cachedTeamsStandings, 7)
    ) {
      const fetchedTeamsStandings = await StandingsServiceWrapper.fetchTeamStandings(
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

  async fetchCircuits(): Promise<Circuit[]> {
    const cachedCircuits = await this.prisma.circuit.findMany();
    if (!cachedCircuits.length || isLastUpdateOlder(cachedCircuits, 7)) {
      const fetchedCircuits = await CircuitsServiceWrapper.fetchCircuits();

      await this.circuitRepository.upsertBatch(fetchedCircuits);
      return fetchedCircuits;
    }
    return cachedCircuits;
  }

  async fetchRaces(season: number): Promise<Race[]> {
    const cachedRaces = await this.prisma.race.findMany({
      where: {
        season: {
          year: season,
        },
      },
      include: {
        circuit: true,
        season: true,
      },
    });
    if (!cachedRaces.length || isLastUpdateOlder(cachedRaces, 7)) {
      const fetchedRaces = await RacesServiceWrapper.fetchRaces(season);
      await this.raceRepository.upsertBatch(fetchedRaces, season);
      return fetchedRaces;
    }
    return cachedRaces.map((r) => ({
      ...r,
      date: r.date.toISOString(),
    }));
  }

  async fetchRaceResults(season: number, round: number) {
    const cachedRaceResults = await this.prisma.raceResult.findMany({
      where: {
        race: {
          seasonYear: season,
          round: round,
        },
      },
      include: {
        driver: true,
        team: true,
      },
    });

    if (!cachedRaceResults.length || isLastUpdateOlder(cachedRaceResults, 7)) {
      const { race, results } = await RacesServiceWrapper.fetchRaceResult(
        season,
        round
      );

      await this.raceResultRepository.upsertBatch(race, results);
      return results;
    }
    return cachedRaceResults;
  }
}
