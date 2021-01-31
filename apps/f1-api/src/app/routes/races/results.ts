import {
  FetchRaceResultsResponse,
  InsertRaceResultsBody,
  InsertRaceResultsResponse,
} from '@f1-dashboard/api-clients';
import { Router } from 'express';
import RaceResultRepository from '../../repositories/raceResult.repository';
import FormulaOneService from '../../services/formulaOne.service';
import AsyncHandler from '../middlewares/async';
import withApiKey from '../middlewares/withApiKey';
import { ExpressResponse, RequestWithBody } from '../types';

export default function createRaceResultsRouter(
  formulaOneService: FormulaOneService,
  raceResultRepository: RaceResultRepository
) {
  const router = Router({ mergeParams: true });

  router.get(
    '/:round',
    AsyncHandler(
      async (req, res: ExpressResponse<FetchRaceResultsResponse>) => {
        const { season, round } = req.params;

        const raceResults = await formulaOneService.fetchRaceResults(
          Number(season),
          Number(round)
        );

        return res.status(200).json({
          message: 'Races results fetched successfully',
          data: {
            raceResults,
          },
        });
      }
    )
  );

  router.post(
    '/:round',
    [withApiKey],
    AsyncHandler(
      async (
        req: RequestWithBody<InsertRaceResultsBody>,
        res: ExpressResponse<InsertRaceResultsResponse>
      ) => {
        const { season, round } = req.params;
        const { raceResults } = req.body;

        await raceResultRepository.upsertBatch(
          raceResults,
          Number(season),
          Number(round)
        );

        return res.status(201).json({
          message: 'Races results upserted sucessfully',
          data: {
            raceResults,
          },
        });
      }
    )
  );
  return router;
}
