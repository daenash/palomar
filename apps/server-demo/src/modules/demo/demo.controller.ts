import { demoMiddleware } from "../../middlewares/demo.middleware";
import {
  demoControllerDemoGetSchemas,
  demoControllerDemoPostSchemas,
} from "./demo.schemas";

import { ControllerFunctions, createController } from "@express-rpc/server";

const demoGet = createController(
  { method: "get", path: "/" },
  {
    schemas: demoControllerDemoGetSchemas,
    middlewares: [demoMiddleware],
  },
  async (_req, res) => {
    res.status(200).send({ num: res.locals.a });
  }
);

const demoPost = createController(
  { method: "post", path: "/:p" },
  {
    schemas: demoControllerDemoPostSchemas,
    middlewares: [demoMiddleware],
  },
  async (req, res) => {
    res.status(200).send({
      str: JSON.stringify({
        paramsP: req.params.p,
        bodyA: req.body.a,
        middlewareA: res.locals.a,
      }),
    });
  }
);

export const demoController = {
  demoGet,
  demoPost,
} satisfies ControllerFunctions;
