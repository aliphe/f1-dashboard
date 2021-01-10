import { Request } from "express";

export type RequestWithPayload<T> = Request<unknown, unknown, T>;