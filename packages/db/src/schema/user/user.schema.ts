import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { providerCredentialTable } from "../schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const userTable = sqliteTable("users", {
  id: integer("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
});

export const userRelations = relations(userTable, ({ one }) => ({
  providerCredential: one(providerCredentialTable),
}));

export const selectUserSchema = createSelectSchema(userTable);
export const insertUserSchema = createInsertSchema(userTable);
export type User = Zod.infer<typeof selectUserSchema>;
