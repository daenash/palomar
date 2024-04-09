import { z } from "zod";

import { selectUserSchema } from "@rpc-like-axios/database/schema";
import { ControllerSchemas } from "@erpc/server";

export const userControllerGetUserSchemas = {
  output: z.object({
    user: selectUserSchema,
  }),
} satisfies ControllerSchemas;
