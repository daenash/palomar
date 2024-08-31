import { createMiddleware } from "@palomar/server";
import { logRequest } from "../utils/log-request.util";

export const logMiddleware = createMiddleware((req) => {
  logRequest(req);
});
