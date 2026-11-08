
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function TaskItem({ taskab, onDeleteab }) {
  return (
    <View style={stylesab.item}>
      <Text style={stylesab.text}>
        {taskab.toUpperCase()}
      </Text>

      <TouchableOpacity onPress={onDeleteab}>
        <Text style={stylesab.delete}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const stylesab = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 5,
    backgroundColor: "#FCE4EC",
    borderRadius: 8,
  },

  text: {
    fontSize: 16,
    color: "#8A2BE2",
  },

  delete: {
    fontSize: 14,
    color: "#E75480",
    fontWeight: "bold",
  },
});
