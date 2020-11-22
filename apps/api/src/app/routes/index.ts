import { PrismaClient } from '@prisma/client';
import express from 'express';
import CircuitRepository from '../repositories/circuit.repository';
import TeamStandingRepository from '../repositories/constructorStanding.repository';
import DriverRepository from '../repositories/driver.repository';
import DriverStandingRepository from '../repositories/driverStanding.repository';
import FormulaOneService from '../services/formulaOne.service';
import createCircuitsRouter from './circuits';
import createDriversRouter from './drivers';
import createStandingsRouter from './standings';

export default function createRouter(prisma: PrismaClient) {
  const app = express();

  const driverRepository = new DriverRepository(prisma);
  const driverStandingRepository = new DriverStandingRepository(prisma);
  const teamStandingRepository = new TeamStandingRepository(prisma);
  const circuitRepository = new CircuitRepository(prisma);
  const formulaOneService = new FormulaOneService(
    prisma,
    driverRepository,
    driverStandingRepository,
    teamStandingRepository,
    circuitRepository
  );

  app.use('/drivers', createDriversRouter(formulaOneService));
  app.use('/standings', createStandingsRouter(formulaOneService));

  app.use('/circuits', createCircuitsRouter(formulaOneService));

  return app;
}
