import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import FormulaOneService from '../services/formulaOne.service';

export default function createDriversRouter(
  formulaOneService: FormulaOneService
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const drivers = await formulaOneService.fetchDrivers(
        year ? Number(year) : undefined
      );
      return res.json({
        message: 'Drivers fetched successfully',
        data: {
          drivers,
        },
      });
    })
  );

  return router;
}
