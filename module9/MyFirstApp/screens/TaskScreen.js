
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";

import TaskItem from "../components/TaskItem";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TaskScreen() {
  const [taskab, setTaskab] = useState("");
  const [tasksab, setTasksab] = useState([]);

  const addTaskab = () => {
    if (taskab.trim() !== "") {
      setTasksab([...tasksab, taskab.trim()]);
      setTaskab("");
    }
  };

  const deleteTaskab = (indexab) => {
    setTasksab(tasksab.filter((_, iab) => iab !== indexab));
  };

  return (
    <View style={stylesab.container}>
      <Header />

      <View style={stylesab.body}>
        <Text style={stylesab.title}>Task Manager</Text>

        <TextInput
          style={stylesab.input}
          placeholder="Enter a new task"
          value={taskab}
          onChangeText={setTaskab}
        />

        <Button title="Add Task" onPress={addTaskab} />

        <FlatList
          data={tasksab}
          keyExtractor={(itemab, indexab) => indexab.toString()}
          renderItem={({ item: itemab, index: indexab }) => (
            <TaskItem
              taskab={itemab}
              onDeleteab={() => deleteTaskab(indexab)}
            />
          )}
        />
      </View>

      <Footer />
    </View>
  );
}

const stylesab = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
  },

  body: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E75480",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
});
