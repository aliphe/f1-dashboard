import {
  FetchDriversResponse,
  InsertDriversBody,
  InsertDriversResponse,
} from '@f1-dashboard/api-clients';
import { Router } from 'express';
import DriverRepository from '../repositories/driver.repository';
import FormulaOneService from '../services/formulaOne.service';
import AsyncHandler from './middlewares/async';
import withApiKey from './middlewares/withApiKey';
import { ExpressResponse, RequestWithPayload } from './types';

export default function createDriversRouter(
  formulaOneService: FormulaOneService,
  driverRepository: DriverRepository
) {
  const router = Router();

  router.get(
    '/:season',
    AsyncHandler(async (req, res: ExpressResponse<FetchDriversResponse>) => {
      const { season } = req.params;

      const drivers = await formulaOneService.fetchDrivers(Number(season));
      return res.status(200).json({
        message: 'Drivers fetched successfully',
        data: {
          drivers,
        },
      });
    })
  );

  router.post(
    '/:season',
    [withApiKey],
    AsyncHandler(
      async (
        req: RequestWithPayload<InsertDriversBody>,
        res: ExpressResponse<InsertDriversResponse>
      ) => {
        const { drivers } = req.body;
        const { season } = req.params;

        await driverRepository.upsertBatch(drivers, Number(season));

        return res.status(201).json({
          message: 'Drivers upserted sucessfully',
          data: {
            drivers,
          },
        });
      }
    )
  );

  return router;
}
