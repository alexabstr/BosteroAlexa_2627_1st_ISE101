
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { supabase } from '../lib/supabase';
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../data/tasks';

type Task = {
  id: string;
  title: string;
  is_complete: boolean;
  created_at: string;
};

export default function TasksScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);

  async function loadTasks() {
    try {
      setLoading(true);

      const { data } = await supabase.auth.getSession();

if (!data.session) {
        setIsSignedIn(false);
        setTasks([]);
        return;
      }

      setIsSignedIn(true);

      const taskData = await listTasks();
      setTasks(taskData ?? []);
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Unable to load tasks.'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleSignIn() {
    try {
      setBusy(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) throw error;

      await loadTasks();
      Alert.alert('Success', 'Signed in successfully.');
    } catch (error) {
      Alert.alert(
        'Sign In Error',
        error instanceof Error ? error.message : 'Unable to sign in.'
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleAddTask() {
    if (!newTask.trim()) {
      Alert.alert('Required', 'Please enter a task title.');
      return;
    }

    try {
      setBusy(true);
      await createTask(newTask);
      setNewTask('');
      await loadTasks();
      Alert.alert('Success', 'Task added successfully.');
    } catch (error) {
      Alert.alert(
  'Add Task Error',
  error instanceof Error ? error.message : JSON.stringify(error)
);
    } finally {
      setBusy(false);
    }
  }

  async function handleToggleTask(task: Task) {
    try {
      await updateTask(task.id, !task.is_complete);
      await loadTasks();
      Alert.alert('Success', 'Task updated successfully.');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Unable to update task.'
      );
    }
  }

  async function handleDeleteTask(id: string) {
    try {
      await deleteTask(id);
      await loadTasks();
      Alert.alert('Success', 'Task deleted successfully.');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Unable to delete task.'
      );
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      setTasks([]);
      setIsSignedIn(false);
      setEmail('');
      setPassword('');
    } catch (error) {
      Alert.alert(
        'Error',
        error instanceof Error ? error.message : 'Unable to sign out.'
      );
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading tasks...</Text>
      </View>
    );
  }

  if (!isSignedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Campus Tasks</Text>
        <Text style={styles.subtitle}>Sign in to manage your tasks.</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable
          style={styles.button}
          onPress={handleSignIn}
          disabled={busy}
        >
          <Text style={styles.buttonText}>
            {busy ? 'Signing In...' : 'Sign In'}
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Campus Tasks</Text>
      <Text style={styles.subtitle}>Manage your campus activities.</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={newTask}
        onChangeText={setNewTask}
      />

      <Pressable
        style={styles.button}
        onPress={handleAddTask}
        disabled={busy}
      >
        <Text style={styles.buttonText}>
          {busy ? 'Adding...' : 'Add Task'}
        </Text>
      </Pressable>

      <Pressable onPress={loadTasks} style={styles.refresh}>
        <Text style={styles.linkText}>Refresh Tasks</Text>
      </Pressable>

      {tasks.length === 0 ? (
        <Text style={styles.empty}>
          No tasks yet. Add your first task!
        </Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Pressable
                style={styles.taskDetails}
                onPress={() => handleToggleTask(item)}
              >
                <Text style={styles.taskTitle}>
                  {item.is_complete ? '✓ ' : '○ '}
                  {item.title}
                </Text>
                <Text style={styles.status}>
                  {item.is_complete ? 'Completed' : 'Pending'}
                </Text>
              </Pressable>

              <Pressable
                onPress={() => handleDeleteTask(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteText}>Delete</Text>
              </Pressable>
            </View>
          )}
        />
      )}

      <Pressable onPress={handleSignOut} style={styles.signOut}>
        <Text style={styles.linkText}>Sign Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FB',
    padding: 24,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FB',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3366CC',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  refresh: {
    alignItems: 'center',
    padding: 12,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  empty: {
    textAlign: 'center',
    marginTop: 30,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    color: 'red',
  },
  signOut: {
    alignItems: 'center',
    padding: 16,
  },
});
