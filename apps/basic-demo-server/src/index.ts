import express from "express";
import cors from "cors";
import { z } from "zod";

import {
  Apify,
  createAPI,
  createController,
  createMiddleware,
  createRouter,
} from "@palomar/server";

const routers = {
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
              num: z.preprocess(Number, z.number()).optional(),
            }),
          }),
          output: z.object({ result: z.number() }),
        },
        middlewares: [
          // Access to the request object
          createMiddleware((_req) => {
            // ----------------------------------------------------
            // This will bee accessible in the controller's context
            return { multiplier: 10 };
          }),
        ],
      },

      // You get a typed RequestHandler here
      (req, context) => {
        // ------------------------------------------
        // Query is inferred from zod input
        // (property) query: { num: number; }
        // ------------------------------------------
        // Context is inferred from middleware
        // (property) context: { multiplier: number; }
        // ------------------------------------------
        const result = (req.query.num ?? 1) * context.multiplier;

        // ------------------------------------------
        // Return type is inferred from zod output
        // ------------------------------------------
        return { result };
      }
    ),
  }),
};

const app = express();
app.use(cors({ origin: "*" }));
const api = createAPI(app, routers);
app.listen(3000);

// Api types can be exported
export type Api = Apify<typeof api>;
