import express from "express";
import cors from "cors";

import { Apify, Routers, createRouter, createAPI } from "@palomar/server";
import { demoController } from "./modules/demo/demo.controller";

const routers = {
  demo: createRouter("/demo", demoController),
} satisfies Routers;

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
const api = createAPI(app, routers);
app.listen(3000);

// Api types can be exported
export type Api = Apify<typeof api>;
