import {
  authControllerEmailLoginSchemas,
  authControllerGoogleLoginCallbackSchemas,
  authControllerSignupSchemas,
} from "./auth.schemas";
import { attachSupabaseMiddleware } from "../../middlewares/attach-supabase.middleware";
import { SupabaseService } from "../supabase/supabase.service";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "./auth.service";

import { ControllerFunctions, createController } from "@erpc/server";
import { authenticationMiddleware } from "../../middlewares/authentication.middleware";

const signup = createController(
  { method: "post", path: "/signup" },
  {
    schemas: authControllerSignupSchemas,
    middlewares: [attachSupabaseMiddleware],
  },
  async (req, res) => {
    const { supabase } = res.locals;
    SupabaseService.signup({ supabase, ...req.body });
    res.status(200).send({ success: true });
  }
);

const getSession = createController(
  {
    method: "get",
    path: "/session",
  },
  { middlewares: [authenticationMiddleware] },
  async (_req, res) => {
    res.locals.user;
    res.status(200).send({ success: true });
  }
);

const logout = createController(
  { method: "post", path: "/logout" },
  { middlewares: [attachSupabaseMiddleware] },
  async (_req, res) => {
    const { supabase } = res.locals;
    await SupabaseService.logout({ supabase });
    res.redirect(StatusCodes.SEE_OTHER, `http://localhost:5173/`);
  }
);

const emailLogin = createController(
  { method: "post", path: "/email/login" },
  {
    schemas: authControllerEmailLoginSchemas,
    middlewares: [attachSupabaseMiddleware],
  },
  async (req, res) => {
    const { supabase } = res.locals;
    const { user } = await SupabaseService.loginWithEmailAndPassword({
      supabase,
      ...req.body,
    });

    const onboardedUser = await AuthService.onboard({ supabaseUser: user });

    res.send({ user: onboardedUser });
  }
);

const googleLogin = createController(
  { method: "post", path: "/google/login" },
  { middlewares: [attachSupabaseMiddleware] },
  async (_req, res) => {
    const { supabase } = res.locals;
    const { redirectUrl } = await SupabaseService.loginWithGoogle({
      supabase,
      redirectUrl: "http://localhost:3000/auth/google/callback",
    });
    return res.redirect(redirectUrl);
  }
);

const googleCallback = createController(
  { path: "/google/callback", method: "get" },
  {
    schemas: authControllerGoogleLoginCallbackSchemas,
    middlewares: [attachSupabaseMiddleware],
  },
  async (req, res) => {
    const { code, next } = req.query;
    const { supabase } = res.locals;

    const { user } = await SupabaseService.createSessionFromGoogleCode({
      supabase,
      code,
    });
    await AuthService.onboard({ supabaseUser: user });

    return res.redirect(
      StatusCodes.SEE_OTHER,
      `http://localhost:5173/${(next ?? "/").slice(1)}`
    );
  }
);

export const authController = {
  signup,
  getSession,
  logout,
  emailLogin,
  googleLogin,
  googleCallback,
} satisfies ControllerFunctions;
