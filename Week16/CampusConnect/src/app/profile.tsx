
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { logout } from "../services/authService";

export default function ProfileScreen() {
  const { session } = useAuth();

  async function handleLogout() {
    try {
      await logout();
    } catch (error) {
      Alert.alert(
        "Logout Error",
        error instanceof Error ? error.message : "Unable to log out."
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Profile</Text>

      <Text>Welcome to your Campus Connect profile.</Text>

      <Text style={styles.label}>Signed-in Email:</Text>
      <Text style={styles.info}>
        {session?.user.email ?? "No email available"}
      </Text>

      <Text style={styles.label}>User ID:</Text>
      <Text style={styles.info}>
        {session?.user.id ?? "No user ID available"}
      </Text>

      <Pressable style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  label: {
    fontWeight: "700",
    marginTop: 20,
  },
  info: {
    fontSize: 13,
    marginTop: 6,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#3366CC",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
