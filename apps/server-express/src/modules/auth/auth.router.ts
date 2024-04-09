import { createRouter } from "@erpc/server";
import { authController } from "./auth.controller";

export const authRouter = createRouter("/auth", authController);
