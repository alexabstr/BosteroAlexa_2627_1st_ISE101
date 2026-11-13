
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function WelcomeMessage() {
  const studentNameab = "Alexa Bostero";
  const sectionab = "BSIS 3A";

  return (
    <View style={stylesab.container}>
      <Text style={stylesab.name}>
        Hello, {studentNameab}!
      </Text>

      <Text style={stylesab.section}>
        BSIS Section {sectionab}
      </Text>
    </View>
  );
}

const stylesab = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8A2BE2",
    marginBottom: 8,
  },

  section: {
    fontSize: 16,
    color: "#E75480",
  },
});
