import { Race, RaceResult } from '@f1-dashboard/api-interfaces';
import { PrismaClient, RaceResult as RaceResultModel } from '@prisma/client';

export default class RaceResultRepository {
  constructor(private readonly prisma: PrismaClient) {}

  upsertBatch(
    race: Race,
    raceResults: RaceResult[]
  ): Promise<RaceResultModel[]> {
    const transaction = raceResults.map((r) =>
      this.prisma.raceResult.upsert({
        create: {
          ...r,
          team: {
            connect: {
              id: r.team.id,
            },
          },
          driver: {
            connect: {
              id: r.driver.id,
            },
          },
          race: {
            connect: {
              round_seasonYear: {
                round: race.round,
                seasonYear: race.season.year,
              },
            },
          },
        },
        update: {
          ...r,
          team: {
            connect: {
              id: r.team.id,
            },
          },
          driver: {
            connect: {
              id: r.driver.id,
            },
          },
          race: {
            connect: {
              round_seasonYear: {
                round: race.round,
                seasonYear: race.season.year,
              },
            },
          },
        },
        where: {
          position_raceRound_raceSeasonYear: {
            position: r.position,
            raceRound: race.round,
            raceSeasonYear: race.season.year,
          },
        },
      })
    );
    return this.prisma.$transaction(transaction);
  }
}
