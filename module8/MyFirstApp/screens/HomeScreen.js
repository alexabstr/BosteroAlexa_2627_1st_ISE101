
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Header from "../components/Header";
import Footer from "../components/Footer";
import WelcomeMessage from "../components/WelcomeMessage";

export default function HomeScreen() {
  return (
    <View style={stylesab.container}>
      <Header />

      <View style={stylesab.body}>
        <WelcomeMessage />

        <Text style={stylesab.text}>
          Welcome to your first screen!
        </Text>

        <Text style={stylesab.text}>
          This is built using JSX and components.
        </Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  text: {
    fontSize: 16,
    marginVertical: 5,
    color: "#6A5ACD",
    textAlign: "center",
  },
});
