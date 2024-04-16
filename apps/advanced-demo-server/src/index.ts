import express from "express";
import cors from "cors";

import { Apify, Routers, attachERPC, createRouter } from "@palomar/server";
import { demoController } from "./modules/demo/demo.controller";

const erpc = {
  demo: createRouter("/demo", demoController),
} satisfies Routers;

// Api types can be exported
export type Api = Apify<typeof erpc>;

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
attachERPC(app, erpc);
app.listen(3000);
