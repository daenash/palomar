import { RequestException } from "../exceptions/Request.exception";
import { InputValidationSchema } from "../types/request-handler.types";
import { ZodError } from "zod";

import { MiddlewareBuilder } from "../types/middleware.types";
import { createMiddleware } from "../utils/create-middleware.util";

export type ZodValidateInputMiddleware = MiddlewareBuilder;

export const zodValidateInputMiddleware = (schema: InputValidationSchema) =>
  createMiddleware(async (req, _res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error(req.originalUrl, error.message);
        return next(
          new RequestException({ message: "Bad request", status: 400 })
        );
      }
      return next(error);
    }
  });
