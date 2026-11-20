import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

export default function SubmitAnnouncementScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});
  const [message, setMessage] = useState("");

  function validate() {
    const nextErrors: { title?: string; description?: string } = {};

    if (!title.trim()) nextErrors.title = "Enter an announcement title.";
    if (!description.trim()) nextErrors.description = "Enter a description.";
    else if (description.trim().length < 10)
      nextErrors.description = "Use at least 10 characters.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit() {
    if (!validate()) {
      setMessage("Please correct the highlighted fields.");
      return;
    }

    setMessage("Announcement draft submitted successfully.");
  }

    function handleReset() {
    setTitle("");
    setDescription("");
    setErrors({});
    setMessage("");
  }

  useEffect(() => {
    console.log("Announcement form mounted");

    return () => {
      console.log("Announcement form unmounted");
    };
  }, []);

  return (
    <View>
      <Text>Announcement title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g., Campus clean-up drive"
        accessibilityLabel="Announcement title"
      />
      {errors.title ? <Text accessibilityRole="alert">{errors.title}</Text> : null}

      <Text>Details</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Describe the event and who should attend"
        multiline
        accessibilityLabel="Announcement details"
      />
      {errors.description ? <Text accessibilityRole="alert">{errors.description}</Text> : null}

      <Pressable onPress={handleSubmit}>
  <Text style={{ color: "blue", textDecorationLine: "underline" }}>
    Submit announcement
  </Text>
</Pressable>

<Pressable onPress={handleReset}>
  <Text style={{ color: "blue", textDecorationLine: "underline" }}>
    Reset
  </Text>
</Pressable>
      <Text>{message}</Text>
    </View>
  );
}