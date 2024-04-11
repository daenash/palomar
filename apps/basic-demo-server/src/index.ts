import express from "express";
import cors from "cors";
import { z } from "zod";

import {
  Apify,
  attachERPC,
  createController,
  createRouter,
} from "@express-rpc/server";

const erpc = {
  // Define routers with the `createRouter` helper
  demo: createRouter("/demo", {
    // Define controllers with the `createController` helper
    demoGetController: createController(
      // Set path and method
      { path: "/", method: "get" },

      // Set input and output schemas
      {
        schemas: {
          input: z.object({
            query: z.object({
              search: z.string().optional(),
            }),
          }),
          output: z.object({ success: z.boolean() }),
        },
      },

      // You get a typed RequestHandler here
      (req, res, _next) => {
        // ------------------------------------------
        // Query is inferred from zod input
        // (property) search?: string | undefined
        // ------------------------------------------
        // console.log(req.query.search);

        // ------------------------------------------
        // Body is inferred from zod output
        // send(body?: { success: boolean; } | undefined)
        // ------------------------------------------
        res.send({ success: true });
      }
    ),
  }),
};

// Api types can be exported
export type Api = Apify<typeof erpc>;

const app = express();
app.use(cors({ origin: "*" }));
attachERPC(app, erpc);
app.listen(3000);
