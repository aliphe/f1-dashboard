import { Router } from 'express';
import FormulaOneService from '../../services/formulaOne.service';
import createTeamStandingsRouter from './teams';
import createDriverStandingsRouter from './drivers';
import TeamStandingRepository from '../../repositories/constructorStanding.repository';
import DriverStandingRepository from '../../repositories/driverStanding.repository';

export default function createStandingsRouter(
  formulaOneService: FormulaOneService,
  driverStandingRepository: DriverStandingRepository,
  teamStandingRepository: TeamStandingRepository,
) {
  const router = Router();

  router.use('/drivers', createDriverStandingsRouter(formulaOneService, driverStandingRepository));
  router.use('/teams', createTeamStandingsRouter(formulaOneService, teamStandingRepository));

  return router;
}
