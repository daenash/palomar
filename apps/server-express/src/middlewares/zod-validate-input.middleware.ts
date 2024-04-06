import { InputValidationSchema } from "../types/request-handler.types";
import { ZodError } from "zod";
import { BadRequestException } from "../exceptions/bad-request.exception";
import { MiddlewareBuilder } from "../types/middleware.types";

export type ZodValidateInputMiddleware = MiddlewareBuilder;

export const zodValidateInputMiddleware =
  (schema: InputValidationSchema): ZodValidateInputMiddleware =>
  async (req, _res, next) => {
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
        return next(new BadRequestException());
      }
      return next(error);
    }
  };
