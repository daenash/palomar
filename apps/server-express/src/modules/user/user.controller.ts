import { ControllerFunctions, createController } from "@erpc/server";

import { userControllerGetUserSchemas } from "./user.schemas";
import { authenticationMiddleware } from "../../middlewares/authentication.middleware";

const getUser = createController(
  { method: "get", path: "/" },
  {
    middlewares: [authenticationMiddleware],
    schemas: userControllerGetUserSchemas,
  },
  (_req, res) => {
    res.send({ user: res.locals.user });
  }
);

export const userController = {
  getUser,
} satisfies ControllerFunctions;
