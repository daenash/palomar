import { createSupabaseClient } from "../utils/create-supabase-client.util";
import { UnathorizedException } from "../exceptions/unathorized.exception";
import { UserService } from "../modules/user/user.service";
import { MiddlewareBuilder } from "../types/middleware.types";
import { User } from "@rpc-like-axios/database/schema";

export type AuthenticationMiddleware = MiddlewareBuilder<{ user: User }>;

export const authenticationMiddleware: AuthenticationMiddleware = async (
  req,
  res,
  next
) => {
  const supabase = createSupabaseClient(req, res);
  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    return next(new UnathorizedException());
  }

  try {
    const user = await UserService.getFromSupabaseUser({
      supabaseUser: data.user,
    });
    if (!user) {
      throw new UnathorizedException();
    }
    res.locals.user = user;
    return next();
  } catch (e) {
    return next(e);
  }
};
