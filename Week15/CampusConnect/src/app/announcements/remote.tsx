
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Pressable } from "react-native";
import { getAnnouncements } from "../../../services/announcementApi";
import type { ApiPost } from "../../../types/apiPost";

export default function RemoteAnnouncementsScreen() {
  const [items, setItems] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadData() {
    try {
      setLoading(true);
      setError("");
      const result = await getAnnouncements();
      setItems(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load announcements.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;

    async function run() {
      try {
        const result = await getAnnouncements();
        if (active) setItems(result);
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Request failed.");
      } finally {
        if (active) setLoading(false);
      }
    }

    run();

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <View><ActivityIndicator /><Text>Loading announcements...</Text></View>;

  if (error) return (
    <View>
      <Text>{error}</Text>
      <Pressable onPress={loadData}><Text>Try again</Text></Pressable>
    </View>
  );

  if (items.length === 0) return <Text>No announcements are available.</Text>;

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={{ padding: 12, margin: 8 }}>
          <Text>{item.title}</Text>
          <Text>{item.body}</Text>
        </View>
      )}
    />
  );
}
