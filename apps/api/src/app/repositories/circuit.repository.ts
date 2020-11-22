import { Circuit } from '@f1-dashboard/api-interfaces';
import { PrismaClient, Circuit as CircuitModel } from '@prisma/client';

export default class CircuitRepository {
  constructor(private readonly prisma: PrismaClient) {}

  upsertBatch(circuits: Circuit[]): Promise<CircuitModel[]> {
    const transaction = circuits.map((c) =>
      this.prisma.circuit.upsert({
        create: c,
        update: c,
        where: {
          id: c.id,
        },
      })
    );
    return this.prisma.$transaction(transaction);
  }
}
