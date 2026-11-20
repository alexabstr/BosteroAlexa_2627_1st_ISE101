
import { dbPromise } from "./localDatabase";

export type OfflineTask = {
  id: string;
  title: string;
  is_complete: number;
  updated_at: string;
  sync_status: "pending" | "synced" | "failed";
  last_sync_error: string | null;
};

export async function getOfflineTasks(): Promise<OfflineTask[]> {
  const db = await dbPromise;

  return db.getAllAsync<OfflineTask>(
    `SELECT * FROM offline_tasks ORDER BY updated_at DESC`
  );
}

export async function addOfflineTask(title: string) {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    throw new Error("Task title is required.");
  }

  const db = await dbPromise;
  const id = crypto.randomUUID();
  const updatedAt = new Date().toISOString();

  await db.runAsync(
    `INSERT INTO offline_tasks
      (id, title, updated_at, sync_status)
     VALUES (?, ?, ?, 'pending')`,
    id,
    cleanTitle,
    updatedAt
  );

  return id;
}

export async function updateOfflineTask(
  id: string,
  title: string,
  isComplete: boolean
) {
  const db = await dbPromise;

  await db.runAsync(
    `UPDATE offline_tasks
     SET title = ?,
         is_complete = ?,
         updated_at = ?,
         sync_status = 'pending',
         last_sync_error = NULL
     WHERE id = ?`,
    title.trim(),
    isComplete ? 1 : 0,
    new Date().toISOString(),
    id
  );
}

export async function getPendingOfflineTasks(): Promise<OfflineTask[]> {
  const db = await dbPromise;

  return db.getAllAsync<OfflineTask>(
    `SELECT * FROM offline_tasks
     WHERE sync_status IN ('pending', 'failed')
     ORDER BY updated_at ASC`
  );
}

export async function setOfflineTaskSyncStatus(
  id: string,
  status: "pending" | "synced" | "failed",
  errorMessage: string | null = null
) {
  const db = await dbPromise;

  await db.runAsync(
    `UPDATE offline_tasks
     SET sync_status = ?, last_sync_error = ?
     WHERE id = ?`,
    status,
    errorMessage,
    id
  );
}
