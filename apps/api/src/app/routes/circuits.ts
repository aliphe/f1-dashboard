import { Circuit } from '@f1-dashboard/api-interfaces';
import { Router} from 'express';
import AsyncHandler from 'express-async-handler';
import CircuitRepository from '../repositories/circuit.repository';
import FormulaOneService from '../services/formulaOne.service';
import { RequestWithPayload } from './types';

export default function createCircuitsRouter(
  formulaOneService: FormulaOneService,
  circuitRepository: CircuitRepository
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
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
    AsyncHandler(async (req: RequestWithPayload<{ circuits: Circuit[] }>, res) => {
      console.log(req.body);
      const circuits = req.body.circuits;

      await circuitRepository.upsertBatch(circuits)

      return res.status(201).json({
        message: 'Circuits upserted sucessfully',
        data: {
         circuits
        }
      });
    })
  );
  return router;
}
