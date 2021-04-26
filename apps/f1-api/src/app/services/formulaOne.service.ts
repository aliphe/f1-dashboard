import {
  TeamStanding,
  Driver,
  DriverStanding,
  Circuit,
  Race,
  Team,
  RaceResult,
} from '@f1-dashboard/api-interfaces';
import { PrismaClient } from '@prisma/client';

export default class FormulaOneService {
  constructor(private readonly prisma: PrismaClient) {}

  async fetchDrivers(season: number): Promise<Driver[]> {
    const drivers = await this.prisma.driver.findMany({
      where: {
        seasons: {
          some: {
            year: season,
          },
        },
      },
    });
    return drivers.map((d) => ({
      ...d,
      dateOfBirth: d.dateOfBirth.toISOString(),
    }));
  }

  async fetchDriverStandings(season: number): Promise<DriverStanding[]> {
    const driversStandings = await this.prisma.driverStanding.findMany({
      where: {
        season: {
          year: season,
        },
      },
      include: {
        driver: true,
      },
    });
    return driversStandings.map((d) => ({
      ...d,
      driver: {
        ...d.driver,
        dateOfBirth: d.driver.dateOfBirth.toISOString(),
      },
    }));
  }

  async fetchTeams(season: number): Promise<Team[]> {
    const teams = await this.prisma.team.findMany({
      where: {
        seasons: {
          some: {
            year: season,
          },
        },
      },
    });
    return teams;
  }

  async fetchTeamStandings(season: number): Promise<TeamStanding[]> {
    const teamsStandings = await this.prisma.teamStanding.findMany({
      where: {
        season: {
          year: season,
        },
      },
      include: {
        team: true,
      },
    });
    return teamsStandings;
  }

  async fetchCircuits(): Promise<Circuit[]> {
    const circuits = await this.prisma.circuit.findMany();
    return circuits;
  }

  async fetchRaces(season: number): Promise<Race[]> {
    const races = await this.prisma.race.findMany({
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
    return races.map((r) => ({
      ...r,
      date: r.date.toISOString(),
    }));
  }

  async fetchRaceResults(
    season: number,
    round?: number
  ): Promise<RaceResult[]> {
    const raceResults = await this.prisma.raceResult.findMany({
      where: {
        race: {
          seasonYear: season,
          round,
        },
      },
      include: {
        driver: true,
        team: true,
      },
    });

    return raceResults.map((r) => ({
      ...r,
      round: r.raceRound,
      driver: {
        ...r.driver,
        dateOfBirth: r.driver.dateOfBirth.toISOString(),
      },
    }));
  }
}
