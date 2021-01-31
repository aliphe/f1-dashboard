import {
  FetchTeamsResponse,
  InsertTeamsBody,
  InsertTeamsResponse,
} from '@f1-dashboard/api-clients';
import { Router } from 'express';
import TeamRepository from '../repositories/team.repository';
import FormulaOneService from '../services/formulaOne.service';
import AsyncHandler from './middlewares/async';
import withApiKey from './middlewares/withApiKey';
import { ExpressResponse, RequestWithPayload } from './types';

export default function createTeamsRouter(
  formulaOneService: FormulaOneService,
  teamRepository: TeamRepository
) {
  const router = Router();

  router.get(
    '/:season',
    AsyncHandler(async (req, res: ExpressResponse<FetchTeamsResponse>) => {
      const { season } = req.params;

      const teams = await formulaOneService.fetchTeams(Number(season));
      return res.status(200).json({
        message: 'Teams fetched successfully',
        data: {
          teams,
        },
      });
    })
  );

  router.post(
    '/:season',
    [withApiKey],
    AsyncHandler(
      async (
        req: RequestWithPayload<InsertTeamsBody>,
        res: ExpressResponse<InsertTeamsResponse>
      ) => {
        const { teams } = req.body;
        const { season } = req.params;

        await teamRepository.upsertBatch(teams, Number(season));

        return res.status(201).json({
          message: 'Teams upserted sucessfully',
          data: {
            teams,
          },
        });
      }
    )
  );

  return router;
}
