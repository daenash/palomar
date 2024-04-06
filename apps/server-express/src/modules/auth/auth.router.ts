import { createRouter } from "../../utils/create-router.util";
import { authController } from "./auth.controller";

export const authRouter = createRouter("/auth", authController);
