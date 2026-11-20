
import { dbPromise } from "./localDatabase";

export type LocalTask = {
  id: number;
  title: string;
  is_complete: number;
  created_at: string;
};

export async function getLocalTasks(): Promise<LocalTask[]> {
  const db = await dbPromise;

  return db.getAllAsync<LocalTask>(
    `SELECT id, title, is_complete, created_at
     FROM local_tasks
     ORDER BY id DESC`
  );
}

export async function addLocalTask(title: string) {
  const cleanTitle = title.trim();

  if (!cleanTitle) {
    throw new Error("Task title is required.");
  }

  const db = await dbPromise;

  const result = await db.runAsync(
    "INSERT INTO local_tasks (title) VALUES (?)",
    cleanTitle
  );

  return result.lastInsertRowId;
}

export async function setLocalTaskComplete(
  id: number,
  complete: boolean
) {
  const db = await dbPromise;

  await db.runAsync(
    "UPDATE local_tasks SET is_complete = ? WHERE id = ?",
    complete ? 1 : 0,
    id
  );
}

export async function removeLocalTask(id: number) {
  const db = await dbPromise;

  await db.runAsync(
    "DELETE FROM local_tasks WHERE id = ?",
    id
  );
}
