import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import FormulaOneService from '../../services/formulaOne.service';

export default function createConstructorStandingsRouter(
  formulaOneService: FormulaOneService
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const constructorStandings = await formulaOneService.fetchConstructorStandings(
        year ? Number(year) : undefined
      );

      return res.json({
        message: 'Constructors standings fetched successfully',
        data: {
          constructorStandings,
        },
      });
    })
  );

  return router;
}
