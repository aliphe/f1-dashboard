import { TeamStanding } from '@f1-dashboard/api-interfaces';
import {
  PrismaClient,
  TeamStanding as TeamStandingModel,
} from '@prisma/client';

export default class TeamStandingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  upsertBatch(
    teams: TeamStanding[],
    season: number
  ): Promise<TeamStandingModel[]> {
    const transaction = teams.map((c) =>
      this.prisma.teamStanding.upsert({
        where: { position: Number(c.position) },
        create: {
          ...c,
          team: {
            connectOrCreate: {
              create: c.team,
              where: {
                id: c.team.id,
              },
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
          team: {
            connectOrCreate: {
              create: c.team,
              where: {
                id: c.team.id,
              },
            },
          },
          season: {
            connectOrCreate: {
              create: { year: season },
              where: { year: season },
            },
          },
        },
      })
    );
    return this.prisma.$transaction(transaction);
  }
}