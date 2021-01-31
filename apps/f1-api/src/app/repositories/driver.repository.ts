import { Driver } from '@f1-dashboard/api-interfaces';
import { PrismaClient, Driver as DriverModel } from '@prisma/client';

export default class DriverRepository {
  constructor(private readonly prisma: PrismaClient) {}

  upsertBatch(drivers: Driver[], season: number): Promise<DriverModel[]> {
    const transaction = drivers.map((d) =>
      this.prisma.driver.upsert({
        where: { id: d.id },
        create: {
          ...{ ...d, driverId: undefined },
          id: d.id,
          permanentNumber: Number(d.permanentNumber) || null,
          dateOfBirth: new Date(d.dateOfBirth),
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
