
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  addLocalTask,
  getLocalTasks,
  removeLocalTask,
  setLocalTaskComplete,
  LocalTask,
} from "../db/localTaskService";

import { initializeLocalDatabase } from "../db/localDatabase";

export default function LocalTasksScreen() {
  const [tasks, setTasks] = useState<LocalTask[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function refreshTasks() {
    const rows = await getLocalTasks();
    setTasks(rows);
  }

  useEffect(() => {
    let active = true;

    async function prepare() {
      try {
        await initializeLocalDatabase();
        const rows = await getLocalTasks();

        if (active) setTasks(rows);
      } catch {
        if (active) setError("Unable to load local tasks.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void prepare();

    return () => {
      active = false;
    };
  }, []);

  async function handleAdd() {
    if (!title.trim()) {
      setError("Enter a task title.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await addLocalTask(title);
      setTitle("");
      await refreshTasks();
    } catch {
      setError("Unable to save the task.");
    } finally {
      setSaving(false);
    }
  }

  async function handleToggle(task: LocalTask) {
    try {
      await setLocalTaskComplete(
        task.id,
        task.is_complete !== 1
      );

      await refreshTasks();
    } catch {
      setError("Unable to update the task.");
    }
  }

  async function handleDelete(id: number) {
    try {
      await removeLocalTask(id);
      await refreshTasks();
    } catch {
      setError("Unable to delete the task.");
    }
  }

  if (loading) return <ActivityIndicator />;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Local Tasks (stored on this device)</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
      />

      <Button
        title={saving ? "Saving..." : "Add Local Task"}
        onPress={handleAdd}
        disabled={saving}
      />

      {!!error && <Text>{error}</Text>}

      {tasks.length === 0 ? (
        <Text>No local tasks yet. Add your first task.</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View>
              <Text>
                {item.title} —{" "}
                {item.is_complete === 1
                  ? "Complete"
                  : "Incomplete"}
              </Text>

              <Button
                title={
                  item.is_complete === 1
                    ? "Mark Incomplete"
                    : "Mark Complete"
                }
                onPress={() => handleToggle(item)}
              />

              <Button
                title="Delete"
                onPress={() => handleDelete(item.id)}
              />
            </View>
          )}
        />
      )}
    </View>
  );
}
