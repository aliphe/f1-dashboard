import {
  FetchTeamStandingsResponse,
  InsertTeamStandingsBody,
  InsertTeamStandingsResponse,
} from '@f1-dashboard/api-clients';
import { Router } from 'express';
import TeamStandingRepository from '../../repositories/teamStanding.repository';
import FormulaOneService from '../../services/formulaOne.service';
import AsyncHandler from '../middlewares/async';
import withApiKey from '../middlewares/withApiKey';
import { ExpressResponse, RequestWithBody } from '../types';

export default function createTeamStandingsRouter(
  formulaOneService: FormulaOneService,
  teamStandingRepository: TeamStandingRepository
) {
  const router = Router({ mergeParams: true });

  router.get(
    '/',
    AsyncHandler(
      async (req, res: ExpressResponse<FetchTeamStandingsResponse>) => {
        const { season } = req.params;

        const teamStandings = await formulaOneService.fetchTeamStandings(
          season ? Number(season) : undefined
        );

        return res.status(200).json({
          message: 'Teams standings fetched successfully',
          data: {
            teamStandings,
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
        req: RequestWithBody<InsertTeamStandingsBody>,
        res: ExpressResponse<InsertTeamStandingsResponse>
      ) => {
        const { teamStandings } = req.body;
        const { season } = req.params;

        await teamStandingRepository.upsertBatch(teamStandings, Number(season));

        return res.status(201).json({
          message: 'Teams Standings upserted sucessfully',
          data: {
            teamStandings,
          },
        });
      }
    )
  );

  return router;
}
