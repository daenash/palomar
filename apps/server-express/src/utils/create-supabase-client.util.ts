import { createServerClient } from "@supabase/ssr";
import { Request, Response } from "express";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON = process.env.SUPABASE_ANON;

export const createSupabaseClient = (
  req: Request<unknown, unknown, unknown, unknown>,
  res: Response
) =>
  createServerClient<never, never, never>(SUPABASE_URL, SUPABASE_ANON, {
    cookies: {
      get: (key) => {
        const cookies = req.cookies;
        const cookie = cookies[key] ?? "";
        return decodeURIComponent(cookie);
      },
      set: (key, value, options) => {
        if (!res) return;
        res.cookie(key, encodeURIComponent(value), {
          ...options,
          sameSite: "Lax",
          httpOnly: true,
        });
      },
      remove: (key, options) => {
        if (!res) return;
        res.cookie(key, "", { ...options, httpOnly: true });
      },
    },
    auth: { autoRefreshToken: true },
  });
