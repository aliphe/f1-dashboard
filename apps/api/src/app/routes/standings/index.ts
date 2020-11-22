import { Router } from 'express';
import FormulaOneService from '../../services/formulaOne.service';
import createTeamStandingsRouter from './teams';
import createDriverStandingsRouter from './drivers';

export default function createStandingsRouter(
  formulaOneService: FormulaOneService
) {
  const router = Router();

  router.use('/drivers', createDriverStandingsRouter(formulaOneService));
  router.use('/teams', createTeamStandingsRouter(formulaOneService));

  return router;
}
