import { Router } from 'express';
import AsyncHandler from 'express-async-handler';
import FormulaOneService from '../../services/formulaOne.service';

export default function createTeamStandingsRouter(
  formulaOneService: FormulaOneService
) {
  const router = Router();

  router.get(
    '/',
    AsyncHandler(async (req, res) => {
      const { year } = req.query;

      const teamStandings = await formulaOneService.fetchTeamStandings(
        year ? Number(year) : undefined
      );

      return res.json({
        message: 'Teams standings fetched successfully',
        data: {
          teamStandings,
        },
      });
    })
  );

  return router;
}
