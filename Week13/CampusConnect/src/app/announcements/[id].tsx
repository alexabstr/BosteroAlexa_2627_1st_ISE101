import { useLocalSearchParams, router } from "expo-router";
import { View, Text, Pressable, StyleSheet } from "react-native";

const sampleAnnouncements = [
  {
    id: "101",
    title: "Enrollment Reminder",
    category: "Academic",
    details: "Check the registrar's posted enrollment schedule.",
  },
  {
    id: "102",
    title: "Sports Festival",
    category: "Events",
    details: "Watch for the official sports festival program.",
  },
  {
    id: "103",
    title: "Campus Clean-up Drive",
    category: "Community",
    details: "Join the campus clean-up activity.",
  },
];

export default function AnnouncementDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const announcement = sampleAnnouncements.find(
    (item) => item.id === id
  );

  if (!announcement) {
    return (
      <View style={styles.container}>
        <Text>Announcement not found.</Text>
        <Pressable onPress={() => router.back()}>
          <Text>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{announcement.title}</Text>
      <Text>Category: {announcement.category}</Text>
      <Text>{announcement.details}</Text>
      <Pressable onPress={() => router.back()}>
        <Text>Back to Previous Screen</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 23,
    fontWeight: "700",
    marginBottom: 12,
  },
});