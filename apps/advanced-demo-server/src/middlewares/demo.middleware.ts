import { createMiddleware } from "@palomar/server";

export const demoMiddleware = createMiddleware<{
  a: number;
}>((_req, res, next) => {
  res.locals.a = Math.random();
  next();
});

export type DemoMiddleware = typeof demoMiddleware;
