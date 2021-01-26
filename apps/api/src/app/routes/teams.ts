import { Team } from '@f1-dashboard/api-interfaces';
import { Router } from 'express';
import TeamRepository from '../repositories/team.repository';
import FormulaOneService from '../services/formulaOne.service';
import AsyncHandler from './middlewares/async';
import withApiKey from './middlewares/withApiKey';
import { RequestWithPayload } from './types';

export default function createTeamsRouter(
  formulaOneService: FormulaOneService,
  teamRepository: TeamRepository
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const teams = await formulaOneService.fetchTeams(Number(year));
      return res.status(200).json({
        message: 'Teams fetched successfully',
        data: {
          teams,
        },
      });
    })
  );

  router.post(
    '/',
    [withApiKey],
    AsyncHandler(
      async (
        req: RequestWithPayload<{ teams: Team[]; season: number }>,
        res
      ) => {
        console.log(req.body);
        const teams = req.body.teams;
        const season = req.body.season;

        await teamRepository.upsertBatch(teams, season);

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
