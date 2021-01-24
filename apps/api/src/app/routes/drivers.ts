import { Driver } from '@f1-dashboard/api-interfaces';
import { Router } from 'express';
import DriverRepository from '../repositories/driver.repository';
import FormulaOneService from '../services/formulaOne.service';
import AsyncHandler from './middlewares/async';
import withApiKey from './middlewares/withApiKey';
import { RequestWithPayload } from './types';

export default function createDriversRouter(
  formulaOneService: FormulaOneService,
  driverRepository: DriverRepository
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const drivers = await formulaOneService.fetchDrivers(Number(year));
      return res.status(200).json({
        message: 'Drivers fetched successfully',
        data: {
          drivers,
        },
      });
    })
  );

  router.post(
    '/',
    [withApiKey],
    AsyncHandler(async (req: RequestWithPayload<{ drivers: Driver[], season: number }>, res) => {
      console.log(req.body);
      const drivers = req.body.drivers;
      const season = req.body.season;

      await driverRepository.upsertBatch(drivers, season)

      return res.status(201).json({
        message: 'Drivers upserted sucessfully',
        data: {
          drivers
        }
      });
    })
  );

  return router;
}
