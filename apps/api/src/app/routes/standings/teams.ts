import { TeamStanding } from '@f1-dashboard/api-interfaces';
import { Router } from 'express';
import TeamStandingRepository from '../../repositories/teamStanding.repository';
import FormulaOneService from '../../services/formulaOne.service';
import AsyncHandler from '../middlewares/async';
import withApiKey from '../middlewares/withApiKey';
import { RequestWithPayload } from '../types';

export default function createTeamStandingsRouter(
  formulaOneService: FormulaOneService,
  teamStandingRepository: TeamStandingRepository
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const teamStandings = await formulaOneService.fetchTeamStandings(
        year ? Number(year) : undefined
      );

      return res.status(200).json({
        message: 'Teams standings fetched successfully',
        data: {
          teamStandings,
        },
      });
    })
  );

  router.post(
    '/',
    [withApiKey],
    AsyncHandler(
      async (
        req: RequestWithPayload<{
          teamsStandings: TeamStanding[];
          season: number;
        }>,
        res
      ) => {
        const teamsStandings = req.body.teamsStandings;
        const season = req.body.season;

        await teamStandingRepository.upsertBatch(teamsStandings, season);

        return res.status(201).json({
          message: 'Teams Standings upserted sucessfully',
          data: {
            teamsStandings,
          },
        });
      }
    )
  );

  return router;
}
