import { createController } from "../../utils/create-controller.util";
import { ControllerFunctions } from "../../types/apify.types";
import { userControllerGetUserSchemas } from "./user.schemas";

const getUser = createController(
  { method: "get", path: "/" },
  {
    protected: true,
    schemas: userControllerGetUserSchemas,
  },
  (_req, res) => {
    res.send({ user: res.locals.user });
  }
);

export const userController = {
  getUser,
} satisfies ControllerFunctions;
