import {
  FetchDriverStandingsResponse,
  InsertDriverStandingsBody,
  InsertDriverStandingsResponse,
} from '@f1-dashboard/api-clients';
import { Router } from 'express';
import DriverStandingRepository from '../../repositories/driverStanding.repository';
import FormulaOneService from '../../services/formulaOne.service';
import AsyncHandler from '../middlewares/async';
import withApiKey from '../middlewares/withApiKey';
import { ExpressResponse, RequestWithBody } from '../types';

export default function createDriverStandingsRouter(
  formulaOneService: FormulaOneService,
  driverStandingRepository: DriverStandingRepository
) {
  const router = Router({ mergeParams: true });

  router.get(
    '/',
    AsyncHandler(
      async (req, res: ExpressResponse<FetchDriverStandingsResponse>) => {
        const { season } = req.params;

        const driverStandings = await formulaOneService.fetchDriverStandings(
          season ? Number(season) : undefined
        );

        return res.status(200).json({
          message: 'Drivers standings fetched successfully',
          data: {
            driverStandings,
          },
        });
      }
    )
  );

  router.post(
    '/',
    [withApiKey],
    AsyncHandler(
      async (
        req: RequestWithBody<InsertDriverStandingsBody>,
        res: ExpressResponse<InsertDriverStandingsResponse>
      ) => {
        const { driverStandings } = req.body;
        const { season } = req.params;

        await driverStandingRepository.upsertBatch(
          driverStandings,
          Number(season)
        );

        return res.status(201).json({
          message: 'Drivers Standings upserted sucessfully',
          data: {
            driverStandings,
          },
        });
      }
    )
  );

  return router;
}
