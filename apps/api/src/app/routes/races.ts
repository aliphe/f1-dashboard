import { Race } from '@f1-dashboard/api-interfaces';
import { Router} from 'express';
import RaceRepository from '../repositories/race.repository';
import FormulaOneService from '../services/formulaOne.service';
import AsyncHandler from './middlewares/async';
import withApiKey from './middlewares/withApiKey';
import { RequestWithPayload } from './types';

export default function createRacesRouter(
  formulaOneService: FormulaOneService,
  raceRepository: RaceRepository,
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const races = await formulaOneService.fetchRaces(Number(year));

      return res.status(200).json({
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

      return res.status(200).json({
        message: 'Races results fetched successfully',
        data: {
          results,
        },
      });
    })
  );

  router.post(
    '/',
    [withApiKey],
    AsyncHandler(async (req: RequestWithPayload<{ races: Race[], season: number }>, res) => {
      console.log(req.body);
      const races = req.body.races;
      const season = req.body.season;

      await raceRepository.upsertBatch(races, season)

      return res.status(201).json({
        message: 'Races upserted sucessfully',
        data: {
          races
        }
      });
    })
  );
  return router;
}
