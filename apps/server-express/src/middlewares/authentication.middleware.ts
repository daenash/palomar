import { createSupabaseClient } from "../utils/create-supabase-client.util";
import { UnathorizedException } from "../exceptions/unathorized.exception";
import { UserService } from "../modules/user/user.service";

import { User } from "@rpc-like-axios/database/schema";
import { createMiddleware } from "@erpc/server";

export const authenticationMiddleware = createMiddleware<{ user: User }>(
  async (req, res, next) => {
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
  }
);

export type AuthenticationMiddleware = typeof authenticationMiddleware;
