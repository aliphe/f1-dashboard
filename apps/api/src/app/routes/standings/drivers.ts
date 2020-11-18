import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import FormulaOneService from '../../services/formulaOne.service';

export default function createDriverStandingsRouter(
  formulaOneService: FormulaOneService
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const driverStandings = await formulaOneService.fetchDriverStandings(
        year ? Number(year) : undefined
      );

      return res.json({
        message: 'Drivers standings fetched successfully',
        data: {
          driverStandings,
        },
      });
    })
  );

  return router;
}
