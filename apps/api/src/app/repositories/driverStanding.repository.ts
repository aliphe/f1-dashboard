import { DriverStanding } from '@f1-dashboard/api-interfaces';
import {
  PrismaClient,
  DriverStanding as DriverStandingModel,
} from '@prisma/client';

export default class DriverStandingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  upsertBatch(
    drivers: DriverStanding[],
    season: number
  ): Promise<DriverStandingModel[]> {
    const transaction = drivers.map((d) =>
      this.prisma.driverStanding.upsert({
        where: { position: Number(d.position) },
        create: {
          ...d,
          driver: {
            connect: {
              id: d.driver.id,
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
          ...d,
          driver: {
            connect: {
              id: d.driver.id,
            },
          },
        },
      })
    );
    return this.prisma.$transaction(transaction);
  }
}
