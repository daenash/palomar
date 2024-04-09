import type { AttachSupabaseMiddleware } from "./middlewares/attach-supabase.middleware";
import type { AuthenticationMiddleware } from "./middlewares/authentication.middleware";

declare module "@erpc/server" {
  interface Middleware
    extends AttachSupabaseMiddleware,
      AuthenticationMiddleware {}
}
