import { NextFunction, Request, Response } from "express";

type MiddlewareHandler<T extends object> = (req: Request) => Promise<T> | T;

const wrapMiddlewareHandler =
  <T extends object>(handler: MiddlewareHandler<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp = await handler(req);
      res.locals = { ...res.locals, ...resp };
      next();
    } catch (e) {
      return next(e);
    }
  };

export const createMiddleware = <T extends object>(
  handler: MiddlewareHandler<T>
) => ({
  type: "middleware" as const,
  _handler: handler,
  requestHandler: wrapMiddlewareHandler(handler),
});
