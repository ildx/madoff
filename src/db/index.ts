import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { runMigration } from "./migrations";
import * as schema from "./schema/schema";

// Database path - using a relative path to store the SQLite database file
const sqlite = new Database("./db/madoff.db");

// Create the database connection
export const db = drizzle(sqlite, { schema });

// Automatic migrations on startup
runMigration(db, sqlite);
