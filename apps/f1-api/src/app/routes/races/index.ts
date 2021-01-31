import { Router } from 'express';
import {
  FetchRacesResponse,
  InsertRacesBody,
  InsertRacesResponse,
} from '@f1-dashboard/api-clients';
import RaceRepository from '../../repositories/race.repository';
import RaceResultRepository from '../../repositories/raceResult.repository';
import FormulaOneService from '../../services/formulaOne.service';
import AsyncHandler from '../middlewares/async';
import withApiKey from '../middlewares/withApiKey';
import { ExpressResponse, RequestWithBody } from '../types';
import createRaceResultsRouter from './results';

export default function createRacesRouter(
  formulaOneService: FormulaOneService,
  raceRepository: RaceRepository,
  raceResultRepository: RaceResultRepository
) {
  const router = Router();

  router.use(
    '/:season/results',
    createRaceResultsRouter(formulaOneService, raceResultRepository)
  );

  router.get(
    '/:season',
    AsyncHandler(async (req, res: ExpressResponse<FetchRacesResponse>) => {
      const { season } = req.params;

      const races = await formulaOneService.fetchRaces(Number(season));

      return res.status(200).json({
        message: 'Races fetched successfully',
        data: {
          races,
        },
      });
    })
  );

  router.post(
    '/:season',
    [withApiKey],
    AsyncHandler(
      async (
        req: RequestWithBody<InsertRacesBody>,
        res: ExpressResponse<InsertRacesResponse>
      ) => {
        const races = req.body.races;
        const { season } = req.params;

        await raceRepository.upsertBatch(races, Number(season));

        return res.status(201).json({
          message: 'Races upserted sucessfully',
          data: {
            races,
          },
        });
      }
    )
  );
  return router;
}
