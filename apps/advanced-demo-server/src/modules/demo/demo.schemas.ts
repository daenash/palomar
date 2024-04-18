import { z } from "zod";
import { InputValidationSchema } from "@palomar/server";

export const demoControllerDemoGetSchemas = z.object({
  query: z.object({
    a: z.string(),
  }),
}) satisfies InputValidationSchema;

export const demoControllerDemoPostSchemas = z.object({
  body: z.object({
    a: z.string(),
  }),
  params: z.object({
    p: z.string(),
  }),
}) satisfies InputValidationSchema;
