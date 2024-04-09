import { RequestHandler } from "express";
import {
  AsyncRequestHandler,
  Options,
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
  controller: AsyncRequestHandler<O>
) => {
  const handlers: RequestHandler[] = [];

  if (options.schemas?.input) {
    handlers.push(zodValidateInputMiddleware(options.schemas.input));
  }

  handlers.push(...((options.middlewares ?? []) as RequestHandler[]));

  const controllerWrapper: TypedRequestHandler<O> = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (e) {
      console.error(`Error in route ${req.url}:\n`, e);
      next(e);
    }
  };

  handlers.push(controllerWrapper as RequestHandler);

  return { ...routeOptions, chain: handlers as RequestHandler[], controller };
};
