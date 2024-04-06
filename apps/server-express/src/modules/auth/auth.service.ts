import { User } from "@supabase/supabase-js";
import { UserService } from "../user/user.service";
import { db } from "@rpc-like-axios/database/db";
import { BadRequestException } from "../../exceptions/bad-request.exception";
import {
  isSupportedProvider,
  providerCredentialTable,
  userTable,
} from "@rpc-like-axios/database/schema";

export class AuthService {
  static onboard = async (options: { supabaseUser: User }) => {
    const { supabaseUser } = options;
    const dbUser = await UserService.getFromSupabaseUser(options);
    if (!dbUser) {
      if (!supabaseUser.email) {
        throw new BadRequestException("Email is required!");
      }

      const providerType = supabaseUser.app_metadata.provider ?? "";
      if (!isSupportedProvider(providerType)) {
        throw new BadRequestException("Not supported provider!");
      }

      const name =
        supabaseUser.user_metadata.name ??
        supabaseUser.email ??
        supabaseUser.id;

      const [insertedUser] = await db
        .insert(userTable)
        .values({
          name,
          email: supabaseUser.email ?? "",
        })
        .returning();

      await db.insert(providerCredentialTable).values({
        userId: insertedUser.id,
        providerType: providerType,
        providerId: supabaseUser.id,
      });

      return insertedUser;
    }

    return dbUser;
  };
}
