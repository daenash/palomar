import { RequestHandler } from "express";
import {
  Options,
  ControllerHandler,
  TypedRequestHandler,
} from "../types/request-handler.types";
import { zodValidateInputMiddleware } from "../middlewares/zod-validate-input.middleware";

type RouteOptions<Path extends string> = {
  method: "get" | "post" | "put" | "delete" | "patch";
  path: Path;
};

export const createController = <
  Path extends string,
  RO extends RouteOptions<Path>,
  O extends Options,
>(
  routeOptions: RO,
  options: O,
  handler: ControllerHandler<O>
) => {
  const handlers: RequestHandler[] = [];

  if (options.schemas?.input) {
    handlers.push(
      zodValidateInputMiddleware(options.schemas.input).requestHandler
    );
  }

  handlers.push(...(options.middlewares ?? []).map((m) => m.requestHandler));

  const controllerWrapper: TypedRequestHandler<O> = async (req, res, next) => {
    try {
      const resp = await handler(req, res.locals);
      res.status(200).send(resp);
    } catch (e) {
      console.error(`Error in route ${req.url}:\n`, e);
      next(e);
    }
  };

  handlers.push(controllerWrapper as RequestHandler);

  return {
    type: "controller" as const,
    ...routeOptions,
    _handler: handler,
    requestHandlers: handlers as RequestHandler[],
  };
};
