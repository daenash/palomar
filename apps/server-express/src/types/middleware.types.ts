import { RequestHandler } from "express";
import { AttachSupabaseMiddleware } from "../middlewares/attach-supabase.middleware";

export type MiddlewareBuilder<
  T extends Record<string, unknown> = Record<string, unknown>,
> = RequestHandler<unknown, unknown, unknown, unknown, T>;

export type Middleware = AttachSupabaseMiddleware;
