import express from "express";
import cors from "cors";
import { z } from "zod";

import {
  Apify,
  createAPI,
  createController,
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
              search: z.string().optional(),
            }),
          }),
          output: z.object({ success: z.boolean() }),
        },
      },

      // You get a typed RequestHandler here
      (_req) => {
        // ------------------------------------------
        // Query is inferred from zod input
        // (property) search?: string | undefined
        // ------------------------------------------
        // console.log(req.query.search);

        // ------------------------------------------
        // Return type is inferred from zod output
        // ------------------------------------------
        return { success: true };
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
