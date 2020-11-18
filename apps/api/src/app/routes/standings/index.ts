import { Router } from 'express';
import FormulaOneService from '../../services/formulaOne.service';
import createConstructorStandingsRouter from './constructors';
import createDriverStandingsRouter from './drivers';

export default function createStandingsRouter(
  formulaOneService: FormulaOneService
) {
  const router = Router();

  router.use('/drivers', createDriverStandingsRouter(formulaOneService));
  router.use(
    '/constructors',
    createConstructorStandingsRouter(formulaOneService)
  );

  return router;
}
