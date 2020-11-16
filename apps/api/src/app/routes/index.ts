import express from 'express';
import FormulaOneService from '../services/formulaOne.service';
import createDriversRouter from './drivers';

export default function createRouter() {
  const app = express();

  const formulaOneService = new FormulaOneService();

  app.use('/drivers', createDriversRouter(formulaOneService));

  return app;
}
