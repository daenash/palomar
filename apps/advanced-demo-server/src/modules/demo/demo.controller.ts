import { Request } from "express";
import { demoMiddleware } from "../../middlewares/demo.middleware";
import {
  demoControllerDemoGetSchemas,
  demoControllerDemoPostSchemas,
} from "./demo.schemas";

import { ControllerFunctions, createController } from "@palomar/server";
import { logRequest } from "../../utils/log-request.util";

const demoGet = createController(
  { method: "get", path: "/" },
  {
    schemas: demoControllerDemoGetSchemas,
    middlewares: [demoMiddleware],
  },
  async (req, context) => {
    logRequest(req as Request);
    return { num: context.a };
  }
);

const demoPost = createController(
  { method: "post", path: "/:p" },
  {
    schemas: demoControllerDemoPostSchemas,
    middlewares: [demoMiddleware],
  },
  async (req, context) => {
    logRequest(req as Request);
    return {
      data: {
        paramsP: req.params.p,
        bodyA: req.body.a,
        middlewareA: context.a,
      },
    };
  }
);

export const demoController = {
  demoGet,
  demoPost,
} satisfies ControllerFunctions;
