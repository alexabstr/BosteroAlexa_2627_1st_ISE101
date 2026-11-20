
import { supabase } from "../lib/supabase";

export async function listTasks() {
  const { data, error } = await supabase
    .from("campus_tasks")
    .select("id, title, is_complete, created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTask(title: string) {
  const cleanTitle = title.trim();

  if (!cleanTitle) throw new Error("Task title is required.");

  const { data: authData, error: authError } = await supabase.auth.getUser();

  if (authError) throw authError;
  if (!authData.user) throw new Error("Please sign in first.");

  const { data, error } = await supabase
    .from("campus_tasks")
    .insert({ title: cleanTitle, user_id: authData.user.id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(id: string, isComplete: boolean) {
  const { data, error } = await supabase
    .from("campus_tasks")
    .update({ is_complete: isComplete })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(id: string) {
  const { error } = await supabase
    .from("campus_tasks")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
