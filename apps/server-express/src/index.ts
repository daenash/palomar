import express from "express";

import { errorHandlingMiddleware } from "./middlewares/error-handling.middleware";
import { authRouter } from "./modules/auth/auth.router";
import cookieParser from "cookie-parser";
import { userRouter } from "./modules/user/user.router";
import cors from "cors";
import { Apify, Routers, attachERPC } from "@erpc/server";

const routers = {
  auth: authRouter,
  user: userRouter,
} satisfies Routers;

const run = async () => {
  const app = express();

  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(cookieParser());
  app.use(express.json());

  attachERPC(app, routers);

  app.use(errorHandlingMiddleware);

  app.listen(3000);
};

run();

export type Api = Apify<typeof routers>;
