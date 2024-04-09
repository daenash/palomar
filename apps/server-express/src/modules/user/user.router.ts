import { createRouter } from "@erpc/server";
import { userController } from "./user.controller";

export const userRouter = createRouter("/user", userController);
