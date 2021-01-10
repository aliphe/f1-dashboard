import { PrismaClient } from '@prisma/client';
import * as express from 'express';
import createRouter from './app/routes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

const prisma = new PrismaClient();

app.use('/api/', createRouter(prisma));

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
