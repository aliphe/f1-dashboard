import { PrismaClient } from '@prisma/client';
import express from 'express';
import CircuitRepository from '../repositories/circuit.repository';
import TeamStandingRepository from '../repositories/constructorStanding.repository';
import DriverRepository from '../repositories/driver.repository';
import DriverStandingRepository from '../repositories/driverStanding.repository';
import RaceRepository from '../repositories/race.repository';
import RaceResultRepository from '../repositories/raceResult.repository';
import FormulaOneService from '../services/formulaOne.service';
import createCircuitsRouter from './circuits';
import createDriversRouter from './drivers';
import createRacesRouter from './races';
import createStandingsRouter from './standings';

export default function createRouter(prisma: PrismaClient) {
  const app = express();

  const driverRepository = new DriverRepository(prisma);
  const driverStandingRepository = new DriverStandingRepository(prisma);
  const teamStandingRepository = new TeamStandingRepository(prisma);
  const circuitRepository = new CircuitRepository(prisma);
  const raceRepository = new RaceRepository(prisma);
  const raceResultRepository = new RaceResultRepository(prisma);
  const formulaOneService = new FormulaOneService(
    prisma,
  );

  app.use('/drivers', createDriversRouter(formulaOneService, driverRepository));
  app.use('/standings', createStandingsRouter(formulaOneService, driverStandingRepository, teamStandingRepository));

  app.use('/circuits', createCircuitsRouter(formulaOneService, circuitRepository));
  app.use('/races', createRacesRouter(formulaOneService, raceRepository));

  return app;
}
