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
        schemas: z.object({
          query: z.object({
            num: z.preprocess(Number, z.number()).optional(),
          }),
        }),
        middlewares: [
          // Add middleware handlers one by one.
          // It gives access to the request object with the first argument
          createMiddleware((req) => {
            // ----------------------------------------------------
            // The returned data will be accessible in the controller's context
            return { multiplier: req.path.length };
          }),
        ],
      },

      // You get function here with typed inputs and middleware data
      ({ context: { input, middlewares } }) => {
        // ------------------------------------------
        // Query is inferred from context.input
        // (parameter) input: { query: { num?: number | undefined; } }
        // ------------------------------------------
        // Multiplier is inferred from the middlewares.multiplier
        // (parameter) middlewares: { multiplier: number; }
        // ------------------------------------------
        const result = (input.query.num ?? 1) * middlewares.multiplier;

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
