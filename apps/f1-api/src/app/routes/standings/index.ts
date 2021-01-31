import { Router } from 'express';
import FormulaOneService from '../../services/formulaOne.service';
import createTeamStandingsRouter from './teams';
import createDriverStandingsRouter from './drivers';
import TeamStandingRepository from '../../repositories/teamStanding.repository';
import DriverStandingRepository from '../../repositories/driverStanding.repository';

export default function createStandingsRouter(
  formulaOneService: FormulaOneService,
  driverStandingRepository: DriverStandingRepository,
  teamStandingRepository: TeamStandingRepository
) {
  const router = Router();

  router.use(
    '/:season/drivers',
    createDriverStandingsRouter(formulaOneService, driverStandingRepository)
  );
  router.use(
    '/:season/teams',
    createTeamStandingsRouter(formulaOneService, teamStandingRepository)
  );

  return router;
}
