import { demoMiddleware } from "../../middlewares/demo.middleware";
import { logMiddleware } from "../../middlewares/log.middleware";
import {
  demoRouterDemoGetSchemas,
  demoRouterDemoPostSchemas,
} from "./demo.schemas";

import { ControllerFunctions, createController } from "@palomar/server";
import { DemoService } from "./demo.service";

const demoGet = createController(
  { method: "get", path: "/" },
  {
    schemas: demoRouterDemoGetSchemas,
    middlewares: [demoMiddleware, logMiddleware],
  },
  async ({ context: { middlewares } }) => {
    return { num: middlewares.a };
  }
);

const demoPost = createController(
  { method: "post", path: "/:p" },
  {
    schemas: demoRouterDemoPostSchemas,
    middlewares: [demoMiddleware],
  },
  async ({ context: { input, middlewares } }) => {
    return {
      data: {
        paramsP: input.params.p,
        bodyA: input.body.a,
        middlewareA: middlewares.a,
        calculated: DemoService.demo(middlewares.a),
      },
    };
  }
);

export const demoRouter = {
  demoGet,
  demoPost,
} satisfies ControllerFunctions;
