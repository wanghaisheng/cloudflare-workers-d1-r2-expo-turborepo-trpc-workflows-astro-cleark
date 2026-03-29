// packages/db/src/client-local.ts
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import type { DrizzleD1Database } from "drizzle-orm/d1";

// Local SQLite client for testing
export type LocalDB = ReturnType<typeof drizzle<typeof schema>>;

export function getLocalDB(dbPath: string = "./local-test.db"): LocalDB {
  const sqlite = new Database(dbPath);
  
  // Enable foreign keys
  sqlite.pragma('foreign_keys = ON');
  
  const db = drizzle(sqlite, { schema });
  
  // Run migrations if they exist
  try {
    migrate(db, { migrationsFolder: './migrations' });
  } catch (error: any) {
    // Ignore migration errors for testing
    console.log('No migrations found or migration failed:', error?.message || error);
  }
  
  return db;
}

// Helper function to create test database in memory
export function getMemoryDB(): LocalDB {
  const sqlite = new Database(':memory:');
  sqlite.pragma('foreign_keys = ON');
  
  const db = drizzle(sqlite, { schema });
  
  // Create tables manually for in-memory database
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS "userMeta" (
      "userId" text PRIMARY KEY NOT NULL,
      "email" text NOT NULL,
      "createdAt" integer NOT NULL,
      "timezone" text DEFAULT 'America/Los_Angeles' NOT NULL,
      "lastRecapAt" integer,
      "artStyle" text DEFAULT 'classical painting' NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "moments" (
      "id" integer PRIMARY KEY AUTOINCREMENT,
      "userId" text NOT NULL,
      "createdAt" integer NOT NULL,
      "text" text NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "recaps" (
      "id" integer PRIMARY KEY AUTOINCREMENT,
      "userId" text NOT NULL,
      "text" text NOT NULL,
      "createdAt" integer NOT NULL,
      "type" text NOT NULL,
      "imageId" text
    );
  `);
  
  return db;
}
