
import * as SQLite from "expo-sqlite";

export const dbPromise =
  SQLite.openDatabaseAsync("campus_connect.db");

export async function initializeLocalDatabase() {
  const db = await dbPromise;

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS local_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      is_complete INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS offline_tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      is_complete INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL,
      sync_status TEXT NOT NULL DEFAULT 'pending'
        CHECK (sync_status IN ('pending', 'synced', 'failed')),
      last_sync_error TEXT
    );
  `);
}
