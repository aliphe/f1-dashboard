import { RaceResult } from '@f1-dashboard/api-interfaces';
import { PrismaClient, RaceResult as RaceResultModel } from '@prisma/client';

export default class RaceResultRepository {
  constructor(private readonly prisma: PrismaClient) {}

  upsertBatch(
    raceResults: RaceResult[],
    season: number,
    round: number
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
                round: round,
                seasonYear: season,
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
                round: round,
                seasonYear: season,
              },
            },
          },
        },
        where: {
          position_raceRound_raceSeasonYear: {
            position: r.position,
            raceRound: round,
            raceSeasonYear: season,
          },
        },
      })
    );
    return this.prisma.$transaction(transaction);
  }
}
