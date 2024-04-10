import type { DemoMiddleware } from "./middlewares/demo.middleware";

declare module "@express-rpc/server" {
  interface Middleware extends DemoMiddleware {}
}
