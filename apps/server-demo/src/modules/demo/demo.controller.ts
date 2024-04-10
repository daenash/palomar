import { Request } from "express";
import { demoMiddleware } from "../../middlewares/demo.middleware";
import {
  demoControllerDemoGetSchemas,
  demoControllerDemoPostSchemas,
} from "./demo.schemas";

import { ControllerFunctions, createController } from "@express-rpc/server";

const logRequest = (r: Request) => {
  const rr = { params: r.params, body: r.body, query: r.query };
  const clearedR = Object.entries(rr).reduce<Record<string, unknown>>(
    (pv, [k, v]) => {
      if (v) {
        pv[k] = v;
      }
      return pv;
    },
    {}
  );
  console.log(clearedR);
};

const demoGet = createController(
  { method: "get", path: "/" },
  {
    schemas: demoControllerDemoGetSchemas,
    middlewares: [demoMiddleware],
  },
  async (req, res) => {
    logRequest(req as Request);
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
    logRequest(req as Request);
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
