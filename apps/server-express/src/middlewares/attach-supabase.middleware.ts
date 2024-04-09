import { createSupabaseClient } from "../utils/create-supabase-client.util";
import { SupabaseClient } from "@supabase/supabase-js";
import { createMiddleware } from "@erpc/server";

export const attachSupabaseMiddleware = createMiddleware<{
  supabase: SupabaseClient;
}>((req, res, next) => {
  res.locals.supabase = createSupabaseClient(req, res);
  next();
});

export type AttachSupabaseMiddleware = typeof attachSupabaseMiddleware;
