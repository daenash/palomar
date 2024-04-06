import { User as SupabaseUser } from "@supabase/supabase-js";
import { InternalServerException } from "../../exceptions/internal-server.exception";
import { isSupportedProvider } from "@rpc-like-axios/database/schema";
import { BadRequestException } from "../../exceptions/bad-request.exception";
import { db } from "@rpc-like-axios/database/db";

export class UserService {
  static getFromSupabaseUser = async (options: {
    supabaseUser: SupabaseUser;
  }) => {
    const authProvider = options.supabaseUser.app_metadata.provider;
    if (!authProvider) {
      throw new InternalServerException();
    }

    if (!isSupportedProvider(authProvider)) {
      throw new BadRequestException("Login provider is not supported!");
    }

    const credential = await db.query.providerCredentialTable.findFirst({
      where: (pc, { eq, and }) =>
        and(
          eq(pc.providerId, options.supabaseUser.id),
          eq(pc.providerType, authProvider)
        ),
      with: { user: true },
    });

    return credential?.user;
  };
}
