import { AuthError } from "@supabase/supabase-js";
import { RequestException } from "./request.exception";
import { StatusCodes } from "http-status-codes";

export class SupabaseAuthException extends RequestException {
  constructor(supabaseAuthError: AuthError) {
    super({
      message: supabaseAuthError.message || "Unexpected error",
      status: supabaseAuthError.status || StatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}
