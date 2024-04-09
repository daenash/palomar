import { z } from "zod";
import { ControllerSchemas } from "@erpc/server";

import { selectUserSchema } from "@rpc-like-axios/database/schema";

export const authControllerGoogleLoginCallbackSchemas = {
  input: z.object({
    query: z.object({
      code: z.string(),
      next: z.string().optional(),
      alma: z.string().optional(),
    }),
  }),
} satisfies ControllerSchemas;

export const authControllerGetSessionSchemas = {
  output: z.object({ success: z.boolean() }),
} satisfies ControllerSchemas;

export const authControllerSignupSchemas = {
  input: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string(),
    }),
  }),
  output: z.object({ success: z.boolean() }),
} satisfies ControllerSchemas;

export const authControllerEmailLoginSchemas = {
  input: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string(),
    }),
  }),
  output: z.object({
    user: selectUserSchema,
  }),
} satisfies ControllerSchemas;
