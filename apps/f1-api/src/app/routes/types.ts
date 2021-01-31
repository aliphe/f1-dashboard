import { Request, Response } from 'express';

type Params = {
  [key: string]: string;
};

export type RequestWithPayload<Body = unknown, Query = unknown> = Request<
  Params,
  unknown,
  Body,
  Query
>;

export type RequestWithBody<Body = unknown> = Request<Params, unknown, Body>;

export type RequestWithQuery<Query = unknown> = Request<
  Params,
  unknown,
  unknown,
  Query
>;

export type ExpressResponse<Data> = Response<Data>;
