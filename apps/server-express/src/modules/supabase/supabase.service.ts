import { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseAuthException } from "../../exceptions/supabase-auth.exception";

type SupabaseOptions<T extends object | undefined = undefined> =
  T extends undefined
    ? { supabase: SupabaseClient }
    : { supabase: SupabaseClient } & T;

export class SupabaseService {
  static signup = async (
    options: SupabaseOptions<{ email: string; password: string; name: string }>
  ) => {
    const { supabase, email, password, name } = options;
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { name: name },
        emailRedirectTo: "http://localhost:5173/",
      },
    });

    if (error) {
      throw new SupabaseAuthException(error);
    }
  };

  static loginWithGoogle = async (
    options: SupabaseOptions<{ redirectUrl: string }>
  ) => {
    const { supabase, redirectUrl } = options;
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          prompt: "select_account",
        },
        redirectTo: redirectUrl,
      },
    });

    if (error) {
      throw new SupabaseAuthException(error);
    }

    return { redirectUrl: data.url };
  };

  static loginWithEmailAndPassword = async (
    options: SupabaseOptions<{ email: string; password: string }>
  ) => {
    const { supabase, email, password } = options;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new SupabaseAuthException(error);
    }

    return data;
  };

  static createSessionFromGoogleCode = async (
    options: SupabaseOptions<{ code: string }>
  ) => {
    const { supabase, code } = options;
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      throw new SupabaseAuthException(error);
    }

    return data;
  };

  static logout = async (options: SupabaseOptions) => {
    const { supabase } = options;
    const { error } = await supabase.auth.signOut({ scope: "local" });

    if (error) {
      throw new SupabaseAuthException(error);
    }
  };
}
