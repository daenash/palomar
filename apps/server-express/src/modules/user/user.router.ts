import { createRouter } from "../../utils/create-router.util";
import { userController } from "./user.controller";

export const userRouter = createRouter("/user", userController);
