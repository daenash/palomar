import { NextFunction, Request, Response } from 'express';

type MiddlewareHandler<T extends object | void> = (
  req: Request,
) => Promise<T> | T;

const wrapMiddlewareHandler =
  <T extends object | void>(handler: MiddlewareHandler<T>, isRoot?: boolean) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resp = await handler(req);
      if (resp && typeof resp === 'object') {
        if (isRoot) {
          res.locals = { ...res.locals, ...resp };
        } else {
          res.locals = {
            ...res.locals,
            middlewares: { ...res.locals.middlewares, ...resp },
          };
        }
      }
      next();
    } catch (e) {
      return next(e);
    }
  };

export const createMiddleware = <T extends object | void>(
  handler: MiddlewareHandler<T>,
) => ({
  type: 'middleware' as const,
  _handler: handler,
  requestHandler: wrapMiddlewareHandler(handler),
});

export const _createMiddlewareRoot = <T extends object>(
  handler: MiddlewareHandler<T>,
) => ({
  type: 'middleware' as const,
  _handler: handler,
  requestHandler: wrapMiddlewareHandler(handler, true),
});
