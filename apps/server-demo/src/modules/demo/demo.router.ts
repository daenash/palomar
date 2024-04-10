import { createRouter } from "@express-rpc/server";
import { demoController } from "./demo.controller";

export const demoRouter = createRouter("/demo", demoController);
