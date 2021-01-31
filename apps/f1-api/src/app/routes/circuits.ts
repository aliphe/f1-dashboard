import {
  FetchCircuitsResponse,
  InsertCircuitsBody,
  InsertCircuitsResponse,
} from '@f1-dashboard/api-clients';
import { Router } from 'express';

import CircuitRepository from '../repositories/circuit.repository';
import FormulaOneService from '../services/formulaOne.service';
import AsyncHandler from './middlewares/async';
import withApiKey from './middlewares/withApiKey';
import { ExpressResponse, RequestWithBody } from './types';

export default function createCircuitsRouter(
  formulaOneService: FormulaOneService,
  circuitRepository: CircuitRepository
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (_, res: ExpressResponse<FetchCircuitsResponse>) => {
      const circuits = await formulaOneService.fetchCircuits();

      return res.status(200).json({
        message: 'Circuits fetched successfully',
        data: {
          circuits,
        },
      });
    })
  );

  router.post(
    '/',
    [withApiKey],
    AsyncHandler(
      async (
        req: RequestWithBody<InsertCircuitsBody>,
        res: ExpressResponse<InsertCircuitsResponse>
      ) => {
        const { circuits } = req.body;

        await circuitRepository.upsertBatch(circuits);

        return res.status(201).json({
          message: 'Circuits upserted sucessfully',
          data: {
            circuits,
          },
        });
      }
    )
  );
  return router;
}
