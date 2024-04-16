import type { DemoMiddleware } from "./middlewares/demo.middleware";

// Module Augmentation of the Middleware interface
declare module "@palomar/server" {
  interface Middleware extends DemoMiddleware {}
}
