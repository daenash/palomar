import { createMiddleware } from "@palomar/server";

export const demoMiddleware = createMiddleware(() => {
  return { a: Math.random() };
});
