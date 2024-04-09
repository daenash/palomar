import { MiddlewareBuilder } from "../types/middleware.types";

export const createMiddleware = <T extends Record<string, unknown>>(
  m: MiddlewareBuilder<T>
) => m;
