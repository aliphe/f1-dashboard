import { DriverStanding } from '@f1-dashboard/api-interfaces';
import { Router } from 'express';
import DriverStandingRepository from '../../repositories/driverStanding.repository';
import FormulaOneService from '../../services/formulaOne.service';
import AsyncHandler from '../middlewares/async';
import withApiKey from '../middlewares/withApiKey';
import { RequestWithPayload } from '../types';

export default function createDriverStandingsRouter(
  formulaOneService: FormulaOneService,
  driverStandingRepository: DriverStandingRepository
) {
  const router = Router();

  router.get(
    '/',
    [withApiKey],
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const driverStandings = await formulaOneService.fetchDriverStandings(
        year ? Number(year) : undefined
      );

      return res.status(200).json({
        message: 'Drivers standings fetched successfully',
        data: {
          driverStandings,
        },
      });
    })
  );

  router.post(
    '/',
    AsyncHandler(async (req: RequestWithPayload<{ driversStandings: DriverStanding[], season: number }>, res) => {
      const driversStandings = req.body.driversStandings;
      const season = req.body.season;

      await driverStandingRepository.upsertBatch(driversStandings, season)

      return res.status(201).json({
        message: 'Drivers Standings upserted sucessfully',
        data: {
          driversStandings
        }
      });
    })
  );

  return router;
}
