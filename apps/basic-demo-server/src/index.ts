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
      { path: "/alma", method: "get" },

      // Set input and output schemas
      {
        schemas: z.object({
          query: z.object({
            num: z.preprocess(Number, z.number()).optional(),
          }),
        }),
        middlewares: [
          // Add middleware handlers one by one while there's
          // access to the request object in them
          createMiddleware((req) => {
            // ----------------------------------------------------
            // This will bee accessible in the controller's context
            return { multiplier: req.path.length };
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
