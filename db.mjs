import { access, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

async function ensureDirectoryExists(filePath) {
  const dir = dirname(filePath);
  try {
    await access(dir);
  } catch (error) {
    // Directory doesn't exist, create it
    await mkdir(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
}

async function main() {
  const dbPath = "./db/madoff.db";

  // Ensure the db directory exists
  await ensureDirectoryExists(dbPath);

  // Initialize a new SQLite database
  console.log(`Creating new database at: ${dbPath}`);
  const sqlite = new Database(dbPath);
  const db = drizzle(sqlite);

  // Run the migrations
  console.log("Applying migrations...");
  try {
    await migrate(db, { migrationsFolder: resolve("./src/db/migrations") });
    console.log("Database created and migrations applied successfully!");
  } catch (error) {
    console.error("Error applying migrations:", error);
  } finally {
    sqlite.close();
  }
}

main().catch(console.error);
