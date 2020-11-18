import express from 'express';
import FormulaOneService from '../services/formulaOne.service';
import createDriversRouter from './drivers';
import createStandingsRouter from './standings';

export default function createRouter() {
  const app = express();

  const formulaOneService = new FormulaOneService();

  app.use('/drivers', createDriversRouter(formulaOneService));
  app.use('/standings', createStandingsRouter(formulaOneService));

  return app;
}
