import { RequestHandler } from "express";
import { AnyZodObject, ZodArray, ZodObject } from "zod";
import { Middleware } from "./middleware.types";
import { AuthenticationMiddleware } from "../middlewares/authentication.middleware";

export type InputValidationSchema = ZodObject<{
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}>;

export type OutputValidationSchema = AnyZodObject | ZodArray<AnyZodObject>;

export type ControllerSchemas = {
  input?: InputValidationSchema;
  output?: OutputValidationSchema;
};

export type Options = {
  schemas?: ControllerSchemas;
  middlewares?: Middleware[];
  protected?: boolean;
};

type InputSchemaPart<
  O extends Options,
  I extends keyof Zod.infer<InputValidationSchema>,
> = O["schemas"] extends ControllerSchemas
  ? O["schemas"]["input"] extends InputValidationSchema
    ? Zod.infer<O["schemas"]["input"]>[I]
    : unknown
  : unknown;

type OutputSchemaPart<O extends Options> =
  O["schemas"] extends ControllerSchemas
    ? O["schemas"]["output"] extends OutputValidationSchema
      ? Zod.infer<O["schemas"]["output"]>
      : unknown
    : unknown;

type ResponseBody<O extends Options> = OutputSchemaPart<O>;
type Params<O extends Options> = InputSchemaPart<O, "params">;
type RequestBody<O extends Options> = InputSchemaPart<O, "body">;
type Query<O extends Options> = InputSchemaPart<O, "query">;

type Locals<O extends Options> = O["middlewares"] extends RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown,
  infer U
>[]
  ? U
  : NonNullable<unknown>;

export type TypedRequestHandler<O extends Options> = RequestHandler<
  Params<O>,
  ResponseBody<O>,
  RequestBody<O>,
  Query<O>,
  O["protected"] extends true
    ? Locals<O> & Parameters<AuthenticationMiddleware>[1]["locals"]
    : Locals<O>
>;

export type AsyncRequestHandler<O extends Options> = (
  ...args: Parameters<TypedRequestHandler<O>>
) =>
  | Promise<ReturnType<TypedRequestHandler<O>>>
  | ReturnType<TypedRequestHandler<O>>;
