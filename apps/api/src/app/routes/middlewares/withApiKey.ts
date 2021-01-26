import { environment } from '../../../environments/environment';
import { RequestHandler } from 'express';

export default function withApiKey( // TODO find better typings
  req: any,
  res: any,
  next: any
): RequestHandler {
  if (req.headers.apikey === environment.apiKey) {
    return next();
  }
  throw new Error('Unauthorized');
}
