import { ErrorRequestHandler } from "express";
import { RequestException } from "../exceptions/request.exception";

export const errorHandlingMiddleware: ErrorRequestHandler = async (
  err,
  _req,
  res,
  _next
) => {
  if (err instanceof RequestException) {
    return res.status(err.status).send({ message: err.message });
  }
  return res.status(500).send({ message: "Unexpected error" });
};
