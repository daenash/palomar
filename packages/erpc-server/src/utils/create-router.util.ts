import { Router } from "express";
import { createController } from "./create-controller.util";

export const createRouter = <
  Path extends string,
  Controller extends Record<string, ReturnType<typeof createController>>,
>(
  path: Path,
  controller: Controller
) => {
  const router = Router();
  Object.entries(controller).forEach(([_, c]) => {
    router[c.method](c.path, c.chain);
  });
  return { router, path, controller };
};
