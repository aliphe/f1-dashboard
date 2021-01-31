import { Race } from '@f1-dashboard/api-interfaces';
import { PrismaClient, Race as RaceModel } from '@prisma/client';

export default class RaceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  upsertBatch(races: Race[], season: number): Promise<RaceModel[]> {
    const transaction = races.map((c) =>
      this.prisma.race.upsert({
        create: {
          ...c,
          circuit: {
            connectOrCreate: {
              create: c.circuit,
              where: { id: c.circuit.id },
            },
          },
          season: {
            connectOrCreate: {
              create: { year: season },
              where: { year: season },
            },
          },
        },
        update: {
          ...c,
          circuit: {
            connect: {
              id: c.circuit.id,
            },
          },
          season: {
            connect: {
              year: season,
            },
          },
        },
        where: {
          round_seasonYear: { round: c.round, seasonYear: season },
        },
      })
    );
    return this.prisma.$transaction(transaction);
  }
}
