
import { StyleSheet, Text, View, Pressable } from "react-native";

// Define the props accepted by AnnouncementCard
type AnnouncementCardProps = {
  title: string;
  category: string;
  read: boolean;
  onMarkRead: () => void;
};

// Create the reusable component
export default function AnnouncementCard({
  title,
  category,
  read,
  onMarkRead,
}: AnnouncementCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.category}>
        Category: {category}
      </Text>
      <Text style={styles.status}>
        Status: {read ? "Read" : "Unread"}
      </Text>
      <Pressable
        style={styles.button}
        onPress={onMarkRead}
      >
        <Text style={styles.buttonText}>
          {read ? "Mark as Unread" : "Mark as Read"}
        </Text>
      </Pressable>
    </View>
  );
}

// Component styles
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DCE3EC",
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  category: {
    fontSize: 14,
    color: "#555555",
  },
  status: {
    fontSize: 14,
    marginTop: 6,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
