import { createSupabaseClient } from "../utils/create-supabase-client.util";
import { SupabaseClient } from "@supabase/supabase-js";
import { MiddlewareBuilder } from "../types/middleware.types";

export type AttachSupabaseMiddleware = MiddlewareBuilder<{
  supabase: SupabaseClient;
}>;

export const attachSupabaseMiddleware: AttachSupabaseMiddleware = (
  req,
  res,
  next
) => {
  res.locals.supabase = createSupabaseClient(req, res);
  next();
};
