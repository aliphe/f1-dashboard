import { Team } from '@f1-dashboard/api-interfaces';
import { PrismaClient, Team as TeamModel } from '@prisma/client';

export default class TeamRepository {
  constructor(private readonly prisma: PrismaClient) {}

  upsertBatch(teams: Team[], season: number): Promise<TeamModel[]> {
    const transaction = teams.map((d) =>
      this.prisma.team.upsert({
        where: { id: d.id },
        create: {
          ...{ ...d, teamId: undefined },
          id: d.id,
          seasons: {
            connectOrCreate: {
              create: {
                year: season,
              },
              where: {
                year: season,
              },
            },
          },
        },
        update: {
          seasons: {
            connectOrCreate: {
              create: {
                year: season,
              },
              where: {
                year: season,
              },
            },
          },
        },
      })
    );
    return this.prisma.$transaction(transaction);
  }
}
