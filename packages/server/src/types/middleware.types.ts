import { RequestHandler } from 'express';

export type MiddlewareBuilder<
  T extends Record<string, unknown> = Record<string, unknown>,
> = RequestHandler<unknown, unknown, unknown, unknown, T>;

export interface Middleware {}
