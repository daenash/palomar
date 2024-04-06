import { z } from "zod";
import { ControllerSchemas } from "../../types/request-handler.types";
import { selectUserSchema } from "@rpc-like-axios/database/schema";

export const userControllerGetUserSchemas = {
  output: z.object({
    user: selectUserSchema,
  }),
} satisfies ControllerSchemas;
