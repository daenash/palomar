import { z } from "zod";
import { InputValidationSchema } from "@palomar/server";

export const demoRouterDemoGetSchemas = z.object({
  query: z.object({
    a: z.string(),
    q: z.string().array().optional(),
    obj: z
      .discriminatedUnion("type", [
        z.object({ type: z.literal("a"), value: z.string() }),
        z.object({ type: z.literal("b"), value: z.number() }),
      ])
      .optional(),
  }),
}) satisfies InputValidationSchema;

export const demoRouterDemoPostSchemas = z.object({
  body: z.object({
    a: z.string(),
  }),
  params: z.object({
    p: z.string(),
  }),
}) satisfies InputValidationSchema;
