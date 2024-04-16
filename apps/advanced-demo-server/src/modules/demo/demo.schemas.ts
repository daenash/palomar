import { z } from "zod";
import { ControllerSchemas } from "@palomar/server";

export const demoControllerDemoGetSchemas = {
  input: z.object({
    query: z.object({
      a: z.string(),
    }),
  }),
  output: z.object({
    num: z.number(),
  }),
} satisfies ControllerSchemas;

export const demoControllerDemoPostSchemas = {
  input: z.object({
    body: z.object({
      a: z.string(),
    }),
    params: z.object({
      p: z.string(),
    }),
  }),
  output: z.object({
    str: z.string(),
  }),
} satisfies ControllerSchemas;
