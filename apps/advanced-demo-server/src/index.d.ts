import type { DemoMiddleware } from "./middlewares/demo.middleware";

// Module Augmentation of the Middleware interface
declare module "@express-rpc/server" {
  interface Middleware extends DemoMiddleware {}
}
