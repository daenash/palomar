import { RequestHandler } from 'express';
import {
  Options,
  ControllerHandler,
  TypedRequestHandler,
} from '../types/request-handler.types';
import { zodValidateInputMiddleware } from '../middlewares/zod-validate-input.middleware';

type RouteOptions<Path extends string> = {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: Path;
};

const wrapControllerHandler =
  <O extends Options, R extends object | void>(
    handler: ControllerHandler<O, R>,
  ): TypedRequestHandler<O> =>
  async (req, res, next) => {
    try {
      const resp = await handler({ context: res.locals, req, res });
      res.status(200).send(resp);
    } catch (e) {
      console.error(`Error in route ${req.url}:\n`, e);
      next(e);
    }
  };

export const createController = <
  Path extends string,
  RO extends RouteOptions<Path>,
  O extends Options,
  R extends object | void,
>(
  routeOptions: RO,
  options: O,
  handler: ControllerHandler<O, R>,
) => {
  const handlers: RequestHandler[] = [];

  if (options.schemas) {
    handlers.push(zodValidateInputMiddleware(options.schemas).requestHandler);
  }

  handlers.push(...(options.middlewares ?? []).map((m) => m.requestHandler));

  handlers.push(wrapControllerHandler(handler) as RequestHandler);

  return {
    type: 'controller' as const,
    ...routeOptions,
    _handler: handler,
    requestHandlers: handlers as RequestHandler[],
  };
};
