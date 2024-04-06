import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema/schema";

import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const sqlite = new Database(__dirname + "/../db.sqlite");
export const db = drizzle(sqlite, { schema });

migrate(db, { migrationsFolder: __dirname + "/../migrations" });
