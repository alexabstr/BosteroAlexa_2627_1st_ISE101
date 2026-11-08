import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function App() {
  const studentNameab = "Hello, I'm Alexa Bostero!";
  const sectionab = "BSIS 3A";

  return (
    <View style={stylesab.container}>
      <Text style={stylesab.title}>
        {studentNameab}
      </Text>

      <Text style={stylesab.subtitle}>
        Welcome to React Native!
      </Text>

      <Text style={stylesab.section}>
        Section: {sectionab}
      </Text>
    </View>
  );
}

const stylesab = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF0F5",
    padding: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 15,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 20,
    color: "#E75480",
    marginBottom: 20,
  },

  section: {
    fontSize: 18,
    color: "#6A5ACD",
    marginTop: 15,
  },
});