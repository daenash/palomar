import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { userTable } from "../schema";
import { relations } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const PROVIDERS = ["google", "email"] as const;

export const providerCredentialTable = sqliteTable("provider_credentials", {
  id: integer("id").primaryKey(),
  providerId: text("provider_id"),
  providerType: text("provider_type", { enum: PROVIDERS }),
  userId: integer("user_id")
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),
});

export const providerCredentialRelations = relations(
  providerCredentialTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [providerCredentialTable.userId],
      references: [userTable.id],
    }),
  })
);

export const isSupportedProvider = (
  provider: string
): provider is (typeof PROVIDERS)[number] => {
  return (PROVIDERS as readonly string[]).includes(provider);
};

export const selectProviderCredentialSchema = createSelectSchema(
  providerCredentialTable
);
export const insertProviderCredentialSchema = createInsertSchema(
  providerCredentialTable
);

export type ProviderCredential = Zod.infer<
  typeof selectProviderCredentialSchema
>;
