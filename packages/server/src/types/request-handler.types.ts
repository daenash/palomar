import { RequestHandler } from 'express';
import { AnyZodObject, ZodObject } from 'zod';
import { createMiddleware } from '../utils/create-middleware.util';
import { UnionToIntersection } from 'type-fest';

// TODO: Somehow gather the path params from path string
// type ExtractStringParts<T extends string> =
//   T extends `${infer R}:${infer U}/${infer Q}`
//     ? ExtractStringParts<R> | U | ExtractStringParts<Q>
//     : T extends `:${infer U}`
//       ? U
//       : never;

export type InputValidationSchema = ZodObject<{
  params?: AnyZodObject;
  body?: AnyZodObject;
  query?: AnyZodObject;
}>;

export type Options = {
  schemas?: InputValidationSchema;
  middlewares?: ReturnType<typeof createMiddleware>[];
};

type InputSchemaPart<
  O extends Options,
  I extends keyof Zod.infer<InputValidationSchema>,
> = O['schemas'] extends InputValidationSchema
  ? Zod.infer<O['schemas']>[I]
  : unknown;

type Params<O extends Options> = InputSchemaPart<O, 'params'>;

type RequestBody<O extends Options> = InputSchemaPart<O, 'body'>;

type Query<O extends Options> = InputSchemaPart<O, 'query'>;

type MiddlewaresInLocals<O extends Options> = {
  middlewares: UnionToIntersection<
    O['middlewares'] extends ReturnType<typeof createMiddleware>[]
      ? Exclude<Awaited<ReturnType<O['middlewares'][number]['_handler']>>, void>
      : NonNullable<unknown>
  >;
};

type Locals<O extends Options> = MiddlewaresInLocals<O> & {
  input: O['schemas'] extends InputValidationSchema
    ? Zod.infer<O['schemas']>
    : NonNullable<unknown>;
};

export type TypedRequestHandler<O extends Options> = RequestHandler<
  Params<O>,
  unknown,
  RequestBody<O>,
  Query<O>,
  Locals<O>
>;

export type AsyncRequestHandler<O extends Options> = (
  ...args: Parameters<TypedRequestHandler<O>>
) =>
  | Promise<ReturnType<TypedRequestHandler<O>>>
  | ReturnType<TypedRequestHandler<O>>;

export type ControllerHandler<
  O extends Options,
  R extends object | void,
> = (args: {
  context: Parameters<AsyncRequestHandler<O>>[1]['locals'];
  req: Parameters<AsyncRequestHandler<O>>[0];
  res: Parameters<AsyncRequestHandler<O>>[1];
}) => Promise<R> | R;
