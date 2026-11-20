
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function UnreadCounter() {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <View>
      <Text>Unread announcements: {unreadCount}</Text>

      <Pressable onPress={() => setUnreadCount(count => count + 1)}>
        <Text>Simulate new announcement</Text>
      </Pressable>

      <Pressable onPress={() => setUnreadCount(0)}>
        <Text>Clear counter</Text>
      </Pressable>
    </View>
  );
}
