
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={stylesab.header}>
      <Text style={stylesab.title}>
        Student Task & Blog App
      </Text>
    </View>
  );
}

const stylesab = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: "#8A2BE2",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
