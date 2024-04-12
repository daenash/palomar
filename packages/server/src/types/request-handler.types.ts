import { RequestHandler } from "express";
import { AnyZodObject, ZodArray, ZodObject } from "zod";
import { Middleware, MiddlewareBuilder } from "./middleware.types";

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

type OutputSchemaPart<
  O extends Options,
  Else = unknown,
> = O["schemas"] extends ControllerSchemas
  ? O["schemas"]["output"] extends OutputValidationSchema
    ? Zod.infer<O["schemas"]["output"]>
    : Else
  : Else;

type ResponseBody<O extends Options> = OutputSchemaPart<O>;

type Params<O extends Options> = InputSchemaPart<O, "params">;

type RequestBody<O extends Options> = InputSchemaPart<O, "body">;

type Query<O extends Options> = InputSchemaPart<O, "query">;

type Locals<O extends Options> = O["middlewares"] extends MiddlewareBuilder<
  infer U
>[]
  ? U
  : NonNullable<unknown>;

export type TypedRequestHandler<O extends Options> = RequestHandler<
  Params<O>,
  ResponseBody<O>,
  RequestBody<O>,
  Query<O>,
  Locals<O>
>;

export type AsyncRequestHandler<O extends Options> = (
  ...args: Parameters<TypedRequestHandler<O>>
) =>
  | Promise<ReturnType<TypedRequestHandler<O>>>
  | ReturnType<TypedRequestHandler<O>>;

export type TypedControllerFunction<O extends Options> = (
  req: Parameters<AsyncRequestHandler<O>>[0],
  context: Parameters<AsyncRequestHandler<O>>[1]["locals"]
) => Promise<OutputSchemaPart<O, void>> | OutputSchemaPart<O, void>;
