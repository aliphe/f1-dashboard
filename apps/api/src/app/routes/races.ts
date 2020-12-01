import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import FormulaOneService from '../services/formulaOne.service';

export default function createRacesRouter(
  formulaOneService: FormulaOneService
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const races = await formulaOneService.fetchRaces(Number(year));

      return res.json({
        message: 'Races fetched successfully',
        data: {
          races,
        },
      });
    })
  );
  router.get(
    '/results',
    AsyncHandler(async (req, res) => {
      const { year, round } = req.query;

      const results = await formulaOneService.fetchRaceResults(
        Number(year),
        Number(round)
      );

      return res.json({
        message: 'Races results fetched successfully',
        data: {
          results,
        },
      });
    })
  );
  return router;
}
