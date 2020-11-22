import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import FormulaOneService from '../services/formulaOne.service';

export default function createCircuitsRouter(
  formulaOneService: FormulaOneService
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const circuits = await formulaOneService.fetchCircuits();

      return res.json({
        message: 'Circuits fetched successfully',
        data: {
          circuits,
        },
      });
    })
  );
  return router;
}
