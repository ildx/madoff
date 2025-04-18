import { resolve } from "node:path";
import type { Database } from "better-sqlite3";
import type { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate as drizzleMigrate } from "drizzle-orm/better-sqlite3/migrator";
import { db } from "./index";

/**
 * Run database migrations
 * @param db Drizzle database instance
 * @param sqlite SQLite database instance
 */
export const runMigration = async (db: ReturnType<typeof drizzle>, sqlite: Database) => {
  try {
    console.log("Running migrations...");
    // Run migrations from the migrations folder
    await drizzleMigrate(db, { migrationsFolder: resolve("./src/db/migrations") });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Error running migrations:", error);
    throw error;
  }
};

// Run migrations if this file is executed directly
if (require.main === module) {
  // Import here to avoid circular dependencies
  import("./index").then(({ db }) => {
    import("better-sqlite3").then(({ default: Database }) => {
      const sqlite = new Database("./db/madoff.db");
      runMigration(db, sqlite)
        .then(() => {
          console.log("Migration script executed successfully");
          process.exit(0);
        })
        .catch((error) => {
          console.error("Error during migration:", error);
          process.exit(1);
        });
    });
  });
}
